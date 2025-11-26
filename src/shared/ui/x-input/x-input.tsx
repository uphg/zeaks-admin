import { defineComponent, ref } from '@/shared/ui/vue-imports'
const XInput = defineComponent({
  name: 'XInput',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value', 'input', 'focus', 'blur'],
  setup(props, { emit }) {
    const inputRef = ref(null)

    return () => (
      <input
        ref={inputRef}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onInput={(e: Event) => {
          const target = e.target as HTMLInputElement
          emit('update:value', target.value)
          emit('input', target.value)
        }}
        onFocus={(e: Event) => emit('focus', e)}
        onBlur={(e: Event) => emit('blur', e)}
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    )
  },
})

export default XInput