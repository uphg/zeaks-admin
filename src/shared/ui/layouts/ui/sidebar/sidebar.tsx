import type { MenuOption } from 'naive-ui'
import type { RouteLocationRaw } from 'vue-router'
import type { MenuItem } from '@/types/menu'
import { NMenu, NScrollbar } from 'naive-ui'
import { Transition } from 'vue'
import { RouterLink } from 'vue-router'
import IconLogo from '~icons/local/logo'
import { useSidebarStore } from '@/stores/sidebar'

const LayoutSidebar = defineComponent(() => {
  const sidebar = useSidebarStore()
  const expandedKeys = ref<string[]>([])
  const selectedKey = ref<string | undefined>()
  const route = useRoute()
  watch(() => route.fullPath, handleMenuExpand)
  watch(() => sidebar.menus, () => handleMenuExpand(), { immediate: true, deep: true })

  handleMenuExpand()

  function handleMenuExpand() {
    const { path } = route

    const matchedMenuItem = findMenuItemByPath(sidebar.menus, path)
    if (matchedMenuItem) {
      selectedKey.value = matchedMenuItem.key as string

      const expandKeys = getParentKeys(sidebar.menus, matchedMenuItem.key as string)
      expandedKeys.value = expandKeys
    }
  }

  function getParentKeys(menus: MenuItem[], targetKey: string, parents: string[] = []): string[] {
    for (const menu of menus) {
      const newKeys = [...parents, menu.key]

      if (menu.key === targetKey) {
        return parents
      }

      if (menu.children) {
        const result = getParentKeys(menu.children, targetKey, newKeys)
        if (result.length > 0 || menu.children.some((child: MenuItem) => child.key === targetKey)) {
          return newKeys
        }
      }
    }
    return []
  }

  function findMenuItemByPath(menus: MenuItem[], path: string): MenuItem | null {
    for (const menu of menus) {
      if (menu.path === path) {
        return menu
      }
      if (menu.children) {
        const child = findMenuItemByPath(menu.children, path)
        if (child) return child
      }
    }
    return null
  }

  return () => (
    <div class={['h-full border-r-1 border-r-gray-200']}>
      <div class={['h-full flex flex-col transition-width', sidebar.collapsed ? 'w-16' : 'w-60']}>
        <div class={['h-15 border-b-1 border-b-gray-200 overflow-hidden', sidebar.collapsed ? 'w-16' : 'w-60']}>
          <div class={['flex gap-2 h-15 items-center transition-spacing duration-250 relative', sidebar.collapsed ? 'px-4' : 'px-3']}>
            <IconLogo />
            <div class="w-20 left-13 absolute">
              <Transition name="fade">
                {sidebar.collapsed ? null : <span class="font-size-4.5">Vue Best</span>}
              </Transition>
            </div>
          </div>
        </div>
        <NScrollbar class="flex-1">
          <NMenu
            collapsedWidth={64}
            collapsedIconSize={22}
            v-model:value={selectedKey.value}
            v-model:expanded-keys={expandedKeys.value}
            collapsed={sidebar.collapsed}
            options={sidebar.menus as MenuOption[]}
            value={selectedKey.value}
            default-value={selectedKey.value}
            render-label={renderMenuLabel}
            render-icon={renderMenuIcon}
          />
        </NScrollbar>
      </div>
    </div>
  )
})

function renderMenuLabel(option: MenuOption) {
  if ('href' in option) {
    return h('a', { href: option.href, target: '_blank' }, option.label as string)
  }
  return option.type === 'item'
    ? (
        <RouterLink to={option.path as RouteLocationRaw}>
          {option.label}
        </RouterLink>
      )
    : (
        <div>{option.label}</div>
      )
}

function renderMenuIcon(option: MenuOption) {
  // 渲染图标占位符以保持缩进
  if (option.key === 'sheep-man') return true
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === 'food') return null
  if (!option.icon) return
  return h(option.icon)
}

export default LayoutSidebar
