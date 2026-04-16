<template>
	<div class="task" :class="{ 'theme-dark-task': isDarkTheme }">
		<div v-show="menuVisible" class="custom-task-menu" :style="{ left: taskMenuAxis.x + 'px', bottom: '50px' }">
			<ul>
				<li @click.stop="closeCurrentTask">
					<i class="el-icon-circle-close"></i>
					<span>{{ $t('m.taskbar.closeApp') }}</span>
				</li>
			</ul>
		</div>

		<div class="start-btn-container">
			<el-button @click="openStart()" size="large" type="text" icon="fa fa-windows" class="icon-btn start-icon"></el-button>
		</div>
		<div class="search-btn-container">
			<el-tooltip :content="$t('m.taskbar.searchTitle')" placement="top">
				<el-button @click.stop="toggleSearchPanel()" size="large" type="text" icon="el-icon-search" class="icon-btn search-icon"></el-button>
			</el-tooltip>
		</div>

		<div class="task-main">
			<div class="taskItem" v-for="task in taskList" :key="task.id">
				<a @click="open(task)" @contextmenu.prevent.stop="showTaskMenu($event, task)">
					<i class="icon-btn" :class="task.icon"></i>
					<span class="task-text"><b>{{ getAppName(task) }}</b></span>
				</a>
			</div>
		</div>

		<div class="right-panel">
			<div class="indicators">
				<el-tooltip :content="$t('m.taskbar.batteryRest') + electricity.batteryLevel + '%'" placement="top-end">
					<el-button class="icon-btn xs-icon" size="large" type="text" :icon="electricity.batteryCharging ? 'fa fa-plug' : electricity.batteryLevel <= 30 ? 'fa fa-battery-empty' : 'fa fa-battery-full'"></el-button>
				</el-tooltip>
				<el-tooltip :content="isNetwork ? $t('m.taskbar.wifiOn') : $t('m.taskbar.wifiOff')" placement="top-end">
					<el-button class="icon-btn xs-icon" size="large" type="text" :icon="isNetwork ? 'fa fa-wifi' : 'fa fa-exclamation-triangle'"></el-button>
				</el-tooltip>
				<div class="time-box">
					<span class="time-text">{{ timeItem.date }}</span>
					<span class="time-text">{{ timeItem.time }}</span>
				</div>
			</div>
			<div @click="refresh()" class="show-desktop-btn"></div>
		</div>

		<el-dialog
			top="18vh"
			width="520px"
			:visible.sync="searchPanelVisible"
			v-dialogDrag="true"
			:modal="false"
			:close-on-click-modal="false"
			:append-to-body="true"
			:title="$t('m.taskbar.searchTitle')"
			id="taskSearchDialog"
		>
			<div class="search-panel-body">
				<div class="search-input-wrap">
					<i class="el-icon-search search-input-icon"></i>
					<input
						ref="searchInput"
						v-model.trim="searchKeyword"
						type="text"
						class="search-input"
						:placeholder="$t('m.taskbar.searchPlaceholder')"
						@keydown.esc.prevent="closeSearchPanel"
						@keydown.enter.prevent="openFirstSearchResult"
					/>
				</div>
				<div class="search-result-list">
					<div v-for="app in filteredAppList" :key="app.id" class="search-result-item" @click="openSearchApp(app)">
						<div class="search-result-icon">
							<i :class="app.icon"></i>
						</div>
						<div class="search-result-content">
							<span class="search-result-name">{{ getAppName(app) }}</span>
							<span class="search-result-code">{{ app.code }}</span>
						</div>
						<i class="el-icon-right search-result-arrow"></i>
					</div>
					<div v-if="filteredAppList.length === 0" class="search-empty">
						{{ $t('m.taskbar.searchEmpty') }}
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { getPermissionsList } from '@/utils/permissions.js'

