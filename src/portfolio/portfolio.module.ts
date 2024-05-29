import { Module } from '@nestjs/common'
import { PortfolioService } from './portfolio.service'
import { PortfolioResolver } from './graphql/resolvers/portfolio.resolver'
import { PrismaService } from '@app/prisma/prisma.service'
import { StockService } from '@app/stock/stock.service'
import { UserService } from '@app/user/user.service'

@Module({
  providers: [PrismaService, PortfolioService, PortfolioResolver, StockService, UserService]
})
export class PortfolioModule { }
