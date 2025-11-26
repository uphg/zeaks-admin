import type { MenuOption } from 'naive-ui'
import { NMenu, NScrollbar } from 'naive-ui'
import { defineComponent, ref } from '@/shared/ui/vue-imports'
import { RouterLink } from 'vue-router'
import { LayoutDashboard } from 'lucide-vue-next'

// 模拟菜单数据
const mockMenus: MenuOption[] = [
  {
    label: '首页',
    key: 'home',
    path: '/home',
  },
  {
    label: '关于',
    key: 'about',
    path: '/about',
  },
]

const LayoutSidebar = defineComponent({
  name: 'LayoutSidebar',
  setup() {
    const collapsed = ref(false)
    const selectedKey = ref('home')
    const expandedKeys = ref<string[]>([])

    const renderMenuLabel = (option: MenuOption) => {
      return (
        <RouterLink to={option.path as string}>
          {option.label}
        </RouterLink>
      )
    }

    return () => (
      <div class="h-full border-r border-gray-200">
        <div class={`h-full flex flex-col transition-width ${collapsed ? 'w-16' : 'w-60'}`}>
          <div class={`h-15 border-b border-gray-200 overflow-hidden ${collapsed ? 'w-16' : 'w-60'}`}>
            <div class={`flex gap-2 h-15 items-center transition-spacing duration-250 relative ${collapsed ? 'px-4' : 'px-3'}`}>
              <LayoutDashboard class="w-6 h-6 text-blue-500" />
              {!collapsed && <span class="font-size-4.5 font-semibold">Aur Admin</span>}
            </div>
          </div>
          <NScrollbar class="flex-1">
            <NMenu
              collapsedWidth={64}
              collapsedIconSize={22}
              v-model:value={selectedKey.value}
              v-model:expanded-keys={expandedKeys.value}
              collapsed={collapsed.value}
              options={mockMenus}
              render-label={renderMenuLabel}
            />
          </NScrollbar>
        </div>
      </div>
    )
  },
})

export { LayoutSidebar }