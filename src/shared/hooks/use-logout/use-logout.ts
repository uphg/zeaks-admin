import { useDialog } from 'naive-ui'
import { useRouter } from 'vue-router'
import { removeToken } from '@/shared/lib'

export function useLogout() {
  const router = useRouter()
  const dialog = useDialog()

  const logout = async (showConfirm = true) => {
    if (showConfirm) {
      return new Promise<void>((resolve, reject) => {
        dialog.warning({
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

      // 2. 跳转到登录页
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