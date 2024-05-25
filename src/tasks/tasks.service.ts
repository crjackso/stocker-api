import { PrismaService } from '@app/prisma/prisma.service'
import DividendImporter from '@app/utils/data-import/dividendImporter'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import StockImporter from '@app/utils/data-import/stockImporter'
import { StockService } from '@app/stock/stock.service'
import { FinancialModelingPrepService } from '@app/financial-modeling-prep/financial-modeling-prep.service'

@Injectable()
export class TasksService {
  private readonly dividendImporter: DividendImporter
  private readonly stockImporter: StockImporter

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly stockService: StockService,
    private readonly financialPrepModelingService: FinancialModelingPrepService
  ) {
    this.dividendImporter = new DividendImporter(this.financialPrepModelingService, this.prisma)
    this.stockImporter = new StockImporter(this.financialPrepModelingService, this.stockService)
  }

  async importDividendData(): Promise<void> {
    await this.dividendImporter.run(this.configService.get('portfolio'))
  }

  async importStockData(): Promise<void> {
    await this.stockImporter.run(this.configService.get('portfolio'))
  }
}
