<template>
    <div id="view">
        <div style="width: 100%;display: flex;align-items: center;justify-content: center"><h2>vue-draggable组件展示</h2></div>
        <div style="width: 100%;display: flex;align-items: flex-start;justify-content: space-between">
            <!--使用draggable组件-->
                <div class="col">
                    <div class="title" >蜀国</div>
                    <draggable v-model="arr1" group="site"  animation="300" dragClass="dragClass"  ghostClass="ghostClass" chosenClass="chosenClass" @start="onStart" @end="onEnd">
                        <transition-group>
                            <div class="item" v-for="item in arr1" :key="item.id">{{item.name}}</div>
                        </transition-group>
                    </draggable>
                </div>
                <div  class="col">
                    <div class="title" >吴国</div>
                    <draggable v-model="arr2" group="site" animation="300" dragClass="dragClass"  ghostClass="ghostClass" chosenClass="chosenClass" @start="onStart" @end="onEnd">
                        <transition-group>
                            <div class="item" v-for="item in arr2" :key="item.id">{{item.name}}</div>
                        </transition-group>
                    </draggable>
                </div>
                <div  class="col">
                    <div class="title" >魏国</div>
                    <draggable v-model="arr3" group="site" animation="300" dragClass="dragClass"  ghostClass="ghostClass" chosenClass="chosenClass" @start="onStart" @end="onEnd">
                        <transition-group>
                            <div class="item" v-for="item in arr3" :key="item.id">{{item.name}}</div>
                        </transition-group>
                    </draggable>
                </div>
        </div>

    </div>
</template>

<script>
    import draggable from "vuedraggable"
    export default {
        name: "slidingList",
        components: {
            draggable
        },
        props: {
            menu: '',
        },
        data() {
            return {
                drag:false,
                //定义要被拖拽对象的数组
                arr1:[
                    {id:1,name:'张飞'},
                    {id:2,name:'诸葛亮'},
                    {id:3,name:'刘备'},
                    {id:4,name:'关羽'}
                ],
                arr2:[
                    {id:5,name:'曹操'},
                    {id:6,name:'曹丕'},
                    {id:7,name:'张辽'},
                    {id:8,name:'郭嘉'}
                ],
                arr3:[
                    {id:9,name:'孙权'},
                    {id:10,name:'周瑜'},
                    {id:11,name:'鲁肃'},
                    {id:12,name:'陆逊'}
                ]
            }
        },
        methods: {
            //开始拖拽事件
            onStart(){
                this.drag=true;
            },
            //拖拽结束事件
            onEnd() {
                this.drag=false;
            },
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

    /*定义要拖拽元素的样式*/
    .ghostClass{
        background-color:  blue !important;
    }
    .chosenClass{
        background-color: red !important;
        opacity: 1!important;
    }
    .dragClass{
        background-color: blueviolet !important;
        opacity: 1 !important;
        box-shadow:none !important;
        outline:none !important;
        background-image:none !important;
    }
    .itxst{
        margin: 10px;

    }
    .title{
        padding: 6px 12px;
    }
    .col{
        width: 40%;
        flex: 1;
        padding: 10px;
        border: solid 1px #eee;
        border-radius:5px ;
        float: left;
    }
    .col+.col{
        margin-left: 10px;
    }

    .item{
        padding: 6px 12px;
        margin: 0px 10px 0px 10px;
        border:  solid 1px #eee;
        background-color: #f1f1f1;
    }
    .item:hover{
        background-color: #fdfdfd;
        cursor: move;
    }
    .item+.item{
        border-top:none ;
        margin-top: 6px;
    }
</style>
