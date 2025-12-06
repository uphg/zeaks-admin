import { defineComponent, computed, type ClassNameValue } from 'vue'
import { mergeClass } from '@/shared/lib'

const defaultClass = {
  wrap: 'bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden',
  header: 'px-6 py-4 border-b border-gray-200',
  title: 'text-lg font-semibold text-gray-900',
  content: 'px-6 py-4',
  footer: 'px-6 py-4 border-t border-gray-200',
}

interface CardProps {
  title?: string
  showHeader?: boolean
  showFooter?: boolean
  headerClass?: string
  contentClass?: string
  footerClass?: string
  hoverable?: boolean
  bordered?: boolean
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  size?: 'sm' | 'md' | 'lg'
}

const shadowMap = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
}

const sizeMap = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const XCard = defineComponent<CardProps>({
  name: 'XCard',
  props: {
    title: String,
    showHeader: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: false },
    headerClass: [String],
    contentClass: [String],
    footerClass: [String],
    hoverable: { type: Boolean, default: false },
    bordered: { type: Boolean, default: true },
    shadow: { type: String, default: 'sm' },
    size: { type: String, default: 'md' },
  },
  inheritAttrs: false,
  setup(props, { slots, attrs }) {
    const classNames = computed(() => {
      const baseClasses = [
        defaultClass.wrap,
        props.bordered ? 'border border-gray-200' : 'border-0',
        shadowMap[props.shadow as keyof typeof shadowMap] || shadowMap.sm,
        props.hoverable ? 'hover:shadow-md transition-shadow duration-200' : '',
      ]

      return mergeClass(baseClasses, attrs.class as ClassNameValue)
    })

    return () => (
      <div class={classNames.value} {...attrs}>
        {(slots.header || (props.title && props.showHeader)) && (
          <div class={mergeClass(defaultClass.header, props.headerClass)}>
            {slots.header
              ? slots.header()
              : (
                  <h3 class={defaultClass.title}>{props.title}</h3>
                )}
          </div>
        )}

        <div class={mergeClass(defaultClass.content, props.contentClass, sizeMap[props.size as keyof typeof sizeMap] || sizeMap.md)}>
          {slots.default?.()}
        </div>

        {slots.footer && props.showFooter && (
          <div class={mergeClass(defaultClass.footer, props.footerClass)}>
            {slots.footer()}
          </div>
        )}
      </div>
    )
  },
})

export default XCard