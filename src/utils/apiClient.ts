import { Injectable } from '@nestjs/common'
import { $Fetch, ofetch } from 'ofetch'

@Injectable()
export class ApiClient {
  apiKey: string
  client: $Fetch

  public withBaseUrl(baseUrl: string): ApiClient {
    this.client = ofetch.create({ baseURL: baseUrl })
    return this
  }

  public withApiKey(apiKey: string): ApiClient {
    this.apiKey = apiKey
    return this
  }

  public async get<T>(url: string, query: string | object): Promise<T> {
    return await this.client<T>(url, this.fetchOptions({ query }))
  }

  private fetchOptions(query = {}) {
    let options = {
      ...query
    }

    if (this.apiKey) {
      options = {
        ...options,
        headers: {
          Authorization: `apikey ${this.apiKey}`
        }
      }
    }

    return options
  }
}
