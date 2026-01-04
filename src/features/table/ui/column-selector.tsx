import { NCheckbox, NCheckboxGroup, NPopover } from 'naive-ui'
import { computed, defineComponent, type PropType } from 'vue'
import ColumnSelectorButton from './column-selector-button'

interface ColumnSelectorItem {
  title?: string
  key?: string | number
  [key: string]: any
}

const ColumnSelector = defineComponent({
  name: 'ColumnSelector',
  inheritAttrs: false,
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
  setup(props, { emit, slots, attrs }) {
    const keyedColumns = computed(() => {
      let count = 0
      return props.columns.map(item => ({...item, ...(item.key ? {} : { key: `col_${++count}` })}))
    })
    const isAllColumnsSelected = computed(() => props.value?.length === keyedColumns.value.length)
    const isIndeterminate = computed(() => !!(props.value?.length && props.value.length > 0 && props.value.length < keyedColumns.value.length))

    function handleColumnToggle(value: Array<string | number>) {
      emit('update:value', value)
    }

    function handleSelectAllColumns(checked: boolean) {
      if (checked) {
        const selectAllColumns = keyedColumns.value.map(col => col.key)
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
                  {/* <div class="px-3 rounded-3px flex h-8.5 cursor-pointer transition-colors items-center hover:bg-gray-100">
                    <NCheckbox
                      checked={isAllColumnsSelected.value}
                      indeterminate={isIndeterminate.value}
                      onUpdateChecked={handleSelectAllColumns}
                    >
                      全选
                    </NCheckbox>
                  </div> */}
                  <ColumnSelectorButton
                    checked={isAllColumnsSelected.value}
                    indeterminate={isIndeterminate.value}
                    onUpdateChecked={handleSelectAllColumns}
                  >
                    全选
                  </ColumnSelectorButton>
                </div>
                <div class="my-1 bg-gray-100 h-1px"></div>
                <NCheckboxGroup
                  v-model:value={props.value}
                  onUpdate:value={handleColumnToggle}
                >
                  <div class="px-1 pb-1 flex flex-col">
                    {keyedColumns.value?.length
                      ? keyedColumns.value.map(col => (
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
