import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { User } from '@/entities/user'
import { login as loginApi, register as registerApi, getUserInfo } from '@/entities/user/api'
import { setToken, removeToken } from '@/shared/lib'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string>('')
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const login = async (username: string, password: string) => {
    isLoading.value = true
    try {
      const response = await loginApi({ username, password })

      if (response.data.token) {
        token.value = response.data.token
        user.value = response.data.user
        setToken(response.data.token)
        return { success: true }
      }

      return { success: false, message: '登录失败' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: '登录失败，请检查用户名和密码' }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (username: string, password: string, email?: string) => {
    isLoading.value = true
    try {
      const response = await registerApi({ username, password, email })

      if (response.data.token) {
        token.value = response.data.token
        user.value = response.data.user
        setToken(response.data.token)
        return { success: true }
      }

      return { success: false, message: '注册失败' }
    } catch (error) {
      console.error('Register error:', error)
      return { success: false, message: '注册失败，请重试' }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = ''
    removeToken()
  }

  const fetchUserInfo = async () => {
    if (!token.value) return

    try {
      const userInfo = await getUserInfo()
      user.value = userInfo.data
    } catch (error) {
      console.error('Failed to fetch user info:', error)
      // 如果获取用户信息失败，清除认证状态
      logout()
    }
  }

  const clearAuth = () => {
    user.value = null
    token.value = ''
    removeToken()
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isLoading: readonly(isLoading),
    isAuthenticated: readonly(isAuthenticated),
    login,
    register,
    logout,
    fetchUserInfo,
    clearAuth,
  }
})