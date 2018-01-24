<template>
    <div>
        <ul class="topNav">
            <router-link tag="li" :to="value.url" class="topNav-div" v-for="(value,index) in NavListOne" :key="index">
                {{value.text}}
            </router-link>
        </ul>
        <div class="price-list">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: "price",
        data(){
         return{
             NavListOne:[
                 {
                     id:1,
                     "text":"持仓中",
                     "url":"/position/price/holding"
                 },
                 {
                     id:2,
                     "text":"已结算",
                     "url":"/position/price/settlement"
                 }
             ]
         }
        }
    }
</script>

<style scoped>
    .price-list{
        background: #fff;
    }
    .topNav{
        width:884px;
        height: 52px;
        border-bottom: 1px solid #ddd;
        background: #fff;
    }
    .topNav-div.router-link-active{
        display: block;
        width: 120px;
        /* margin: 0 auto; */
        border-top: 2px solid #3e59a7;
        line-height: 42px;
        color: #3e59a7;
    }
    .topNav-div{
        width: 120px;
        text-align: center;
        cursor: pointer;
        float: left;
        line-height: 46px;
        color: #818081;
        font-size: 16px;
    }
</style>