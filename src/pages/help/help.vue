<template>
    <div>
        <top-header></top-header>
        <div class="width100">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>帮助</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="width100">
            <el-tabs :tab-position="tabPosition" >
                <el-tab-pane label="什么是点买人">
                    <div>
                        <img src="../../assets/img/wen@2x.png"/>什么是点买人？
                    </div>
                    <div class="border"></div>
                    <div>
                        <img src="../../assets/img/da@2x.png"/>
                        <div>
                            点买人是指股票发布人，发布人通过平台发布股票买卖方案，如选择什么股票，买多少股，止盈点是多少，止损点是多少，何时买入，何时卖出；
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="什么是投资人">
                    <div>
                        <img src="../../assets/img/wen@2x.png"/>什么是投资人？
                    </div>
                    <div class="border"></div>
                    <div>
                        <img src="../../assets/img/da@2x.png"/>
                        <div>
                            投资人是实际购买股票的自然人或者法人，投资人提供资金，证券账号，自由选择平台上的股票方案，根据实际情况匹配，并严格按照方案要求买卖股票。
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="什么是点买交易">
                    <div>
                        <img src="../../assets/img/wen@2x.png"/>什么是点买交易？
                    </div>
                    <div class="border"></div>
                    <div>
                        <img src="../../assets/img/da@2x.png"/>
                        <div>
                            点买交易是本平台通过点买人发起股票方案（选择股票，选择购买数量，设置止盈止损），平台收集这些方案后转发给所有投资人，投资人根据自己选择是否匹配，如匹配成功，则点买人与投资人生成一个协议，投资人按点买人提供的方案要求执行买入对应股票操作，如亏损，点买人以保证金为最大额度支付亏损，超过部分由投资人自行负责！点买人获得盈利部分90%的收益，投资人获得10%的盈利部分
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="什么是合作时段">
                    <div>
                        <img src="../../assets/img/wen@2x.png"/>合作时段是什么时候
                    </div>
                    <div class="border"></div>
                    <div>
                        <img src="../../assets/img/da@2x.png"/>
                        <div>
                            投资人接受点买人合作的时段为T日的09:30:00-11:30,13:00-14:54:59；投资人接受点买人平仓申请的时段为09:30:00-11:30,13:00-14:54:59。本次合作中T日指交易日2017-11-08，T+1日指2017-11-09，T+5日指2017-11-15。
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="什么是止盈">
                    <div>
                        <img src="../../assets/img/wen@2x.png"/>什么是止盈？
                    </div>
                    <div class="border"></div>
                    <div>
                        <img src="../../assets/img/da@2x.png"/>
                        <div>
                            止盈是该条方案的盈利线，当达到预设的止盈点的时候，系统会自动发起卖出指令给投资人。若股价持续时间过短（低于5秒），将不能保证成交。
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="什么是止损">
                    <div>
                        <img src="../../assets/img/wen@2x.png"/>什么是止损？
                    </div>
                    <div class="border"></div>
                    <div>
                        <img src="../../assets/img/da@2x.png"/>
                        <div>
                            止损是该条方案的亏损线，当达到预设的止损点的时候，系统会自动发起卖出指令给投资人。
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="什么是服务费">
                    <div>
                        <img src="../../assets/img/wen@2x.png"/>什么是服务费？
                    </div>
                    <div class="border"></div>
                    <div>
                        <img src="../../assets/img/da@2x.png"/>
                        <div>
                            服务费是是当方案第一次发起时，点买人要支付给平台的费用，费用包括交易印花税、过户费、佣金以及平台的居间费和下一个交易日的递延费。 此费用根据交易金额收取，在第一天收取，一般标准为45元/万（数据仅供参考，以实际平台公布为准）。
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="什么是保证金">
                    <div>
                        <img src="../../assets/img/wen@2x.png"/>什么是保证金？
                    </div>
                    <div class="border"></div>
                    <div>
                        <img src="../../assets/img/da@2x.png"/>
                        <div>
                            保证金是点买人委托平台冻结在三方支付公司，用于方案亏损时的赔付金额，如盈利，全额返还。如亏损，按实际亏损赔付， 且履约保证金为赔付上限，超出亏损部分由投资人自己承担。
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="什么是递延费">
                    <div>
                        <img src="../../assets/img/wen@2x.png"/>什么是递延费？
                    </div>
                    <div class="border"></div>
                    <div>
                        <img src="../../assets/img/da@2x.png"/>
                        <div>
                            方案持仓超过T+1时，第三个交易日起，点买人需要缴纳递延费用，扣费时间为15：00，直接从点买人账户中扣除，如果点买人不想递延，请务必在第二个交易日的14：50前发起卖出指令，否则视为允许递延，扣费标准：20元/天（数据仅供参考，实际以平台公布为准）。
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="什么是递延条件">
                    <div>
                        <img src="../../assets/img/wen@2x.png"/>递延条件有哪些？
                    </div>
                    <div class="border"></div>
                    <div>
                        <img src="../../assets/img/da@2x.png"/>
                        <div>
                            递延有以下三个条件且按优级最高排列 <br/>1. 持仓股票不在黑名单中（即，不是高风险股，也不是即将停盘股）<br/>2.方案满足浮动盈亏/履约保证金≥-75%~-55%（数据仅供参考，以平台实际最新公布的为准）<br/>3. 点买人平台余额充足（下一个交易日要持仓需要在上一个交易日扣款，如果发现点买人余额不足或部分不足，系统优先以盈亏从小到大平仓， 直到够付递延费或全部方案卖出）
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="什么是停牌股票">
                    <div>
                        <img src="../../assets/img/wen@2x.png"/>停牌股票怎么处理？
                    </div>
                    <div class="border"></div>
                    <div>
                        <img src="../../assets/img/da@2x.png"/>
                        <div>
                            当该方案的股票在持仓过程中遇到停牌，点买人可以选择继续拥有（一直缴纳递延费直到复盘）或者放弃所有收益（当点买人的待缴纳递延费大于履约保证金时， 股票复盘后任何盈利或者亏损都与点买人无关，由投资人全部自行承担；当复盘时点买人待缴纳递延费小于等于保证金时，复盘后有盈利继续按协议约定分成）， 股票复盘之前点买人不可申请提前结算。
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="方案发起失败">
                    <div>
                        <img src="../../assets/img/wen@2x.png"/>为什么我方案发起失败？
                    </div>
                    <div class="border"></div>
                    <div>
                        <img src="../../assets/img/da@2x.png"/>
                        <div>
                            点买人发起点买后，若60秒内无投资人匹配该方案，则点买失败，相关资金退还到点买人账户中无投资人匹配的原因可能为：<br/>1. 盘中涨幅超8%或者跌幅超8%。  <br/>2. 单股持仓市值过大。<br/>3. 方案所选股票被认为有过高的下跌风险。

                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="卖出时会部分成交">
                    <div>
                        <img src="../../assets/img/wen@2x.png"/>为什么卖出时会部分成交，怎么结算？
                    </div>
                    <div class="border"></div>
                    <div>
                        <img src="../../assets/img/da@2x.png"/>
                        <div>
                            由于行情波动过大，卖出时会造成部分成交，只有全部成交后，才会结算该方案。
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="清算资金返还账户">
                    <div>
                        <img src="../../assets/img/wen@2x.png"/>卖出清算后资金何时返还账户余额？
                    </div>
                    <div class="border"></div>
                    <div>
                        <img src="../../assets/img/da@2x.png"/>
                        <div>
                            点买人是指股票发布人，发布人通过平台发布股票买卖方案，如选择什么股票，买多少股，止盈点是多少，止损点是多少，何时买入，何时卖出；
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="清算出差错">
                    <div>
                        <img src="../../assets/img/wen@2x.png"/>若清算时出现明显差错怎么办？
                    </div>
                    <div class="border"></div>
                    <div>
                        <img src="../../assets/img/da@2x.png"/>
                        <div>
                            若由于系统、接口等问题造成清算出错，我们会在核实数据后对用户该笔交易做资金修正。
                        </div>
                    </div>
                </el-tab-pane>

            </el-tabs>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
import TopHeader from "../../components/header.vue";
import FooterNav from "../../components/footer.vue";

export default {
  name: "help",
  components: {
    TopHeader,
    FooterNav
  },
  data() {
    return {
      tabPosition: "left",
    };
  }
};
</script>

<style scoped>
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
  padding: 37px 32px 37px 10px;
}

.el-tab-pane img {
  width: 22px;
  height: 20px;
  display: inline-block;
  vertical-align: -4px;
  margin-right: 10px;
  margin-left: 16px;
}

.el-tab-pane > div:first-child {
  margin-bottom: 13px;
  font-size: 16px;
  color: #1e242e;
}

.el-tab-pane > div:last-child {
  margin-top: 20px;
  font-size: 14px;
  color: #687284;
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