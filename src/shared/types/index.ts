export interface User {
  id: string
  username: string
  email?: string
  avatar?: string
  roles?: string[]
}

export interface LoginForm {
  username: string
  password: string
}

export interface RegisterForm {
  username: string
  password: string
  confirmPassword: string
  email?: string
}

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface RouteRecord {
  path: string
  name?: string
  component?: string
  redirect?: string
  meta?: {
    title?: string
    icon?: string
    hidden?: boolean
    roles?: string[]
  }
  children?: RouteRecord[]
}