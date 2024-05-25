import { Test, TestingModule } from '@nestjs/testing'
import { TwelveDataService } from './twelve-data.service'
import ConfigServiceStub from '@app/tests/configServiceStub'
import ApiClientStub from '@app/tests/apiClientStub'
import { ApiClient } from '@app/utils/apiClient'
import Stock from '@app/stock/models/Stock'
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

    it('returns unique list of Stock records', async () => {
      const quotes = await twelveDataService.previousClose('VTI , VTI ')
      expect(quotes).toHaveLength(1)
    })

    it('returns Stock instances', async () => {
      const quotes = (await twelveDataService.previousClose('VTI')) as Stock[]
      const quote: Stock = quotes[0]

      expect(quote).toBeInstanceOf(Stock)
      expect(quote.tickerSymbol).toEqual('VTI')
    })
  })
})
