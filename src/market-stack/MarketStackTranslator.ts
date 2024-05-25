import { Injectable } from '@nestjs/common'
import { DividendResponse } from './types'
import StockDividendLog from '@app/stock/models/StockDividendLog'

@Injectable()
class MarketStackTranslator {
  public translateDividends(response: DividendResponse): StockDividendLog[] {
    if (!response?.data) throw new Error('MarketStack response was not received')

    return response.data.map((res) => {
      return new StockDividendLog({
        tickerSymbol: res.symbol,
        cashAmount: res.dividend,
        payDate: res.date,
        exDividendDate: this.randomDate(new Date(2012, 0, 1), new Date()) // TODO: Switch to data provider that provides this data point
      })
    })
  }

  randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toString()
  }
}

export default MarketStackTranslator
