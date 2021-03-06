// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 必须在最开始引入垫片
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import http from "./http";
import i18n from "./lang";
//导入右键菜单组件
import VueContextMenu from 'vue-contextmenu'
Vue.use(VueContextMenu)
//引入viewUI
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);
// 引入全局工具函数
import * as utils from "./utils";
// 引入全局过滤器
import * as filters from '@/filters';
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
// import '@/filters'
import "font-awesome/scss/font-awesome.scss";
// 在入口处引入模拟的假数据
import "@/mock";
// 引入完整的饿了么组件库
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/scss/element-variables.scss";
import "@/assets/css/fonts.css";
Vue.use(ElementUI);
// 将http绑定到vue原型上
Vue.prototype.$http = http;
// 将公共汽车绑定到vue原型上
Vue.prototype.$bus = new Vue();
// Vue 的全局配置
Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
window.addEventListener('popstate', function() {
  history.pushState(null, null, document.URL)
})
