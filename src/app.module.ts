import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { StockModule } from './stock/stock.module'
import { PolygonModule } from './polygon/polygon.module'
import { TwelveDataModule } from './twelve-data/twelve-data.module'
import { MarketStackModule } from './market-stack/market-stack.module'
import { CacheModule } from '@nestjs/cache-manager'
import { HealthModule } from './health/health.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

@Module({
  imports: [
    UserModule,
    StockModule,
    PolygonModule,
    TwelveDataModule,
    MarketStackModule,
    HealthModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 8.64e7
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver
    })
  ]
})
export class AppModule {}
