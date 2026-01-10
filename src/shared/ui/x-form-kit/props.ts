import type { FormRules, NForm } from "naive-ui";
import type { Ref, ShallowRef } from "vue";

export interface FormKitStore {
  form: Ref<Record<string, any>>,
  formRef: ShallowRef<InstanceType<typeof NForm>>,
  rules: Ref<FormRules>
}