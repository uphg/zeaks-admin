import type { FormInst, FormRules } from 'naive-ui'
import { NForm, NFormItem, NInput, NInputNumber, NSelect, NSwitch, NDatePicker, NCheckbox, NRadio, NRadioGroup } from 'naive-ui'
import { defineComponent, ref, reactive, type Ref } from 'vue'

export interface FieldConfig {
  key: string
  label: string
  type: 'input' | 'number' | 'select' | 'switch' | 'date' | 'checkbox' | 'radio'
  placeholder?: string
  options?: Array<{ label: string, value: any }>
  rules?: any[]
  required?: boolean
}

export interface UseFormOptions {
  fields: FieldConfig[]
  labelPlacement?: 'left' | 'top'
  labelWidth?: string | number
  size?: 'small' | 'medium' | 'large'
}

export function useForm(options: UseFormOptions): {
  Form: ReturnType<typeof defineComponent>
  formData: Record<string, any>
  formRef: Ref<FormInst | undefined>
  validate: () => Promise<any>
  resetValidation: () => void
  resetFields: () => void
  setFields: (fields: Record<string, any>) => void
} {
  const formRef = ref<FormInst>()
  const formData = reactive<Record<string, any>>({})
  const rules = reactive<FormRules>({})

  // 初始化表单数据和规则
  options.fields.forEach((field) => {
    formData[field.key] = ''
    if (field.rules || field.required) {
      rules[field.key] = field.rules || [
        {
          required: true,
          message: `${field.label}不能为空`,
          trigger: ['blur', 'change'],
        },
      ]
    }
  })

  const Form = defineComponent(() => {
    const renderField = (field: FieldConfig) => {
      const commonProps = {
        value: formData[field.key],
        placeholder: field.placeholder,
        onUpdateValue: (value: any) => {
          formData[field.key] = value
        },
      }

      switch (field.type) {
        case 'input':
          return <NInput {...commonProps} />
        case 'number':
          return <NInputNumber {...commonProps} />
        case 'select':
          return <NSelect {...commonProps} options={field.options} />
        case 'switch':
          return <NSwitch {...commonProps} />
        case 'date':
          return <NDatePicker {...commonProps} />
        case 'checkbox':
          return <NCheckbox {...commonProps} />
        case 'radio':
          if (field.options) {
            return (
              <NRadioGroup {...commonProps}>
                {field.options.map(option => (
                  <NRadio key={option.value} value={option.value}>{option.label}</NRadio>
                ))}
              </NRadioGroup>
            )
          }
          return <NRadio {...commonProps} />
        default:
          return <NInput {...commonProps} />
      }
    }

    return () => (
      <NForm
        ref={formRef}
        model={formData}
        rules={rules}
        label-placement={options.labelPlacement || 'top'}
        label-width={options.labelWidth}
        size={options.size || 'medium'}
      >
        {options.fields.map((field) => (
          <NFormItem
            key={field.key}
            label={field.label}
            path={field.key}
            rule={rules[field.key]}
          >
            {renderField(field)}
          </NFormItem>
        ))}
      </NForm>
    )
  })

  const validate = async () => {
    return formRef.value?.validate()
  }

  const resetValidation = () => {
    formRef.value?.restoreValidation()
  }

  const resetFields = () => {
    options.fields.forEach((field) => {
      formData[field.key] = ''
    })
  }

  const setFields = (fields: Record<string, any>) => {
    Object.keys(fields).forEach((key) => {
      if (key in formData) {
        formData[key] = fields[key]
      }
    })
  }

  return {
    Form,
    formData,
    formRef,
    validate,
    resetValidation,
    resetFields,
    setFields,
  }
}