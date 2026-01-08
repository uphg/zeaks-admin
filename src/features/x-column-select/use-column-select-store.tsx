import { ref } from "vue"

export function useColumnSelectStore() {
  const store = {
    columns: null,
    checkedColumnKeys: ref([])
  }
  return store
}