import { Test, TestingModule } from '@nestjs/testing'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { MarketStackService } from './market-stack.service'
import ConfigServiceStub from '@app/tests/configServiceStub'
import ApiClientStub from '@app/tests/apiClientStub'

describe('MarketStackService', () => {
  let service: MarketStackService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketStackService, ConfigServiceStub, ApiClientStub, { provide: CACHE_MANAGER, useValue: {} }]
    }).compile()

    service = module.get<MarketStackService>(MarketStackService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
