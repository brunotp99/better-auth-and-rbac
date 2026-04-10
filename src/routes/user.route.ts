import { Router } from 'express'
import { UserController } from '@/controllers/user.controller'
import { checkRole } from '@/middlewares/check-role.middleware'
import validate from '@/middlewares/validate-schema.middleware'
import { UserPrismaRepository } from '@/repositories/prisma/user.prisma'
import { getOneUserSchema } from '@/schemas/user.schema'
import { UserService } from '@/services/user.service'

const userRoutes = Router()
const userRepository = new UserPrismaRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

userRoutes.get('/:userId', [validate(getOneUserSchema), checkRole('user')], userController.getOne)

userRoutes.post('/sign-in', userController.customSignIn)

export { userRoutes }
