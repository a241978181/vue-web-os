'use strict'

import { app, protocol, BrowserWindow, Menu, shell } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

const isDevelopment = process.env.NODE_ENV !== 'production'

// GPU 渲染优化：保持硬件加速，同时解决掉帧问题
app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion')  // 解决 Windows 窗口遮挡导致的渲染暂停
app.commandLine.appendSwitch('ignore-gpu-blacklist')   // 强制启用 GPU 加速
app.commandLine.appendSwitch('max-active-webgl-contexts', '32')  // 增加 WebGL 上下文数量
app.commandLine.appendSwitch('renderer-process-limit', '10')     // 增加渲染进程数量

// 保持对窗口对象的全局引用，避免被垃圾回收
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// 构建自定义应用菜单
function buildMenu() {
  const template = [
    {
      label: '文件',
      submenu: [
        {
          label: '退出',
          accelerator: 'CmdOrCtrl+Q',
          role: 'quit'
        }
      ]
    },
    {
      label: '视图',
      submenu: [
        {
          label: '刷新',
          accelerator: 'CmdOrCtrl+R',
          click: (item, focusedWindow) => {
            if (focusedWindow) focusedWindow.reload()
          }
        },
        {
          label: '开发者工具',
          accelerator: 'F12',
          click: (item, focusedWindow) => {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools()
          }
        },
        { type: 'separator' },
        { label: '全屏', accelerator: 'F11', role: 'togglefullscreen' },
        { type: 'separator' },
        { label: '放大', accelerator: 'CmdOrCtrl+=', role: 'zoomIn' },
        { label: '缩小', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
        { label: '重置缩放', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' }
      ]
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '关于 Vue Web OS',
          click: () => {
            const { dialog } = require('electron')
            dialog.showMessageBox(win, {
              type: 'info',
              title: '关于',
              message: 'Vue Web OS v2.0.0',
              detail: '基于 Vue + Electron 构建的 Web 桌面操作系统'
            })
          }
        }
      ]
    }
  ]

  // macOS 需要额外的应用菜单
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

async function createWindow() {
  // 设置自定义菜单
  buildMenu()

  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 680,
    title: 'Vue Web OS',
    autoHideMenuBar: false,  // 设为 true 可隐藏菜单栏（Alt键唤起）
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      webSecurity: false,          // 关闭同源策略（跨域请求时需要）
      spellcheck: false,           // 关闭拼写检查（减少不必要的性能开销）
      backgroundThrottling: false  // 窗口不活跃时不停止动画/定时器
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 开发环境 - 加载开发服务器地址
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    // 生产环境 - 加载打包后的文件
    createProtocol('app')
    win.loadURL('app://./index.html')
  }
}

// 当所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  // macOS 中，应用和菜单栏通常在窗口关闭后保持活动状态
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // macOS 中，点击 dock 图标时如果没有其他窗口打开，则重新创建窗口
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// 应用准备就绪时创建窗口
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // 安装 Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools 安装失败:', e.toString())
    }
  }
  createWindow()
})

// 在开发环境中退出时，退出所有进程
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
