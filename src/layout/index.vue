<template>
	<div class="big" @contextmenu="showMenu">
		<vue-context-menu :contextMenuData="contextMenuData" @showUser="showUser" @refresh="refresh" @shuaXin="shuaXin"></vue-context-menu>
		<!-- 桌面 -->
		<div class="layout">
			<!-- 桌面主体 -->
			<div class="layout-up" @click="danji()">
				<!-- 主体左边 -->
				<div style="width: 100%;display: flex;flex-direction: column;">
					<!-- 主体程序 -->
					<Main></Main>
				</div>
				<!-- 主体右边 -->
				<div style="width: 650px;">
					<!-- 便签 -->
					<Notes></Notes>
				</div>
			</div>
			<div class="layout-down">
				<div style="width: 100%;height: 0.5rem;">
					<Start></Start>
				</div>
				<div style="width: 100%;height: 2.5rem;">
					<Task></Task>
				</div>
			</div>
			<!-- 桌面下方任务栏整体 -->

		</div>



		<!-- 页脚 -->
		<!-- <Footer></Footer> -->
	</div>
</template>
<script>
	import Footer from "@/components/Footer";
	import Main from "@/components/Main/Main";
	import Notes from "@/components/Main/Notes";
	import Task from "@/components/Main/Task";
	import Start from "@/components/Main/Start";
	export default {
		name: 'layout',
		components: {
			Footer,
			Main,
			Notes,
			Task,
			Start,
		},
		data() {
			return {
				// contextmenu data (菜单数据)
				contextMenuData: {
					// the contextmenu name(@1.4.1 updated)
					menuName: 'demo',
					// The coordinates of the display(菜单显示的位置)
					axis: {
						x: null,
						y: null
					},
					// Menu options (菜单选项)
					menulists: [{
						fnHandler: 'showUser', // Binding events(绑定事件)
						icoName: 'el-icon-user-solid', // icon (icon图标 )
						btnName: '个人信息' // The name of the menu option (菜单名称)
					}, {
						fnHandler: 'shuaXin', // 刷新
						icoName: 'el-icon-refresh',
						btnName: '刷新' //
					}, {
						fnHandler: 'refresh', // 显示桌面
						icoName: 'el-icon-view',
						btnName: '显示桌面' //
					}, ]
				}
			}
		},
		computed: {
			//判断是否展示该面板
			startInformationViewBool: {
				get() {
					return this.$store.state.control.startInformationViewBool;
				},
				set(v) {
					this.$store.commit("setFalseSIVB");
				}
			}
		},
		methods: {
			//整蛊--刷新
			shuaXin() {
				location.reload(false)
			},
			//显示桌面
			refresh() {
				this.$store.commit("refresh");
			},
			//显示右键菜单
			showMenu() {
				event.preventDefault()
				var x = event.clientX
				var y = event.clientY
				// Get the current location
				this.contextMenuData.axis = {
					x,
					y
				}
			},
			//右键--显示桌面
			showUser() {
				this.$store.commit("setTruePIVB");
			},
			//鼠标左键点击
			danji() {
				if (this.startInformationViewBool) {
					this.$store.commit("setFalseSIVB");
				}
			}

		},
		mounted() {
			if(localStorage.getItem("token")==null){
				this.$router.push({path:'/signin'})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.big {
		display: flex;
		height: 100%;
		background: url(https://s2.ax1x.com/2020/02/18/3ivxaj.jpg) 0 0 no-repeat;
		background-size: 100% 100%;
		padding: 0;
		margin: 0;
	}

	.layout {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

	}

	.layout .layout-up {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.layout .layout-down {
		width: 100%;
		height: 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
