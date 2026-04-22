<template>
	<div class="doc-content">
		<h1>📑 菜单栏优化设计</h1>
		<p>Web OS 对应用窗口内的菜单栏（Tab 页签栏）进行了深度优化，在大量菜单场景下依然保持流畅、美观的交互体验。</p>

		<el-divider content-position="left">溢出滚动机制</el-divider>
		<el-card shadow="hover" class="tech-card">
			<div slot="header"><i class="el-icon-d-arrow-left"></i> <b>智能双箭头导航</b></div>
			<p>当应用窗口包含的菜单页面过多、标签总宽度超出窗口可用空间时，系统不会让标签换行显示，而是自动启用<strong>水平滚动模式</strong>：</p>
			<ul>
				<li>标签栏左右两端会出现 <el-tag size="mini" type="primary">◀</el-tag> <el-tag size="mini" type="primary">▶</el-tag> 导航箭头按钮</li>
				<li>点击箭头即可平滑滚动标签栏，快速定位到目标菜单</li>
				<li>支持鼠标<strong>滚轮横向滚动</strong>，无需点击箭头也能自由浏览</li>
				<li>箭头的显隐是<strong>智能判断</strong>的：已滚动到最左侧时左箭头自动隐藏，到最右侧时右箭头隐藏</li>
			</ul>
		</el-card>

		<el-alert title="视觉体验" type="success" :closable="false" show-icon style="margin-top: 15px;">
			<div slot="default">
				<p>箭头按钮采用圆形设计，配合主题色半透明背景和 hover 放大动画。无论浅色还是深色模式，都保持优雅统一的视觉风格。</p>
			</div>
		</el-alert>

		<el-divider content-position="left">按需加载 — 零冗余渲染</el-divider>
		<el-card shadow="hover" class="tech-card">
			<div slot="header"><i class="el-icon-lightning"></i> <b>动态组件按需渲染</b></div>
			<p>也许你会担心：如果一个应用包含几十个菜单页面，会不会导致前端卡顿？答案是<strong>完全不会</strong>。原因如下：</p>
			<el-row :gutter="20" style="margin-top: 10px;">
				<el-col :span="12">
					<el-card shadow="never" class="inner-card">
						<div slot="header"><b>🎯 仅渲染当前页</b></div>
						<p>系统使用 Vue 的 <code>&lt;component :is="..."&gt;</code> 动态组件机制。在任意时刻，<strong>只有当前选中的那一个菜单页面</strong>会被实际渲染到 DOM 中。其余菜单只是标签栏上的文字按钮，不占用任何渲染资源。</p>
					</el-card>
				</el-col>
				<el-col :span="12">
					<el-card shadow="never" class="inner-card">
						<div slot="header"><b>🧩 标签本身极轻量</b></div>
						<p>每个标签按钮仅由一个图标和一段文字构成（约 3 个 DOM 节点）。即使有 50 个菜单标签，总共也只增加约 150 个极简 DOM 节点，对现代浏览器来说完全没有压力。</p>
					</el-card>
				</el-col>
			</el-row>
		</el-card>

		<el-divider content-position="left">技术实现要点</el-divider>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="hover" class="point-card">
					<div slot="header"><i class="el-icon-s-operation"></i> <b>overflow: hidden</b></div>
					<p>滚动容器设置 <code>overflow: hidden</code>，配合 <code>white-space: nowrap</code> 和 <code>flex-shrink: 0</code>，确保标签始终单行排列不换行。</p>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover" class="point-card">
					<div slot="header"><i class="el-icon-position"></i> <b>scrollBy smooth</b></div>
					<p>箭头点击使用浏览器原生的 <code>scrollBy({ behavior: 'smooth' })</code> 实现平滑滚动动画，无需引入额外的动画库。</p>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover" class="point-card">
					<div slot="header"><i class="el-icon-aim"></i> <b>自动聚焦</b></div>
					<p>切换菜单时，如果被激活的 Tab 不在可视区域内，系统会自动将其滚动到可见范围，确保用户始终能看到当前选中项。</p>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<style scoped>
.doc-content h1 { color: #2c3e50; margin-bottom: 20px; font-size: 24px; }
.doc-content p { line-height: 1.8; color: #606266; font-size: 14px; }
.doc-content ul { line-height: 2; color: #606266; font-size: 14px; }
.tech-card { margin-bottom: 15px; }
.tech-card p { font-size: 13px; margin: 0; }
.inner-card { margin-bottom: 0; }
.inner-card p { font-size: 13px; margin: 0; color: #606266; line-height: 1.7; }
.point-card { margin-bottom: 10px; }
.point-card i { color: #7367f0; margin-right: 5px; font-size: 1.1rem; }
.point-card p { font-size: 13px; color: #666; line-height: 1.6; margin: 0; }
</style>
