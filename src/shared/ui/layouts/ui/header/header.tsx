import { defineComponent } from 'vue'
import LayoutNavTags from '../nav-tags/nav-tags'
import SidebarToggle from '../sidebar/sidebar-toggle'
import HeaderBreadcrumb from './header-breadcrumb'
import UserDropdown from './user-dropdown'

const LayoutHeader = defineComponent(() => {
  return () => (
    <div class="flex flex-col">
      <div class="px-4 border-b-1 border-b-gray-200 flex gap-2 h-[var(--header-height)] items-center">
        <SidebarToggle />
        <HeaderBreadcrumb />
        <div class="ml-auto flex gap-4 items-center">
          <UserDropdown />
        </div>
      </div>
      <LayoutNavTags />
    </div>
  )
})

export default LayoutHeader
