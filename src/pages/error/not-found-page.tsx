import { defineComponent } from '@/shared/ui/vue-imports'
import { useRouter } from 'vue-router'
import { NButton, NResult } from 'naive-ui'

const NotFoundPage = defineComponent({
  name: 'NotFoundPage',
  setup() {
    const router = useRouter()

    return () => (
      <div class="flex h-screen items-center justify-center">
        <NResult
          status="404"
          title="404 页面未找到"
          description="抱歉，您访问的页面不存在">
          {{
            footer: () => (
              <NButton type="primary" onClick={() => router.push('/home')}>
                返回首页
              </NButton>
            ),
          }}
        </NResult>
      </div>
    )
  },
})

export default NotFoundPage