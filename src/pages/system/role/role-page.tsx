import { useFilterForm } from '@/shared/hooks/use-filter-form'
import { useTable } from '@/shared/hooks/use-table/use-table'
import { iconMap } from '@/shared/lib/icon-map'
import { defineComponent, ref } from 'vue'
import { useColumnSelector } from '@/shared/hooks/use-column-selector'
import { NButton } from 'naive-ui'

const RolePage = defineComponent(() => {
  const [FilterForm] = useFilterForm([
    { label: '角色名称', key: 'roleName' },
    { label: '角色状态', key: 'status' },
    { contentClass: 'flex gap-3 justify-end', children: [
      { as: 'button', text: '搜索', type: 'primary', icon: iconMap['search'] },
      { as: 'button', text: '重置', icon: iconMap['rotate-cw'] },
    ] }
  ])
  const allColumns = ref([
    { type: 'selection', key: 'select', title: '复选框', fixed: 'left', width: 50, },
    { title: '角色名称', key: 'name' },
    { title: '角色编码', key: 'code' },
    { title: '状态', key: 'status' },
  ])
  const [ColumnSelector, { columns }] = useColumnSelector(allColumns)
  const [RoleTable] = useTable(columns)

  return () => (
    <div class="p-6 flex flex-col gap-4">
      <FilterForm />
      <div class="flex">
        <NButton>新增</NButton>
        <ColumnSelector class="ml-auto" />
      </div>
      <RoleTable />
    </div>
  )
})

export default RolePage