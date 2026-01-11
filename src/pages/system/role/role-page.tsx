import { useFilterForm } from '@/shared/hooks/use-filter-form'
import { defineComponent, ref } from 'vue'
import XAction from '@/features/x-action/x-action'
import { apiGetRoles } from './role-api'
import type { DataSourceOptions } from '@/shared/hooks/use-table/types'
import XStateSwitch from '@/features/x-state-switch/x-state-switch'
import XTable from '@/shared/ui/x-table/x-table'
import { useTableStore } from '@/shared/ui/x-table/use-table-store'
import XColumnSelect from '@/features/x-column-select/x-column-select'

const RolePage = defineComponent(() => {
  const tableStore = useTableStore()
  const [FilterForm, { form }] = useFilterForm([
    { label: '角色名称', key: 'name' },
    { label: '角色状态', key: 'status' }
  ], { onSearch, onReset })
  const allColumns = ref([
    { type: 'selection', key: 'select', title: '复选框', fixed: 'left', width: 50, },
    { title: '角色名称', key: 'name' },
    { title: '角色权限', key: 'permissions', render: (row) => <span>{row.permissions}</span> },
    { title: '创建时间', key: 'created_at' },
    { title: '状态', key: 'status', render: (row) => <XStateSwitch value={row.status} checked={[1, '启用']} unchecked={[0, '禁用']} /> },
  ])
  
  return () => (
    <div class="p-6 flex flex-col gap-4">
      <FilterForm />
      <div class="flex">
        <XAction type="create" />
        <XColumnSelect class="ml-auto" store={tableStore} allColumns={allColumns}  />
      </div>
      <XTable store={tableStore} dataSource={dataSource} />
    </div>
  )

  function onSearch() {
    tableStore.reload?.()
  }

  function onReset() {
    tableStore.reload?.()
  }

  async function dataSource(tableParams: DataSourceOptions) {
    const params = { ...tableParams, ...form!.value }
    const res = await apiGetRoles(params)
    return { data: res.items, total: res.total }
  }
})

export default RolePage