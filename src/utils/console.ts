import { NestFactory } from '@nestjs/core'
import { AppModule } from './../app.module'
import { TasksService } from '@app/tasks/tasks.service'

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(AppModule)

  const command = process.argv[2]

  switch (command) {
    case 'import-dividends':
      await application.get(TasksService).importDividendData()
      break
    case 'import-stocks':
      await application.get(TasksService).importStockData()
      break
    default:
      console.log('Command not found')
      process.exit(1)
  }

  await application.close()
  process.exit(0)
}

bootstrap()
