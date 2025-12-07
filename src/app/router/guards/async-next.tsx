import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, Router, RouteRecordRaw } from 'vue-router'
import type { SidebarStore } from '@/shared/ui/layouts/sidebar/use-sidebar-store'
import type { UserStore } from '@/entities/user/model/use-user-store'
import { apiGetUserInfo } from '@/entities/user/api/user-api'
import { useSidebarStore } from '@/shared/ui/layouts/sidebar/use-sidebar-store'
import { useUserStore } from '@/entities/user/model/use-user-store'
import { getToken, removeToken } from '@/shared/lib/token'
import { constantRoutes, permissionRoutes } from '../routes'
import { createSidebarMenus } from './async-route'
import { watch } from 'vue'

const guestRoutes: (string | symbol)[] = ['Login']
const publicRoutes: (string | symbol)[] = ['404', '403', '500']

export function initRouterGuards(router: Router) {
  const { user, setUser, clear } = useUserStore()
  const { setMenuMap, setMenus, menus } = useSidebarStore()

  let loadingPromise: Promise<void> | null = null

  router.beforeEach(async (to, from) => {
    try {
      const token = getToken()
      
      // 如果目标路由是登录页
      if (to?.name && guestRoutes.includes(to.name)) {
        // 如果有 token（已登录），则重定向到首页
        if (token) {
          return '/home'
        }
        // 没有 token，允许访问登录页
        return true
      }

      if (!token) {
        // 没有 token，重定向到登录页
        return '/login'
      }

      // 如果有 token，需要检查是否需要加载权限和菜单
      // 每次刷新页面后，user.value?.id 可能为空，但菜单数据也需要重新加载
      // 所以我们不能仅仅依赖 user.value?.id 来判断
      
      // 如果正在加载权限信息，等待加载完成
      if (loadingPromise) {
        await loadingPromise
        return { ...to, replace: true }
      }

      // 检查是否需要加载权限和菜单
      // 条件：用户信息不存在 或者 菜单数据为空
      if (!user.value?.id || !menus.value || menus.value.length === 0) {
        loadingPromise = loadPermissionInfo(router, { setUser, setMenuMap, setMenus })

        try {
          await loadingPromise
          // 权限信息加载完成后，重新导航到目标路由
          return { ...to, replace: true }
        } catch (error) {
          // 加载失败时清除状态
          throw error
        } finally {
          loadingPromise = null
        }
      }

      return true
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

  // 监听用户登出
  watch(() => user.value?.id, (newId, oldId) => {
    if (oldId && !newId) {
      // 用户登出时，可以在这里执行清理操作
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

    // 先清除之前可能添加的动态路由（避免重复添加）
    // 注意：这里假设你有办法识别和移除动态添加的路由
    // 如果无法直接移除，可以重新设置路由，或者记录已添加的路由
    
    // 添加动态路由
    routes.forEach((route) => {
      if (!isLinkRoute(route)) {
        router.addRoute(route)
      }
    })
    
    console.log('动态路由添加完成')
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
  const userInfoRes = await apiGetUserInfo()
  // const routeDataRes = await apiGetRouteData()
  const routes = permissionRoutes

  // const routes = createAsyncRoutes(routeDataRes.data)
  // const menuData = [...constantRoutes, ...routes] // 使用展开运算符替代 concat
  const menuData = [...constantRoutes, ...routes] // 使用展开运算符替代 concat

  const { menus, menusMap } = createSidebarMenus(menuData)
  console.log('刷新后重新获取的 routes')
  console.log(routes)
  console.log('刷新后重新获取的 menus')
  console.log(menus)
  return { userInfo: userInfoRes.data, routes, menus, menusMap }
}

// 移除了 createPermState 函数，因为不再需要 sessionStorage 存储权限状态