<template>
  <div id="app" :class="{'theme-dark': isDarkTheme}">
    <router-view></router-view>
    <!-- 如果不同路由渲染同一组件，会导致数据不更新，这时候可以巧妙的加一个不同的Key -->
    <!-- <router-view :key="$route.fullpath"></router-view> -->
  </div>
</template>
<script>
export default {
  name: "app",
  computed: {
    isDarkTheme() {
      return this.$store.state.settings.isDarkTheme;
    }
  },
  // 在SPA初始化时，从 localStorage 恢复权限数据到 Vuex
  created() {
    this.$store.dispatch('permission/restoreFromStorage');
  }
};
</script>

<style lang="scss">
// 此处的lang必须是scss，
// 如果是普通的css的话，最开始，下方全局的样式将不会被换肤插件抽离出来，修改后刷新页面才可以。
// 所以，只能改成scss了，但是是全局的
html,
body {
  height: 100%;
  overflow: hidden;
}

body {
  margin: 0;
  padding: 0;
  font-family: Montserrat, "Helvetica Neue", Arial, "Microsoft Yahei",
    sans-serif;
  #app {
    height: 100%;
  }
}

/* 覆盖左侧导航样式 */
.el-menu {
  width: 100%;
  border-right: none !important;
}

/* 解决多开窗口点击穿透问题 */
.el-dialog__wrapper {
  pointer-events: none;
}
.el-dialog {
  pointer-events: auto;
  border-radius: 10px !important;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95) !important;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
}

/* 深色模式仅针对外层装饰，不感染业务内容区 */
.theme-dark .el-dialog {
  box-shadow: 0 15px 50px rgba(0,0,0,0.4) !important;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.el-dialog__body {
  flex: 1;
  overflow-y: auto;
  color: inherit;
  padding: 15px 20px !important;
}

/* 全屏弹窗不覆盖底部任务栏（2.5rem） */
.el-dialog.is-fullscreen {
  height: calc(100% - 2.5rem) !important;
  max-height: none !important;
}

/* 美化弹窗标题栏样式 */
.el-dialog__header {
  background: linear-gradient(135deg, #7367f0 0%, #8e84fa 100%) !important;
  border-bottom: none !important;
  box-shadow: 0 4px 15px rgba(115, 103, 240, 0.2);
  padding: 14px 20px !important;
  position: relative;
  overflow: hidden;
}
/* 给浅色标题栏加一点内发光和星光点缀效果 */
.el-dialog__header::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==');
  opacity: 0.5;
  pointer-events: none;
}
.theme-dark .el-dialog__header {
  background: rgba(28, 28, 35, 0.98) !important;
  border-bottom: 2px solid #7367f0 !important;
  box-shadow: none;
}
.theme-dark .el-dialog__header::before {
  display: none;
}

.el-dialog__title {
  color: #ffffff !important;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.theme-dark .el-dialog__title {
  color: #ffffff !important;
  text-shadow: none;
}

/* 弹窗关闭按钮修复 */
.el-dialog__headerbtn {
  top: 16px !important;
  right: 20px !important;
}
.el-dialog__headerbtn .el-dialog__close {
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 18px;
  transition: all 0.3s;
}
.el-dialog__headerbtn:hover .el-dialog__close {
  color: #ffffff !important;
  transform: scale(1.2);
  text-shadow: 0 0 8px rgba(255,255,255,0.6);
}
.theme-dark .el-dialog__headerbtn .el-dialog__close {
  color: #a0a5b3 !important;
}
.theme-dark .el-dialog__headerbtn:hover .el-dialog__close {
  color: #ff4d4f !important;
  text-shadow: none;
}

.el-menu-item [class^="el-icon-"] {
  color: #333;
}

.el-menu .el-submenu__title i {
  color: #333;
}
.el-menu-item.is-active {
  background: #e3e1fc;
  border-right: 3px solid #7367f0;
}
.el-submenu.is-opened .el-menu {
  background: #fafafa;
}

/* 登录页覆盖账号输入框样式 */
.bg form .el-input__inner {
  background: transparent;
  border: none;
  border-bottom: 1px solid #aaa;
  border-radius: 0;
}

.el-button--primary:hover {
  box-shadow: 0 8px 25px -8px #7367f0;
}

/* ============================================================
   窗口 Zoom In / Zoom Out 过渡动画
   覆盖 Element UI 默认的 dialog-fade 过渡
   ============================================================ */

/* 打开动画：从图标位置 Zoom In 展开 */
.dialog-fade-enter-active {
  animation: none !important;
  transition: opacity 0.42s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.dialog-fade-enter-active .el-dialog {
  animation: os-window-zoom-in 0.42s cubic-bezier(0.16, 1, 0.3, 1) both;
  transform-origin: var(--anim-origin-x, 50%) var(--anim-origin-y, 50%);
}

/* 关闭动画：Zoom Out 缩小消失 */
.dialog-fade-leave-active {
  animation: none !important;
  transition: opacity 0.32s cubic-bezier(0.4, 0, 1, 1) !important;
}
.dialog-fade-leave-active .el-dialog {
  animation: os-window-zoom-out 0.32s cubic-bezier(0.4, 0, 1, 1) both;
  transform-origin: var(--anim-origin-x, 50%) var(--anim-origin-y, 100%);
}

/* 入场起始状态 */
.dialog-fade-enter {
  opacity: 0 !important;
}
.dialog-fade-enter-to {
  opacity: 1 !important;
}

/* 离场结束状态 */
.dialog-fade-leave {
  opacity: 1 !important;
}
.dialog-fade-leave-to {
  opacity: 0 !important;
}

/* Zoom In 关键帧：从小到大，伴随模糊→清晰 */
@keyframes os-window-zoom-in {
  0% {
    transform: scale(0.15);
    opacity: 0;
    filter: blur(8px);
  }
  40% {
    opacity: 1;
    filter: blur(2px);
  }
  100% {
    transform: scale(1);
    opacity: 1;
    filter: blur(0);
  }
}

/* Zoom Out 关键帧：从大到小，伴随清晰→模糊 */
@keyframes os-window-zoom-out {
  0% {
    transform: scale(1);
    opacity: 1;
    filter: blur(0);
  }
  60% {
    opacity: 0.5;
    filter: blur(2px);
  }
  100% {
    transform: scale(0.12);
    opacity: 0;
    filter: blur(6px);
  }
}
</style>
