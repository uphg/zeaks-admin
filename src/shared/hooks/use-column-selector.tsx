import { NButton, NIcon } from 'naive-ui'
import IconColumns from '~icons/lucide/columns'
import ColumnSelector from '@/features/dropdown-select/dropdown-select'
import { computed, defineComponent, ref, type Ref } from 'vue'

export function useColumnSelector(allColumns: Ref<any[]>) {
  const columns = computed(() => allColumns.value.filter(item => checkedColumnKeys.value.includes(item.key)))
  const checkedColumnKeys = ref(allColumns.value.map(item => item.key))

  const Selector = defineComponent({
    inheritAttrs: false,
    setup(_, { attrs }) {
      return () => (
        <ColumnSelector v-model:value={checkedColumnKeys.value} options={allColumns.value}>
          <NButton {...attrs}>
            <NIcon class="mr-1">
              <IconColumns />
            </NIcon>
            列设置
          </NButton>
        </ColumnSelector>
      )
    }
  })

  return [Selector, { columns, checkedColumnKeys }] as const
}
