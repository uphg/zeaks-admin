import { NScrollbar } from 'naive-ui'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { LayoutHeader } from '../layout-header'
import { LayoutSidebar } from '../layout-sidebar'

const LayoutDefault = defineComponent({
  name: 'LayoutDefault',
  setup() {
    return () => (
      <div class="bg-white flex flex-col h-screen">
        <div class="flex h-full">
          <LayoutSidebar />
          <div class="flex flex-1 flex-col h-full">
            <LayoutHeader />
            <NScrollbar class="flex-1 p-4">
              <RouterView />
            </NScrollbar>
          </div>
        </div>
      </div>
    )
  },
})

export default LayoutDefault