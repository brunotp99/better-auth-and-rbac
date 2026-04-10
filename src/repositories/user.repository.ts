import type { User } from '@/generated/prisma/client/client'

export interface UserRepository {
  findById(userId: string): Promise<User | null>
}
