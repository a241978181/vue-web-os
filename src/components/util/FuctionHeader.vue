<!--模块的头部-->
<template>
  <div  style="width: 100%;display: flex;align-items: center;justify-content:space-between;">
  <div style="width: 50%;display: flex;align-items: center;">
    <Icon size="25" :type="menu.icon" style="margin: 0.5rem;" />
    <span style="color: white;"><b>{{menu.permissionsname}}</b></span>
  </div>
  <div style="width: 90px;display: flex;align-items: center;justify-content: space-between">
    <Button size="large" type="text" ghost  @click="$emit('mini')" icon="md-remove"></Button>
    <Button size="large" type="text" ghost v-show="!fullscreen" @click="$emit('big')" icon="ios-expand"></Button>
    <Button size="large" type="text" ghost v-show="fullscreen" @click="$emit('small')" icon="md-expand"></Button>
    <Button size="large" type="text" ghost @click="$emit('closeView')" icon="md-close"></Button>
  </div>
  </div>
</template>

<script>
import allComps from "@/components/Menu/cloudDisk";
import {getPermissionsList} from "@/utils/permissions";

export default {
  name: "FuctionHeader",
  props: {
    fullscreen: '',
    menu:'',
  },
  data() {
    return {
    }
  },
  methods:{
  }
}

</script>

<style scoped>

</style>