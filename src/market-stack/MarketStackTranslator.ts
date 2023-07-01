import { Injectable } from '@nestjs/common'
import StockDividendLogs from '@app/models/stocks/StockDividendLogs'
import { DividendResponse } from './types'
import StockDividendLog from '@app/models/stocks/StockDividendLog'

@Injectable()
class MarketStackTranslator {
  public translateDividends(response: DividendResponse): StockDividendLogs {
    if (!response?.data) throw new Error('MarketStack response was not received')

    const logs = response.data.map((res) => {
      return new StockDividendLog({
        ticker: res.symbol,
        cashAmount: res.dividend,
        payDate: res.date
      })
    })

    return new StockDividendLogs(logs)
  }
}

export default MarketStackTranslator
