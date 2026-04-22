<template>
	<div class="doc-content">
		<h1>🖱️ 鼠标右键菜单</h1>
		<p>Web OS 内置了一套仿 Windows 原生的桌面右键快捷菜单系统。在桌面空白区域点击鼠标右键，即可呼出上下文菜单，快速访问常用的系统功能。</p>

		<el-divider content-position="left">菜单功能一览</el-divider>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="hover" class="func-card">
					<div slot="header"><i class="el-icon-menu"></i> <b>查看</b></div>
					<p>支持切换桌面图标大小（大图标、中等图标、小图标），并可开关<strong>窗口拖拽缩放</strong>功能。当前选中的选项会以 <strong>✓ 对勾</strong> 标记高亮。</p>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover" class="func-card">
					<div slot="header"><i class="el-icon-refresh"></i> <b>刷新</b></div>
					<p>等同于浏览器刷新操作，一键重载整个 Web OS 桌面。</p>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover" class="func-card">
					<div slot="header"><i class="el-icon-user-solid"></i> <b>个人信息</b></div>
					<p>快速打开当前登录用户的个人信息面板，查看用户名、部门、职位等。</p>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="20" style="margin-top: 15px;">
			<el-col :span="8">
				<el-card shadow="hover" class="func-card">
					<div slot="header"><i class="el-icon-view"></i> <b>显示桌面</b></div>
					<p>一键将所有打开的窗口最小化，快速回到干净的桌面视图。等同于 Windows 的「显示桌面」功能。</p>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover" class="func-card">
					<div slot="header"><i class="el-icon-s-marketing"></i> <b>更换壁纸</b></div>
					<p>打开壁纸选择面板，可切换桌面背景图片，自定义桌面个性化风格。</p>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover" class="func-card">
					<div slot="header"><i class="el-icon-setting"></i> <b>系统设置</b></div>
					<p>打开系统设置面板，可切换深色/浅色主题、语言等全局配置。</p>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="20" style="margin-top: 15px;">
			<el-col :span="8">
				<el-card shadow="hover" class="func-card">
					<div slot="header"><i class="el-icon-full-screen"></i> <b>全屏/退出全屏</b></div>
					<p>动态检测当前是否处于全屏状态，智能切换菜单项文本。浏览器全屏模式下可获得更沉浸的桌面体验。</p>
				</el-card>
			</el-col>
		</el-row>

		<el-divider content-position="left">交互设计细节</el-divider>
		<el-alert title="菜单定位与溢出处理" type="info" :closable="false" show-icon>
			<div slot="default">
				<p>右键菜单的弹出位置会自动根据鼠标坐标计算。当菜单靠近屏幕右侧或底部边缘时，系统会自动调整弹出方向，确保菜单始终完整可见，不会被屏幕截断。</p>
			</div>
		</el-alert>
		<el-alert title="毛玻璃视觉效果" type="success" :closable="false" show-icon style="margin-top: 10px;">
			<div slot="default">
				<p>菜单采用 <code>backdrop-filter: blur(20px)</code> 毛玻璃特效，搭配半透明背景和圆角阴影，营造出接近原生操作系统的高质感视觉体验。同时完美兼容深色模式。</p>
			</div>
		</el-alert>
		<el-alert title="二级子菜单" type="warning" :closable="false" show-icon style="margin-top: 10px;">
			<div slot="default">
				<p>「查看」菜单项支持鼠标悬停展开二级子菜单，实现图标大小的三档切换。子菜单同样采用毛玻璃风格，并带有淡入动画过渡。</p>
			</div>
		</el-alert>
	</div>
</template>

<style scoped>
.doc-content h1 { color: #2c3e50; margin-bottom: 20px; font-size: 24px; }
.doc-content p { line-height: 1.8; color: #606266; font-size: 14px; }
.func-card { margin-bottom: 10px; height: 160px; }
.func-card i { color: #7367f0; margin-right: 5px; font-size: 1.1rem; }
.func-card p { font-size: 13px; color: #666; line-height: 1.6; margin: 0; }
</style>
