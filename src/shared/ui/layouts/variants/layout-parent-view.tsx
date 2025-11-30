import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

const LayoutParentView = defineComponent(() => {
  return () => (
    <RouterView></RouterView>
  )
})

export default LayoutParentView
