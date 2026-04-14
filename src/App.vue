<template>
  <div id="app">
    <router-view></router-view>
    <!-- 如果不同路由渲染同一组件，会导致数据不更新，这时候可以巧妙的加一个不同的Key -->
    <!-- <router-view :key="$route.fullpath"></router-view> -->
  </div>
</template>
<script>
export default {
  name: "app",
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
  border-radius: 8px !important;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95) !important;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
}

.el-dialog__body {
  flex: 1;
  overflow-y: auto;
}

/* 全屏弹窗不覆盖底部任务栏（2.5rem） */
.el-dialog.is-fullscreen {
  height: calc(100% - 2.5rem) !important;
  max-height: none !important;
}

/* 美化弹窗标题栏样式 */
.el-dialog__header {
  background: linear-gradient(90deg, #1e3c72 0%, #2a5298 100%) !important;
  padding: 10px 15px !important;
}

.el-dialog__title {
  color: #ffffff !important;
  font-weight: 500;
  font-size: 16px;
}

/* 弹窗关闭按钮修复 */
.el-dialog__headerbtn {
  top: 12px !important;
  right: 15px !important;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #eeeeee !important;
  font-size: 16px;
  transition: all 0.3s;
}
.el-dialog__headerbtn:hover .el-dialog__close {
  color: #409EFF !important;
  transform: scale(1.2);
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
</style>
