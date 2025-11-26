import { defineComponent } from '@/shared/ui/vue-imports'

const HomePage = defineComponent({
  name: 'HomePage',
  setup() {
    return () => (
      <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">首页</h1>
        <p class="text-gray-600 mb-6">欢迎使用 Aur Admin 管理后台系统！</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <h3 class="text-lg font-semibold mb-2">系统信息</h3>
            <p class="text-gray-600">系统运行正常</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <h3 class="text-lg font-semibold mb-2">用户统计</h3>
            <p class="text-gray-600">活跃用户：1</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <h3 class="text-lg font-semibold mb-2">快速操作</h3>
            <p class="text-gray-600">查看系统状态</p>
          </div>
        </div>
        <div class="mt-8 bg-white p-6 rounded-lg shadow-sm border">
          <h3 class="text-lg font-semibold mb-4">最近活动</h3>
          <div class="space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} class="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <div class="flex-1">
                  <p class="text-sm font-medium">系统活动 {i + 1}</p>
                  <p class="text-xs text-gray-500">刚刚</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
})

export default HomePage