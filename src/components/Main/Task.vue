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
		<div style="width: 150px;height: 2.5rem;display: flex;align-items: center;justify-content: flex-end;">
			<!-- 时间 -->
			<div style="width: 95%;height: 2.5rem;display: flex;align-items: center;">
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
		mounted() {}
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
