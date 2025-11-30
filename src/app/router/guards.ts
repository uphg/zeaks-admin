import type { Router } from 'vue-router'
import { getToken } from '@/shared/lib'

export function setupRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const token = getToken()
    const requiresAuth = to.meta?.requiresAuth !== false

    // 设置页面标题
    if (to.meta?.title) {
      document.title = `${to.meta.title} - Aur Admin`
    } else {
      document.title = 'Aur Admin'
    }

    // 处理需要认证的页面
    if (requiresAuth) {
      if (!token) {
        // 没有token，重定向到登录页
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        })
        return
      }
    } else {
      // 不需要认证的页面（如登录、注册）
      if (token && (to.path === '/login' || to.path === '/register')) {
        // 已登录用户访问登录/注册页，重定向到首页
        next('/home')
        return
      }
    }

    next()
  })

  router.afterEach((to) => {
    // 可以在这里添加页面访问统计等逻辑
    console.log(`Navigated to: ${to.path}`)
  })
}