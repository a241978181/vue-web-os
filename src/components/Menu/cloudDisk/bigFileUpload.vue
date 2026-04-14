<template>
	<div class="doc-content">
    <h1>💬 弹出框 (Dialog) 交互</h1>
    <p>在基于窗口的 Web OS 系统中，子页面的弹出框处理需要特别注意层级关系。</p>

    <el-alert title="核心要点：:modal='false'" type="error" :closable="false" show-icon style="margin: 15px 0;">
      <template slot="title">
        <b>必须设置 :modal="false"</b>
      </template>
      由于每个应用窗口本身就是一个 Dialog 或类似容器，若子弹窗开启了遮罩层（modal），它会覆盖整个桌面甚至任务栏，导致用户无法操作其他窗口。
    </el-alert>

    <el-card shadow="never" class="step-card">
      <div slot="header"><b>交互演示（建议加分项）</b></div>
      <p>点击下方按钮，观察在没有背景遮罩的情况下，弹窗如何与应用窗口完美融合：</p>
      <el-button type="primary" icon="el-icon-chat-line-round" @click="dialogVisible = true">打开测试对话框</el-button>
    </el-card>

    <el-dialog
        title="测试对话框"
        :visible.sync="dialogVisible"
        width="50%"
        :modal="false"
        append-to-body>
      <div class="test-dialog-content">
		    <i class="el-icon-magic-stick"></i>
        <h2>这是一个子弹出框</h2>
        <p>注意到背景依然是可以操作且透明的吗？这就是 :modal="false" 的效果。</p>
	    </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">关闭</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="small">确定</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script>
	export default {
		name: "bigFileUpload",
		props: {
			menu: '',
		},
		data() {
			return {
        dialogVisible: false
      }
		}
	}
</script>

<style scoped>
.doc-content { padding: 10px; }
.doc-content h1 { color: #2c3e50; font-size: 1.5rem; }
.step-card { margin: 20px 0; }
.test-dialog-content {
  background: linear-gradient(135deg, #e2fbff 0%, #ffffff 100%);
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
.test-dialog-content i { font-size: 3rem; color: #409EFF; margin-bottom: 10px; }
.test-dialog-content h2 { margin: 0; color: #333; }
.test-dialog-content p { color: #666; font-size: 14px; }
</style>
