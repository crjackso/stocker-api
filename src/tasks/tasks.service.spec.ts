import { Test, TestingModule } from '@nestjs/testing'
import { TasksService } from './tasks.service'
import { PrismaService } from '@app/prisma/prisma.service'
import { ConfigService } from '@nestjs/config'
import ConfigServiceStub from '@app/tests/configServiceStub'
import { StockService } from '@app/stock/stock.service'
import StockServiceStub from '@app/tests/stubs/stockServiceStub'
import { FinancialModelingPrepService } from '@app/financial-modeling-prep/financial-modeling-prep.service'
import stockApiStub from '@app/tests/stubs/stockApiStub'

describe('TasksService', () => {
  let service: TasksService

  const prismaMock = {
    stock: {
      findUnique: jest.fn(),
      findMany: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: prismaMock
        },
        {
          provide: FinancialModelingPrepService,
          useValue: stockApiStub
        },
        {
          provide: ConfigService,
          useValue: ConfigServiceStub
        },
        {
          provide: StockService,
          useValue: StockServiceStub
        }
      ]
    }).compile()

    service = module.get<TasksService>(TasksService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
