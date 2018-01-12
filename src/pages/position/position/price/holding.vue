<template>
    <div class="holding">
        <div v-if="dataList.length<1" style="textAlign:center">暂无数据</div>
      
        <div class="holding-list flex" v-for="(item,index) in dataList" :key="index">
            <div class="left ">
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
                    <span class="r">{{(item.reserveFund/10000).toFixed(1)}}万元</span>&nbsp;&nbsp;
                </p>   
                <p class="bottom">
                    <span class="l">当前价</span>&nbsp;&nbsp;
                    <span class="r">{{item.lastPrice}}</span>&nbsp;&nbsp;
                    <span class="space"></span>
                    <span class="l">止损金额</span>&nbsp;&nbsp;
                    <span class="r">{{parseInt(item.applyAmount*item.lossPoint)}}元</span>&nbsp;&nbsp;
                    <span class="space"></span>
                    <span class="l">点买类型</span>&nbsp;&nbsp;
                    <span class="r">即时买入</span>&nbsp;&nbsp;
                </p>   
            </div>
            <div class="right flex">
                <el-tag  size="medium" type="info" disable-transitions>
                    {{item.state=="POSTED"||item.state=="BUYLOCK"?'买入中':item.state=="HOLDPOSITION"?'持仓中':item.state=="SELLAPPLY"?"卖出申请":'卖出锁定'}}
                </el-tag>
                <el-button type="warning"
                :disabled="item.state=='HOLDPOSITION'&&item.createTime.split(' ')[0]!=new Date().toLocaleDateString().replace(/\//g,'-')?false:true"
                  @click="sellOut(item)">卖 出</el-button>
            </div>   
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
import Confirm from '../../../../components/querySell'
export default {
  name: "holding",
  data() {
    return {
      page: 0,
      size: 4,
      dataList: [],
      maskInfo:{},
      show:false,
      createTime:'',
      pageSizes:[4],
      total:10,
    };
  },
  components: {
      Confirm
  },
  mounted() {
    this.getList();
  },
  methods: {
    close(){
      this.show=false
    },
    currentPage(val){
      this.page =  val - 1
      this.getList()
    },
    sellOut(item) {
        //:disabled="item.state!='HOLDPOSITION'"
        this.show = true
        this.maskInfo = item
        this.createTime = Math.floor((Date.parse(new Date())-Date.parse(item.createTime.split(' ')[0]))/(1000*60*60*24))

    },
    getList() {
      this.$axios
        .get(
          "strategist/buyRecord/pagesHoldPosition?page=" +
            this.page +
            "&size=" +
            this.size,
          {
            headers: {
              Authorization: sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          if (res.data.code == 200) {
            this.dataList = res.data.result.content;
            this.total = res.data.result.totalElements
          }
        });
    }
  }
};
</script>

<style scoped>

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

.holding-list {
  display: flex;
  justify-content: space-between;
}
.greenmoney {
  color: #47c233;
}
.redmoney {
  color: #e26042;
}
.space {
  width: 40px;
  display: inline-block;
}
.holding-list .right {
  flex-direction: column;
  padding: 32px 0;
  justify-content: space-between;
}
.holding-list .middle {
  padding-left: 27px;
  font-size: 14px;
  color: #687284;
  line-height: 50px;
}
.holding-list .middle1,
.holding-list .bottom {
  padding-left: 27px;
  line-height: 32px;
  font-size: 14px;
  color: #818081;
}
.holding-list .middle1 .r,
.holding-list .bottom .r {
  color: #1e242e;
  display: inline-block;
  width: 66px;
}
.holding > div.holding-list {
  padding: 30px 0;
  width: 683px;
  margin: 0 auto;
  border-bottom: 1px solid #dee0e4;
}
.holding::after {
  content: ".";
  clear: both;
  display: block;
  overflow: hidden;
  font-size: 0;
  height: 0;
}
.name {
  color: #1e242e;
  font-size: 16px;
}
.square {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 10px;
}
.blue {
  background: #3e59a7;
}
.orange {
  color: #ee8354;
}
</style>