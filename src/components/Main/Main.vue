<template>
	<div style="width: 80%;margin:0rem">
		<Program v-for="item in permissionsList" :key="item.permissionsname" :menu="item"></Program>
	</div>
</template>

<script>
	import Program from "./Program.vue";
  import {getPermissionsList} from '@/utils/permissions.js'
	export default {
		name: "Main",
		components: {
			Program,
		},
		data() {
			return {
				//功能列表
        permissionsList: getPermissionsList(1,null),
			}
		},
		methods: {
		},
		mounted() {
		}
	}
</script>

<style scoped="scoped">

</style>
