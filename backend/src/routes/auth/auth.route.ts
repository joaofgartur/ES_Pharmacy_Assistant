import express from 'express'
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
router.post('/login', validationMiddleware(LoginDTO), async (req, res) => {
    let login: LoginDTO = res.locals.transformedClass

    let user = await prisma.account.findUnique({
        where: {
            email: login.email
        }
    });

    let authorized = !user ? false : await argon2.verify(user.password, login.password)

    if(!authorized)
        return res.status(401).json({
            success: false,
            errors: [
                {
                    msg: 'Invalid credentials'
                }
            ]
        })

    let token = jsonwebtoken.sign({ email: user.email }, process.env.JWT_SECRET)

    res.status(200).json({
        success: true,
        email: login.email,
        token
    })
})

export default router
