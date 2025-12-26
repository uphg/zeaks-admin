import { defineComponent, type PropType } from "vue"
import { pageComponentMap } from "@/shared/config"
import { NSelect } from "naive-ui"

const pathOptions = transformPathsToOptions(pageComponentMap)

const ComponentPathPicker = defineComponent({
  props: {
    value: String as PropType<string>
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    return () => (
      <NSelect
        value={props.value}
        onUpdate:value={onUpdateValue}
        options={pathOptions}
        filterable
        clearable
      >
      </NSelect>
    )

    function onUpdateValue(value: string) {
      emit('update:value', value)
    }
  }
})

function transformPathsToOptions(pageComponentMap: Record<string, () => Promise<unknown>>) {
  return Object.entries(pageComponentMap).map(([key]) => ({
    label: key.replace(/^\//, ''),
    value: key.replace(/^\/src\/pages\//, '')
  }))
}

export default ComponentPathPicker