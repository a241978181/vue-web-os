<template>
	<div class="big" id="big" :class="{'theme-dark': isDarkTheme}" @contextmenu="showMenu">
		<div v-show="menuVisible" class="custom-context-menu" :style="{left: contextMenuData.axis.x + 'px', top: contextMenuData.axis.y + 'px'}">
			<ul>
				<!-- 查看子菜单 -->
				<li class="has-submenu" @mouseenter="viewSubmenuVisible = true" @mouseleave="viewSubmenuVisible = false">
					<i class="el-icon-menu"></i>
					<span>{{ $t('m.layout.view') }}</span>
					<i class="submenu-arrow el-icon-arrow-right"></i>
					<div v-show="viewSubmenuVisible" class="context-submenu">
						<ul>
							<li @click.stop="setIconSize('large')" :class="{'is-active': currentIconSize === 'large'}">
								<i class="check-icon" :class="currentIconSize === 'large' ? 'el-icon-check' : ''"></i>
								<span>{{ $t('m.layout.largeIcons') }}</span>
							</li>
							<li @click.stop="setIconSize('medium')" :class="{'is-active': currentIconSize === 'medium'}">
								<i class="check-icon" :class="currentIconSize === 'medium' ? 'el-icon-check' : ''"></i>
								<span>{{ $t('m.layout.mediumIcons') }}</span>
							</li>
							<li @click.stop="setIconSize('small')" :class="{'is-active': currentIconSize === 'small'}">
								<i class="check-icon" :class="currentIconSize === 'small' ? 'el-icon-check' : ''"></i>
								<span>{{ $t('m.layout.smallIcons') }}</span>
							</li>
							<li class="menu-divider"></li>
							<li @click.stop="toggleWindowResize" :class="{'is-active': enableWindowResize}">
								<i class="check-icon" :class="enableWindowResize ? 'el-icon-check' : ''"></i>
								<span>{{ $t('m.settings.enableWindowResize') }}</span>
							</li>
						</ul>
					</div>
				</li>
				<li class="menu-divider"></li>
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
				viewSubmenuVisible: false,
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
			// 当前图标大小
			currentIconSize() {
				return this.$store.state.settings.desktopIconSize;
			},
			// 是否启用窗口缩放
			enableWindowResize() {
				return this.$store.state.settings.enableWindowResize;
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
					fnHandler: 'shuaXin',
					icoName: 'el-icon-refresh',
					btnName: this.$t('m.layout.refresh')
				}, {
					fnHandler: 'showUser',
					icoName: 'el-icon-user-solid',
					btnName: this.$t('m.layout.userInfo')
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

				const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
				if (isFullscreen) {
					this.contextMenuData.menulists.push({
						fnHandler: 'toggleFullscreen',
						icoName: 'el-icon-crop',
						btnName: this.$t('m.layout.exitFullscreen')
					});
				} else {
					this.contextMenuData.menulists.push({
						fnHandler: 'toggleFullscreen',
						icoName: 'el-icon-full-screen',
						btnName: this.$t('m.layout.fullscreen')
					});
				}

				// 模拟新通知菜单项
				this.contextMenuData.menulists.push({
					fnHandler: 'simulateNotification',
					icoName: 'fa fa-bell',
					btnName: this.$t('m.layout.simulateNotification')
				});

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
				// 设置动画原点为右键菜单的位置
				if (this.contextMenuData.axis.x != null) {
					document.documentElement.style.setProperty('--anim-origin-x', this.contextMenuData.axis.x + 'px');
					document.documentElement.style.setProperty('--anim-origin-y', this.contextMenuData.axis.y + 'px');
				}
				if (typeof this[fnHandler] === 'function') {
					this[fnHandler]();
				}
			},
			// 切换全屏显示
			toggleFullscreen() {
				const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
				if (isFullscreen) {
					if (document.exitFullscreen) { document.exitFullscreen(); }
					else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
					else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
					else if (document.msExitFullscreen) { document.msExitFullscreen(); }
				} else {
					const el = document.documentElement;
					if (el.requestFullscreen) { el.requestFullscreen(); }
					else if (el.webkitRequestFullscreen) { el.webkitRequestFullscreen(); }
					else if (el.mozRequestFullScreen) { el.mozRequestFullScreen(); }
					else if (el.msRequestFullscreen) { el.msRequestFullscreen(); }
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
			//右键--模拟新通知
			simulateNotification() {
				const isZh = this.$i18n.locale !== 'en';
				const pool = isZh ? [
					{ title: '系统升级提示', message: '系统将于今晚 22:00 进行例行维护升级，预计持续 30 分钟。', type: 'warning' },
					{ title: '报表导出完成', message: '《2026年Q1季度销售报表》已导出完成，请前往文件中心下载。', type: 'success' },
					{ title: '安全提醒', message: '检测到您的账号在新设备上登录，如非本人操作请及时修改密码。', type: 'error' },
					{ title: '新功能上线', message: '通知中心已上线！所有系统消息都会在这里留存。', type: 'info' },
					{ title: '审批提醒', message: '您有一条待审批的请假申请，请及时处理。', type: 'info' },
					{ title: '存储空间警告', message: '您的云盘存储空间已使用 85%，建议清理。', type: 'warning' },
					{ title: '任务完成', message: '数据迁移任务已完成，共处理 12,580 条记录。', type: 'success' },
					{ title: '系统错误', message: '邮件服务连接超时，部分邮件可能延迟送达。', type: 'error' },
				] : [
					{ title: 'System Upgrade', message: 'Scheduled maintenance at 10 PM tonight, ~30 min downtime.', type: 'warning' },
					{ title: 'Report Ready', message: 'Q1 2026 Sales Report exported and ready for download.', type: 'success' },
					{ title: 'Security Alert', message: 'New device login detected. Change password if unauthorized.', type: 'error' },
					{ title: 'New Feature', message: 'Notification Center is live! All messages retained here.', type: 'info' },
					{ title: 'Approval Needed', message: 'You have a pending leave request to review.', type: 'info' },
					{ title: 'Storage Warning', message: 'Cloud storage 85% full. Consider cleanup.', type: 'warning' },
					{ title: 'Task Complete', message: 'Data migration done. 12,580 records processed.', type: 'success' },
					{ title: 'System Error', message: 'Mail service timeout. Some emails may be delayed.', type: 'error' },
				];
				const msg = pool[Math.floor(Math.random() * pool.length)];
				this.$notify({ title: msg.title, message: msg.message, type: msg.type, duration: 4000 });
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
				if(this.menuVisible) {
					this.menuVisible = false;
					this.viewSubmenuVisible = false;
				}
			},
			// 设置图标大小
			setIconSize(size) {
				this.$store.commit('settings/SET_DESKTOP_ICON_SIZE', size);
				this.menuVisible = false;
				this.viewSubmenuVisible = false;
			},
			// 切换窗口缩放开关
			toggleWindowResize() {
				this.$store.commit('settings/SET_ENABLE_WINDOW_RESIZE', !this.enableWindowResize);
			},
      //修改桌面背景
      updateImae(){
			  let desktopBackground=localStorage.getItem("desktopBackground");
			  if (desktopBackground==null){
          desktopBackground='http://lhjf-pr.oss-cn-zhangjiakou.aliyuncs.com/img/20260416/102218/3e3e64a3393642dfa5d08b45a219a91f.jpg';
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
		background: url(http://lhjf-pr.oss-cn-zhangjiakou.aliyuncs.com/img/20260416/102218/3e3e64a3393642dfa5d08b45a219a91f.jpg) 0 0 no-repeat;
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

	/* 菜单分割线 */
	.menu-divider {
		height: 1px !important;
		padding: 0 !important;
		margin: 4px 10px !important;
		background: rgba(0, 0, 0, 0.08) !important;
		cursor: default !important;
		pointer-events: none;
	}
	.theme-dark .menu-divider {
		background: rgba(255, 255, 255, 0.1) !important;
	}

	/* 子菜单父级 */
	.has-submenu {
		position: relative;
	}
	.has-submenu .submenu-arrow {
		margin-left: auto;
		margin-right: 0;
		font-size: 12px;
		width: auto;
	}

	/* 子菜单面板 */
	.context-submenu {
		position: absolute;
		left: 100%;
		top: -8px;
		margin-left: 2px;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 10px;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
		padding: 8px 0;
		min-width: 150px;
		animation: menuFadeIn 0.15s ease;
	}
	.theme-dark .context-submenu {
		background: rgba(45, 45, 55, 0.85);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.context-submenu ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.context-submenu li {
		padding: 8px 16px 8px 10px;
		display: flex;
		align-items: center;
		cursor: pointer;
		transition: all 0.2s;
		color: #333;
		font-size: 13px;
		font-weight: 500;
	}
	.context-submenu li:hover {
		background: rgba(115, 103, 240, 0.1);
		color: #7367f0;
	}
	.theme-dark .context-submenu li {
		color: #e4e7ed;
	}
	.theme-dark .context-submenu li:hover {
		background: rgba(115, 103, 240, 0.2);
		color: #7367f0;
	}

	/* 勾选图标占位 */
	.context-submenu .check-icon {
		width: 18px;
		min-width: 18px;
		font-size: 13px;
		margin-right: 6px;
		text-align: center;
		color: #7367f0;
		transition: color 0.2s;
	}
	.context-submenu li.is-active {
		color: #7367f0;
		font-weight: 600;
	}
	.theme-dark .context-submenu li.is-active {
		color: #8b83f5;
	}
</style>
