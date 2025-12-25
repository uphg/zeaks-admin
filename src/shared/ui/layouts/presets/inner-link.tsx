import { computed, defineComponent } from "vue"
import { useRoute } from "vue-router"

const LayoutInnerLink = defineComponent(() => {
  const route = useRoute()
  const link = computed(() => route.meta?.link as string)
  return () => (
    <div class="h-[calc(100vh-var(--header-height)-var(--nav-tags-height))] w-full">
      <iframe class="border-none h-full w-full" src={link.value} />
    </div>
  )
})

export default LayoutInnerLink
