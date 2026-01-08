import type { ClassValue } from 'clsx'
import type { DataTableColumn, DataTableProps, TableProps } from 'naive-ui'
import { dataTableProps } from 'naive-ui'
import { type PropType, type Ref } from 'vue'

export type DataSourceOptions = { page: number, pageSize: number }
export interface UseTableProps extends DataTableProps {
  dataSource: (options: DataSourceOptions) => Promise<any>
  initDataSource: boolean
  hasLoading: boolean
  tableClass: ClassValue
  pagingWrapClass: ClassValue
  onBeforeUpdateData: () => void
  onAfterUpdateData: () => void
  defaultColumnProps: Partial<DataTableColumn>
}

export type TableDefaultColumns = Array<Partial<DataTableColumn>>

export interface XTableStore {
  data: Ref<DataTableProps['data']>
  page: Ref<number>
  pageSize: Ref<number>
  total: Ref<number>
  loading: Ref<boolean>
  sorter: Ref<boolean | 'default'> | Function
  checkedRowKeys: Ref<(string | number)[]>
  checkedColumnKeys: Ref<(string | number)[]>
  columns: Ref<DataTableProps['columns']> | null
}

export const pagingWrapDefaultClass = 'flex justify-end'

export const customProps = {
  store: {
    type: Object as PropType<XTableStore>,
  },
  columns: {
    type: [Object, Array] as PropType<DataTableProps['columns'] | Ref<DataTableProps['columns']>>,
    default: dataTableProps.columns.default
  },
  initDataSource: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  hasLoading: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  defaultColumnProps: Object as PropType<Partial<DataTableColumn>>,
  dataSource: Function as PropType<(options: DataSourceOptions) => Promise<any>>,
  tableClass: {
    type: [String, Array] as PropType<ClassValue>
  },
  pagingWrapClass: {
    type: [String, Array] as PropType<ClassValue>
  },
  onBeforeUpdateData: {
    type: Function as PropType<() => void>
  },
  onAfterUpdateData: {
    type: Function as PropType<() => void>
  }
}

export const nTableDefaultProps = {
  striped: {
    type: Boolean,
    default: true
  },
  bordered: {
    type: Boolean,
    default: true
  },
  // loading: true,
  pagination: {
    type: dataTableProps.pagination.type,
    default: () => ({
      pageSizes: [10, 20, 50, 100],
      showSizePicker: true,
    })
  },
  rowKey: {
    type: dataTableProps.rowKey,
    default: (item: any) => item.id
  },
}

export const excludePropKeys = Object.keys(customProps).concat(['pagination'])