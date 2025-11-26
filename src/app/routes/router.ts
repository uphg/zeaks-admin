import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './index'
import { setupRouterGuards } from './guards'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// 设置路由守卫
setupRouterGuards(router)