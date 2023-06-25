import StockPreviousClose from '@app/models/stocks/StockPreviousClose'
import { StockPreviousCloseAttrs } from '@app/types'

const defaultAttrs: StockPreviousCloseAttrs = {
  ticker: 'VTI',
  price: 214.98,
  asOfDateUnix: 0
}

export const Vti = new StockPreviousClose(defaultAttrs)
