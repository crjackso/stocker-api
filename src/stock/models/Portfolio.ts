import { Transient } from '@app/types/transient'
import Stock from './Stock'
import User from '@app/user/models/User'

export default class Portfolio {
  id: number
  title: string
  stocks: Stock[]
  user?: User
  userId: number

  constructor(attrs: Transient<Portfolio>) {
    for (const [key, value] of Object.entries(attrs)) {
      this[key] = value
    }
  }
}
