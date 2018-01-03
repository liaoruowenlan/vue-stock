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
                        <div>
                        <a @click="changeMap(0)">时K</a> <a @click="changeMap()">日K</a>
                        </div>
                        <div id="main" style="width: 594px; height: 411px;">
                        </div>
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
        methods: {
            changeMap(value) {
                this.drawK(value);
            },
            drawK(value) {
                this.charts = echarts.init(document.getElementById("main"));
                var upColor = '#00da3c';
                var downColor = '#ec0000';
                // var rawData = value === 0 ? timeData : dayData; 分 时k和 日K
                var rawData = [
                    {
                    "closePrice": 13.67,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.69,
                    "minPrice": 13.59,
                    "nowVolume": 1919950,
                    "openPrice": 13.59,
                    "time": "2017-12-27 09:30:57",
                    "timeStamp": 1514338257000,
                    "volume": 522298
                    },
                    {
                    "closePrice": 13.65,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.66,
                    "minPrice": 13.63,
                    "nowVolume": 1403460,
                    "openPrice": 13.66,
                    "time": "2017-12-27 09:31:57",
                    "timeStamp": 1514338317000,
                    "volume": 2459888
                    },
                    {
                    "closePrice": 13.65,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.66,
                    "minPrice": 13.63,
                    "nowVolume": 716500,
                    "openPrice": 13.63,
                    "time": "2017-12-27 09:32:57",
                    "timeStamp": 1514338377000,
                    "volume": 3942548
                    },
                    {
                    "closePrice": 13.63,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.65,
                    "minPrice": 13.62,
                    "nowVolume": 626360,
                    "openPrice": 13.64,
                    "time": "2017-12-27 09:33:57",
                    "timeStamp": 1514338437000,
                    "volume": 4721348
                    },
                    {
                    "closePrice": 13.65,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.66,
                    "minPrice": 13.63,
                    "nowVolume": 492678,
                    "openPrice": 13.63,
                    "time": "2017-12-27 09:34:57",
                    "timeStamp": 1514338497000,
                    "volume": 5349708
                    },
                    {
                    "closePrice": 13.66,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.67,
                    "minPrice": 13.65,
                    "nowVolume": 828300,
                    "openPrice": 13.66,
                    "time": "2017-12-27 09:35:57",
                    "timeStamp": 1514338557000,
                    "volume": 5907086
                    },
                    {
                    "closePrice": 13.67,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.67,
                    "minPrice": 13.65,
                    "nowVolume": 516332,
                    "openPrice": 13.65,
                    "time": "2017-12-27 09:36:57",
                    "timeStamp": 1514338617000,
                    "volume": 6782086
                    },
                    {
                    "closePrice": 13.66,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.67,
                    "minPrice": 13.65,
                    "nowVolume": 705868,
                    "openPrice": 13.66,
                    "time": "2017-12-27 09:37:57",
                    "timeStamp": 1514338677000,
                    "volume": 7397918
                    },
                    {
                    "closePrice": 13.62,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.66,
                    "minPrice": 13.62,
                    "nowVolume": 856100,
                    "openPrice": 13.66,
                    "time": "2017-12-27 09:38:57",
                    "timeStamp": 1514338737000,
                    "volume": 8124886
                    },
                    {
                    "closePrice": 13.61,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.62,
                    "minPrice": 13.59,
                    "nowVolume": 979300,
                    "openPrice": 13.61,
                    "time": "2017-12-27 09:39:57",
                    "timeStamp": 1514338797000,
                    "volume": 9003486
                    },
                    {
                    "closePrice": 13.63,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.63,
                    "minPrice": 13.61,
                    "nowVolume": 378500,
                    "openPrice": 13.61,
                    "time": "2017-12-27 09:40:57",
                    "timeStamp": 1514338857000,
                    "volume": 10124686
                    },
                    {
                    "closePrice": 13.66,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.66,
                    "minPrice": 13.64,
                    "nowVolume": 536900,
                    "openPrice": 13.64,
                    "time": "2017-12-27 09:41:57",
                    "timeStamp": 1514338917000,
                    "volume": 10565486
                    },
                    {
                    "closePrice": 13.75,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.76,
                    "minPrice": 13.66,
                    "nowVolume": 1069164,
                    "openPrice": 13.66,
                    "time": "2017-12-27 09:42:57",
                    "timeStamp": 1514338977000,
                    "volume": 11119286
                    },
                    {
                    "closePrice": 13.72,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.75,
                    "minPrice": 13.68,
                    "nowVolume": 2576300,
                    "openPrice": 13.74,
                    "time": "2017-12-27 09:43:57",
                    "timeStamp": 1514339037000,
                    "volume": 12231350
                    },
                    {
                    "closePrice": 13.74,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.76,
                    "minPrice": 13.71,
                    "nowVolume": 1275600,
                    "openPrice": 13.72,
                    "time": "2017-12-27 09:44:57",
                    "timeStamp": 1514339097000,
                    "volume": 14823450
                    },
                    {
                    "closePrice": 13.76,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.76,
                    "minPrice": 13.73,
                    "nowVolume": 2094708,
                    "openPrice": 13.74,
                    "time": "2017-12-27 09:45:57",
                    "timeStamp": 1514339157000,
                    "volume": 16199150
                    },
                    {
                    "closePrice": 13.77,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.77,
                    "minPrice": 13.76,
                    "nowVolume": 1268600,
                    "openPrice": 13.76,
                    "time": "2017-12-27 09:46:57",
                    "timeStamp": 1514339217000,
                    "volume": 18333558
                    },
                    {
                    "closePrice": 13.73,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.76,
                    "minPrice": 13.73,
                    "nowVolume": 1391000,
                    "openPrice": 13.76,
                    "time": "2017-12-27 09:47:57",
                    "timeStamp": 1514339277000,
                    "volume": 19609358
                    },
                    {
                    "closePrice": 13.72,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.73,
                    "minPrice": 13.72,
                    "nowVolume": 967600,
                    "openPrice": 13.73,
                    "time": "2017-12-27 09:48:57",
                    "timeStamp": 1514339337000,
                    "volume": 21060058
                    },
                    {
                    "closePrice": 13.73,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.75,
                    "minPrice": 13.73,
                    "nowVolume": 1006140,
                    "openPrice": 13.73,
                    "time": "2017-12-27 09:49:57",
                    "timeStamp": 1514339397000,
                    "volume": 22167658
                    },
                    {
                    "closePrice": 13.77,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.77,
                    "minPrice": 13.74,
                    "nowVolume": 1120500,
                    "openPrice": 13.74,
                    "time": "2017-12-27 09:50:57",
                    "timeStamp": 1514339457000,
                    "volume": 23278598
                    },
                    {
                    "closePrice": 13.74,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.77,
                    "minPrice": 13.73,
                    "nowVolume": 1653720,
                    "openPrice": 13.77,
                    "time": "2017-12-27 09:51:57",
                    "timeStamp": 1514339517000,
                    "volume": 24428598
                    },
                    {
                    "closePrice": 13.7,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.74,
                    "minPrice": 13.7,
                    "nowVolume": 1137580,
                    "openPrice": 13.74,
                    "time": "2017-12-27 09:52:57",
                    "timeStamp": 1514339577000,
                    "volume": 26148318
                    },
                    {
                    "closePrice": 13.69,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.7,
                    "minPrice": 13.69,
                    "nowVolume": 827300,
                    "openPrice": 13.7,
                    "time": "2017-12-27 09:53:57",
                    "timeStamp": 1514339637000,
                    "volume": 27336738
                    },
                    {
                    "closePrice": 13.68,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.7,
                    "minPrice": 13.67,
                    "nowVolume": 969682,
                    "openPrice": 13.68,
                    "time": "2017-12-27 09:54:57",
                    "timeStamp": 1514339697000,
                    "volume": 28174838
                    },
                    {
                    "closePrice": 13.67,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.69,
                    "minPrice": 13.67,
                    "nowVolume": 762354,
                    "openPrice": 13.68,
                    "time": "2017-12-27 09:55:57",
                    "timeStamp": 1514339757000,
                    "volume": 29160520
                    },
                    {
                    "closePrice": 13.69,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.69,
                    "minPrice": 13.67,
                    "nowVolume": 431380,
                    "openPrice": 13.67,
                    "time": "2017-12-27 09:56:57",
                    "timeStamp": 1514339817000,
                    "volume": 29938274
                    },
                    {
                    "closePrice": 13.63,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.68,
                    "minPrice": 13.63,
                    "nowVolume": 734168,
                    "openPrice": 13.68,
                    "time": "2017-12-27 09:57:57",
                    "timeStamp": 1514339877000,
                    "volume": 30428874
                    },
                    {
                    "closePrice": 13.65,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.66,
                    "minPrice": 13.62,
                    "nowVolume": 655863,
                    "openPrice": 13.63,
                    "time": "2017-12-27 09:58:57",
                    "timeStamp": 1514339937000,
                    "volume": 31177342
                    },
                    {
                    "closePrice": 13.62,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.64,
                    "minPrice": 13.62,
                    "nowVolume": 637700,
                    "openPrice": 13.64,
                    "time": "2017-12-27 09:59:57",
                    "timeStamp": 1514339997000,
                    "volume": 31858905
                    },
                    {
                    "closePrice": 13.62,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.63,
                    "minPrice": 13.62,
                    "nowVolume": 708885,
                    "openPrice": 13.62,
                    "time": "2017-12-27 10:00:57",
                    "timeStamp": 1514340057000,
                    "volume": 32522205
                    },
                    {
                    "closePrice": 13.61,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.62,
                    "minPrice": 13.61,
                    "nowVolume": 307700,
                    "openPrice": 13.62,
                    "time": "2017-12-27 10:01:57",
                    "timeStamp": 1514340117000,
                    "volume": 33270690
                    },
                    {
                    "closePrice": 13.62,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.62,
                    "minPrice": 13.61,
                    "nowVolume": 646380,
                    "openPrice": 13.62,
                    "time": "2017-12-27 10:02:57",
                    "timeStamp": 1514340177000,
                    "volume": 33579690
                    },
                    {
                    "closePrice": 13.6,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.62,
                    "minPrice": 13.6,
                    "nowVolume": 529040,
                    "openPrice": 13.62,
                    "time": "2017-12-27 10:03:57",
                    "timeStamp": 1514340237000,
                    "volume": 34232270
                    },
                    {
                    "closePrice": 13.6,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.61,
                    "minPrice": 13.59,
                    "nowVolume": 860600,
                    "openPrice": 13.6,
                    "time": "2017-12-27 10:04:57",
                    "timeStamp": 1514340297000,
                    "volume": 34789410
                    },
                    {
                    "closePrice": 13.62,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.62,
                    "minPrice": 13.61,
                    "nowVolume": 626100,
                    "openPrice": 13.61,
                    "time": "2017-12-27 10:05:57",
                    "timeStamp": 1514340357000,
                    "volume": 35654910
                    },
                    {
                    "closePrice": 13.61,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.62,
                    "minPrice": 13.6,
                    "nowVolume": 944832,
                    "openPrice": 13.62,
                    "time": "2017-12-27 10:06:57",
                    "timeStamp": 1514340417000,
                    "volume": 36308410
                    },
                    {
                    "closePrice": 13.58,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.61,
                    "minPrice": 13.57,
                    "nowVolume": 1025898,
                    "openPrice": 13.6,
                    "time": "2017-12-27 10:07:57",
                    "timeStamp": 1514340477000,
                    "volume": 37271944
                    },
                    {
                    "closePrice": 13.6,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.6,
                    "minPrice": 13.57,
                    "nowVolume": 1301000,
                    "openPrice": 13.58,
                    "time": "2017-12-27 10:08:57",
                    "timeStamp": 1514340537000,
                    "volume": 38338942
                    },
                    {
                    "closePrice": 13.57,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.6,
                    "minPrice": 13.57,
                    "nowVolume": 752000,
                    "openPrice": 13.58,
                    "time": "2017-12-27 10:09:57",
                    "timeStamp": 1514340597000,
                    "volume": 39646242
                    },
                    {
                    "closePrice": 13.59,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.59,
                    "minPrice": 13.55,
                    "nowVolume": 583100,
                    "openPrice": 13.57,
                    "time": "2017-12-27 10:10:57",
                    "timeStamp": 1514340657000,
                    "volume": 40442842
                    },
                    {
                    "closePrice": 13.61,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.61,
                    "minPrice": 13.58,
                    "nowVolume": 345526,
                    "openPrice": 13.59,
                    "time": "2017-12-27 10:11:57",
                    "timeStamp": 1514340717000,
                    "volume": 41091942
                    },
                    {
                    "closePrice": 13.61,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.61,
                    "minPrice": 13.6,
                    "nowVolume": 269160,
                    "openPrice": 13.61,
                    "time": "2017-12-27 10:12:57",
                    "timeStamp": 1514340777000,
                    "volume": 41491168
                    },
                    {
                    "closePrice": 13.61,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.62,
                    "minPrice": 13.6,
                    "nowVolume": 313842,
                    "openPrice": 13.61,
                    "time": "2017-12-27 10:13:57",
                    "timeStamp": 1514340837000,
                    "volume": 41822028
                    },
                    {
                    "closePrice": 13.63,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.63,
                    "minPrice": 13.61,
                    "nowVolume": 266500,
                    "openPrice": 13.61,
                    "time": "2017-12-27 10:14:57",
                    "timeStamp": 1514340897000,
                    "volume": 42190270
                    },
                    {
                    "closePrice": 13.64,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.64,
                    "minPrice": 13.62,
                    "nowVolume": 306900,
                    "openPrice": 13.62,
                    "time": "2017-12-27 10:15:57",
                    "timeStamp": 1514340957000,
                    "volume": 42510578
                    },
                    {
                    "closePrice": 13.63,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.64,
                    "minPrice": 13.62,
                    "nowVolume": 213600,
                    "openPrice": 13.64,
                    "time": "2017-12-27 10:16:57",
                    "timeStamp": 1514341017000,
                    "volume": 42873078
                    },
                    {
                    "closePrice": 13.63,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.64,
                    "minPrice": 13.62,
                    "nowVolume": 220000,
                    "openPrice": 13.62,
                    "time": "2017-12-27 10:17:57",
                    "timeStamp": 1514341077000,
                    "volume": 43100278
                    },
                    {
                    "closePrice": 13.64,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.64,
                    "minPrice": 13.63,
                    "nowVolume": 264800,
                    "openPrice": 13.64,
                    "time": "2017-12-27 10:18:57",
                    "timeStamp": 1514341137000,
                    "volume": 43371278
                    },
                    {
                    "closePrice": 13.66,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.66,
                    "minPrice": 13.64,
                    "nowVolume": 228000,
                    "openPrice": 13.66,
                    "time": "2017-12-27 10:19:57",
                    "timeStamp": 1514341197000,
                    "volume": 43650778
                    },
                    {
                    "closePrice": 13.64,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.65,
                    "minPrice": 13.63,
                    "nowVolume": 368500,
                    "openPrice": 13.65,
                    "time": "2017-12-27 10:20:57",
                    "timeStamp": 1514341257000,
                    "volume": 43994578
                    },
                    {
                    "closePrice": 13.64,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.64,
                    "minPrice": 13.63,
                    "nowVolume": 223900,
                    "openPrice": 13.64,
                    "time": "2017-12-27 10:21:57",
                    "timeStamp": 1514341317000,
                    "volume": 44413178
                    },
                    {
                    "closePrice": 13.61,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.64,
                    "minPrice": 13.61,
                    "nowVolume": 710492,
                    "openPrice": 13.64,
                    "time": "2017-12-27 10:22:57",
                    "timeStamp": 1514341377000,
                    "volume": 44640178
                    },
                    {
                    "closePrice": 13.6,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.61,
                    "minPrice": 13.59,
                    "nowVolume": 1138242,
                    "openPrice": 13.61,
                    "time": "2017-12-27 10:23:57",
                    "timeStamp": 1514341437000,
                    "volume": 45354828
                    },
                    {
                    "closePrice": 13.57,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.61,
                    "minPrice": 13.57,
                    "nowVolume": 995172,
                    "openPrice": 13.6,
                    "time": "2017-12-27 10:24:57",
                    "timeStamp": 1514341497000,
                    "volume": 46495670
                    },
                    {
                    "closePrice": 13.58,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.58,
                    "minPrice": 13.56,
                    "nowVolume": 1629558,
                    "openPrice": 13.57,
                    "time": "2017-12-27 10:25:57",
                    "timeStamp": 1514341557000,
                    "volume": 47491242
                    },
                    {
                    "closePrice": 13.56,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.56,
                    "nowVolume": 268800,
                    "openPrice": 13.57,
                    "time": "2017-12-27 10:26:57",
                    "timeStamp": 1514341617000,
                    "volume": 49292200
                    },
                    {
                    "closePrice": 13.59,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.59,
                    "minPrice": 13.56,
                    "nowVolume": 841737,
                    "openPrice": 13.57,
                    "time": "2017-12-27 10:27:57",
                    "timeStamp": 1514341677000,
                    "volume": 49573300
                    },
                    {
                    "closePrice": 13.59,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.59,
                    "minPrice": 13.58,
                    "nowVolume": 344000,
                    "openPrice": 13.58,
                    "time": "2017-12-27 10:28:57",
                    "timeStamp": 1514341737000,
                    "volume": 50417637
                    },
                    {
                    "closePrice": 13.58,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.58,
                    "minPrice": 13.57,
                    "nowVolume": 415600,
                    "openPrice": 13.58,
                    "time": "2017-12-27 10:29:57",
                    "timeStamp": 1514341797000,
                    "volume": 50769837
                    },
                    {
                    "closePrice": 13.58,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.59,
                    "minPrice": 13.57,
                    "nowVolume": 222000,
                    "openPrice": 13.58,
                    "time": "2017-12-27 10:30:57",
                    "timeStamp": 1514341857000,
                    "volume": 51186437
                    },
                    {
                    "closePrice": 13.59,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.59,
                    "minPrice": 13.56,
                    "nowVolume": 1001600,
                    "openPrice": 13.58,
                    "time": "2017-12-27 10:31:57",
                    "timeStamp": 1514341917000,
                    "volume": 51468537
                    },
                    {
                    "closePrice": 13.59,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.59,
                    "minPrice": 13.58,
                    "nowVolume": 425300,
                    "openPrice": 13.58,
                    "time": "2017-12-27 10:32:57",
                    "timeStamp": 1514341977000,
                    "volume": 52528937
                    },
                    {
                    "closePrice": 13.61,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.61,
                    "minPrice": 13.58,
                    "nowVolume": 426200,
                    "openPrice": 13.59,
                    "time": "2017-12-27 10:33:57",
                    "timeStamp": 1514342037000,
                    "volume": 52959737
                    },
                    {
                    "closePrice": 13.63,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.63,
                    "minPrice": 13.6,
                    "nowVolume": 661900,
                    "openPrice": 13.61,
                    "time": "2017-12-27 10:34:57",
                    "timeStamp": 1514342097000,
                    "volume": 53386637
                    },
                    {
                    "closePrice": 13.63,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.63,
                    "minPrice": 13.61,
                    "nowVolume": 128300,
                    "openPrice": 13.63,
                    "time": "2017-12-27 10:35:57",
                    "timeStamp": 1514342157000,
                    "volume": 54054637
                    },
                    {
                    "closePrice": 13.68,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.68,
                    "minPrice": 13.62,
                    "nowVolume": 703100,
                    "openPrice": 13.63,
                    "time": "2017-12-27 10:36:57",
                    "timeStamp": 1514342217000,
                    "volume": 54182937
                    },
                    {
                    "closePrice": 13.65,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.68,
                    "minPrice": 13.65,
                    "nowVolume": 271500,
                    "openPrice": 13.68,
                    "time": "2017-12-27 10:37:57",
                    "timeStamp": 1514342277000,
                    "volume": 54888437
                    },
                    {
                    "closePrice": 13.67,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.67,
                    "minPrice": 13.65,
                    "nowVolume": 454900,
                    "openPrice": 13.65,
                    "time": "2017-12-27 10:38:57",
                    "timeStamp": 1514342337000,
                    "volume": 55161637
                    },
                    {
                    "closePrice": 13.68,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.68,
                    "minPrice": 13.67,
                    "nowVolume": 157082,
                    "openPrice": 13.67,
                    "time": "2017-12-27 10:39:57",
                    "timeStamp": 1514342397000,
                    "volume": 55618037
                    },
                    {
                    "closePrice": 13.68,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.69,
                    "minPrice": 13.67,
                    "nowVolume": 281500,
                    "openPrice": 13.67,
                    "time": "2017-12-27 10:40:57",
                    "timeStamp": 1514342457000,
                    "volume": 55780919
                    },
                    {
                    "closePrice": 13.7,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.71,
                    "minPrice": 13.69,
                    "nowVolume": 437100,
                    "openPrice": 13.69,
                    "time": "2017-12-27 10:41:57",
                    "timeStamp": 1514342517000,
                    "volume": 56069219
                    },
                    {
                    "closePrice": 13.68,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.71,
                    "minPrice": 13.68,
                    "nowVolume": 410800,
                    "openPrice": 13.7,
                    "time": "2017-12-27 10:42:57",
                    "timeStamp": 1514342577000,
                    "volume": 56521719
                    },
                    {
                    "closePrice": 13.69,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.69,
                    "minPrice": 13.67,
                    "nowVolume": 473500,
                    "openPrice": 13.67,
                    "time": "2017-12-27 10:43:57",
                    "timeStamp": 1514342637000,
                    "volume": 56933019
                    },
                    {
                    "closePrice": 13.68,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.69,
                    "minPrice": 13.68,
                    "nowVolume": 536305,
                    "openPrice": 13.69,
                    "time": "2017-12-27 10:44:57",
                    "timeStamp": 1514342697000,
                    "volume": 57417319
                    },
                    {
                    "closePrice": 13.67,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.69,
                    "minPrice": 13.67,
                    "nowVolume": 207895,
                    "openPrice": 13.68,
                    "time": "2017-12-27 10:45:57",
                    "timeStamp": 1514342757000,
                    "volume": 57963024
                    },
                    {
                    "closePrice": 13.68,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.7,
                    "minPrice": 13.67,
                    "nowVolume": 495705,
                    "openPrice": 13.67,
                    "time": "2017-12-27 10:46:57",
                    "timeStamp": 1514342817000,
                    "volume": 58177319
                    },
                    {
                    "closePrice": 13.69,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.7,
                    "minPrice": 13.68,
                    "nowVolume": 150900,
                    "openPrice": 13.68,
                    "time": "2017-12-27 10:47:57",
                    "timeStamp": 1514342877000,
                    "volume": 58673024
                    },
                    {
                    "closePrice": 13.71,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.71,
                    "minPrice": 13.69,
                    "nowVolume": 205400,
                    "openPrice": 13.69,
                    "time": "2017-12-27 10:48:57",
                    "timeStamp": 1514342937000,
                    "volume": 58823924
                    },
                    {
                    "closePrice": 13.7,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.72,
                    "minPrice": 13.7,
                    "nowVolume": 218837,
                    "openPrice": 13.71,
                    "time": "2017-12-27 10:49:57",
                    "timeStamp": 1514342997000,
                    "volume": 59082087
                    },
                    {
                    "closePrice": 13.68,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.7,
                    "minPrice": 13.68,
                    "nowVolume": 270100,
                    "openPrice": 13.69,
                    "time": "2017-12-27 10:50:57",
                    "timeStamp": 1514343057000,
                    "volume": 59301524
                    },
                    {
                    "closePrice": 13.69,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.69,
                    "minPrice": 13.68,
                    "nowVolume": 315800,
                    "openPrice": 13.69,
                    "time": "2017-12-27 10:51:57",
                    "timeStamp": 1514343117000,
                    "volume": 59582824
                    },
                    {
                    "closePrice": 13.68,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.69,
                    "minPrice": 13.67,
                    "nowVolume": 261500,
                    "openPrice": 13.69,
                    "time": "2017-12-27 10:52:57",
                    "timeStamp": 1514343177000,
                    "volume": 59898624
                    },
                    {
                    "closePrice": 13.67,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.68,
                    "minPrice": 13.67,
                    "nowVolume": 246500,
                    "openPrice": 13.67,
                    "time": "2017-12-27 10:53:57",
                    "timeStamp": 1514343237000,
                    "volume": 60160824
                    },
                    {
                    "closePrice": 13.68,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.69,
                    "minPrice": 13.67,
                    "nowVolume": 100500,
                    "openPrice": 13.68,
                    "time": "2017-12-27 10:54:57",
                    "timeStamp": 1514343297000,
                    "volume": 60416524
                    },
                    {
                    "closePrice": 13.68,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.69,
                    "minPrice": 13.67,
                    "nowVolume": 436200,
                    "openPrice": 13.69,
                    "time": "2017-12-27 10:55:57",
                    "timeStamp": 1514343357000,
                    "volume": 60540124
                    },
                    {
                    "closePrice": 13.67,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.69,
                    "minPrice": 13.67,
                    "nowVolume": 273800,
                    "openPrice": 13.67,
                    "time": "2017-12-27 10:56:57",
                    "timeStamp": 1514343417000,
                    "volume": 60994724
                    },
                    {
                    "closePrice": 13.68,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.69,
                    "minPrice": 13.67,
                    "nowVolume": 225595,
                    "openPrice": 13.67,
                    "time": "2017-12-27 10:57:57",
                    "timeStamp": 1514343477000,
                    "volume": 61277424
                    },
                    {
                    "closePrice": 13.67,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.68,
                    "minPrice": 13.67,
                    "nowVolume": 237005,
                    "openPrice": 13.68,
                    "time": "2017-12-27 10:58:57",
                    "timeStamp": 1514343537000,
                    "volume": 61504519
                    },
                    {
                    "closePrice": 13.66,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.67,
                    "minPrice": 13.65,
                    "nowVolume": 1616166,
                    "openPrice": 13.67,
                    "time": "2017-12-27 10:59:57",
                    "timeStamp": 1514343597000,
                    "volume": 61776024
                    },
                    {
                    "closePrice": 13.65,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.66,
                    "minPrice": 13.64,
                    "nowVolume": 190200,
                    "openPrice": 13.65,
                    "time": "2017-12-27 11:00:57",
                    "timeStamp": 1514343657000,
                    "volume": 63409190
                    },
                    {
                    "closePrice": 13.65,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.66,
                    "minPrice": 13.64,
                    "nowVolume": 133200,
                    "openPrice": 13.65,
                    "time": "2017-12-27 11:01:57",
                    "timeStamp": 1514343717000,
                    "volume": 63599390
                    },
                    {
                    "closePrice": 13.65,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.66,
                    "minPrice": 13.64,
                    "nowVolume": 239900,
                    "openPrice": 13.65,
                    "time": "2017-12-27 11:02:57",
                    "timeStamp": 1514343777000,
                    "volume": 63749690
                    },
                    {
                    "closePrice": 13.66,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.67,
                    "minPrice": 13.65,
                    "nowVolume": 368100,
                    "openPrice": 13.65,
                    "time": "2017-12-27 11:03:57",
                    "timeStamp": 1514343837000,
                    "volume": 63996190
                    },
                    {
                    "closePrice": 13.67,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.67,
                    "minPrice": 13.66,
                    "nowVolume": 146929,
                    "openPrice": 13.66,
                    "time": "2017-12-27 11:04:57",
                    "timeStamp": 1514343897000,
                    "volume": 64377190
                    },
                    {
                    "closePrice": 13.66,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.68,
                    "minPrice": 13.66,
                    "nowVolume": 228600,
                    "openPrice": 13.67,
                    "time": "2017-12-27 11:05:57",
                    "timeStamp": 1514343957000,
                    "volume": 64525119
                    },
                    {
                    "closePrice": 13.66,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.67,
                    "minPrice": 13.66,
                    "nowVolume": 76600,
                    "openPrice": 13.67,
                    "time": "2017-12-27 11:06:57",
                    "timeStamp": 1514344017000,
                    "volume": 64776919
                    },
                    {
                    "closePrice": 13.67,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.68,
                    "minPrice": 13.66,
                    "nowVolume": 101300,
                    "openPrice": 13.67,
                    "time": "2017-12-27 11:07:57",
                    "timeStamp": 1514344077000,
                    "volume": 64854219
                    },
                    {
                    "closePrice": 13.67,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.68,
                    "minPrice": 13.67,
                    "nowVolume": 98400,
                    "openPrice": 13.67,
                    "time": "2017-12-27 11:08:57",
                    "timeStamp": 1514344137000,
                    "volume": 64955619
                    },
                    {
                    "closePrice": 13.67,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.68,
                    "minPrice": 13.67,
                    "nowVolume": 164680,
                    "openPrice": 13.67,
                    "time": "2017-12-27 11:09:57",
                    "timeStamp": 1514344197000,
                    "volume": 65055039
                    },
                    {
                    "closePrice": 13.66,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.67,
                    "minPrice": 13.66,
                    "nowVolume": 216800,
                    "openPrice": 13.67,
                    "time": "2017-12-27 11:10:57",
                    "timeStamp": 1514344257000,
                    "volume": 65233819
                    },
                    {
                    "closePrice": 13.67,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.67,
                    "minPrice": 13.66,
                    "nowVolume": 308500,
                    "openPrice": 13.66,
                    "time": "2017-12-27 11:11:57",
                    "timeStamp": 1514344317000,
                    "volume": 65452719
                    },
                    {
                    "closePrice": 13.66,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.67,
                    "minPrice": 13.66,
                    "nowVolume": 138300,
                    "openPrice": 13.67,
                    "time": "2017-12-27 11:12:57",
                    "timeStamp": 1514344377000,
                    "volume": 65762219
                    },
                    {
                    "closePrice": 13.66,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.68,
                    "minPrice": 13.66,
                    "nowVolume": 259700,
                    "openPrice": 13.67,
                    "time": "2017-12-27 11:13:57",
                    "timeStamp": 1514344437000,
                    "volume": 65911819
                    },
                    {
                    "closePrice": 13.67,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.68,
                    "minPrice": 13.66,
                    "nowVolume": 243500,
                    "openPrice": 13.66,
                    "time": "2017-12-27 11:14:57",
                    "timeStamp": 1514344497000,
                    "volume": 66171519
                    },
                    {
                    "closePrice": 13.66,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.68,
                    "minPrice": 13.66,
                    "nowVolume": 135771,
                    "openPrice": 13.68,
                    "time": "2017-12-27 11:15:57",
                    "timeStamp": 1514344557000,
                    "volume": 66416619
                    },
                    {
                    "closePrice": 13.65,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.67,
                    "minPrice": 13.65,
                    "nowVolume": 170200,
                    "openPrice": 13.66,
                    "time": "2017-12-27 11:16:57",
                    "timeStamp": 1514344617000,
                    "volume": 66552390
                    },
                    {
                    "closePrice": 13.67,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.68,
                    "minPrice": 13.66,
                    "nowVolume": 134429,
                    "openPrice": 13.66,
                    "time": "2017-12-27 11:17:57",
                    "timeStamp": 1514344677000,
                    "volume": 66726790
                    },
                    {
                    "closePrice": 13.66,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.67,
                    "minPrice": 13.66,
                    "nowVolume": 199731,
                    "openPrice": 13.67,
                    "time": "2017-12-27 11:18:57",
                    "timeStamp": 1514344737000,
                    "volume": 66872919
                    },
                    {
                    "closePrice": 13.66,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.67,
                    "minPrice": 13.66,
                    "nowVolume": 264100,
                    "openPrice": 13.66,
                    "time": "2017-12-27 11:19:57",
                    "timeStamp": 1514344797000,
                    "volume": 67079450
                    },
                    {
                    "closePrice": 13.66,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.67,
                    "minPrice": 13.65,
                    "nowVolume": 562740,
                    "openPrice": 13.67,
                    "time": "2017-12-27 11:20:57",
                    "timeStamp": 1514344857000,
                    "volume": 67349150
                    },
                    {
                    "closePrice": 13.63,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.65,
                    "minPrice": 13.63,
                    "nowVolume": 440334,
                    "openPrice": 13.64,
                    "time": "2017-12-27 11:21:57",
                    "timeStamp": 1514344917000,
                    "volume": 67925390
                    },
                    {
                    "closePrice": 13.62,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.64,
                    "minPrice": 13.62,
                    "nowVolume": 525829,
                    "openPrice": 13.64,
                    "time": "2017-12-27 11:22:57",
                    "timeStamp": 1514344977000,
                    "volume": 68426724
                    },
                    {
                    "closePrice": 13.6,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.63,
                    "minPrice": 13.6,
                    "nowVolume": 711271,
                    "openPrice": 13.62,
                    "time": "2017-12-27 11:23:57",
                    "timeStamp": 1514345037000,
                    "volume": 68954353
                    },
                    {
                    "closePrice": 13.61,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.61,
                    "minPrice": 13.6,
                    "nowVolume": 441600,
                    "openPrice": 13.6,
                    "time": "2017-12-27 11:24:57",
                    "timeStamp": 1514345097000,
                    "volume": 69670524
                    },
                    {
                    "closePrice": 13.59,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.61,
                    "minPrice": 13.59,
                    "nowVolume": 194200,
                    "openPrice": 13.6,
                    "time": "2017-12-27 11:25:57",
                    "timeStamp": 1514345157000,
                    "volume": 70117124
                    },
                    {
                    "closePrice": 13.6,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.61,
                    "minPrice": 13.59,
                    "nowVolume": 231600,
                    "openPrice": 13.6,
                    "time": "2017-12-27 11:26:57",
                    "timeStamp": 1514345217000,
                    "volume": 70311424
                    },
                    {
                    "closePrice": 13.6,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.62,
                    "minPrice": 13.59,
                    "nowVolume": 442700,
                    "openPrice": 13.6,
                    "time": "2017-12-27 11:27:57",
                    "timeStamp": 1514345277000,
                    "volume": 70545024
                    },
                    {
                    "closePrice": 13.59,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.61,
                    "minPrice": 13.57,
                    "nowVolume": 653900,
                    "openPrice": 13.61,
                    "time": "2017-12-27 11:28:57",
                    "timeStamp": 1514345337000,
                    "volume": 70988524
                    },
                    {
                    "closePrice": 13.57,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.59,
                    "minPrice": 13.53,
                    "nowVolume": 1085700,
                    "openPrice": 13.59,
                    "time": "2017-12-27 11:29:57",
                    "timeStamp": 1514345397000,
                    "volume": 71683324
                    },
                    {
                    "closePrice": 13.57,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.57,
                    "nowVolume": 0,
                    "openPrice": 13.57,
                    "time": "2017-12-27 11:30:00",
                    "timeStamp": 1514345400000,
                    "volume": 72769024
                    },
                    {
                    "closePrice": 13.57,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.55,
                    "nowVolume": 612500,
                    "openPrice": 13.57,
                    "time": "2017-12-27 13:00:57",
                    "timeStamp": 1514350857000,
                    "volume": 72772024
                    },
                    {
                    "closePrice": 13.58,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.59,
                    "minPrice": 13.56,
                    "nowVolume": 134606,
                    "openPrice": 13.57,
                    "time": "2017-12-27 13:01:57",
                    "timeStamp": 1514350917000,
                    "volume": 73385724
                    },
                    {
                    "closePrice": 13.57,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.59,
                    "minPrice": 13.57,
                    "nowVolume": 142766,
                    "openPrice": 13.58,
                    "time": "2017-12-27 13:02:57",
                    "timeStamp": 1514350977000,
                    "volume": 73530330
                    },
                    {
                    "closePrice": 13.56,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.58,
                    "minPrice": 13.56,
                    "nowVolume": 224800,
                    "openPrice": 13.57,
                    "time": "2017-12-27 13:03:57",
                    "timeStamp": 1514351037000,
                    "volume": 73703096
                    },
                    {
                    "closePrice": 13.55,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.55,
                    "nowVolume": 179100,
                    "openPrice": 13.56,
                    "time": "2017-12-27 13:04:57",
                    "timeStamp": 1514351097000,
                    "volume": 73951896
                    },
                    {
                    "closePrice": 13.55,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.56,
                    "minPrice": 13.54,
                    "nowVolume": 214300,
                    "openPrice": 13.55,
                    "time": "2017-12-27 13:05:57",
                    "timeStamp": 1514351157000,
                    "volume": 74208924
                    },
                    {
                    "closePrice": 13.55,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.56,
                    "minPrice": 13.55,
                    "nowVolume": 197272,
                    "openPrice": 13.55,
                    "time": "2017-12-27 13:06:57",
                    "timeStamp": 1514351217000,
                    "volume": 74423224
                    },
                    {
                    "closePrice": 13.56,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.55,
                    "nowVolume": 209500,
                    "openPrice": 13.55,
                    "time": "2017-12-27 13:07:57",
                    "timeStamp": 1514351277000,
                    "volume": 74623996
                    },
                    {
                    "closePrice": 13.56,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.56,
                    "nowVolume": 271400,
                    "openPrice": 13.56,
                    "time": "2017-12-27 13:08:57",
                    "timeStamp": 1514351337000,
                    "volume": 74835796
                    },
                    {
                    "closePrice": 13.55,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.56,
                    "minPrice": 13.54,
                    "nowVolume": 182128,
                    "openPrice": 13.55,
                    "time": "2017-12-27 13:09:57",
                    "timeStamp": 1514351397000,
                    "volume": 75107396
                    },
                    {
                    "closePrice": 13.55,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.55,
                    "minPrice": 13.54,
                    "nowVolume": 348072,
                    "openPrice": 13.55,
                    "time": "2017-12-27 13:10:57",
                    "timeStamp": 1514351457000,
                    "volume": 75302624
                    },
                    {
                    "closePrice": 13.54,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.55,
                    "minPrice": 13.53,
                    "nowVolume": 240028,
                    "openPrice": 13.54,
                    "time": "2017-12-27 13:11:57",
                    "timeStamp": 1514351517000,
                    "volume": 75652696
                    },
                    {
                    "closePrice": 13.55,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.55,
                    "minPrice": 13.54,
                    "nowVolume": 184972,
                    "openPrice": 13.54,
                    "time": "2017-12-27 13:12:57",
                    "timeStamp": 1514351577000,
                    "volume": 75906524
                    },
                    {
                    "closePrice": 13.57,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.55,
                    "nowVolume": 194300,
                    "openPrice": 13.56,
                    "time": "2017-12-27 13:13:57",
                    "timeStamp": 1514351637000,
                    "volume": 76093496
                    },
                    {
                    "closePrice": 13.56,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.56,
                    "nowVolume": 131000,
                    "openPrice": 13.57,
                    "time": "2017-12-27 13:14:57",
                    "timeStamp": 1514351697000,
                    "volume": 76310996
                    },
                    {
                    "closePrice": 13.56,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.56,
                    "nowVolume": 345800,
                    "openPrice": 13.57,
                    "time": "2017-12-27 13:15:57",
                    "timeStamp": 1514351757000,
                    "volume": 76444396
                    },
                    {
                    "closePrice": 13.56,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.56,
                    "nowVolume": 85400,
                    "openPrice": 13.56,
                    "time": "2017-12-27 13:16:57",
                    "timeStamp": 1514351817000,
                    "volume": 76792696
                    },
                    {
                    "closePrice": 13.57,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.55,
                    "nowVolume": 180400,
                    "openPrice": 13.55,
                    "time": "2017-12-27 13:17:57",
                    "timeStamp": 1514351877000,
                    "volume": 76878372
                    },
                    {
                    "closePrice": 13.57,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.56,
                    "nowVolume": 58300,
                    "openPrice": 13.56,
                    "time": "2017-12-27 13:18:57",
                    "timeStamp": 1514351937000,
                    "volume": 77061772
                    },
                    {
                    "closePrice": 13.57,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.56,
                    "nowVolume": 70624,
                    "openPrice": 13.57,
                    "time": "2017-12-27 13:19:57",
                    "timeStamp": 1514351997000,
                    "volume": 77120072
                    },
                    {
                    "closePrice": 13.56,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.56,
                    "nowVolume": 72000,
                    "openPrice": 13.56,
                    "time": "2017-12-27 13:20:57",
                    "timeStamp": 1514352057000,
                    "volume": 77191696
                    },
                    {
                    "closePrice": 13.57,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.56,
                    "nowVolume": 99700,
                    "openPrice": 13.57,
                    "time": "2017-12-27 13:21:57",
                    "timeStamp": 1514352117000,
                    "volume": 77265696
                    },
                    {
                    "closePrice": 13.55,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.55,
                    "nowVolume": 327600,
                    "openPrice": 13.56,
                    "time": "2017-12-27 13:22:57",
                    "timeStamp": 1514352177000,
                    "volume": 77368196
                    },
                    {
                    "closePrice": 13.55,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.55,
                    "nowVolume": 615000,
                    "openPrice": 13.55,
                    "time": "2017-12-27 13:23:57",
                    "timeStamp": 1514352237000,
                    "volume": 77747396
                    },
                    {
                    "closePrice": 13.55,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.56,
                    "minPrice": 13.55,
                    "nowVolume": 48300,
                    "openPrice": 13.55,
                    "time": "2017-12-27 13:24:57",
                    "timeStamp": 1514352297000,
                    "volume": 78365096
                    },
                    {
                    "closePrice": 13.57,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.56,
                    "nowVolume": 101420,
                    "openPrice": 13.57,
                    "time": "2017-12-27 13:25:57",
                    "timeStamp": 1514352357000,
                    "volume": 78440696
                    },
                    {
                    "closePrice": 13.57,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.56,
                    "nowVolume": 60100,
                    "openPrice": 13.57,
                    "time": "2017-12-27 13:26:57",
                    "timeStamp": 1514352417000,
                    "volume": 78542116
                    },
                    {
                    "closePrice": 13.57,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.58,
                    "minPrice": 13.56,
                    "nowVolume": 132600,
                    "openPrice": 13.56,
                    "time": "2017-12-27 13:27:57",
                    "timeStamp": 1514352477000,
                    "volume": 78603916
                    },
                    {
                    "closePrice": 13.56,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.58,
                    "minPrice": 13.55,
                    "nowVolume": 678200,
                    "openPrice": 13.58,
                    "time": "2017-12-27 13:28:57",
                    "timeStamp": 1514352537000,
                    "volume": 78740816
                    },
                    {
                    "closePrice": 13.55,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.56,
                    "minPrice": 13.55,
                    "nowVolume": 393156,
                    "openPrice": 13.55,
                    "time": "2017-12-27 13:29:57",
                    "timeStamp": 1514352597000,
                    "volume": 79421316
                    },
                    {
                    "closePrice": 13.56,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.55,
                    "nowVolume": 96980,
                    "openPrice": 13.56,
                    "time": "2017-12-27 13:30:57",
                    "timeStamp": 1514352657000,
                    "volume": 79826672
                    },
                    {
                    "closePrice": 13.55,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.57,
                    "minPrice": 13.55,
                    "nowVolume": 120600,
                    "openPrice": 13.56,
                    "time": "2017-12-27 13:31:57",
                    "timeStamp": 1514352717000,
                    "volume": 79923652
                    },
                    {
                    "closePrice": 13.55,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.56,
                    "minPrice": 13.54,
                    "nowVolume": 293700,
                    "openPrice": 13.56,
                    "time": "2017-12-27 13:32:57",
                    "timeStamp": 1514352777000,
                    "volume": 80064852
                    },
                    {
                    "closePrice": 13.54,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.56,
                    "minPrice": 13.54,
                    "nowVolume": 292972,
                    "openPrice": 13.54,
                    "time": "2017-12-27 13:33:57",
                    "timeStamp": 1514352837000,
                    "volume": 80376552
                    },
                    {
                    "closePrice": 13.51,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.56,
                    "minPrice": 13.51,
                    "nowVolume": 613805,
                    "openPrice": 13.53,
                    "time": "2017-12-27 13:34:57",
                    "timeStamp": 1514352897000,
                    "volume": 81099524
                    },
                    {
                    "closePrice": 13.5,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.51,
                    "minPrice": 13.49,
                    "nowVolume": 1725787,
                    "openPrice": 13.51,
                    "time": "2017-12-27 13:35:57",
                    "timeStamp": 1514352957000,
                    "volume": 81763813
                    },
                    {
                    "closePrice": 13.48,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.5,
                    "minPrice": 13.48,
                    "nowVolume": 436100,
                    "openPrice": 13.49,
                    "time": "2017-12-27 13:36:57",
                    "timeStamp": 1514353017000,
                    "volume": 83514800
                    },
                    {
                    "closePrice": 13.49,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.5,
                    "minPrice": 13.47,
                    "nowVolume": 429629,
                    "openPrice": 13.49,
                    "time": "2017-12-27 13:37:57",
                    "timeStamp": 1514353077000,
                    "volume": 83989300
                    },
                    {
                    "closePrice": 13.51,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.51,
                    "minPrice": 13.49,
                    "nowVolume": 342971,
                    "openPrice": 13.49,
                    "time": "2017-12-27 13:38:57",
                    "timeStamp": 1514353137000,
                    "volume": 84420229
                    },
                    {
                    "closePrice": 13.5,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.5,
                    "minPrice": 13.49,
                    "nowVolume": 262500,
                    "openPrice": 13.5,
                    "time": "2017-12-27 13:39:57",
                    "timeStamp": 1514353197000,
                    "volume": 84765700
                    },
                    {
                    "closePrice": 13.5,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.53,
                    "minPrice": 13.49,
                    "nowVolume": 293266,
                    "openPrice": 13.5,
                    "time": "2017-12-27 13:40:57",
                    "timeStamp": 1514353257000,
                    "volume": 85057800
                    },
                    {
                    "closePrice": 13.49,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.51,
                    "minPrice": 13.49,
                    "nowVolume": 363334,
                    "openPrice": 13.5,
                    "time": "2017-12-27 13:41:57",
                    "timeStamp": 1514353317000,
                    "volume": 85352866
                    },
                    {
                    "closePrice": 13.49,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.5,
                    "minPrice": 13.48,
                    "nowVolume": 368985,
                    "openPrice": 13.5,
                    "time": "2017-12-27 13:42:57",
                    "timeStamp": 1514353377000,
                    "volume": 85721700
                    },
                    {
                    "closePrice": 13.49,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.5,
                    "minPrice": 13.48,
                    "nowVolume": 314815,
                    "openPrice": 13.49,
                    "time": "2017-12-27 13:43:57",
                    "timeStamp": 1514353437000,
                    "volume": 86135385
                    },
                    {
                    "closePrice": 13.5,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.5,
                    "minPrice": 13.48,
                    "nowVolume": 290253,
                    "openPrice": 13.48,
                    "time": "2017-12-27 13:44:57",
                    "timeStamp": 1514353497000,
                    "volume": 86485000
                    },
                    {
                    "closePrice": 13.48,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.5,
                    "minPrice": 13.47,
                    "nowVolume": 923547,
                    "openPrice": 13.5,
                    "time": "2017-12-27 13:45:57",
                    "timeStamp": 1514353557000,
                    "volume": 86779553
                    },
                    {
                    "closePrice": 13.46,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.48,
                    "minPrice": 13.46,
                    "nowVolume": 317600,
                    "openPrice": 13.47,
                    "time": "2017-12-27 13:46:57",
                    "timeStamp": 1514353617000,
                    "volume": 87708100
                    },
                    {
                    "closePrice": 13.46,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.47,
                    "minPrice": 13.46,
                    "nowVolume": 560422,
                    "openPrice": 13.47,
                    "time": "2017-12-27 13:47:57",
                    "timeStamp": 1514353677000,
                    "volume": 88056400
                    },
                    {
                    "closePrice": 13.44,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.46,
                    "minPrice": 13.44,
                    "nowVolume": 407278,
                    "openPrice": 13.46,
                    "time": "2017-12-27 13:48:57",
                    "timeStamp": 1514353737000,
                    "volume": 88622322
                    },
                    {
                    "closePrice": 13.41,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.45,
                    "minPrice": 13.41,
                    "nowVolume": 826000,
                    "openPrice": 13.44,
                    "time": "2017-12-27 13:49:57",
                    "timeStamp": 1514353797000,
                    "volume": 89036300
                    },
                    {
                    "closePrice": 13.43,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.43,
                    "minPrice": 13.41,
                    "nowVolume": 240165,
                    "openPrice": 13.42,
                    "time": "2017-12-27 13:50:57",
                    "timeStamp": 1514353857000,
                    "volume": 89877400
                    },
                    {
                    "closePrice": 13.44,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.44,
                    "minPrice": 13.42,
                    "nowVolume": 232396,
                    "openPrice": 13.43,
                    "time": "2017-12-27 13:51:57",
                    "timeStamp": 1514353917000,
                    "volume": 90126465
                    },
                    {
                    "closePrice": 13.44,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.45,
                    "minPrice": 13.43,
                    "nowVolume": 237800,
                    "openPrice": 13.44,
                    "time": "2017-12-27 13:52:57",
                    "timeStamp": 1514353977000,
                    "volume": 90363761
                    },
                    {
                    "closePrice": 13.4,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.44,
                    "minPrice": 13.4,
                    "nowVolume": 807514,
                    "openPrice": 13.43,
                    "time": "2017-12-27 13:53:57",
                    "timeStamp": 1514354037000,
                    "volume": 90605361
                    },
                    {
                    "closePrice": 13.38,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.41,
                    "minPrice": 13.38,
                    "nowVolume": 1019700,
                    "openPrice": 13.41,
                    "time": "2017-12-27 13:54:57",
                    "timeStamp": 1514354097000,
                    "volume": 91416275
                    },
                    {
                    "closePrice": 13.41,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.42,
                    "minPrice": 13.38,
                    "nowVolume": 514400,
                    "openPrice": 13.38,
                    "time": "2017-12-27 13:55:57",
                    "timeStamp": 1514354157000,
                    "volume": 92546264
                    },
                    {
                    "closePrice": 13.41,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.42,
                    "minPrice": 13.4,
                    "nowVolume": 232885,
                    "openPrice": 13.42,
                    "time": "2017-12-27 13:56:57",
                    "timeStamp": 1514354217000,
                    "volume": 93114650
                    },
                    {
                    "closePrice": 13.42,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.42,
                    "minPrice": 13.4,
                    "nowVolume": 248900,
                    "openPrice": 13.4,
                    "time": "2017-12-27 13:57:57",
                    "timeStamp": 1514354277000,
                    "volume": 93362635
                    },
                    {
                    "closePrice": 13.45,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.45,
                    "minPrice": 13.41,
                    "nowVolume": 147802,
                    "openPrice": 13.42,
                    "time": "2017-12-27 13:58:57",
                    "timeStamp": 1514354337000,
                    "volume": 93611535
                    },
                    {
                    "closePrice": 13.44,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.45,
                    "minPrice": 13.43,
                    "nowVolume": 263800,
                    "openPrice": 13.45,
                    "time": "2017-12-27 13:59:57",
                    "timeStamp": 1514354397000,
                    "volume": 93759837
                    },
                    {
                    "closePrice": 13.43,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.44,
                    "minPrice": 13.42,
                    "nowVolume": 323800,
                    "openPrice": 13.44,
                    "time": "2017-12-27 14:00:57",
                    "timeStamp": 1514354457000,
                    "volume": 94024337
                    },
                    {
                    "closePrice": 13.43,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.45,
                    "minPrice": 13.43,
                    "nowVolume": 194000,
                    "openPrice": 13.44,
                    "time": "2017-12-27 14:01:57",
                    "timeStamp": 1514354517000,
                    "volume": 94359437
                    },
                    {
                    "closePrice": 13.42,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.45,
                    "minPrice": 13.41,
                    "nowVolume": 258800,
                    "openPrice": 13.43,
                    "time": "2017-12-27 14:02:57",
                    "timeStamp": 1514354577000,
                    "volume": 94561237
                    },
                    {
                    "closePrice": 13.42,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.43,
                    "minPrice": 13.41,
                    "nowVolume": 234200,
                    "openPrice": 13.42,
                    "time": "2017-12-27 14:03:57",
                    "timeStamp": 1514354637000,
                    "volume": 94852137
                    },
                    {
                    "closePrice": 13.41,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.43,
                    "minPrice": 13.4,
                    "nowVolume": 357733,
                    "openPrice": 13.41,
                    "time": "2017-12-27 14:04:57",
                    "timeStamp": 1514354697000,
                    "volume": 95088737
                    },
                    {
                    "closePrice": 13.43,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.43,
                    "minPrice": 13.41,
                    "nowVolume": 243400,
                    "openPrice": 13.42,
                    "time": "2017-12-27 14:05:57",
                    "timeStamp": 1514354757000,
                    "volume": 95448970
                    },
                    {
                    "closePrice": 13.43,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.43,
                    "minPrice": 13.41,
                    "nowVolume": 150420,
                    "openPrice": 13.43,
                    "time": "2017-12-27 14:06:57",
                    "timeStamp": 1514354817000,
                    "volume": 95695370
                    },
                    {
                    "closePrice": 13.44,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.44,
                    "minPrice": 13.42,
                    "nowVolume": 208100,
                    "openPrice": 13.43,
                    "time": "2017-12-27 14:07:57",
                    "timeStamp": 1514354877000,
                    "volume": 95897790
                    },
                    {
                    "closePrice": 13.44,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.45,
                    "minPrice": 13.42,
                    "nowVolume": 166104,
                    "openPrice": 13.45,
                    "time": "2017-12-27 14:08:57",
                    "timeStamp": 1514354937000,
                    "volume": 96148990
                    },
                    {
                    "closePrice": 13.43,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.44,
                    "minPrice": 13.43,
                    "nowVolume": 177294,
                    "openPrice": 13.43,
                    "time": "2017-12-27 14:09:57",
                    "timeStamp": 1514354997000,
                    "volume": 96319594
                    },
                    {
                    "closePrice": 13.45,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.45,
                    "minPrice": 13.43,
                    "nowVolume": 264003,
                    "openPrice": 13.43,
                    "time": "2017-12-27 14:10:57",
                    "timeStamp": 1514355057000,
                    "volume": 96509088
                    },
                    {
                    "closePrice": 13.44,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.46,
                    "minPrice": 13.43,
                    "nowVolume": 166862,
                    "openPrice": 13.45,
                    "time": "2017-12-27 14:11:57",
                    "timeStamp": 1514355117000,
                    "volume": 96774350
                    },
                    {
                    "closePrice": 13.45,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.46,
                    "minPrice": 13.43,
                    "nowVolume": 179743,
                    "openPrice": 13.44,
                    "time": "2017-12-27 14:12:57",
                    "timeStamp": 1514355177000,
                    "volume": 96958512
                    },
                    {
                    "closePrice": 13.44,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.46,
                    "minPrice": 13.44,
                    "nowVolume": 564431,
                    "openPrice": 13.44,
                    "time": "2017-12-27 14:13:57",
                    "timeStamp": 1514355237000,
                    "volume": 97141855
                    },
                    {
                    "closePrice": 13.44,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.46,
                    "minPrice": 13.44,
                    "nowVolume": 713500,
                    "openPrice": 13.45,
                    "time": "2017-12-27 14:14:57",
                    "timeStamp": 1514355297000,
                    "volume": 97715986
                    },
                    {
                    "closePrice": 13.4,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.45,
                    "minPrice": 13.4,
                    "nowVolume": 711626,
                    "openPrice": 13.44,
                    "time": "2017-12-27 14:15:57",
                    "timeStamp": 1514355357000,
                    "volume": 98439686
                    },
                    {
                    "closePrice": 13.39,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.42,
                    "minPrice": 13.39,
                    "nowVolume": 589900,
                    "openPrice": 13.41,
                    "time": "2017-12-27 14:16:57",
                    "timeStamp": 1514355417000,
                    "volume": 99151912
                    },
                    {
                    "closePrice": 13.39,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.4,
                    "minPrice": 13.39,
                    "nowVolume": 292608,
                    "openPrice": 13.39,
                    "time": "2017-12-27 14:17:57",
                    "timeStamp": 1514355477000,
                    "volume": 99757612
                    },
                    {
                    "closePrice": 13.39,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.41,
                    "minPrice": 13.39,
                    "nowVolume": 662252,
                    "openPrice": 13.39,
                    "time": "2017-12-27 14:18:57",
                    "timeStamp": 1514355537000,
                    "volume": 100124220
                    },
                    {
                    "closePrice": 13.38,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.42,
                    "minPrice": 13.38,
                    "nowVolume": 708700,
                    "openPrice": 13.39,
                    "time": "2017-12-27 14:19:57",
                    "timeStamp": 1514355597000,
                    "volume": 100786472
                    },
                    {
                    "closePrice": 13.38,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.41,
                    "minPrice": 13.38,
                    "nowVolume": 320000,
                    "openPrice": 13.41,
                    "time": "2017-12-27 14:20:57",
                    "timeStamp": 1514355657000,
                    "volume": 101501272
                    },
                    {
                    "closePrice": 13.38,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.39,
                    "minPrice": 13.38,
                    "nowVolume": 732640,
                    "openPrice": 13.38,
                    "time": "2017-12-27 14:21:57",
                    "timeStamp": 1514355717000,
                    "volume": 101821372
                    },
                    {
                    "closePrice": 13.38,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.39,
                    "minPrice": 13.37,
                    "nowVolume": 707880,
                    "openPrice": 13.38,
                    "time": "2017-12-27 14:22:57",
                    "timeStamp": 1514355777000,
                    "volume": 102562212
                    },
                    {
                    "closePrice": 13.31,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.38,
                    "minPrice": 13.31,
                    "nowVolume": 1901120,
                    "openPrice": 13.38,
                    "time": "2017-12-27 14:23:57",
                    "timeStamp": 1514355837000,
                    "volume": 103296392
                    },
                    {
                    "closePrice": 13.35,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.35,
                    "minPrice": 13.3,
                    "nowVolume": 1221100,
                    "openPrice": 13.3,
                    "time": "2017-12-27 14:24:57",
                    "timeStamp": 1514355897000,
                    "volume": 105251412
                    },
                    {
                    "closePrice": 13.31,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.35,
                    "minPrice": 13.3,
                    "nowVolume": 729637,
                    "openPrice": 13.35,
                    "time": "2017-12-27 14:25:57",
                    "timeStamp": 1514355957000,
                    "volume": 106473612
                    },
                    {
                    "closePrice": 13.32,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.33,
                    "minPrice": 13.3,
                    "nowVolume": 756361,
                    "openPrice": 13.3,
                    "time": "2017-12-27 14:26:57",
                    "timeStamp": 1514356017000,
                    "volume": 107237268
                    },
                    {
                    "closePrice": 13.31,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.33,
                    "minPrice": 13.31,
                    "nowVolume": 1232177,
                    "openPrice": 13.33,
                    "time": "2017-12-27 14:27:57",
                    "timeStamp": 1514356077000,
                    "volume": 108040629
                    },
                    {
                    "closePrice": 13.34,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.35,
                    "minPrice": 13.32,
                    "nowVolume": 470400,
                    "openPrice": 13.32,
                    "time": "2017-12-27 14:28:57",
                    "timeStamp": 1514356137000,
                    "volume": 109278506
                    },
                    {
                    "closePrice": 13.34,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.34,
                    "minPrice": 13.31,
                    "nowVolume": 1606076,
                    "openPrice": 13.34,
                    "time": "2017-12-27 14:29:57",
                    "timeStamp": 1514356197000,
                    "volume": 109773106
                    },
                    {
                    "closePrice": 13.36,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.36,
                    "minPrice": 13.34,
                    "nowVolume": 390345,
                    "openPrice": 13.34,
                    "time": "2017-12-27 14:30:57",
                    "timeStamp": 1514356257000,
                    "volume": 111399282
                    },
                    {
                    "closePrice": 13.35,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.36,
                    "minPrice": 13.34,
                    "nowVolume": 262200,
                    "openPrice": 13.36,
                    "time": "2017-12-27 14:31:57",
                    "timeStamp": 1514356317000,
                    "volume": 111801427
                    },
                    {
                    "closePrice": 13.34,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.35,
                    "minPrice": 13.33,
                    "nowVolume": 318754,
                    "openPrice": 13.35,
                    "time": "2017-12-27 14:32:57",
                    "timeStamp": 1514356377000,
                    "volume": 112068627
                    },
                    {
                    "closePrice": 13.36,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.36,
                    "minPrice": 13.34,
                    "nowVolume": 509183,
                    "openPrice": 13.34,
                    "time": "2017-12-27 14:33:57",
                    "timeStamp": 1514356437000,
                    "volume": 112400281
                    },
                    {
                    "closePrice": 13.35,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.36,
                    "minPrice": 13.34,
                    "nowVolume": 688522,
                    "openPrice": 13.34,
                    "time": "2017-12-27 14:34:57",
                    "timeStamp": 1514356497000,
                    "volume": 112920064
                    },
                    {
                    "closePrice": 13.35,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.35,
                    "minPrice": 13.34,
                    "nowVolume": 446900,
                    "openPrice": 13.35,
                    "time": "2017-12-27 14:35:57",
                    "timeStamp": 1514356557000,
                    "volume": 113617186
                    },
                    {
                    "closePrice": 13.33,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.35,
                    "minPrice": 13.33,
                    "nowVolume": 486100,
                    "openPrice": 13.35,
                    "time": "2017-12-27 14:36:57",
                    "timeStamp": 1514356617000,
                    "volume": 114093686
                    },
                    {
                    "closePrice": 13.31,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.34,
                    "minPrice": 13.3,
                    "nowVolume": 1288515,
                    "openPrice": 13.34,
                    "time": "2017-12-27 14:37:57",
                    "timeStamp": 1514356677000,
                    "volume": 114634486
                    },
                    {
                    "closePrice": 13.28,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.31,
                    "minPrice": 13.27,
                    "nowVolume": 1160460,
                    "openPrice": 13.3,
                    "time": "2017-12-27 14:38:57",
                    "timeStamp": 1514356737000,
                    "volume": 116371924
                    },
                    {
                    "closePrice": 13.28,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.29,
                    "minPrice": 13.27,
                    "nowVolume": 639000,
                    "openPrice": 13.27,
                    "time": "2017-12-27 14:39:57",
                    "timeStamp": 1514356797000,
                    "volume": 117546184
                    },
                    {
                    "closePrice": 13.32,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.32,
                    "minPrice": 13.28,
                    "nowVolume": 435700,
                    "openPrice": 13.29,
                    "time": "2017-12-27 14:40:57",
                    "timeStamp": 1514356857000,
                    "volume": 118197684
                    },
                    {
                    "closePrice": 13.31,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.33,
                    "minPrice": 13.29,
                    "nowVolume": 468417,
                    "openPrice": 13.29,
                    "time": "2017-12-27 14:41:57",
                    "timeStamp": 1514356917000,
                    "volume": 118673884
                    },
                    {
                    "closePrice": 13.29,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.31,
                    "minPrice": 13.29,
                    "nowVolume": 433083,
                    "openPrice": 13.31,
                    "time": "2017-12-27 14:42:57",
                    "timeStamp": 1514356977000,
                    "volume": 119146801
                    },
                    {
                    "closePrice": 13.27,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.3,
                    "minPrice": 13.26,
                    "nowVolume": 2046125,
                    "openPrice": 13.3,
                    "time": "2017-12-27 14:43:57",
                    "timeStamp": 1514357037000,
                    "volume": 119637984
                    },
                    {
                    "closePrice": 13.28,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.28,
                    "minPrice": 13.26,
                    "nowVolume": 1132251,
                    "openPrice": 13.27,
                    "time": "2017-12-27 14:44:57",
                    "timeStamp": 1514357097000,
                    "volume": 121828009
                    },
                    {
                    "closePrice": 13.3,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.3,
                    "minPrice": 13.29,
                    "nowVolume": 359700,
                    "openPrice": 13.29,
                    "time": "2017-12-27 14:45:57",
                    "timeStamp": 1514357157000,
                    "volume": 122971360
                    },
                    {
                    "closePrice": 13.28,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.3,
                    "minPrice": 13.27,
                    "nowVolume": 874449,
                    "openPrice": 13.3,
                    "time": "2017-12-27 14:46:57",
                    "timeStamp": 1514357217000,
                    "volume": 123381060
                    },
                    {
                    "closePrice": 13.28,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.29,
                    "minPrice": 13.27,
                    "nowVolume": 433400,
                    "openPrice": 13.27,
                    "time": "2017-12-27 14:47:57",
                    "timeStamp": 1514357277000,
                    "volume": 124260309
                    },
                    {
                    "closePrice": 13.27,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.29,
                    "minPrice": 13.26,
                    "nowVolume": 1047820,
                    "openPrice": 13.29,
                    "time": "2017-12-27 14:48:57",
                    "timeStamp": 1514357337000,
                    "volume": 124713189
                    },
                    {
                    "closePrice": 13.27,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.27,
                    "minPrice": 13.26,
                    "nowVolume": 449960,
                    "openPrice": 13.27,
                    "time": "2017-12-27 14:49:57",
                    "timeStamp": 1514357397000,
                    "volume": 125771009
                    },
                    {
                    "closePrice": 13.26,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.27,
                    "minPrice": 13.26,
                    "nowVolume": 1060325,
                    "openPrice": 13.27,
                    "time": "2017-12-27 14:50:57",
                    "timeStamp": 1514357457000,
                    "volume": 126296269
                    },
                    {
                    "closePrice": 13.23,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.26,
                    "minPrice": 13.23,
                    "nowVolume": 2362715,
                    "openPrice": 13.26,
                    "time": "2017-12-27 14:51:57",
                    "timeStamp": 1514357517000,
                    "volume": 127369094
                    },
                    {
                    "closePrice": 13.21,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.23,
                    "minPrice": 13.19,
                    "nowVolume": 1840546,
                    "openPrice": 13.22,
                    "time": "2017-12-27 14:52:57",
                    "timeStamp": 1514357577000,
                    "volume": 129775109
                    },
                    {
                    "closePrice": 13.22,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.25,
                    "minPrice": 13.2,
                    "nowVolume": 934340,
                    "openPrice": 13.21,
                    "time": "2017-12-27 14:53:57",
                    "timeStamp": 1514357637000,
                    "volume": 131724155
                    },
                    {
                    "closePrice": 13.26,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.28,
                    "minPrice": 13.22,
                    "nowVolume": 700541,
                    "openPrice": 13.22,
                    "time": "2017-12-27 14:54:57",
                    "timeStamp": 1514357697000,
                    "volume": 132731195
                    },
                    {
                    "closePrice": 13.28,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.28,
                    "minPrice": 13.26,
                    "nowVolume": 1209500,
                    "openPrice": 13.28,
                    "time": "2017-12-27 14:55:57",
                    "timeStamp": 1514357757000,
                    "volume": 133433036
                    },
                    {
                    "closePrice": 13.29,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.29,
                    "minPrice": 13.26,
                    "nowVolume": 554852,
                    "openPrice": 13.26,
                    "time": "2017-12-27 14:56:57",
                    "timeStamp": 1514357817000,
                    "volume": 134699736
                    },
                    {
                    "closePrice": 13.28,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.28,
                    "minPrice": 13.28,
                    "nowVolume": 0,
                    "openPrice": 13.28,
                    "time": "2017-12-27 14:57:54",
                    "timeStamp": 1514357874000,
                    "volume": 135254888
                    },
                    {
                    "closePrice": 13.28,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.28,
                    "minPrice": 13.28,
                    "nowVolume": 0,
                    "openPrice": 13.28,
                    "time": "2017-12-27 14:58:57",
                    "timeStamp": 1514357937000,
                    "volume": 135254888
                    },
                    {
                    "closePrice": 13.28,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.28,
                    "minPrice": 13.28,
                    "nowVolume": 0,
                    "openPrice": 13.28,
                    "time": "2017-12-27 14:59:51",
                    "timeStamp": 1514357991000,
                    "volume": 135254888
                    },
                    {
                    "closePrice": 13.29,
                    "day": "2017-12-27",
                    "instrumentID": "000001",
                    "maxPrice": 13.29,
                    "minPrice": 13.29,
                    "nowVolume": 0,
                    "openPrice": 13.29,
                    "time": "2017-12-27 15:00:03",
                    "timeStamp": 1514358003000,
                    "volume": 136656673
                    }
                ]
                var data = this.splitData(rawData) 
                this.charts.setOption({
                    backgroundColor: '#fff',
                    animation: false,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        backgroundColor: 'rgba(245, 245, 245, 0.8)',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 10,
                        textStyle: {
                            color: '#000'
                        }
                    },
                    axisPointer: {
                        link: {xAxisIndex: 'all'},
                        label: {
                            backgroundColor: '#777'
                        }
                    },
                    visualMap: {
                        show: false,
                        seriesIndex: 3,
                        dimension: 2,
                        pieces: [{
                            value: 1,
                            color: downColor
                        }, {
                            value: -1,
                            color: upColor
                        }]
                    },
                    grid: [//调整两个图的位置
                        {
                            left: '10%',
                            right: '8%',
                            height: '50%'
                        },
                        {
                            left: '10%',
                            right: '8%',
                            top: '68%',
                            height: '15%'
                        }
                    ],
                    xAxis: [
                        {
                            type: 'category',
                            data: data.categoryData,
                            scale: true,
                            boundaryGap : false,
                            axisLine: {onZero: false},
                            splitLine: {show: false},
                            splitNumber: 20,
                            min: 'dataMin',
                            max: 'dataMax',
                            axisPointer: {
                                z: 100
                            }
                        },
                        {
                            type: 'category',
                            gridIndex: 1,
                            data: data.categoryData,
                            scale: true,
                            boundaryGap : false,
                            axisLine: {onZero: false},
                            axisTick: {show: false},
                            splitLine: {show: false},
                            axisLabel: {show: false},
                            splitNumber: 20,
                            min: 'dataMin',
                            max: 'dataMax'
                        }
                    ],
                    yAxis: [
                        {
                            scale: true,
                            splitArea: {
                                show: true
                            },
                            show: false
                        },
                        {
                            scale: true,
                            gridIndex: 1,
                            splitNumber: 2,
                            axisLabel: {show: false},
                            axisLine: {show: false},
                            axisTick: {show: false},
                            splitLine: {show: false},
                            show: false
                        }
                    ],
                    dataZoom: [
                        {
                            type: 'inside',
                            xAxisIndex: [0, 1],
                            start: 50,
                            end: 100
                        }
                    ],
                    series: [
                        {
                            name: '当日行情',
                            type: 'candlestick',
                            data: data.values,
                            itemStyle: {
                                normal: {
                                    color: downColor,
                                    color0: upColor,
                                    borderColor: null,
                                    borderColor0: null
                                }
                            }
                        },
                        {
                            name: 'MA5',
                            type: 'line',
                            data: this.calculateMA(5, data),//测试数据
                            smooth: true,
                            lineStyle: {
                                normal: {opacity: 0.5}
                            },
                            areaStyle: {
                                normal: {
                                    color: "lightblue",
                                    opacity: 0.2
                                }
                            }
                        },
                        {
                            name: 'MA10',
                            type: 'line',
                            data: this.calculateMA(10, data),//测试数据
                            smooth: true,
                            lineStyle: {
                                normal: {opacity: 0.5}
                            }
                        },
                        {
                            name: 'Volume',
                            type: 'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data: data.volumes
                        }
                    ]
                }, true);
            },
            calculateMA(dayCount, data) {
                var result = [];
                for (var i = 0, len = data.values.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-');
                        continue;
                    }
                    var sum = 0;
                    for (var j = 0; j < dayCount; j++) {
                        sum += data.values[i - j][1];
                    }
                    result.push(+(sum / dayCount).toFixed(3));
                }
                return result;
            },
            splitData(rawData) {
                var categoryData = [];
                var values = [];
                var volumes = [];
                for (var i = 0; i < rawData.length; i++) {
                    categoryData.push(rawData[i].time.split(" ")[1]);
                    values.push([rawData[i].openPrice, rawData[i].closePrice,rawData[i].minPrice,rawData[i].maxPrice]);
                    volumes.push([i, rawData[i].nowVolume, rawData[i].closePrice > rawData[i].openPrice ? 1 : -1]);
                }
                console.log(values);
                return {
                    categoryData: categoryData,
                    values: values,
                    volumes: volumes
                };
            }
        },
        mounted(){
            this.$nextTick(function(){
                this.drawK();
            })
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