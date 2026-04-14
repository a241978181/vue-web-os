<!--模块的头部-->
<template>
  <div @dblclick="toggleFullscreen" style="display: flex;align-items: center;justify-content: space-between; width: 100%; height: 100%; user-select: none;">
  <div style="width: 50%;display: flex;align-items: center;">
    <i :class="menu.icon" style="font-size: 25px; margin: 0.5rem; color: white;"></i>
    <span style="color: white;"><b>{{ $te('m.menu.' + menu.permissionsenglish) ? $t('m.menu.' + menu.permissionsenglish) : menu.permissionsname }}</b></span>
  </div>
  <div style="display: flex;align-items: center;justify-content: flex-end; width: 140px;">
    <el-button type="text" style="color: white; font-size: 18px; padding: 0 5px;" @click="$emit('mini')" icon="el-icon-minus"></el-button>
    <el-button type="text" style="color: white; font-size: 18px; padding: 0 5px;" v-show="!fullscreen" @click="$emit('big')" icon="el-icon-full-screen"></el-button>
    <el-button type="text" style="color: white; font-size: 18px; padding: 0 5px;" v-show="fullscreen" @click="$emit('small')" icon="el-icon-copy-document"></el-button>
    <el-button type="text" style="color: white; font-size: 18px; padding: 0 5px;" @click="$emit('closeView')" icon="el-icon-close"></el-button>
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
  methods: {
    toggleFullscreen() {
      if (this.fullscreen) {
        this.$emit('small');
      } else {
        this.$emit('big');
      }
    }
  }
}

</script>

<style scoped>

</style>