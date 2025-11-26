import { TOKEN_KEY } from '@/shared/config'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(value: string) {
  localStorage.setItem(TOKEN_KEY, value)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}