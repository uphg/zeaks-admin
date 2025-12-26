import { NButton, NDescriptions, NDescriptionsItem, NTree } from 'naive-ui'
import { defineComponent, ref, withModifiers, type FunctionalComponent } from 'vue'
import { createTreeMap, findNodeById, type TreeNode, type TreeMap } from '@/shared/lib/tree-index'
import type { TreeRenderProps } from 'naive-ui/es/tree/src/interface'
import { iconMap } from '@/shared/lib/icon-map'
import ComponentPathPicker from './ui/component-path-picker'
import { apiGetMenus } from './menu-api'

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
          renderLabel={renderLabel}
          renderSuffix={renderSuffix}
          keyField="id"
          labelField="title"
          selectable
        />
      </div>
      <div class={['flex-1']}>
        {selectedMenu.value ? (
          <NDescriptions
            labelClass="w-20%"
            contentClass="w-30%"
            labelPlacement="left"
            bordered
            column={2}
          >
            <NDescriptionsItem label="名称">
              {selectedMenu.value.title}
            </NDescriptionsItem>
            <NDescriptionsItem label="菜单图标">
              {/* {selectedMenu.value.meta?.icon && selectedMenu.value.meta?.icon()} */}
            </NDescriptionsItem>
            <NDescriptionsItem label="路由地址" span={2}>
              {selectedMenu.value.path}
            </NDescriptionsItem>
            <NDescriptionsItem label="组件路径" span={2}>
              <ComponentPathPicker v-model:value={selectedMenu.value.component} />
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
            <NDescriptionsItem label="排序">
              苹果
            </NDescriptionsItem>
          </NDescriptions>
        ) : null}
      </div>
    </div>
  )

  async function loadMenus() {
    const res = await apiGetMenus()
    menuData.value = res as MenuItem[]
    console.log('menuData.value')
    console.log(menuData.value)
    treeMap = createTreeMap(menuData.value)
  }

  function handleSelectedKeysChange(keys: string[]) {
    const [key] = keys
    if (key) {
      selectedMenu.value = findNodeById(treeMap, key) as MenuItem | null
      console.log('selectedMenu.value')
      console.log(selectedMenu.value)
    } else {
      selectedMenu.value = null
    }
  }

  function renderLabel({ option }: TreeRenderProps & { icon: FunctionalComponent }) {
    const Icon = iconMap[option.icon]
    return (
      <div class="flex items-center gap-1.5">
        <Icon />
        <span>{option.title}</span>
      </div>
    )
  }

  function renderSuffix() {
    return (
      <div class="flex gap-2">
        <NButton type="primary" text onClick={withModifiers(onClickStop, ['stop'])}>新增</NButton>
        <NButton type="primary" text onClick={withModifiers(onClickStop, ['stop'])}>编辑</NButton>
      </div>
    )
  }

  function onClickStop() {}
})

export default MenuPage