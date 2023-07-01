import { Injectable } from '@nestjs/common'
import { $Fetch, ofetch } from 'ofetch'

@Injectable()
export class ApiClient {
  headers: Record<string, unknown>
  client: $Fetch
  defaultQuery = {}

  public withBaseUrl(baseUrl: string): ApiClient {
    this.client = ofetch.create({ baseURL: baseUrl })
    return this
  }

  public withHeaders(headers: Record<string, unknown>): ApiClient {
    this.headers = { headers }
    return this
  }

  public withDefaultQuery(query: Record<string, unknown>): ApiClient {
    this.defaultQuery = query
    return this
  }

  public async get<T>(url: string, query: Record<string, unknown>): Promise<T> {
    return await this.client<T>(url, this.fetchOptions(query))
  }

  private fetchOptions(queryParams: Record<string, unknown>) {
    const query = {
      ...this.defaultQuery,
      ...queryParams
    }

    return { query, ...this.headers }
  }
}
