export type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue }
export type CamelToKebabCase<S extends string>
  = S extends `${infer T}${infer U}` ? `${T extends Capitalize<T> ? '-' : ''}${Lowercase<T>}${CamelToKebabCase<U>}` : S

export type KebabToCamelCase<S extends string>
  = S extends `${infer T}-${infer U}` ? `${T}${Capitalize<KebabToCamelCase<U>>}` : S

export type InputElement = 'auto-complete'
  | 'cascader'
  | 'color-picker'
  | 'checkbox' | 'checkbox-group'
  | 'date' | 'date-picker'
  | 'dynamic-input'
  | 'dynamic-tags'
  | 'input'
  | 'input-number'
  | 'input-otp'
  | 'mention'
  | 'radio' | 'radio-group' | 'radio-button' | 'radio-button-group'
  | 'switch'
  | 'rate'
  | 'select'
  | 'slider'
  | 'switch'
  | 'time' | 'time-picker'
  | 'transfer'
  | 'tree-select'
  | 'upload'

export type CamelInputElement = KebabToCamelCase<InputElement>

export type MouseEventHandler = (event: MouseEvent) => void

export interface MenuItem {
  label: string
  key: string
  type?: 'item' | 'group' | 'divider' | 'submenu'
  icon?: string
  path?: string
  show?: boolean
  matchs?: MenuMatch[]
  children?: MenuItem[]
}

export interface MenuMatch {
  name: string
  path: string
  meta?: {
    title?: string
    icon?: string
    hidden?: boolean
    [key: string]: any
  }
  children?: MenuItem[]
}


// 业务相关
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