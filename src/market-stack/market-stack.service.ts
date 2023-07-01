import StockDividendLogs from '@app/models/stocks/StockDividendLogs'
import StockPreviousClose from '@app/models/stocks/StockPreviousClose'
import MarketStackTranslator from './MarketStackTranslator'
import { ConfigService } from '@nestjs/config'
import { uniqStrings } from '@app/utils/general'
import StockApi from '@app/stock/types'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { Injectable, Inject } from '@nestjs/common'
import { ApiClient } from '@app/utils/apiClient'
import { DividendResponse } from './types'
import ApiError from '@app/models/ApiError'
import { IError } from '@app/types'

@Injectable()
export class MarketStackService implements StockApi {
  private translator: MarketStackTranslator
  private readonly baseUrl = 'http://api.marketstack.com/v1'

  constructor(
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private apiClient: ApiClient
  ) {
    const apiKey = this.configService.get('MARKET_STACK_API_KEY')
    if (!apiKey) throw new Error('Please configure MarketStack API key')

    this.initializeApiClient(apiKey)
    this.translator = new MarketStackTranslator()
  }

  public async previousClose(): Promise<StockPreviousClose[]> {
    throw new Error('Not implemented')
  }

  public async portfolioDividends(ticker: string): Promise<StockDividendLogs | IError> {
    const symbols = uniqStrings(ticker).join(',')

    try {
      const response = await this.apiClient.get<DividendResponse>('dividends', {
        symbols
      })

      // if (this.isApiError(response)) {
      //   return new ApiError(response.message)
      // }

      return this.translator.translateDividends(response)
    } catch (error) {
      return new ApiError(error.message)
    }
  }

  // private isApiError(response): response is IError {
  //   return response.statusCode !== 200
  // }

  private initializeApiClient(apiKey: string) {
    this.apiClient.withBaseUrl(this.baseUrl).withDefaultQuery({ access_key: apiKey })
  }
}
