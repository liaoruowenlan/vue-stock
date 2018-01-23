<template>
    <el-carousel trigger="click" :interval="3000" arrow="always" height="480px">
        <el-carousel-item v-for="item in cards" :key="item.cardTypeName">
            <router-link :to="item.href"><img :src="item.img" /></router-link>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    export default {
        name: "swiper",
        data(){
            return{
                cards:[
                    {
                        "href":"/case",
                        "img": require("../assets/img/banner01.png")
                    },
                    {
                        "href":"/quotation?code=000001",
                        "img": require("../assets/img/banner02.png")
                    },
                    {
                        "href":"",
                        "img": require("../assets/img/banner03.png")
                    }
                ]
            }
        }
    }
</script>


<style scoped>
    .el-carousel__container{
        height: 480px;
   			
    }
    .el-carousel__item img{
        width: 100%;
        height: 100%;
    }
</style>