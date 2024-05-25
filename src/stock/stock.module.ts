import { Module } from '@nestjs/common'
import { PolygonModule } from '@app/polygon/polygon.module'
import { TwelveDataModule } from '@app/twelve-data/twelve-data.module'
import { MarketStackModule } from '@app/market-stack/market-stack.module'
import { StockService } from './stock.service'
import { PrismaService } from '@app/prisma/prisma.service'
import { StockResolver } from './graphql/resolvers/stock.resolver'
import { DividendService } from './dividend.service'
import { StockDividendLogResolver } from './graphql/resolvers/stockDividendLog.resolver'

@Module({
  imports: [PolygonModule, TwelveDataModule, MarketStackModule],
  providers: [StockService, StockResolver, PrismaService, DividendService, StockDividendLogResolver]
})
export class StockModule {}
