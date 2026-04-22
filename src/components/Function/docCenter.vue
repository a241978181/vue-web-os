<template>
	<div>
		<el-dialog :width="customWidth" top="5vh" id="modalView" custom-class="os-dialog" :fullscreen="fullscreen" :visible.sync="isViewBool" :modal="false" :close-on-click-modal="false" v-dialogDrag="draggable" v-dialogResize="resizeOptions" :show-close="false">
			<!-- 头-->
			<FuctionHeader slot="title" @mini="mini" @big="big" @small="small" @closeView="closeView"
						   :fullscreen="fullscreen" :menu="menu"></FuctionHeader>

			<!-- 主体 -->
			<div style="width: 100%;display: flex;flex-direction: column;align-items: center; min-height: 600px;">
				<div style="width: 100%;display: flex;align-items: center;">
					<el-tooltip class="item" effect="dark" :content="$t('m.layout.refresh')" placement="bottom">
						<a> <i class="el-icon-refresh" @click="refresh" style="margin-right: 15px; font-size: 25px;"></i></a>
					</el-tooltip>
					<!--标题栏-->
					<FuctionTitle @openMenu="openMenu" :permissionsList="permissionsList"
								  :indexButton="indexButton"></FuctionTitle>
				</div>
				<div class="doc-container">
					<component @routerTo="openMenu2(arguments)" :is="allComps[permissionsItem.code]"
							   :menu="permissionsItem" :dataItem="dataItem"></component>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import allComps from '@/components/Menu/docCenter'
	import {getPermissionsList} from '@/utils/permissions.js'
	import FuctionHeader from "@/components/util/FuctionHeader";
	import FuctionTitle from "@/components/util/FuctionTitle";

	export default {
		name: "docCenter",
		props: {
			menu: '',
		},
		components: {
			FuctionHeader,
			FuctionTitle
		},
		data() {
			return {
				allComps: allComps,
				permissionsItem: '',
				fullscreen: true,
				draggable: false,
				indexButton: null,
				dataItem:null,
				//自定义窗口宽度
				customWidth: '1000px',
				//自定义窗口高度
				customHeight: null
			}
		},
		computed: {
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
			refresh(){
				let oldIndex=this.indexButton;
				let oldPermissionsItem=this.permissionsItem;
				this.openMenu({},-1)
				this.timer = setTimeout(()=>{
					this.openMenu(oldPermissionsItem,oldIndex)
				},0);
			},
			openMenu2(values) {
				this.indexButton = values[0].code;
				this.permissionsItem = values[0];
				if (values[1]){
					this.dataItem=values[1];
				}
			},
			openMenu(item, index) {
				this.indexButton = item.code;
				this.permissionsItem = item;
				this.dataItem=null;
			},
			closeView() {
				this.$store.commit("setFalseVB", this.menu.code);
				this.$store.commit("deleteTaskList", this.menu);
			},
			small() {
				this.fullscreen = false
				this.draggable = true
				// 恢复记忆的窗口尺寸
				var saved = this.$store.state.settings.windowSizes[this.menu.code];
				if (saved) {
					this.customWidth = saved.width + 'px';
				}
			},
			big() {
				this.fullscreen = true
				this.draggable = false
			},
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
	.doc-container {
		width: 100%;
		flex: 1;
		margin-top: 15px;
		background: #fff;
		border-radius: 8px;
		padding: 20px;
		box-sizing: border-box;
		overflow-y: auto;
		max-height: 70vh;
	}
</style>
