import ApiError from '@app/models/ApiError'
import StockPreviousClose from '@app/models/stocks/StockPreviousClose'
import { TwelveDataService } from '@app/twelve-data/twelve-data.service'
import { IError } from '@app/types'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: TwelveDataService) {}

  @Get()
  async portfolio(@Query('tickers') tickers: string): Promise<(StockPreviousClose | IError)[] | ApiError> {
    if (!tickers) {
      throw new BadRequestException('No ticker symbols given')
    }

    return await this.stockService.previousClose(tickers)
  }
}
