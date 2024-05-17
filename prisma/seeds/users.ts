import { Prisma, PrismaClient } from '@prisma/client'
import * as users from '../../data/samples/users.json'

const upsertUsers = async (prisma: PrismaClient): Promise<void> => {
  for (const user of users) {
    const upsertedStock = await upsertStock(prisma, user)
    console.log(`Added user ${upsertedStock.email}`)
  }
}

const upsertStock = async (prisma: PrismaClient, seed: Prisma.UserUncheckedCreateInput) => {
  return await prisma.user.upsert({
    where: { email: seed.email },
    update: {
      firstName: seed.firstName,
      lastName: seed.lastName,
      password: seed.password
    },
    create: {
      firstName: seed.firstName,
      lastName: seed.lastName,
      password: seed.password,
      email: seed.email
    }
  })
}

export default upsertUsers
