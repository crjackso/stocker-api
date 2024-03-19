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
import { join } from 'path'
import { PrismaModule } from './prisma/prisma.module'
import { LoggingPlugin } from './utils/graphql/logging.plugin'
import { EmailAddressResolver } from 'graphql-scalars'

@Module({
  providers: [LoggingPlugin],
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
      driver: ApolloDriver,
      formatError: (err) => ({ message: err.message, status: err.extensions.code }),
      resolvers: { EmailAddress: EmailAddressResolver },
      autoSchemaFile: join(process.cwd(), 'stocker-schema.graphql'),
      definitions: {
        path: join(process.cwd(), 'src/types/graphql/generated.ts'),
        outputAs: 'class'
      }
    }),
    PrismaModule
  ]
})
export class AppModule {}
