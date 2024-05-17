import Stock from '@app/stock/models/Stock'
import StockDividendLog from '@app/stock/models/StockDividendLog'
import { MarketApi, MarketMover, StockApi } from '@app/stock/types'
import { IError } from '@app/types/error'
import { ApiClient } from '@app/utils/apiClient'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  CompanyOverview,
  CompanyOverviewResponse,
  FinancialModelingPrepMarketMover,
  HistoricalDividends,
  Quote,
  Quotes
} from './types'
import { fromUnix } from '@app/utils/date'
import { uniqStrings } from '@app/utils/general'
import { AssetType } from '@app/stock/graphql/types/assetType.enum'

@Injectable()
export class FinancialModelingPrepService implements StockApi, MarketApi {
  private readonly logger = new Logger(FinancialModelingPrepService.name)

  constructor(
    private configService: ConfigService,
    private apiClient: ApiClient
  ) {
    const apiKey = this.configService.get('FINANCIAL_MODELING_PREP_API_KEY')
    if (!apiKey) throw new Error('Please configure Financial Modeling Prep key')

    this.initializeApiClient(apiKey)
  }

  public async marketGainers(): Promise<MarketMover[]> {
    const movers = await this.apiClient.get<FinancialModelingPrepMarketMover[]>('stock_market/gainers')
    return this.mapMovers(movers)
  }

  public async marektLosers(): Promise<MarketMover[]> {
    const movers = await this.apiClient.get<FinancialModelingPrepMarketMover[]>('stock_market/losers')
    return this.mapMovers(movers)
  }

  public async previousClose(tickers: string): Promise<(Stock | IError)[]> {
    const stocks: Stock[] = []
    const symbols = uniqStrings(tickers)

    for (const ticker of symbols) {
      const previousCloseAttributes = await this.queryPreviousClose(ticker)
      const companyOverviewAttributes = await this.queryCompanyOverview(ticker)

      stocks.push(
        new Stock({
          tickerSymbol: previousCloseAttributes.symbol,
          lastPrice: previousCloseAttributes.previousClose,
          lastPriceAsOfDate: fromUnix(previousCloseAttributes.timestamp),
          companyName: companyOverviewAttributes.companyName,
          assetType: companyOverviewAttributes.isEtf ? AssetType.ETF : AssetType.CommonStock,
          fiftyTwoWeekHigh: previousCloseAttributes.yearHigh,
          fiftyTwoWeekLow: previousCloseAttributes.yearLow,
          logoUrl: companyOverviewAttributes.image
        })
      )
    }

    return stocks
  }

  public async portfolioDividends(tickers: string): Promise<IError | StockDividendLog[]> {
    let dividendLogs: StockDividendLog[] = []
    const symbols = uniqStrings(tickers)

    for (const ticker of symbols) {
      this.logger.debug(`Querying dividends for ${ticker}`)
      const historicalDividends = await this.queryHistoricalDividends(ticker)
      dividendLogs = [...dividendLogs, ...historicalDividends]
    }

    return dividendLogs
  }

  private mapMovers(movers: FinancialModelingPrepMarketMover[]): MarketMover[] {
    return movers.map((mover) => {
      return {
        ...mover,
        tickerSymbol: mover.symbol,
        companyName: mover.name
      }
    })
  }

  private async queryPreviousClose(symbol: string): Promise<Quote> {
    const quotes = await this.apiClient.get<Quotes>(`quote/${symbol}`)
    return quotes[0]
  }

  private async queryCompanyOverview(symbol: string): Promise<CompanyOverview> {
    const overviewResponse = await this.apiClient.get<CompanyOverviewResponse>(`profile/${symbol}`)
    return overviewResponse[0]
  }

  private async queryHistoricalDividends(symbol: string): Promise<StockDividendLog[]> {
    const url = `/historical-price-full/stock_dividend/${symbol}`
    const historicalDividendResponse = await this.apiClient.get<HistoricalDividends>(url)

    // TODO: Encapsulate validation logic elsewhere
    const validDividends = historicalDividendResponse.historical.filter((data) => data.paymentDate)

    return validDividends.map((historicalData) => {
      return new StockDividendLog({
        tickerSymbol: symbol,
        cashAmount: historicalData.adjDividend,
        exDividendDate: historicalData.declarationDate,
        payDate: historicalData.paymentDate
      })
    })
  }

  private initializeApiClient(apikey: string) {
    this.apiClient.withBaseUrl(this.configService.get('financialModelingPrepBaseUrl')).withDefaultQuery({ apikey })
  }
}
