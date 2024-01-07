import StockPreviousClose from '@app/models/stocks/StockPreviousClose'
import { MarketStackService } from '@app/market-stack/market-stack.service'
import { IError } from '@app/types'
import { Vti } from '../factories/StockPreviousClose'

const MarketStackServiceStub = {
  provide: MarketStackService,
  useValue: {
    previousClose: async (): Promise<(StockPreviousClose | IError)[]> => {
      return Promise.resolve([Vti])
    }
  }
}

export default MarketStackServiceStub
