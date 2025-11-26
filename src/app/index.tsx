import { createApp } from '@/shared/ui/vue-imports'
import { installPinia, installNaiveUI } from './providers'
import { router } from './routes/router'
import './styles'

// 创建 Vue 应用
export function createVueApp() {
  const app = createApp({
    setup() {
      return () => (
        <div id="app">
          <router-view />
        </div>
      )
    },
  })

  // 设置 Pinia
  installPinia(app)

  // 设置 NaiveUI
  installNaiveUI(app)

  // 使用路由
  app.use(router)

  return app
}

// 挂载应用
export function mountApp() {
  const app = createVueApp()
  app.mount('#app')
  return app
}