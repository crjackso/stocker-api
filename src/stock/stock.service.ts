import { Injectable } from '@nestjs/common'
import { PrismaService } from '@app/prisma/prisma.service'
import { ensureError } from '@app/utils/ensureError'
import { BaseError } from '@app/baseError'
import { StockWhereInput } from './graphql/inputs'
import { Prisma } from '@prisma/client'
import Stock from './models/Stock'

@Injectable()
export class StockService {
  constructor(private readonly prisma: PrismaService) {}

  async create(stock: Prisma.StockUncheckedCreateInput) {
    try {
      const data = { ...stock, tickerSymbol: stock.tickerSymbol.toUpperCase() }
      return await this.prisma.stock.create({ data })
    } catch (e) {
      const error = ensureError(e)
      throw new BaseError('Stock creation failed', { cause: error, context: JSON.stringify(stock) })
    }
  }

  async upsert(stock: Prisma.StockUncheckedCreateInput) {
    try {
      return await this.prisma.stock.upsert({
        where: { tickerSymbol: stock.tickerSymbol },
        update: stock,
        create: stock
      })
    } catch (e) {
      const error = ensureError(e)
      throw new BaseError('Stock operation failed', { cause: error, context: JSON.stringify(stock) })
    }
  }

  async get(tickerSymbol: string): Promise<Stock> {
    return await this.prisma.stock.findUnique({
      where: {
        tickerSymbol
      }
    })
  }

  async getAll(where: StockWhereInput): Promise<Stock[]> {
    return await this.prisma.stock.findMany({ where })
  }
}
