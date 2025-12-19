import type { MockflyConfig } from 'mockfly'
import { responseFile } from './utils.ts'

const config: MockflyConfig = {
  "port": 4001,
  "host": "localhost",
  "baseUrl": "/api",
  "routes": [
    {
      "name": "登录",
      "path": "/login",
      "method": "POST",
      "response": {
        "token": "admin-token"
      }
    },
    {
      "name": "获取用户信息",
      "path": "/user-info",
      "method": "GET",
      "response": {
        "id": "0",
        "name": "Jacker",
        "rules": [],
        "email": "jacker@qq.com",
        "token": "alsdhfioasdf"
      }
    },
    {
      "name": "获取路由数据",
      "path": "/route-data",
      "method": "GET",
      "response": responseFile('./data/route-data.json')
    },
    {
      "name": "获取用户列表",
      "path": "/users",
      "method": "GET",
      "response": responseFile('./data/users.json')
    }
  ]
}

export default config