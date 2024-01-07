import { ConfigService } from '@nestjs/config'

const ConfigServiceStub = {
  provide: ConfigService,
  useValue: {
    get: jest.fn((Key: string, DefaultValue: string) => {
      switch (Key) {
        case 'TWELVE_DATA_API_KEY':
          return 'test'
        case 'POLYGON_API_KEY':
          return 'test'
        case 'MARKET_STACK_API_KEY':
          return 'test'
        default:
          return DefaultValue
      }
    })
  }
}

export default ConfigServiceStub
