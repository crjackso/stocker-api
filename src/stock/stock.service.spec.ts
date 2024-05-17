import { Test, TestingModule } from '@nestjs/testing'
import { StockService } from './stock.service'
import { PrismaService } from '@app/prisma/prisma.service'

describe('StockService', () => {
  let service: StockService

  const prismaMock = {
    stock: {
      findUnique: jest.fn(),
      findMany: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockService,
        {
          provide: PrismaService,
          useValue: prismaMock
        }
      ]
    }).compile()

    service = module.get<StockService>(StockService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
