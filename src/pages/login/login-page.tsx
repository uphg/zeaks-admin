import type { FormInst } from 'naive-ui'
import { NButton, NCard, NForm, NFormItem, NInput } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiLogin } from '@/entities/user/api/user-api'
import { setToken } from '@/shared/lib/token'

interface LoginForm {
  username: string
  password: string
}

const LoginPage = defineComponent({
  setup() {
    const loginForm = ref<LoginForm>({ username: 'admin', password: '123456' })
    const formRef = ref<FormInst>()
    const loading = ref(false)
    const router = useRouter()
    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ],
    }

    async function onLoginClick() {
      const { warnings } = await formRef.value?.validate()!
      if (warnings) return
      loading.value = true
      const response = await apiLogin(loginForm.value).finally(() => loading.value = false)
      setToken(response?.token)
      router.push('/home')
    }

    return () => (
      <div class="flex h-screen items-center justify-center">
        <NCard title="Login" class="w-96">
          <NForm ref={formRef} model={loginForm.value} rules={rules}>
            <NFormItem path="username" label="Username">
              <NInput
                v-model:value={loginForm.value.username}
                placeholder="Enter your username"
              />
            </NFormItem>
            <NFormItem path="password" label="Password">
              <NInput
                v-model:value={loginForm.value.password}
                type="password"
                placeholder="Enter your password"
              />
            </NFormItem>
            <NFormItem>
              <NButton
                class="w-full"
                type="primary"
                size="large"
                loading={loading.value}
                onClick={onLoginClick}
              >
                登录
              </NButton>
            </NFormItem>
          </NForm>
        </NCard>
      </div>
    )
  },
})

export default LoginPage
