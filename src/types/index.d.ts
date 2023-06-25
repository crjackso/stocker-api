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
