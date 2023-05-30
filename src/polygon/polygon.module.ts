import { Module } from '@nestjs/common'
import { PolygonService } from './polygon.service'
import { ConfigModule } from '@nestjs/config'
import configuration from '@app/config/configuration'

@Module({
  providers: [PolygonService],
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
  exports: [PolygonService]
})
export class PolygonModule {}
