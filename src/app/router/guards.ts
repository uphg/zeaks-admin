import type { Router, RouteRecordRaw } from 'vue-router'
import type { SidebarStore } from '@/shared/ui/layouts/sidebar/use-sidebar-store'
import type { UserStore } from '@/entities/user/model/use-user-store'
import { apiGetRouteData, apiGetUserInfo } from '@/entities/user/api/user-api'
import { useSidebarStore } from '@/shared/ui/layouts/sidebar/use-sidebar-store'
import { useUserStore } from '@/entities/user/model/use-user-store'
import { getToken, removeToken } from '@/shared/lib/token'
import { constantRoutes } from './routes'
import { createMenus } from '@/entities/menu/model/create-menus'
import { createAsyncRoutes } from '@/shared/lib/routing'

const guestRoutes: (string | symbol)[] = ['Login']

export function initRouterGuards(router: Router) {
  const { user, setUser, clear } = useUserStore()
  const { menus, setMenuMap, setMenus } = useSidebarStore()

  router.beforeEach(async (to) => {
    try {
      const token = getToken()
      if (to?.name && guestRoutes.includes(to.name)) {
        if (token) {
          return '/home'
        }
        return true
      }
      if (!token) {
        return '/login'
      }
      if (user.value?.id && menus.value?.length) {
        return true
      }
  
      try {
        await loadPermissionInfo(router, { setUser, setMenuMap, setMenus})
        return { ...to, replace: true }
      } catch (error) {
        throw error
      }
    } catch (error) {
      console.error('Router guard error:', error)
      clear()

      if (to.name !== 'Login') {
        return '/login'
      }
      return true
    }
  })
}

async function loadPermissionInfo(
  router: Router,
  { setUser, setMenuMap, setMenus }: { setUser: UserStore['setUser'], setMenuMap: SidebarStore['setMenuMap'], setMenus: SidebarStore['setMenus'] },
): Promise<void> {
  try {
    const { userInfo, routes, menus, menusMap } = await fetchUserAuthAndRoutes()

    // 更新 store 状态
    setMenuMap(menusMap)
    setMenus(menus)
    setUser(userInfo as any)

    // 添加动态路由
    routes.forEach((route) => {
      if (!isLinkRoute(route)) {
        router.addRoute(route)
      }
    })
  } catch (error) {
    console.error('Failed to load permission info:', error)
    // 清除无效的 token
    removeToken()
    throw new Error('权限信息加载失败，请重新登录')
  }
}

function isLinkRoute(route: RouteRecordRaw): boolean {
  return Boolean(route?.meta?.link)
}

async function fetchUserAuthAndRoutes() {
  let userInfoRes = await apiGetUserInfo()
  const routeDataRes = await apiGetRouteData()
  const userInfo = userInfoRes
  const routeData = routeDataRes

  if (!userInfo) {
    throw new Error('用户信息加载失败，请重新登录')
  }

  if (!routeData) {
    throw new Error('权限路由加载失败，请重新登录')
  }
  
  const routes = createAsyncRoutes(routeData)
  if (!routes?.length) {
    throw new Error('权限路由数据错误，请重新登录')
  }

  const menuData = [...constantRoutes, ...routes] // 使用展开运算符替代 concat

  // 本地路由
  // const routes = permissionRoutes
  // const menuData = [...constantRoutes, ...routes] // 使用展开运算符替代 concat

  const { menus, menusMap } = createMenus(menuData) ?? {}
  if (!menus?.length || !menusMap?.size) {
    throw new Error('菜单数据错误，请重新登录')
  }
  return { userInfo, routes, menus, menusMap }
}
