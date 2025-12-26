import type { JSX } from 'vue/jsx-runtime'
import { h, type Component } from 'vue'
import { NIcon } from 'naive-ui'
import { cloneJSON } from '@/shared/lib/clone-json'
import { iconMap } from '@/shared/lib/icon-map'

const iconRenderMap = createIconRenderMap(iconMap)

/**
 * 处理路由数据用于菜单创建
 * @param routes 路由数据
 * @returns 处理后的路由数据
 */
function processRoutesForMenu(routes: any[]): any[] {
  return routes.map((route) => {
    const processedRoute = { ...route }

    // 递归处理子路由
    if (route.children) {
      processedRoute.children = processRoutesForMenu(route.children)
    }

    return processedRoute
  })
}

/**
 * 创建侧边栏菜单
 * @param data 路由数据
 * @returns 侧边栏菜单数据
 */
export function createMenus(data: any[]) {
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
      icon: meta?.icon && iconRenderMap?.[meta.icon],
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

function createIconRenderMap(iconRenderMap: Record<string, Component>) {
  const icons = Object.entries(iconRenderMap)
  const result: Record<string, () => JSX.Element> = {}
  for (const [key, value] of icons) {
    result[key] = () => (<NIcon>{h(value)}</NIcon>)
  }

  return result
}

export function pathJoin(paths: string[]) {
  const validPaths = paths.filter((value) => !!value)
  return validPaths.length > 0 ? `/${validPaths.join('/').replace(/^\//, '')}` : '/'
}
