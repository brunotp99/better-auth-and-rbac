import { User } from '@prisma/client'
import { UserRepository } from '../user.repository'

export class UserInMemoryRepository implements UserRepository {
    private users: User[] = [];

    async findById(userId: string) {
        const user = this.users.find((user) => user.id === userId);

        if (!user) {
            return null
        }

        return user
    }
}