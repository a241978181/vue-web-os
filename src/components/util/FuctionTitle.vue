<!--模块的标题栏-->
<template>
  <div class="BTL">
    <el-button-group>
      <el-button v-if="!item.hidden" @click="$emit('openMenu',item,item.permissionsenglish)" :plain="indexButton==item.permissionsenglish?false:true" v-for="(item,index) in permissionsList" :key="index"  :type="item.color">
        <i :class="item.icon"></i>
        {{item.permissionsname}}
      </el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: "FuctionTitle",
  props: {
    permissionsList:'',
    indexButton:'',
  },
}
</script>

<style scoped>
.BTL {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
