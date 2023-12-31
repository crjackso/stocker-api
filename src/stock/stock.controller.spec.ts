import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { StockController } from './stock.controller'
import TwelveDataServiceStub from '@app/tests/twelveData/twelveDataServiceStub'
import MarketStackServiceStub from '@app/tests/market-stack/marketStackServiceStub'

describe('StockController', () => {
  let controller: StockController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwelveDataServiceStub, MarketStackServiceStub],
      controllers: [StockController],
      imports: [
        CacheModule.register({
          isGlobal: true,
          ttl: 8.64e7
        })
      ]
    }).compile()

    controller = module.get<StockController>(StockController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('when no ticker symbols are given', () => {
    it('throws BadRequestException', async () => {
      const exception = new BadRequestException('No ticker symbols given')
      await expect(controller.portfolio('')).rejects.toThrow(exception)
    })
  })
})
