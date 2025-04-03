import { UserRepository } from '../user.repository'
import { prismadb } from '@/utils/prismadb.util'

export class UserPrismaRepository implements UserRepository {
    async findById(userId: string) {
        console.log('USER ID: ', userId)
        const user = await prismadb.user.findUnique({
            where: {
                id: userId,
            },
        })

        return user
    }
}