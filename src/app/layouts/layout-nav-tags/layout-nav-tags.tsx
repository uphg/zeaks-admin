import { defineComponent } from '@/shared/ui/vue-imports'

export const LayoutNavTags = defineComponent({
  name: 'LayoutNavTags',
  setup() {
    return () => (
      <div class="h-8 border-b border-gray-200 px-4 flex items-center">
        {/* 导航标签占位符 */}
        <div class="flex gap-2">
          <div class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">首页</div>
        </div>
      </div>
    )
  },
})