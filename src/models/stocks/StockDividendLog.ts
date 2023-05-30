import { toDate, formatDate } from '@app/utils/date'
import StockDetails from './StockDetails'

class StockDividendLog {
  constructor({
    tickerSymbol,
    exDividendDate,
    payDate,
    stockDetails,
    cashAmount
  }: {
    tickerSymbol: string
    stockDetails: StockDetails
    exDividendDate?: string
    payDate?: string
    cashAmount?: number
  }) {
    this.tickerSymbol = tickerSymbol
    this.exDividendDate = toDate(exDividendDate)
    this.payDate = toDate(payDate)
    this.payDateFormatted = formatDate(payDate)
    this.stockDetails = stockDetails
    this.cashAmount = cashAmount
  }

  cashAmount: number | undefined
  exDividendDate: Date | undefined
  payDate: Date | undefined
  stockDetails: StockDetails
  payDateFormatted: string | undefined
  tickerSymbol: string | undefined
}

export default StockDividendLog
