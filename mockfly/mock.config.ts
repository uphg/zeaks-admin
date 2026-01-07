import type { MockflyConfig } from 'mockfly'
import { responseFile } from './shared/lib/response-file.ts'
import { responseMenus } from './shared/lib/route-to-menu.ts'
import { menuButtonsMap, routeData } from './shared/common.ts'

const config: MockflyConfig = {
  port: 3021,
  host: 'localhost',
  baseUrl: '/api',
  routes: [
    {
      name: '登录',
      path: '/login',
      method: 'POST',
      response: {
        token: 'UCugv8YaJk5LCN_qr-jT2YorgmhopytI'
      }
    },
    {
      name: '获取用户信息',
      path: '/user-info',
      method: 'GET',
      response: {
        id: '0',
        name: 'Jacker',
        rules: [],
        email: 'jacker@qq.com',
        token: 'alsdhfioasdf'
      }
    },
    {
      name: '获取路由数据',
      path: '/route-data',
      method: 'GET',
      response: () => {
        return routeData
      }
    },
    // 用户管理
    {
      name: '获取用户列表',
      path: '/users',
      method: 'GET',
      response: responseFile('./data/users.json')
    },
    {
      name: '获取用户详情',
      path: '/users/:id',
      method: 'GET',
      response: responseFile('./data/users-details.json')
    },
    {
      name: '创建用户',
      path: '/users',
      method: 'POST',
      response: {
        "id": 26,
        "username": "newuser",
        "nickname": "新用户",
        "email": "newuser@example.com",
        "phone": "13800138001",
        "avatar": "",
        "status": 1,
        "created_at": "2023-06-21T14:30:00Z",
        "updated_at": "2023-06-21T14:30:00Z"
      }
    },
    {
      name: '更新用户',
      path: '/users/:id',
      method: 'PUT',
      response:  {
        "id": 1,
        "username": "admin",
        "nickname": "超级管理员",
        "email": "admin@example.com",
        "updated_at": "2023-06-21T15:45:00Z"
      }
    },
    {
      name: '删除用户',
      path: '/users/:id',
      method: 'DELETE',
      response: {} // 204 No Content
    },

    // 角色管理
    {
      name: '获取角色列表',
      path: '/roles',
      method: 'GET',
      response: responseFile('./data/roles.json')
    },
    {
      name: '获取角色详情',
      path: '/roles/:id',
      method: 'GET',
      response: responseFile('./data/roles-details.json')
    },
    {
      name: '创建角色',
      path: '/roles',
      method: 'POST',
      response: {
        "id": 11,
        "name": "auditor",
        "description": "审计员",
        "permissions": ["log:read", "audit:read"],
        "created_at": "2023-06-21T16:00:00Z"
      }
    },
    {
      name: '更新角色',
      path: '/roles/:id',
      method: 'PUT',
      response: {
        "id": 1,
        "name": "admin",
        "description": "系统管理员（更新）",
        "updated_at": "2023-06-21T16:30:00Z"
      }
    },
    {
      name: '删除角色',
      path: '/roles/:id',
      method: 'DELETE',
      response: {}
    },

    // 菜单管理
    // 获取菜单列表
    {
      name: '获取菜单列表',
      path: '/menus',
      method: 'GET',
      response: responseMenus()
    },

    // 新增菜单
    {
      name: '新增菜单',
      path: '/menus',
      method: 'POST',
      response: {
        id: '10',
        name: '新增的菜单',
        type: 'menu',
        parent_id: '1',
        path: '/system/test',
        permission: 'system:test:view',
        sort_order: 3,
        visible: 1,
        status: 1,
        created_at: '2023-06-21T10:00:00Z'
      }
    },

    // 编辑菜单
    {
      name: '编辑菜单',
      path: '/menus/:id',
      method: 'PUT',
      response: {
        id: '2',
        name: '菜单管理-已更新',
        type: 'menu',
        parent_id: '1',
        path: '/menus',
        permission: 'system:menu:view',
        sort_order: 1,
        visible: 1,
        status: 1,
        updated_at: '2023-06-21T11:00:00Z'
      }
    },

    // 删除菜单
    {
      name: '删除菜单',
      path: '/menus/:id',
      method: 'DELETE',
      response: {}
    },

    // 获取指定菜单的按钮列表
    {
      name: '获取菜单按钮列表',
      path: '/menus/:id/buttons',
      method: 'GET',
      response: (req) => {
        const menuId = req.params.id as ('2' | '3' | 'default')
        const buttons = menuButtonsMap[menuId] ?? menuButtonsMap['default']
        return {
          menuId: menuId,
          data: buttons,
          total: (buttons).length,
          timestamp: new Date().toISOString()
        }
      }
    },

    // 获取角色菜单绑定
    {
      name: '获取角色菜单',
      path: '/roles/:id/menus',
      method: 'GET',
      response: {
        roleId: 'admin',
        menuIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
      }
    },

    // 绑定角色菜单
    {
      name: '绑定角色菜单',
      path: '/roles/:id/menus',
      method: 'POST',
      response: {
        roleId: 'admin',
        menuIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
      }
    }
  ]
}

export default config