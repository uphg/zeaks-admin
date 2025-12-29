import type { ClassValue } from 'clsx'
import type { DataTableColumn, DataTableProps } from 'naive-ui'

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

export type TableDefaultColumns = Array<DataTableColumn>
