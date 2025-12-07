import { createApp } from 'vue'
import { router } from './router/router'
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