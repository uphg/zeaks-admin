import type { Router, RouteRecordRaw } from 'vue-router'
import type { SidebarStore } from '@/shared/ui/layouts/sidebar/use-sidebar-store'
import type { UserStore } from '@/entities/user/model/use-user-store'
import { apiGetRouteData, apiGetUserInfo } from '@/entities/user/api/user-api'
import { useSidebarStore } from '@/shared/ui/layouts/sidebar/use-sidebar-store'
import { useUserStore } from '@/entities/user/model/use-user-store'
import { getToken, removeToken } from '@/shared/lib/token'
import { constantRoutes } from '../routes'
import { createAsyncRoutes, createSidebarMenus } from './async-route'

const guestRoutes: (string | symbol)[] = ['Login']
const publicRoutes: (string | symbol)[] = ['404', '403', '500']
// export const permState = createPermState()

export function initRouterGuards(router: Router) {
  const { user, setUser, clear } = useUserStore()
  const { menus, setMenuMap, setMenus } = useSidebarStore()

  let loadingPromise: Promise<void> | null = null

  router.beforeEach(async (to, from) => {
    try {
      const token = getToken()
      console.log(1)
      // 如果目标路由是登录页
      if (to?.name && guestRoutes.includes(to.name)) {
        console.log(1.1)
        // 如果有 token（已登录），则重定向到首页
        if (token) {
          console.log(1.2)
          return '/home'
        }
        console.log(1.3)
        // 没有 token，允许访问登录页
        return true
      }
      console.log(2)
      if (!token) {
        console.log(2.1)
        // 没有 token，重定向到登录页
        return '/login'
      }
      
      console.log(3)
      console.log('user.value')
      console.log(user.value && {...user.value})
      console.log('menus.value')
      console.log(menus.value && [...menus.value])
      if (user.value?.id && menus.value?.length) {
        console.log(3.1)
        return true
      }
      console.log(4)
  
      try {
        await loadPermissionInfo(router, { setUser, setMenuMap, setMenus})
        console.log(4.3)
        // 权限信息加载完成后，重新导航到目标路由
        return { ...to, replace: true }
      } catch (error) {
        // 加载失败时清除状态
        console.log(4.4)
        throw error
      } finally {
        loadingPromise = null
      }
    } catch (error) {
      console.error('Router guard error:', error)
      // 发生错误时清除用户状态并跳转到登录页
      clear()
      loadingPromise = null

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
  // const routes = permissionRoutes
  // const menuData = [...constantRoutes, ...routes] // 使用展开运算符替代 concat

  const { menus, menusMap } = createSidebarMenus(menuData) ?? {}
  if (!menus?.length || !menusMap?.size) {
    throw new Error('菜单数据错误，请重新登录')
  }
  return { userInfo, routes, menus, menusMap }
}
