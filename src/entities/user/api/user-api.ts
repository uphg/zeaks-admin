import type { User } from '@/shared/types'
import { httpClient } from '@/shared/api'

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
  return httpClient.post<{ token: string; user: User }>('/auth/login', data)
}

export function register(data: RegisterRequest) {
  return httpClient.post<{ token: string; user: User }>('/auth/register', data)
}

export function getUserInfo() {
  return httpClient.get<User>('/auth/user-info')
}

export function updateUserInfo(data: Partial<User>) {
  return httpClient.put<User>('/auth/user-info', data)
}