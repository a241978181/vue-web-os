<template>
	<div class="big" id="big" :class="{'theme-dark': isDarkTheme}" @contextmenu="showMenu">
		<div v-show="menuVisible" class="custom-context-menu" :style="{left: contextMenuData.axis.x + 'px', top: contextMenuData.axis.y + 'px'}">
			<ul>
				<li v-for="item in contextMenuData.menulists" :key="item.fnHandler" @click.stop="handleContextMenuCommand(item.fnHandler)">
					<i :class="item.icoName"></i>
					<span>{{ item.btnName }}</span>
				</li>
			</ul>
		</div>
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
          <!-- 系统设置 -->
          <Settings></Settings>
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



	</div>
</template>
<script>
	import Main from "@/components/Main/Main";
	import Notes from "@/components/component/Notes";
  import Wallpaper from "@/components/component/wallpaper";
  import Settings from "@/components/component/Settings";
	import Task from "@/components/Main/Task";
	import Start from "@/components/Main/Start";
	export default {
		name: 'layout',
		components: {
			Main,
			Notes,
			Task,
			Start,
      Wallpaper,
      Settings,
		},
		data() {
			return {
				menuVisible: false,
				// contextmenu data (菜单数据)
				contextMenuData: {
					menuName: 'demo',
					axis: { x: null, y: null },
					menulists: []
				}
			}
		},
		computed: {
			// 是否深色模式
			isDarkTheme() {
				return this.$store.state.settings.isDarkTheme;
			},
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
				
				this.menuVisible = true;
				
				// 实时更新支持国际化
				this.contextMenuData.menulists = [{
					fnHandler: 'showUser',
					icoName: 'el-icon-user-solid',
					btnName: this.$t('m.layout.userInfo')
				}, {
					fnHandler: 'shuaXin',
					icoName: 'el-icon-refresh',
					btnName: this.$t('m.layout.refresh')
				}, {
					fnHandler: 'refresh',
					icoName: 'el-icon-view',
					btnName: this.$t('m.layout.showDesktop')
				}, {
					fnHandler: 'showWallpaper',
					icoName: 'el-icon-s-marketing',
					btnName: this.$t('m.layout.wallpaper')
				}, {
					fnHandler: 'showSettings',
					icoName: 'el-icon-setting',
					btnName: this.$t('m.layout.settings')
				}];

				// Get the current location
				this.contextMenuData.axis = {
					x,
					y
				}
				this.$nextTick(() => {
					const menu = document.querySelector('.custom-context-menu');
					if (menu) {
						let newX = x;
						let newY = y;
						const menuWidth = menu.offsetWidth;
						const menuHeight = menu.offsetHeight;
						const max_width = document.documentElement.clientWidth || window.innerWidth;
						const max_height = document.documentElement.clientHeight || window.innerHeight;
						
						if (newX + menuWidth > max_width) {
							newX = max_width - menuWidth - 5;
						}
						
						if (newY + menuHeight > max_height) {
							newY = max_height - menuHeight - 5; // Reserve 5px margin
						}
						
						this.contextMenuData.axis = {
							x: newX,
							y: newY
						};
					}
				});
			},
			// 路由方法分发
			handleContextMenuCommand(fnHandler) {
				this.menuVisible = false;
				if (typeof this[fnHandler] === 'function') {
					this[fnHandler]();
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
      //右键--显示系统设置
      showSettings(){
        this.$store.commit("setTrueVB","settingsViewBool");
      },
			//鼠标左键点击
			danji() {
				this.menuVisible = false;
				if (this.startInformationViewBool) {
					this.$store.commit("setFalseSIVB");
				}
			},
			// 关闭右键桌面弹窗
			closeDesktopMenu() {
				if(this.menuVisible) this.menuVisible = false;
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
			this.updateImae();
			document.addEventListener('click', this.closeDesktopMenu);
		},
		beforeDestroy() {
			document.removeEventListener('click', this.closeDesktopMenu);
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

	.custom-context-menu {
		position: absolute;
		z-index: 9999;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 10px;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
		padding: 8px 0;
		min-width: 160px;
		animation: menuFadeIn 0.2s ease;
	}

	@keyframes menuFadeIn {
		from { opacity: 0; transform: scale(0.95); }
		to { opacity: 1; transform: scale(1); }
	}

	.custom-context-menu ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.custom-context-menu li {
		padding: 10px 20px;
		display: flex;
		align-items: center;
		cursor: pointer;
		transition: all 0.2s;
		color: #333;
		font-size: 14px;
		font-weight: 500;
	}
	.custom-context-menu li:hover {
		background: rgba(115, 103, 240, 0.1);
		color: #7367f0;
	}
	.custom-context-menu li i {
		margin-right: 12px;
		font-size: 16px;
		width: 20px;
		text-align: center;
		color: #555;
		transition: color 0.2s;
	}
	.custom-context-menu li:hover i {
		color: #7367f0;
	}

	/* 深色模式右键菜单 */
	.theme-dark .custom-context-menu {
		background: rgba(45, 45, 55, 0.85);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
	.theme-dark .custom-context-menu li {
		color: #e4e7ed;
	}
	.theme-dark .custom-context-menu li i {
		color: #a0a5b3;
	}
	.theme-dark .custom-context-menu li:hover {
		background: rgba(115, 103, 240, 0.2);
		color: #7367f0;
	}
	.theme-dark .custom-context-menu li:hover i {
		color: #7367f0;
	}
</style>
