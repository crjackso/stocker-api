import { groupBy, toCurrency } from '@app/utils/general'
import StockDividendLog from './StockDividendLog'
import { datesAreEqual, parseDate } from '@app/utils/date'

class StockDividendLogs {
  constructor(stockDividendLogs: Array<StockDividendLog> = []) {
    this.stockDividendLogs = stockDividendLogs
  }

  stockDividendLogs: StockDividendLog[]

  public totalCashAmount() {
    const totalAmount = this.stockDividendLogs.reduce((amount, log) => {
      amount += log.cashAmount || 0
      return amount
    }, 0)

    return toCurrency(totalAmount)
  }

  public groupedByMonth() {
    return groupBy(this.stockDividendLogs, (log: StockDividendLog) => {
      return parseDate(log.payDate)?.month() || -1
    })
  }

  public groupedByDate(): { [payDate: string]: StockDividendLog[] } {
    return groupBy(this.stockDividendLogs, (log: StockDividendLog) => {
      return log.payDateFormatted
    })
  }

  public sorted(): StockDividendLogs {
    const stockDividendLogs = this.stockDividendLogs.sort((log1: StockDividendLog, log2: StockDividendLog) => {
      return (<Date>log1.payDate).getTime() - (<Date>log2.payDate).getTime()
    })

    return new StockDividendLogs(stockDividendLogs)
  }

  public forMonth(month: number, year: number): StockDividendLogs {
    const stockDividendLogs = this.stockDividendLogs.filter((log: StockDividendLog) => {
      return log.payDate?.getMonth() === month && log.payDate.getFullYear() === year
    })

    return new StockDividendLogs(stockDividendLogs)
  }

  public forDate(date?: Date): StockDividendLogs {
    if (!date) return new StockDividendLogs()

    const stockDividendLogs = this.stockDividendLogs.filter((log: StockDividendLog) => {
      return datesAreEqual(log.payDate, date)
    })

    return new StockDividendLogs(stockDividendLogs)
  }

  public payDates(): (Date | undefined)[] {
    return this.stockDividendLogs
      .map((log: StockDividendLog) => {
        return log.payDate
      })
      .filter(Boolean)
  }

  public count() {
    return this.stockDividendLogs.length
  }

  // public logs () {
  //   return this.stockDividendLogs
  // }
}

export default StockDividendLogs
