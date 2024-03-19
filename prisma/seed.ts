import { PrismaClient } from '@prisma/client'
import upsertStocks from './seeds/stocks'

const prisma = new PrismaClient()

async function main() {
  await upsertStocks(prisma)
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
