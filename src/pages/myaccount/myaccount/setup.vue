<template>
    <div class="user_div">
        <div>
            <p>
                <img src="../../../assets/img/money.png" />
                <span>登陆密码</span>
            </p>
            <p><a href="#">修改></a></p>
        </div>
        <i></i>
        <div>
            <p>
                <img src="../../../assets/img/psw.png" />
                <span>支付密码</span>
            </p>
            <p>
                <a href="#">修改></a>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "setup"
    }
</script>

<style scoped>
    i{
        border-top: 1px dashed #dcdee3;
        width: 100%;
        display: block;
    }
    .user_div>div{
        position: relative;
        height: 42px;
        line-height: 42px;
    }
    .user_div>div span{
        margin-left: 5px;
    }
    .user_div>div p:first-child{
        color: #687284;
    }
    .user_div>div p:last-child{
        position: absolute;
        top: 3px;
        color: #ee8354;
        left: 105px;
    }
    .user_div>div p img{
        display: inline-block;
        vertical-align: -2px;
        width: 13px;
        height: 16px;
    }
    .user_div>div a{
        color: #ee8354;
    }
</style>