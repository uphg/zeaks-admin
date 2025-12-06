import { defineComponent, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { NForm } from 'naive-ui'

interface XFormProps {
  model?: Record<string, any>
  rules?: FormRules
  labelPlacement?: 'left' | 'top'
  labelWidth?: string | number
  size?: 'small' | 'medium' | 'large'
}

const XForm = defineComponent<XFormProps>({
  name: 'XForm',
  props: {
    model: Object,
    rules: Object,
    labelPlacement: {
      type: String as any,
      default: 'top',
    },
    labelWidth: [String, Number],
    size: {
      type: String as any,
      default: 'medium',
    },
  },
  setup(props, { slots, expose }) {
    const formRef = ref<FormInst>()

    const validate = async () => {
      return formRef.value?.validate()
    }

    const restoreValidation = () => {
      formRef.value?.restoreValidation()
    }

    expose({
      validate,
      restoreValidation,
      formRef,
    })

    return () => (
      <NForm
        ref={formRef}
        model={props.model}
        rules={props.rules}
        label-placement={props.labelPlacement}
        label-width={props.labelWidth}
        size={props.size}
      >
        {slots.default?.()}
      </NForm>
    )
  },
})

export default XForm