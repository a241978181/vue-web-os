/**
 * $notify 代理插件
 * 包装 Element UI 的 $notify，使每次调用时自动将消息写入 Vuex Store 留存。
 * 需在 Vue.use(ElementUI) 之后、new Vue() 之前安装。
 */
import store from '@/store';

const notifyProxy = {
  install(Vue) {
    // 保存原始的 $notify
    const originalNotify = Vue.prototype.$notify;

    // 替换为包装函数
    Vue.prototype.$notify = function (options) {
      // 兼容字符串形式调用
      if (typeof options === 'string') {
        options = { message: options };
      }

      // 将消息写入 Vuex 通知中心
      store.commit('notification/ADD_NOTIFICATION', {
        title: options.title || '系统通知',
        message: typeof options.message === 'string' ? options.message : (options.message || ''),
        type: options.type || 'info'
      });

      // 调用原始 $notify 展示 Element UI 通知弹窗
      if (originalNotify) {
        return originalNotify.call(this, options);
      }
    };

    // 同样代理静态方法（$notify.success / warning / info / error）
    ['success', 'warning', 'info', 'error'].forEach(type => {
      Vue.prototype.$notify[type] = function (options) {
        if (typeof options === 'string') {
          options = { message: options };
        }
        options.type = type;
        return Vue.prototype.$notify.call(this, options);
      };
    });
  }
};

export default notifyProxy;
