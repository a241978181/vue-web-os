import Vue from 'vue'
import store from '@/store'

/**
 * 窗口拖拽缩放指令 v-dialogResize
 *
 * 用法：v-dialogResize="{ minWidth: 480, minHeight: 320, appCode: 'xxx' }"
 *   - minWidth: 最小宽度（px），默认 480
 *   - minHeight: 最小高度（px），默认 320
 *   - appCode: 应用标识，用于尺寸记忆
 *
 * 功能：
 *   - 8 个方向（n/s/e/w/ne/nw/se/sw）的拖拽缩放
 *   - 全屏模式下自动隐藏缩放手柄
 *   - 限制最小尺寸，防止内容挤压
 *   - 支持窗口尺寸记忆（通过 Vuex 持久化到 localStorage）
 *   - 受全局设置 enableWindowResize 开关控制
 */

// 创建缩放手柄的方向配置（热区在 dialog 内部边缘，避免被 overflow:hidden 裁剪）
const HANDLES = [
  { name: 'n',  cursor: 'n-resize',  style: 'top:0;left:8px;right:8px;height:6px;' },
  { name: 's',  cursor: 's-resize',  style: 'bottom:0;left:8px;right:8px;height:6px;' },
  { name: 'e',  cursor: 'e-resize',  style: 'top:8px;right:0;bottom:8px;width:6px;' },
  { name: 'w',  cursor: 'w-resize',  style: 'top:8px;left:0;bottom:8px;width:6px;' },
  { name: 'ne', cursor: 'ne-resize', style: 'top:0;right:0;width:12px;height:12px;' },
  { name: 'nw', cursor: 'nw-resize', style: 'top:0;left:0;width:12px;height:12px;' },
  { name: 'se', cursor: 'se-resize', style: 'bottom:0;right:0;width:12px;height:12px;' },
  { name: 'sw', cursor: 'sw-resize', style: 'bottom:0;left:0;width:12px;height:12px;' },
]

function createHandles(dragDom, el, options) {
  const handles = []
  HANDLES.forEach(function(h) {
    const handle = document.createElement('div')
    handle.className = 'dialog-resize-handle dialog-resize-' + h.name
    handle.setAttribute('style', 'position:absolute;z-index:10;' + h.style + 'cursor:' + h.cursor + ';')
    handle.setAttribute('data-direction', h.name)
    dragDom.appendChild(handle)
    handles.push(handle)

    handle.addEventListener('mousedown', function(e) {
      e.preventDefault()
      e.stopPropagation()

      // 检查全局开关
      if (!store.state.settings.enableWindowResize) {
        return
      }

      var direction = h.name
      var startX = e.clientX
      var startY = e.clientY
      var startWidth = dragDom.offsetWidth
      var startHeight = dragDom.offsetHeight
      var startLeft = parseFloat(dragDom.style.left) || 0
      var startTop = parseFloat(dragDom.style.top) || 0

      // 若 dialog 还没被显式定位，先获取当前坐标
      if (dragDom.style.left === '' || dragDom.style.left === 'auto') {
        var rect = dragDom.getBoundingClientRect()
        startLeft = rect.left
        startTop = rect.top
        dragDom.style.marginLeft = '0px'
        dragDom.style.marginTop = '0px'
        dragDom.style.marginBottom = '0px'
        dragDom.style.left = startLeft + 'px'
        dragDom.style.top = startTop + 'px'
      }

      var minW = (options && options.minWidth) || 480
      var minH = (options && options.minHeight) || 320

      document.onmousemove = function(moveEvent) {
        var dx = moveEvent.clientX - startX
        var dy = moveEvent.clientY - startY

        var newWidth = startWidth
        var newHeight = startHeight
        var newLeft = startLeft
        var newTop = startTop

        // 根据方向计算新尺寸
        if (direction.indexOf('e') !== -1) {
          newWidth = Math.max(minW, startWidth + dx)
        }
        if (direction.indexOf('w') !== -1) {
          var proposedWidth = startWidth - dx
          if (proposedWidth >= minW) {
            newWidth = proposedWidth
            newLeft = startLeft + dx
          } else {
            newWidth = minW
            newLeft = startLeft + (startWidth - minW)
          }
        }
        if (direction.indexOf('s') !== -1) {
          newHeight = Math.max(minH, startHeight + dy)
        }
        if (direction.indexOf('n') !== -1) {
          var proposedHeight = startHeight - dy
          if (proposedHeight >= minH) {
            newHeight = proposedHeight
            newTop = startTop + dy
          } else {
            newHeight = minH
            newTop = startTop + (startHeight - minH)
          }
        }

        dragDom.style.width = newWidth + 'px'
        dragDom.style.height = newHeight + 'px'
        dragDom.style.left = newLeft + 'px'
        dragDom.style.top = newTop + 'px'
      }

      document.onmouseup = function() {
        document.onmousemove = null
        document.onmouseup = null

        // 记忆窗口尺寸
        if (options && options.appCode) {
          var finalWidth = dragDom.offsetWidth
          var finalHeight = dragDom.offsetHeight
          store.commit('settings/SET_WINDOW_SIZE', {
            appCode: options.appCode,
            width: finalWidth,
            height: finalHeight
          })
        }
      }
    })
  })

  return handles
}

function updateHandlesVisibility(el) {
  var handles = el.querySelectorAll('.dialog-resize-handle')
  var dragDom = el.querySelector('.el-dialog')
  var isFullscreen = dragDom && dragDom.classList.contains('is-fullscreen')
  var enabled = store.state.settings.enableWindowResize

  for (var i = 0; i < handles.length; i++) {
    handles[i].style.display = (isFullscreen || !enabled) ? 'none' : 'block'
  }
}

Vue.directive('dialogResize', {
  bind: function(el, binding) {
    Vue.nextTick(function() {
      var dragDom = el.querySelector('.el-dialog')
      if (!dragDom) {
        return
      }

      var options = binding.value || {}
      el.__resizeHandles__ = createHandles(dragDom, el, options)
      el.__resizeOptions__ = options

      // 初始化：检查全屏状态来决定是否显示手柄
      updateHandlesVisibility(el)

      // 使用 MutationObserver 监听 fullscreen class 变化
      var observer = new MutationObserver(function() {
        updateHandlesVisibility(el)
      })
      observer.observe(dragDom, { attributes: true, attributeFilter: ['class'] })
      el.__resizeObserver__ = observer

      // 恢复记忆的窗口尺寸
      if (options.appCode) {
        var savedSizes = store.state.settings.windowSizes
        var saved = savedSizes[options.appCode]
        if (saved) {
          dragDom.style.width = saved.width + 'px'
          dragDom.style.height = saved.height + 'px'
        }
      }
    })
  },
  update: function(el, binding) {
    // 当 enableWindowResize 变化时更新手柄显示
    updateHandlesVisibility(el)
  },
  unbind: function(el) {
    if (el.__resizeObserver__) {
      el.__resizeObserver__.disconnect()
      delete el.__resizeObserver__
    }
    // 移除手柄 DOM
    var handles = el.querySelectorAll('.dialog-resize-handle')
    for (var i = 0; i < handles.length; i++) {
      handles[i].parentNode.removeChild(handles[i])
    }
    delete el.__resizeHandles__
    delete el.__resizeOptions__
  }
})
