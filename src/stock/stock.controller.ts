import { PolygonService } from '@app/polygon/polygon.service'
import { Controller, Get } from '@nestjs/common'

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: PolygonService) {}

  @Get()
  async portfolio() {
    return await this.stockService.portfolioDividends()
  }
}
