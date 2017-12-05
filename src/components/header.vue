<template>
    <header class="nav">
        <div class="logo">
            <img src="src/assets/img/logo.png" />
        </div>
        <div class="logo-nav">
            <ul>
                <li class="active">
                    首页
                </li>
                <li>
                    详情
                </li>
                <li>
                    持仓
                </li>
                <li>
                    我的账户
                </li>
            </ul>
        </div>
        <div class="nav-login">
            <ul>
                <li>
                    <a href="#/register">注册</a>
                </li>
                <li class="border"></li>
                <li>
                    <a href="#/login">登陆</a>
                </li>
                <li>
                    <img src="../assets/img/help.png" class="help-img" />
                    <a href="#">帮助中心</a>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
    export default {
        name: "header"
    }
</script>

<style scoped>
    .nav {
        width: 1024px;
        margin: 0 auto;
        height: 80px;
    }

    .logo {
        float: left;
        width: 338px;
        height: 52px;
        margin: 14px 0;
    }

    .logo>img {
        width: 100%;
        height: 100%;
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

    .logo-nav ul li.active {
        color: #3c5fb5;
        border-bottom: 4px solid #3e59a7;
    }

    .logo-nav ul li:hover {
        color: #3c5fb5;
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

    .border {
        width: 1px;
        background: #dcdee3;
        height: 21px;
        margin: 30px 10px !important;
    }

    .nav-login>ul li:last-child {
        margin-left: 17px;
    }
    .help-img{
        display: inline-block;
        vertical-align: middle;
        margin-top: -3px;
    }
</style>