import { Test, TestingModule } from '@nestjs/testing'
import { TwelveDataService } from './twelve-data.service'
import ConfigServiceStub from '@app/tests/ConfigServiceStub'
import ApiClientStub from '@app/tests/apiClientStub'
import { ApiClient } from '@app/utils/apiClient'
import StockPreviousClose from '@app/models/stocks/StockPreviousClose'
import { Vti } from '@app/tests/factories/twelveData/TwelveDataPreviousClose'

describe('TwelveDataService', () => {
  let twelveDataService: TwelveDataService
  let apiClient: ApiClient

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwelveDataService, ConfigServiceStub, ApiClientStub]
    }).compile()

    twelveDataService = module.get<TwelveDataService>(TwelveDataService)
    apiClient = module.get<ApiClient>(ApiClient)
  })

  it('should be defined', () => {
    expect(twelveDataService).toBeDefined()
  })

  describe('#previousClose', () => {
    beforeEach(() => {
      jest.spyOn(apiClient, 'get').mockImplementation(() => Promise.resolve([Vti]))
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('returns unique list of StockPreviousClose records', async () => {
      const quotes = await twelveDataService.previousClose('VTI , VTI ')
      expect(quotes).toHaveLength(1)
    })

    it('returns StockPreviousClose instances', async () => {
      const quotes = (await twelveDataService.previousClose('VTI')) as StockPreviousClose[]
      const quote: StockPreviousClose = quotes[0]

      expect(quote).toBeInstanceOf(StockPreviousClose)
      expect(quote.ticker).toEqual('VTI')
    })
  })
})
