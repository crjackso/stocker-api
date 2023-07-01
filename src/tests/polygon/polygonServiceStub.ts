import { PolygonService } from '@app/polygon/polygon.service'
import StockDividendLogs from '@app/models/stocks/StockDividendLogs'
import { stockDividendLogs } from '../factories/StockDividendLogs'

const PolygonServiceStub = {
  provide: PolygonService,
  useValue: {
    portfolioDividends: async (): Promise<StockDividendLogs> => {
      return Promise.resolve(stockDividendLogs)
    }
  }
}

export default PolygonServiceStub
