<template>
    <div>
        <ul class="topNav">
            <li class="topNav-div" v-for="(value,index) in NavListOne" :key="index">
                <router-link :to="value.url">{{value.text}}</router-link>
            </li>
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
        padding: 10px 0 ;
    }
    .topNav{
        width:884px;
        height: 52px;
        border-bottom: 1px solid #ddd;
        background: #fff;
    }
    .topNav>li.topNav-div{
        width: 50%;
        text-align: center;
        cursor: pointer;
        float: left;
        line-height: 52px;
        color: #818081;
        font-size: 16px;
    }
    .router-link-active{
        display: block;
        width: 101px;
        margin: 0 auto;
        border-bottom: 4px solid #3e59a7;
        height: 50px;
        color: #3e59a7;
    }
    a{
        color:#818081;
    }
</style>