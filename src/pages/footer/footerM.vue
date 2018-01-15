<template>
  <div>
      <top-header></top-header>
        <div class="width100">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>常见问题</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="width100">
            <el-tabs tab-position="left" v-model="witch">
                <el-tab-pane label="禁止股票" name="one">
                    <div>
                        <img src="../../assets/img/topbanner.png"/>
                    </div>
                    
                    <div>
                            禁止投资ST 、*ST股票等，当该方案的股票在持仓过程中遇到停牌，点买人可以选择继续拥有（一直缴纳递延费直到复盘）或者放弃所有收益（当点买人的待缴纳递延费大于履约保证金时， 股票复盘后任何盈利或者亏损都与点买人无关，由投资人全部自行承担；当复盘时点买人待缴纳递延费小于等于保证金时，复盘后有盈利继续按协议约定分成）， 股票复盘之前点买人不可申请提前结算。
                    </div>
                </el-tab-pane>
                <el-tab-pane label="收费说明" name="two">
                    <div>
                        <img src="../../assets/img/topbanner.png"/>
                    </div>
                    
                    <div>
                        <ul>
                            <li>1、服务费：信息服务费指点买人需要支付给平台的费用，一般标准为45元/万（数据仅供参考，以实际平台公布为准）。</li>
                            <li>2、保证金：用于方案亏损时的赔付金额，如盈利，全额返还。如亏损，按实际亏损赔付，且履约保证金为赔付上限，超出亏损部分由投资人自己承担。</li>
                            <li>3、递延费：递延费又称延期费，是点买人在方案到期时延期卖出平台收取的费用，扣费标准：方案类型的不同，递延费的扣费标准也不同，实际的递延费用以平台公布为准。</li>
                        </ul>     
                    </div>
                </el-tab-pane>
                <el-tab-pane label="操作止损"  name="three">
                    <div>
                        <img src="../../assets/img/topbanner.png"/>
                    </div>
                    
                    <div>
                          止损是该方案的亏损线，平台目前止损线分别设有:17.5%、14%、10%三挡，当达到预设的止损点时，系统会自动发起卖出指令。
                    </div>
                </el-tab-pane>
                <el-tab-pane label="操作时间"  name="fore">
                    <div>
                        <img src="../../assets/img/topbanner.png"/>
                    </div>
                    
                    <div>
                        投资人接受点买人合作的时段为T日的09:30:00-11:30,13:00-14:50；投资人接受点买人平仓申请的时段为09:30:00-11:30,13:00-14:50。例如：本次合作中T日指交易日2017-11-08，T+1日指2017-11-09，T+5日指2017-11-15。
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
  data() {
    return {
      witch: this.$route.query.M || "one"
    };
  },
  mounted() {
    console.log(this.$route.query);
  },
  watch: {
    $route() {
      //   console.log(this.witch)
      this.witch = this.$route.query.M;
      //   this.$router.push({path:'/footerR',query:{R:this.witch}})
    }
  }
};
</script>
<style scoped>
.fontcolor {
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
