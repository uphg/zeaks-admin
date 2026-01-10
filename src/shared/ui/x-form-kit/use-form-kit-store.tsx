import type { FormRules, NForm } from "naive-ui"
import { ref, shallowRef } from "vue"

export function useFormKitStore() {
  const store = {
    form: ref<Record<string, any>>({}),
    formRef: shallowRef<InstanceType<typeof NForm>>(),
    rules: ref<FormRules>({})
  }
  return store
}