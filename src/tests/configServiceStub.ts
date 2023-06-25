import { ConfigService } from '@nestjs/config'

const ConfigServiceStub = {
  provide: ConfigService,
  useValue: {
    get: jest.fn((Key: string, DefaultValue: string) => {
      switch (Key) {
        case 'TWELVE_DATA_API_KEY':
          return '123-456-XYZ'
        case 'POLYGON_API_KEY':
          return '248-567-ABC'
        default:
          return DefaultValue
      }
    })
  }
}

export default ConfigServiceStub
