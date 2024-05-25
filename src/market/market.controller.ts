import { IError } from '@app/types/error'
import { CacheInterceptor } from '@nestjs/cache-manager'
import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { FinancialModelingPrepService } from '@app/financial-modeling-prep/financial-modeling-prep.service'
import { MarketMoverResponse } from '@app/stock/types'

@Controller('markets')
@UseInterceptors(CacheInterceptor)
export class MarketController {
  constructor(private readonly marketService: FinancialModelingPrepService) {}

  @Get('movers')
  async movers(): Promise<MarketMoverResponse | IError> {
    return {
      gainers: await this.marketService.marketGainers(),
      losers: await this.marketService.marektLosers()
    }
  }
}
