import Portfolio from '@app/stock/models/Portfolio'

export default class User {
  id: number
  email: string
  portfolios?: Portfolio[]
}
