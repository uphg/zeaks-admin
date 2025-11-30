import type { User } from '@/shared/lib/utility-types'
import { http } from '@/shared/api'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterRequest {
  username: string
  password: string
  email?: string
}

export interface RegisterResponse {
  token: string
  user: User
}

export function login(data: LoginRequest) {
  return http.post<{ token: string; user: User }>('/auth/login', data)
}

export function register(data: RegisterRequest) {
  return http.post<{ token: string; user: User }>('/auth/register', data)
}

export function getUserInfo() {
  return http.get<User>('/auth/user-info')
}

export function updateUserInfo(data: Partial<User>) {
  return http.put<User>('/auth/user-info', data)
}