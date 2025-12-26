import { defineComponent, ref, type VNodeChild } from "vue"
import { iconMap } from "@/shared/lib/icon-map"
import { NSelect, type SelectOption } from "naive-ui"

const IconPicker = defineComponent({
  setup() {
    // 内置图标列表
    const icons = Object.entries(iconMap)
    const iconKey = ref(null)
    const options = icons.map(([key, icon]) => ({ label: icon, value: key })) as any

    function renderLabel(option: SelectOption): VNodeChild{
      return (
        <div class="flex gap-2 items-center">
          {option.label ? <option.label /> : null}
          <span>{option.value}</span>
        </div>
      )
    }
    return () => (
      <NSelect
        v-model:value={iconKey.value}
        options={options}
        renderLabel={renderLabel}
        filterable
        clearable
      />
    )
  }
})

export default IconPicker