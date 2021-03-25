import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);


// 登录
const Signin = () => import("@/views/signin")
const Notfound = () => import("@/views/404")
// // 默认页面
//  const Dashboard = () =>  import ("@/views/dashboard")
// APP页面
const Layout = () => import("@/layout")

const router = new Router({
	mode: 'hash',
	scrollBehavior: () => {
		history.pushState(null, null, document.URL)
	},
	routes: [{
			path: '/',
			redirect: '/signin',
		},
		// 首先是登录页的路由
		{
			path: "/signin",
			name: "Signin",
			meta: {
				title: "vue-web-os"
			},
			component: Signin
		},
		// // 默认页面
		// {
		//   path: "/dashboard",
		//   name: "Dashboard",
		//   meta: {
		//     title: "dashboard"
		//   },
		//   component: Dashboard
		// },
		//layout页面
		{
			path: "/layout",
			name: "Layout",
			meta: {
				title: "系统管理"
			},
			component: Layout
		},

		// 最后是404页面
		{
		  path: "*",
		  meta: {
		    title: "404"
		  },
		  component: Notfound
		}
	]
});

// 当一个导航触发时，全局的 before 钩子按照创建顺序调用。钩子是异步解析执行，此时导航在所有钩子 resolve 完之前一直处于等待中。
router.beforeEach((to, from, next) => {
	// 自动化修改页面标签的 title
	document.title = to.meta.title;
	next()
	// 如果已经登录，并且要去登录页，就不让TA去登录页，重定向到首页【目前有点问题】
	// if (to.path === "/signin" && localStorage.token) {
	//   next("/notes");
	// } else {
	//   next();
	// }
});
router.afterEach((to, from) => {
	history.pushState(null, null, location.protocol + '//' + location.host + '/#' + to.path)
})
export default router;
