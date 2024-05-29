import { PrismaClient } from '@prisma/client'
import upsertStocks from './seeds/stocks'
import upsertUsers from './seeds/users'
import upsertPortfolios from './seeds/portfolios'

const prisma = new PrismaClient()

async function main() {
  await upsertStocks(prisma)
  await upsertUsers(prisma)
  await upsertPortfolios(prisma)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
