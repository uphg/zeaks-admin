import LayoutDefault from '@/shared/ui/layouts/presets/default'
import LayoutInnerLink from '@/shared/ui/layouts/presets/inner-link'
import LayoutParentView from '@/shared/ui/layouts/presets/parent-view'
import type { RouteRecordRaw } from 'vue-router'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/home',
    hidden: true,
  },
  {
    path: '/home',
    component: LayoutDefault, // 使用字符串标识，避免直接导入
    mergeSingleChild: true,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/home/home-page'),
        meta: { title: '首页', icon: 'house', affix: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/pages/login/login-page'),
  },
  {
    path: '/register',
    name: 'Register',
    hidden: true,
    component: () => import('@/pages/register/register-page'),
  },
  {
    path: '/:pathMatch(.*)*',
    hidden: true,
    component: () => import('@/pages/error/404-page'),
  },
  {
    path: '/401',
    name: '401',
    hidden: true,
    component: () => import('@/pages/error/401-page'),
  },
]

// 使用本地路由
export const permissionRoutes = [
  {
    path: '/about',
    name: 'About',
    component: LayoutDefault,
    mergeSingleChild: true,
    children: [
      {
        path: '',
        name: 'AboutBase',
        component: () => import('@/pages/about/about-page'),
        meta: {
          title: '关于',
          icon: 'user-search',
        },
      },
    ],
  },
]
