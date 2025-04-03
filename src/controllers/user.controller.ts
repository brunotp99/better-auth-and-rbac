import { Request, Response } from 'express'

import { UserService } from '@/services/user.service'
import { GetOneUserInput } from '@/schemas/user.schema'
import { auth } from '@/utils/auth.util'

export class UserController {
    private userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
        this.getOne = this.getOne.bind(this)
        this.customSignIn = this.customSignIn.bind(this)
    }

    async getOne(req: Request<GetOneUserInput>, res: Response) {
        const { userId } = req.params

        const sessionUser = res.locals.user;

        if (userId !== sessionUser.id) {
            res.status(403).json({
                error: true,
                message: 'You do not have access to the following user.',
            })
        }

        const user = await this.userService.getOne(userId)

        res.status(200).json({
            error: false,
            message: 'The requested user was found.',
            data: user,
        })
    }

    async customSignIn(req: Request<any>, res: Response) {

        try {
            const user = await auth.api.signInEmail({
                body: {
                    email: req.body.email,
                    password: req.body.password
                },
                headers: req.headers
            })

            res.status(200).json({
                error: false,
                message: 'Success login.',
                data: user,
            })
        } catch (error) {
            console.log(error)
        }
         
    }
}