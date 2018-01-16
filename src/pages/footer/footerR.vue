<template>
  <div>
        <div class="width100">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>了解我们</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="width100">
            <el-tabs tab-position="left" v-model="witch">
                <el-tab-pane label="公司介绍" name="one">
                    <div>
                        <img src="../../assets/img/topbanner.png"/>
                    </div>
                    
                    <div class="fontcolor">
                        深圳市惠普优选科技有限公司致力为广大股民提供方便快捷安全的互联网股票配资实盘交易服务。惠普优选拥有健全的风控、运营、产品、财务以及客户服务体系，是一家高效的创新型平台。
                        <br/><br/>
我们秉持“合规、安全、透明、优质服务”的理念，把极致的互联网体验带入到投资，摆脱了传统线下模式中：超高的利息、地域的限制、繁杂的操作、低效死板的风控，从而助力投资方取得安全、高效的资金回报。
<br/><br/>
依托行业经验及资源，提供多样化的点买方案为不同需求的用户解决炒股需要，极低的投入可为用户带来高收益的效益，用户交易资金由第三方证券监管平台托管，保证用户权益，资金交易账户由银行监管，交易全程也都由第三方证券监管机构进行监管，用户可在惠普优选上根据实时的大盘动态进行点买交易，极简的操作和体验能为您快速实现交易买卖，收益尽在瞬息之间。
                    </div>
                </el-tab-pane>
                <el-tab-pane label="网站公告" name="two">
                    <div>
                        <img src="../../assets/img/topbanner.png"/>
                    </div>
                    
                    <div class="fontcolor">
                        
                            点买人是指股票发布人，发布人通过平台发布股票买卖方案，如选择什么股票，买多少股，止盈点是多少，止损点是多少，何时买入，何时卖出；
                    </div>
                </el-tab-pane>
                <el-tab-pane label="联系我们"  name="three">
                    <div>
                        <img src="../../assets/img/topbanner.png"/>
                    </div>
                    
                    <div class="fontcolor">
                        <p>公司名称：深圳市惠普优选科技有限公司</p>
                        <p>公司地址：深圳市宝安区新安街道卓越前海时代广场A座2304</p>
                        <p>如果您在使用过程中对功能产生疑问或出现错误提示，请与我们的客服人员联系</p>
                        <p class="tel">客服热线：0755-23065340（ 08：00-21：00）</p>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      witch: this.$route.query.R || "one"
    };
  },
  watch: {
    $route() {
      this.witch = this.$route.query.R;
    }
  }
};
</script>
<style scoped>
.fontcolor {
  color: #1e242e;
  font-size: 14px;
  padding: 0 20px;
  box-sizing: border-box;
}
.fontcolor p {
  line-height: 24px;
}
.tel {
  color: #3e59a7;
  font-size: 16px;
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
  width: 884px;
  margin-left: 10px;
  background: #fff;
  padding: 0px 0px 37px 0px;
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
.el-tabs__header.is-left {
  min-height: 550px !important;
  background: #fff;
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
