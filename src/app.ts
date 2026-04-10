import { toNodeHandler } from 'better-auth/node'
import cors from 'cors'
import express from 'express'
import { errorMiddleware } from './middlewares/error.middleware'
import { routes } from './routes/main.route'
import { auth } from './utils/auth.util'
import { env } from './utils/env.util'

const app = express()

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ['content-type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  }),
)

app.all('/api/auth/*splat', toNodeHandler(auth))

app.use(express.json())

app.use(routes)

app.use(errorMiddleware)

export { app }
