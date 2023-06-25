import StockPreviousClose from '@app/models/stocks/StockPreviousClose'
import { TwelveDataService } from '@app/twelve-data/twelve-data.service'
import { IError } from '@app/types'
import { Vti } from '../factories/StockPreviousClose'

const TwelveDataServiceStub = {
  provide: TwelveDataService,
  useValue: {
    previousClose: async (): Promise<(StockPreviousClose | IError)[]> => {
      return Promise.resolve([Vti])
    }
  }
}

export default TwelveDataServiceStub
