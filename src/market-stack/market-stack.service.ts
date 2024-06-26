import Stock from '@app/stock/models/Stock'
import MarketStackTranslator from './MarketStackTranslator'
import { ConfigService } from '@nestjs/config'
import { uniqStrings } from '@app/utils/general'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { Injectable, Inject } from '@nestjs/common'
import { ApiClient } from '@app/utils/apiClient'
import { DividendResponse } from './types'
import ApiError from '@app/models/ApiError'
import { IError } from '@app/types/error'
import { StockApi } from '@app/stock/types'
import StockDividendLog from '@app/stock/models/StockDividendLog'

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

  public async previousClose(): Promise<Stock[]> {
    throw new Error('Not implemented')
  }

  public async portfolioDividends(ticker: string): Promise<StockDividendLog[] | IError> {
    const symbols = uniqStrings(ticker).join(',')

    try {
      const response = await this.apiClient.get<DividendResponse>('dividends', {
        symbols
      })

      return this.translator.translateDividends(response)
    } catch (error) {
      return new ApiError(error.message)
    }
  }

  private initializeApiClient(apiKey: string) {
    this.apiClient.withBaseUrl(this.baseUrl).withDefaultQuery({ access_key: apiKey })
  }
}
