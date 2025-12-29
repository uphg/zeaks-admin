import { NButton, NIcon } from 'naive-ui'
import IconColumns from '~icons/lucide/columns'
import ColumnSelector from '@/features/table/column-selector'
import { computed, ref, type Ref } from 'vue'

export function useColumnSelector(rawColumns: Ref<any[]>) {
  const columns = computed(() => rawColumns.value.filter(item => checkedColumnKeys.value.includes(item.key)))
  const checkedColumnKeys = ref(rawColumns.value.map(item => item.key))

  return [() => (
    <ColumnSelector v-model:value={checkedColumnKeys.value} columns={rawColumns.value}>
      <NButton>
        <NIcon class="mr-1">
          <IconColumns />
        </NIcon>
        列设置
      </NButton>
    </ColumnSelector>
  ), { columns, checkedColumnKeys }] as const
}
