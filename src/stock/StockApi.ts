import StockDividendLogs from '@app/models/stocks/StockDividendLogs'
import StockPreviousClose from '@app/models/stocks/StockPreviousClose'
import { IError } from '@app/types'

interface StockApi {
  previousClose: (ticker: string) => Promise<(StockPreviousClose | IError)[]>
  portfolioDividends: () => Promise<StockDividendLogs>
}

export default StockApi
