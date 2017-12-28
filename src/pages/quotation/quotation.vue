<template>
    <div>
        <top-header></top-header>
        <div class="quotation">
            <div class="width100 bg">
                <div class="stock-seo">
                    <div class="stock">
                        <div class="stock-text">
                            <span class="text">平安银行</span>
                            <span class="number">000001</span>
                        </div>
                        <div class="stock-number">
                            12.41
                        </div>
                        <div class="stock-rose">
                            <span>+0.17%</span>
                            <span>+1.30%</span>
                        </div>
                    </div>
                    <div class="buy">
                        <a href="#" class="refresh">
                            刷新
                        </a>
                        <a href="#" class="buy-btn">
                            点买
                        </a>
                    </div>
                    <div class="stock-seo-div">
                        <div class="seo-text">
                            <input type="text" placeholder="输入股票名称／代码／简拼" class="seo-val" />
                            <input type="button" value="搜索" class="seo-btn"/>
                        </div>
                        <div class="stock_export">
                            <div v-for="text in message">
                                <p class="bond-title">{{text.name}}</p>
                                <p class="bond-number">{{text.lastPrice}}</p>
                                <div class="bond-rose">
                                    <span>{{text.upDropPrice}}</span>
                                    <span>{{text.upDropSpeed}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="width100">
                <div class="stock-data">
                    <div class="stock-left">

                    </div>
                    <div class="stock-right">
                        <div class="stock-right-div1">
                            <p>实时交易动态</p>
                            <ul class="data-stock">
                                <li v-for="item in transaction">
                                    <div class="stock-title">
                                        <span>{{item.phone}}</span>
                                        <span>{{item.tradeTime}}{{item.tradeType}}</span>
                                    </div>
                                    <div class="stock-nuber">
                                        <span>{{item.stockName}}</span>
                                        <span>{{item.stockCode}}</span>
                                    </div>
                                    <div>
                                        {{item.tradeType}}价格{{item.tradePrice}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="stock-right-div2">
                            <p>热门股票</p>
                            <ul class="data-stock">
                                <li v-for="item in hot">
                                    <div class="stock-title">
                                        <span>{{item.name}}</span>
                                        <span>{{item.code}}</span>
                                    </div>
                                    <div class="stock-nuber">
                                        <span>{{item.lastPrice}}</span>
                                    </div>
                                    <div>
                                        <span>点买</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import TopHeader from '../../components/header.vue'
    import FooterNav from '../../components/footer.vue'
    import  axios from 'axios'
    import qs from 'qs'

    import echarts from 'echarts'

    export default {
        name: "quotation",
        data(){
            return{
                message: null,
                transaction:null,
                hot:null
            }
        },
        components:{
            TopHeader,
            FooterNav
        },
        created(){
            let  _this = this;
            axios.get('/strategist/system/stockMarketExponent')
            .then(function (response) {
                if(response.data.code == 200){
                    this.message = response.data.result;
                    console.log(this.message)
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
            axios.get('/strategist/buyRecord/tradeDynamic?' + qs.stringify({
                page: 0,
                size: 5
            }))
                .then(function (res) {
                    _this.transaction = res.data.result.content;//拿到所有数据
                    console.log(_this.transaction);
                    for (var i = 0; i < _this.transaction.length; i++) {//循环所有数据，找到type数据，然后修改值
                        // _this.blanks[i].active = (i == 0);
                        // if (i == 0) {
                        //     _this.bindCardId = _this.blanks[i].id;
                        //     _this.bankCode = _this.blanks[i].bankCode;
                        // }
                        _this.transaction[i].tradeType = _this.transaction[i].tradeType==1?'买入':'卖出'
                        _this.transaction[i].tradeTime = _this.transaction[i].tradeTime.substring(11,16);
                    }
                    this.transaction = Object.assign({}, this.transaction);
                })
                .catch(function (err) {
                    console.log(err);
                });
            axios.get('/strategist/stock/stockRecommend?' + qs.stringify({
                page: 0,
                size: 5
            }))
                .then(function (res) {
                    _this.hot = res.data.result.content;
                    console.log(_this.hot)
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        mounted(){

        }
    }

</script>

<style scoped>
    .stock-right-div2{
        margin-top: 10px;
    }
    .stock-right-div2 ul li>div:last-child span{
            display: block;
        width: 78px;
        height: 30px;
        line-height: 32px;
        border: 1px solid #ee8354;
        text-align: center;
        color: #ee8354;
        margin: 0 auto;
        margin-top: 18px;
    }
    .stock-right-div2 .stock-nuber span{
        text-align: center;
        line-height: 68px;
        color: #e26042;
        font-size: 14px;
        display: block;
        text-align: center;
    }
    .stock-right-div2 .stock-title>span{
        display: block;
        font-size: 14px;
        color: #adb3c1;
        margin-left: 15px;
    }
    .stock-right-div2 .stock-title>span:first-child{
        padding-top: 18px;
        color: #1e242e;
    }
    .stock-right-div1 .stock-title>span:first-child{
        color: #818081;
        padding-top: 18px;
    }
    .stock-right-div1 .stock-title>span:last-child{
        color: #adb3c1;
        font-size: 12px;
        padding-top: 2px;
    }
    .stock-right-div1 .stock-title>span{
        display: block;
        margin-left: 13px;
    }
    .stock-right-div1 .stock-title{
        font-size: 14px;
    }
    .stock-right-div1 .stock-nuber{
        text-align: center;
        font-size: 14px;
    }
    .stock-right-div1 .stock-nuber>span:first-child{
           color: #1e242e;
        display: block;
        padding-top: 18px;
    }
    .stock-right-div1 .stock-nuber>span:last-child{
        color: #adb3c1;
        display: block;
        padding-top: 1px;
    }
    .data-stock{
        background: #f7f7f7;
    }
    .stock-right-div1 .data-stock li>div,.stock-right-div2 .data-stock div{
        width: 33%;
        float: left;
    }
    .stock-right-div1 .data-stock li,.stock-right-div2 .data-stock li{
        height: 68px;
        margin-bottom: 1px;
        background: #fff;
    }
    .stock-right-div1 .data-stock li>div:last-child{
        line-height:68px;
        color: #e26042;
        text-align: center;
    }
    .stock-right>div>p{
        height: 40px;
        line-height: 40px;
        color: #3e59a7;
        border-bottom: 1px solid #f7f7f7;
        padding-left: 15px;
        font-size: 16px;
        background: #fff;

    }
    .stock-right{
        width: 420px;
        float: right;
    }
    .stock-data{
        min-height: 808px;
        width: 1024px;
        margin: 0 auto;
        padding-top: 10px;
        padding-bottom: 20px;
    }
    .stock-data:after{
        content: ".";
        clear: both;
        display: block;
        overflow: hidden;
        font-size: 0;
        height: 0;
    }
    .stock-seo{
        width: 1024px;
        margin: 0 auto;
        height: 240px;
    }
    .stock-seo>div{
        float: left;
    }
    #main{
        width: 594px;
        height: 482px;
    }
.bg{
    background: url("../../assets/img/beijingtu02@2x.png") no-repeat;
    background-size: 100% 100%;
}
    .stock{
        width: 161px;
        margin-left: 42px;
    }
    .stock-text{
        color: #fff;
        font-size: 14px;
        padding-top: 42px;
    }
    .stock-number{
        font-size: 64px;
        color: #ff583D;
        padding-top: 18px;
        font-family: fantasy;
        letter-spacing: 10px;
    }
    .stock-rose{
        font-size: 14px;
        color: #ff583d;
        padding-top: 13px;
    }
    .stock-rose>span:first-child{
        padding-right: 28px;
    }
    .buy{
        margin-left: 60px;
    }
    .refresh{
        margin-top: 77px;
        display: block;
        width: 133px;
        height: 32px;
        border: 1px solid #adb3c1;
        color: #adb3c1;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
    }
    .buy-btn{
        display: block;
        margin-top: 26px;
        width: 133px;
        height: 32px;
        border: 1px solid #ee8354;
        background: #ee8354;
        text-align: center;
        color: #ffffff;
        line-height: 32px;
        font-size: 14px;
    }
    .stock-seo-div{
        margin-top: 20px;
        margin-left: 194px;
    }
    .seo-text>input  {
        float: left;
    }
    .seo-val{
        width: 329px;
        font-size: 14px;
        padding-left:35px ;
        background: url("../../assets/img/search@2x.png") no-repeat 8px 7px;
        background-color:#fff !important;
        background-size:16px 17px;
        border: 0;
        height: 32px;
    }
    .seo-btn{
        border: 0;
        width: 60px;
        height: 32px;
        font-size:14px;
        color: #fff;
        background:#adb3c1 ;
    }
    .stock_export{
        width: 424px;
        height: 147px;
        background: #000;
        background:rgba(0,0,0,.25);
        margin-top: 15px;
    }
    .seo-text{
        overflow: hidden;
    }
    .stock_export>div{
        width:141px;
        float: left;
        text-align: center;
    }
    .stock_export>div>.bond-title{
        margin-top: 36px;
        font-size: 14px;
        color: #fff;
    }
    .stock_export>div>.bond-number{
        font-size: 22px;
        color: #e26042;
        margin-top: 9px;
    }
    .stock_export>div>.bond-rose{
        font-size: 12px;
        color: #46c032;
        margin-top: 9px;
    }
    .stock_export>div>.bond-rose>span:first-child{
        margin-right: 10px;
    }

</style>