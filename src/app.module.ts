import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { StockModule } from './stock/stock.module'
import { PolygonModule } from './polygon/polygon.module'
import { TwelveDataModule } from './twelve-data/twelve-data.module'
import { MarketStackModule } from './market-stack/market-stack.module'
import { CacheModule } from '@nestjs/cache-manager'
import { HealthModule } from './health/health.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { PrismaModule } from './prisma/prisma.module'
import { LoggingPlugin } from './utils/graphql/logging.plugin'
import { EmailAddressResolver } from 'graphql-scalars'
import { GraphQLModule } from '@nestjs/graphql'
import { TasksModule } from './tasks/tasks.module'
import { AlphaVantageModule } from './alpha-vantage/alpha-vantage.module'
import { FinancialModelingPrepModule } from './financial-modeling-prep/financial-modeling-prep.module'
import { MarketModule } from './market/market.module'

@Module({
  providers: [LoggingPlugin],
  imports: [
    PrismaModule,
    UserModule,
    StockModule,
    PolygonModule,
    TwelveDataModule,
    MarketStackModule,
    FinancialModelingPrepModule,
    HealthModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 8.64e7
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      formatError: (err) => ({ message: err.message, status: err.extensions.code }),
      resolvers: { EmailAddress: EmailAddressResolver },
      autoSchemaFile: join(process.cwd(), 'stocker-schema.graphql'),
      sortSchema: true
    }),
    TasksModule,
    AlphaVantageModule,
    MarketModule
  ]
})
export class AppModule { }
