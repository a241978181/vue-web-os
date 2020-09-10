<template>
  <div id="view">
    <br/>
    <br/>
    <h3>新增模块</h3>
    <br/>
    <p><b>模块</b>是指桌面上的【技术解决】与【系统介绍】</p>
    <br/>
    <p><b>1.新增权限</b></p>
    <p>
      在[/src/mock/modules/common.js]中，向【获取权限元素组】中加入一个权限，权限的【parentid】字段应为<b style="color: red">0</b>。<b>并且请记住权限的英文名称也就是【permissionsenglish】的值。</b>
    </p>
    <br/>
    <p><b>2.注册模块</b></p>
    <p>在[/src/store/modules/control.js]中，向【state】中加入你的【面板展示键】<span>面板展示键为你权限中的英文名称，默认值为【false】</span></p>
    <br/>
    <p><b>3.创建模块</b></p>
    <p>在[/src/components/Function/]中，复制一个【cloudDisk.vue】的文件,名称为权限中的英文名称,之后将该页面中的这几个地方修改成为你权限中的英文名称。</p>
    <b style="color: red">点击下方图片可以放大查看</b>
    <div style="display: flex;align-items: center;width:1200px;height: 250px;">
      <el-image
          style="width: 250px; height: 150px;margin-right: 50px"
          :src="srcList[0]" :preview-src-list="srcList"
          :fit="scale-down"></el-image>
      <el-image
          style="width: 250px; height: 150px;margin-right: 50px"
          :src="srcList[1]" :preview-src-list="srcList"
          :fit="scale-down"></el-image>
      <el-image
          style="width: 250px; height: 150px;margin-right: 50px"
          :src="srcList[2]" :preview-src-list="srcList"
          :fit="scale-down"></el-image>
    </div>
  </div>
</template>

<script>
export default {
  name: "addModule",
  props: {
    menu: '',
  },
  data() {
    return {
      srcList: [
        'https://s1.ax1x.com/2020/09/08/wQyaXn.jpg',
        'https://s1.ax1x.com/2020/09/08/wQyU6s.jpg',
        'https://s1.ax1x.com/2020/09/08/wQyNlj.jpg',
      ]
    }
  },
  methods: {},
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
