import { defineComponent, ref, provide, readonly, watch } from 'vue'
import type { ExtractPropTypes } from 'vue'

export const xTabsProps = {
  defaultValue: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: undefined,
  },
} as const

export type XTabsProps = ExtractPropTypes<typeof xTabsProps>

export const XTabs = defineComponent({
  name: 'XTabs',
  props: xTabsProps,
  emits: ['update:value'],
  setup(props, { slots, emit }) {
    const activeValue = ref(props.value ?? props.defaultValue)

    // Watch for controlled value changes
    watch(() => props.value, (newValue) => {
      if (newValue !== undefined) {
        activeValue.value = newValue
      }
    })

    const setActiveValue = (value: string) => {
      if (props.value === undefined) {
        // Uncontrolled mode: update internal state
        activeValue.value = value
      } else {
        // Controlled mode: emit event for v-model
        emit('update:value', value)
      }
    }

    provide('tabsActiveValue', readonly(activeValue))
    provide('tabsSetActiveValue', setActiveValue)

    return () => (
      <div class="x-tabs">
        {slots.default?.()}
      </div>
    )
  },
})