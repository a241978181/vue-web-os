<template>
  <div class="doc-content">
    <h1>🆕 新增桌面模块</h1>
    <p>模块是指桌面上独立运行的 App 容器（如“技术解决”）。新增一个模块需要以下三个核心步骤：</p>

    <el-steps :active="3" finish-status="success" simple style="margin: 20px 0;">
      <el-step title="配置权限" icon="el-icon-edit"></el-step>
      <el-step title="注册状态" icon="el-icon-switch-button"></el-step>
      <el-step title="创建组件" icon="el-icon-document"></el-step>
    </el-steps>

    <el-card shadow="never" class="step-card">
      <div slot="header"><b>第一步：新增权限项</b></div>
      <p>在 <code>/src/mock/modules/common.js</code> 文件的 <code>menu</code> 数组中添加一个新对象：</p>
      <ul>
        <li><code>type</code> 必须为 <b>1</b>（代表应用级）。</li>
        <li><code>parentid</code> 必须为 <b>0</b>。</li>
        <li><code>permissionsenglish</code> 建议使用驼峰命名（如 <code>myApp</code>），并请记住这个值。</li>
      </ul>
    </el-card>

    <el-card shadow="never" class="step-card">
      <div slot="header"><b>第二步：注册视图开关</b></div>
      <p>在 <code>/src/store/modules/control.js</code> 的 <code>state</code> 中，添加对应的布尔值开关，键名即为上一步的 <code>permissionsenglish</code> 值。</p>
      <div class="code-block">myApp: false</div>
    </el-card>

    <el-card shadow="never" class="step-card">
      <div slot="header"><b>第三步：创建窗口组件</b></div>
      <p>在 <code>/src/components/Function/</code> 目录下创建对应的 <code>.vue</code> 文件（可复制 <code>docCenter.vue</code> 结构）。</p>
      <p>确保组件内部的 <code>ItemName</code> 数据属性与权限 key 保持一致。</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "addModule",
  props: {
    menu: '',
  }
}
</script>

<style scoped="scoped">
.doc-content { padding: 10px; }
.doc-content h1 { color: #2c3e50; font-size: 1.5rem; }
.step-card { margin-bottom: 20px; border: 1px solid #ebeef5; }
.code-block { background: #f4f4f5; padding: 10px; border-radius: 4px; font-family: monospace; color: #409EFF; }
</style>
