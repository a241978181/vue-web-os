<!--模块的标题栏-->
<template>
  <div class="BTL">
    <ButtonGroup>
      <Button @click="$emit('openMenu',item,index)" :ghost="indexButton==index?false:true" v-for="(item,index) in permissionsList"  :type="item.color">
        <Icon :type="item.icon" />
        {{item.permissionsname}}
      </Button>
    </ButtonGroup>
  </div>
</template>

<script>
export default {
  name: "FuctionTitle",
  props: {
    permissionsList:'',
    indexButton:''
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