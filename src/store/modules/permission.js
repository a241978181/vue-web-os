/**
 * 权限状态管理模块
 * 统一管理权限列表和用户信息，避免组件直接读写 localStorage
 */
const permission = {
  namespaced: true,
  state: {
    // 权限列表（原始平铺数组）
    permissionsList: [],
    // 用户信息
    userInfo: {}
  },
  getters: {
    /**
     * 按类型和父级ID过滤权限
     * @param {Number} type - 权限类型（1=模块, 2=子菜单）
     * @param {Number|null} parentId - 父级ID，null则不过滤
     */
    getByTypeAndParent: (state) => (type, parentId) => {
      return state.permissionsList.filter(item => {
        if (parentId != null) {
          return item.type === type && item.parentid === parentId;
        }
        return item.type === type;
      });
    }
  },
  mutations: {
    SET_PERMISSIONS(state, list) {
      state.permissionsList = list;
    },
    SET_USER_INFO(state, info) {
      state.userInfo = info;
    },
    CLEAR_ALL(state) {
      state.permissionsList = [];
      state.userInfo = {};
    }
  },
  actions: {
    /**
     * 从 localStorage 恢复权限数据（页面刷新时调用）
     */
    restoreFromStorage({ commit }) {
      const permissionsStr = localStorage.getItem('permissionsList');
      if (permissionsStr) {
        commit('SET_PERMISSIONS', JSON.parse(permissionsStr));
      }
      const userInfoStr = localStorage.getItem('userInfo');
      if (userInfoStr) {
        commit('SET_USER_INFO', JSON.parse(userInfoStr));
      }
    },
    /**
     * 登出：清空 Vuex + localStorage
     */
    logout({ commit }) {
      commit('CLEAR_ALL');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('permissionsList');
      localStorage.removeItem('token');
    }
  }
}

export default permission
