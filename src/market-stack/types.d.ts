export interface DividendResponse {
  pagination: Pagination
  data: DividendEntry[]
}

export interface DividendEntry {
  date: string
  dividend: number
  symbol: string
}

export interface Pagination {
  limit: number
  offset: number
  count: number
  total: number
}
