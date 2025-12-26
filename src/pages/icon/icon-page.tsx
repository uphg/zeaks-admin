import IconPicker from '@/features/icon-picker/icon-picker'
import { iconMap } from '@/shared/lib/icon-map'
import { $message } from '@/shared/lib/naive-ui'
import { useClipboard } from '@vueuse/core'
import { defineComponent } from 'vue'

const IconPage = defineComponent(() => {
  const icons = Object.entries(iconMap)
  const { copy } = useClipboard()

  return () => (
    <div class="p-6">
      <h2 class="text-lg font-semibold mb-3">图标选择器</h2>
      <div>
        <IconPicker />
      </div>
      <h2 class="text-lg font-semibold mb-3 mt-4">图标列表</h2>
      <div class="flex justify-center">
        <div class="flex flex-wrap gap-3">
          {icons.map(([key, Icon]) => (
            <div
              class="w-14 h-14 border-rd-1.5 bg-gray-100 flex justify-center items-center cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              key={key}
              onClick={() => onIconCopy(key)}
            ><Icon class="w-6 h-6" /></div>
          ))}
        </div>
      </div>
    </div>
  )

  async function onIconCopy(key: string) {
    await copy(key)
    $message.success('已复制！')
  }
})

export default IconPage
