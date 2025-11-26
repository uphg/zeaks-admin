export interface User {
  id: string
  username: string
  email?: string
  avatar?: string
  roles?: string[]
}

export interface UserState {
  user: User | null
  isAuthenticated: boolean
  permissions: string[]
  roles: string[]
}