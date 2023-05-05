import express from 'express'
import jsonwebtoken from 'jsonwebtoken';
import {validationMiddleware} from "../../middlewares/validation.middleware";
import LoginDTO from "./auth.dto";
const router = express.Router()

router.post('/login', validationMiddleware(LoginDTO), (req, res) => {
    let email = req.body.email
    let password = req.body.password

    let token = jsonwebtoken.sign({ email }, 'secret')

    res.status(200).json({ token })
})

export default router
