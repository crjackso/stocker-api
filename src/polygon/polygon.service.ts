import StockDividendLog from '@app/models/stocks/StockDividendLog'
import StockDividendLogs from '@app/models/stocks/StockDividendLogs'
import StockPreviousClose from '@app/models/stocks/StockPreviousClose'
import StockApi from '@app/stock/StockApi'
import { Injectable } from '@nestjs/common'
import { IRestClient, restClient } from '@polygon.io/client-js'
import PolygonTranslator from './PolygonTranslator'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class PolygonService implements StockApi {
  private rest: IRestClient
  private translator: PolygonTranslator
  private portfolio: Array<string>

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get('POLYGON_API_KEY')
    if (!apiKey) throw new Error('Please configure Polygon API key')

    this.translator = new PolygonTranslator(configService)
    this.portfolio = this.configService.get('portfolio')
    this.rest = restClient(apiKey)
  }

  public async previousClose(ticker: string): Promise<StockPreviousClose> {
    if (!ticker) throw new Error('Please specify a ticker')

    console.log(`Fetching details for ticker ${ticker}`)
    try {
      const previousCloseData = await this.rest.stocks.previousClose(ticker)
      return this.translator.previousClose(previousCloseData)
    } catch (error) {
      console.error('An error happened:', error)
      throw error
    }
  }

  public async portfolioDividends(): Promise<StockDividendLogs> {
    // console.log('YO YO YO', typeof this.portfolio.map)
    // return new StockDividendLogs()
    const fns = this.portfolio.map(async (ticker) => {
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

      return this.translator.dividends(ticker, tickerDetails, dividendData)
    } catch (error) {
      console.error('An error happened:', error)
      throw error
    }
  }
}
