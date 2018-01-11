<template>
    <div class="user_div">
        <div class="userAmoney">
            <div class="frozen1">
                <div>
                    <span>¥</span>
                    <span>{{User.frozenCapital}}</span>
                </div>
                <p>冻结履约保证金</p>
            </div>
            <div class="frozen1">
                <div>
                    <span>¥</span>
                    <span>{{User.availableBalance}}</span>
                </div>
                <p>可用资金</p>
            </div>
            <div class="user_btn">
                <div class="pay">
                 <router-link to="/myaccount/recharge">充值</router-link>
                </div>
                <div class="withdrawals">
                    <router-link to="/myaccount/recharge">提现</router-link>
                </div>
            </div>
        </div>
        <div class="user_blnk1">
            <div class="frozen1">
                <div>
                    <span>{{BlankLength}}</span>
                </div>
                <p>我的银行卡</p>
            </div>

            <div style="display: none;">
                <!--添加银行卡-->
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "capital",
        data(){
            return {
                User: {

                },
                BlankLength:null
            }
        },
        created(){
            var _this = this;
            axios.get('/strategist/capitalAccount/', {
                headers: {
                    'Authorization': sessionStorage.getItem("token")
                }
            })
            .then(function(res){
                _this.User = res.data.result;

            })
            .catch(function(err){
                console.log(err);
            });
            axios.get('/strategist/bindCard/myBankCardList', {
                headers: {
                    'Authorization': sessionStorage.getItem("token")
                }
            })
                .then(function(res){
                    _this.BlankLength = res.data.result.length;
                })
                .catch(function(err){
                    console.log(err);
                });

        }
    }
</script>

<style scoped>
    .user_btn{
        padding-left: 0 !important;
    }
    .userAmoney {
        height: 120px;
        border-bottom: 1px dashed #dcdee3;
    }
    .user_div{
        height: 538px;
    }
    .userAmoney > div {
        float: left;
        width: 230px;
        position: relative;
        font-size: 14px;
        padding-top: 15px;
    }

    .userAmoney .frozen1 > div {
        text-align: center;
    }

    .userAmoney .frozen1 > div > span:first-child {
        font-size: 14px;
        color: #e26042;
        position: absolute;
        top: 20px;
    }

    .userAmoney .frozen1 > div > span:last-child {
        font-size: 32px;
        margin-left: 10px;
        font-weight: bold;
        color: #e26042;
    }

    .userAmoney .frozen1 > p {
        text-align: center;
        margin-top: 8px;
    }

    .userAmoney .user_btn > div {
        width: 120px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        margin: 0 auto;
    }

    .pay a {
        color: #fff;
        background: #ee8354;
        display: block;
    }

    .userAmoney .user_btn .withdrawals a {
        display: block;
        width: 118px;
        height: 30px;
        color: #ee8354;
        border: 1px solid #ee8354;
        margin-top: 6px;
    }

    .user_blnk1 > div {
        float: left;
        width: 230px;
        position: relative;
        font-size: 14px;
        padding-top: 29px;
        text-align: center;
    }

    .user_blnk1 .frozen1 > div > span {
        font-size: 32px;
        font-weight: bold;
        color: #e26042;
    }

    .user_blnk1 .frozen1 > p {
        text-align: center;
        margin-top: 6px;
    }
    .user_div .user_blnk1>div:last-child{
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