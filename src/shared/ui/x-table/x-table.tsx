import { isArray, isNil, omit } from 'lodash-es'
import { mergeClass } from '@/shared/lib/merge-class'
import { dataTableProps, NDataTable, NPagination } from 'naive-ui'
import { computed, defineComponent, isRef, ref,  unref,  type Ref } from 'vue'
import { customProps, excludePropKeys, nTableDefaultProps, pagingWrapDefaultClass, type XTableStore } from './props'

const XTable = defineComponent({
  inheritAttrs: false,
  props: {
    ...dataTableProps,
    ...nTableDefaultProps,
    ...customProps,
  },
  setup(props, { attrs, slots }) {
    const nTableProps = computed(() => omit(props, excludePropKeys))
    if (!props.store) return
    // const columns = computed(() => unref(props.columns)) 
    const columns = computed(() => unref(props.store?.columns)) 
    Object.assign(props.store, {
      reload, resetPage, startLoading, stopLoading, getSelectedRows
    })
    console.log('columns')
    console.log(columns)

    const { data, page, pageSize, total, loading, checkedRowKeys } = props.store

    props.initDataSource && reload()
  
    async function reload() {
      onBeforeUpdateData()
      const res = await props.dataSource?.({ page: page.value, pageSize: pageSize.value }).catch((e) => {
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
  
    function resetPage() {
      page.value = 1
      pageSize.value = 10
    }
  
    function startLoading() {
      if (isNil(loading.value)) return
      loading.value = true
    }
  
    function stopLoading() {
      if (isNil(loading.value)) return
      loading.value = false
    }
  
    function onBeforeUpdateData() {
      props.hasLoading && startLoading()
    }
  
    function onAfterUpdateData() {
      props.hasLoading && stopLoading()
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
      return data.value?.filter((item) => {
        const key = props.rowKey!(item)
        return checkedRowKeys.value.includes(key)
      })
    }
    
    return () => (
      <div {...attrs} class={mergeClass('flex flex-col gap-3', attrs.class as string)}>
        <NDataTable {...nTableProps.value} class={props.tableClass} data={data.value} columns={columns.value} v-model:checkedRowKeys={checkedRowKeys.value} loading={loading.value}>
          {slots}
        </NDataTable>
        {props.pagination && (
          <div class={mergeClass(pagingWrapDefaultClass, props.pagingWrapClass)}>
            <NPagination {...props.pagination} item-count={total.value} page={page.value} pageSize={pageSize.value} onUpdate:page={onPageChange} onUpdate:pageSize={onPageSizeChange} />
          </div>
        )}
      </div>
    )
  },
})

export default XTable