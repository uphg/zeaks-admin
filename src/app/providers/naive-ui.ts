import { createDiscreteApi, lightTheme } from 'naive-ui'
import { computed } from 'vue'
import type { App } from 'vue'

export function installNaiveUI(app: App) {
  // Create discrete APIs
  const configProviderProps = computed(() => ({
    theme: lightTheme,
  }))

  const { message, notification, dialog, loadingBar } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    {
      configProviderProps,
    },
  )

  // Provide global APIs
  app.provide('$message', message)
  app.provide('$dialog', dialog)
  app.provide('$notification', notification)
  app.provide('$loadingBar', loadingBar)

  // Expose to globalThis for convenience
  // @ts-expect-error
  globalThis.$message = message
  // @ts-expect-error
  globalThis.$dialog = dialog
  // @ts-expect-error
  globalThis.$notification = notification
  // @ts-expect-error
  globalThis.$loadingBar = loadingBar

  return { message, notification, dialog, loadingBar }
}