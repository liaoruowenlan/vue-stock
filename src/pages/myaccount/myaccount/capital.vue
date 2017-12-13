<template>
    <div class="user_div">
        <div class="user_money">
            <div class="frozen">
                <div>
                    <span>¥</span>
                    <span>123.90</span>
                </div>
                <p>冻结履约保证金</p>
            </div>
            <div class="frozen">
                <div>
                    <span>¥</span>
                    <span>12.00</span>
                </div>
                <p>可用资金</p>
            </div>
            <div class="user_btn">
                <div class="pay">
                    充值
                </div>
                <div class="withdrawals">
                    提现
                </div>
            </div>
        </div>
        <div class="user_blnk">
            <div class="frozen">
                <div>
                    <span>0</span>
                </div>
                <p>我的银行卡</p>
            </div>

            <div>
                添加银行卡
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "capital"
    }
</script>

<style scoped>
    .user_money {
        height: 120px;
        border-bottom: 1px dashed #dcdee3;
    }

    .user_money > div {
        float: left;
        width: 230px;
        position: relative;
        font-size: 14px;
        padding-top: 15px;
    }

    .user_money .frozen > div {
        text-align: center;
    }

    .user_money .frozen > div > span:first-child {
        font-size: 14px;
        color: #e26042;
        position: absolute;
        top: 20px;
    }

    .user_money .frozen > div > span:last-child {
        font-size: 32px;
        margin-left: 7px;
        font-weight: bold;
        color: #e26042;
    }

    .user_money .frozen > p {
        text-align: center;
        margin-top: 8px;
    }

    .user_money .user_btn > div {
        width: 120px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        margin: 0 auto;
    }

    .pay {
        color: #fff;
        background: #ee8354;
    }

    .user_money .user_btn .withdrawals {
        width: 118px;
        height: 30px;
        color: #ee8354;
        border: 1px solid #ee8354;
        margin-top: 6px;
    }

    .user_blnk > div {
        float: left;
        width: 230px;
        position: relative;
        font-size: 14px;
        padding-top: 29px;
        text-align: center;
    }

    .user_blnk .frozen > div > span {
        font-size: 32px;
        font-weight: bold;
        color: #e26042;
    }

    .user_blnk .frozen > p {
        text-align: center;
        margin-top: 6px;
    }
    .user_div .user_blnk>div:last-child{
        margin-right: 90px;
        margin-top: 42px;
        padding: 0;
        width:118px;
        height: 30px;
        border: 1px solid #ee8354;
        text-align: center;
        line-height: 30px;
        float: right;
        color: #ee8354;
    }
</style>