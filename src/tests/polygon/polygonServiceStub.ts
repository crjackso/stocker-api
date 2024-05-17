import { PolygonService } from '@app/polygon/polygon.service'
import { Google } from '../factories/StockDividendLog'
import StockDividendLog from '@app/stock/models/StockDividendLog'

const PolygonServiceStub = {
  provide: PolygonService,
  useValue: {
    portfolioDividends: async (): Promise<StockDividendLog[]> => {
      return Promise.resolve([Google])
    }
  }
}

export default PolygonServiceStub
