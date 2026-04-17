<template>
  <div @dblclick="toggleFullscreen" class="fuction-header-container" :class="{'theme-dark-header': isDarkTheme}">
  <div class="header-left">
    <i :class="menu.icon" class="header-icon"></i>
    <span class="header-title"><b>{{ $i18n.locale === 'en' ? (menu.permissionsnameen || menu.permissionsname) : menu.permissionsname }}</b></span>
  </div>
  <div class="header-right">
    <el-button type="text" class="header-action-btn" @click="handleMini" icon="el-icon-minus"></el-button>
    <el-button type="text" class="header-action-btn" v-show="!fullscreen" @click="$emit('big')" icon="el-icon-full-screen"></el-button>
    <el-button type="text" class="header-action-btn" v-show="fullscreen" @click="$emit('small')" icon="el-icon-copy-document"></el-button>
    <el-button type="text" class="header-action-btn close-btn" @click="handleClose" icon="el-icon-close"></el-button>
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
    // 设置关闭/最小化动画原点为任务栏对应图标
    setCloseAnimOrigin() {
      // 1. 尝试找到当前应用在任务栏上的图标
      if (this.menu && this.menu.code) {
        const iconEl = document.querySelector(`a[data-app-code="${this.menu.code}"]`);
        if (iconEl) {
          const rect = iconEl.getBoundingClientRect();
          document.documentElement.style.setProperty('--anim-origin-x', (rect.left + rect.width / 2) + 'px');
          document.documentElement.style.setProperty('--anim-origin-y', (rect.top + rect.height / 2) + 'px');
          return;
        }
      }
      
      // 2. 兜底方案：如果应用不在任务栏上，收回到屏幕底部正中央
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      document.documentElement.style.setProperty('--anim-origin-x', (vw / 2) + 'px');
      document.documentElement.style.setProperty('--anim-origin-y', vh + 'px');
    },
    handleMini() {
      this.setCloseAnimOrigin();
      this.$emit('mini');
    },
    handleClose() {
      this.setCloseAnimOrigin();
      this.$emit('closeView');
    },
    toggleFullscreen() {
      if (this.fullscreen) {
        this.$emit('small');
      } else {
        this.$emit('big');
      }
    }
  },
  computed: {
    isDarkTheme() {
      return this.$store.state.settings.isDarkTheme;
    }
  }
}

</script>

<style scoped>
.fuction-header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  user-select: none;
}
.header-left {
  width: 50%;
  display: flex;
  align-items: center;
}
.header-icon {
  font-size: 22px;
  margin: 0.5rem;
  color: #ffffff;
  transition: transform 0.3s;
  text-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.theme-dark-header .header-icon {
  text-shadow: none;
}
.header-title {
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.theme-dark-header .header-title {
  text-shadow: none;
}
.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 140px;
}
.header-action-btn {
  color: rgba(255,255,255,0.8);
  font-size: 18px;
  padding: 0 5px;
  transition: all 0.3s;
}
.header-action-btn:hover {
  color: #ffffff;
  transform: scale(1.1);
  text-shadow: 0 0 8px rgba(255,255,255,0.6);
}
.theme-dark-header .header-action-btn {
  color: #a0a5b3;
}
.theme-dark-header .header-action-btn:hover {
  color: #ff4d4f;
  text-shadow: none;
}
.close-btn:hover {
  color: #ffffff !important;
  background: #f56c6c;
  border-radius: 4px;
}
.theme-dark-header .close-btn:hover {
  color: #ffffff !important;
  background: transparent;
}
</style>