import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'

const prisma = new PrismaClient()

async function populate() {
    const user = await prisma.account.create({
        data: {
          name: 'Samuel Carinhas',
          email: 'samuelsantos.c.2001@gmail.com',
          password: await argon2.hash('teste123')
        },
    });

    console.log(`Created ${user}`)
}

export default populate
