import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'

const prisma = new PrismaClient()

async function populate() {
    await prisma.account.deleteMany({
        where: {
            email: 'assistant@gmail.com'
        }
    })

    await prisma.client.deleteMany({
        where: {
            email: 'alexy@gmail.com'
        }
    })

    await prisma.client.deleteMany({
        where: {
            email: 'samuel@gmail.com'
        }
    })

    await prisma.client.deleteMany({
        where: {
            email: 'joao@gmail.com'
        }
    })


    const user = await prisma.account.create({
        data: {
          name: 'Assistant 1',
          email: 'assistant@gmail.com',
          password: await argon2.hash('teste123')
        }
    })

    const client = await prisma.client.create({
        data: {
            name: 'Alexy d\' Almeida',
            email: 'alexy@gmail.com',
            phone: '911000513',
            photo: ''
        }
    })

    const client2 = await prisma.client.create({
        data: {
            name: 'Samuel Carinhas',
            email: 'samuel@gmail.com',
            phone: '911000514',
            photo: ''
        }
    })

    const client3 = await prisma.client.create({
        data: {
            name: 'João Artur',
            email: 'joao@gmail.com',
            phone: '911000515',
            photo: ''
        }
    });
}

export default populate
