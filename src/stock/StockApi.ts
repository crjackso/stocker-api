import StockDividendLogs from '@app/models/stocks/StockDividendLogs'
import StockPreviousClose from '@app/models/stocks/StockPreviousClose'

interface StockApi {
  previousClose: (ticker: string) => Promise<StockPreviousClose>
  portfolioDividends: () => Promise<StockDividendLogs>
}

export default StockApi
