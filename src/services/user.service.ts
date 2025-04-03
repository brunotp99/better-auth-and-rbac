import { NotFoundError } from '@/errors/not-found.error'
import { UserRepository } from '@/repositories/user.repository'
import { User } from '@prisma/client'

export type UserServiceResponse = User

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getOne(userId: string): Promise<UserServiceResponse> {
        const user = await this.userRepository.findById(userId)

        if (!user) {
            throw new NotFoundError(
                '[USER_SERVICE_GETONE]: The requested user was not found.',
            )
        }

        return user
    }
}