<template>
	<div id="view">
		<h3>页面跳转介绍</h3>
		<br/>
		<br/>
		<span>本项目的页面跳转无法使用路由进行跳转，下面按钮为演示跳转的可行方法</span>
		<br/>
		<br/>
		<el-button @click="goto()" type="primary">点击我跳转到【按钮】标签页面下</el-button>
		<el-button @click="goto2()" type="primary">点击我跳转到【隐藏页面】标签页面下</el-button>
	</div>
</template>

<script>
	export default{
		name:"pageJump",
		props:{
			menu: '',
		},
		data(){
			return{

			}
		},
		methods:{
			//页面跳转
			goto(){
				//documentCenter为跳转页面的英文名称，必须是同级目录中的
				this.$emit("routerTo",{permissionsenglish:"documentCenter"},1);
			},
			//页面跳转
			goto2(){
				//documentCenter为跳转页面的英文名称，必须是同级目录中的
				this.$emit("routerTo",{permissionsenglish:"hiddenRouting"});
			}

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
