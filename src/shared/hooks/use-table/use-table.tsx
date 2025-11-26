import type { DataTableColumns, DataTableProps, PaginationProps } from 'naive-ui'
import { NDataTable, NPagination } from 'naive-ui'
import { defineComponent, ref, reactive } from 'vue'

export interface UseTableProps {
  columns: DataTableColumns
  dataSource?: (params: { page: number, pageSize: number }) => Promise<{ data: any[], total: number }>
  pagination?: PaginationProps
  loading?: boolean
  initDataSource?: boolean
  hasLoading?: boolean
  tableClass?: string
  pagingWrapClass?: string
}

export function useTable(props: UseTableProps) {
  const data = ref<any[]>([])
  const loading = ref(false)
  const page = ref(1)
  const pageSize = ref(props.pagination?.pageSize || 10)
  const total = ref(0)
  const checkedRowKeys = ref<string[]>([])

  const defaultPagination: PaginationProps = {
    page: page.value,
    pageSize: pageSize.value,
    itemCount: total.value,
    pageSizes: [10, 20, 50, 100],
    showSizePicker: true,
    showQuickJumper: true,
    ...props.pagination,
  }

  const reload = async () => {
    if (!props.dataSource) return

    loading.value = props.hasLoading !== false

    try {
      const res = await props.dataSource({
        page: page.value,
        pageSize: pageSize.value,
      })

      if (res && Array.isArray(res.data)) {
        data.value = res.data
        total.value = res.total || 0
      }
    } catch (error) {
      console.error('Failed to load table data:', error)
    } finally {
      loading.value = false
    }
  }

  const handlePageChange = (newPage: number) => {
    page.value = newPage
    reload()
  }

  const handlePageSizeChange = (newPageSize: number) => {
    pageSize.value = newPageSize
    page.value = 1
    reload()
  }

  const Table = defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      return () => (
        <div {...attrs} class={`flex flex-col gap-3 ${attrs.class || ''}`}>
          <NDataTable
            {...props}
            columns={props.columns}
            data={data.value}
            loading={loading.value}
            v-model:checked-row-keys={checkedRowKeys.value}
            class={props.tableClass}
          >
            {slots}
          </NDataTable>
          <div class={`flex justify-end ${props.pagingWrapClass || ''}`}>
            <NPagination
              {...defaultPagination}
              item-count={total.value}
              page={page.value}
              page-size={pageSize.value}
              onUpdate:page={handlePageChange}
              onUpdate:pageSize={handlePageSizeChange}
            />
          </div>
        </div>
      )
    },
  })

  // 初始化数据
  if (props.initDataSource !== false) {
    reload()
  }

  return {
    Table,
    data,
    loading,
    page,
    pageSize,
    total,
    checkedRowKeys,
    reload,
  }
}