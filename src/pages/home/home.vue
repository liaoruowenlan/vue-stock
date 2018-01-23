<template>
    <div>
        <top-header></top-header>
        <swiper></swiper>
        <Pay :centerDialogVisible="centerDialogVisible" @close="close"></Pay>
        <div class="width100">
            <!-- <div class="news">
                <img src="../../assets/img/sy-gonggao copy@2x.png" />
                <p>
                    <a href="#">
                        银行为广大中小微企业提供的线上流动资金贷款服务，该产品为结合大数据...
                    </a>
                </p>
                <div>
                    <p>累计匹配策略人数<span>{{money1}}</span>人</p>
                    <p>累计实现交易金额<span>{{money2}}</span>万</p>
                </div>
            </div>
            <div class="buy">
                <div class="buy-img">
                    <img src="../../assets/img/headerworld.png" />
                </div>
                <div>
                    <p class="buy-header">什么是点买A股?</p>
                    <p class="bug-title">点买人提供交易策略，投资人提供资金，优股网平台撮合双方完成交易。风险共担，收益共享 &nbsp;<router-link to="">查看详情></router-link></p>
                    <ul>
                        <li>
                            <img src="../../assets/img/dian.png" />
                            寻找股神合作：入市资金低，收益高，投资1250元即可点买；
                        </li>
                        <li>
                            <img src="../../assets/img/dian.png" />
                            快速短频交易：A股市场，合作选股，T+1、T+5交易，快速盈利；
                        </li>
                        <li>
                            <img src="../../assets/img/dian.png" />
                            低门槛高收益：股票获利9成归您，投资人助您成股神；
                        </li>
                    </ul>
                    <img class="user-buyH" @click="go" src="../../assets/img/user-buy.png" />
                </div>
            </div>
            <div class="qCcode">
                <div class="qCcode-left">
                    <img src="../../assets/img/phone-ti.png" />
                </div>
                <div class="qCcode-right">
                    <img class="YG-logo" src="../../assets/img/YGlogo.png" />
                    <p class="qCcode-text">
                        实时行情数据，随时看行情，随手发布策略，投资机会不容错过！
                    </p>
                    <p class="qsCode-title">
                        扫一扫，就能下载优股网APP！
                    </p>
                    <div class="qCode-bg">

                    </div>
                </div>
            </div>
            <div class="introduce">
                <div>
                    <div>
                        <img src="../../assets/img/icon01.png" />
                    </div>
                    <h3>
                        三方监管，保障资金
                    </h3>
                    <p>
                        每一笔资金均有担保，资金由第三方机构监管，最大力度保障用户资金安全
                    </p>
                </div>
                <div>
                    <div>
                        <img src="../../assets/img/icon02.png" />
                    </div>
                    <h3>
                        操作便捷，一键平仓
                    </h3>
                    <p>
                        自由选股，自定义下单，操作简单，快速交易，一键平仓，止盈止损
                    </p>
                </div>
                <div>
                    <div>
                        <img src="../../assets/img/icon03.png" />
                    </div>
                    <h3>
                        投资灵活，快速获益
                    </h3>
                    <p>
                        杠杆灵活调配，入市资金低，最低1250，资金快捷流转，低风险超高收益
                    </p>
                </div>
                <div>
                    <div>
                        <img src="../../assets/img/icon04.png" />
                    </div>
                    <h3>
                        快速注册，短频交易
                    </h3>
                    <p>
                        快速注册，省去繁琐开户，快速短频交易A股市场
                    </p>
                </div>

            </div>  -->
            <div class="payHot flex">
                <Hot></Hot>
                <BannerLeft></BannerLeft>
            </div>
                <news></news>
        </div>
        <div class="width100-bg">
            <footer-nav></footer-nav>
        </div>
    </div>
</template>

<script>
    import TopHeader from '../../components/header.vue'
    import FooterNav from '../../components/footer.vue'
    import Swiper from '../../components/swiper.vue'
    import Pay from '../../components/paypassword.vue'
    import Hot from './hot.vue'
    import BannerLeft from './bannerLeft.vue'
    import News from './news.vue'
    
    export default {
        name: "home",
        components:{
            TopHeader,
            FooterNav,
            Swiper,
            Pay,
            Hot,
            BannerLeft,
            News
        },
        data(){
            return {
                money1:'36890',
                money2:'12690',
                centerDialogVisible: false,
            }
        },
        methods: {
            go(){
                this.$router.push({path:'/quotation'})
            },
            getpw(){
                var _this = this
                this.$axios.get('/strategist/publisher/getSettingRemind',{
                    headers: {
                        'Authorization': localStorage.getItem("token") || ' '
                    }
                }).then((response)=>{
                    var data = response.data
                    if(data.code==200){
                        if(!data.result.settingPaymentPassword){//确定后无法关闭。判断语句有问题。
                            _this.centerDialogVisible =  true
                        }
                    }
                })

            },
            close(){
                this.centerDialogVisible = false
            }
        },
        mounted () {
            if(localStorage.getItem("token")){
                this.getpw()
            }
        }
    }
