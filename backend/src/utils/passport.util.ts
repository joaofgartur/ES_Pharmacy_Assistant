import argon2 from 'argon2';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;

const localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (email, password, cb) => {
        let user = await prisma.account.findUnique({
            where: {
                email: email
            }
        });
        console.log(email)
        if(!user) {
            return cb(null, false, {
                errors: [
                    {
                        msg: 'Invalid email or password'
                    }
                ]
            });
        }
        let correctPassword = await argon2.verify(user.password, password);
        if(!correctPassword) {
            return cb(null, false, {
                errors: [
                    {
                        msg: 'Invalid email or password'
                    }
                ]
            });
        }
        return cb(null, { email: user.email }, {
            msg: 'Login successfully'
        })
    }
);

const jwtStrategy = new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
async (jwtPayload, cb) => {
    try {
        let user = await prisma.account.findUnique({
            where: {
                email: jwtPayload.email
            }
        });
        cb(null, user)
    } catch(err) {
        cb(err)
    }
});

export default {
    localStrategy,
    jwtStrategy
}