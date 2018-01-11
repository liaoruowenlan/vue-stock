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
                <span>{{User.balance}}</span>
                <p>累计充值金额</p>
            </div>
            <div>
                <span>{{User.totalRechargeAmount}}</span>
                <p>累计提现金额</p>
            </div>
        </div>
        <div class="user_div-data">
            <div>
                <p>交易时间：</p>
                <ul>
                    <li v-bind:class="{'time-active': item.active}" v-for="(item,index) in times" :key="index" @click="TimeClick(item)">
                        {{item.time}}
                    </li>
                </ul>
            </div>
            <div>
                <p>交易类型：</p>
                <ul>
                    <li v-bind:class="{'time-active': item.active}" v-for="(item,index) in types" :key="index" @click="TypeClick(item)">
                        {{item.type}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="user_div-table">
             <el-table
            :data="tableData"
            style="width: 100%"
            v-loading="loading"
            element-loading-background="#fff"
            :class-name="active">
            <el-table-column
            prop="name"
            label="交易类型"
            width="180"
            align="center">
            </el-table-column>

            <el-table-column
            prop="amount"
            label="交易金额"
            width="180"
            align="center">
            </el-table-column>
            <el-table-column
            prop="occurrenceTime"
            label="交易时间"
            width="180"
            align="center">
            </el-table-column>
            <el-table-column
            prop="remarks"
            label="备注"
            width="180"
            align="center">
            </el-table-column>
            </el-table> 
        </div>
        <el-pagination
            layout="prev, pager, next"
            :total="totalPage" v-show="tableData.length>0"
            :page-size='size'
            @current-change="currentPage">
        </el-pagination>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "core",
  data() {
    return {
    loading:true,
      User: {},
      active: "",
      times: [
        {
          time: "今天",
          range: 5,
          active: true
        },
        {
          time: "全部",
          range: 1,
          active: false
        },
        {
          time: "最近一周",
          range: 1,
          active: false
        },
        {
          time: "最近一月",
          range: 2,
          active: false
        },
        {
          time: "最近半年",
          range: 3,
          active: false
        },
        {
          time: "最近一年",
          range: 4,
          active: false
        }
      ],
      types: [
        {
          type: "全部",
          flowType: 0,
          active: true
        },
        {
          type: "充值",
          flowType: 1,
          active: false
        },
        {
          type: "提现",
          flowType: 2,
          active: false
        },
        {
          type: "服务费",
          flowType: 3,
          active: false
        },
        {
          type: "冻结履约保证金",
          flowType: 4,
          active: false
        },
        {
          type: "递延费",
          flowType: 5,
          active: false
        },
        {
          type: "退回履约保证金",
          flowType: 6,
          active: false
        },
        {
          type: "卖出结算",
          flowType: 7,
          active: false
        },
        {
          type: "推广佣金",
          flowType: 8,
          active: false
        }
      ],
      tableData: [],
      range: 5,
      totalPage: 0,
      page: 0,
      size: 4,
      flowType: 0
    };
  },
  created() {
    this.getList();
    var _this = this;
    var token = sessionStorage.getItem("token");
    axios
      .get("/strategist/capitalAccount/", {
        headers: {
          Authorization: token
        }
      })
      .then(function(res) {
        _this.User = res.data.result;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    currentPage(val) {
      console.log(val);
      this.page = val - 1;
      this.getList();
    },
    getList() {
      var _this = this;
      axios
        .get(
          "/strategist/capitalFlow/pages?" +
            qs.stringify({
              page: this.page,
              size: this.size,
              range: this.range,
              flowType: this.flowType
            }),
          {
            headers: {
              Authorization: sessionStorage.getItem("token")
            }
          }
        )
        .then(function(res) {
          if (res.data.code == 200) {
            var data = res.data.result,
              list = data.content,
              arr = [],
              phone = sessionStorage.getItem("phone");
            for (let i = 0; i < list.length; i++) {
              var obj = {};
              if (list[i].type == "Recharge") {
                obj.name = "充值";
              } else if (list[i].type == "Withdrawals") {
                obj.name = "提现";
              } else if (list[i].type == "ServiceFee") {
                obj.name = "服务费";
              } else if (list[i].type == "ReserveFund") {
                obj.name = "冻结履约保证金";
              } else if (list[i].type == "DeferredCharges") {
                obj.name = "递延费";
              } else if (list[i].type == "ReturnReserveFund") {
                obj.name = "退回履约保证金";
              } else if (list[i].type == "Loss") {
                obj.name = "亏损";
              } else if (list[i].type == "Profit") {
                obj.name = "盈利";
              } else if (list[i].type == "Promotion") {
                obj.name = "推广佣金";
              }
              obj.occurrenceTime = list[i].occurrenceTime;
              obj.amount = list[i].amount + " 元";
              if (
                list[i].type != "Recharge" ||
                list[i].type != "Withdrawals" ||
                list[i].type != "Promotion"
              ) {
                obj.remarks =
                  list[i].stockName + "( " + list[i].stockCode + " )";
              } else {
                obj.remarks = phone;
              }
              arr.push(obj);
            }
            _this.tableData = arr;
            _this.totalPage = data.totalElements;
            setTimeout(()=>{
                _this.loading = false
            },400)
          }
          console.log(res.data);
          // _this.User = res.data.result;
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    TimeClick: function(currentItem) {
        this.loading = true
      this.range = currentItem.range;
      for (var i = 0; i < this.times.length; i++) {
        this.times[i].active = false;
      }
      currentItem.active = true;
      this.getList();
    },
    TypeClick: function(currentItem) {
        this.loading = true
        
      this.flowType = currentItem.flowType;
      for (var i = 0; i < this.types.length; i++) {
        this.types[i].active = false;
      }
      currentItem.active = true;
      this.getList();      
    }
  }
};
</script>

<style scoped>
.el-table{
    height: 240px;
}
.el-pagination {
  padding: 20px 5px;
  text-align: center;
}
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
}

/*.user-operation {*/
/*height: 860px !important;*/
/*}*/

.user_div-data > div > p {
  float: left;
  color: #687284;
  font-size: 12px;
}
.user_div-data li {
  cursor: pointer;
}
.time-active {
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
  padding: 0 10px;
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