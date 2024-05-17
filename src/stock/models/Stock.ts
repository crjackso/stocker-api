import { Transient } from '@app/types/transient'

export type AssetType = {
  ETF: 'ETF'
  CommonStock: 'Common Stock'
}

export default class Stock {
  id: number
  companyName: string
  tickerSymbol: string
  logoUrl?: string
  assetType: string
  lastPrice: number
  lastPriceAsOfDate: Date
  fiftyTwoWeekLow?: number
  fiftyTwoWeekHigh?: number
  createdAt: Date
  updatedAt: Date

  constructor(attrs: Transient<Stock>) {
    for (const [key, value] of Object.entries(attrs)) {
      this[key] = value
    }
  }
}
