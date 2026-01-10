import { computed, isRef, ref } from "vue"

export function useColumnSelectState(props) {
  const rawColumns = isRef(props.rawColumns) ? props.rawColumns : ref(props.rawColumns)
  const checkedColumnKeys = ref(rawColumns.value.map(item => item.key))
  const columns = computed(() => rawColumns.value.filter(item => checkedColumnKeys.value.includes(item.key)))
  return { columns, checkedColumnKeys }
}