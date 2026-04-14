<template>
	<div class="ProgramButton" :class="{'theme-dark-btn': isDarkTheme}">
		<div class="zhong">
			<div class="glass-icon-btn" @click="showView">
				<i :class="menu.icon"></i>
			</div>
			<div class="text">
				<span><b>{{ $te('m.menu.' + menu.permissionsenglish) ? $t('m.menu.' + menu.permissionsenglish) : menu.permissionsname }}</b></span>
			</div>
		</div>
		<component :is="allComps[menu.permissionsenglish]" :menu="menu"></component>
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
			},
			// 是否深色模式
			isDarkTheme() {
				return this.$store.state.settings.isDarkTheme;
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
					this.$store.commit("setTrueVB",this.menu.permissionsenglish);
				} else{
					this.$store.commit("setTrueVB",this.menu.permissionsenglish);
					this.$store.commit("addTaskList",this.menu);
				}
			},
			//判断当前任务是否已经在后台
			isTaskList(menu){
				for (let i in this.taskList) {
					if (JSON.stringify(this.taskList[i])==JSON.stringify(menu)) {
						return true;
					}
				}
				return false;
			}
		}
	}
</script>

<style scoped="scoped">
	.ProgramButton {
		width: 7rem;
		height: 7.5rem;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 5px;
	}

	.zhong {
		display: flex;
		align-items: center;
		flex-direction: column;
		height: 7rem;
		width: 5rem;
	}

	.glass-icon-btn {
		width: 3.8rem;
		height: 3.8rem;
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.5);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
		color: #303133;
		font-size: 2.2rem;
		cursor: pointer;
		transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
	}
	.theme-dark-btn .glass-icon-btn {
		background: rgba(0, 0, 0, 0.45);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: #ffffff;
	}

	.ProgramButton:hover .glass-icon-btn {
		background: rgba(255, 255, 255, 0.5);
		transform: translateY(-4px) scale(1.05);
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.7);
	}
	.theme-dark-btn.ProgramButton:hover .glass-icon-btn {
		background: rgba(255, 255, 255, 0.15);
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.text {
		width: auto;
		padding: 4px 8px;
		border-radius: 6px;
		margin-top: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s;
	}
	.theme-dark-btn .text {
		/* 无填充 */
	}

	.ProgramButton:hover .text {
		/* 取消背景，仅保留文字亮度变化或动画 */
	}
	.theme-dark-btn.ProgramButton:hover .text {
		/* 无填充 */
	}

	.text span {
		color: #ffffff;
		font-size: 0.78rem;
		text-shadow: 0 1px 4px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.6);
		letter-spacing: 0.5px;
		white-space: nowrap;
		transition: all 0.3s;
	}
	/* 浅色模式悬停 */
	.ProgramButton:hover .text span {
		color: #ffffff;
		text-shadow: 0 1px 6px rgba(0,0,0,1), 0 0 3px rgba(0,0,0,0.8);
		transform: scale(1.05);
	}

	/* 深色模式文字与阴影 */
	.theme-dark-btn .text span {
		color: rgba(255, 255, 255, 0.9);
		text-shadow: 0 1px 5px rgba(0,0,0,0.8);
	}
	.theme-dark-btn.ProgramButton:hover .text span {
		color: #ffffff;
		text-shadow: 0 1px 6px rgba(255,255,255,0.4), 0 0 4px rgba(0,0,0,0.8);
		transform: scale(1.05);
	}
</style>
