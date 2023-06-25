import { Test, TestingModule } from '@nestjs/testing'
import { StockController } from './stock.controller'
import TwelveDataServiceStub from '@app/tests/twelveData/twelveDataServiceStub'
import { BadRequestException } from '@nestjs/common'

describe('StockController', () => {
  let controller: StockController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwelveDataServiceStub],
      controllers: [StockController]
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
