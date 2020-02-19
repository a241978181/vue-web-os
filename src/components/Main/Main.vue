<template>
	<div style="width: 80%;margin:0rem">
		<Program v-for="item in menuList" :key="item.menuName" :menu="item"></Program>
	</div>
</template>

<script>
	import Program from "./Program.vue";
	export default {
		name: "Main",
		components: {
			Program,
		},
		data() {
			return {
				//功能列表
				menuList: [],
			}
		},
		methods: {
			//查询所拥有的权限
			getMenuList() {
				let menuList = JSON.parse(localStorage.getItem("menuList"));
				this.menuList = menuList;
			}
		},
		mounted() {
			this.getMenuList();
		}
	}
</script>

<style scoped="scoped">

</style>
