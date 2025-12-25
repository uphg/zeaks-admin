import { NDescriptions, NDescriptionsItem, NTree } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { apiGetMenus } from './menu-api'
import { createTreeMap, findNodeById, type TreeNode, type TreeMap } from '@/shared/lib/tree-index'

interface MenuMeta {
  title?: string
  icon?: string
}

interface MenuItem extends TreeNode {
  path: string
  component?: string
  name?: string
  meta?: MenuMeta
  mergeSingleChild?: boolean
}

const MenuPage = defineComponent(() => {
  const menuData = ref<MenuItem[]>([])
  const selectedMenu = ref<MenuItem | null>(null)
  const defaultExpandedKeys = ref<string[]>(['system', 'icon', 'about'])
  const selectedKeys = ref<string[]>([])
  let treeMap: TreeMap = new Map()

  loadMenus()

  return () => (
    <div class="p-6 flex gap-5 h-[var(--page-height)]">
      <div class="w-80">
         <NTree
          block-line
          data={menuData.value}
          v-model:selectedKeys={selectedKeys.value}
          onUpdate:selectedKeys={handleSelectedKeysChange}
          defaultExpandedKeys={defaultExpandedKeys.value}
          keyField="id"
          labelField="name"
          selectable
        />
      </div>
      <div class={['flex-1', selectedKeys.value.length ? 'block ' : 'hidden']}>
        <NDescriptions
          labelClass="w-20%"
          contentClass="w-30%"
          labelPlacement="left"
          bordered
          column={2}
        >
          <NDescriptionsItem label="名称">
            {selectedMenu.value?.meta?.title}
          </NDescriptionsItem>
          <NDescriptionsItem label="编码">
            {selectedMenu.value?.name}
          </NDescriptionsItem>
          <NDescriptionsItem label="路由地址">
            {selectedMenu.value?.path}
          </NDescriptionsItem>
          <NDescriptionsItem label="组件路径">
            {selectedMenu.value?.component}
          </NDescriptionsItem>
          <NDescriptionsItem label="菜单图标">
            {/* {selectedMenu.value.meta?.icon && selectedMenu.value.meta?.icon()} */}
          </NDescriptionsItem>
          <NDescriptionsItem label="布局">
            苹果
          </NDescriptionsItem>
          <NDescriptionsItem label="是否在侧栏显示">
            苹果
          </NDescriptionsItem>
          <NDescriptionsItem label="状态">
            苹果
          </NDescriptionsItem>
          <NDescriptionsItem label="页面缓存">
            苹果
          </NDescriptionsItem>
          <NDescriptionsItem label="排序">
            苹果
          </NDescriptionsItem>
        </NDescriptions>
      </div>
    </div>
  )

  async function loadMenus() {
    const res = await apiGetMenus()
    menuData.value = res as MenuItem[]
    treeMap = createTreeMap(menuData.value)
  }

  function handleSelectedKeysChange(keys: string[]) {
    const [key] = keys
    if (key) {
      selectedMenu.value = findNodeById(treeMap, key) as MenuItem | null
    } else {
      selectedMenu.value = null
    }
  }
})

export default MenuPage