<template>
	<div class="doc-content">
		<h1>✨ Keep-Alive 窗口状态缓存与动画特效</h1>
		<p>本次改造旨在解决 Web OS 桌面窗口管理的内存泄漏风险，同时保留原有的窗口动画交互体验。它实现了一个轻量、高效的窗口生命周期控制机制。</p>
		
		<el-divider content-position="left">机制与性能提升</el-divider>
		<el-card shadow="hover" class="tech-card" style="height: auto;">
			<div slot="header"><b>v-if + Keep-Alive 动态控制</b></div>
			<p>当前系统窗口的渲染完全由任务栏状态 (<code>isInTaskList</code>) 控制。只有当应用处于任务栏时，才允许渲染；配合 <code>&lt;keep-alive&gt;</code> 指令，窗口在最小化时不会被销毁，保留了用户的操作状态。最重要的是，一旦彻底关闭应用，其组件实例和 DOM 节点就会从内存中完全移除。</p>
			<p style="margin-top: 10px;"><b>性能收益：</b>这种按需挂载与释放的机制，彻底杜绝了后台冗余组件累积导致的内存泄漏和卡顿隐患，使得在同时打开大量应用并频繁切换时，系统依然能够保持流畅和高效。</p>
		</el-card>

		<el-divider content-position="left">核心实现原理</el-divider>
		<p>为了保证窗口动画不因为 <code>v-if</code> 的突然销毁而失效，我们引入了 <code>componentAlive</code> 和定时器策略解耦 <code>v-if</code> 与 <code>taskList</code>：</p>
		<ul>
			<li><b>打开动画：</b>先渲染 <code>v-if</code> 组件，保持 <code>dialog</code> 隐藏，随后通过 <code>$nextTick</code> 触发 <code>visible=true</code> 使得入场动画顺利播放。</li>
			<li><b>关闭动画：</b>触发关闭时，先使得 <code>dialog</code> 执行退场动画，并延迟 <code>350ms</code> 后再将 <code>v-if</code> 置为 <code>false</code> 彻底销毁组件，确保退场特效完全展现。</li>
		</ul>

		<el-divider content-position="left">后续开发注意事项 ⚠️</el-divider>
		<el-alert title="请在开发新应用时遵守以下规范" type="warning" show-icon :closable="false" style="margin-bottom: 15px;">
			<ol style="margin-top: 10px; margin-bottom: 0;">
				<li><b>组件命名一致性：</b>新建窗口组件时，<code>export default { name: 'xxx' }</code> 必须与后端/Mock中的权限 <code>code</code> 完全一致，否则 Keep-Alive 无法缓存，导致每次最小化都会清空数据！</li>
				<li><b>生命周期变更：</b>组件在任务栏驻留期间（即使最小化）不会触发 <code>destroyed</code>。如果需要监听页面隐藏和显示，请使用 <code>activated</code> 和 <code>deactivated</code> 钩子。</li>
				<li><b>避免 append-to-body：</b>在封装窗口应用时，尽量不要在 <code>el-dialog</code> 或其他弹窗层上使用 <code>append-to-body</code> 属性。这可能会导致 Keep-Alive 缓存或销毁组件时，外部挂载的 DOM 节点成为残留孤儿。</li>
			</ol>
		</el-alert>
	</div>
</template>

<style scoped>
.doc-content h1 { color: #2c3e50; margin-bottom: 20px; font-size: 24px; }
.doc-content p { line-height: 1.8; color: #606266; font-size: 14px; }
.doc-content ul, .doc-content ol { line-height: 1.8; color: #606266; font-size: 14px; }
.tech-card { margin-bottom: 15px; height: 160px;}
.tech-card p { font-size: 13px; margin: 0;}
</style>
