export interface IError {
  message: string
}

export interface StockPreviousCloseAttrs {
  ticker: string
  price: number
  asOfDateUnix: number
  fiftyWeekLow?: number
  fiftyWeekHigh?: number
  companyProfile?: CompanyProfile
  fiftyWeekLowFormatted?: string
  fiftyWeekHighFormatted?: string
}

export interface StockDividendLogAttrs {
  ticker: string
  stockDetails?: StockDetailsAttrs
  exDividendDate?: string
  payDate?: string
  cashAmount?: number
}

export interface StockDetailsAttrs {
  logoUrl: string
  companyName: string
  ticker: string
}
