import { useFilterForm } from '@/shared/hooks/use-filter-form'
import { useTable } from '@/shared/hooks/use-table/use-table'
import { iconMap } from '@/shared/lib/icon-map'
import { defineComponent, ref } from 'vue'
import { useColumnSelector } from '@/shared/hooks/use-column-selector'
import XAction from '@/features/x-action/x-action'
import type { DataSourceOptions } from '@/shared/hooks/use-table/types'
import { apiGetUsers } from './user-api'

const RolePage = defineComponent(() => {
  const [FilterForm] = useFilterForm([
    { label: '用户名', key: 'name' },
    { label: '用户状态', key: 'status' },
    { contentClass: 'flex gap-3 justify-end', children: [
      { as: 'button', text: '搜索', type: 'primary', icon: iconMap['search'] },
      { as: 'button', text: '重置', icon: iconMap['rotate-cw'] },
    ] }
  ])
  const allColumns = ref([
    { type: 'selection', key: 'select', title: '复选框', fixed: 'left', width: 50, },
    { title: '用户名', key: 'name' },
    { title: '用户性别', key: 'sex' },
    { title: '邮箱', key: 'email' },
    { title: '创建时间', key: 'created_at' },
    { title: '状态', key: 'status' },
  ])
  const [ColumnSelector, { columns }] = useColumnSelector(allColumns)
  const [UserTable] = useTable(columns, { dataSource })

  return () => (
    <div class="p-6 flex flex-col gap-4">
      <FilterForm />
      <div class="flex">
        <XAction type="create" />
        <ColumnSelector class="ml-auto" />
      </div>
      <UserTable />
    </div>
  )

  async function dataSource({ page,pageSize }: DataSourceOptions) {
    const res = await apiGetUsers({ page, pageSize })
    return { data: res.items, total: res.total }
  }
})

export default RolePage