export default {
	name: "Task",
	data() {
		return {
			menuVisible: false,
			taskMenuAxis: { x: 0 },
			currentTask: null,
			searchPanelVisible: false,
			searchKeyword: '',
			electricity: {
				batteryCharging: false,
				batteryLevel: 100,
			},
			timeItem: {
				time: new Date().toLocaleTimeString(),
				date: new Date().toLocaleDateString(),
			},
			isNetwork: false,
			timerId: null,
		}
	},
	computed: {
		taskList: {
			get() {
				return this.$store.state.control.taskList;
			},
		},
		startInformationViewBool: {
			get() {
				return this.$store.state.control.startInformationViewBool;
			},
		},
		isDarkTheme() {
			return this.$store.state.settings.isDarkTheme;
		},
		appList() {
			return getPermissionsList(1, null);
		},
		filteredAppList() {
			const keyword = this.searchKeyword.trim().toLowerCase();
			if (!keyword) {
				return this.appList;
			}
			return this.appList.filter((app) => {
				const fields = [app.permissionsname, app.permissionsnameen, app.code].filter(Boolean);
				return fields.some((field) => {
					return String(field).toLowerCase().includes(keyword);
				});
			});
		},
	},
	methods: {
		handleGlobalKeydown(event) {
			if (!(event.ctrlKey || event.metaKey)) {
				return;
			}
			if (String(event.key).toLowerCase() !== 'f') {
				return;
			}
			event.preventDefault();
			this.toggleSearchPanel();
		},
		getAppName(app) {
			return this.$i18n.locale === 'en' ? (app.permissionsnameen || app.permissionsname) : app.permissionsname;
		},
		showTaskMenu(e, task) {
			this.menuVisible = true;
			this.taskMenuAxis.x = e.clientX;
			this.currentTask = task;
			this.$nextTick(() => {
				const menu = document.querySelector('.custom-task-menu');
				if (menu) {
					let newX = e.clientX;
					const menuWidth = menu.offsetWidth;
					const maxWidth = document.documentElement.clientWidth || window.innerWidth;
					if (newX + menuWidth > maxWidth) {
						newX = maxWidth - menuWidth - 5;
					}
					this.taskMenuAxis.x = newX;
				}
			});
		},
		closeCurrentTask() {
			if (this.currentTask) {
				this.$store.commit("setFalseVB", this.currentTask.code);
				this.$store.commit("deleteTaskList", this.currentTask);
				this.menuVisible = false;
				this.currentTask = null;
			}
		},
		closeMenu() {
			this.menuVisible = false;
		},
		toggleSearchPanel() {
			if (this.searchPanelVisible) {
				this.closeSearchPanel();
				return;
			}
			if (this.startInformationViewBool) {
				this.$store.commit("setFalseSIVB");
			}
			this.searchPanelVisible = true;
			this.$nextTick(() => {
				if (this.$refs.searchInput) {
					this.$refs.searchInput.focus();
				}
			});
		},
		closeSearchPanel() {
			this.searchPanelVisible = false;
			this.searchKeyword = '';
		},
		openSearchApp(app) {
			if (!this.isTaskList(app)) {
				this.$store.commit("addTaskList", app);
			}
			this.$store.commit("setTrueVB", app.code);
			this.closeSearchPanel();
		},
		openFirstSearchResult() {
			if (this.filteredAppList.length > 0) {
				this.openSearchApp(this.filteredAppList[0]);
			}
		},
		isTaskList(menu) {
			for (let i in this.taskList) {
				if (JSON.stringify(this.taskList[i]) == JSON.stringify(menu)) {
					return true;
				}
			}
			return false;
		},
		timer() {
			this.timerId = setInterval(() => {
				this.getTimeDate();
				this.getElectricity();
				this.getNetwork();
			}, 1000);
		},
		getNetwork() {
			this.isNetwork = window.navigator.onLine;
		},
		getTimeDate() {
			this.timeItem.date = new Date().toLocaleDateString();
			this.timeItem.time = new Date().toLocaleTimeString();
		},
		getElectricity() {
			if (!navigator.getBattery) {
				return;
			}
			navigator.getBattery().then((battery) => {
				this.electricity.batteryCharging = battery.charging ? true : false;
				this.electricity.batteryLevel = battery.level * 100;
			});
		},
		refresh() {
			this.$store.commit("refresh");
		},
		open(menu) {
			if (this.$store.state.control[menu.code]) {
				this.$store.commit("setFalseVB", menu.code);
			} else {
				this.$store.commit("setTrueVB", menu.code);
			}
		},
		openStart() {
			if (this.searchPanelVisible) {
				this.closeSearchPanel();
			}
			if (this.startInformationViewBool) {
				this.$store.commit("setFalseSIVB");
			} else {
				this.$store.commit("setTrueSIVB");
			}
		},
	},
	mounted() {
		this.timer();
		this.getNetwork();
		this.getElectricity();
		document.addEventListener('click', this.closeMenu);
		document.addEventListener('keydown', this.handleGlobalKeydown);
	},
	beforeDestroy() {
		document.removeEventListener('click', this.closeMenu);
		document.removeEventListener('keydown', this.handleGlobalKeydown);
		if (this.timerId) {
			clearInterval(this.timerId);
		}
	},
}
</script>

