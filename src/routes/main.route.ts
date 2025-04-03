import { Request, Response, Router } from 'express'

import { userRoutes } from './user.route'
import { userSession } from '@/middlewares/user-session.middleware'

const routes = Router()

routes.use('/api/user', [userSession], userRoutes)

routes.get('/health-check', (req: Request, res: Response) => {
    res.status(200).json({
        error: false,
        message: 'API is running.',
    })
})


export { routes }