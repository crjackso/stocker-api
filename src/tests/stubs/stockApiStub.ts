import { StockApi } from '@app/stock/types'
import { IError } from '@app/types/error'
import { Vti } from '../factories/Stock'
import Stock from '@app/stock/models/Stock'
import StockDividendLog from '@app/stock/models/StockDividendLog'
import { Google } from '../factories/StockDividendLog'

const stockApiStub: StockApi = {
  previousClose: async (): Promise<(Stock | IError)[]> => {
    return Promise.resolve([Vti])
  },
  portfolioDividends: async (): Promise<StockDividendLog[] | IError> => {
    return Promise.resolve([Google])
  }
}

export default stockApiStub
