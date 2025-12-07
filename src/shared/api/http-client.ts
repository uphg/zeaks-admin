export interface HTTPConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
  params?: Record<string, any>
  responseType?: 'json' | 'text' | 'blob' | 'arrayBuffer'
}

export interface Interceptor<T = any> {
  onFulfilled?: (value: T) => T | Promise<T>
  onRejected?: (error: any) => any
}

export interface Interceptors {
  request?: Interceptor<HTTPConfig>
  response?: Interceptor<HTTPResponse>
}

export interface HTTPResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
  config: HTTPConfig
}

export interface HTTPError {
  message: string
  status?: number
  statusText?: string
  response?: HTTPResponse
  config: HTTPConfig
}

export interface HTTPClientOptions {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
}

export interface DefaultParams {
  [key: string]: any
}

export class HTTPClient {
  private baseURL: string
  private timeout: number
  private defaultHeaders: Record<string, string>
  private interceptors: Interceptors

  constructor(
    { baseURL = '', timeout = 2500, headers = {} }: HTTPClientOptions = {},
    interceptors: Interceptors = {},
  ) {
    this.baseURL = baseURL
    this.timeout = timeout
    this.defaultHeaders = headers
    this.interceptors = interceptors
  }

  private buildURL(url: string, params?: Record<string, any>): string {
    const fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`
    if (!params) return fullURL

    const searchParams = new URLSearchParams()
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        searchParams.append(key, String(params[key]))
      }
    })

    const queryString = searchParams.toString()
    return queryString ? `${fullURL}?${queryString}` : fullURL
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    config: HTTPConfig = {},
  ): Promise<HTTPResponse<T>> {
    // 合并配置
    const finalConfig: HTTPConfig = {
      ...config,
      headers: { ...this.defaultHeaders, ...config.headers },
      timeout: config.timeout || this.timeout,
    }

    // 请求拦截器
    if (this.interceptors.request?.onFulfilled) {
      try {
        Object.assign(finalConfig, await this.interceptors.request.onFulfilled(finalConfig))
      } catch (error) {
        if (this.interceptors.request?.onRejected) {
          return this.interceptors.request.onRejected(error)
        }
        throw error
      }
    }

    const fullURL = this.buildURL(url, config.params)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), finalConfig.timeout)

    try {
      const fetchOptions: RequestInit = {
        method,
        headers: finalConfig.headers,
        signal: controller.signal,
      }

      if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        if (data instanceof FormData) {
          fetchOptions.body = data
        } else {
          fetchOptions.headers = {
            ...fetchOptions.headers,
            'Content-Type': 'application/json',
          }
          fetchOptions.body = JSON.stringify(data)
        }
      }

      const response = await fetch(fullURL, fetchOptions)
      clearTimeout(timeoutId)

      // 解析响应头
      const headers: Record<string, string> = {}
      response.headers.forEach((value, key) => {
        headers[key] = value
      })

      // 解析响应数据
      let responseData: any
      const responseType = finalConfig.responseType || 'json'

      switch (responseType) {
        case 'json':
          responseData = await response.json()
          break
        case 'text':
          responseData = await response.text()
          break
        case 'blob':
          responseData = await response.blob()
          break
        case 'arrayBuffer':
          responseData = await response.arrayBuffer()
          break
        default:
          responseData = await response.json()
      }

      const httpResponse: HTTPResponse<T> = {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers,
        config: finalConfig,
      }

      // 检查响应状态
      if (!response.ok) {
        const error: HTTPError = {
          message: `HTTP Error: ${response.status} ${response.statusText}`,
          status: response.status,
          statusText: response.statusText,
          response: httpResponse,
          config: finalConfig,
        }
        throw error
      }

      // 响应拦截器
      if (this.interceptors.response?.onFulfilled) {
        try {
          return await this.interceptors.response.onFulfilled(httpResponse)
        } catch (error) {
          if (this.interceptors.response?.onRejected) {
            return this.interceptors.response.onRejected(error)
          }
          throw error
        }
      }

      return httpResponse
    } catch (error: any) {
      clearTimeout(timeoutId)

      if (error.name === 'AbortError') {
        const timeoutError: HTTPError = {
          message: `Request timeout after ${finalConfig.timeout}ms`,
          config: finalConfig,
        }
        throw timeoutError
      }

      if (this.interceptors.response?.onRejected) {
        return this.interceptors.response.onRejected(error)
      }

      throw error
    }
  }

  async get<T, Params extends DefaultParams = {}>(url: string, params?: Params, config?: HTTPConfig): Promise<HTTPResponse<T>> {
    return this.request<T>('GET', url, undefined, { ...config, params })
  }

  async post<T, Data extends DefaultParams = {}>(url: string, data?: Data, config?: HTTPConfig): Promise<HTTPResponse<T>> {
    return this.request<T>('POST', url, data, config)
  }

  async put<T, Data extends DefaultParams = {}>(url: string, data?: Data, config?: HTTPConfig): Promise<HTTPResponse<T>> {
    return this.request<T>('PUT', url, data, config)
  }

  async delete<T>(url: string, config?: HTTPConfig): Promise<HTTPResponse<T>> {
    return this.request<T>('DELETE', url, undefined, config)
  }

  async head<T>(url: string, config?: HTTPConfig): Promise<HTTPResponse<T>> {
    return this.request<T>('HEAD', url, undefined, config)
  }

  async options<T>(url: string, config?: HTTPConfig): Promise<HTTPResponse<T>> {
    return this.request<T>('OPTIONS', url, undefined, config)
  }

  async patch<T, Data extends DefaultParams = {}>(url: string, data?: Data, config?: HTTPConfig): Promise<HTTPResponse<T>> {
    return this.request<T>('PATCH', url, data, config)
  }
}

export const http = new HTTPClient({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
}, {
  request: {
    onFulfilled: (config) => {
      // 添加认证 token
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        }
      }
      return config
    },
    onRejected: (error) => {
      console.error('Request error:', error)
      return Promise.reject(error)
    },
  },
  response: {
    onFulfilled: (response) => {
      // 处理全局响应
      return response?.data
    },
    onRejected: (error) => {
      console.error('Response error:', error)
      return Promise.reject(error)
    },
  },
})
