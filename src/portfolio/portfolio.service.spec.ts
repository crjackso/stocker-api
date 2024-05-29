import { Test, TestingModule } from '@nestjs/testing'
import { PortfolioService } from './portfolio.service'
import { PrismaService } from '@app/prisma/prisma.service'

describe('PortfolioService', () => {
  let service: PortfolioService

  const prismaMock = {
    stock: {
      findUnique: jest.fn(),
      findMany: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        {
          provide: PrismaService,
          useValue: prismaMock
        }
      ]
    }).compile()

    service = module.get<PortfolioService>(PortfolioService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
