import { UserPrismaRepository } from '@/repositories/prisma/user.prisma';
import { UserService } from '@/services/user.service';
import { NextFunction, Request, Response } from 'express';

const checkRole =
    (role: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userRepository = new UserPrismaRepository();
            const userService = new UserService(userRepository);

            const userSession = res.locals.user;

            if (!userSession) {
                throw new Error('Unauthorized');
            }

            const user = await userService.getOne(userSession.id);

            if (user.role !== role) {
                throw new Error('Unauthorized');
            }
        
            return next()
        } catch (error: any) {
            res.status(401).json({
                error: true,
                errorKey: 'No Permission',
                message: error.errors,
            })
        }
    }

export { checkRole }