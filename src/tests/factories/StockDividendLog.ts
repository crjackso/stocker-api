import StockDividendLog from '@app/stock/models/StockDividendLog'
import { StockDividendLogAttrs } from '@app/stock/types'

const defaultAttrs: StockDividendLogAttrs = {
  tickerSymbol: 'GOOG',
  cashAmount: 82.9,
  exDividendDate: '3/15/2024',
  payDate: '3/18/2024'
}

export const Google = new StockDividendLog(defaultAttrs)
