import type { TableDefaultColumns, UseTableProps } from './types'
import { isArray, isNil, omit } from 'lodash-es'
import { NDataTable, NPagination } from 'naive-ui'
import { defineComponent, isRef, ref, type Ref } from 'vue'
import { mergeClass } from '@/shared/lib/merge-class'
import type { RowKey } from 'naive-ui/es/data-table/src/interface'

const pagingWrapDefaultClass = 'flex justify-end'

const defaultProps = {
  // 自定义 props
  initDataSource: true,
  hasLoading: true,
  defaultColumnProps: null,

  // table props
  striped: true,
  bordered: true,
  // loading: true,
  pagination: {
    pageSizes: [10, 20, 50, 100],
    showSizePicker: true,
  },

  rowKey: (item: any) => item.id,
}

const customPropsNames = ['pagination', 'dataSource', 'initDataSource', 'hasLoading', 'onBeforeUpdateData', 'onAfterUpdateData', 'pagingWrapClass', 'defaultColumnProps']

export function useTable(
  defaultColumns: TableDefaultColumns,
  props?: Partial<UseTableProps>,
  slots?: { empty: () => any, loading: () => any },
) {
  const rawProps = Object.assign({}, defaultProps, props) as Partial<UseTableProps>
  const nTableProps = omit(rawProps, customPropsNames)

  const data = ref<any[]>([])
  const page = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const sorter = ref()
  const loading = ref(false)
  const columns = isRef(defaultColumns) ? defaultColumns : ref(defaultColumns)
  const checkedRowKeys = ref<RowKey[]>([])

  rawProps.initDataSource && reload()

  async function reload() {
    onBeforeUpdateData()
    const res = await rawProps.dataSource?.({ page: page.value, pageSize: pageSize.value }).catch((e) => {
      onAfterUpdateData()
      return e
    })
    if (isNil(res) || !isArray(res.data)) {
      loading.value = false
      return
    }
    data.value = res?.data ?? []
    total.value = res.total
    onAfterUpdateData()
    return res
  }

  function startLoading() {
    loading.value = true
  }
  function stopLoading() {
    loading.value = false
  }

  function onBeforeUpdateData() {
    rawProps.hasLoading && startLoading()
  }

  function onAfterUpdateData() {
    rawProps.hasLoading && stopLoading()
  }

  function onPageChange(newPage: number) {
    page.value = newPage
    reload()
  }

  function onPageSizeChange(newPageSize: number) {
    pageSize.value = newPageSize
    reload()
  }

  function getSelectedRows() {
    return data.value.filter((item) => {
      const key = rawProps.rowKey!(item)
      return checkedRowKeys.value.includes(key)
    })
  }

  const Table = defineComponent({
    inheritAttrs: false,

    setup(_, { attrs }) {
      return () => (
        <div {...attrs} class={mergeClass('flex flex-col gap-3', attrs.class as string)}>
          <NDataTable {...nTableProps} class={rawProps.tableClass} data={data.value} columns={columns.value} v-model:checkedRowKeys={checkedRowKeys.value} loading={loading.value}>
            {slots}
          </NDataTable>
          {rawProps.pagination && (
            <div class={mergeClass(pagingWrapDefaultClass, rawProps.pagingWrapClass)}>
              <NPagination {...rawProps.pagination} item-count={total.value} page={page.value} pageSize={pageSize.value} onUpdate:page={onPageChange} onUpdate:pageSize={onPageSizeChange} />
            </div>
          )}
        </div>
      )
    },
  })

  return [Table, { data, columns, page, pageSize, sorter, reload, checkedRowKeys, getSelectedRows }] as const
}
