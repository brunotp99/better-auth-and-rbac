import { User } from '@prisma/client'

export interface UserRepository {
    findById(userId: string): Promise<User | null>
}