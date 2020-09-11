<template>
	<div class="big" id="big" @contextmenu="showMenu">
		<vue-context-menu @showWallpaper="showWallpaper" :contextMenuData="contextMenuData" @showUser="showUser" @refresh="refresh" @shuaXin="shuaXin"></vue-context-menu>
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
					<!-- 个人信息 -->
					<Notes></Notes>
          <!-- 壁纸 -->
          <Wallpaper @updateImae="updateImae"></Wallpaper>
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
	import Notes from "@/components/component/Notes";
  import Wallpaper from "@/components/component/wallpaper";
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
      Wallpaper,
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
					}, {
            fnHandler: 'showWallpaper', // 显示桌面
            icoName: 'el-icon-s-marketing',
            btnName: '壁纸' //
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
			},
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
				var x = event.clientX+1;
				var y = event.clientY+1;
				// Get the current location
				this.contextMenuData.axis = {
					x,
					y
				}
			},
			//右键--显示个人信息
			showUser() {
				this.$store.commit("setTrueVB","personalInformationViewBool");
			},
      //右键--显示壁纸选项
      showWallpaper(){
        this.$store.commit("setTrueVB","wallpaperViewBool");
      },
			//鼠标左键点击
			danji() {
				if (this.startInformationViewBool) {
					this.$store.commit("setFalseSIVB");
				}
			},
      //修改桌面背景
      updateImae(){
			  let desktopBackground=localStorage.getItem("desktopBackground");
			  if (desktopBackground==null){
          desktopBackground='https://s1.ax1x.com/2020/09/11/wtunxK.jpg';
        }
        let big=document.getElementById('big');
        big.style.cssText="background: url("+desktopBackground+") 0 0 no-repeat;" +
            "background-size: 100% 100%;";
      }
		},
		mounted() {
			if(localStorage.getItem("token")==null){
				this.$router.push({path:'/signin'})
			}
			this.updateImae();
		}
	}
</script>
<style lang="scss" scoped>
	.big {
		display: flex;
		height: 100%;
		background: url(https://s1.ax1x.com/2020/09/11/wtunxK.jpg) 0 0 no-repeat;
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
