import { defineComponent } from '@/shared/ui/vue-imports'
import { LoginForm } from '@/features/auth'

const LoginPage = defineComponent({
  name: 'LoginPage',
  setup() {
    return () => (
      <div class="flex h-screen items-center justify-center bg-gray-100">
        <LoginForm />
      </div>
    )
  },
})

export default LoginPage