<template>
    <div id="view">
       <h1>这是一个隐藏页面</h1>
    </div>
</template>

<script>
    export default{
        name:"hiddenRouting",
        props:{
            menu: '',
        },
        data(){
            return{

            }
        },
        methods:{

        },
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
