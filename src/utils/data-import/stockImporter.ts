import { StockApi } from '@app/stock/types'
import { Logger } from '@nestjs/common'
import { isError, uniqStrings } from '../general'
import Stock from '@app/stock/models/Stock'
import { StockService } from '@app/stock/stock.service'
import { ensureError } from '../ensureError'

export default class StockImporter {
  private readonly logger = new Logger(StockImporter.name)

  constructor(
    private readonly api: StockApi,
    private readonly stockService: StockService
  ) {}

  public async run(tickers: string | string[]): Promise<void> {
    if (!tickers) return

    const formattedTickers = uniqStrings(tickers).join(',')

    this.logger.debug(`[stocker-api stock-import] Running for ${formattedTickers}`)

    try {
      const quotes = await this.api.previousClose(formattedTickers)

      const successfulQuotes = quotes.filter((q) => !isError(q)) as Stock[]

      await this.saveQuotes(successfulQuotes)

      this.logger.debug('[stocker-api stock-import] Complete')
    } catch (error) {
      throw ensureError(error)
    }
  }

  async saveQuotes(quotes: Stock[]) {
    const fns = quotes.map(async (quote) => {
      return await this.stockService.upsert(quote)
    })

    await Promise.all(fns)
  }
}
