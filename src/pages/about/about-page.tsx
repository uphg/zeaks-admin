import { defineComponent } from 'vue'

const AboutPage = defineComponent(() => {
  return () => (
    <div class="p-5">
      <h1 class="text-2xl font-bold mb-3">关于页面</h1>
      <p class="text-gray-600 mb-4">这是关于页面的内容。</p>
      <div class="bg-white p-5 rounded-lg border-1 border-solid border-gray-200">
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

export default AboutPage