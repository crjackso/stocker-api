import { IAggsPreviousClose, IDividendsResults } from '@polygon.io/client-js'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import Stock from '@app/stock/models/Stock'
import StockDividendLog from '@app/stock/models/StockDividendLog'
import { fromUnix } from '@app/utils/date'
import { AssetType } from '@app/stock/graphql/types/assetType.enum'

@Injectable()
class PolygonTranslator {
  constructor(private configService: ConfigService) {}

  public previousClose(data: IAggsPreviousClose): Stock {
    const mostRecentClose = data.results?.find(Boolean)

    return new Stock({
      tickerSymbol: mostRecentClose.T,
      companyName: 'TODO', // TODO
      assetType: AssetType.CommonStock, // TODO
      lastPrice: <number>mostRecentClose?.c,
      lastPriceAsOfDate: fromUnix(mostRecentClose?.t),
      fiftyTwoWeekHigh: null,
      fiftyTwoWeekLow: null
    })
  }

  public dividends(tickerSymbol: string, tickerDetails: any, data: IDividendsResults) {
    const mostRecentDividendLog = data.results?.find(Boolean)

    if (!mostRecentDividendLog?.ex_dividend_date) {
      return new StockDividendLog({
        tickerSymbol
      })
    } else {
      return new StockDividendLog({
        tickerSymbol,
        exDividendDate: mostRecentDividendLog.ex_dividend_date,
        payDate: mostRecentDividendLog.pay_date,
        cashAmount: mostRecentDividendLog.cash_amount
      })
    }
  }
}

export default PolygonTranslator
