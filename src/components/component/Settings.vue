<template>
	<div>
		<el-dialog top="200px" width="360px" :visible.sync="settingsViewBool"
		 v-dialogDrag="true" :modal="false" :close-on-click-modal="false" title="系统设置" id="settingsDialog">
			<div class="settings-content">
				<!-- 窗口行为 -->
				<div class="settings-group">
					<div class="settings-group-title">
						<i class="el-icon-monitor"></i>
						<span>窗口行为</span>
					</div>
					<div class="settings-item">
						<div class="settings-item-info">
							<span class="settings-item-label">限制窗口移出屏幕</span>
							<span class="settings-item-desc">开启后，拖拽窗口时不允许超出屏幕边界</span>
						</div>
						<el-switch
							v-model="restrictWindowBounds"
							active-color="#7367f0"
							inactive-color="#dcdfe6">
						</el-switch>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "Settings",
		computed: {
			// 设置面板显隐
			settingsViewBool: {
				get() {
					return this.$store.state.control.settingsViewBool;
				},
				set(v) {
					this.$store.commit("setFalseVB", "settingsViewBool");
				}
			},
			// 是否限制窗口出界
			restrictWindowBounds: {
				get() {
					return this.$store.state.settings.restrictWindowBounds;
				},
				set(v) {
					this.$store.commit("settings/SET_RESTRICT_WINDOW_BOUNDS", v);
				}
			}
		}
	}
</script>

<style scoped>
	.settings-content {
		padding: 0 5px;
	}

	.settings-group {
		margin-bottom: 20px;
	}

	.settings-group-title {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
		padding-bottom: 8px;
		border-bottom: 1px solid #ebeef5;
	}

	.settings-group-title i {
		font-size: 18px;
		color: #7367f0;
		margin-right: 8px;
	}

	.settings-group-title span {
		font-size: 15px;
		font-weight: 600;
		color: #303133;
	}

	.settings-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 10px;
		border-radius: 6px;
		transition: background-color 0.2s;
	}

	.settings-item:hover {
		background-color: #f5f7fa;
	}

	.settings-item-info {
		display: flex;
		flex-direction: column;
		flex: 1;
		margin-right: 15px;
	}

	.settings-item-label {
		font-size: 14px;
		color: #303133;
		font-weight: 500;
	}

	.settings-item-desc {
		font-size: 12px;
		color: #909399;
		margin-top: 4px;
		line-height: 1.4;
	}
</style>

<style>
	#settingsDialog .el-dialog {
		margin-right: 20px;
	}
	#settingsDialog .el-dialog__body {
		padding: 15px 20px;
	}
</style>
