import { useRouter } from 'vue-router'
import { useSidebarStore } from '@/shared/ui/layouts/sidebar/use-sidebar-store'
import { useUserStore } from './use-user-store'
import { removeToken } from '@/shared/lib/token'
import { $dialog } from '@/shared/lib/ui-helpers/discrete-api'

export function useLogout() {
  const router = useRouter()
  const userStore = useUserStore()
  const sidebarStore = useSidebarStore()

  const logout = async (showConfirm = true) => {
    if (showConfirm) {
      return new Promise<void>((resolve, reject) => {
        $dialog.warning({
          title: '退出登录',
          content: '确定要退出登录吗？',
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: async () => {
            try {
              await performLogout()
              resolve()
            } catch (error) {
              reject(error)
            }
          },
          onNegativeClick: () => {
            reject(new Error('用户取消退出'))
          },
        })
      })
    } else {
      await performLogout()
    }
  }

  const performLogout = async () => {
    try {
      // 1. 清除 token
      removeToken()

      // 2. 清除用户状态
      userStore.clear()

      // 3. 清除侧边栏状态
      sidebarStore.clear()

      // 4. 重置权限状态
      // permState.resetPerm()

      // 5. 跳转到登录页
      await router.push('/login')

      console.log('退出登录成功')
    } catch (error) {
      console.error('退出登录失败:', error)
      throw error
    }
  }

  return {
    logout,
    performLogout,
  }
}
