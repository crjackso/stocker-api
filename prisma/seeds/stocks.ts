import { Prisma, PrismaClient } from '@prisma/client'
import * as stocks from './../../data/samples/stocks.json'

const upsertStocks = async (prisma: PrismaClient): Promise<void> => {
  for (const stock of stocks) {
    const upsertedStock = await upsertStock(prisma, stock)
    console.log(`Added stock ${upsertedStock.companyName}`)
  }
}

const upsertStock = async (prisma: PrismaClient, seed: Prisma.StockUncheckedCreateInput) => {
  return await prisma.stock.upsert({
    where: { tickerSymbol: seed.tickerSymbol },
    update: {
      lastPrice: seed.lastPrice,
      fiftyTwoWeekHigh: seed.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: seed.fiftyTwoWeekLow
    },
    create: {
      tickerSymbol: seed.tickerSymbol,
      companyName: seed.companyName,
      lastPrice: seed.lastPrice,
      fiftyTwoWeekHigh: seed.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: seed.fiftyTwoWeekLow
    }
  })
}

export default upsertStocks
