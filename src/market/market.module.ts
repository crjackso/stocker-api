import { Module } from '@nestjs/common'
import { MarketController } from './market.controller'
import { FinancialModelingPrepModule } from '@app/financial-modeling-prep/financial-modeling-prep.module'

@Module({
  controllers: [MarketController],
  imports: [FinancialModelingPrepModule]
})
export class MarketModule {}