</script>

<style scoped>
.payHot{
    justify-content: space-between;
        margin: 20px auto;
        width: 1024px;
}
    .introduce>div>div{
        height: 143px;
        position: relative;
    }
    .introduce>div>div>img{
        position: absolute;
        bottom: 20%;
        left: 36%;
    }
    .width100-bg{
        width: 100%;
        background: #fff;
    }
    .introduce>div>h3{
        text-align: center;
        font-size: 16px;
        color: #3e59a7;
        font-weight: 700;
        margin-bottom: 10px;
    }
    .introduce>div>p{
        margin: 0 auto;
        width: 222px;
        height: 32px;
        font-size: 12px;
        color: #adb3c1;
        text-align: center;
    }
    .user-buyH{
        margin-top: 31px;
        width: 192px;
        height: 36px;
    }
    .buy ul{
        margin-top: 24px;
    }
    .buy ul li{
        font-size: 12px;
        color: #687284;
        margin-bottom: 8px;
    }
    .buy ul li img{
        display: inline-block;
        vertical-align: 2px;
    }
    .buy-header{
        width: 173px;
        height: 26px;
        font-size: 22px;
        color:#3E59A7;
        font-weight: 700;
        margin-top: 93px;
    }
    .bug-title{
        margin-top: 8px;
        height: 42px;
        width: 512px;
        font-size: 14px;
        line-height: 1.57;
        color: #1e242e;
    }
    .bug-title>a{
        font-size: 12px;
        color: #e26042;
    }
    .buy{
        height: 420px;
        background: #fff;
        margin: 20px auto;
        width: 1024px;
    }
    .buy>div{
        float: left;
        height: 100%;
    }
    .buy>div.buy-img{
        width:410px;
    }
    .buy>div.buy-img img{
        margin:60px 0 0 114px;
    }
    .qCcode{
        height: 540px;
        width: 1024px;
        background: #fff;
        margin: 20px auto;
    }
    .qCcode>div{
        float: left;
        height: 100%;
    }
    .qCcode>div.qCcode-right{
        width: 560px;
    }
    .qCcode-text{
        font-size: 14px;
        text-align: center;
        color: #1e242e;
        padding-top: 9px;
    }
    .qCcode>div.qCcode-left{
        width:464px;
    }
    .qCcode-left>img{
        margin-top: 56px;
        margin-left: 126px;
    }
    .YG-logo{
        width: 100px;
        height: 130px;
        margin: 92px auto 0 auto;
    }
    .qsCode-title{
     text-align: center;
        color: #ee8354;
        font-size: 14px;
        text-align: center;
        margin-top:35px;
    }
    .qCode-bg{
        width: 142px;
        height: 142px;
        background: url("../../assets/img/qCode-bg.png") no-repeat;
        background-size: 100%;
        margin: 20px auto 0 auto;
    }
    .dialogg {
  width: 408px !important;
  margin-top: 26vh !important;
  height: 236px !important;
  border-radius: 10px;
}
.payPasw {
  width: 286px;
  height: 42px;
  margin: 0 auto;
  display: block;
  letter-spacing: 40px;
  text-indent: 25px;
  background: url("../../assets/img/passWborder.png") no-repeat;
}
.paypassword {
  width: 300px;
  height: 40px;
  background: #f9d9cb;
  color: #fff;
  text-align: center;
  line-height: 40px;
  margin: 0 auto;
  font-size: 16px;
  cursor: pointer;
}
.news{
    height: 42px;
    background: #ffffff;
    width: 1024px;
    margin: 0 auto;
    position: relative;
}
    .news>img{
        width:14px;
        height: 14px;
        position: absolute;
        top: 14px;
        left: 7px;
    }
    .news>p{
        line-height: 42px;
        font-size: 14px;
        margin-left: 27px;
        float: left;
    }
    .news>p a{
        color: #687284;
    }
    .news>div{
        float: right;
        height: 42px;
        line-height: 36px;
        font-size: 14px;
        color: #3e59a7;
    }
.news>div p{
    float: left;
}
.news>div p>span{
    color: #e26042;
    font-size: 20px;
    font-weight: bold;
    display: inline-block;
    padding: 0 7px;
}
.news>div p:last-child{
    padding-left: 20px;
    padding-right: 8px;
}
    .width100{
        padding-bottom: 1px;
    }
    .introduce{
        height: 254px;
        width: 1024px;
        margin: 20px auto;
        background:#fff;
    }
    .introduce>div{
        float: left;
        width: 25%;
        height: 100%;
    }
</style>