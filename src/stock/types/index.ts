import { IError } from '@app/types/error'
import Stock from '../models/Stock'
import StockDividendLog from '../models/StockDividendLog'

export interface StockApi {
  previousClose: (ticker: string) => Promise<(Stock | IError)[]>
  portfolioDividends: (ticker: string) => Promise<StockDividendLog[] | IError>
}

export interface MarketApi {
  marketGainers: () => Promise<MarketMover[]>
  marektLosers: () => Promise<MarketMover[]>
}

export interface StockDividendLogAttrs {
  tickerSymbol: string
  exDividendDate?: string
  payDate?: string
  cashAmount?: number
}

export type MarketMover = {
  tickerSymbol: string
  companyName: string
  change: number
  price: number
  changesPercentage: number
}

export type MarketMoverResponse = {
  gainers: MarketMover[]
  losers: MarketMover[]
}
