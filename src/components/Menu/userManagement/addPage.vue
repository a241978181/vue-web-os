<template>
    <div id="view">
        <br/>
        <br/>
        <h3>新增页面</h3>
        <br/>
        <p><b>页面</b>是指当前【系统介绍】模块中的【安装与启动】、【新增模块】、【新增页面】页面。</p>
        <br/>
        <p><b>1.新增权限</b></p>
        <p>
            在[/src/mock/modules/common.js]中，向【获取权限元素组】中加入一个权限，权限的【parentid】字段应为<b style="color: red">当前模块的【id】</b>。
            比如本项目中【系统介绍】模块的id为3，需要在系统模块下创建页面就把【parentid】设置为3.
        </p>
        <p>
            并且请记住权限的英文名称也就是【permissionsenglish】的值。
        </p>
        <br/>
        <p><b>2.创建模块包</b></p>
        <p>在[/src/components/Menu/]中，创建一个目录，名称为<b style="color: red">当前模块的【permissionsenglish】</b>。
            比如本项目中：我需要在模块【系统介绍】下，新增一个页面，那么创建的这个目录名称就为【userManagement】。
        </p>
        <br/>
        <p><b>3.创建页面</b></p>
        <p>在[/src/components/Menu/<b style="color: red">当前模块的【permissionsenglish】</b>]中，创建一个vue页面，名称为新增权限的【permissionsenglish】字段值。
        </p>
        <br/>
        <p><b>4.复制index.js文件</b></p>
        <p>在[/src/components/Function/template/]中，复制一个【index.js】的文件放到[/src/components/Menu/你创建的文件夹/]下,也就是第二步骤中创建的模块包。
        </p>
        <br/>
        <p><b>5.修改模块导入</b></p>
        <p>在[/src/components/Function/]中，找到<b style="color: red">包含当前页面的模块</b>，修改如下图的引入组件路径。</p>
        <br/><br/>
        <img src="https://s3.ax1x.com/2020/12/28/roKKVf.jpg"/>
    </div>
</template>

<script>
    export default {
        name: "documentCenter",
        props: {
            menu: '',
        },
        data() {
            return {}
        },
        methods: {},
        mounted() {

        }
    }
</script>

<style scoped="scoped">
    #view {
        width: 100%;
        height: 100%;
        padding: 0px;
        margin: 0px;
        margin-top: 0.9375rem;
    }
</style>
