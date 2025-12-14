import type { MockflyConfig } from 'mockfly'

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
      "response": [
        {
          "path": "/icon",
          "component": "Default",
          "mergeSingleChild": true,
          "children": [
            {
              "path": "base",
              "component": "icon/icon-page",
              "meta": {
                "title": "图标",
                "icon": "audio-waveform"
              }
            }
          ]
        },
        {
          "path": "/about",
          "component": "Default",
          "mergeSingleChild": true,
          "children": [
            {
              "path": "base",
              "component": "about/about-page",
              "meta": {
                "title": "关于",
                "icon": "user-search"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "获取用户列表",
      "path": "/users",
      "method": "GET",
      "responseFile": "users.json"
    }
  ]
}

export default config