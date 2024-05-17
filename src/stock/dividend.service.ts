import { PrismaService } from '@app/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { DividendWhereInput } from './graphql/inputs/dividend-where.input'
import StockDividendLog from './models/StockDividendLog'

@Injectable()
export class DividendService {
  constructor(private readonly prisma: PrismaService) {}

  async get(id: number): Promise<StockDividendLog> {
    return await this.prisma.dividendLog.findUnique({
      where: {
        id
      }
    })
  }

  async getAll(where: DividendWhereInput): Promise<StockDividendLog[]> {
    return await this.prisma.dividendLog.findMany({ where })
  }
}
