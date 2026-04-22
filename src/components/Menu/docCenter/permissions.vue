<template>
	<div class="doc-content">
		<h1>🔐 权限与数据驱动体系</h1>
		<p>整个系统的菜单、桌面图标和功能模块完全由 <code>getMenu</code> 接口返回的数据动态生成。</p>
		
		<el-alert title="核心参数说明" type="info" :closable="false" show-icon>
			<div slot="default">
				<p><b>type: 1</b> - 代表「应用级」模块。它会出现在桌面上，点击会弹出一个独立的窗口容器。</p>
				<p><b>type: 2</b> - 代表「功能级」模块。它是应用的子页面或菜单按钮，出现在应用窗口的标题栏下方。</p>
				<p><b>parentid</b> - 指向父级模块的 ID。type 为 2 时必填。若是 type 为 1，则 parentid 通常为 0。</p>
				<p><b>code</b> - 核心键名。必须与 <code>control.js</code> 中的显隐开关名以及 <code>index.js</code> 中的组件注册名一致。</p>
				<p><b>defaultPage</b> - (NEW) 在应用级模块（type:1）上配置，用于指定打开应用时默认显示的子页面 key。</p>
			</div>
		</el-alert>

		<el-divider content-position="left">结构示例</el-divider>
		<pre class="code-block"><code>{
  "id": 11,
  "permissionsname": "介绍文档",
  "code": "docCenter", // 对应应用窗口显隐开关
  "type": 1,
  "defaultPage": "docOverview",   // 默认打开的子页面
  ...
},
{
  "id": 12,
  "permissionsname": "项目总览",
  "code": "docOverview", // 对应子页面组件名
  "type": 2,
  "parentid": 11                  // 归属于 ID 为 11 的应用
}</code></pre>

		<el-divider content-position="left">配置流程</el-divider>
		<el-steps :active="3" simple>
			<el-step title="Mock/DB 配置" icon="el-icon-edit"></el-step>
			<el-step title="Control.js 增加开关" icon="el-icon-switch-button"></el-step>
			<el-step title="编写业务 Vue 组件" icon="el-icon-document"></el-step>
		</el-steps>
		<el-row :gutter="20" style="margin-top: 20px;">
			<el-col :span="12">
				<el-card shadow="hover">
					<div slot="header"><i class="el-icon-menu"></i> <b>开始菜单</b></div>
					<p>左下角 Windows 图标呼出。所有 type:1 的应用都会自动按照分类排列在开始菜单中。</p>
				</el-card>
			</el-col>
		</el-row>
		<el-divider content-position="left">🚀 后端接口替换指南</el-divider>
		<p>如果您已经准备好了 Java/Python/Node 后端，只需执行以下两步即可上线：</p>
		<ol>
			<li><b>找到数据入口</b>：在 <code>src/mock/index.js</code> 中注释掉 <code>import "./modules/common"</code>。</li>
			<li><b>配置 API 地址</b>：在 <code>src/http/index.js</code>（或 <code>.env</code>）中修改 <code>baseURL</code> 为您的后端服务地址。</li>
			<li><b>字段约定</b>：确保后端返回的 JSON 结构中包含 <code>code</code>、<code>type</code> 和 <code>parentid</code> 字段，系统将自动渲染。</li>
		</ol>
	</div>
</template>

<style scoped>
.code-block { background: #f4f4f5; padding: 15px; border-radius: 4px; color: #303133; font-family: monospace; }
</style>
