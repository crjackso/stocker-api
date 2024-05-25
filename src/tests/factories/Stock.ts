import Stock from '@app/stock/models/Stock'
import { Transient } from '@app/types/transient'

const defaultAttrs: Transient<Stock> = {
  tickerSymbol: 'VTI',
  companyName: 'Vanguard Total Stock Market Index Fund ETF',
  lastPrice: 214.98,
  lastPriceAsOfDate: new Date(),
  assetType: 'ETF'
}

export const Vti = new Stock(defaultAttrs)
