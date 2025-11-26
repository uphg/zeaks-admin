import { defineComponent } from '@/shared/ui/vue-imports'
import { RegisterForm } from '@/features/auth'

const RegisterPage = defineComponent({
  name: 'RegisterPage',
  setup() {
    return () => (
      <div class="flex h-screen items-center justify-center bg-gray-100">
        <RegisterForm />
      </div>
    )
  },
})

export default RegisterPage