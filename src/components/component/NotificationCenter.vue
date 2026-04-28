<template>
  <el-drawer
    :visible.sync="drawerVisible"
    direction="rtl"
    size="360px"
    :modal="true"
    :append-to-body="true"
    :show-close="false"
    :wrapperClosable="true"
    custom-class="notification-drawer"
  >
    <template slot="title">
      <div class="nc-header">
        <div class="nc-header-left">
          <i class="fa fa-bell nc-header-icon"></i>
          <span class="nc-title">{{ $t('m.notification.title') }}</span>
          <span v-if="unreadCount > 0" class="nc-badge-inline">{{ unreadCount }}</span>
        </div>
        <div class="nc-header-actions">
          <el-tooltip :content="$t('m.notification.markAllRead')" placement="bottom">
            <button class="nc-action-btn" @click="markAllRead" :disabled="unreadCount === 0">
              <i class="el-icon-finished"></i>
            </button>
          </el-tooltip>
          <el-tooltip :content="$t('m.notification.clearAll')" placement="bottom">
            <button class="nc-action-btn nc-action-danger" @click="clearAll" :disabled="notifications.length === 0">
              <i class="fa fa-trash"></i>
            </button>
          </el-tooltip>
        </div>
      </div>
    </template>

    <div class="nc-body">
      <div class="nc-list" v-if="notifications.length > 0">
        <transition-group name="nc-item-anim" tag="div">
          <div v-for="item in notifications" :key="item.id" class="nc-item" :class="{ 'nc-item--unread': !item.read }" @click="markRead(item.id)">
            <div class="nc-item-icon" :class="'nc-type--' + item.type">
              <i :class="typeIconMap[item.type]"></i>
            </div>
            <div class="nc-item-content">
              <div class="nc-item-title">{{ item.title }}</div>
              <div class="nc-item-message">{{ item.message }}</div>
              <div class="nc-item-time"><i class="el-icon-time"></i> {{ item.time }}</div>
            </div>
            <button class="nc-item-close" @click.stop="removeNotification(item.id)"><i class="el-icon-close"></i></button>
          </div>
        </transition-group>
      </div>

      <div class="nc-empty" v-else>
        <i class="fa fa-bell-slash nc-empty-icon"></i>
        <p>{{ $t('m.notification.empty') }}</p>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'NotificationCenter',
  props: {
    visible: { type: Boolean, default: false }
  },
  data() {
    return {
      typeIconMap: { success: 'el-icon-success', warning: 'el-icon-warning', info: 'el-icon-info', error: 'el-icon-error' }
    };
  },
  computed: {
    drawerVisible: {
      get() { return this.visible; },
      set(val) { this.$emit('update:visible', val); }
    },
    notifications() { return this.$store.state.notification.notifications; },
    unreadCount() { return this.$store.getters['notification/unreadCount']; }
  },
  methods: {
    markRead(id) { this.$store.commit('notification/MARK_READ', id); },
    markAllRead() { this.$store.commit('notification/MARK_ALL_READ'); },
    removeNotification(id) { this.$store.commit('notification/REMOVE_NOTIFICATION', id); },
    clearAll() { this.$store.commit('notification/CLEAR_ALL'); }
  }
};
</script>

