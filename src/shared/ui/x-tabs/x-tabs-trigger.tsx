import { defineComponent, ref, computed, inject } from 'vue'
import type { ExtractPropTypes, Ref } from 'vue'

export const xTabsTriggerProps = {
  value: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const

export type XTabsTriggerProps = ExtractPropTypes<typeof xTabsTriggerProps>

export const XTabsTrigger = defineComponent({
  name: 'XTabsTrigger',
  props: xTabsTriggerProps,
  setup(props, { slots, attrs }) {
    const activeValue = inject<Ref<string>>('tabsActiveValue', ref(''))
    const setActiveValue = inject<(value: string) => void>('tabsSetActiveValue', () => {})

    const isActive = computed(() => activeValue.value === props.value)

    const handleClick = () => {
      if (!props.disabled) {
        setActiveValue(props.value)
      }
    }

    return () => (
      <button
        type="button"
        class={[
          'x-tabs-trigger',
          'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all',
          'ring-offset-[var(--background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          isActive.value
            ? 'bg-[var(--background)] text-[var(--foreground)] shadow-sm'
            : 'hover:bg-[var(--muted)]/50',
          attrs.class,
        ]}
        disabled={props.disabled}
        onClick={handleClick}
        data-state={isActive.value ? 'active' : 'inactive'}
        {...attrs}
      >
        {slots.default?.()}
      </button>
    )
  },
})