import { Global, Injectable, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

@Global()
@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'info' | 'warn' | 'error'>
  implements OnModuleInit
{
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query'
        },
        {
          emit: 'stdout',
          level: 'error'
        },
        {
          emit: 'stdout',
          level: 'info'
        },
        {
          emit: 'stdout',
          level: 'warn'
        }
      ]
    })

    this.$on('query', (e) => {
      console.log('Query: ' + e.query)
      console.log('Params: ' + e.params)
      console.log('Duration: ' + e.duration + 'ms')
    })
  }

  async onModuleInit() {
    await this.$connect()
  }
}
