<template>
    <div>
        <top-header></top-header>
        <div class="width100">
            <div class="user-title">
            	<div style="padding-top: 20px;">
            		
            	</div>
            	<div class="user-img">
            	<img v-if="!User" src="../../assets/img/userdcim-.png" />
                <img v-else v-bind:src="User" />
            	</div>
                <p>{{phone}}</p>
            </div>
            <div class="user-operation">
                <div>
                    <ul>
                        <li class="" v-for="item in userLists"><router-link :to="item.url"><i></i>{{item.text}}</router-link></li>
                    </ul>
                </div>
                <div>
                    <transition name="fade" mode="out-in">
                    <router-view></router-view>
                    </transition>
                </div>
            </div>
        </div>
        <div style="clear: both;display: none;"></div>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import TopHeader from '../../components/header.vue'
    import FooterNav from '../../components/footer.vue'

    export default {
        name: "myaccount",
        
        data(){
            return{
                phone:null,
                User:localStorage.getItem("UserImg")||'',
                userLists:[
                        {
                            "text":"个人中心",
                            "url":"/myaccount/capital"
                        },
                        {
                            "text":"资金明细",
                            "url":"/myaccount/core"
                        },
                        {
                            "text":"充值",
                            "url":"/myaccount/recharge"
                        },
                        {
                            "text":"提现",
                            "url":"/myaccount/withdrawals"
                        },
                        {
                            "text":"设置",
                            "url":"/myaccount/setup"
                        },
                        {
                            "text":"成为经纪人",
                            "url":"/myaccount/setup"
                        }
                ]
            }
        },
        components: {
            TopHeader,
            FooterNav
        },
        mounted(){
             this.phone = localStorage.getItem("phone");
            // var token = localStorage.getItem("token");
            // if(!token){
            //     alert(1);
            // }
        },
        methods: {

        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0
    }
    .width100 {
        height: 100%;
        padding-bottom: 40px;
    }

    .user-title {
        background: url("../../assets/img/user.png") no-repeat;
        background-size: 100% 100%;
        height: 240px;
    }
    .user-title .user-img{
        width: 84px;
        height: 84px;
        margin: 0 auto;
    	background: #000;
    border-radius: 100%;
    }
    .user-title .user-img img{
    	width: 100%;
    	height: 100%;
    	border-radius: 50%;
    }
    .user-title>p{
        text-align: center;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        padding-top: 6px;
        font-family: unset;
    }
    .user-operation {
        min-height: 570px;
        background: #fff;
        width: 1024px;
        margin: 0 auto;
        margin-top: -90px;
    }
    .user-operation:after{
        display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;
    }
    .user-operation > div {
        float: left;
    }

    .user-operation > div:first-child {
        width: 141px;
        margin-left: 20px;
        background: #f7f7f7;
        margin-top: 25px;
    }

    .user-operation > div:first-child li {
        height: 44px;
        position: relative;
        width: 140px;
        text-align: center;
        line-height: 44px;
        color: #687284;
        border-bottom: 1px solid #dedee3;
    }
    .user-operation > div:first-child li a{
        color: #687284;
    }
    .user-operation > div:first-child li .hover {
        width: 6px;
        height: 20px;
        position: absolute;
        background: #ee8354;
        left: 0;
        top: 12px;
    }

    .user-operation > div:first-child li a:hover{
        color: #ee8354;
    }
    li:hover a{
        color: #ee8354;
    }
    li:hover i {
        width: 6px;
        height: 20px;
        position: absolute;
        background: #ee8354;
        left: 0;
        top: 12px;
    }
    .router-link-active{
        color: #ee8354 !important;
        background: url("../../assets/img/border-bg@2x.png") no-repeat;
        display: block;
        background-size: 4.5% 103%;
    }
</style>