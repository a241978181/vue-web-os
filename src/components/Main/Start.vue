<template>
	<div>
		<div v-if="startInformationViewBool" class="startView" :class="{'theme-dark-view': isDarkTheme}">
			<!-- 列表区 -->
			<div class="taskBar">
				<div class="taskItem" v-for="task in permissionsList" :key="task.id">
					<a @click="open(task)">
						<i :class="task.icon"></i>
						<span>{{ $i18n.locale === 'en' ? (task.permissionsnameen || task.permissionsname) : task.permissionsname }}</span>
					</a>
				</div>
			</div>
			<!-- 底部控制区 -->
			<div class="toolbar">
				<el-tooltip :content="$t('m.topbar.logout') || 'Logout'" placement="top">
					<el-button @click="out()" circle icon="el-icon-switch-button"></el-button>
				</el-tooltip>
			</div>
		</div>
	</div>
</template>

<script>
import {getPermissionsList} from '@/utils/permissions.js'
	export default {
		name: "Start",
		computed: {
			// 功能列表（响应式）
			permissionsList() {
				return getPermissionsList(1, null);
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
		methods: {

			//退出系统
			out() {
				this.$store.commit("outComputer");
				this.$store.dispatch('permission/logout');
				this.$router.push("/signin");
			},
			//打开某一任务
			open(menu) {
				if (this.isTaskList(menu)) {
					this.$store.commit("setTrueVB",menu.code);
					this.$store.commit("setFalseSIVB");
				} else {
          this.$store.commit("setTrueVB",menu.code);
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
		},
		mounted() {
		}
	}
</script>

<style scoped="scoped">
	.startView {
		position: absolute;
		width: 320px;
		height: 480px;
		margin-bottom: 2.8rem;
		bottom: 6px;
		left: 6px;
		/* 浅色模式（默认） */
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(25px);
		-webkit-backdrop-filter: blur(25px);
		border: 1px solid rgba(255, 255, 255, 0.6);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		z-index: 9999;
	}

	/* 深色模式覆盖 */
	.startView.theme-dark-view {
		background: rgba(28, 28, 35, 0.75);
		border: 1px solid rgba(255, 255, 255, 0.15);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
	}

	@keyframes slideUpFade {
		from { opacity: 0; transform: translateY(20px) scale(0.95); }
		to { opacity: 1; transform: translateY(0) scale(1); }
	}

	.taskBar {
		flex: 1;
		width: 100%;
		padding: 15px 10px;
		box-sizing: border-box;
		overflow-y: auto;
	}

	/* 自定义滚动条 */
	.taskBar::-webkit-scrollbar { width: 5px; }
	.taskBar::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.2); border-radius: 4px; }
	.taskBar::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.4); }
	.theme-dark-view .taskBar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); }
	.theme-dark-view .taskBar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.4); }

	.taskItem {
		width: 100%;
		margin-bottom: 6px;
	}

	.taskItem a {
		display: flex;
		align-items: center;
		padding: 10px 15px;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.25s ease;
		text-decoration: none;
	}

	/* 浅色 hover */
	.taskItem a:hover {
		background-color: rgba(0, 0, 0, 0.05);
		transform: translateX(6px);
		box-shadow: 0 4px 12px rgba(0,0,0,0.05);
	}
	/* 深色 hover */
	.theme-dark-view .taskItem a:hover {
		background-color: rgba(255, 255, 255, 0.12);
		box-shadow: 0 4px 12px rgba(0,0,0,0.1);
	}

	.taskItem i {
		/* 浅色基调 */
		color: #303133;
		font-size: 22px;
		margin-right: 15px;
		width: 25px;
		text-align: center;
		transition: transform 0.2s;
	}
	.theme-dark-view .taskItem i {
		color: #ffffff;
	}

	.taskItem a:hover i {
		transform: scale(1.1);
		color: #7367f0;
	}

	.taskItem span {
		/* 浅色基调 */
		color: #303133;
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0.5px;
	}
	.theme-dark-view .taskItem span {
		color: #ffffff;
	}

	.toolbar {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0 20px;
		/* 浅色边界 */
		background: rgba(0, 0, 0, 0.03);
		border-top: 1px solid rgba(0, 0, 0, 0.05);
		box-sizing: border-box;
	}
	.theme-dark-view .toolbar {
		background: rgba(0, 0, 0, 0.25);
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.toolbar .el-button {
		background: transparent;
		border: 1px solid rgba(0, 0, 0, 0.2);
		color: #303133;
		font-size: 18px;
		padding: 10px;
		transition: all 0.3s ease;
	}
	.theme-dark-view .toolbar .el-button {
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: #ffffff;
	}

	.toolbar .el-button:hover {
		background: #ff4d4f;
		border-color: #ff4d4f;
		color: white;
		transform: rotate(90deg) scale(1.1);
		box-shadow: 0 4px 15px rgba(255, 77, 79, 0.4);
	}
	.theme-dark-view .toolbar .el-button:hover {
		color: white;
	}
</style>
