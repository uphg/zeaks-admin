import { useFilterForm } from '@/shared/hooks/use-filter-form'
import { useTable } from '@/shared/hooks/use-table/use-table'
import { iconMap } from '@/shared/lib/icon-map'
import { defineComponent, ref } from 'vue'
import { useColumnSelector } from '@/shared/hooks/use-column-selector'
import XAction from '@/features/x-action/x-action'
import { apiGetRoles } from './role-api'
import type { DataSourceOptions } from '@/shared/hooks/use-table/types'

const RolePage = defineComponent(() => {
  const [FilterForm] = useFilterForm([
    { label: '角色名称', key: 'name' },
    { label: '角色状态', key: 'status' },
    { contentClass: 'flex gap-3 justify-end', children: [
      { as: 'button', text: '搜索', type: 'primary', icon: iconMap['search'] },
      { as: 'button', text: '重置', icon: iconMap['rotate-cw'] },
    ] }
  ])
  const allColumns = ref([
    { type: 'selection', key: 'select', title: '复选框', fixed: 'left', width: 50, },
    { title: '角色名称', key: 'name' },
    { title: '角色权限', key: 'permissions' },
    { title: '创建时间', key: 'created_at' },
    { title: '状态', key: 'status' },
  ])
  const [ColumnSelector, { columns }] = useColumnSelector(allColumns)
  const [RoleTable] = useTable(columns, { dataSource })

  return () => (
    <div class="p-6 flex flex-col gap-4">
      <FilterForm />
      <div class="flex">
        <XAction type="create" />
        <ColumnSelector class="ml-auto" />
      </div>
      <RoleTable />
    </div>
  )

  async function dataSource({ page,pageSize }: DataSourceOptions) {
    const res = await apiGetRoles({ page, pageSize })
    return { data: res.items, total: res.total }
  }
})

export default RolePage