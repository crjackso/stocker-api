import StockDividendLog from '@app/models/stocks/StockDividendLog'
import { StockDividendLogAttrs } from '@app/types'

const defaultAttrs: StockDividendLogAttrs = {
  ticker: 'GOOG',
  stockDetails: {
    ticker: 'GOOG',
    logoUrl: 'www.example.com',
    companyName: 'Alphabet'
  }
}

export const Google = new StockDividendLog(defaultAttrs)
