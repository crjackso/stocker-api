import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { StockModule } from './stock/stock.module'
import { PolygonModule } from './polygon/polygon.module';
import { TwelveDataModule } from './twelve-data/twelve-data.module';

@Module({
  imports: [UserModule, StockModule, PolygonModule, TwelveDataModule]
})
export class AppModule {}
