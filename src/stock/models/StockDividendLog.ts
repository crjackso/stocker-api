import { toDate } from '@app/utils/date'
import { StockDividendLogAttrs } from '../types'

class StockDividendLog {
  constructor(attributes: StockDividendLogAttrs) {
    this.tickerSymbol = attributes.tickerSymbol
    this.cashAmount = attributes.cashAmount
    this.exDividendDate = toDate(attributes.exDividendDate)
    this.payDate = toDate(attributes.payDate)
  }

  cashAmount: number
  exDividendDate?: Date
  recordDate?: Date
  payDate: Date
  tickerSymbol: string
}

export default StockDividendLog
