<template>
  <div id="view">
    <h3>按钮介绍</h3>
    <br/>
    <span>
      因为本项目的特殊性,elementui中的部分按钮颜色发生了转变，我将这几个颜色转变的按钮列出来，<b>未列出的均不受影响</b>，iview的所有按钮组件都不受影响。
    </span>
    <br/>
    <br/>
    <el-row>
      <el-button type="primary">主要按钮</el-button>

      <el-button type="primary" plain>主要按钮</el-button>
    </el-row>

  </div>
</template>
<script>
  export default {
    name: "documentCenter",
    props: {
      menu: '',
    },
    components: {},
    data() {
      return {}
    },
    methods: {

    },
    mounted() {
    }
  }
</script>

<style scoped="scoped">
    #view {
        width: 100%;
        height: 100%;
        padding: 0px;
        margin: 0px;
        margin-top: 0.9375rem;
    }
</style>
