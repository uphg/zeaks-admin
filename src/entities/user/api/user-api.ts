import { http } from '@/shared/api/http-client'

interface RouteData {
  name: string
  path: string
  hidden: boolean
  redirect: string
  component: 'Default' | 'ParentView'
  mergeSingleChild: true
  children: RouteData[]
}

export function apiGetRouteData() {
  return http.get<RouteData[]>('/api/route-data')
}

export function apiGetUserInfo() {
  return http.get<Partial<{
    id: string
    name: string
    rules: string[]
    email: string
    token: string
  }>>('/api/user-info')
}

export function apiLogin(data: {
  username: string
  password: string
}) {
  return http.post<any>('/api/login', data)
}
