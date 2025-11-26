import type { RouteRecordRaw } from 'vue-router'
import { LayoutDefault } from '@/app/layouts'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login').then(m => m.LoginPage),
    meta: {
      title: '登录',
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/register').then(m => m.RegisterPage),
    meta: {
      title: '注册',
      requiresAuth: false,
    },
  },
  {
    path: '/',
    component: LayoutDefault,
    meta: {
      title: '首页',
      requiresAuth: true,
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/pages/home').then(m => m.HomePage),
        meta: {
          title: '首页',
        },
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/pages/about').then(m => m.AboutPage),
        meta: {
          title: '关于',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/error').then(m => m.NotFoundPage),
    meta: {
      title: '页面未找到',
    },
  },
]