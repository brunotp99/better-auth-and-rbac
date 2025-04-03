import { toNodeHandler } from "better-auth/node";
import { auth } from "../utils/auth.util";
import { Router } from "express";
import { UserController } from "@/controllers/user.controller";
import { UserPrismaRepository } from "@/repositories/prisma/user.prisma";
import { UserService } from "@/services/user.service";
import validate from "@/middlewares/validate-schema.middleware";
import { getOneUserSchema } from "@/schemas/user.schema";
import { checkRole } from "@/middlewares/check-role.middleware";

const userRoutes = Router();
const userRepository = new UserPrismaRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

userRoutes.get(
    '/:userId',
    [validate(getOneUserSchema), checkRole('user')],
    userController.getOne,
)

userRoutes.post('/sign-in', userController.customSignIn)

export { userRoutes }