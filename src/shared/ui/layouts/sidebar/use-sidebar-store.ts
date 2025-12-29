import type { MenuItem } from '@/shared/lib/utility-types'
import { createStore } from '@/shared/lib/create-store'
import { ref } from 'vue'

export type SidebarStore = ReturnType<typeof useSidebarStore>

export const useSidebarStore = createStore(() => {
  const inverted = ref(false)
  const collapsed = ref(false)
  const menusMap = ref(new Map<string, MenuItem>())

  // Example menu options, replace with your actual menu data
  const menus = ref<MenuItem[]>([])

  function toggleSidebar() {
    collapsed.value = !collapsed.value
  }

  function setInverted(value: boolean) {
    inverted.value = value
  }

  function setCollapsed(value: boolean) {
    collapsed.value = value
  }

  function setMenus(value: MenuItem[]) {
    menus.value = value
  }

  function setMenuMap(map: Map<string, MenuItem>) {
    menusMap.value = map
  }

  function clear() {
    menus.value = []
    menusMap.value = new Map()
  }

  return {
    inverted,
    collapsed,
    menus,
    menusMap,
    toggleSidebar,
    setInverted,
    setCollapsed,
    setMenus,
    setMenuMap,
    clear,
  }
})
