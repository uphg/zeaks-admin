import { defineComponent, ref, computed, inject, type PropType } from '@/shared/ui/vue-imports'
import type { ExtractPropTypes, Ref } from 'vue'

export const xTabsContentProps = {
  value: {
    type: String,
    required: true,
  },
} as const

export type XTabsContentProps = ExtractPropTypes<typeof xTabsContentProps>

export const XTabsContent = defineComponent({
  name: 'XTabsContent',
  props: xTabsContentProps,
  setup(props, { slots, attrs }) {
    const activeValue = inject<Ref<string>>('tabsActiveValue', ref(''))

    const isActive = computed(() => activeValue.value === props.value)

    return () => (
      <div
        v-show={isActive.value}
        class={[
          'x-tabs-content',
          'mt-2 ring-offset-[var(--background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
          attrs.class,
        ]}
        data-state={isActive.value ? 'active' : 'inactive'}
        {...attrs}
      >
        {isActive.value && slots.default?.()}
      </div>
    )
  },
})