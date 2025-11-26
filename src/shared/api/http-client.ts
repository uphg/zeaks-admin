import { HTTPClient } from '@/shared/lib'
import { API_BASE_URL, TOKEN_KEY } from '@/shared/config'

export const httpClient = new HTTPClient({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
}, {
  request: {
    onFulfilled: (config) => {
      // 添加认证 token
      const token = localStorage.getItem(TOKEN_KEY)
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
      // 处理认证错误
      if (error.status === 401) {
        localStorage.removeItem(TOKEN_KEY)
        window.location.href = '/login'
      }
      return Promise.reject(error)
    },
  },
})