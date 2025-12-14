import { defineComponent } from 'vue'

const IconPage = defineComponent(() => {
  return () => (
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">关于页面</h1>
      <p class="text-gray-600 mb-4">这是关于页面的内容。</p>
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-lg font-semibold mb-3">项目信息</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li>项目名称：Aur Admin</li>
          <li>技术栈：Vue 3 + TypeScript + TSX</li>
          <li>架构：FSD (Feature-Sliced Design)</li>
          <li>UI库：Naive UI</li>
        </ul>
      </div>
    </div>
  )
})

export default IconPage
