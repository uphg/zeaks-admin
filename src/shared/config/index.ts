export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const TOKEN_KEY = 'token'

export const ROUTE_WHITE_LIST = ['/login', '/register', '/404']

export const LAYOUT_TYPES = {
  DEFAULT: 'default',
  SIDEBAR: 'sidebar',
  TOP: 'top',
} as const

export type LayoutType = typeof LAYOUT_TYPES[keyof typeof LAYOUT_TYPES]

export const pageComponentMap = import.meta.glob('@/pages/**/*-page.{tsx,vue}')
