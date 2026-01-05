import { http } from '@/shared/api/http-client'

export function apiGetUsers(params: Record<string, any>) {
  return http.get<{ items: any[], total: number }>('/api/users', params)
}