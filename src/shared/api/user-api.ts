import type { ApiResponse, LoginForm, RegisterForm, User } from '@/shared/types'
import { httpClient } from './http-client'

export interface RouteData {
  name: string
  path: string
  hidden: boolean
  redirect: string
  component: 'Default' | 'ParentView'
  mergeSingleChild: true
  children: RouteData[]
}

export function apiGetRouteData() {
  return httpClient.get<ApiResponse<RouteData[]>>('/route-data')
}

export function apiGetUserInfo() {
  return httpClient.get<ApiResponse<User>>('/user-info')
}

export function apiLogin(data: LoginForm) {
  return httpClient.post<ApiResponse<{ token: string }>>('/login', data)
}

export function apiRegister(data: RegisterForm) {
  return httpClient.post<ApiResponse<{ token: string }>>('/register', data)
}