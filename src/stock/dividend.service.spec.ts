import { Test, TestingModule } from '@nestjs/testing'
import { DividendService } from './dividend.service'
import { PrismaService } from '@app/prisma/prisma.service'

describe('DividendService', () => {
  let service: DividendService

  const prismaMock = {
    stock: {
      findUnique: jest.fn(),
      findMany: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DividendService,
        {
          provide: PrismaService,
          useValue: prismaMock
        }
      ]
    }).compile()

    service = module.get<DividendService>(DividendService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
