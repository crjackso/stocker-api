import Stock from '@app/stock/models/Stock'
import StockDividendLog from '@app/stock/models/StockDividendLog'
import { StockApi } from '@app/stock/types'
import { IError } from '@app/types/error'
import { ApiClient } from '@app/utils/apiClient'
import { uniqStrings } from '@app/utils/general'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CompanyOverview, GlobalQuote, GlobalQuoteResponse } from './types'
import { toDate } from '@app/utils/date'

@Injectable()
export class AlphaVantageService implements StockApi {
  private readonly logger = new Logger(AlphaVantageService.name)
  portfolioDividends: (ticker: string) => Promise<IError | StockDividendLog[]>

  constructor(
    private configService: ConfigService,
    private apiClient: ApiClient
  ) {
    const apiKey = this.configService.get('TWELVE_DATA_API_KEY')
    if (!apiKey) throw new Error('Please configure Twelve Data API key')

    this.initializeApiClient(apiKey)
  }

  public async previousClose(tickers: string): Promise<(Stock | IError)[]> {
    const stocks: Stock[] = []
    const symbols = uniqStrings(tickers)

    this.logger.log(`Querying previous close information for ${symbols.join(',')}`)

    for (const ticker of symbols) {
      const previousCloseAttributes = await this.queryPreviousClose(ticker)
      const companyOverviewAttributes = await this.queryCompanyOverview(ticker)

      stocks.push(
        new Stock({
          tickerSymbol: previousCloseAttributes['01. symbol'],
          lastPrice: parseFloat(previousCloseAttributes['08. previous close']),
          lastPriceAsOfDate: toDate(previousCloseAttributes['07. latest trading day']),
          companyName: companyOverviewAttributes.Name,
          assetType: companyOverviewAttributes.AssetType
        })
      )
    }

    return stocks
  }

  private async queryCompanyOverview(symbol: string): Promise<CompanyOverview> {
    return await this.apiClient.get<CompanyOverview>('query', {
      function: 'OVERVIEW',
      symbol
    })
  }

  private async queryPreviousClose(symbol: string): Promise<GlobalQuote> {
    const response = await this.apiClient.get<GlobalQuoteResponse>('query', {
      function: 'GLOBAL_QUOTE',
      symbol
    })

    this.logger.debug('[alpha-vantage] Previous Close response', response)

    return response['Global Quote']
  }

  private initializeApiClient(apikey: string) {
    this.apiClient.withBaseUrl(this.configService.get('alphaVantageBaseUrl')).withDefaultQuery({ apikey })
  }
}
