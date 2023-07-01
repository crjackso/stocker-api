import { Module } from '@nestjs/common'
import { MarketStackService } from './market-stack.service'
import { ConfigModule } from '@nestjs/config'
import configuration from '@app/config/configuration'
import { ApiClient } from '@app/utils/apiClient'

@Module({
  providers: [MarketStackService, ApiClient],
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
  exports: [MarketStackService, ApiClient]
})
export class MarketStackModule {}
