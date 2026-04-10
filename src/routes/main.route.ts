import { type Request, type Response, Router } from 'express'
import { userSession } from '@/middlewares/user-session.middleware'
import { userRoutes } from './user.route'

const routes = Router()

routes.use('/api/user', [userSession], userRoutes)

routes.get('/health-check', (_req: Request, res: Response) => {
  res.status(200).json({
    error: false,
    message: 'API is running.',
  })
})

export { routes }
