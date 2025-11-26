import { defineComponent } from '@/shared/ui/vue-imports'
import { NInput } from 'naive-ui'

interface XFormInputProps {
  value?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  type?: 'text' | 'password' | 'textarea'
}

const XFormInput = defineComponent<XFormInputProps>({
  name: 'XFormInput',
  props: {
    value: String,
    placeholder: String,
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String as any,
      default: 'text',
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    return () => (
      <NInput
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        clearable={props.clearable}
        type={props.type}
        onUpdate:value={(value) => emit('update:value', value)}
      />
    )
  },
})

export default XFormInput