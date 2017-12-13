<template>
    <div class="user_div">
        <div>
            <p>登陆密码</p>
            <p><a href="#">修改></a></p>
        </div>
        <i></i>
        <div>
            <p>支付密码</p>
            <p>修改></p>
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
    .user_div>div p:first-child{
        color: #687284;
    }
    .user_div>div p:last-child{
        position: absolute;
        top: 3px;
        color: #ee8354;
        left: 85px;
    }
</style>