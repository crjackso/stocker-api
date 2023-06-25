import * as dayjs from 'dayjs'
import CompanyProfile from './CompanyProfile'
import { toCurrency } from '@app/utils/general'
import { StockPreviousCloseAttrs } from '@app/types'

class StockPreviousClose {
  ticker: string
  price: number
  asOfDateUnix: number
  asOfDate: string
  fiftyWeekLow?: number
  fiftyWeekHigh?: number
  companyProfile?: CompanyProfile
  priceFormatted: string
  fiftyWeekLowFormatted?: string
  fiftyWeekHighFormatted?: string

  constructor(attrs: StockPreviousCloseAttrs) {
    this.ticker = attrs.ticker
    this.price = attrs.price
    this.asOfDateUnix = attrs.asOfDateUnix
    this.asOfDate = dayjs.unix(attrs.asOfDateUnix).toString()
    this.fiftyWeekLow = attrs.fiftyWeekLow
    this.fiftyWeekHigh = attrs.fiftyWeekHigh
    this.companyProfile = attrs.companyProfile

    this.priceFormatted = toCurrency(attrs.price)
    this.fiftyWeekLowFormatted = this.fiftyWeekLow ? toCurrency(attrs.fiftyWeekLow) : undefined
    this.fiftyWeekHighFormatted = this.fiftyWeekHigh ? toCurrency(attrs.fiftyWeekHigh) : undefined
  }
}

export default StockPreviousClose
