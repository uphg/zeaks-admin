import { http } from '@/shared/api/http-client'

export function apiGetRoles(params: Record<string, any>) {
  return http.get<{ items: any[], total: number }>('/api/roles', params)
}


