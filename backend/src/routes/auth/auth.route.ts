import express from 'express'
import passport from 'passport'
import jsonwebtoken from 'jsonwebtoken'
import { validationMiddleware } from "../../middlewares/validation.middleware"
import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'
import LoginDTO from "./auth.dto"

const router = express.Router()
const prisma = new PrismaClient()

/**
 * @openapi
 * 'auth/login':
 *  post:
 *   summary: User login
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *        password:
 *         type: string
 *   responses:
 *    '200':
 *     description: Successful Login
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *          success:
 *           type: boolean
 *          email:
 *           type: string
 *          token:
 *           type: string
 *    '401':
 *     description: Invalid credentials
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         success:
 *          type: boolean
 *         errors:
 *          type: array
 *         items:
 *          type: object
 *          properties:
 *           msg:
 *            type: string
 *   tags:
 *    - Authentication
 */
router.post('/login', validationMiddleware(LoginDTO), async (req: any, res) => {
    let login: LoginDTO = res.locals.transformedClass

    passport.authenticate('local', { session: false }, (err, user, info) => {
        if(err || !user)
            return res.status(400).json(info);

        req.login(user, { session: false }, (err) => {
            if(err)
                return res.status(500).json({
                    success: false,
                    errors: [ { msg: err } ]
                })

            return res.status(200).json({
                success: true,
                email: login.email,
                token: jsonwebtoken.sign({ email: user.email }, process.env.JWT_SECRET),
            })
        })
    })(req, res);

    
    
})

export default router
