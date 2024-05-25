import { Test, TestingModule } from '@nestjs/testing'
import { FinancialModelingPrepService } from './financial-modeling-prep.service'
import ConfigServiceStub from '@app/tests/configServiceStub'
import ApiClientStub from '@app/tests/apiClientStub'

describe('FinancialModelingPrepService', () => {
  let service: FinancialModelingPrepService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialModelingPrepService, ConfigServiceStub, ApiClientStub]
    }).compile()

    service = module.get<FinancialModelingPrepService>(FinancialModelingPrepService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
