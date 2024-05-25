export type Quotes = Quote[]
export type CompanyOverviewResponse = CompanyOverview[]

export type Quote = {
  symbol: string
  name: string
  price: number
  changesPercentage: number
  change: number
  dayLow: number
  dayHigh: number
  yearHigh: number
  yearLow: number
  marketCap: number
  priceAvg50: number
  priceAvg200: number
  exchange: string
  volume: number
  avgVolume: number
  open: number
  previousClose: number
  eps: number
  pe: number
  earningsAnnouncement: string
  sharesOutstanding: number
  timestamp: number
}

export type CompanyOverview = {
  symbol: string
  price: number
  beta: number
  volAvg: number
  mktCap: number
  lastDiv: number
  range: string
  changes: number
  companyName: string
  currency: string
  cik: string
  isin: string
  cusip: string
  exchange: string
  exchangeShortName: string
  industry: string
  website: string
  description: string
  ceo: string
  sector: string
  country: string
  fullTimeEmployees: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  dcfDiff: number
  dcf: number
  image: string
  ipoDate: Date
  defaultImage: boolean
  isEtf: boolean
  isActivelyTrading: boolean
  isAdr: boolean
  isFund: boolean
}

export type HistoricalDividends = {
  symbol: string
  historical: HistoricalDividend[]
}

export type HistoricalDividend = {
  date: Date
  label: string
  adjDividend: number
  dividend: number
  recordDate: string
  paymentDate: string
  declarationDate: string
}

export type FinancialModelingPrepMarketMover = {
  symbol: string
  name: string
  change: number
  price: number
  changesPercentage: number
}
