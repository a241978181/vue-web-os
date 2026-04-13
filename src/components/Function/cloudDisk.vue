<template>
    <div>
        <el-dialog width="900px" top="5vh" id="modalView" custom-class="os-dialog" :fullscreen="fullscreen" :visible.sync="isViewBool" :modal="false" v-dialogDrag="draggable" :show-close="false">
            <!-- 头-->
            <FuctionHeader slot="title" @mini="mini" @big="big" @small="small" @closeView="closeView"
                           :fullscreen="fullscreen" :menu="menu"></FuctionHeader>

            <!-- 主体 -->
            <div style="width: 100%;display: flex;flex-direction: column;align-items: center;">
                <div style="width: 100%;display: flex;align-items: center;">
                    <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
                        <a> <i class="el-icon-refresh" @click="refresh" style="margin-right: 5px; font-size: 25px;"></i></a>
                    </el-tooltip>
                    <!--标题栏-->
                    <FuctionTitle @openMenu="openMenu" :permissionsList="permissionsList"
                                  :indexButton="indexButton"></FuctionTitle>
                </div>
                <component @routerTo="openMenu2(arguments)" :is="allComps[permissionsItem.permissionsenglish]"
                           :menu="permissionsItem" :dataItem="dataItem"></component>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import allComps from '../Menu/cloudDisk/index.js'
    import {getPermissionsList} from '@/utils/permissions.js'
    import FuctionHeader from "@/components/util/FuctionHeader";
    import FuctionTitle from "@/components/util/FuctionTitle";

    export default {
        name: "cloudDisk",
        props: {
            menu: '',
        },
        components: {
            FuctionHeader,
            FuctionTitle
        },
        data() {
            return {
                //该属性为权限属性，需要修改为自己的权限英文名称，一般和当前页面name对应
                ItemName: 'cloudDisk',
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
                //菜单
                permissionsList: getPermissionsList(2, this.menu.id),
                //页面跳转时的数据
                dataItem:null
            }
        },
        computed: {
            //判断是否展示该面板
            isViewBool: {
                get() {
                    return this.$store.state.control[this.ItemName];
                },
                set(v) {
                    this.$store.commit("setFalseVB", this.ItemName);
                }
            },
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
                this.indexButton = values[0].permissionsenglish;
                this.permissionsItem = values[0];
                if (values[1]){
                    this.dataItem=values[1];
                }

            },
            //打开菜单
            openMenu(item, index) {
                this.indexButton = item.permissionsenglish;
                this.permissionsItem = item;
                this.dataItem=null;
            },
            //关闭对话框
            closeView() {
                this.$store.commit("setFalseVB", this.ItemName);
                this.$store.commit("deleteTaskList", this.menu);
            },
            //缩小对话框
            small() {
                this.fullscreen = false
                this.draggable = true
            },
            //放大对话框
            big() {
                this.fullscreen = true
                this.draggable = false
            },
            //最小化
            mini() {
                this.$store.commit("setFalseVB", this.ItemName);
            },
        },
        mounted() {
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
    #modalView .el-dialog__header {
        background-color: #348DC1;
        padding: 5px;
    }
    #modalView .el-dialog__body { padding: 10px 20px; }
</style>