<style scoped="scoped">
.task {
	height: 2.8rem;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
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
	background: rgba(15, 15, 20, 0.95);
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 -2px 15px rgba(0, 0, 0, 0.5);
}

.start-btn-container,
.search-btn-container {
	width: 50px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	top: -1px;
}

.task-main {
	flex: 1;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	overflow: hidden;
	position: relative;
	top: -1px;
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
	position: relative;
	top: -1px;
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
	overflow: hidden;
}

.taskItem:hover {
	background-color: rgba(0, 0, 0, 0.06);
	box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.02);
}

.theme-dark-task .taskItem:hover {
	background-color: rgba(255, 255, 255, 0.15);
	box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.05);
}

.icon-btn {
	color: #1a1a1a;
	font-size: 20px;
	margin-right: 0.5rem;
	transition: color 0.3s;
	padding: 0 !important;
	display: inline-flex !important;
	align-items: center;
	justify-content: center;
	line-height: 1;
	min-height: auto;
}

.start-icon {
	font-size: 22px;
	margin: 0;
}

.search-icon {
	font-size: 18px;
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
	overflow: hidden;
	text-overflow: ellipsis;
}

.theme-dark-task .icon-btn,
.theme-dark-task .task-text {
	color: #ffffff;
}

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

.custom-task-menu {
	position: fixed;
	z-index: 10000;
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
	from {
		opacity: 0;
		transform: translateY(10px) scale(0.95);
	}
	to {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
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

.search-panel-body {
	display: flex;
	flex-direction: column;
	max-height: 420px;
}

.search-input-wrap {
	position: relative;
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
}

.search-input-icon {
	position: absolute;
	left: 1rem;
	font-size: 1rem;
	color: #6b7280;
}

.search-input {
	width: 100%;
	height: 3.2rem;
	padding: 0 1rem 0 2.8rem;
	border: 1px solid rgba(148, 163, 184, 0.26);
	border-radius: 0.95rem;
	background: rgba(255, 255, 255, 0.62);
	color: #111827;
	font-size: 1rem;
	outline: none;
	transition: all 0.2s ease;
}

.search-input:focus {
	border-color: rgba(59, 130, 246, 0.45);
	box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
}

.search-result-list {
	flex: 1;
	overflow-y: auto;
	padding-right: 0.25rem;
}

.search-result-item {
	display: flex;
	align-items: center;
	padding: 0.9rem 1rem;
	margin-bottom: 0.65rem;
	border-radius: 1rem;
	background: rgba(255, 255, 255, 0.42);
	cursor: pointer;
	transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.search-result-item:hover {
	transform: translateY(-2px);
	background: rgba(255, 255, 255, 0.7);
	box-shadow: 0 12px 25px rgba(15, 23, 42, 0.1);
}

.search-result-icon {
	width: 2.75rem;
	height: 2.75rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 0.9rem;
	border-radius: 0.95rem;
	background: rgba(59, 130, 246, 0.12);
	color: #2563eb;
	font-size: 1.2rem;
}

.search-result-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.search-result-name {
	font-size: 0.95rem;
	font-weight: 600;
	color: #0f172a;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.search-result-code {
	margin-top: 0.2rem;
	font-size: 0.78rem;
	color: #64748b;
}

.search-result-arrow {
	color: #64748b;
	font-size: 0.9rem;
}

.search-empty {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 8rem;
	border-radius: 1rem;
	background: rgba(255, 255, 255, 0.36);
	color: #64748b;
	font-size: 0.95rem;
}
</style>

<style>
#taskSearchDialog .el-dialog {
	margin: 0 auto !important;
}

#taskSearchDialog .el-dialog__body {
	padding: 16px 20px 20px;
}
</style>
