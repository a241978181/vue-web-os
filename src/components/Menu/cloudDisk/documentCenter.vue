<template>
  <div class="doc-content">
    <h1>🔘 按钮组件与主题色</h1>
    <p>本项目深度集成了 Element UI。由于多窗口系统的特殊性，我们对部分按钮的交互与色彩做了微调，以保证在半透明背景下的最佳视觉效果。</p>

    <el-alert title="样式提示" type="warning" :closable="false" show-icon style="margin: 15px 0;">
      未列出的原生按钮组件均不受影响。如果您使用了 iView 组件库，其按钮样式亦可完美兼容。
    </el-alert>

    <el-card shadow="never" class="step-card">
      <div slot="header"><b>主题色定制</b></div>
      <p>若需修改全局品牌色，请前往 <code>src/assets/scss/element-variables.scss</code> 修改 <code>$--color-primary</code> 变量：</p>
      <div class="code-block">$--color-primary: #7367f0; // 默认紫色</div>
    </el-card>

    <el-card shadow="never" class="step-card">
      <div slot="header"><b>按钮演示（保留项）</b></div>
      <el-row>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="primary" plain>简约按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
    name: "documentCenter",
    props: {
      menu: '',
      dataItem:''
    },
    methods: {
      isData(){
        if (this.dataItem){
          this.$message.success("您携带的参数name为："+this.dataItem.name)
        }
      }
    },
    mounted() {
      this.isData();
    }
}
</script>

<style scoped="scoped">
.doc-content { padding: 10px; }
.doc-content h1 { color: #2c3e50; font-size: 1.5rem; }
.step-card { margin-bottom: 20px; }
.code-block { background: #f4f4f5; padding: 10px; border-radius: 4px; font-family: monospace; color: #7367f0; }
</style>
