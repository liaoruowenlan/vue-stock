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
                    <li v-bind:class="{'time-active': item.active}" v-for="item in times"  @click="TimeClick(item)">{{item.time}}</li>
                </ul>
            </div>
            <div>
                <p>交易类型：</p>
                <ul>
                   <li v-for="item in types">{{item.type}}</li>
                </ul>
            </div>
        </div>
        <div class="user_div-table">
            <!--<el-table-->
                    <!--:data="tableData"-->
                    <!--style="width: 100%"-->
                    <!--:class-name="active">-->
                <!--<el-table-column-->
                        <!--prop="date"-->
                        <!--label="交易时间"-->
                        <!--width="160"-->
                        <!--align="center">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="name"-->
                        <!--label="交易类型"-->
                        <!--width="76"-->
                        <!--align="center">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="address"-->
                        <!--label="收入"-->
                        <!--width="89"-->
                        <!--align="center">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="address"-->
                        <!--label="支出"-->
                        <!--width="89"-->
                        <!--align="center">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="address"-->
                        <!--label="冻结"-->
                        <!--width="89"-->
                        <!--align="center">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="address"-->
                        <!--label="交易金额"-->
                        <!--width="89"-->
                        <!--align="center">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="address"-->
                        <!--label="备注"-->
                        <!--width="57"-->
                        <!--align="center">-->
                <!--</el-table-column>-->
            <!--</el-table>-->
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import qs from "qs"

    export default {
        name: "core",
        data() {
            return {
                User: {},
                times: [
                    {
                        time: '今天',
                        range:10,
                        active:true
                    },
                    {
                        time: '最近一周',
                        range:1,
                        active:false
                    },
                    {
                        time: '最近一月',
                        range:2,
                        active:false
                    },
                    {
                        time: '最近半年',
                        range:3,
                        active:false
                    },
                    {
                        time: '最近一年',
                        range:4,
                        active:false
                    },
                ],
                types: [
                    {
                        type: "全部"
                    },
                    {
                        type: "充值"
                    },
                    {
                        type: "提现"
                    },
                    {
                        type: "冻结资金"
                    },
                    {
                        type: "卖出结算"
                    },
                    {
                        type: "递延费"
                    }, {
                        type: "扣除管理费"
                    }, {
                        type: "推广分红"
                    }, {
                        type: "支付管理费"
                    }
                ]
            }
        },
        created() {
            var _this = this;
            var token = sessionStorage.getItem("token");
            console.log(sessionStorage.getItem("token"))
            axios.get('/strategist/capitalAccount/', {
                headers: {
                    'Authorization': token
                }
            })
                .then(function (res) {
                    console.log(res.data.result);
                    _this.User = res.data.result;

                })
                .catch(function (err) {
                    console.log(err);
                });
            axios.get('/strategist/capitalFlow/pages?' + qs.stringify({
                page: 0,
                size: 10,
                range: 0
            }), {
                headers: {
                    'Authorization': token
                }
            })
                .then(function (res) {
                    console.log(res.data);
                    // _this.User = res.data.result;

                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        methods: {
            TimeClick: function (currentItem) {
                console.log(currentItem)
                for(var i = 0; i < this.times.length; i++) {
                    this.times[i].active = false;
                }
                currentItem.active = true;
                console.log(currentItem.range);
            },
            TypeClick:function(currentItem){

            }
        }
    }
</script>

<style scoped>
    .user_div-table {
        font-size: 14px;
        text-align: center !important;
    }

    .time-active {
        background: #ee8354 !important;
        color: #fff !important;
    }

    .user_div {
        margin-top: 0px !important;
        height:860px;
    }

    .user-operation {
        height: 860px !important;
    }

    .user_div-data > div > p {
        float: left;
        color: #687284;
        font-size: 12px;
    }
        .time-active{
            font-size: 24px;
        }
    .user_div-data > div {
        padding-top: 25px;
        width: 770px;
        height: 16px;
    }

    .user_div-data > div:last-child {
        padding-top: 12px;
    }

    .user_div-data > div ul li {
        float: left;
        width: 66px;
        height: 18px;
        text-align: center;
        color: #adb3c1;
        margin-right: 5px;
        font-size: 12px;
    }

    .user_div-header {
        width: 770px;
        height: 137px;
        border-bottom: 3px dashed #dcdee3;
    }

    .user_div-header > div {
        float: left;
        width: 192.5px;
        height: 140px;
        text-align: center;
    }

    .user_div-data {
        height: 96px;
        width: 770px;
    }

    .user_div-header > div span {
        font-size: 28px;
        color: #e26042;
        font-family: sans-serif;
        padding-top: 51px;
        font-weight: 700;
        display: inline-block;
    }

    .user_div-header > div p {
        font-size: 14px;
        padding-top: 11px;
    }
</style>