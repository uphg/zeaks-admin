import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './routes'
import { initRouterGuards } from './guards/guards'

const routes = [
  ...constantRoutes
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// 设置路由守卫导航守卫
initRouterGuards(router)