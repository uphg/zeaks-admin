import { computed, defineComponent, isRef, ref, type PropType, type Ref } from "vue";
import DropdownSelect from "../dropdown-select/dropdown-select";
import IconColumns from '~icons/lucide/columns'
import { NButton, NIcon } from "naive-ui";
import type { TableColumns } from "naive-ui/es/data-table/src/interface";

interface ColumnSelectStore {
  columns?: Ref<TableColumns<any>>
  checkedColumnKeys?: Ref<any[]>
  [key: string]: any
}

const columnSelectProps = {
  store: {
    type: Object as PropType<ColumnSelectStore>
  },
  text: {
    type: [String, Number],
    default: '列设置'
  },
  allColumns: {
    type: [Array, Object] as PropType<any[] | Ref<any[]>>,
    default: () => []
  },
}

const XColumnSelect = defineComponent({
  inheritAttrs: false,
  props: columnSelectProps,
  setup(props, { attrs }) {
    const allColumns = isRef(props.allColumns) ? props.allColumns : ref(props.allColumns)
    const checkedColumnKeys = ref(allColumns.value.map(item => item.key))
    const columns = computed(() => allColumns.value.filter(item => checkedColumnKeys.value.includes(item.key)))
    props.store && Object.assign(props.store, { columns, checkedColumnKeys })
    return () => (
      <DropdownSelect v-model:value={checkedColumnKeys.value} options={allColumns.value}>
        <NButton {...attrs}>
          <NIcon class="mr-1">
            <IconColumns />
          </NIcon>
          {props.text}
        </NButton>
      </DropdownSelect>
    )
  }
})

export default XColumnSelect