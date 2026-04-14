<template>
	<div class="doc-content">
		<h1>🌟 核心功能特性</h1>
		<p>我们不仅是在开发一个界面，更是在实现一套完整的桌面管理逻辑。以下是目前系统的核心功能点：</p>
		
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="hover">
					<div slot="header"><i class="el-icon-rank"></i> <b>窗口自适应拖拽</b></div>
					<p>支持窗口在桌面上自由拖动，且具备<strong>边界自动限制</strong>功能，窗口底部会自动避开任务栏（2.5rem 区域）。</p>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover">
					<div slot="header"><i class="el-icon-full-screen"></i> <b>一键全屏模式</b></div>
					<p>支持窗口最大化切换。全屏时，高度会自动减去底部任务栏（calc(100% - 2.5rem)），保证布局完美融合。</p>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card shadow="hover">
					<div slot="header"><i class="el-icon-mouse"></i> <b>右键快捷菜单</b></div>
					<p>桌面空白处点击右键，提供「更换壁纸」、「系统设置」等快捷入口。这是系统的灵魂点之一。</p>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card shadow="hover">
					<div slot="header"><i class="el-icon-menu"></i> <b>开始菜单</b></div>
					<p>仿 Windows 开始菜单逻辑，所有 type:1 的应用会自动聚合在此，且具备响应式搜索与分类。</p>
				</el-card>
			</el-col>
		</el-row>

		<el-divider content-position="left">近期重大优化</el-divider>
		<el-timeline>
			<el-timeline-item timestamp="2026-04-14" placement="top" color="#409EFF">
				<el-card>
					<h4>边界碰撞检测算法优化</h4>
					<p>修复了 Element UI 对话框居中定位导致的拖拽坐标偏移问题。通过 <code>getBoundingClientRect()</code> 实现精确到像素级的边界锚定。</p>
				</el-card>
			</el-timeline-item>
			<el-timeline-item timestamp="2026-04-14" placement="top">
				<el-card>
					<h4>任务栏交互增强</h4>
					<p>支持任务栏图标的<strong>点击切换（Toggle）</strong>逻辑，实现了“点击弹出 - 再点隐藏”的闭环体验，极大地提升了多任务处理效率。</p>
				</el-card>
			</el-timeline-item>
		</el-timeline>
	</div>
</template>

<style scoped>
.el-card i { color: #409EFF; margin-right: 5px; font-size: 1.2rem; }
.el-card p { font-size: 0.9rem; color: #666; line-height: 1.6; }
</style>
