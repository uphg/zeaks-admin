import { useFilterForm } from '@/shared/hooks/use-filter-form'
import { useTable } from '@/shared/hooks/use-table/use-table'
import { defineComponent, ref } from 'vue'
import { useColumnSelector } from '@/shared/hooks/use-column-selector'
import XAction from '@/features/x-action/x-action'
import type { DataSourceOptions } from '@/shared/hooks/use-table/types'
import { apiGetUsers } from './user-api'
import { useTableStore } from '@/shared/ui/x-table/use-table-store'

const RolePage = defineComponent(() => {
  const tableStore = useTableStore()
  const filterFormStore = useFilterFormStore()
  const columnSelectorStore = useColumnSelectorStore()
  const allColumns = ref([
    { type: 'selection', key: 'select', title: '复选框', fixed: 'left', width: 50, },
    { title: '用户名', key: 'name' },
    { title: '用户性别', key: 'sex' },
    { title: '邮箱', key: 'email' },
    { title: '创建时间', key: 'created_at' },
    { title: '状态', key: 'status' },
  ])

  return () => (
    <div class="p-6 flex flex-col gap-4">
      <FilterForm
        fields={[
          { label: '用户名', key: 'name' },
          { label: '用户状态', key: 'status' },
        ]}
        store={filterFormStore}
        onSearch={onSearch}
        onReset={onReset}
      />
      <div class="flex">
        <XAction type="create" />
        <ColumnSelector store={columnSelectorStore} allColumns={allColumns} class="ml-auto" />
      </div>
      <Table columns={columnSelectorStore.value.columns.value} store={tableStore} options={{ dataSource }} />
    </div>
  )

  function onSearch() {
    tableStore.value.reload()
  }

  function onReset() {
    filterFormStore.value.resetForm()
    tableStore.value.resetPage() 
  }

  async function dataSource({ page,pageSize }: DataSourceOptions) {
    const res = await apiGetUsers({ page, pageSize })
    return { data: res.items, total: res.total }
  }
})

export default RolePage