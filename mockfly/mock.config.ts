import type { MockflyConfig } from 'mockfly'
import { responseFile } from './utils.ts'

const config: MockflyConfig = {
  port: 4001,
  host: 'localhost',
  baseUrl: '/api',
  routes: [
    {
      name: '登录',
      path: '/login',
      method: 'POST',
      response: {
        token: 'admin-token'
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
      response: responseFile('./data/route-data.json')
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
  ]
}

export default config