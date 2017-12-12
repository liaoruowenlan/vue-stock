<template>
    <el-carousel trigger="click" :interval="3000" arrow="always" height="480px">
        <el-carousel-item v-for="item in cards" :key="item.cardTypeName">
            <a :href="item.href"><img :src="item.img" /></a>
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
                        "href":"http://www.baidu.com",
                        "img":"../../src/assets/img/banner01.png"
                    },
                    {
                        "href":"http://www.baidu.com",
                        "img":"../../src/assets/img/banner02.png"
                    },
                    {
                        "href":"http://www.baidu.com",
                        "img":"../../src/assets/img/banner03.png"
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