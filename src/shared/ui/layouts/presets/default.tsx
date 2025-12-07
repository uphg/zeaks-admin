import { NScrollbar } from 'naive-ui'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import LayoutHeader from '../header/header'
import LayoutSidebar from '../sidebar/sidebar'

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
