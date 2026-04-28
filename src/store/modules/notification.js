const notification = {
  namespaced: true,
  state: {
    // 通知列表
    notifications: []
  },
  getters: {
    // 未读通知数量
    unreadCount(state) {
      return state.notifications.filter(n => !n.read).length;
    }
  },
  mutations: {
    // 添加通知
    ADD_NOTIFICATION(state, payload) {
      const item = {
        id: Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        title: payload.title || '系统通知',
        message: payload.message || '',
        type: payload.type || 'info', // success / warning / info / error
        time: payload.time || new Date().toLocaleString(),
        read: payload.read || false
      };
      // 新消息插入到列表头部
      state.notifications.unshift(item);
    },
    // 标记单条已读
    MARK_READ(state, id) {
      const item = state.notifications.find(n => n.id === id);
      if (item) {
        item.read = true;
      }
    },
    // 全部标记已读
    MARK_ALL_READ(state) {
      state.notifications.forEach(n => {
        n.read = true;
      });
    },
    // 删除单条通知
    REMOVE_NOTIFICATION(state, id) {
      const idx = state.notifications.findIndex(n => n.id === id);
      if (idx !== -1) {
        state.notifications.splice(idx, 1);
      }
    },
    // 清空所有通知
    CLEAR_ALL(state) {
      state.notifications = [];
    }
  }
};

export default notification;
