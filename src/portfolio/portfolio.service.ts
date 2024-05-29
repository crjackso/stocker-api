import { BaseError } from '@app/baseError'
import { PrismaService } from '@app/prisma/prisma.service'
import { ensureError } from '@app/utils/ensureError'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) { }

  async get(id: number): Promise<{ id: number; title: string; userId: number; createdAt: Date; updatedAt: Date }> {
    return await this.prisma.portfolio.findUnique({
      where: {
        id
      }
    })
  }

  async getStocks(id: number) {
    return await this.prisma.stock.findMany({
      include: {
        portfolios: true
      },
      where: {
        portfolios: {
          some: {
            id
          }
        }
      }
    })
  }

  async create(
    data: Prisma.PortfolioUncheckedCreateInput
  ): Promise<{ id: number; title: string; userId: number; createdAt: Date; updatedAt: Date }> {
    try {
      return await this.prisma.portfolio.create({ data })
    } catch (e) {
      const error = ensureError(e)
      throw new BaseError('portfolio creation failed', { cause: error, context: JSON.stringify(data) })
    }
  }
}
