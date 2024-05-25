import { StockApi } from '@app/stock/types'
import { uniqStrings } from '../general'
import { PrismaService } from '@app/prisma/prisma.service'
import { IError } from '@app/types/error'
import { BaseError } from '@app/baseError'
import { Logger } from '@nestjs/common'
import StockDividendLog from '@app/stock/models/StockDividendLog'

class DividendImporter {
  private readonly logger = new Logger(DividendImporter.name)

  constructor(
    private readonly api: StockApi,
    private readonly prisma: PrismaService
  ) {}

  public async run(tickers: string | string[]): Promise<void> {
    if (!tickers) return

    const formattedTickers = uniqStrings(tickers).join(',')

    this.logger.debug(`[stocker-api dividend-import] Running for ${formattedTickers}`)
    const logs = await this.api.portfolioDividends(formattedTickers)

    if (this.isError(logs)) {
      throw new BaseError(`Dividend import failed: ${logs.message}`)
    }

    await this.prisma.dividendLog.createMany({
      data: logs,
      skipDuplicates: true
    })

    this.logger.debug('[stocker-api dividend-import] Complete')
  }

  isError(response: StockDividendLog[] | IError): response is IError {
    return 'error' in response
  }
}

export default DividendImporter
