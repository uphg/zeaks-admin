import { http } from '@/shared/api/http-client'

export function apiGetMenus() {
  return http.get('/api/menus')
}

export function apiCreateMenus(data: any) {
  return http.post('/api/menus', data)
}

export function apiUpdateMenus(id: string, data: any) {
  return http.put(`/api/menus/${id}`, data)
}

export function apiDeleteMenus(id: string) {
  return http.put(`/api/menus/${id}`)
}
