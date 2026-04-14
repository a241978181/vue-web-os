<template>
	<div class="doc-content">
		<h1>🛠 安装与快速启动</h1>
		<p>遵循以下步骤，您可以快速地在本地启动该项目并进行二次开发。</p>
		
		<el-divider content-position="left">1. 获取源代码</el-divider>
		<p>从代码仓库克隆本项目到本地：</p>
		<div class="code-block">git clone https://github.com/a241978181/vue-web-os.git</div>

		<el-divider content-position="left">2. 安装依赖环境</el-divider>
		<el-alert title="环境提示" type="info" :closable="false" show-icon style="margin-bottom: 10px;">
			推荐使用 Node.js 14.x ~ 16.x 版本。
		</el-alert>
		<p>进入项目目录并执行：</p>
		<div class="code-block">npm install</div>

		<el-divider content-position="left">3. 启动开发服务器</el-divider>
		<div class="code-block">npm run serve</div>
		<p>启动成功后，访问 <code>http://localhost:8080</code> 即可进入系统。</p>

		<el-divider content-position="left">4. 项目打包编译</el-divider>
		<p>生成用于部署到服务器的静态资源：</p>
		<div class="code-block">npm run build</div>
	</div>
</template>

<script>
	export default{
		name:"personnelList",
		props:{
			menu: '',
		}
	}
</script>

<style scoped="scoped">
.doc-content { padding: 10px; }
.doc-content h1 { color: #2c3e50; font-size: 1.5rem; margin-bottom: 20px; }
.doc-content p { color: #606266; line-height: 1.6; margin: 10px 0; }
.code-block { 
	background: #282c34; 
	color: #abb2bf; 
	padding: 12px 15px; 
	border-radius: 6px; 
	font-family: 'Consolas', 'Monaco', monospace; 
	margin: 10px 0;
	box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
}
</style>
