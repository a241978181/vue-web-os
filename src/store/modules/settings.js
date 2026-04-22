/**
 * 系统设置状态管理模块
 * 管理桌面相关的用户偏好设置，持久化到 localStorage
 */
const STORAGE_KEY = 'desktopSettings'

// 从 localStorage 恢复设置
function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    // ignore
  }
  return {}
}

const savedSettings = loadSettings()

const settings = {
  namespaced: true,
  state: {
    // 是否限制窗口不能移出屏幕边界（默认不限制）
    restrictWindowBounds: savedSettings.restrictWindowBounds !== undefined
      ? savedSettings.restrictWindowBounds
      : false,
    // 是否开启深色模式（默认不开启）
    isDarkTheme: savedSettings.isDarkTheme !== undefined
      ? savedSettings.isDarkTheme
      : false,
    // 桌面图标大小（large / medium / small，默认 large）
    desktopIconSize: savedSettings.desktopIconSize || 'large',
    // 是否开启窗口拖拽缩放（默认开启）
    enableWindowResize: savedSettings.enableWindowResize !== undefined
      ? savedSettings.enableWindowResize
      : true,
    // 窗口尺寸记忆，以 appCode 为 key 存储 { width, height }
    windowSizes: savedSettings.windowSizes || {},
  },
  mutations: {
    SET_RESTRICT_WINDOW_BOUNDS(state, value) {
      state.restrictWindowBounds = value
      // 持久化
      const all = loadSettings()
      all.restrictWindowBounds = value
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    },
    SET_DARK_THEME(state, value) {
      state.isDarkTheme = value
      // 持久化
      const all = loadSettings()
      all.isDarkTheme = value
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    },
    SET_DESKTOP_ICON_SIZE(state, value) {
      state.desktopIconSize = value
      // 持久化
      const all = loadSettings()
      all.desktopIconSize = value
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    },
    SET_ENABLE_WINDOW_RESIZE(state, value) {
      state.enableWindowResize = value
      // 持久化
      const all = loadSettings()
      all.enableWindowResize = value
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    },
    SET_WINDOW_SIZE(state, { appCode, width, height }) {
      state.windowSizes = { ...state.windowSizes, [appCode]: { width, height } }
      // 持久化
      const all = loadSettings()
      all.windowSizes = state.windowSizes
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    },
  }
}

export default settings
