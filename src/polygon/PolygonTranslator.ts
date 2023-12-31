import { IAggsPreviousClose, IDividendsResults } from '@polygon.io/client-js'
import StockDetails from '@app/models/stocks/StockDetails'
import StockDividendLog from '@app/models/stocks/StockDividendLog'
import StockPreviousClose from '@app/models/stocks/StockPreviousClose'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

@Injectable()
class PolygonTranslator {
  constructor(private configService: ConfigService) {}

  public previousClose(data: IAggsPreviousClose) {
    const mostRecentClose = data.results?.find(Boolean)

    return new StockPreviousClose({
      ticker: mostRecentClose.T,
      price: <number>mostRecentClose?.c,
      asOfDateUnix: <number>mostRecentClose?.t,
      fiftyWeekHigh: null,
      fiftyWeekLow: null
    })
  }

  public dividends(ticker: string, tickerDetails: any, data: IDividendsResults) {
    const mostRecentDividendLog = data.results?.find(Boolean)
    const stockDetails = this.stockDetails(ticker, tickerDetails)

    if (!mostRecentDividendLog?.ex_dividend_date) {
      return new StockDividendLog({
        ticker,
        stockDetails
      })
    } else {
      return new StockDividendLog({
        ticker,
        stockDetails,
        exDividendDate: mostRecentDividendLog.ex_dividend_date,
        payDate: mostRecentDividendLog.pay_date,
        cashAmount: mostRecentDividendLog.cash_amount
      })
    }
  }

  public stockDetails(ticker: string, tickerDetails: any) {
    return new StockDetails({
      companyName: tickerDetails.name,
      ticker,
      logoUrl: tickerDetails.branding?.logo_url?.concat(`?apiKey=${this.configService.get('POLYGON_API_KEY')}`)
    })
  }
}

export default PolygonTranslator
