import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NResult } from 'naive-ui'

const NotFoundPage = defineComponent({
  name: 'NotFoundPage',
  setup() {
    const router = useRouter()

    return () => (
      <div class="flex h-screen items-center justify-center">
        <NResult
          status="403"
          title="403 禁止访问"
          description="总有些门是对你关闭的"
        >
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