<template>
    <div class="user_div">
        <div class="user_div-header">
            <div>
                <span>{{User.availableBalance}}</span>
                <p>可用资金</p>
            </div>
            <div>
                <span>{{User.frozenCapital}}</span>
                <p>冻结履约保证金</p>
            </div>
            <div>
                <span>884,556.90</span>
                <p>累计充值金额</p>
            </div>
            <div>
                <span>14,389.90</span>
                <p>累计提现金额</p>
            </div>
        </div>
        <div class="user_div-data">
            <div>
                <p>交易时间：</p>
                <ul>
                    <li>今天</li>
                    <li>最近一周</li>
                    <li>最近一月</li>
                    <li>最近半年</li>
                    <li>最近一年</li>
                </ul>
            </div>
            <div>
                <p>交易类型：</p>
                <ul>
                    <li>全部</li>
                    <li>充值</li>
                    <li>提现</li>
                    <li>冻结资金</li>
                    <li>卖出结算</li>
                    <li>递延费</li>
                    <li>扣除管理费</li>
                    <li>推广分红</li>
                    <li>支付管理费</li>
                </ul>
            </div>
        </div>
        <div class="user_div-table">
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    :class-name="active">
                <el-table-column
                        prop="date"
                        label="交易时间"
                        width="160"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="交易类型"
                        width="76"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="收入"
                        width="89"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="支出"
                        width="89"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="冻结"
                        width="89"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="交易金额"
                        width="89"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="备注"
                        width="57"
                        align="center">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import qs from "qs"

    export default {
        name: "core",
        data(){
          return{
              User:{

              }
          }
        },
        created(){
            var _this = this;
            var token =sessionStorage.getItem("token");
            console.log(sessionStorage.getItem("token"))
            axios.get('/strategist/capitalAccount/', {
                headers: {
                    'Authorization': token
                }
            })
                .then(function(res){
                    console.log(res.data.result);
                    _this.User = res.data.result;

                })
                .catch(function(err){
                    console.log(err);
                });
            axios.get('/strategist/capitalFlow/pages?' + qs.stringify({
                page:0,
                size:10,
                range:0
            }), {
                headers: {
                    'Authorization': token
                }
            })
                .then(function(res){
                    console.log(res.data);
                    // _this.User = res.data.result;

                })
                .catch(function(err){
                    console.log(err);
                });
        }
    }
</script>

<style scoped>
    .user_div-table{
        font-size: 14px;
        text-align: center!important;
    }
    .active{
        background:#f7f7f7 !important;
    }
    .user_div{
        margin-top: 0px !important;
    }
    .user-operation{
        height: 860px !important;
    }
    .user_div-data>div>p{
        float: left;
        color: #687284;
        font-size: 12px;
    }
    .user_div-data>div{
        padding-top: 25px;
        width: 770px;
        height: 16px;
    }
    .user_div-data>div:last-child{
        padding-top: 12px;
    }
    .user_div-data>div ul li{
        float: left;
        width:66px;
        height: 18px;
        text-align: center;
        color: #adb3c1;
        margin-right: 5px;
        font-size: 12px;
    }
    .user_div-header{
        width: 770px;
        height: 137px;
        border-bottom: 3px dashed  #dcdee3;
    }
.user_div-header>div{
    float: left;
    width: 192.5px;
    height: 140px;
    text-align: center;
}
.user_div-data{
    height: 96px;
    width: 770px;
}
    .user_div-header>div span{
        font-size: 28px;
        color: #e26042;
        font-family: sans-serif;
        padding-top: 51px;
        font-weight: 700;
        display: inline-block;
    }
    .user_div-header>div p{
        font-size: 14px;
        padding-top:11px;
    }
</style>