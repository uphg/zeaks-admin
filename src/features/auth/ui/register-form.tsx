import type { FormInst, FormRules } from 'naive-ui'
import { NButton, NCard, NForm, NFormItem, NInput } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../model'

const RegisterForm = defineComponent({
  name: 'RegisterForm',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const registerForm = ref({
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
    })

    const formRef = ref<FormInst>()
    const loading = ref(false)

    const rules: FormRules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
      ],
      confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        {
          validator: (rule, value) => {
            return value === registerForm.value.password
          },
          message: '两次输入密码不一致',
          trigger: 'blur',
        },
      ],
      email: [
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
      ],
    }

    const handleRegister = async () => {
      if (!formRef.value) return

      await formRef.value.validate(async (errors) => {
        if (errors) return

        loading.value = true
        try {
          const result = await authStore.register(
            registerForm.value.username,
            registerForm.value.password,
            registerForm.value.email,
          )

          if (result.success) {
            router.push('/home')
          } else {
            console.error('Register failed:', result.message)
          }
        } finally {
          loading.value = false
        }
      })
    }

    return () => (
      <NCard title="注册" class="w-96">
        <NForm ref={formRef} model={registerForm.value} rules={rules}>
          <NFormItem label="用户名" path="username">
            <NInput
              v-model:value={registerForm.value.username}
              placeholder="请输入用户名"
              clearable
            />
          </NFormItem>
          <NFormItem label="邮箱" path="email">
            <NInput
              v-model:value={registerForm.value.email}
              placeholder="请输入邮箱（可选）"
              clearable
            />
          </NFormItem>
          <NFormItem label="密码" path="password">
            <NInput
              v-model:value={registerForm.value.password}
              type="password"
              placeholder="请输入密码"
              clearable
            />
          </NFormItem>
          <NFormItem label="确认密码" path="confirmPassword">
            <NInput
              v-model:value={registerForm.value.confirmPassword}
              type="password"
              placeholder="请再次输入密码"
              clearable
            />
          </NFormItem>
          <NFormItem>
            <NButton
              type="primary"
              size="large"
              loading={loading.value}
              onClick={handleRegister}
              class="w-full"
            >
              注册
            </NButton>
          </NFormItem>
          <div class="text-center text-sm text-gray-600">
            已有账号？<a href="/login" class="text-blue-500 hover:text-blue-700">立即登录</a>
          </div>
        </NForm>
      </NCard>
    )
  },
})

export default RegisterForm