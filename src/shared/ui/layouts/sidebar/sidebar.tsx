import type { MenuOption } from 'naive-ui'
import type { RouteLocationRaw } from 'vue-router'
import type { MenuItem } from '@/shared/lib/utility-types'
import { NMenu, NScrollbar } from 'naive-ui'
import { defineComponent, h, ref, Transition, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import IconLogo from '~icons/local/logo'
import { useSidebarStore } from './use-sidebar-store'

const LayoutSidebar = defineComponent(() => {
  const { collapsed, menus } = useSidebarStore()
  const expandedKeys = ref<string[]>([])
  const selectedKey = ref<string | undefined>()
  const route = useRoute()
  watch(() => route.fullPath, handleMenuExpand)
  watch(() => menus.value, () => handleMenuExpand(), { immediate: true, deep: true })

  handleMenuExpand()

  function handleMenuExpand() {
    const { path } = route

    const matchedMenuItem = findMenuItemByPath(menus.value, path)
    if (matchedMenuItem) {
      selectedKey.value = matchedMenuItem.key as string

      const expandKeys = getParentKeys(menus.value, matchedMenuItem.key as string)
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
      <div class={['h-full flex flex-col transition-width', collapsed.value ? 'w-16' : 'w-60']}>
        <div class={['h-15 border-b-1 border-b-gray-200 overflow-hidden', collapsed.value ? 'w-16' : 'w-60']}>
          <div class={['flex gap-2 h-15 items-center transition-spacing duration-250 relative', collapsed.value ? 'px-4' : 'px-3']}>
            <IconLogo />
            <div class="w-20 left-13 absolute">
              <Transition name="fade">
                {collapsed.value ? null : <span class="font-size-4.5">Vue Best</span>}
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
            collapsed={collapsed.value}
            options={menus.value as MenuOption[]}
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
  console.log('option')
  console.log(option)
  if (!option.icon) return
  return h(option.icon)
}

export default LayoutSidebar
