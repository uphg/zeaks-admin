import type { FormRules, NForm } from "naive-ui";
import type { FormValidate } from "naive-ui/es/form/src/interface";
import type { Ref, ShallowRef } from "vue";

export interface FormKitStore {
  form: Ref<Record<string, any>>,
  formRef: ShallowRef<InstanceType<typeof NForm>>,
  rules: Ref<FormRules>
  resetForm: () => void
  setFields: (fields: Partial<Record<string, any>>) => void
  resetFields: () => void
  validate: FormValidate
  resetValidation: () => void
}