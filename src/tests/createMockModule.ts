import { Provider, DynamicModule } from '@nestjs/common'

// https://stackoverflow.com/questions/60185547/how-to-jest-mock-nestjs-imports

export const createMockModule = (providers: Provider[]): DynamicModule => {
  const exports = providers.map((provider) => (provider as any).provide || provider)
  return {
    module: class MockModule {},
    providers,
    exports,
    global: true
  }
}
