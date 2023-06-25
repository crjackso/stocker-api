import { Module } from '@nestjs/common'
import { StockController } from './stock.controller'
import { PolygonModule } from '@app/polygon/polygon.module'
import { TwelveDataModule } from '@app/twelve-data/twelve-data.module'

@Module({
  controllers: [StockController],
  imports: [PolygonModule, TwelveDataModule]
})
export class StockModule {}
