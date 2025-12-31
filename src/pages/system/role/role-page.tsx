import { useFilterForm } from '@/shared/hooks/use-filter-form'
import { useTable } from '@/shared/hooks/use-table/use-table'
import { defineComponent } from 'vue'

const RolePage = defineComponent(() => {
  const [FilterForm] = useFilterForm([
    { label: '角色名称', key: 'roleName' },
    { label: '角色状态', key: 'status' },
  ])
  const [RoleTable] = useTable([
    { title: '角色名称', key: 'name' },
    { title: '角色编码', key: 'name' },
    { title: '状态', key: 'name' },
  ])
  return () => (
    <div class="p-6">
      <div>
        <FilterForm />
      </div>
      <RoleTable />
    </div>
  )
})

export default RolePage