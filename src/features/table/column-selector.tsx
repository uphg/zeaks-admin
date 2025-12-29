import { NCheckbox, NCheckboxGroup, NPopover } from 'naive-ui'
import { computed, defineComponent, type PropType } from 'vue'
import ColumnSelectorButton from './column-selector-button'

interface ColumnSelectorItem {
  title: string
  key: string | number
  [key: string]: any
}

const ColumnSelector = defineComponent({
  name: 'ColumnSelector',
  props: {
    value: {
      type: Array as PropType<string[]>,
    },
    columns: {
      type: Array as PropType<ColumnSelectorItem[]>,
      default: () => [],
    },
  },
  emits: ['update:value'],
  setup(props, { emit, slots }) {
    const isAllColumnsSelected = computed(() => props.value?.length === props.columns.length)
    const isIndeterminate = computed(() => !!(props.value?.length && props.value.length > 0 && props.value.length < props.columns.length))

    function handleColumnToggle(value: Array<string | number>) {
      emit('update:value', value)
    }

    function handleSelectAllColumns(checked: boolean) {
      if (checked) {
        const selectAllColumns = props.columns.map(col => col.key)
        emit('update:value', selectAllColumns)
      } else {
        emit('update:value', [])
      }
    }

    return () => (
      <NPopover trigger="click" placement="bottom-end" showArrow={false} raw>
        {{
          trigger: slots?.default,
          default: () => (
            <div class="rounded bg-white">
              <div>
                <div class="px-1 pt-1 flex flex-col">
                  <div class="px-3 rounded-3px flex h-8.5 cursor-pointer transition-colors items-center hover:bg-gray-100">
                    <NCheckbox
                      checked={isAllColumnsSelected.value}
                      indeterminate={isIndeterminate.value}
                      onUpdateChecked={handleSelectAllColumns}
                    >
                      全选
                    </NCheckbox>
                  </div>
                </div>
                <div class="my-1 bg-gray-100 h-1px"></div>
                <NCheckboxGroup
                  v-model:value={props.value}
                  onUpdate:value={handleColumnToggle}
                >
                  <div class="px-1 pb-1 flex flex-col">
                    {props.columns?.length
                      ? props.columns.map(col => (
                          <ColumnSelectorButton value={col.key} key={col.key}>{col.title}</ColumnSelectorButton>
                        ))
                      : null}
                  </div>
                </NCheckboxGroup>
              </div>
            </div>
          ),
        }}
      </NPopover>
    )
  },
})

export default ColumnSelector
