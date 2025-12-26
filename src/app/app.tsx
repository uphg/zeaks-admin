import './styles'
import { createApp } from 'vue'
import { router } from './router/router'
import { NConfigProvider } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'

// 创建 Vue 应用
export function createVueApp() {
  const app = createApp({
    setup() {
      return () => (
        <div id="app">
          <NConfigProvider locale={zhCN} date-locale={dateZhCN}>
            <router-view />
          </NConfigProvider>
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