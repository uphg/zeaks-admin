import { NButton } from 'naive-ui'
import { defineComponent } from '@/shared/ui/vue-imports'
import { Menu } from 'lucide-vue-next'

export const SidebarToggle = defineComponent({
  name: 'SidebarToggle',
  setup() {
    return () => (
      <NButton
        quaternary
        circle
        size="small"
        onClick={() => {
          // 切换侧边栏状态
          console.log('Toggle sidebar')
        }}
      >
        <Menu />
      </NButton>
    )
  },
})