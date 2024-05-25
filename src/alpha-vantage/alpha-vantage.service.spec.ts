import { Test, TestingModule } from '@nestjs/testing'
import { AlphaVantageService } from './alpha-vantage.service'
import ConfigServiceStub from '@app/tests/configServiceStub'
import ApiClientStub from '@app/tests/apiClientStub'

describe('AlphaVantageService', () => {
  let service: AlphaVantageService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlphaVantageService, ConfigServiceStub, ApiClientStub]
    }).compile()

    service = module.get<AlphaVantageService>(AlphaVantageService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
