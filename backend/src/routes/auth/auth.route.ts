import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import { validationMiddleware } from "../../middlewares/validation.middleware"
import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'
import LoginDTO from "./auth.dto"

const router = express.Router()
const prisma = new PrismaClient()

router.post('/login', validationMiddleware(LoginDTO), async (req, res) => {
    let login: LoginDTO = res.locals.transformedClass

    let user = await prisma.account.findUnique({
        where: {
            email: login.email
        }
    });

    let authorized = await argon2.verify(user.password, login.password)

    if(!authorized)
        return res.status(200).json({
            errors: [
                {
                    msg: 'Invalid credentials'
                }
            ]
        })

    let token = jsonwebtoken.sign({ email: user.email }, process.env.JWT_SECRET)

    res.status(200).json({ token })
})

export default router
