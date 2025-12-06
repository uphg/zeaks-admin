import { NScrollbar } from 'naive-ui'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import LayoutHeader from '../ui/header/header'
import LayoutSidebar from '../ui/sidebar/sidebar'

const LayoutDefault = defineComponent(() => {
  return () => (
    <div class="bg-white flex flex-col h-100vh">
      <div class="flex h-full">
        <LayoutSidebar />
        <div class="flex flex-1 flex-col h-full">
          <LayoutHeader />
          <NScrollbar class="flex-1">
            <RouterView />
          </NScrollbar>
        </div>
      </div>
    </div>
  )
})

export default LayoutDefault
