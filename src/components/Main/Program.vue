<template>
	<div class="ProgramButton">
		<div class="zhong">
			<Button style="font-size: 2rem" @click="showView" :type="menu.color" class="buttonIcon" :icon="menu.icon"></Button>
			<div class="text">
				<span><b>{{menu.permissionsname}}</b></span>
			</div>
		</div>
		<component  :is="allComps[menu.permissionsenglish]" :menu="menu"></component>
	</div>
</template>

<script>
	import allComps from '../Function/index.js'
	export default {
		name: "Program",
		props: {
			menu: '',
		},
		computed: {
			//查看所有后台任务
			taskList: {
				get() {
					return this.$store.state.control.taskList;
				},
			}
		},
		data() {
			return {
				// 组件集合
				allComps: allComps,
				//是否展示该页面对应组件
				componentBool:false,
			}
		},
		methods: {
			// 应用启动
			showView(){
				this.componentBool=true;
				if (this.isTaskList(this.menu)) {
				  console.log(this.menu.permissionsenglish)
					this.$store.commit("setTrueVB",this.menu.permissionsenglish);
				} else{
					this.$store.commit("setTrueVB",this.menu.permissionsenglish);
					this.$store.commit("addTaskList",this.menu);
				}
			},
			//判断当前任务是否已经在后台
			//true:已经存在后台
			//false:未存在后台
			isTaskList(menu){
				for (let i in this.taskList) {
					if (JSON.stringify(this.taskList[i])==JSON.stringify(menu)) {
						return true;
					}
				}
				return false;
			}

		},
		mounted() {}
	}
</script>

<style scoped="scoped">
	.ProgramButton {
		width: 7rem;
		height: 7rem;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.zhong {
		display: flex;
		align-items: center;
		flex-direction: column;
		height: 6rem;
		width: 4rem;
	}

	.buttonIcon {
		width: 4rem;
		height: 4rem;
		border-radius: 0.5rem;
	}

	.text {
		width: 4rem;
		height: 1rem;
		border-radius: 2rem;
		background-color: #304C5F;
		margin-top: 0.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.text span {
		color: white;
		font-size: 0.7rem;
	}
</style>
