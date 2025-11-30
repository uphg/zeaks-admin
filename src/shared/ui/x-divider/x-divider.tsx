import { defineComponent, computed, type PropType } from 'vue'
import type { ClassValue } from 'clsx'
import { mergeClass } from '@/shared/lib'

interface DividerProps {
  direction?: 'horizontal' | 'vertical'
  dashed?: boolean
  margin?: string
  color?: string
  align?: 'left' | 'center' | 'right'
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

const XDivider = defineComponent<DividerProps>({
  name: 'XDivider',
  props: {
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
    },
    dashed: {
      type: Boolean,
      default: false,
    },
    margin: {
      type: String,
      default: undefined,
    },
    color: {
      type: String,
      default: undefined,
    },
    align: {
      type: String as PropType<'left' | 'center' | 'right'>,
      default: 'center',
    },
    text: {
      type: String,
      default: undefined,
    },
    size: {
      type: String as PropType<'sm' | 'md' | 'lg'>,
      default: 'md',
    },
  },
  inheritAttrs: false,
  setup(props, { slots, attrs }) {
    const dividerClasses = computed(() => {
      const baseClasses = [
        props.direction === 'horizontal'
          ? 'w-full border-t'
          : 'h-full border-l',
        props.dashed ? 'border-dashed' : 'border-solid',
      ]

      if (props.direction === 'horizontal') {
        const sizeClasses = {
          sm: 'border-t',
          md: 'border-t-2',
          lg: 'border-t-4',
        }
        baseClasses.push(sizeClasses[props.size as keyof typeof sizeClasses] || sizeClasses.md)
      } else {
        const sizeClasses = {
          sm: 'border-l',
          md: 'border-l-2',
          lg: 'border-l-4',
        }
        baseClasses.push(sizeClasses[props.size as keyof typeof sizeClasses] || sizeClasses.md)
      }

      const marginClasses = props.margin
        ? props.margin
        : props.direction === 'horizontal'
          ? 'my-4'
          : 'mx-4'

      baseClasses.push(marginClasses)

      if (props.color) {
        baseClasses.push(`border-[${props.color}]`)
      } else {
        baseClasses.push('border-gray-300')
      }

      return mergeClass(baseClasses, attrs.class as ClassValue)
    })

    const textClasses = computed(() => {
      const baseClasses = [
        'px-3 bg-white text-gray-600 text-sm font-medium',
      ]

      const alignClasses = {
        left: 'mr-auto',
        center: 'mx-auto',
        right: 'ml-auto',
      }

      baseClasses.push(alignClasses[props.align as keyof typeof alignClasses])

      return mergeClass(baseClasses)
    })

    const wrapperClasses = computed(() => {
      return props.direction === 'horizontal'
        ? 'relative flex items-center'
        : 'relative flex items-center'
    })

    return () => {
      if (props.direction === 'horizontal') {
        return (
          <div class={wrapperClasses.value} {...attrs}>
            <div class={dividerClasses.value} />
            {(props.text || slots.default) && (
              <div class={textClasses.value}>
                {slots.default?.() || props.text}
              </div>
            )}
          </div>
        )
      }

      return (
        <div class={wrapperClasses.value} {...attrs}>
          <div class={dividerClasses.value} />
          {(props.text || slots.default) && (
            <div class="flex items-center inset-0 justify-center absolute">
              <div class="text-xs text-gray-500 px-2 bg-white">
                {slots.default?.() || props.text}
              </div>
            </div>
          )}
        </div>
      )
    }
  },
})

export default XDivider