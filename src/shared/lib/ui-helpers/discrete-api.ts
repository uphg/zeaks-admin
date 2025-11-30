import type { DialogOptions } from 'naive-ui'
import type { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider'
import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import type { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'
import type { LoadingBarApiInjection } from 'naive-ui/es/loading-bar/src/LoadingBarProvider'
import { createDiscreteApi } from 'naive-ui'

interface OpenDialogOptions extends DialogOptions {
  onConfirm: () => Promise<any> | void
}

interface Confirm {
  create: (options: OpenDialogOptions) => void
  error: (options: OpenDialogOptions) => void
  info: (options: OpenDialogOptions) => void
  success: (options: OpenDialogOptions) => void
  warning: (options: OpenDialogOptions) => void
}

const confirmTypes = ['create', 'error', 'info', 'success', 'warning'] as const

const { dialog, message, notification, loadingBar } = createDiscreteApi(['message', 'dialog', 'notification', 'loadingBar'])

const defaultOptions = {
  title: '提示',
  positiveText: '确定',
  negativeText: '取消',
}

function createConfirmDialog() {
  const confirm = {} as Confirm
  confirmTypes.forEach((type) => {
    confirm[type] = createConfirmTypes(type)
  })

  return confirm
}

function createConfirmTypes(type: keyof DialogApiInjection) {
  return (options: OpenDialogOptions) => {
    const { onConfirm, ...rest } = Object.assign(defaultOptions, options)
    const dialogOptions = Object.assign({
      onPositiveClick: async () => {
        try {
          await onConfirm()
        } catch (e) {
          return false
        }
        return true
      },
    }, rest)
    dialog[type](dialogOptions)
  }
}

export const $confirm = createConfirmDialog()
export const $dialog = dialog as DialogApiInjection
export const $notification = notification as NotificationApiInjection
export const $loadingBar = loadingBar as LoadingBarApiInjection
export const $message = message as MessageApiInjection
