import Stock from '@app/stock/models/Stock'
import { TwelveDataService } from '@app/twelve-data/twelve-data.service'
import { IError } from '@app/types/error'
import { Vti } from '../factories/Stock'

const TwelveDataServiceStub = {
  provide: TwelveDataService,
  useValue: {
    previousClose: async (): Promise<(Stock | IError)[]> => {
      return Promise.resolve([Vti])
    }
  }
}

export default TwelveDataServiceStub
