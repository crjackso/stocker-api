if (!process.env.IS_TS_NODE) {
  require('module-alias/register')
}

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { PrismaClientExceptionFilter } from './utils/exception-filters/prisma-client-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  )
  app.useGlobalFilters(new PrismaClientExceptionFilter())
  await app.listen(process.env.STOCKER_API_PORT)
}
bootstrap()
