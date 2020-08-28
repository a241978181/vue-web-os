<template>
	<div style="width: 80%;margin:0rem">
		<Program v-for="item in permissionsList" :key="item.permissionsname" :menu="item"></Program>
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
        permissionsList: [],
			}
		},
		methods: {
			//查询所拥有的权限
			getMenuList() {
        let permissionsList = JSON.parse(localStorage.getItem("permissionsList"));
        this.permissionsList=[];
        for(var i=0;i<permissionsList.length;i++){
          if (permissionsList[i].type==1) {
            this.permissionsList.push(permissionsList[i]);
          }
        }
			}
		},
		mounted() {
			this.getMenuList();
		}
	}
</script>

<style scoped="scoped">

</style>
