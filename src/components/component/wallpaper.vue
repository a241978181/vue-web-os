<template>
	<div >
    <Modal style="right: 2px;" :styles="{top: '250px'}" :footer-hide="true" width="300" v-model="wallpaperViewBool"
           draggable scrollable title="壁纸" id="notes">
      <div style="width: 100%;display: flex;align-items: center;flex-wrap:wrap;">
        <div style="width: 89px" v-for="item in imgArr" :key="item.name">
          <a>
            <Tooltip :content="item.name" placement="top-end">
          <el-image @click="useImage(item.url)"
                    style="width: 70px; height: 50px"
                    :src="item.url"
                    >
          </el-image>
            </Tooltip>
          </a>
        </div>
      </div>
    </Modal>
	</div>
</template>

<script>
	export default{
		name:"wallpaper",
		props:{
			menu: '',
		},
		data(){
			return{
			  //壁纸图床组
				imgArr:[],
        //图床组链接
        imgUrlList:[],
			}
		},
    computed: {
      //判断是否展示该面板
      wallpaperViewBool: {
        get() {
          return this.$store.state.control.wallpaperViewBool;
        },
        set(v) {
          this.$store.commit("setFalseVB","wallpaperViewBool");
        }
      }
    },
		methods:{
		  //使用当前图片作为桌面背景
      useImage(url){
        localStorage.setItem("desktopBackground",url)
        this.$emit("updateImae")
      },
		  //获取图床组
      getImageArr(){
        this.$http.post("getImageArr", {}).then(res => {
          this.imgArr=res;
          this.imgUrlList=[];
          for (let i = 0; i <this.imgArr.length; i++) {
            this.imgUrlList.push(this.imgArr[i].url)
          }
        });

      }
			
		},
		mounted() {
			this.getImageArr()
		}
	}
</script>

<style scoped="scoped">
</style>
<style>
#notes .ivu-modal {
  margin-right: 20px;
}

#notes .ivu-modal-header {
  background-color: #348DC1;
}
</style>
