<template>
	<div class="ProgramButton">
		<div class="zhong">
			<el-button style="font-size: 2rem; padding: 0;" @click="showView" :type="menu.color" class="buttonIcon" :icon="menu.icon"></el-button>
			<div class="text">
				<span><b>{{ $te('m.menu.' + menu.permissionsenglish) ? $t('m.menu.' + menu.permissionsenglish) : menu.permissionsname }}</b></span>
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
		width: auto;
		padding: 0.3rem 0.6rem;
		border-radius: 4px;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(4px);
		box-shadow: 0 2px 6px rgba(0,0,0,0.2);
		margin-top: 0.3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s;
	}

	.ProgramButton:hover .text {
		background-color: rgba(0, 0, 0, 0.6);
	}

	.text span {
		color: white;
		font-size: 0.7rem;
		text-shadow: 0 1px 2px rgba(0,0,0,0.8);
		white-space: nowrap;
	}
</style>