<style scoped>
.nc-header { display:flex; align-items:center; justify-content:space-between; width:100%; }
.nc-header-left { display:flex; align-items:center; gap:8px; }
.nc-header-icon { font-size:18px; color:#7367f0; }
.nc-title { font-size:16px; font-weight:700; color:#1a1a2e; }
.nc-badge-inline { display:inline-flex; align-items:center; justify-content:center; min-width:20px; height:20px; padding:0 6px; border-radius:10px; background:linear-gradient(135deg,#ff6b6b,#ee5a24); color:#fff; font-size:11px; font-weight:700; }
.nc-header-actions { display:flex; gap:4px; }
.nc-action-btn { width:32px; height:32px; border:none; border-radius:8px; background:rgba(115,103,240,0.08); color:#7367f0; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; transition:all 0.2s; }
.nc-action-btn:hover:not(:disabled) { background:rgba(115,103,240,0.18); transform:scale(1.05); }
.nc-action-btn:disabled { opacity:0.35; cursor:not-allowed; }
.nc-action-danger { background:rgba(245,108,108,0.08); color:#f56c6c; }
.nc-action-danger:hover:not(:disabled) { background:rgba(245,108,108,0.18); }

.nc-body { padding:0 16px 16px; height:100%; display:flex; flex-direction:column; overflow:hidden; }

.nc-list { flex:1; overflow-y:auto; padding-right:4px; }
.nc-list::-webkit-scrollbar { width:4px; }
.nc-list::-webkit-scrollbar-thumb { background:rgba(0,0,0,0.12); border-radius:4px; }

.nc-item { display:flex; align-items:flex-start; padding:14px; margin-bottom:8px; border-radius:12px; background:rgba(0,0,0,0.015); border:1px solid rgba(0,0,0,0.04); cursor:pointer; transition:all 0.25s; position:relative; }
.nc-item:hover { background:rgba(115,103,240,0.04); border-color:rgba(115,103,240,0.12); transform:translateX(-2px); }
.nc-item--unread { background:rgba(115,103,240,0.04); border-left:3px solid #7367f0; }
.nc-item--unread::after { content:''; position:absolute; top:8px; right:8px; width:8px; height:8px; border-radius:50%; background:#7367f0; box-shadow:0 0 6px rgba(115,103,240,0.5); animation:nc-pulse 2s infinite; }
@keyframes nc-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.8)} }

.nc-item-icon { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; margin-right:12px; }
.nc-type--success { background:rgba(103,194,58,0.12); color:#67c23a; }
.nc-type--warning { background:rgba(230,162,60,0.12); color:#e6a23c; }
.nc-type--info { background:rgba(115,103,240,0.12); color:#7367f0; }
.nc-type--error { background:rgba(245,108,108,0.12); color:#f56c6c; }

.nc-item-content { flex:1; min-width:0; }
.nc-item-title { font-size:13px; font-weight:700; color:#1a1a2e; margin-bottom:4px; }
.nc-item-message { font-size:12px; color:#64748b; line-height:1.5; margin-bottom:6px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.nc-item-time { font-size:11px; color:#94a3b8; display:flex; align-items:center; gap:4px; }
.nc-item-close { position:absolute; top:10px; right:10px; width:22px; height:22px; border:none; border-radius:6px; background:transparent; color:#94a3b8; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:12px; opacity:0; transition:all 0.2s; }
.nc-item:hover .nc-item-close { opacity:1; }
.nc-item-close:hover { background:rgba(245,108,108,0.12); color:#f56c6c; }

.nc-empty { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#94a3b8; gap:12px; }
.nc-empty-icon { font-size:48px; opacity:0.3; }
.nc-empty p { font-size:14px; margin:0; }

.nc-item-anim-enter-active { transition:all 0.35s cubic-bezier(0.16,1,0.3,1); }
.nc-item-anim-leave-active { transition:all 0.25s ease-in; }
.nc-item-anim-enter { opacity:0; transform:translateX(30px); }
.nc-item-anim-leave-to { opacity:0; transform:translateX(-30px); }
.nc-item-anim-move { transition:transform 0.3s; }
</style>

<style>
/* 防止 drawer 打开时推动页面布局 */
body.el-popup-parent--hidden { padding-right: 0 !important; overflow: hidden !important; }
.notification-drawer .el-drawer__header { padding:16px 20px; margin-bottom:0; border-bottom:1px solid rgba(0,0,0,0.06); background:linear-gradient(180deg,rgba(115,103,240,0.03),transparent); }
.notification-drawer .el-drawer__body { overflow:hidden; }
.theme-dark .notification-drawer { background:rgba(28,28,38,0.98) !important; }
.theme-dark .notification-drawer .el-drawer__header { border-bottom:1px solid rgba(255,255,255,0.08); }
.theme-dark .nc-title { color:#e4e7ed !important; }
.theme-dark .nc-item { background:rgba(255,255,255,0.03); border-color:rgba(255,255,255,0.06); }
.theme-dark .nc-item:hover { background:rgba(115,103,240,0.08); border-color:rgba(115,103,240,0.2); }
.theme-dark .nc-item--unread { background:rgba(115,103,240,0.08); }
.theme-dark .nc-item-title { color:#e4e7ed !important; }
.theme-dark .nc-item-message { color:#8b92a5 !important; }
.theme-dark .nc-action-btn { background:rgba(115,103,240,0.12); color:#8b83f5; }
.theme-dark .nc-action-danger { background:rgba(245,108,108,0.12); color:#f78989; }
.theme-dark .nc-empty { color:#5a5e6e; }
</style>
