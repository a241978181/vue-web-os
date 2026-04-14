# Vue-Web-OS v3.0.0

一个基于 **Vue 2.6 + Element UI 2.13.2** 的仿 Windows 10 云桌面系统。项目已完成权限模块、登录验证模块、Axios 请求模块、内置介绍文档、国际化（i18n）等常用功能模块，可用于开发中大型 Web 应用。已在实际项目中应用于云盘系统与企业级 OA 系统。

> 喜欢的小伙伴可以免费拿去使用，给个免费的 ⭐ Star 就是最大的支持！

## 🌐 在线体验

[👉 点此体验 Demo](http://www.jxys.top:1000/#/signin)

## ✨ 核心功能

### 桌面系统
- **多窗口管理**：支持窗口拖拽、缩放、最小化、最大化、关闭，双击标题栏切换全屏
- **任务栏**：底部任务栏实时显示已打开应用，点击可切换显隐
- **开始菜单**：仿 Windows 10 开始菜单，展示所有可用应用
- **鼠标右键菜单**：桌面右键弹出上下文菜单，支持自定义操作
- **窗口边界限位**：拖拽窗口时自动识别屏幕边界及任务栏高度，防止窗口拖出可视区域

### 权限体系
- **应用级权限 (type: 1)**：控制桌面上显示哪些应用图标
- **页面级权限 (type: 2)**：控制应用内部显示哪些子页面/菜单
- **层级关系 (parentid)**：通过 `parentid` 建立应用与子页面的父子层级
- **默认页面 (defaultPage)**：可配置应用打开时默认展示的子页面

### 内置介绍文档
- 系统内置「介绍文档」桌面应用，包含：项目总览、权限体系说明、核心功能介绍、开发指南等
- 无需翻阅外部文档，直接在系统内查阅所有使用说明

### 国际化 (i18n)
- 已预留国际化模块架构，支持多语言切换
- 内置介绍文档中包含国际化使用说明

### 数据模拟
- 使用 Mockjs 模拟后端接口，前端独立可运行
- `getMenu` 接口和登录接口后期可无缝替换为真实后端 API

## 🚀 快速启动

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run serve

# 打包生产环境
npm run build

# 本地预览打包产物（需全局安装 http-server）
cd dist
http-server
```

## 📁 项目结构

```
src/
├── assets/              # 静态资源 & SCSS 变量
├── components/
│   ├── Function/        # 应用外壳组件（窗口容器）
│   ├── Main/            # 主框架组件（桌面、任务栏、开始菜单等）
│   ├── Menu/            # 各应用的子页面组件
│   └── util/            # 公共工具组件（窗口头部、标题栏等）
├── http/                # Axios 请求封装
├── mock/                # Mockjs 模拟数据
├── store/               # Vuex 状态管理
├── utils/               # 工具函数（权限、拖拽指令等）
└── App.vue              # 根组件
```

## 🔧 关键配置说明

### 添加新应用

在 `src/mock/modules/common.js` 的 `menu` 数组中添加配置：

```js
// 添加一个应用（type: 1）
{
  id: 100,
  parentid: 0,
  permissionsname: '我的应用',
  permissionsenglish: 'myApp',
  type: 1,
  defaultPage: 'subPage1'  // 可选：指定默认打开的子页面
}

// 添加子页面（type: 2）
{
  id: 101,
  parentid: 100,
  permissionsname: '子页面1',
  permissionsenglish: 'subPage1',
  type: 2
}
```

### 替换后端接口

在 `src/http/index.js` 中配置 `baseURL` 指向真实后端地址，将 Mock 拦截的 `/menu`、`/login` 等接口替换为实际 API 即可。

### 修改主题色

编辑 `src/assets/scss/element-variables.scss`：

```scss
$--color-primary: #7367f0;  // 修改为你需要的品牌色
```

## 📸 项目预览

##### 项目展示
![vue-web-os](https://s1.ax1x.com/2020/09/08/wQ5IsS.jpg "vue-web-os")
##### 登录页面
![vue-web-os](https://s1.ax1x.com/2020/09/10/wGtyWj.jpg "vue-web-os")
##### 桌面展示
![vue-web-os](https://s1.ax1x.com/2020/10/27/BQdqpQ.jpg "vue-web-os")
##### 小工具
![vue-web-os](https://s1.ax1x.com/2020/10/27/BQwF1J.jpg "vue-web-os")
##### 开始菜单与鼠标右键
![vue-web-os](https://s1.ax1x.com/2020/10/27/BQwZ0x.jpg "vue-web-os")
##### 多窗口与模块展示
![vue-web-os](https://s3.ax1x.com/2020/12/28/rTwMEF.jpg "vue-web-os")

## 📦 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 2.6.x | 核心框架 |
| Element UI | 2.13.2 | UI 组件库 |
| Vuex | 3.x | 状态管理 |
| Axios | 0.19.0 | HTTP 请求 |
| Mockjs | 1.1.0 | 数据模拟 |
| vue-context-menu | 1.0.2 | 右键菜单 |
| ECharts | - | 数据可视化 |
| vue-i18n | - | 国际化（即将上线） |

## 📋 版本更新记录

### v3.0.0
- 移除 iView 依赖，全面统一使用 Element UI
- 新增「介绍文档」内置桌面应用，涵盖项目总览、权限体系、核心功能、开发指南
- 优化任务栏显隐切换逻辑，解决全屏弹窗遮挡问题
- 重构窗口拖拽边界算法，自动避让任务栏
- 支持应用 `defaultPage` 配置，打开应用时自动定位到指定子页面
- 重构系统介绍与技术解决模块下的教程页面 UI
- 预留国际化 (i18n) 模块架构

### v2.2.0
- 新增说明文档与系统多处优化

## 📞 联系方式

如有疑问可以加我微信：**a2417978181** 咨询。

## ❤️ 支持

该系统会稳定持续地升级维护，喜欢的话请给个 Star 吧，谢谢！
