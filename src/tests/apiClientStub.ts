import { ApiClient } from '@app/utils/apiClient'

class ApiClientStub {
  baseUrl: string
  apiKey: string

  public withBaseUrl(baseUrl: string): ApiClientStub {
    this.baseUrl = baseUrl
    return this
  }

  public withApiKey(apiKey: string): ApiClientStub {
    this.apiKey = apiKey
    return this
  }

  public async get() {
    return await Promise.resolve({})
  }
}

export default {
  provide: ApiClient,
  useValue: new ApiClientStub()
}
