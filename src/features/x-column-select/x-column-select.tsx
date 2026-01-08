import { computed, defineComponent, isRef, ref, type PropType, type Ref } from "vue";
import ColumnSelector from "../table/ui/column-selector";
import IconColumns from '~icons/lucide/columns'
import { NButton, NIcon } from "naive-ui";
import type { TableColumns } from "naive-ui/es/data-table/src/interface";

interface ColumnSelectStore {
  columns?: Ref<TableColumns<any>>
  checkedColumnKeys?: Ref<any[]>
  [key: string]: any
}

const XColumnSelect = defineComponent({
  inheritAttrs: false,
  props: {
    store: {
      type: Object as PropType<ColumnSelectStore>
    },
    text: {
      type: [String, Number],
      default: '列设置'
    },
    rawColumns: {
      type: [Array, Object] as PropType<any[] | Ref<any[]>>,
      default: () => []
    },
  },
  setup(props, { attrs }) {
    const rawColumns = isRef(props.rawColumns) ? props.rawColumns : ref(props.rawColumns)
    const checkedColumnKeys = ref(rawColumns.value.map(item => item.key))
    const columns = computed(() => rawColumns.value.filter(item => checkedColumnKeys.value.includes(item.key)))
    props.store && Object.assign(props.store, { columns, checkedColumnKeys })
    return () => (
      <ColumnSelector v-model:value={checkedColumnKeys.value} columns={rawColumns.value}>
        <NButton {...attrs}>
          <NIcon class="mr-1">
            <IconColumns />
          </NIcon>
          {props.text}
        </NButton>
      </ColumnSelector>
    )
  }
})

export default XColumnSelect