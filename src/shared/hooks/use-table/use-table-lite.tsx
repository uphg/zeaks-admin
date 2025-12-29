import type { DataTableColumn } from 'naive-ui'
import type { ColumnKey, TableBaseColumn, TableColumnTitle } from 'naive-ui/es/data-table/src/interface'
import type { TableDefaultColumns, UseTableProps } from './types'
import { isFunction, omit } from 'lodash-es'
import { useTable } from './use-table'

type liteColumn = [
  TableColumnTitle,
  ColumnKey,
  (TableBaseColumn['render'] | Omit<DataTableColumn, 'title' | 'key'>)?,
]

export function useTableLite(liteColumns: liteColumn[], props?: Partial<UseTableProps>, slots?: { empty: () => any, loading: () => any }) {
  const columns = convertLiteColumnsToColumns(liteColumns)
  return useTable(columns, props, slots)
}

function convertLiteColumnsToColumns(liteColumns: liteColumn[]): TableDefaultColumns {
  return liteColumns.map(([title, key, _options]) => {
    const options = isFunction(_options) ? { render: _options } : omit(_options, 'title', 'key')
    return {
      title,
      key,
      ...(options),
    } as DataTableColumn
  })
}
