import { Module } from '@nestjs/common'
import { AlphaVantageService } from './alpha-vantage.service'
import configuration from '@app/config/configuration'
import { ConfigModule } from '@nestjs/config'
import { ApiClient } from '@app/utils/apiClient'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
  providers: [AlphaVantageService, ApiClient],
  exports: [AlphaVantageService]
})
export class AlphaVantageModule {}
