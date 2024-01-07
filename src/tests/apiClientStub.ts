import { ApiClient } from '@app/utils/apiClient'

class ApiClientStub {
  baseUrl: string
  apiKey: string
  headers: Record<string, unknown>
  defaultQuery = {}

  public withBaseUrl(baseUrl: string): ApiClientStub {
    this.baseUrl = baseUrl
    return this
  }

  public withHeaders(headers: Record<string, unknown>): ApiClientStub {
    this.headers = { headers }
    return this
  }

  public withApiKey(apiKey: string): ApiClientStub {
    this.apiKey = apiKey
    return this
  }

  public withDefaultQuery(query: Record<string, unknown>): ApiClientStub {
    this.defaultQuery = query
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
