<template>
	<div class="doc-content">
		<h1>🚀 Web OS 桌面脚手架项目总览</h1>
		<p>这是一个基于 Vue 2.x 和 Element UI 开发的仿 Windows 桌面交互系统。它不仅仅是一个 UI 案例，更是一个高度可扩展的后台管理系统脚手架。</p>
		
		<el-divider content-position="left">核心理念</el-divider>
		<ul>
			<li><b>多任务并行</b>：支持多个窗口同时打开，像桌面电脑一样自由切换。</li>
			<li><b>窗口管理</b>：支持拖拽、改变大小、最大化、最小化和双击全屏。</li>
			<li><b>纯数据驱动</b>：整个桌面图标、开始菜单、权限控制完全由后端（或 Mock）数据决定。</li>
		</ul>

		<el-divider content-position="left">技术栈</el-divider>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-card shadow="hover" class="tech-card">
					<div slot="header"><b>核心框架</b></div>
					<el-tag>Vue 2.6+</el-tag>
					<el-tag type="success">Element UI</el-tag>
					<el-tag type="warning">Vuex</el-tag>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card shadow="hover" class="tech-card">
					<div slot="header"><b>工具链</b></div>
					<el-tag type="info">Axios</el-tag>
					<el-tag type="danger">Mock.js</el-tag>
					<el-tag>Sass/Less</el-tag>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<style scoped>
.doc-content h1 { color: #2c3e50; margin-bottom: 20px; }
.doc-content p { line-height: 1.8; color: #606266; }
.tech-card { margin-bottom: 15px; }
.el-tag { margin: 5px; }
</style>
