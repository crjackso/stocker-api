import Stock from '@app/stock/models/Stock'
import { MarketStackService } from '@app/market-stack/market-stack.service'
import { IError } from '@app/types/error'
import { Vti } from '../factories/Stock'

const MarketStackServiceStub = {
  provide: MarketStackService,
  useValue: {
    previousClose: async (): Promise<(Stock | IError)[]> => {
      return Promise.resolve([Vti])
    }
  }
}

export default MarketStackServiceStub
