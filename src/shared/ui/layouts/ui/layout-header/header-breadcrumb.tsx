import type { MenuMatch } from '@/shared/lib/utility-types'
import { NBreadcrumb, NBreadcrumbItem, NDropdown } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'

interface BreadcrumbItem {
  label: string
  key: string
  name: string
  children?: any[]
}

export default defineComponent({
  name: 'HeaderBreadcrumb',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const sidebar = useSidebarStore()
    const breadItems = computed<BreadcrumbItem[]>(() => {
      const current = sidebar.menusMap?.get(route?.name as string)
      if (!current?.matchs) return []

      const matchs = current.matchs.filter((item: MenuMatch) => !!item?.name)
      if (!matchs?.length) return []

      return matchs.map(({ meta, path, name, children }: MenuMatch) => ({
        label: meta?.title || name,
        key: path,
        name,
        children,
      }))
    })

    function getDropOptions(item: BreadcrumbItem): any[] {
      return sidebar.menusMap?.get(item.name)?.children || []
    }

    function handleDropSelect(name: string) {
      router.push({ name })
    }

    return () => {
      if (!breadItems.value?.length) return null

      return (
        <NBreadcrumb>
          {breadItems.value.map((item, index) => {
            const isLast = index === breadItems.value.length - 1
            const dropOptions = isLast ? [] : getDropOptions(item)

            return (
              <NBreadcrumbItem key={item.key}>
                <NDropdown
                  options={dropOptions}
                  onSelect={handleDropSelect}
                >
                  <div class="m--1 p-1 border-inherit flex items-center">
                    {item.label}
                  </div>
                </NDropdown>
              </NBreadcrumbItem>
            )
          })}
        </NBreadcrumb>
      )
    }
  },
})
