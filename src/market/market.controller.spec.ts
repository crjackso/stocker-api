import { Test, TestingModule } from '@nestjs/testing'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { MarketController } from './market.controller'
import stockApiStub from '@app/tests/stubs/stockApiStub'
import { FinancialModelingPrepService } from '@app/financial-modeling-prep/financial-modeling-prep.service'

describe('MarketController', () => {
  let controller: MarketController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketController],
      providers: [
        {
          provide: FinancialModelingPrepService,
          useValue: stockApiStub
        },
        { provide: CACHE_MANAGER, useValue: {} }
      ]
    }).compile()

    controller = module.get<MarketController>(MarketController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
