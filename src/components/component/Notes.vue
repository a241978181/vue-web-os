<template>
	<div>
		<Modal style="right: 2px;" :styles="{top: '20px'}" :footer-hide="true" width="300" v-model="isPersonalInformationViewBool"
		 draggable scrollable title="个人信息" id="notes">
			<div style="width: 100%;height: 8rem;display: flex;align-items: center;">
				<div style="width: 35%;height: 100%;display: flex;flex-direction: column;align-items: center;border: #000000 solid 1px;">
					<Avatar style="margin-top: 0.75rem;" :src="userInfo.avatarUrl" icon="ios-person" size="70" />
					<Button style="margin: 0.75rem 0px;" @click="updateInfo()" size="small" type="info">修改资料</Button>
				</div>
				<div style="width: 20%;height: 100%;display: flex;flex-direction: column;align-items: center;">
					<div class="tableItem">
						<span>姓名</span>
					</div>
					<div class="tableItem">
						<span>部门</span>
					</div>
					<div class="tableItem">
						<span>职位</span>
					</div>
					<div class="tableItem" style="border-bottom: #000000 solid 1px;">
						<span>电话</span>
					</div>
				</div>
				<div style="width: 45%;height: 100%;display: flex;flex-direction: column;align-items: center;">
					<div class="tableItem">
						<span>{{userInfo.userName}}</span>
					</div>
					<div class="tableItem">
						<span>{{userInfo.department}}</span>
					</div>
					<div class="tableItem">
						<span>{{userInfo.position}}</span>
					</div>
					<div class="tableItem" style="border-bottom: #000000 solid 1px;">
						<span>{{userInfo.phone}}</span>
					</div>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		name: "Notes",
		data() {
			return {
				userInfo: '',
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
			}
		},
		methods: {
		  //修改资料按钮
      updateInfo(){
        this.$message.warning("暂无此功能哦！")
      },
			//获取个人信息
			getUserInfo() {
				this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
			}

		},
		mounted() {
			this.getUserInfo();
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
		border-right: #000000 solid 1px;
		border-top: #000000 solid 1px;
	}
</style>
<style>
	#notes .ivu-modal {
		margin-right: 20px;
	}

	#notes .ivu-modal-header {
		background-color: #348DC1;
	}
</style>
