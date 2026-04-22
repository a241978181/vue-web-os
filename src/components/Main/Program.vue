<template>
	<div class="ProgramButton" :class="[{'theme-dark-btn': isDarkTheme}, 'icon-size-' + iconSize]">
		<div class="zhong">
			<div class="glass-icon-btn" @click="showView($event)">
				<i :class="menu.icon"></i>
			</div>
			<div class="text">
				<span><b>{{ $i18n.locale === 'en' ? (menu.permissionsnameen || menu.permissionsname) : menu.permissionsname }}</b></span>
			</div>
		</div>
		<keep-alive :include="cachedAppNames">
			<component v-if="componentAlive" :is="allComps[menu.code]" :menu="menu"></component>
		</keep-alive>
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
			// 从 Vuex 获取缓存列表，用于 keep-alive 的 include
			cachedAppNames() {
				return this.$store.getters.cachedAppNames;
			},
			// 判断当前应用是否在任务栏中
			isInTaskList() {
				return this.cachedAppNames.indexOf(this.menu.code) !== -1;
			},
			// 是否深色模式
			isDarkTheme() {
				return this.$store.state.settings.isDarkTheme;
			},
			// 图标大小
			iconSize() {
				return this.$store.state.settings.desktopIconSize;
			}
		},
		data() {
			return {
				// 组件集合
				allComps: allComps,
				//是否展示该页面对应组件
				componentBool:false,
				// 控制组件生命周期（解耦 v-if 与 taskList，保证动画）
				componentAlive: false,
				// 延迟销毁定时器
				destroyTimer: null,
			}
		},
		watch: {
			// 监听任务栏状态变化，控制组件创建/销毁时机以保证动画
			isInTaskList(val) {
				if (val) {
					// 打开应用：清除可能存在的销毁定时器
					if (this.destroyTimer) {
						clearTimeout(this.destroyTimer);
						this.destroyTimer = null;
					}
					// 先创建组件（此时 dialog visible=false）
					this.componentAlive = true;
					// 如果 VB 已经被提前设置为 true，需要重置以触发 dialog 入场动画
					var code = this.menu.code;
					if (this.$store.state.control[code]) {
						this.$store.commit("setFalseVB", code);
						this.$nextTick(function() {
							this.$store.commit("setTrueVB", code);
						});
					}
				} else {
					// 关闭应用：延迟销毁组件，等 dialog 退场动画播完（动画时长 270ms）
					this.destroyTimer = setTimeout(function() {
						this.componentAlive = false;
						this.destroyTimer = null;
					}.bind(this), 300);
				}
			}
		},
		methods: {
			// 应用启动
			showView(event){
				// 获取图标的物理位置，设置窗口打开动画的起点
				const iconEl = event.currentTarget;
				const rect = iconEl.getBoundingClientRect();
				const originX = rect.left + rect.width / 2;
				const originY = rect.top + rect.height / 2;
				document.documentElement.style.setProperty('--anim-origin-x', originX + 'px');
				document.documentElement.style.setProperty('--anim-origin-y', originY + 'px');

				this.componentBool=true;
				if (this.isTaskList(this.menu)) {
					this.$store.commit("setTrueVB",this.menu.code);
				} else{
					this.$store.commit("setTrueVB",this.menu.code);
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
		},
		beforeDestroy() {
			if (this.destroyTimer) {
				clearTimeout(this.destroyTimer);
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
		transition: width 0.3s ease, height 0.3s ease, margin 0.3s ease;
	}

	.zhong {
		display: flex;
		align-items: center;
		flex-direction: column;
		height: 7rem;
		width: 100%;
		padding: 0 4px;
		box-sizing: border-box;
		transition: height 0.3s ease;
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
		flex-shrink: 0;
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
		width: 100%;
		padding: 2px 4px;
		border-radius: 6px;
		margin-top: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s;
		box-sizing: border-box;
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
		transition: all 0.3s;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
		line-height: 1.2;
		word-break: break-all;
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

	/* ============================
	   图标尺寸切换 - 中等图标
	   ============================ */
	.icon-size-medium.ProgramButton {
		width: 5.5rem;
		height: 6rem;
		margin: 4px;
	}
	.icon-size-medium .zhong {
		height: 5.5rem;
	}
	.icon-size-medium .glass-icon-btn {
		width: 2.8rem;
		height: 2.8rem;
		border-radius: 10px;
		font-size: 1.6rem;
	}
	.icon-size-medium .text {
		margin-top: 0.35rem;
	}
	.icon-size-medium .text span {
		font-size: 0.7rem;
	}

	/* ============================
	   图标尺寸切换 - 小图标
	   ============================ */
	.icon-size-small.ProgramButton {
		width: 4.2rem;
		height: 4.8rem;
		margin: 3px;
	}
	.icon-size-small .zhong {
		height: 4.3rem;
	}
	.icon-size-small .glass-icon-btn {
		width: 2rem;
		height: 2rem;
		border-radius: 8px;
		font-size: 1.2rem;
	}
	.icon-size-small .text {
		margin-top: 0.25rem;
	}
	.icon-size-small .text span {
		font-size: 0.62rem;
	}
</style>
