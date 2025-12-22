import { defineComponent } from 'vue'

const UserPage = defineComponent(() => {
  return () => (
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">用户管理</h1>
    </div>
  )
})

export default UserPage