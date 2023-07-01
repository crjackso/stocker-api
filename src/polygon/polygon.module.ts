import { Module } from '@nestjs/common'
import { PolygonService } from './polygon.service'
import { ConfigModule } from '@nestjs/config'
import configuration from '@app/config/configuration'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
  providers: [PolygonService],
  imports: [
    CacheModule.register({
      ttl: 86400
    }),
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
  exports: [PolygonService]
})
export class PolygonModule {}
