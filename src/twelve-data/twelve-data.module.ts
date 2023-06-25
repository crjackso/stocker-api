import { Module } from '@nestjs/common'
import { TwelveDataService } from './twelve-data.service'
import { ConfigModule } from '@nestjs/config'
import configuration from '@app/config/configuration'
import { ApiClient } from '@app/utils/apiClient'

@Module({
  providers: [TwelveDataService, ApiClient],
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
  exports: [TwelveDataService, ApiClient]
})
export class TwelveDataModule {}
