<template>
	<div class="task">
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
		<div style="width: 50px;height: 2.5rem;display: flex;align-items: center;justify-content: center;">
			<el-button @click="openStart()" size="large" type="text" icon="fa fa-windows" style="color: white; font-size: 20px; padding: 0;"></el-button>
		</div>
		<!-- 任务主体 -->
		<div style="width: 100%;height: 2.5rem;display: flex;align-items: center;justify-content: flex-start;">

			<div class="taskItem" v-for="task in taskList">
					<a style="display: flex; align-items: center; justify-content: center; width: 100%;" @click="open(task)" @contextmenu.prevent.stop="showTaskMenu($event, task)">
					<i style="color: white; font-size: 20px; margin-right: 0.5rem;" :class="task.icon"></i>
					<span style="color: white; white-space: nowrap;"><b>{{ $te('m.menu.' + task.permissionsenglish) ? $t('m.menu.' + task.permissionsenglish) : task.permissionsname }}</b></span>
				</a>
			</div>

		</div>
		<!-- 时间与显示桌面 -->
		<div style="width: 190px;height: 2.5rem;display: flex;align-items: center;justify-content: flex-end;">
			<!-- 时间 -->
			<div style="width: 95%;height: 2.5rem;display: flex;align-items: center;justify-content: flex-end">
        <el-tooltip :content="$t('m.taskbar.batteryRest') + electricity.batteryLevel + '%'" placement="top-end">
          <el-button style="width: 25px; color: white; font-size: 18px; padding: 0;" size="large" type="text" :icon="electricity.batteryCharging?'fa fa-plug':electricity.batteryLevel<=30?'fa fa-battery-empty':'fa fa-battery-full'"></el-button>
        </el-tooltip>
        <el-tooltip :content="isNetwork ? $t('m.taskbar.wifiOn') : $t('m.taskbar.wifiOff')" placement="top-end">
          <el-button style="width: 25px; color: white; font-size: 18px; padding: 0;" size="large" type="text" :icon="isNetwork?'fa fa-wifi':'fa fa-exclamation-triangle'"></el-button>
        </el-tooltip>
        <div style="display: flex;flex-direction:column;align-items: center;width: 90px">
          <span bodyonselectstart="returnfalse" style="color: white;font-size: 10px" oncopy="event.returnValue=false;" ondragstart="window.event.returnValue=false" oncontextmenu="window.event.returnValue=false" onselectstart="event.returnValue=false">{{timeItem.date}}</span>
          <span bodyonselectstart="returnfalse" style="color: white;font-size: 10px" oncopy="event.returnValue=false;" ondragstart="window.event.returnValue=false" oncontextmenu="window.event.returnValue=false" onselectstart="event.returnValue=false">{{timeItem.time}}</span>
        </div>
			</div>
			<!-- 显示桌面 -->
			<div @click="refresh()" style="width: 5%;height: 2.5rem;border-left: whitesmoke solid 1px;">

			</div>
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
			}
		},
		methods: {
			showTaskMenu(e, task) {
				this.menuVisible = true;
				this.taskMenuAxis.x = e.clientX;
				this.currentTask = task;
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
		height: 2.5rem;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(20, 20, 24, 0.92);
		backdrop-filter: blur(15px);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		position: relative;
		z-index: 3000;
	}

	.taskItem {
		background-color: transparent;
		width: auto;
		min-width: 6rem;
		padding: 0 0.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		margin-left: 2px;
		transition: background-color 0.3s;
		border-radius: 4px;
		cursor: pointer;
	}

	.taskItem:hover {
		background-color: rgba(255, 255, 255, 0.15);
		box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.05);
	}

	.custom-task-menu {
		position: fixed;
		z-index: 10000;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 8px;
		box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.15);
		padding: 5px 0;
		min-width: 130px;
		animation: taskMenuFadeIn 0.2s ease;
	}

	@keyframes taskMenuFadeIn {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
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
		color: #333;
		font-size: 14px;
		font-weight: 500;
	}
	.custom-task-menu li:hover {
		background: rgba(245, 108, 108, 0.1);
		color: #f56c6c;
	}
	.custom-task-menu li i {
		margin-right: 8px;
		font-size: 16px;
	}
</style>
