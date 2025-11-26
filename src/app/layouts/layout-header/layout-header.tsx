import { defineComponent } from '@/shared/ui/vue-imports'
import { LayoutNavTags } from '../layout-nav-tags'
import { SidebarToggle } from '../layout-sidebar'

const LayoutHeader = defineComponent({
  name: 'LayoutHeader',
  setup() {
    return () => (
      <div class="flex flex-col">
        <div class="px-4 border-b border-gray-200 flex gap-2 h-16 items-center">
          <SidebarToggle />
          <div class="flex-1">
            {/* 面包屑导航占位符 */}
          </div>
          <div class="ml-auto flex gap-4 items-center">
            {/* 用户下拉菜单占位符 */}
            <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <LayoutNavTags />
      </div>
    )
  },
})

export { LayoutHeader }