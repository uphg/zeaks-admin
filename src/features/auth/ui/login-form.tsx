import type { FormInst, FormRules } from 'naive-ui'
import { NButton, NCard, NForm, NFormItem, NInput } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../model'

const LoginForm = defineComponent({
  name: 'LoginForm',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const loginForm = ref({
      username: 'admin',
      password: '123456',
    })

    const formRef = ref<FormInst>()
    const loading = ref(false)

    const rules: FormRules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
      ],
    }

    const handleLogin = async () => {
      if (!formRef.value) return

      await formRef.value.validate(async (errors) => {
        if (errors) return

        loading.value = true
        try {
          const result = await authStore.login(loginForm.value.username, loginForm.value.password)

          if (result.success) {
            router.push('/home')
          } else {
            console.error('Login failed:', result.message)
          }
        } finally {
          loading.value = false
        }
      })
    }

    return () => (
      <NCard title="登录" class="w-96">
        <NForm ref={formRef} model={loginForm.value} rules={rules}>
          <NFormItem label="用户名" path="username">
            <NInput
              v-model:value={loginForm.value.username}
              placeholder="请输入用户名"
              clearable
            />
          </NFormItem>
          <NFormItem label="密码" path="password">
            <NInput
              v-model:value={loginForm.value.password}
              type="password"
              placeholder="请输入密码"
              clearable
              onKeydown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin()
                }
              }}
            />
          </NFormItem>
          <NFormItem>
            <NButton
              type="primary"
              size="large"
              loading={loading.value}
              onClick={handleLogin}
              class="w-full"
            >
              登录
            </NButton>
          </NFormItem>
          <div class="text-center text-sm text-gray-600">
            还没有账号？<a href="/register" class="text-blue-500 hover:text-blue-700">立即注册</a>
          </div>
        </NForm>
      </NCard>
    )
  },
})

export default LoginForm