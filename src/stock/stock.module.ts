import { Module } from '@nestjs/common'
import { StockController } from './stock.controller'
import { PolygonModule } from '@app/polygon/polygon.module'

@Module({
  controllers: [StockController],
  imports: [PolygonModule]
})
export class StockModule {}
