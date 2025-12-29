import type { CheckboxInst } from 'naive-ui'
import type { ComponentPublicInstance } from 'vue'
import { defineComponent, shallowRef, withModifiers } from 'vue'
import { NCheckbox } from 'naive-ui'

const ColumnSelectorButton = defineComponent({
  name: 'ColumnSelectorButton',
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props, { slots }) {
    const checkboxRef = shallowRef<ComponentPublicInstance & CheckboxInst | null>(null)
    function handleClick() {
      if (!checkboxRef.value) return
      checkboxRef.value.$el.click()
      checkboxRef.value.focus()
    }
    return () => (
      <div
        class="px-3 rounded-3px flex h-8.5 cursor-pointer transition-colors items-center hover:bg-gray-100"
        onClick={handleClick}
      >
        <NCheckbox
          ref={checkboxRef}
          value={props.value}
          // @ts-expect-error NCheckbox doesn't declare onClick in types but it works at runtime
          onClick={withModifiers(() => {}, ['stop']) as any}
        >{slots.default?.()}
        </NCheckbox>
      </div>
    )
  },
})

export default ColumnSelectorButton
