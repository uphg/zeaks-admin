import { readJsonFile } from "./lib/response-file.ts"

const routeJSON = readJsonFile('./data/route-data.json')
export const routeData = JSON.parse(routeJSON)

export const menuButtonsMap = {
  '2': [
    {
      id: '21',
      name: '新增菜单',
      type: 'button',
      parent_id: '2',
      permission: 'system:menu:create',
      sort_order: 1,
      visible: 1,
      status: 1,
      created_at: '2023-06-20T10:00:00Z'
    },
    {
      id: '22',
      name: '编辑菜单',
      type: 'button',
      parent_id: '2',
      permission: 'system:menu:update',
      sort_order: 2,
      visible: 1,
      status: 1,
      created_at: '2023-06-20T10:00:00Z'
    },
    {
      id: '23',
      name: '删除菜单',
      type: 'button',
      parent_id: '2',
      permission: 'system:menu:delete',
      sort_order: 3,
      visible: 1,
      status: 1,
      created_at: '2023-06-20T10:00:00Z'
    }
  ],
  '3': [
    {
      id: '31',
      name: '查询用户',
      type: 'button',
      parent_id: '3',
      permission: 'system:user:query',
      sort_order: 1,
      visible: 1,
      status: 1,
      created_at: '2023-06-20T10:00:00Z'
    },
    {
      id: '32',
      name: '导出用户',
      type: 'button',
      parent_id: '3',
      permission: 'system:user:export',
      sort_order: 2,
      visible: 1,
      status: 1,
      created_at: '2023-06-20T10:00:00Z'
    }
  ],
  'default': [
    {
      id: '41',
      name: '查看详情',
      type: 'button',
      parent_id: null,
      permission: 'system:default:view',
      sort_order: 1,
      visible: 1,
      status: 1,
      created_at: '2023-06-20T10:00:00Z'
    }
  ]
}
