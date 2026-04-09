import { prismadb } from '@/utils/prismadb.util'
import type { UserRepository } from '../user.repository'

export class UserPrismaRepository implements UserRepository {
  async findById(userId: string) {
    const user = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
    })

    return user
  }
}
