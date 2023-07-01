import { MarketStackService } from '@app/market-stack/market-stack.service'
import ApiError from '@app/models/ApiError'
import StockDividendLogs from '@app/models/stocks/StockDividendLogs'
import StockPreviousClose from '@app/models/stocks/StockPreviousClose'
import { TwelveDataService } from '@app/twelve-data/twelve-data.service'
import { IError } from '@app/types'
import { BadRequestException, Controller, Get, Query, UseInterceptors } from '@nestjs/common'
import { CacheInterceptor } from '@nestjs/cache-manager'

@UseInterceptors(CacheInterceptor)
@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: TwelveDataService, private readonly dividendService: MarketStackService) {}

  @Get('dividends')
  async dividends(@Query('tickers') tickers: string): Promise<StockDividendLogs | IError> {
    if (!tickers) {
      throw new BadRequestException('No ticker symbols given')
    }

    return this.dividendService.portfolioDividends(tickers)
  }
  @Get()
  async portfolio(@Query('tickers') tickers: string): Promise<(StockPreviousClose | IError)[] | ApiError> {
    if (!tickers) {
      throw new BadRequestException('No ticker symbols given')
    }

    return await this.stockService.previousClose(tickers)
  }
}
