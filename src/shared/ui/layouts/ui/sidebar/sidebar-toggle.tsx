import { NIcon } from 'naive-ui'
import ArrowLeftToLine from '~icons/lucide/arrow-left-to-line'
import ArrowRightToLine from '~icons/lucide/arrow-right-to-line'
import PureButton from '@/shared/ui/pure-button/pure-button'
import { useSidebarStore } from '@/shared/ui/layouts/ui/sidebar/use-sidebar-store'
import { defineComponent } from 'vue'

const SidebarToggle = defineComponent(() => {
  const sidebar = useSidebarStore()
  return () => (
    <PureButton class="flex h-8 w-8 items-center justify-center" onClick={sidebar.toggleSidebar}>
      <NIcon class="text-xl">
        {sidebar.collapsed ? <ArrowRightToLine /> : <ArrowLeftToLine /> }
      </NIcon>
    </PureButton>
  )
})

export default SidebarToggle
