import { createStore } from "@/shared/lib/create-store"
import type { RowKey } from "naive-ui/es/data-table/src/interface"
import { ref } from "vue"
import type { XTableStore } from "./props"

export function useTableStore() {
  const data = ref<any[]>([])
  const page = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const sorter = ref('default')
  const loading = ref(false)
  const checkedRowKeys = ref<RowKey[]>([])
  const checkedColumnKeys = ref<string[]>([])
  const columns = ref([])
  return { data, page, pageSize, total, sorter, loading, checkedRowKeys, checkedColumnKeys, columns } as Partial<XTableStore>
}

export const useTableSharedStore = createStore(useTableStore)
