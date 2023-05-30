import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { StockModule } from './stock/stock.module'
import { PolygonModule } from './polygon/polygon.module';

@Module({
  imports: [UserModule, StockModule, PolygonModule]
})
export class AppModule {}
