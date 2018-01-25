<template>
    <li class="item" >
        <div class="middle flex">
        <div class="top">
            <span class="square blue"></span>
            <span class="name">{{item.stockName}}</span>
            <span class="code"> {{item.stockCode}} </span>
        </div>
            <!-- <span class="data">{{item.buyingTime}}</span> -->
            <div>
                <span class="ornow">当前盈亏</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span :class="['money',item.profitOrLoss>0?'up':'down']">{{item.profitOrLoss}}元</span>
            </div>
            <div class="del" @click="seeDel($event,index)">
                查看详情&nbsp;
                <i class="el-icon-arrow-down" ref="rowwer"></i>
            </div>
        </div>
        <div class="bottom" ref="bottom" v-show="index == showNum" style="paddingLeft:40px;">
            <div class="bottom-box">
                <div class="flex bottom-item">
                    <p>
                        <span class="l">交易本金</span>
                        <span class="r r-color">{{item.applyAmount}}元</span>
                    </p>
                    <p>
                        <span class="l">买入价格</span>
                        <span class="r r-color">{{item.buyingPrice}}元</span>
                    </p>
                    <p>
                        <span class="l">点买类型</span>
                        <span class="r-color">即时买入</span>
                    </p>
                </div>
                <div class="flex bottom-item">
                    <p>
                        <span class="l">交易数量</span>
                        <span class="r r-color">{{item.numberOfStrand}}股</span>
                    </p>
                    <p>
                        <span class="l">卖出价格</span>
                        <span class="r r-color">{{item.sellingPrice}}元</span>
                    </p>
                    <p>
                        <span class="l">备 &nbsp;注</span>
                        <span class="r-color">{{item.windControlType=="TRADINGEND"?'交易期满':item.windControlType=="REACHPROFITPOINT"?'达到止盈点':item.windControlType=="REACHLOSSPOINT"?'达到止损点':'客户申请平仓'}}</span>
                    </p>
                </div>
                <div class="flex specil bottom-item">
                    <p>
                        <span class="l">买入时间</span>
                        <span class="r-color">{{item.buyingTime}}</span>
                    </p>
                    <p>
                        <span class="l">卖出时间</span>
                        <span class="r-color">{{item.sellingTime}}</span>
                    </p>
                    <p>
                        <span class="l">交易单号</span>
                        <span class="r-color">{{item.tradeNo}}</span>
                    </p>
                </div>                      
            </div>
            <p class="title">交易综合费</p>
            <div class="bottom-box">
                <div class="flex bottom-item">
                    <p>
                        <span class="l">信息服务费</span>
                        <span class="r r-color">{{item.serviceFee}}元</span>
                    </p>
                    <p>
                        <span class="l">递延次数</span>
                        <span class="r r-color">{{item.deferredDays}}</span>
                    </p>
                    <p>
                        <span class="l">递延费</span>
                        <span class="r-color">{{item.deferredCharges}}元</span>
                    </p>
                </div>                     
            </div>
            <p class="title">履约保证金</p>
            <div class="bottom-box">
                <div class="flex bottom-item">
                    <p>
                        <span class="l">冻 &nbsp;结</span>
                        <span class="r r-color">{{item.reserveFund}}元</span>
                    </p>
                    <p>
                        <span class="l">扣 &nbsp;减</span>
                        <span class="r r-color">{{item.publisherProfitOrLoss}}元</span>
                    </p>
                    <p>
                        <span class="l">解 &nbsp;冻</span>
                        <span class="r-color">{{item.publisherProfitOrLoss>0?item.reserveFund:item.reserveFund+item.publisherProfitOrLoss}}元</span>
                    </p>
                </div>                     
            </div>
            <p class="title">交易盈亏分配</p>
            <div class="bottom-box">
                <div class="flex bottom-item">
                    <p>
                        <span class="l">方案状态</span>&nbsp;&nbsp;&nbsp;
                        <span class="r r-color">已结算</span>
                    </p>
                    <p>
                        <span class="l">交易盈亏</span>&nbsp;&nbsp;&nbsp;
                        <span class="r r-color">{{item.profitOrLoss}}元</span>
                    </p>
                    <p>
                        <span class="l">盈利分配</span>&nbsp;&nbsp;&nbsp; 
                        <span class="r-color">{{item.publisherProfitOrLoss}}元</span>
                    </p>
                </div>
                
            </div>
        </div>
    </li>
</template>
<script>
export default {
  props: {
    item: {},
    index: null
  },
  data() {
    return {
      showNum: null
    };
  },
  methods: {
    seeDel(event, index) {
      if (this.$refs.rowwer.className == "el-icon-arrow-down") {
        this.$refs.rowwer.className = "el-icon-arrow-up";
        this.$refs.bottom.setAttribute("class", "animation");
      } else {
        this.$refs.rowwer.className = "el-icon-arrow-down";
      }
      if (this.showNum != index) {
        this.showNum = index;
      } else {
        this.showNum = null;
      }
      // console.log(event)
    }
  }
};
</script>
<style scoped>
.ornow{
  color: #1e242e;
}
.animation {
  -webkit-animation: fadeInDown 0.1s 0.1s ease both;
  -moz-animation: fadeInDown 0.1s 0.1s ease both;
}
@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
  }
}
@-moz-keyframes fadeInDown {
  0% {
    opacity: 0;
    -moz-transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    -moz-transform: translateY(0);
  }
}
.title {
  line-height: 50px;
  border-top: 1px dashed #ddd;
  
}
.code{
  font-size: 12px;
  color: #adb3c1;
}

.main {
  min-height: 600px;
}
.item {
  padding: 5px 0;
  background: #f7f7f7;
}
.item>div{
  background: #fff;
}
i {
  font-weight: 900;
}
.settlement {
  padding: 10px;
}
.item > div {
  line-height: 40px;
}
.square {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 2px;
}
.blue {
  background: #47c233;
}
.money {
  display: inline-block;
  width: 80px;
}
.down {
  color: #47c233;
}
.name {
  color: #1e242e;
  font-size: 16px;
}
.settlement .top {
  font-size: 16px;
}
.settlement .middle {
  color: #687284;
  padding: 0 20px;
  font-size: 14px;
  justify-content: space-between;
  padding-right: 60px;
}
.l {
  width: 70px;
  display: inline-block;
}
.r {
  width: 100px;
  display: inline-block;
}
.r-color {
  color: #1e242e;
}
.del {
  color: #3e59a7;
  cursor: pointer;
}
.bottom {
  padding: 0 20px;
}
.bottom-item {
  justify-content: space-between;
}
.bottom-box {
  font-size: 14px;
  color: #818081;
}
.bottom-item p {
  width: 240px;
}
.specil p {
  font-size: 13px;
}

</style>
