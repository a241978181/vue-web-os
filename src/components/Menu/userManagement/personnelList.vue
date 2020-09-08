<template>
	<div id="view">
		<br/>
		<br/>
		<h3>1.从GitHub上获取本项目</h3>
		<br/>
		<p style="background-color: #ffbcdd;width: 25rem;">
			git clone https://github.com/a241978181/vue-web-os.git
		</p>
		<br/>
		<br/>
		<h3>2.进入项目目录，下载环境</h3>
		<br/>
		<p style="background-color: #ffbcdd;width: 25rem;">
			yarn install
		</p>
		<br/>
		<br/>
		<h3>3.启动项目</h3>
		<br/>
		<p style="background-color: #ffbcdd;width: 25rem;">
			yarn serve
		</p>
		<br/>
		<br/>
		<h3>4.打包项目</h3>
		<br/>
		<p style="background-color: #ffbcdd;width: 25rem;">
			yarn build
		</p>
		
	</div>
</template>

<script>
	export default{
		name:"personnelList",
		props:{
			menu: '',
		},
		data(){
			return{
				
			}
		},
		methods:{
			
		},
		mounted() {
			
		}
	}
</script>

<style scoped="scoped">
	#view {
		width: 100%;
		height: 100%;
		padding: 0px;
		margin: 0px;
		margin-top: 0.9375rem;
	}
</style>
