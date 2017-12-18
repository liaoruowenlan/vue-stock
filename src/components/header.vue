<template>
    <header class="nav">
        <div class="logo">
            <img src="../assets/img/logo.png" />
        </div>
        <div class="logo-nav">
            <ul id="warp">
                <li class="" v-for="item in navLists"><router-link :to="item.url">{{item.text}}</router-link></li>
            </ul>
        </div>
        <div class="nav-login">
            <ul v-if="!loginOpen">
                <li>
                    <a href="#/register">注册</a>
                </li>
                <li class="border"></li>
                <li>
                    <a href="#/login">登陆</a>
                </li>
            </ul>
            <div v-if="loginOpen">
                    欢迎回来，<a href="#/myaccount">{{phone}}</a>
            </div>
            <div>
                    <img src="../assets/img/help.png" class="help-img" />
                    <a href="#/help">帮助中心</a>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "header",
        data(){
            return{
                navLists:[
                    {
                        "text":"首页",
                        "url":"/home"
                    },
                    {
                        "text":"行情",
                        "url":"/quotation"
                    },
                    {
                        "text":"持仓",
                        "url":"/s"
                    },
                    {
                        "text":"我的账户",
                        "url":"/myaccount"
                    }
                ],
                phone: '',
                loginOpen: false
            }
        },
        mounted: function(){
            this.refreshUserInfo();
        },
        methods: {
            refreshUserInfo: function () {
                var phone = sessionStorage.getItem("phone");
                if(phone)  {
                    this.loginOpen = true;
                    this.phone = phone.substring(0, 3) + "****" + phone.substring(7);
                }
            }
        }
    }

</script>

<style scoped>
    .nav {
        width: 1024px;
        margin: 0 auto;
        height: 80px;
        background: #fff;
    }

    .logo {
        float: left;
        width: 338px;
        height: 52px;
        margin: 14px 0;
    }

    .logo>img {
        width: 320px;
        height: 44px;
    }

    .logo-nav {
        float: left;
        margin-left: 68px;
    }

    .logo-nav ul {
        margin: 25px 0;
        height: 30px;
    }

    .logo-nav ul li {
        float: left;
        width: 72px;
        text-align: center;
        font-size: 18px;
        color: #687284;
        margin-left: 10px;
    }
    .logo-nav ul li a{
        color: #687284;
    }
    .router-link-exact-active{
        color: #3e59a7;
        border-bottom: 4px solid #3e59a7;
        padding: 0 18px;
    }
    .router-link-active{
        color: #3e59a7;
        border-bottom: 4px solid #3e59a7;
    }
    .router-link-exact-active{
        color: #3e59a7 !important;
    }
    .logo-nav ul li:hover {
        color: #3e59a7 !important;
        border-bottom: 4px solid #3e59a7;
    }
    .logo-nav ul li a:hover {
        color: #3e59a7 !important;
        border-bottom: 4px solid #3e59a7;
    }

    .nav-login {
        float: right;
        height: 80px;
    }

    .nav-login>ul>li {
        float: left;
        font-size: 14px;
        margin: 30px 0;
        color: #687284;
    }
    .nav-login>ul>li a{
        color: #687284;
    }
    .nav-login>ul{
        height: 80px;
        float: left;
    }
    .nav-login>ul>li a:hover{
        color: blue;
    }
    .nav-login>div a{
        color: #687284;
    }
    .nav-login>div:last-child{
        float: right;
        height: 80px;
        line-height: 80px;
        margin-left: 20px;
    }
    .nav-login>div:first-child{
        float: left;
        line-height: 80px;
        font-size: 14px;
        color: #687284;
    }
    .border {
        width: 1px;
        background: #dcdee3;
        height: 21px;
        margin: 30px 10px !important;
    }
    .help-img{
        display: inline-block;
        vertical-align: middle;
        margin-top: -3px;
    }
    .logo-nav ul li:last-child a{
        padding: 0 0 !important;
    }
</style>