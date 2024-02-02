import StockDividendLogs from '@app/models/stocks/StockDividendLogs'
import StockPreviousClose from '@app/models/stocks/StockPreviousClose'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FetchError } from 'ofetch'
import { Dictionary, IApiError, TwelveDataPreviousCloseAttrs } from './types'
import CompanyProfile from '@app/models/stocks/CompanyProfile'
import { IError } from '@app/types'
import { uniqStrings } from '@app/utils/general'
import { ApiClient } from '@app/utils/apiClient'
import StockApi from '@app/stock/types'

@Injectable()
export class TwelveDataService implements StockApi {
  private readonly logger = new Logger(TwelveDataService.name)
  portfolioDividends: () => Promise<StockDividendLogs>
  private static baseUrl = 'https://api.twelvedata.com'

  constructor(private configService: ConfigService, private apiClient: ApiClient) {
    const apiKey = this.configService.get('TWELVE_DATA_API_KEY')
    if (!apiKey) throw new Error('Please configure Twelve Data API key')
    this.logger.log(
      `The TwelveData API key has been retrieved successfully: ${JSON.stringify(this.requestHeaders(apiKey))}`
    )
    this.apiClient.withHeaders(this.requestHeaders(apiKey)).withBaseUrl(TwelveDataService.baseUrl)
  }

  public async previousClose(tickers: string): Promise<(StockPreviousClose | IError)[]> {
    const symbol = uniqStrings(tickers).join(',')
    this.logger.log(`Querying previous close information for ${symbol}`)
    const response = await this.apiClient.get<Dictionary | TwelveDataPreviousCloseAttrs | FetchError>('quote', {
      symbol
    })

    this.logger.log(`Previous close response: ${JSON.stringify(response)}`)

    return this.mapPreviousCloseQuotes(response)
  }

  private mapPreviousCloseQuotes(response: Dictionary | TwelveDataPreviousCloseAttrs): (StockPreviousClose | IError)[] {
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

  private mapPreviousCloseQuote(quote: TwelveDataPreviousCloseAttrs): StockPreviousClose | IError {
    return new StockPreviousClose({
      ticker: quote.symbol,
      price: parseFloat(quote.close),
      asOfDateUnix: quote.timestamp,
      fiftyWeekLow: parseFloat(quote.fifty_two_week.low),
      fiftyWeekHigh: parseFloat(quote.fifty_two_week.high),
      companyProfile: new CompanyProfile({
        ticker: quote.symbol,
        name: quote.name
      })
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
