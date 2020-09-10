<template>
	<div>
		<div v-if="startInformationViewBool" class="startView">
			<!-- 任务栏 -->
			<div class="taskBar" >
				<Scroll style="width: 100%;" height="450"  >
						<div class="taskItem" v-for="task in menuList">
							<a style="width:95% ;" @click="open(task)">
								<Icon color="white" size="35" :type="task.icon" style="margin: 1rem;" />
								<span style="color: white;margin-right: 0.5rem"><b>{{task.permissionsname}}</b></span>
							</a>
						</div>
				</Scroll>
			</div>
			<!-- 工具栏 -->
			<div class="toolbar">
				<div class="toolbarLine">
					<el-button @click="out()" style="width: 30%;height: 100%;margin-left: 1px;" type="info" icon="el-icon-switch-button"></el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Start",
		data() {
			return {
				//功能列表
        permissionsList: [],
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
			//查看所有后台任务
			taskList: {
				get() {
					return this.$store.state.control.taskList;
				},
			}
		},
		methods: {

			//退出系统
			out() {
				this.$store.commit("outComputer");
				localStorage.clear();
				this.$router.push("/signin");
			},
			//打开某一任务
			open(menu) {
				if (this.isTaskList(menu)) {
					this.$store.commit("setTrueVB",menu.permissionsenglish);
					this.$store.commit("setFalseSIVB");
				} else {
          this.$store.commit("setTrueVB",menu.permissionsenglish);
					this.$store.commit("addTaskList", menu);
					this.$store.commit("setFalseSIVB");
				}
			},
			//判断当前任务是否已经在后台
			//true:已经存在后台
			//false:未存在后台
			isTaskList(menu) {
				for (let i in this.taskList) {
					if (JSON.stringify(this.taskList[i]) == JSON.stringify(menu)) {
						return true;
					}
				}
				return false;
			},
			//查询所拥有的权限
			getMenuList() {
        let permissionsList = JSON.parse(localStorage.getItem("permissionsList"));
        this.menuList=[];
        for(var i=0;i<permissionsList.length;i++){
          if (permissionsList[i].type==1) {
            this.menuList.push(permissionsList[i]);
          }
        }
			}
		},
		mounted() {
			this.getMenuList();
		}
	}
</script>

<style scoped="scoped">
	.startView {
		position: absolute;
		width: 30%;
		height: 30rem;
		margin-bottom: 2.5rem;
		background-color: #232323;
		bottom: 0rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		transition: all 1s linear; /*动画*/
	}

	.toolbar {
		width: 60%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
	}

	.toolbar .toolbarLine {
		width: 100%;
		height: 25%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.startView .taskBar {
		width: 40%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
	}
	.taskItem {
		background-color: #232323;
		width: 95%;
		height: 4rem;
		display: flex;
		align-items: center;
	}

	.taskItem :hover {
		background-color: #444;
	}
</style>
