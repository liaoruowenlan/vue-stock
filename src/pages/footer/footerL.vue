<template>
  <div>
      <top-header></top-header>
        <div class="width100">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>了解我们</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="width100">
            <el-tabs tab-position="left" v-model="witch">
                <el-tab-pane label="点买交易" name="one">
                    <div>
                        <img src="../../assets/img/topbanner.png"/>
                    </div>
                    <div class="fontcolor">
                        点买交易是本平台通过点买人发起股票方案（选择股票，选择购买数量，设置止盈止损），平台收集这些方案后转发给所有投资人，投资人根据自己选择是否匹配，如匹配成功，则点买人与投资人生成一个协议，投资人按点买人提供的方案要求执行买入对应股票操作，如亏损，点买人以保证金为最大额度支付亏损，超过部分由投资人自行负责！点买人获得盈利部分90%的收益，投资人获得10%的盈利部分
                    </div>
                </el-tab-pane>
                <el-tab-pane label="履约保证金" name="two">
                    <div>
                        <img src="../../assets/img/topbanner.png"/>
                    </div>
                    <div class="fontcolor">
                        履约保证金是平台冻结在三方支付公司，用于方案亏损时的赔付义务的费用，结束时根据方案盈亏结算，如盈利，全额返还。如亏损，按实际亏损赔付，且履约保证金为赔付上限，超出亏损部分由投资人自己承担。
                    </div>
                </el-tab-pane>
                <el-tab-pane label="递延费" name="three">
                    <div>
                        <img src="../../assets/img/topbanner.png"/>
                    </div>
                    <div class="fontcolor">
                        递延费又称延期费，是点买人在方案到期时延期卖出平台收取的费用，例如：方案持仓超过T+1时，点买人需要缴纳递延费用，扣费时间为第二个交易日的15：00，直接从点买人账户中扣除，如果点买人不想递延，请务必在第二个交易日的14：50前发起卖出指令，否则视为允许递延，递延成功即扣费；<br/>
                        扣费标准：方案类型的不同，递延费的扣费标准也不同，实际的递延费用以平台公布为准。
                    </div>
                </el-tab-pane>
                <el-tab-pane label="递延条件"  name="fore">
                    <div>
                        <img src="../../assets/img/topbanner.png"/>
                    </div>
                    <div class="fontcolor">
                       递延有以下三个条件且按优级最高排列<br/>
                         1. 持仓股票不在黑名单中（即，不是高风险股，也不是即将停盘股）<br/>
                         2. 方案满足浮动盈亏/履约保证金≥-75%~-55%（数据仅供参考，以平台实际最新公布的为准）<br/>
                         3. 点买人平台余额充足（下一个交易日要持仓需要在上一个交易日扣款，如果发现点买人余额不足或部分不足，系统优先以盈亏从小到大平仓， 直到够付递延费或全部方案卖出）
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <FooterNav/>
  </div>
</template>
<script>
import TopHeader from "../../components/header";
import FooterNav from "../../components/footer";
export default {
  components: {
    TopHeader,
    FooterNav
  },
  data () {
      return {
          witch:this.$route.query.l  || 'one'
      }
  },
  mounted () {
      console.log(this.$route.query)
  },
  watch:{
      $route(){
        //   console.log(this.witch)
          this.witch = this.$route.query.l
        //   this.$router.push({path:'/footerR',query:{R:this.witch}})
      }
  }
};
</script>
<style scoped>
.fontcolor{
    color: #1e242e;
    font-size: 14px;
}

.el-breadcrumb {
  width: 1004px;
  margin: 0 auto;
  font-size: 16px;
  padding: 10px 10px;
}

.el-tabs {
  width: 1024px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.el-tabs--left .el-tabs__item {
  width: 196px !important;
  text-align: center !important;
  height: 70px !important;
  line-height: 70px;
}

.el-tabs--left .el-tabs__header {
  background: #fff !important;
}

.border {
  width: 725px;
  height: 1px;
  background: #f7f7f7;
  margin: 0 auto;
}

.el-tab-pane {
  width: 767px;
  margin-left: 10px;
  background: #fff;
  padding: 37px 32px 37px 40px;
  margin-bottom: 20px !important;
    min-height: 550px !important;
}
.el-tab-pane img {
  width: 100%;
  display: block;
}
.el-tab-pane > div:first-child {
  margin-bottom: 13px;
  font-size: 16px;
  color: #1e242e;
}

.el-tab-pane > div:last-child {
  margin-top: 20px;
  position: relative;
}

.el-tab-pane > div:last-child img {
  position: absolute;
}

.el-tab-pane > div:last-child div {
  padding-left: 48px;
}
.is-active {
  background: #ee8354;
  color: #fff !important;
}
</style>
