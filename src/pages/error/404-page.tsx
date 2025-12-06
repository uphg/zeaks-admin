import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NResult } from 'naive-ui'

const NotFoundPage = defineComponent({
  name: 'NotFoundPage',
  setup() {
    const router = useRouter()

    return () => (
      <div class="flex h-screen items-center justify-center">
        <NResult status="404" title="404 资源不存在" description="生活总归带点荒谬">
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