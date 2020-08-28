<template>
	<div id="view">
    <h3>弹出框介绍</h3>
    <br/>
    <span>
      众所周知，iview的model无法实现双重弹出框，因为我们每一个模块页面都是一个model，所以在想实现弹出框的话需要使用elementui中的el-dialog
    </span>
    <br/>
    <br/>
    <span>
      值得注意的是，使用时需要添加上 <b>:modal="false"</b>,否则遮罩层将全部遮住。点击下方按钮进行测试。
    </span>
    <br/>

    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :modal="false">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
		},
		methods: {

		},
		mounted() {
		}
	}
</script>

<style scoped>
	#view {
		width: 100%;
		height: 100%;
		padding: 0px;
		margin: 0px;
		margin-top: 0.9375rem;
	}
</style>
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
	}

	.uploader-list>ul>li {
		width: 100%;
		color: red;
		margin-bottom: 0;
	}

	a {
		color: #42b983;
	}

	.fileupload {
		width: 50%;
		margin-left: 25%;
	}
</style>
