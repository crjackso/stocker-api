import StockDividendLog from '@app/models/stocks/StockDividendLog'
import StockDividendLogs from '@app/models/stocks/StockDividendLogs'
import StockPreviousClose from '@app/models/stocks/StockPreviousClose'
import { IRestClient, restClient } from '@polygon.io/client-js'
import PolygonTranslator from './PolygonTranslator'
import { ConfigService } from '@nestjs/config'
import { uniqStrings } from '@app/utils/general'
import StockApi from '@app/stock/types'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { Injectable, Inject } from '@nestjs/common'

@Injectable()
export class PolygonService implements StockApi {
  private rest: IRestClient
  private translator: PolygonTranslator

  constructor(private configService: ConfigService, @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    const apiKey = this.configService.get('POLYGON_API_KEY')
    if (!apiKey) throw new Error('Please configure Polygon API key')

    this.translator = new PolygonTranslator(configService)
    this.rest = restClient(apiKey)
  }

  public async previousClose(ticker: string): Promise<StockPreviousClose[]> {
    if (!ticker) throw new Error('Please specify a ticker')

    console.log(`Fetching details for ticker ${ticker}`)
    try {
      const previousCloseData = await this.rest.stocks.previousClose(ticker)
      return [this.translator.previousClose(previousCloseData)]
    } catch (error) {
      console.error('An error happened:', error)
      throw error
    }
  }

  public async portfolioDividends(ticker: string): Promise<StockDividendLogs> {
    const tickers = uniqStrings(ticker)

    const fns = tickers.map(async (ticker) => {
      return await this.dividends(ticker)
    })

    return new StockDividendLogs(await Promise.all(fns))
  }

  private async dividends(ticker: string): Promise<StockDividendLog> {
    if (!ticker) throw new Error('Please specify a ticker')
    console.log(`Fetching dividends for ticker ${ticker}`)

    try {
      const query = { ticker }
      const { results: tickerDetails } = await this.rest.reference.tickerDetails(ticker)
      const dividendData = await this.rest.reference.dividends(query)

      const dividends = this.translator.dividends(ticker, tickerDetails, dividendData)

      await this.cacheManager.set('blah', dividends)

      const cachedData = this.cacheManager.get('blah')

      return dividends
    } catch (error) {
      console.error('An error happened:', error)
      throw error
    }
  }
}
