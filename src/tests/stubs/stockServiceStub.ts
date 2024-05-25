import { StockService } from '@app/stock/stock.service'

export default {
  provide: StockService,
  useValue: {
    upsert: jest.fn()
  }
}
