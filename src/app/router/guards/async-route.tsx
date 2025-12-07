import type { JSX } from 'vue/jsx-runtime'
import type { LayoutType } from '@/shared/ui/layouts/layouts'
import { h, type Component } from 'vue'
import { layouts } from '@/shared/ui/layouts/layouts'
import { NIcon } from 'naive-ui'
import { cloneJSON } from '@/shared/lib/clone-json'
import IconArrowUpRight from '~icons/lucide/arrow-up-right'
import IconAudioWaveform from '~icons/lucide/audio-waveform'
import IconGlobe from '~icons/lucide/globe'
import IconLayoutList from '~icons/lucide/layout-list'
import IconLink from '~icons/lucide/link'
import IconSettings from '~icons/lucide/settings'
import IconShell from '~icons/lucide/shell'
import IconTable from '~icons/lucide/table'
import IconUser from '~icons/lucide/user'
import IconUserCog from '~icons/lucide/user-cog'
import IconUserSearch from '~icons/lucide/user-search'


const pagesModule = import.meta.glob('@/pages/**/*-page.tsx')

const iconsMap = createIconsMap({
  'user-search': IconUserSearch,
  'audio-waveform': IconAudioWaveform,
  'arrow-up-right': IconArrowUpRight,
  'settings': IconSettings,
  'user': IconUser,
  'user-cog': IconUserCog,
  'layout-list': IconLayoutList,
  'globe': IconGlobe,
  'link': IconLink,
  'shell': IconShell,
  'table': IconTable,
})

/**
 * 创建异步路由
 * @param data 路由数据
 * @returns 异步路由数据
 */
export function createAsyncRoutes(data: any[]) {
  const routes = cloneJSON(data)
  if (!routes) return
  return baseCreateRoutes(routes)
}

function baseCreateRoutes(routes: any[], paths: any[] = []) {
  const result: any[] = []
  for (const route of routes) {
    const { component, children, path, name, ...rest } = route
    const newComponent = getComponent(component)
    const newPaths = [...paths, path]
    const item: any = {
      component: newComponent,
      path,
      name: name ?? convertToPascalCase(newPaths),
      ...rest,
    }
    if (children) {
      item.children = baseCreateRoutes(children, newPaths)
    }
    result.push(item)
  }
  return result
}

/**
 * 创建侧边栏菜单
 * @param data 路由数据
 * @returns 侧边栏菜单数据
 */
/**
 * 处理路由数据用于菜单创建
 * @param routes 路由数据
 * @returns 处理后的路由数据
 */
function processRoutesForMenu(routes: any[]): any[] {
  return routes.map((route) => {
    const processedRoute = { ...route }

    // 处理组件标识
    if (typeof route.component === 'string') {
      processedRoute.component = getComponent(route.component)
    }

    // 递归处理子路由
    if (route.children) {
      processedRoute.children = processRoutesForMenu(route.children)
    }

    return processedRoute
  })
}

export function createSidebarMenus(data: any[]) {
  const routes = cloneJSON(data)
  if (!routes) return
  // 处理路由数据，将字符串组件标识转换为组件函数
  const processedRoutes = processRoutesForMenu(routes)
  const menusMap = new Map()
  const menus = baseCreateMenus(processedRoutes, menusMap)
  return { menus, menusMap }
}

function baseCreateMenus(routes: any[], menusMap: Map<string, any>, options?: { paths: string[], matchs: any[] }) {
  const { paths = [], matchs = [] } = options ?? {}
  const menus: any[] = []
  for (const route of routes) {
    const { path, name, meta, children, hidden, ...rest } = (route?.mergeSingleChild ? getOnlyChildMenu(route) : route) ?? {}
    if (hidden === true) continue
    const newPaths = [...paths, path]
    const newPath = pathJoin(newPaths)
    const item: any = {
      label: meta?.title,
      key: name,
      path: newPath,
      type: 'item',
      icon: meta?.icon && iconsMap?.[meta.icon],
      show: hidden !== true,
      matchs: [...matchs, { meta, path, name }],
      ...rest,
    }
    menusMap.set(item.key, item)
    if (children) {
      item.type = 'submenu'
      item.children = baseCreateMenus(children, menusMap, { paths: newPaths, matchs: item.matchs })
    }
    menus.push(item)
  }
  return menus
}

function getComponent(componentPath: LayoutType) {
  const layoutImporter = layouts?.[componentPath]
  if (layoutImporter) {
    // 对于布局组件，返回动态导入的 Promise，并获取 default 导出
    return () => layoutImporter().then(module => module.default || module)
  }
  const path = componentPath.replace(/^views\/|\.vue$/g, '')
  return pagesModule[`/src/pages/${path}.tsx`]
}

function getOnlyChildMenu(route: any) {
  if (!route.children?.length) return route
  let child = route
  while (child?.children?.length) {
    const visibleChildren = child.children.filter((item: any) => item.hidden !== true)
    if (visibleChildren.length === 0) break
    const firstVisibleChild = visibleChildren[0]
    const path = pathJoin([route.path, firstVisibleChild.path])
    child = { ...firstVisibleChild, path }
  }
  return child
}

function pathJoin(paths: string[]) {
  const validPaths = paths.filter((value) => !!value)
  return validPaths.length > 0 ? `/${validPaths.join('/').replace(/^\//, '')}` : '/'
}

/**
 * 将字符串数组转换为 PascalCase 格式的字符串（首字母大写，无分隔符）
 * @param arr 输入字符串数组，可能包含路径（/）、连字符（-）或空格
 * @returns 转换后的 PascalCase 字符串，自动忽略空项
 */
function convertToPascalCase(arr: string[]): string {
  return arr
    .filter(item => item?.trim().length > 0)
    .flatMap((item) => {
      return item.split(/[/\- ]+/)
        .filter(part => part.trim().length > 0)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    })
    .join('')
}

function createIconsMap(iconsMap: Record<string, Component>) {
  const icons = Object.entries(iconsMap)
  const result: Record<string, () => JSX.Element> = {}
  for (const [key, value] of icons) {
    result[key] = () => (<NIcon>{h(value)}</NIcon>)
  }

  return result
}
