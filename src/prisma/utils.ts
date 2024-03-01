import { Prisma } from '@prisma/client'

export const isUniqueConstraintViolation = (error: Error) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return error.code === 'P2002'
  }

  return false
}
