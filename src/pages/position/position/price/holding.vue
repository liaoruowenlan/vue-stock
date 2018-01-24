<template>
    <div class="holding">
        <div v-if="dataList.length<1" style="textAlign:center">暂无数据</div>
        <div class="holding-list" v-for="(item,index) in dataList" :key="index">
          <div class="top flex">
            <div class="top-left">
              <div class="top-left-top">
                <span class="name">
                  {{item.stockName}}
                </span>
                <span class="code">
                  {{item.stockCode}}
                </span>
                <img src="" alt="">
              </div>
              <div class="top-left-bottom">
                <span class="dingdan">订单号</span>
                <span class="dingdanhao">{{item.tradeNo}} </span>
              </div>
            </div>
            <div class="top-middle">
              <div class="top-middle-top">
                  <span class="ornow">当前盈亏</span>
                  <span :class="[item.profitOrLoss>0?'red':'green','money']">{{item.profitOrLoss}}</span>
              </div>
              <div class="top-middle-bottom">
                  <img class="clock" src="../../../../assets/img/time@2x.png" alt="">
                  <span>{{item.updateTime}} </span>
              </div>
            </div>
            <div class="top-right">
              <el-button type="warning"
              :disabled="item.state=='HOLDPOSITION'&&item.createTime.split(' ')[0]!=new Date().toLocaleDateString().replace(/\//g,'-')&&$time.outtime('09:30',new Date().getHours() + ':' + new Date().getMinutes())?false:true"
              @click="sellOut(item)">卖 出</el-button>
            </div>
          </div>
          <div class="bottom flex">
              <div class="bottom-left">
                <p>
                  <span>买入价 </span>
                  <span> {{item.buyingPrice||"--"}}</span>
                </p>
                <p>
                  <span>当前价 </span>
                  <span> {{item.lastPrice}}</span>
                </p>
              </div>
              <div class="bottom-middle">
                <p>
                  <span>可用股数 </span>
                  <span> {{item.numberOfStrand}}</span>
                </p>
                <p>
                  <span>止损金额 </span>
                  <span>{{parseInt(item.applyAmount*item.lossPoint).toFixed(2)}}</span>
                </p>
              </div>
              <div class="bottom-right">
                <p>
                  <span>点买本金 </span>
                  <span> {{(item.applyAmount/10000).toFixed(2)}}万元</span>
                </p>
                <p>
                  <span>点买类型 </span>
                  <span> 即时买入</span>
                </p>
              </div>
          </div>
            <!-- <div class="left ">
                <p class="one">
                    <span :class="[item.profitOrLoss>0?'square orange':'square blue']"></span>
                    <span class="name">{{item.stockName}}  ( {{item.stockCode}} )</span>
                </p>
                <p class="middle">
                    <span class="data">{{item.createTime}}</span>&nbsp;&nbsp;
                    <span >当前盈亏</span>&nbsp;&nbsp;
                    <span :class="[item.profitOrLoss>0?'redmoney':'greenmoney']">{{item.profitOrLoss}}元</span>
                </p>
                <p class="middle1">
                    
                    <span class="l">买入价</span>&nbsp;&nbsp;
                    <span class="r">{{item.buyingPrice||"--"}}</span>&nbsp;&nbsp;
                    <span class="space"></span>
                    <span class="l">可用股数</span>&nbsp;&nbsp;
                    <span class="r">{{item.numberOfStrand}}</span>&nbsp;&nbsp;
                    <span class="space"></span>
                    <span class="l">点买本金</span>&nbsp;&nbsp;
                    <span class="r">{{(item.applyAmount/10000).toFixed(2)}}万元</span>&nbsp;&nbsp;
                </p>   
                <p class="bottom">
                    <span class="l">当前价</span>&nbsp;&nbsp;
                    <span class="r">{{item.lastPrice}}</span>&nbsp;&nbsp;
                    <span class="space"></span>
                    <span class="l">止损金额</span>&nbsp;&nbsp;
                    <span class="r">{{parseInt(item.applyAmount*item.lossPoint).toFixed(2)}}</span>&nbsp;&nbsp;
                    <span class="space"></span>
                    <span class="l">点买类型</span>&nbsp;&nbsp;
                    <span class="r">即时买入</span>&nbsp;&nbsp;
                </p>   
            </div> -->
            <!-- <div class="right flex">
                <el-tag  size="medium" type="info" disable-transitions>
                    {{item.state=="POSTED"||item.state=="BUYLOCK"?'买入中':item.state=="HOLDPOSITION"?'持仓中':item.state=="SELLAPPLY"?"卖出申请":'卖出锁定'}}
                </el-tag>
                <el-button type="warning"
