<template>
	<div class="task" :class="{'theme-dark-task': isDarkTheme}">
		<!-- 自定义任务栏应用右键菜单 -->
		<div v-show="menuVisible" class="custom-task-menu" :style="{left: taskMenuAxis.x + 'px', bottom: '50px'}">
			<ul>
				<li @click.stop="closeCurrentTask">
					<i class="el-icon-circle-close"></i>
					<span>{{ $t('m.taskbar.closeApp') }}</span>
				</li>
			</ul>
		</div>

		<!-- 开始菜单 -->
		<div class="start-btn-container">
			<el-button @click="openStart()" size="large" type="text" icon="fa fa-windows" class="icon-btn start-icon"></el-button>
		</div>
		<!-- 任务主体 -->
		<div class="task-main">
			<div class="taskItem" v-for="task in taskList" :key="task.id">
				<a @click="open(task)" @contextmenu.prevent.stop="showTaskMenu($event, task)">
					<i class="icon-btn" :class="task.icon"></i>
					<span class="task-text"><b>{{ $te('m.menu.' + task.permissionsenglish) ? $t('m.menu.' + task.permissionsenglish) : task.permissionsname }}</b></span>
				</a>
			</div>
		</div>
		<!-- 时间与显示桌面 -->
		<div class="right-panel">
			<!-- 时间 -->
			<div class="indicators">
        <el-tooltip :content="$t('m.taskbar.batteryRest') + electricity.batteryLevel + '%'" placement="top-end">
          <el-button class="icon-btn xs-icon" size="large" type="text" :icon="electricity.batteryCharging?'fa fa-plug':electricity.batteryLevel<=30?'fa fa-battery-empty':'fa fa-battery-full'"></el-button>
        </el-tooltip>
        <el-tooltip :content="isNetwork ? $t('m.taskbar.wifiOn') : $t('m.taskbar.wifiOff')" placement="top-end">
          <el-button class="icon-btn xs-icon" size="large" type="text" :icon="isNetwork?'fa fa-wifi':'fa fa-exclamation-triangle'"></el-button>
        </el-tooltip>
        <div class="time-box">
          <span class="time-text">{{timeItem.date}}</span>
          <span class="time-text">{{timeItem.time}}</span>
        </div>
			</div>
			<!-- 显示桌面 -->
			<div @click="refresh()" class="show-desktop-btn"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Task",
		data() {
			return {
				menuVisible: false,
				taskMenuAxis: { x: 0 },
				currentTask: null,
        //电量信息
        electricity:{
          batteryCharging:false,
          batteryLevel:100
        },
        //时间信息
        timeItem:{
          time:new Date().toLocaleTimeString(),
          date:new Date().toLocaleDateString()
        },
        //是否联网
        isNetwork:false,
			}
		},
		computed: {
			//查看所有后台任务
			taskList: {
				get() {
					return this.$store.state.control.taskList;
				},
			},

			//判断是否展示该面板
			startInformationViewBool: {
				get() {
					return this.$store.state.control.startInformationViewBool;
				},
			},
			// 是否深色模式
			isDarkTheme() {
				return this.$store.state.settings.isDarkTheme;
			}
		},
		methods: {
			showTaskMenu(e, task) {
				this.menuVisible = true;
				this.taskMenuAxis.x = e.clientX;
				this.currentTask = task;
				this.$nextTick(() => {
					const menu = document.querySelector('.custom-task-menu');
					if (menu) {
						let newX = e.clientX;
						const menuWidth = menu.offsetWidth;
						const max_width = document.documentElement.clientWidth || window.innerWidth;
						
						if (newX + menuWidth > max_width) {
							newX = max_width - menuWidth - 5;
						}
						this.taskMenuAxis.x = newX;
					}
				});
			},
			closeCurrentTask() {
				if (this.currentTask) {
					this.$store.commit("setFalseVB", this.currentTask.permissionsenglish);
					this.$store.commit("deleteTaskList", this.currentTask);
					this.menuVisible = false;
					this.currentTask = null;
				}
			},
			closeMenu() {
				this.menuVisible = false;
			},
      //定时器
      timer(){
        let mythis=this;
        setInterval(() => {
          mythis.getTimeDate();
          mythis.getElectricity();
          mythis.getNetwork();
        },1000)
      },
      //查看是否联网
      getNetwork(){

        window.addEventListener("offline", function(e) {
        });

        window.addEventListener("online", function(e) {
        });
        this.isNetwork=window.navigator.onLine;
      },
      //获取日期与时间
      getTimeDate(){
        this.timeItem.date=new Date().toLocaleDateString();
        this.timeItem.time=new Date().toLocaleTimeString();
      },
      //获取当前电脑电量
      getElectricity(){
        let mythis=this;
        navigator.getBattery().then(function(battery) {
          // 是否正在充电，yes-充电
          mythis.electricity.batteryCharging=(battery.charging ? true : false);
          // 当前剩余电量
          mythis.electricity.batteryLevel=battery.level * 100 ;
          battery.addEventListener("chargingchange", function() {
          });
          battery.addEventListener("levelchange", function() {
          });
        });
      },
			//显示桌面
			refresh() {
				this.$store.commit("refresh");
			},
			//打开或关闭某一任务
			open(menu) {
				if (this.$store.state.control[menu.permissionsenglish]) {
					this.$store.commit("setFalseVB", menu.permissionsenglish);
				} else {
					this.$store.commit("setTrueVB", menu.permissionsenglish);
				}
			},
			//打开或关闭开始菜单
			openStart(){
				if (this.startInformationViewBool) {
					this.$store.commit("setFalseSIVB");
				} else{
					this.$store.commit("setTrueSIVB");
				}
			}

		},
		mounted() {
      this.timer();
			document.addEventListener('click', this.closeMenu);
    },
		beforeDestroy() {
			document.removeEventListener('click', this.closeMenu);
		}
	}
