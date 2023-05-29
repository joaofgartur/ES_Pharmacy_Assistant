import * as fs from "fs"
import express from 'express'
import face_recognition from '../../face-recognition/face.recognition'
import { PrismaClient } from '@prisma/client'
import uploadFile from "../../utils/multer.util"
import path from 'path'
const prisma = new PrismaClient()

const router = express.Router()

/**
 * @openapi
 * 'face/add':
 *     post:
 *       summary: Add client photo
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 file:
 *                   type: string
 *                   format: binary
 *       responses:
 *         '200':
 *           description: Client photo added successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *         '403':
 *           description: Client or photo not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errors:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         msg:
 *                           type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errors:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         msg:
 *                           type: string
 *       tags:
 *         - Face Recognition
 */
router.post('/add', async (req: any, res) => {
    uploadFile(req, res, async (err) => {
        let user = await prisma.client.findUnique({
            where: {
                email: req.body.email
            }
        });
    
        if(!user)
            return res.status(403).json({ errors: [ { msg: 'User not found' } ] })
        if(err)
            return res.status(500).json({ errors: [ { msg: err } ] })
        if(!req.file)
            return res.status(403).json({ errors: [ { msg: 'File not found' } ] })
        
        await prisma.client.update({
            where: {
                email: req.body.email
            },
            data: {
                photo: req.file.path
            }
        })
        face_recognition.add_face({
            name: `_${user.id}`,
            blob: fs.readFileSync(req.file.path)
        }, (err, data) => {
            if(err)
                res.status(500).json({ errors: [ { msg: err } ] })
            res.status(200).json({ msg: data })
        })
    });
})

/**
 * @openapi
 *   'face/find':
 *     post:
 *       summary: Recognize client by photo
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 file:
 *                   type: string
 *                   format: binary
 *       responses:
 *         '200':
 *           description: Client found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   client:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       photo:
 *                         type: string
 *                         format: binary
 *         '404':
 *           description: Client not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   errors:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         msg:
 *                           type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   errors:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         msg:
 *                           type: string
 *       tags:
 *         - Face Recognition
 */
router.post('/find', async (req: any, res) => {
    uploadFile(req, res, async (err) => {
        if(err)
            return res.status(500).json({
                success: false,
                errors: [ { msg: err } ]
            })
        if(!req.file)
            return res.status(403).json({
                success: false,
                errors: [ { msg: 'File not found' } ]
            })
        face_recognition.find_face({
            blob: fs.readFileSync(req.file.path)
        }, async (err, data) => {
            if(err)
                res.status(500).json({ errors: [ { msg: err } ] })
            if(data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Face) {
                const str_id = data.FaceMatches[0].Face.ExternalImageId.substring(1)
                let client = await prisma.client.findUnique({
                    where: {
                        id: parseInt(str_id) 
                    }
                })

                return res.status(200).json({
                    success: true,
                    client: {
                        id: client.id,
                        name: client.name,
                        email: client.email,
                        phone: client.phone,
                        photo: Buffer.from(fs.readFileSync(client.photo))
                    }
                })
            }
            return res.status(404).json({
                success: false,
                errors: [ { msg: 'Person not found' } ]
            })
        })
    });
})

/**
 * @openapi
 * 'face/get':
 *  get:
 *       summary: Get client
 *       parameters:
 *         - in: query
 *           name: email
 *           schema:
 *             type: string
 *           required: true
 *           description: Email of the client
 *       responses:
 *         '200':
 *           description: Client photo retrieved with success
 *           content:
 *             image/jpeg:
 *              type: string
 *              format: binary
 *             image/png:
 *              type: string
 *              format: binary
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: Client not found
 *       tags:
 *         - Face Recognition
 */
router.get('/get', async (req, res) => {
    const email = req.query.email;
    if(!email)
        return res.sendStatus(400)
    let client = await prisma.client.findUnique({
        where: {
            email: `${email}`
        }
    })
    if(!client)
        return res.sendStatus(404)

    const options = {
        root: path.join()
    };
    return res.sendFile(client.photo, options)
})

export default router