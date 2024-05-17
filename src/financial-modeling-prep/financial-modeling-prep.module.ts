import { Module } from '@nestjs/common'
import configuration from '@app/config/configuration'
import { ConfigModule } from '@nestjs/config'
import { ApiClient } from '@app/utils/apiClient'
import { FinancialModelingPrepService } from './financial-modeling-prep.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
  providers: [FinancialModelingPrepService, ApiClient],
  exports: [FinancialModelingPrepService]
})
export class FinancialModelingPrepModule {}
