import type { DialogOptions } from 'naive-ui'
import type { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider'
import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
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
const { dialog, message } = createDiscreteApi(['dialog', 'message']) as any

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

function createConfirmTypes(type: string) {
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
export const $message = message as MessageApiInjection