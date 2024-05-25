import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FetchError } from 'ofetch'
import { Dictionary, IApiError, TwelveDataPreviousCloseAttrs } from './types'
import { IError } from '@app/types/error'
import { uniqStrings } from '@app/utils/general'
import { ApiClient } from '@app/utils/apiClient'
import { StockApi } from '@app/stock/types'
import StockDividendLog from '@app/stock/models/StockDividendLog'
import Stock from '@app/stock/models/Stock'
import { fromUnix } from '@app/utils/date'
import { BaseError } from '@app/baseError'

@Injectable()
export class TwelveDataService implements StockApi {
  private readonly logger = new Logger(TwelveDataService.name)
  portfolioDividends: () => Promise<StockDividendLog[]>
  private static baseUrl = 'https://api.twelvedata.com'

  constructor(
    private configService: ConfigService,
    private apiClient: ApiClient
  ) {
    const apiKey = this.configService.get('TWELVE_DATA_API_KEY')
    if (!apiKey) throw new Error('Please configure Twelve Data API key')
    this.apiClient.withHeaders(this.requestHeaders(apiKey)).withBaseUrl(TwelveDataService.baseUrl)
  }

  public async previousClose(tickers: string): Promise<(Stock | IError)[]> {
    const symbol = uniqStrings(tickers).join(',')
    this.logger.log(`Querying previous close information for ${symbol}`)
    const response = await this.apiClient.get<Dictionary | TwelveDataPreviousCloseAttrs | FetchError>('quote', {
      symbol
    })

    if (response['code'] === 429) {
      throw new BaseError('[twelve-data] Stock query failed', { cause: new FetchError(response['message']) })
    }

    this.logger.log(`Previous close response: ${JSON.stringify(response)}`)

    return this.mapPreviousCloseQuotes(response)
  }

  private mapPreviousCloseQuotes(response: Dictionary | TwelveDataPreviousCloseAttrs): (Stock | IError)[] {
    const quotes = []
    const twelveData = this.pluralizePreviousClose(response)

    for (const entry of Object.entries(twelveData)) {
      if (!this.isApiError(entry[1])) {
        quotes.push(this.mapPreviousCloseQuote(entry[1]))
      }
    }
    return quotes
  }

  private pluralizePreviousClose(response: TwelveDataPreviousCloseAttrs | Dictionary) {
    if (response.symbol) {
      // if successful response is a singular object
      return [response]
    } else if (this.isApiError(response)) {
      // else if unsuccessful response is a singular object
      return []
    }

    return response
  }

  private mapPreviousCloseQuote(quote: TwelveDataPreviousCloseAttrs): Stock | IError {
    return new Stock({
      tickerSymbol: quote.symbol,
      companyName: quote.name,
      assetType: 'CommonStock', // TODO
      lastPrice: parseFloat(quote.previous_close),
      lastPriceAsOfDate: fromUnix(quote.timestamp),
      fiftyTwoWeekLow: parseFloat(quote.fifty_two_week.low),
      fiftyTwoWeekHigh: parseFloat(quote.fifty_two_week.high)
    })
  }

  private isApiError(response: any): response is IApiError {
    return (response as IApiError).status === 'error'
  }

  private requestHeaders(apiKey: string): Record<string, string> {
    return {
      Authorization: `apikey ${apiKey}`
    }
  }
}
