<template>
	<div>
		<el-dialog top="20px" width="300px" :visible.sync="isPersonalInformationViewBool"
		 v-dialogDrag="true" :modal="false" :close-on-click-modal="false" title="个人信息" id="notes">
			<div style="width: 100%;height: 8rem;display: flex;align-items: center;">
				<div style="width: 35%;height: 100%;display: flex;flex-direction: column;align-items: center;border-right: #E4E7ED solid 1px; background: #fafafa;">
					<el-avatar style="margin-top: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" :src="userInfo.avatarUrl" icon="el-icon-user-solid" :size="75"></el-avatar>
					<el-button style="margin: 1rem 0px;" @click="updateInfo()" size="small" type="primary" plain round>修改资料</el-button>
				</div>
				<div style="width: 20%;height: 100%;display: flex;flex-direction: column;align-items: center; background: #ffffff;">
					<div class="tableItem">
						<span style="font-weight: 500; color: #909399;">姓名</span>
					</div>
					<div class="tableItem">
						<span style="font-weight: 500; color: #909399;">部门</span>
					</div>
					<div class="tableItem">
						<span style="font-weight: 500; color: #909399;">职位</span>
					</div>
					<div class="tableItem" style="border-bottom: #EBEEF5 solid 1px;">
						<span style="font-weight: 500; color: #909399;">电话</span>
					</div>
				</div>
				<div style="width: 45%;height: 100%;display: flex;flex-direction: column;align-items: center; background: #ffffff;">
					<div class="tableItem">
						<span style="color: #303133;">{{userInfo.userName}}</span>
					</div>
					<div class="tableItem">
						<span style="color: #303133;">{{userInfo.department}}</span>
					</div>
					<div class="tableItem">
						<span style="color: #303133;">{{userInfo.position}}</span>
					</div>
					<div class="tableItem" style="border-bottom: #EBEEF5 solid 1px;">
						<span style="color: #303133;">{{userInfo.phone}}</span>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "Notes",
		data() {
			return {
			}
		},
		computed: {
			//判断是否展示该面板
      isPersonalInformationViewBool: {
				get() {
					return this.$store.state.control.personalInformationViewBool;
				},
				set(v) {
					this.$store.commit("setFalseVB","personalInformationViewBool");
				}
			},
			// 从 Vuex 获取用户信息
			userInfo() {
				return this.$store.state.permission.userInfo || {};
			}
		},
		methods: {
		  //修改资料按钮
      updateInfo(){
        this.$message.warning("暂无此功能哦！")
      },
		},
		mounted() {
		}
	}
</script>

<style scoped="scoped">
	.tableItem {
		width: 100%;
		height: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-right: #EBEEF5 solid 1px;
		border-top: #EBEEF5 solid 1px;
	}
</style>
<style>
	#notes .el-dialog {
		margin-right: 20px;
	}

</style>
