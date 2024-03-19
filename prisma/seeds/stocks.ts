import { PrismaClient } from '@prisma/client'
import { TransientStock } from '@app/stock/types/stock'
import * as stocks from './../../data/samples/stocks.json'

const upsertStocks = async (prisma: PrismaClient): Promise<void> => {
  for (const stock of stocks) {
    const upsertedStock = await upsertStock(prisma, stock)
    console.log(`Added stock ${upsertedStock.companyName}`)
  }
}

const upsertStock = async (prisma: PrismaClient, seed: TransientStock) => {
  return await prisma.stock.upsert({
    where: { tickerSymbol: seed.tickerSymbol },
    update: {
      lastPrice: seed.lastPrice
    },
    create: {
      tickerSymbol: seed.tickerSymbol,
      companyName: seed.companyName,
      lastPrice: seed.lastPrice
    }
  })
}

export default upsertStocks
