import { defineComponent, computed, type PropType } from 'vue'
import type { ClassValue } from 'clsx'
import { mergeClass } from '@/shared/lib'

interface SwitchProps {
  value?: boolean
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: string
  uncheckedColor?: string
  checkedValue?: boolean
  uncheckedValue?: boolean
}

const XSwitch = defineComponent<SwitchProps>({
  name: 'XSwitch',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<'sm' | 'md' | 'lg'>,
      default: 'md',
    },
    color: {
      type: String,
      default: 'bg-blue-500',
    },
    uncheckedColor: {
      type: String,
      default: 'bg-gray-300',
    },
    checkedValue: {
      type: Boolean,
      default: true,
    },
    uncheckedValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value', 'change'],
  inheritAttrs: false,
  setup(props, { emit, attrs }) {
    const isChecked = computed(() => props.value === props.checkedValue)

    const switchClasses = computed(() => {
      const baseClasses = [
        'relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
      ]

      if (props.disabled) {
        baseClasses.push('opacity-50 cursor-not-allowed')
      }

      if (props.loading) {
        baseClasses.push('cursor-wait')
      }

      const sizeClasses = {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      }

      baseClasses.push(sizeClasses[props.size as keyof typeof sizeClasses])

      if (isChecked.value) {
        baseClasses.push(props.color || 'bg-blue-500')
      } else {
        baseClasses.push(props.uncheckedColor || 'bg-gray-300')
      }

      return mergeClass(baseClasses, attrs.class as ClassValue)
    })

    const thumbClasses = computed(() => {
      const baseClasses = [
        'inline-block bg-white rounded-full transition-transform duration-200 ease-in-out shadow-md',
      ]

      const sizeClasses = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      }

      baseClasses.push(sizeClasses[props.size as keyof typeof sizeClasses])

      if (isChecked.value) {
        const translateClasses = {
          sm: 'translate-x-5',
          md: 'translate-x-6',
          lg: 'translate-x-7',
        }
        baseClasses.push(translateClasses[props.size as keyof typeof translateClasses])
      } else {
        const translateClasses = {
          sm: 'translate-x-1',
          md: 'translate-x-1',
          lg: 'translate-x-1',
        }
        baseClasses.push(translateClasses[props.size as keyof typeof translateClasses])
      }

      return mergeClass(baseClasses)
    })

    const handleClick = () => {
      if (props.disabled || props.loading) return

      const newValue = isChecked.value ? props.uncheckedValue : props.checkedValue
      emit('update:value', newValue)
      emit('change', newValue)
    }

    return () => (
      <div
        class={switchClasses.value}
        onClick={handleClick}
        role="switch"
        aria-checked={isChecked.value}
        aria-disabled={props.disabled}
        {...attrs}
      >
        <div class={thumbClasses.value}>
          {props.loading && (
            <div class="flex items-center inset-0 justify-center absolute">
              <div class="border-b-2 border-white rounded-full h-2 w-2 animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    )
  },
})

export default XSwitch