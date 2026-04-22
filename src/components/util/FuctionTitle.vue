<template>
  <div class="BTL" :class="{'theme-dark-tab': isDarkTheme}">
    <div class="scroll-tabs-wrapper">
      <!-- 左箭头 -->
      <div
        v-show="showLeftArrow"
        class="scroll-arrow scroll-arrow-left"
        @click="scrollLeft"
      >
        <i class="el-icon-arrow-left"></i>
      </div>
      <!-- 可滚动的 Tab 容器 -->
      <div ref="scrollContainer" class="scroll-container" @wheel.prevent="onWheel">
        <div ref="scrollInner" class="custom-tabs">
          <div
            v-for="(item,index) in permissionsList"
            :key="index"
            v-if="!item.hidden"
            class="custom-tab-item"
            :class="{ 'is-active': indexButton == item.code }"
            @click="handleTabClick(item)"
          >
            <i :class="item.icon"></i>
            <span>{{ $i18n.locale === 'en' ? (item.permissionsnameen || item.permissionsname) : item.permissionsname }}</span>
          </div>
        </div>
      </div>
      <!-- 右箭头 -->
      <div
        v-show="showRightArrow"
        class="scroll-arrow scroll-arrow-right"
        @click="scrollRight"
      >
        <i class="el-icon-arrow-right"></i>
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
  data() {
    return {
      showLeftArrow: false,
      showRightArrow: false,
      scrollStep: 200,
    };
  },
  computed: {
    isDarkTheme() {
      return this.$store.state.settings.isDarkTheme;
    }
  },
  methods: {
    // 点击 Tab
    handleTabClick(item) {
      this.$emit('openMenu', item, item.code);
      // 点击后自动将该 tab 滚动到可视区域
      this.$nextTick(function() {
        this.scrollActiveIntoView(item.code);
      });
    },
    // 向左滚动
    scrollLeft() {
      var container = this.$refs.scrollContainer;
      if (container) {
        container.scrollBy({ left: -this.scrollStep, behavior: 'smooth' });
      }
    },
    // 向右滚动
    scrollRight() {
      var container = this.$refs.scrollContainer;
      if (container) {
        container.scrollBy({ left: this.scrollStep, behavior: 'smooth' });
      }
    },
    // 鼠标滚轮横向滚动
    onWheel(e) {
      var container = this.$refs.scrollContainer;
      if (container) {
        container.scrollLeft += e.deltaY > 0 ? 60 : -60;
      }
    },
    // 检查是否需要显示箭头
    checkArrows() {
      var container = this.$refs.scrollContainer;
      if (!container) {
        return;
      }
      var scrollLeft = container.scrollLeft;
      var scrollWidth = container.scrollWidth;
      var clientWidth = container.clientWidth;
      // 左箭头：滚动了才显示
      this.showLeftArrow = scrollLeft > 1;
      // 右箭头：还有内容未显示才显示
      this.showRightArrow = scrollLeft + clientWidth < scrollWidth - 1;
    },
    // 将激活的 tab 滚动到可视区域
    scrollActiveIntoView(code) {
      var container = this.$refs.scrollContainer;
      var inner = this.$refs.scrollInner;
      if (!container || !inner) {
        return;
      }
      var tabs = inner.querySelectorAll('.custom-tab-item');
      for (var i = 0; i < tabs.length; i++) {
        // 通过文本匹配或索引定位
        var tab = tabs[i];
        if (tab.classList.contains('is-active')) {
          var tabLeft = tab.offsetLeft;
          var tabWidth = tab.offsetWidth;
          var containerLeft = container.scrollLeft;
          var containerWidth = container.clientWidth;
          // 如果 tab 在左侧不可见
          if (tabLeft < containerLeft) {
            container.scrollTo({ left: tabLeft - 10, behavior: 'smooth' });
          }
          // 如果 tab 在右侧不可见
          else if (tabLeft + tabWidth > containerLeft + containerWidth) {
            container.scrollTo({ left: tabLeft + tabWidth - containerWidth + 10, behavior: 'smooth' });
          }
          break;
        }
      }
    }
  },
  mounted() {
    var self = this;
    this.$nextTick(function() {
      self.checkArrows();
      // 监听滚动事件来动态更新箭头
      if (self.$refs.scrollContainer) {
        self.$refs.scrollContainer.addEventListener('scroll', self.checkArrows);
      }
      // 使用 ResizeObserver 监听容器自身尺寸变化（窗口拖拽缩放、浏览器缩放等）
      if (typeof ResizeObserver !== 'undefined' && self.$refs.scrollContainer) {
        self._resizeObserver = new ResizeObserver(function() {
          self.checkArrows();
        });
        self._resizeObserver.observe(self.$refs.scrollContainer);
      }
    });
    // 兜底：监听浏览器窗口尺寸变化
    this._resizeHandler = function() {
      self.checkArrows();
    };
    window.addEventListener('resize', this._resizeHandler);
  },
  updated() {
    this.$nextTick(function() {
      this.checkArrows();
    });
  },
  beforeDestroy() {
    if (this.$refs.scrollContainer) {
      this.$refs.scrollContainer.removeEventListener('scroll', this.checkArrows);
    }
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    if (this._resizeHandler) {
      window.removeEventListener('resize', this._resizeHandler);
    }
  }
}
</script>

<style scoped>
.BTL {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px;
  margin-left: 10px;
}

.scroll-tabs-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  position: relative;
}

/* 滚动容器 */
.scroll-container {
  overflow: hidden;
  flex: 1;
  min-width: 0;
}

.custom-tabs {
  display: inline-flex;
  background: #f1f3f5;
  border-radius: 6px;
  padding: 4px;
  border: 1px solid #e9ecef;
  white-space: nowrap;
  flex-wrap: nowrap;
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
  white-space: nowrap;
  flex-shrink: 0;
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

/* 左右滚动箭头 */
.scroll-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(115, 103, 240, 0.1);
  color: #7367f0;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.25s ease;
  font-size: 14px;
}
.scroll-arrow:hover {
  background: rgba(115, 103, 240, 0.25);
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(115, 103, 240, 0.2);
}
.scroll-arrow:active {
  transform: scale(0.95);
}
.scroll-arrow-left {
  margin-right: 6px;
}
.scroll-arrow-right {
  margin-left: 6px;
}

/* 深色模式箭头 */
.theme-dark-tab .scroll-arrow {
  background: rgba(255, 255, 255, 0.08);
  color: #a39cf4;
}
.theme-dark-tab .scroll-arrow:hover {
  background: rgba(115, 103, 240, 0.3);
  color: #c4bfff;
}
</style>
