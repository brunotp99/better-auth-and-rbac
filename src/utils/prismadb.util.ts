import { PrismaClient } from '@/generated/prisma/client/client.js'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
})

const globalClient = new PrismaClient({ adapter })

export const prismadb = globalClient