import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

// 登录
const Signin = () => import("@/views/signin")
const Notfound = () => import("@/views/404")
// APP页面
const Layout = () => import("@/layout")

// 不需要鉴权的白名单路由
const whiteList = ['/signin', '/401', '/404']

const router = new Router({
	mode: 'hash',
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

// 路由守卫：统一鉴权 + 自动修改页面标题
router.beforeEach((to, from, next) => {
	// 自动化修改页面标签的 title
	if (to.meta && to.meta.title) {
		document.title = to.meta.title;
	}
	// 鉴权判断
	if (localStorage.getItem('token')) {
		// 已登录，如果要去登录页则重定向到首页
		if (to.path === '/signin') {
			next('/layout')
		} else {
			next()
		}
	} else {
		// 未登录，白名单路由直接放行，否则跳转登录页
		if (whiteList.includes(to.path)) {
			next()
		} else {
			next('/signin')
		}
	}
});

export default router;
