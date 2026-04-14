<template>
  <div class="doc-content">
    <h1>🚀 页面跳转与组件通信</h1>
    <p>在 Web OS 中，不同应用窗口或同一应用的不同子页面之间可以进行灵活的跳转与参数传递。</p>

    <el-card shadow="never" class="step-card">
      <div slot="header"><b>如何进行页面跳转？</b></div>
      <p>子页面通过触发 <code>$emit('routerTo', item, data)</code> 即可实现平滑切换。其中 <code>item</code> 为权限对象，<code>data</code> 为可选参数。</p>
      <div class="code-block">this.$emit('routerTo', targetMenuItem, { id: 100 });</div>
    </el-card>

    <el-card shadow="never" class="step-card">
      <div slot="header"><b>交互演示（保留项）</b></div>
      <p>点击下方按钮，系统将自动跳转到「按钮介绍」页面，并弹出您携带的测试参数：</p>
      <el-button type="success" icon="el-icon-position" @click="jump">立即点击测试跳转</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
    name: "pageJump",
    props: {
      menu: '',
      permissionsList:''
    },
    methods: {
      jump(){
        const target = {
          code: 'documentCenter',
          permissionsname: '按钮'
        };
        const data = { name: '这是跳转携带的参数' };
        this.$emit('routerTo', target, data);
      }
    }
}
</script>

<style scoped="scoped">
.doc-content { padding: 10px; }
.doc-content h1 { color: #2c3e50; font-size: 1.5rem; }
.step-card { margin-bottom: 20px; }
.code-block { background: #f4f4f5; padding: 10px; border-radius: 4px; font-family: monospace; color: #67C23A; }
</style>
