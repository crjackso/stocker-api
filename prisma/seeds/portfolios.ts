import { Prisma, PrismaClient } from '@prisma/client'
import * as portfolios from './../../data/samples/portfolios.json'
import { PortfolioSeedCreate } from '@app/stock/types'

const upsertStocks = async (prisma: PrismaClient): Promise<void> => {
  for (const portfolio of portfolios) {
    const portfol = mapPortfolio(prisma, portfolio)
    const upsertedPortfolio = await upsertPortfolio(prisma, portfol)
    console.log(`Added portfolio ${upsertedPortfolio.title}`)
  }
}

const mapPortfolio = (prisma: PrismaClient, portfolio: PortfolioSeedCreate): Prisma.PortfolioCreateInput => {
  return {
    title: portfolio.title,
    user: {
      connect: {
        id: portfolio.userId
      }
    },
    stocks: {
      connect: portfolio.tickerSymbols.map((symbol) => ({ tickerSymbol: symbol }))
    }
  }
}

const upsertPortfolio = async (prisma: PrismaClient, seed: Prisma.PortfolioCreateInput) => {
  return await prisma.portfolio.upsert({
    where: { userId_title: { userId: seed.user.connect.id, title: seed.title } },
    update: {
      title: seed.title,
      stocks: seed.stocks
    },
    create: {
      title: seed.title,
      user: seed.user,
      stocks: seed.stocks
    }
  })
}

export default upsertStocks
