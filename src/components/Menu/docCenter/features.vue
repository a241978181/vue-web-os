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
		<el-row :gutter="20" style="margin-top: 15px;">
			<el-col :span="8">
				<el-card shadow="hover">
					<div slot="header"><i class="el-icon-monitor"></i> <b>深浅双核主题设定</b></div>
					<p>系统内置了基于 <strong>Glassmorphism (毛玻璃)</strong> 物理渲染的深色与浅色双模设计。支持对底层外壳环境及顶部窗口横幅一键切换黑白格调。</p>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover">
					<div slot="header"><i class="el-icon-picture-outline"></i> <b>极致 UI 重构设计</b></div>
					<p>高度定制了桌面程序的图标底座、内部业务专属分段式页签、任务栏底层及开始菜单。提供类似于 Win11/MacOS 风格的光影和浮雕触感。</p>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover">
					<div slot="header"><i class="el-icon-thumb"></i> <b>系统级国际化文案驱动</b></div>
					<p>桌面右键及系统环境完美兼容多语言热切换。针对系统级应用及窗口页签，彻底剥离本地语言包硬编码设定，直接由后端接口的数据字段（<code>permissionsname</code>/<code>nameen</code>）按需渲染双语。</p>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<style scoped>
.el-card i { color: #409EFF; margin-right: 5px; font-size: 1.2rem; }
.el-card p { font-size: 0.9rem; color: #666; line-height: 1.6; }
</style>