:disabled="item.state=='HOLDPOSITION'&&item.createTime.split(' ')[0]!=new Date().toLocaleDateString().replace(/\//g,'-')&&$time.outtime('09:30',new Date().getHours() + ':' + new Date().getMinutes())?false:true"
                  @click="sellOut(item)">卖 出</el-button> -->
                  <!-- <span>{{item.state=='HOLDPOSITION'}}</span>
                  <span>{{item.createTime.split(' ')[0]==new Date().toLocaleDateString().replace(/\//g,'-')}}</span>
                  <span>{{$time.outtime('09:30',new Date().getHours() + ':' + new Date().getMinutes())}}</span>  -->
            <!-- </div>   -->
        </div>
        <el-pagination
            layout="prev, pager, next"
            :total="total"
            v-if="dataList.length>0"
            :page-size='size'
            @current-change="currentPage">
        </el-pagination>
        <Confirm :maskInfo="maskInfo" :show="show" :createTime="createTime" @close="close"/>
    </div>
</template>

<script>
import Confirm from "../../../../components/querySell";
export default {
  name: "holding",
  data() {
    return {
      page: 0,
      size: 4,
      dataList: [],
      maskInfo: {},
      show: false,
      createTime: "",
      pageSizes: [4],
      total: 10
    };
  },
  components: {
    Confirm
  },
  mounted() {
    this.getList();
  },
  methods: {
    close() {
      this.show = false;
    },
    currentPage(val) {
      this.page = val - 1;
      this.getList();
    },
    sellOut(item) {
      //:disabled="item.state!='HOLDPOSITION'"
      this.show = true;
      this.maskInfo = item;
      this.createTime = Math.floor(
        (Date.parse(new Date()) - Date.parse(item.createTime.split(" ")[0])) /
          (1000 * 60 * 60 * 24)
      );
    },
    getList() {
      this.$axios
        .get(
          "/strategist/buyRecord/pagesHoldPosition?page=" +
            this.page +
            "&size=" +
            this.size,
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          if (res.data.code == 200) {
            this.dataList = res.data.result.content;
            this.total = res.data.result.totalElements;
          }
        });
    }
  }
};
</script>

<style scoped>
.el-button--warning {
  width: 140px;
  height: 30px;
}
.ornow {
  color: #687284;
  font-size: 14px;
}
.top-left-top,
.top-middle-top,
.bottom-left p:first-child,
.bottom-middle p:first-child,
.bottom-right p:first-child {
  margin-bottom: 6px;
}
.bottom-left p span:last-child,
.bottom-middle p span:last-child,
.bottom-right p span:last-child {
  color: #1e242e;
}
div {
  color: #687284;
  font-size: 12px;
}
.top {
  border-bottom: 1px dashed #ddd;
}
.bottom {
  font-size: 12px;
}
.name {
  color: #1e242e;
  font-size: 16px;
}
.code {
  font-size: 12px;
  color: #adb3c1;
}
.holding-list {
  padding: 10px 0;
  background: #f7f7f7;
}
.top,
.bottom {
  background: #fff;
  padding: 15px 20px;
  padding-right: 141px;
}
.bottom {
  padding-right: 181px;
}
.top-left,
.bottom-left {
  width: 260px;
}
.holding-list img {
  display: inline-block;
}
.clock {
  width: 11px;
  height: 11px;
}
.holding-list > div {
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
.el-tag--medium {
  height: 30px;
  width: 100px;
  line-height: 26px;
  text-align: center;
  background: #b2b0b3;
  color: #fff;
}
.el-button {
  padding: 7px 20px;
}
.el-button + .el-button {
  margin-left: 0 !important;
}

.blue {
  background: #3e59a7;
}
.orange {
  background: #ee8354;
}
</style>