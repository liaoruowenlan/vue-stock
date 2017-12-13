<template>
    <div class="user_div">
        <div class="title">
            提现
        </div>
        <div class="user_text">
            <p>提现金额</p>
            <input type="text" />
            <p>可用金额：<span>20000.00</span></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "withdrawals"
    }
</script>

<style scoped>
    .user_div>div.title{
        font-size: 14px;
        line-height: 36px;
        border-bottom: 1px solid #dcdee3;
    }
    .user_text{
        height: 141px;
        border-bottom: 1px dashed #dcdee3;
    }
    .user_text p:first-child{
        color: #adb3c1;
        float: left;
        margin: 52px 10px 52px 107px;
    }
    .user_text p:last-child{
        color: #687284;
        float: left;
        font-size: 12px;
        margin: 52px 0 52px 10px;
    }
    .user_text input{
        margin: 38px 0;
        height: 42px;
        width: 302px;
        float: left;
    }
    .user_text span{
        color: #e26042;

    }
</style>