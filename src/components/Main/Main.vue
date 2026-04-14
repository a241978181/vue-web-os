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
		computed: {
			// 功能列表（响应式，Vuex 数据变化时自动更新）
			permissionsList() {
				return getPermissionsList(1, null);
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
