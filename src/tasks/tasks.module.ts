import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TasksService } from './tasks.service'
import { MarketStackModule } from '@app/market-stack/market-stack.module'
import { PrismaService } from '@app/prisma/prisma.service'
import configuration from '@app/config/configuration'
import { StockModule } from '@app/stock/stock.module'
import { StockService } from '@app/stock/stock.service'
import { TwelveDataModule } from '@app/twelve-data/twelve-data.module'
import { AlphaVantageModule } from '@app/alpha-vantage/alpha-vantage.module'
import { FinancialModelingPrepModule } from '@app/financial-modeling-prep/financial-modeling-prep.module'

@Module({
  imports: [
    MarketStackModule,
    StockModule,
    TwelveDataModule,
    AlphaVantageModule,
    FinancialModelingPrepModule,
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
  providers: [TasksService, PrismaService, StockService]
})
export class TasksModule {}
