// Importing modules

import Fastify from "fastify";
import cors from '@fastify/cors'
import {prisma} from './lib/prisma'
import { appRoutes } from "./routes";

// Creating Fastify server

const server = Fastify()

// Server parameters

const parameters = {
    port:5000
}

// Allowing requisitions (CORS)

server.register(cors)
server.register(appRoutes)

server.listen(parameters).then(() => {
    console.log("Running..")
})