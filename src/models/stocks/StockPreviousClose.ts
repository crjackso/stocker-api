import * as dayjs from 'dayjs'

class StockPreviousClose {
  constructor({ price, asOfDateUnix }: { price: number; asOfDateUnix: number }) {
    this.price = price
    this.asOfDateUnix = asOfDateUnix
  }

  price: number
  asOfDateUnix: number

  public asOfDate() {
    return dayjs(this.asOfDateUnix).format('YYYY-MM-DD').toString()
  }
}

export default StockPreviousClose
