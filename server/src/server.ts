// Importing modules

import Fastify from "fastify";
import cors from '@fastify/cors'
import {PrismaClient} from '@prisma/client'

// Creating Fastify server

const server = Fastify()

// Connection with database via Prisma

const prisma = new PrismaClient()

// Server parameters

const parameters = {
    port:5000
}

// Allowing requisitions (CORS)

server.register(cors)

// Routes

server.get('/', async () => {
    const habbits = await prisma.habbit.findMany({
        where: {
            title: {
                startsWith: "Beber"
            }
        }
    })

    return habbits
})


server.listen(parameters).then(() => {
    console.log("Running..")
})