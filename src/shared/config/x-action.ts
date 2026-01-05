import type { TagProps } from 'naive-ui'
import type { Component } from 'vue'
import IconDownload from '~icons/lucide/download'
import IconEdit from '~icons/lucide/edit'
import IconEye from '~icons/lucide/eye'
import IconPlus from '~icons/lucide/plus'
import IconRotateCcw from '~icons/lucide/rotate-ccw'
import IconSearch from '~icons/lucide/search'
import IconTrash2 from '~icons/lucide/trash-2'
import IconUpload from '~icons/lucide/upload'

export type ActionButtonType = keyof typeof xActionMap
export type ActionMap = Record<ActionButtonType, {
  type: TagProps['type']
  text: string
  icon: Component
}>

export interface XAction {
  type: keyof typeof xActionMap
  text?: string
  onClick?: () => void
}

export type NButtonType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'


export const xActionMap = {
  create: { type: 'primary', text: '新增', icon: IconPlus },
  search: { type: 'primary', text: '搜索', icon: IconSearch },
  reset: { type: 'default', text: '重置', icon: IconRotateCcw },
  update: { type: 'primary', text: '修改', icon: IconEdit },
  delete: { type: 'error', text: '删除', icon: IconTrash2 },
  batchDelete: { type: 'error', text: '批量删除', icon: IconTrash2 },
  import: { type: 'default', text: '导入', icon: IconUpload },
  export: { type: 'default', text: '导出', icon: IconDownload },
  preview: { type: 'info', text: '预览', icon: IconEye },
}
