export interface GlobalQuoteResponse {
  'Global Quote': GlobalQuote
}

export type GlobalQuote = {
  '01. symbol': string
  '02. open': string
  '03. high': string
  '04. low': string
  '05. price': number
  '06. volume': string
  '07. latest trading day': Date
  '08. previous close': string
  '09. change': string
  '10. change percent': string
}

export type CompanyOverview = {
  Symbol: string
  AssetType: string
  Name: string
  Description: string
  CIK: string
  Exchange: string
  Currency: string
  Country: string
  Sector: string
  Industry: string
  Address: string
  FiscalYearEnd: string
  LatestQuarter: Date
  MarketCapitalization: string
  EBITDA: string
  PERatio: string
  PEGRatio: string
  BookValue: string
  DividendPerShare: string
  DividendYield: string
  EPS: string
  RevenuePerShareTTM: string
  ProfitMargin: string
  OperatingMarginTTM: string
  ReturnOnAssetsTTM: string
  ReturnOnEquityTTM: string
  QuarterlyEarningsGrowthYOY: string
  QuarterlyRevenueGrowthYOY: string
  AnalystTargetPrice: string
  AnalystRatingStrongBuy: string
  AnalystRatingBuy: string
  AnalystRatingHold: string
  AnalystRatingSell: string
  AnalystRatingStrongSell: string
  TrailingPE: string
  ForwardPE: string
  PriceToSalesRatioTTM: string
  PriceToBookRatio: string
  EVToRevenue: string
  EVToEBITDA: string
  Beta: string
  '52WeekHigh': string
  '52WeekLow': string
  '50DayMovingAverage': string
  '200DayMovingAverage': string
  SharesOutstanding: string
  DividendDate: Date
  ExDividendDate: Date
}
