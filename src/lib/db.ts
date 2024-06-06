import { PrismaClient } from '@prisma/client'

const createPrismaClient = () =>
  new PrismaClient({
    log: ['query'],
  })

const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof createPrismaClient>
}

export const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV != 'production') globalForPrisma.prisma
