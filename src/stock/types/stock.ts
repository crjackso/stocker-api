import { Transient } from '@app/types/transient'

export type Stock = {
  id: number
  companyName: string
  tickerSymbol: string
  lastPrice: number
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type TransientStock = Transient<Stock>
