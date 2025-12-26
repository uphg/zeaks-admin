import type { LayoutType } from '@/shared/ui/layouts/layouts'
import { layouts } from '@/shared/ui/layouts/layouts'
import { cloneJSON } from '@/shared/lib/clone-json'
import { pageComponentMap } from '@/shared/config'

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

function getComponent(componentPath: LayoutType) {
  const layoutImporter = layouts?.[componentPath]
  if (layoutImporter) {
    // 对于布局组件，返回动态导入的 Promise，并获取 default 导出
    return () => layoutImporter().then(module => module.default || module)
  }
  const path = componentPath.replace(/^views\/|\.vue$/g, '')
  return pageComponentMap[`/src/pages/${path}.tsx`]
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