</script>

<style scoped="scoped">
	.task {
		height: 2.8rem;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* 浅色重色调 - 高饱和白色毛玻璃 */
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-top: 1px solid rgba(255, 255, 255, 0.6);
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
		position: relative;
		z-index: 3000;
		transition: all 0.3s ease;
	}

	.task.theme-dark-task {
		/* 深色重色调 - 沉浸黑色毛玻璃 */
		background: rgba(15, 15, 20, 0.95);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 -2px 15px rgba(0, 0, 0, 0.5);
	}

	/* 布局容器 */
	.start-btn-container {
		width: 50px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.task-main {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		overflow: hidden;
	}
	.right-panel {
		width: 190px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.indicators {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.show-desktop-btn {
		width: 10px;
		height: 100%;
		border-left: 1px solid rgba(0, 0, 0, 0.1);
		cursor: pointer;
		transition: background-color 0.2s;
	}
	.show-desktop-btn:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
	.theme-dark-task .show-desktop-btn {
		border-left: 1px solid rgba(255, 255, 255, 0.2);
	}
	.theme-dark-task .show-desktop-btn:hover {
		background-color: rgba(255, 255, 255, 0.15);
	}

	/* 任务项 */
	.taskItem {
		background-color: transparent;
		width: auto;
		min-width: 6rem;
		padding: 0 0.8rem;
		height: 2.2rem;
		display: flex;
		align-items: center;
		margin-left: 4px;
		transition: all 0.2s;
		border-radius: 6px;
		cursor: pointer;
	}
	.taskItem a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		text-decoration: none;
	}

	/* 任务项悬停 (浅色) */
	.taskItem:hover {
		background-color: rgba(0, 0, 0, 0.06);
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.02);
	}
	/* 任务项悬停 (深色) */
	.theme-dark-task .taskItem:hover {
		background-color: rgba(255, 255, 255, 0.15);
		box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.05);
	}

	/* 字体与图标颜色调配 */
	.icon-btn {
		color: #1a1a1a;
		font-size: 20px;
		margin-right: 0.5rem;
		transition: color 0.3s;
	}
	.start-icon {
		font-size: 22px;
		margin: 0;
	}
	.xs-icon {
		width: 25px;
		font-size: 16px;
		margin-right: 0;
		padding: 0;
	}
	.task-text {
		color: #1a1a1a;
		white-space: nowrap;
		font-size: 13px;
		font-weight: 500;
		transition: color 0.3s;
	}
	
	.theme-dark-task .icon-btn,
	.theme-dark-task .task-text {
		color: #ffffff;
	}

	/* 右侧时间区 */
	.time-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 80px;
		cursor: default;
		user-select: none;
	}
	.time-text {
		color: #1a1a1a;
		font-size: 11px;
		line-height: 1.2;
		font-weight: 500;
	}
	.theme-dark-task .time-text {
		color: #ffffff;
	}

	/* 右键菜单 */
	.custom-task-menu {
		position: fixed;
		z-index: 10000;
		/* 始终跟随模式，浅色基调 */
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(25px);
		-webkit-backdrop-filter: blur(25px);
		border: 1px solid rgba(0, 0, 0, 0.05);
		border-radius: 8px;
		box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
		padding: 5px 0;
		min-width: 140px;
		animation: taskMenuFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.theme-dark-task .custom-task-menu {
		background: rgba(35, 35, 45, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
	}

	@keyframes taskMenuFadeIn {
		from { opacity: 0; transform: translateY(10px) scale(0.95); }
		to { opacity: 1; transform: translateY(0) scale(1); }
	}

	.custom-task-menu ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.custom-task-menu li {
		padding: 10px 15px;
		display: flex;
		align-items: center;
		cursor: pointer;
		transition: all 0.2s;
		color: #303133;
		font-size: 14px;
		font-weight: 500;
	}
	.theme-dark-task .custom-task-menu li {
		color: #e4e7ed;
	}

	.custom-task-menu li:hover {
		background: rgba(245, 108, 108, 0.1);
		color: #f56c6c;
	}
	.theme-dark-task .custom-task-menu li:hover {
		background: rgba(245, 108, 108, 0.2);
	}

	.custom-task-menu li i {
		margin-right: 10px;
		font-size: 16px;
	}
</style>
