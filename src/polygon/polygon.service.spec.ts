import { Test, TestingModule } from '@nestjs/testing'
import { PolygonService } from './polygon.service'
import ConfigServiceStub from '@app/tests/configServiceStub'

describe('PolygonService', () => {
  let service: PolygonService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PolygonService, ConfigServiceStub]
    }).compile()

    service = module.get<PolygonService>(PolygonService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
