import type { CheckboxInst } from 'naive-ui'
import type { ComponentPublicInstance, PropType } from 'vue'
import { defineComponent, shallowRef, withModifiers } from 'vue'
import { NCheckbox } from 'naive-ui'
import type { OnUpdateChecked } from 'naive-ui/es/checkbox/src/interface'
import type { MaybeArray } from 'naive-ui/es/_utils'

const SelectorButton = defineComponent({
  name: 'SelectorButton',
  props: {
    value: {
      type: [String, Number]
    },
    checked: Boolean,
    indeterminate: Boolean,
    onUpdateChecked: [Array, Function] as PropType<MaybeArray<OnUpdateChecked>>
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
          checked={props.checked}
          indeterminate={props.indeterminate}
          onUpdateChecked={props.onUpdateChecked}
          // @ts-expect-error NCheckbox doesn't declare onClick in types but it works at runtime
          onClick={withModifiers(() => {}, ['stop']) as any}
        >{slots.default?.()}
        </NCheckbox>
      </div>
    )
  },
})

export default SelectorButton
