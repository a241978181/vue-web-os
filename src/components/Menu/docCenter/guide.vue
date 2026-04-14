<template>
	<div class="doc-content">
		<h1>🛠 开发与部署指南</h1>
		<p>遵循以下步骤，您可以快速地在本地启动该项目并进行二次开发。</p>
		
		<el-divider content-position="left">本地起步</el-divider>
		<p>1. <b>环境要求</b>：推荐使用 Node.js 14.x 或更高版本。确保您的项目路径中没有中文（以防依赖安装出错）。</p>
		<p>2. <b>安装依赖</b>：</p>
		<code-block lang="bash">npm install</code-block>
		<p>3. <b>启动开发模式</b>：</p>
		<code-block lang="bash">npm run serve</code-block>
		<p>浏览器打开 <code>http://localhost:8080</code> 即可访问。</p>

		<el-divider content-position="left">项目打包</el-divider>
		<p>将项目部署到生产环境（如 Nginx、Tomcat）时，请执行：</p>
		<code-block lang="bash">npm run build</code-block>
		<p>执行完毕后，根项目下会生成 <code>dist/</code> 文件夹，将其中的内容上传至服务器即可。</p>

		<el-divider content-position="left">💡 常见问题</el-divider>
		<el-collapse v-model="activeNames">
			<el-collapse-item title="修改了 Mock 数据没生效？" name="1">
				<div>Mock 数据在登录成功后通过 <code>getMenu</code> 接口拉取并缓存。如果修改了 Mock，请务必「退出登录」后重新进入，以便数据重新同步。</div>
			</el-collapse-item>
			<el-collapse-item title="如何新增一个桌面图标？" name="2">
				<div>1. 在 <code>common.js</code> 中新增一个 type:1 的对象。</div>
				<div>2. 在 <code>src/components/Function/</code> 下创建一个同名的 Vue 窗口组件（参考 docCenter.vue）。</div>
				<div>3. 在 <code>store/modules/control.js</code> 的 state 中增加对应的 Boolean 显隐开关。</div>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeNames: ['1']
		};
	}
}
</script>

<style scoped>
code-block { display: block; background: #282c34; color: #abb2bf; padding: 12px; border-radius: 6px; font-family: 'Consolas', 'Monaco', monospace; margin: 10px 0; }
</style>
