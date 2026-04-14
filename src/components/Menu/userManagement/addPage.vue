<template>
    <div class="doc-content">
        <h1>📑 新增子页面</h1>
        <p>子页面是指应用窗口内部的功能页（如当前您正在看的这一页）。</p>

        <el-alert title="核心逻辑" type="success" :closable="false" show-icon style="margin: 15px 0;">
            子页面的 <b>parentid</b> 必须指向其所属应用的 <b>id</b>。
        </el-alert>

        <el-card shadow="never" class="step-card">
            <div slot="header"><b>1. 权限配置</b></div>
            <p>在 <code>common.js</code> 中新增 <code>type: 2</code> 的对象。例如“系统介绍”的 ID 是 3，则新页面的 <code>parentid</code> 设为 3。</p>
        </el-card>

        <el-card shadow="never" class="step-card">
            <div slot="header"><b>2. 目录与文件准备</b></div>
            <p>在 <code>/src/components/Menu/</code> 下创建与应用 <code>permissionsenglish</code> 同名的文件夹。</p>
            <p>在该文件夹内创建子页面的 <code>.vue</code> 文件，名称需与权限中的 key 一致。</p>
        </el-card>

        <el-card shadow="never" class="step-card">
            <div slot="header"><b>3. 注册导出</b></div>
            <p>确保在该文件夹的 <code>index.js</code> 中导入并导出了该组件。之后在主应用组件中修改引入路径（见下图）：</p>
            <br/>
            <el-image :src="demoImg" :preview-src-list="[demoImg]" style="border: 1px solid #eee; border-radius: 4px;"></el-image>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "addPage",
        props: {
            menu: '',
        },
        data() {
            return {
                demoImg: 'https://s3.ax1x.com/2020/12/28/roKKVf.jpg'
            }
        }
    }
</script>

<style scoped="scoped">
.doc-content { padding: 10px; }
.doc-content h1 { color: #2c3e50; font-size: 1.5rem; }
.step-card { margin-bottom: 20px; }
.doc-content p { color: #666; font-size: 14px; line-height: 1.5; }
</style>
