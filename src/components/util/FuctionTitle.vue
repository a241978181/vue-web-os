<template>
  <div class="BTL" :class="{'theme-dark-tab': isDarkTheme}">
    <div class="custom-tabs">
      <div 
        v-for="(item,index) in permissionsList" 
        :key="index"
        v-if="!item.hidden"
        class="custom-tab-item"
        :class="{ 'is-active': indexButton == item.code }"
        @click="$emit('openMenu',item,item.code)"
      >
        <i :class="item.icon"></i>
        <span>{{ $i18n.locale === 'en' ? (item.permissionsnameen || item.permissionsname) : item.permissionsname }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FuctionTitle",
  props: {
    permissionsList:'',
    indexButton:'',
  },
  computed: {
    isDarkTheme() {
      return this.$store.state.settings.isDarkTheme;
    }
  }
}
</script>

<style scoped>
.BTL {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px;
  margin-left: 10px;
}

.custom-tabs {
  display: inline-flex;
  background: #f1f3f5;
  border-radius: 6px;
  padding: 4px;
  border: 1px solid #e9ecef;
}
.theme-dark-tab .custom-tabs {
  background: rgba(40, 40, 48, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: none;
}

.custom-tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  margin: 0 2px;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}
.theme-dark-tab .custom-tab-item {
  color: #e4e7ed;
}

.custom-tab-item i {
  margin-right: 6px;
  font-size: 14px;
  opacity: 0.8;
  transition: transform 0.2s;
}

.custom-tab-item:hover {
  color: #7367f0;
  background: rgba(115, 103, 240, 0.05);
}
.theme-dark-tab .custom-tab-item:hover {
  color: #a39cf4;
  background: rgba(115, 103, 240, 0.1);
}
.custom-tab-item:hover i {
  transform: scale(1.1);
}

.custom-tab-item.is-active {
  background: #ffffff;
  color: #7367f0;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.theme-dark-tab .custom-tab-item.is-active {
  background: #3e3e4a;
  color: #ffffff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}

.custom-tab-item span {
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  vertical-align: middle;
}
.custom-tab-item.is-active i {
  opacity: 1;
}
</style>
