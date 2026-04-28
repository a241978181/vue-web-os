<template>
	<div class="doc-content">
		<h1>🔔 消息通知中心</h1>
		<p>Web OS 内置了一套统一的消息通知中心系统。任务栏右下角的铃铛图标是通知入口，点击后从屏幕右侧滑出抽屉面板，集中展示全系统的历史通知消息。</p>

		<el-divider content-position="left">核心架构</el-divider>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="hover" class="func-card">
					<div slot="header"><i class="el-icon-connection"></i> <b>$notify 代理拦截</b></div>
					<p>系统在 <code>Vue.use(ElementUI)</code> 之后安装了代理插件，包装了 <code>$notify</code> 方法。全系统任何位置调用 <code>this.$notify()</code> 都会被自动拦截并写入 Vuex Store 留存，同时保留 Element UI 原始弹窗效果。</p>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover" class="func-card">
					<div slot="header"><i class="el-icon-coin"></i> <b>Vuex 状态管理</b></div>
					<p>通知数据由 <code>notification</code> Vuex 模块管理，维护一个 <code>notifications[]</code> 数组。每条通知包含 id、title、message、type、time、read 六个字段。通过 getter 实时计算未读数量。</p>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover" class="func-card">
					<div slot="header"><i class="fa fa-bell"></i> <b>任务栏铃铛入口</b></div>
					<p>铃铛图标位于任务栏右侧（电池图标左方）。当有未读消息时，铃铛右上角显示红色数字角标，带有呼吸缩放动画，吸引用户注意。</p>
				</el-card>
			</el-col>
		</el-row>

		<el-divider content-position="left">交互操作说明</el-divider>
		<el-table :data="actionTableData" stripe border style="width: 100%" size="small">
			<el-table-column prop="action" label="操作" width="180"></el-table-column>
			<el-table-column prop="trigger" label="触发方式" width="200"></el-table-column>
			<el-table-column prop="effect" label="效果说明"></el-table-column>
		</el-table>

		<el-divider content-position="left">动画与视觉细节</el-divider>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-alert title="🫧 呼吸灯角标" type="warning" :closable="false" show-icon>
					<div slot="default">
						<p>任务栏铃铛图标右上角的红色角标采用 <code>badge-pulse</code> 关键帧动画，以 2 秒为一个周期，在 <code>scale(1)</code> 与 <code>scale(1.1)</code> 之间循环缩放，形成呼吸灯效果。角标使用渐变色背景 <code>#ff6b6b → #ee5a24</code>，配合 <code>box-shadow</code> 投射光晕，视觉醒目。</p>
					</div>
				</el-alert>
			</el-col>
			<el-col :span="12">
				<el-alert title="💜 未读脉冲指示器" type="success" :closable="false" show-icon>
					<div slot="default">
						<p>通知列表中未读条目右上角有一个 8px 的紫色圆点，使用 <code>nc-pulse</code> 动画以 2 秒为周期在 <code>opacity 1 → 0.6</code> 和 <code>scale(1) → scale(0.8)</code> 之间循环，搭配 <code>box-shadow</code> 紫色光晕。用户点击通知条目后标记为已读，圆点和左侧高亮边框同时消失。</p>
					</div>
				</el-alert>
			</el-col>
		</el-row>
		<el-row :gutter="20" style="margin-top: 15px;">
			<el-col :span="12">
				<el-alert title="➡️ 列表过渡动画" type="info" :closable="false" show-icon>
					<div slot="default">
						<p>通知列表使用 <code>transition-group</code> 实现进场/退场动画。新消息从右侧 <code>translateX(30px)</code> 滑入；删除消息向左 <code>translateX(-30px)</code> 滑出。列表重排时带有平滑的 <code>transform</code> 过渡，视觉自然流畅。</p>
					</div>
				</el-alert>
			</el-col>
			<el-col :span="12">
				<el-alert title="🌙 深色模式适配" type="" :closable="false" show-icon>
					<div slot="default">
						<p>通知中心抽屉面板完整适配深色模式。背景色、卡片色、文字色、按钮色均在 <code>.theme-dark</code> 选择器下做了针对性覆盖，与系统整体风格保持一致。</p>
					</div>
				</el-alert>
			</el-col>
		</el-row>

		<el-divider content-position="left">已读逻辑流程</el-divider>
		<el-steps :active="4" finish-status="success" align-center>
			<el-step title="新通知到达" description="$notify 被代理拦截，commit ADD_NOTIFICATION 写入 Store，read = false"></el-step>
			<el-step title="角标更新" description="unreadCount getter 自动计算，铃铛角标数字 +1，呼吸灯动画启动"></el-step>
			<el-step title="用户点击通知" description="触发 MARK_READ mutation，该条 read 改为 true，紫色脉冲圆点消失，左侧高亮边框移除"></el-step>
			<el-step title="全部已读" description="点击全部已读按钮，所有通知 read 变为 true，铃铛角标消失，呼吸灯停止"></el-step>
		</el-steps>

		<el-divider content-position="left">Demo 体验</el-divider>
		<el-alert title="如何体验通知中心功能？" type="info" :closable="false" show-icon>
			<div slot="default">
				<p>在桌面空白区域 <strong>点击鼠标右键</strong>，选择菜单中的 <strong>「模拟新通知」</strong> 选项，系统会随机生成一条通知消息。生成的消息会同时以 Element UI 弹窗形式展示，并被代理自动记录到通知中心。随后点击任务栏右下角的 <strong>🔔 铃铛图标</strong> 即可查看所有历史通知。</p>
			</div>
		</el-alert>
	</div>
</template>

<script>
export default {
	name: 'docNotification',
	data() {
		return {
			actionTableData: [
				{ action: '打开通知中心', trigger: '点击任务栏铃铛图标', effect: '从右侧滑出抽屉面板，展示所有历史通知' },
				{ action: '标记单条已读', trigger: '点击通知条目', effect: '该条目未读圆点消失，左侧紫色高亮边框移除' },
				{ action: '全部标记已读', trigger: '点击头部「✓」按钮', effect: '所有通知标记为已读，铃铛角标消失' },
				{ action: '删除单条通知', trigger: '悬停条目后点击右上角「×」', effect: '该条通知被移除，带有向左滑出动画' },
				{ action: '清空全部通知', trigger: '点击头部「🗑」按钮', effect: '清空所有通知，显示空状态占位图' },
				{ action: '模拟新通知', trigger: '桌面右键菜单 → 模拟新通知', effect: '随机生成一条通知，弹窗+记录同时触发，铃铛角标+1' },
				{ action: '关闭通知中心', trigger: '点击遮罩层或抽屉外区域', effect: '抽屉面板收回，通知数据保留' },
			]
		};
	}
};
</script>

<style scoped>
.doc-content h1 { color: #2c3e50; margin-bottom: 20px; font-size: 24px; }
.doc-content p { line-height: 1.8; color: #606266; font-size: 14px; }
.func-card { margin-bottom: 10px; min-height: 160px; }
.func-card i { color: #7367f0; margin-right: 5px; font-size: 1.1rem; }
.func-card p { font-size: 13px; color: #666; line-height: 1.6; margin: 0; }
.func-card code { background: #f5f2ff; color: #7367f0; padding: 1px 5px; border-radius: 3px; font-size: 12px; }
</style>
