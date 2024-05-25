import Stock from '@app/stock/models/Stock'
import { IRestClient, restClient } from '@polygon.io/client-js'
import PolygonTranslator from './PolygonTranslator'
import { ConfigService } from '@nestjs/config'
import { uniqStrings } from '@app/utils/general'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { Injectable, Inject } from '@nestjs/common'
import { StockApi } from '@app/stock/types'
import StockDividendLog from '@app/stock/models/StockDividendLog'

@Injectable()
export class PolygonService implements StockApi {
  private rest: IRestClient
  private translator: PolygonTranslator

  constructor(
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {
    const apiKey = this.configService.get('POLYGON_API_KEY')
    if (!apiKey) throw new Error('Please configure Polygon API key')

    this.translator = new PolygonTranslator(configService)
    this.rest = restClient(apiKey)
  }

  public async previousClose(ticker: string): Promise<Stock[]> {
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

  public async portfolioDividends(ticker: string): Promise<StockDividendLog[]> {
    const tickers = uniqStrings(ticker)

    const fns = tickers.map(async (ticker) => {
      return await this.dividends(ticker)
    })

    return await Promise.all(fns)
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

      return dividends
    } catch (error) {
      console.error('An error happened:', error)
      throw error
    }
  }
}
