<template>
	<div class="task">

		<!-- 开始菜单 -->
		<div style="width: 50px;height: 2.5rem;">
			<Button @click="openStart()" size="large" type="text" icon="logo-windows" ghost></Button>
		</div>
		<!-- 任务主体 -->
		<div style="width: 100%;height: 2.5rem;display: flex;align-items: center;justify-content: flex-start;">

			<div class="taskItem" v-for="task in taskList">
				<a @click="open(task)">
					<Icon color="white" size="large" :type="task.icon" style="margin: 0.5rem;" />
					<span style="color: white;margin-right: 0.5rem"><b>{{task.permissionsname}}</b></span>
				</a>
			</div>

		</div>
		<!-- 时间与显示桌面 -->
		<div style="width: 190px;height: 2.5rem;display: flex;align-items: center;justify-content: flex-end;">
			<!-- 时间 -->
			<div style="width: 95%;height: 2.5rem;display: flex;align-items: center;justify-content: flex-end">
        <Tooltip :content="'剩余电量：'+electricity.batteryLevel+ '%'" placement="top-end">
          <Button style="width: 25px" size="large" type="text" ghost   :icon="electricity.batteryCharging?'ios-battery-charging':electricity.batteryLevel<=30?'ios-battery-dead':'ios-battery-full'"></Button>
        </Tooltip>
        <Tooltip :content="isNetwork?'WIFI已开启':'WIFI已关闭'" placement="top-end">
          <Button style="width: 25px" size="large" type="text" ghost   :icon="isNetwork?'ios-wifi':'ios-wifi-outline'"></Button>
        </Tooltip>
        <div style="display: flex;flex-direction:column;align-items: center">
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
				this.$store.commit("setTrueVB",menu.permissionsenglish);
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
		background-color: #000000;
	}

	.taskItem {
		background-color: #000000;
		width: 6rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		margin-left: 1px;
	}

	.taskItem :hover {
		background-color: #444;
	}
</style>
