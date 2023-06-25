import StockDividendLogs from '@app/models/stocks/StockDividendLogs'
import StockPreviousClose from '@app/models/stocks/StockPreviousClose'
import StockApi from '@app/stock/StockApi'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FetchError } from 'ofetch'
import { Dictionary, IApiError, TwelveDataPreviousCloseAttrs } from './types'
import CompanyProfile from '@app/models/stocks/CompanyProfile'
import { IError } from '@app/types'
import ApiError from '@app/models/ApiError'
import { uniqStrings } from '@app/utils/general'
import { ApiClient } from '@app/utils/apiClient'

@Injectable()
export class TwelveDataService implements StockApi {
  portfolioDividends: () => Promise<StockDividendLogs>
  private apiKey: string
  private static baseUrl = 'https://api.twelvedata.com'

  constructor(private configService: ConfigService, private apiClient: ApiClient) {
    this.apiKey = this.configService.get('TWELVE_DATA_API_KEY')
    if (!this.apiKey) throw new Error('Please configure Twelve Data API key')
    this.apiClient.withApiKey(this.apiKey).withBaseUrl(TwelveDataService.baseUrl)
  }

  public async previousClose(tickers: string): Promise<(StockPreviousClose | IError)[]> {
    const symbol = uniqStrings<string>(tickers)
    const response = await this.apiClient.get<Dictionary | TwelveDataPreviousCloseAttrs | FetchError>('quote', {
      symbol
    })

    if (this.isError(response)) {
      throw new Error(response.message)
    }

    return this.mapPreviousCloseQuotes(response)
  }

  private mapPreviousCloseQuotes(response: Dictionary | TwelveDataPreviousCloseAttrs): (StockPreviousClose | IError)[] {
    if (this.isSingleQuote(response)) {
      return [this.mapPreviousCloseQuote(response)]
    } else {
      return Object.values(response).map((previousClose: TwelveDataPreviousCloseAttrs) => {
        return this.mapPreviousCloseQuote(previousClose)
      })
    }
  }

  private mapPreviousCloseQuote(quote: TwelveDataPreviousCloseAttrs | IApiError): StockPreviousClose | IError {
    if (this.isApiError(quote)) {
      return new ApiError(quote.message)
    }

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

  private isSingleQuote(response): response is TwelveDataPreviousCloseAttrs {
    return !!(response as TwelveDataPreviousCloseAttrs).symbol
  }

  private isError(response): response is FetchError {
    return response instanceof FetchError || response.status === 'error'
  }

  private isApiError(response): response is IApiError {
    return (response as IApiError).status === 'error'
  }
}
