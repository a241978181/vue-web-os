<template>
	<div>
		<el-dialog :width="customWidth" top="5vh" id="modalView" custom-class="os-dialog" :fullscreen="fullscreen" :visible.sync="isViewBool" :modal="false" :close-on-click-modal="false" v-dialogDrag="draggable" v-dialogResize="resizeOptions" :show-close="false">
			<!-- 头-->
			<FuctionHeader slot="title" @mini="mini" @big="big" @small="small" @closeView="closeView"
						   :fullscreen="fullscreen" :menu="menu"></FuctionHeader>

			<!-- 主体 -->
			<div style="width: 100%;display: flex;flex-direction: column;align-items: center;">
				<div style="width: 100%;display: flex;align-items: center;">
					<el-tooltip class="item" effect="dark" :content="$t('m.layout.refresh')" placement="bottom">
						<a> <i class="el-icon-refresh" @click="refresh" style="margin-right: 5px; font-size: 25px;"></i></a>
					</el-tooltip>
					<!--标题栏-->
					<FuctionTitle @openMenu="openMenu" :permissionsList="permissionsList"
								  :indexButton="indexButton"></FuctionTitle>
				</div>
				<component @routerTo="openMenu2(arguments)" :is="allComps[permissionsItem.code]"
						   :menu="permissionsItem" :dataItem="dataItem"></component>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import allComps from '../Menu/userManagement/index.js'
	import {getPermissionsList} from '@/utils/permissions.js'
	import FuctionHeader from "@/components/util/FuctionHeader";
	import FuctionTitle from "@/components/util/FuctionTitle";

	export default {
		name: "userManagement",
		props: {
			menu: '',
		},
		components: {
			FuctionHeader,
			FuctionTitle
		},
		data() {
			return {
				// 组件集合
				allComps: allComps,
				//当前组件
				permissionsItem: '',
				//全屏
				fullscreen: true,
				//移动
				draggable: false,
				//当前菜单按钮
				indexButton: null,
				//页面跳转时的数据
				dataItem:null,
				//自定义窗口宽度
				customWidth: '900px',
				//自定义窗口高度
				customHeight: null
			}
		},
		computed: {
			// 菜单（响应式）
			permissionsList() {
				return getPermissionsList(2, this.menu.id);
			},
			// 是否启用窗口缩放
			enableWindowResize() {
				return this.$store.state.settings.enableWindowResize;
			},
			// 缩放指令选项
			resizeOptions() {
				return {
					minWidth: 600,
					minHeight: 400,
					appCode: this.menu.code
				};
			},
			//判断是否展示该面板
			isViewBool: {
				get() {
					return this.$store.state.control[this.menu.code];
				},
				set(v) {
					this.$store.commit("setFalseVB", this.menu.code);
				}
			},
		},
		watch: {
			isViewBool(newVal) {
				if (newVal) {
					if (this.menu.defaultPage && this.permissionsList.length > 0) {
						const target = this.permissionsList.find(
							item => item.code === this.menu.defaultPage
						);
						if (target) {
							this.permissionsItem = target;
							this.indexButton = target.code;
						}
					} else {
						this.permissionsItem = '';
						this.indexButton = null;
					}
					this.dataItem = null;
				}
			}
		},
		methods: {
			//刷新
			refresh(){
				let oldIndex=this.indexButton;
				let oldPermissionsItem=this.permissionsItem;
				this.openMenu({},-1)
				this.timer = setTimeout(()=>{   //设置延迟执行,刷新必须，0毫秒为无延迟
					this.openMenu(oldPermissionsItem,oldIndex)
				},0);
			},
			//子组件调用打开菜单
			openMenu2(values) {
				this.indexButton = values[0].code;
				this.permissionsItem = values[0];
				if (values[1]){
					this.dataItem=values[1];
				}

			},
			//打开菜单
			openMenu(item, index) {
				this.indexButton = item.code;
				this.permissionsItem = item;
				this.dataItem=null;
			},
			//关闭对话框
			closeView() {
				this.$store.commit("setFalseVB", this.menu.code);
				this.$store.commit("deleteTaskList", this.menu);
			},
			//缩小对话框
			small() {
				this.fullscreen = false
				this.draggable = true
				// 恢复记忆的窗口尺寸
				var saved = this.$store.state.settings.windowSizes[this.menu.code];
				if (saved) {
					this.customWidth = saved.width + 'px';
				}
			},
			//放大对话框
			big() {
				this.fullscreen = true
				this.draggable = false
			},
			//最小化
			mini() {
				this.$store.commit("setFalseVB", this.menu.code);
			},
		},
		mounted() {
			if (this.menu.defaultPage && this.permissionsList.length > 0) {
				const target = this.permissionsList.find(
					item => item.code === this.menu.defaultPage
				);
				if (target) {
					this.permissionsItem = target;
					this.indexButton = target.code;
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.BTL {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
<style>
	#modalView .el-dialog__body { padding: 10px 20px; }
	#modalView .el-dialog__body { padding: 10px 20px; }
</style>
