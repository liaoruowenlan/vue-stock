<template>
    <div>
        <top-header></top-header>
        <div class="quotation">
            <div class="width100 bg">
                <div class="stock-seo">
                    <div class="stock">
                        <div class="stock-text">
                            <span class="text">{{market.name}}</span>
                            <span class="number">{{market.instrumentId}}</span>
                        </div>
                        <div class="stock-number">{{market.lastPrice}}</div>
                        <div class="stock-rose">
                            <span>{{market.upDropPrice}}</span>
                            <span>{{market.upDropSpeed}}</span>
                        </div>
                    </div>
                    <div class="buy">
                        <span class="refresh" @click="openFullScreen" v-loading.fullscreen.lock="fullscreenLoading">
                            刷新
                        </span>
                        <span class="buy-btn" @click="buy">
                            点买
                        </span>
                    </div>
                    <div class="stock-seo-div">
                        <div class="seo-text">
                            <input type="text" maxlength="6" placeholder="输入股票名称／代码／简拼" class="seo-val" @keyup="seo_stock($event)" v-model="keyword"/>
                            <input type="button" value="搜索" :class="canSearch?'canSearch seo-btn':'seo-btn'" @click="search(first,$event)"/>
                            <div class="seo-list" v-show= "seo_stock_open">
                                <ul>
                                    <li v-for="(item,index) in serchList" :key="index" @click="search(item.code,$event)">
                                        <span>{{item.name}}</span>
                                        <span>{{item.code}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="stock_export">
                            <div v-for="(text,index) in message" :key="index">
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
                        <div class="title-main">
                            <a :class="dayormonth===0?'active':''" @click="changeMap(0)">时K</a> 
                            <a :class="dayormonth===1?'active':''" @click="kLine(code,2,1)">日K</a>
                        </div>
                        <div id="main" style="width: 594px; height: 411px;">
                        </div>
                    </div>
                    <div class="stock-right">
                        <div class="stock-right-div1">
                            <p>实时交易动态</p>
                            <ul class="data-stock">
                                <li v-for="(item,index) in transaction" :key="index">
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
                                <li v-for="(item,index) in hot" :key="index">
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
        <BuyMask  :show="show" :dataList="dataList" :listTitle="listTitle" :amountValues="amountValues" :upLimitPrice="upLimitPrice"></BuyMask>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
import TopHeader from "../../components/header.vue";
import FooterNav from "../../components/footer.vue";
import BuyMask from "../../components/buy.vue";
import axios from "axios";
import qs from "qs";

import echarts from "echarts";

export default {
  name: "quotation",
  data() {
    return {
      message: null,
      transaction: null,
      hot: null,
      market: {},
      code: "000001",
      seo_stock_open: false,
      rawData: [],
      serchList: [],
      canSearch: false,
      keyword:'',
      first:[],
      dayormonth:0,
      fullscreenLoading:false,
      show:false,
      dataList:[],
      listTitle:[],
      amountValues:[],
      upLimitPrice:''
    };
  },
  components: {
    TopHeader,
    FooterNav,
    BuyMask
  },
  created() {
    this.retriveMarket(this.code);
    this.shares(this.code);
    let _this = this;
    axios
      .get("/strategist/system/stockMarketExponent")
      .then(
        function(response) {
          if (response.data.code == 200) {
            this.message = response.data.result;
          }
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get(
        "/strategist/buyRecord/tradeDynamic?" +
          qs.stringify({
            page: 0,
            size: 5
          })
      )
      .then(function(res) {
        _this.transaction = res.data.result.content; //拿到所有数据
        for (var i = 0; i < _this.transaction.length; i++) {
          //循环所有数据，找到type数据，然后修改值
          _this.transaction[i].tradeType =
            _this.transaction[i].tradeType == 1 ? "买入" : "卖出";
          _this.transaction[i].tradeTime = _this.transaction[
            i
          ].tradeTime.substring(11, 16);
        }
        _this.transaction = Object.assign({}, _this.transaction);
      })
      .catch(function(err) {
        console.log(err);
      });
    axios
      .get(
        "/strategist/stock/stockRecommend?" +
          qs.stringify({
            page: 0,
            size: 5
          })
      )
      .then(function(res) {
        _this.hot = res.data.result.content;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    buy(){
      this.show = true
      var _this = this
      var listTitle = this.listTitle
      var amountValues = this.amountValues
      axios.get('/strategist/strategytype/lists').then((response)=>{
        if(response.data.code==200){
          var data = response.data.result
          _this.dataList =data
          for(let i=0;i<data.length;i++){
            listTitle.push(data[i].name)
            amountValues.push(data[i].amountValues)
          }
        }
      }).catch((error)=>{
            console.log(error);        
      })
    },
    search(code,event){
        if(this.keyword===''){
            return
        }
        if(event.target.className === 'canSearch seo-btn'){
            if(this.first.length>0){
                code = this.first[0].code
            }else{
                this.$alert('请输入正确的股票代码', '提示', {
                    confirmButtonText: '确定',
                });
                return
            }
        }
        this.canSearch = false;//控制搜索按钮
        this.seo_stock_open = false;//显示模糊搜索列表
        this.keyword ='';//清空搜索关键字
        this.shares(code);
        this.retriveMarket(code);
    },
    shares(code){
        var _this = this
        axios
        .get("/strategist/stock/timeLine/"+code)
        .then(
            function(response) {
            if (response.data.code == 200) {

                _this.rawData = response.data.result;
                
                _this.drawK();
            }
            }.bind(this)
        )
        .catch(function(error) {
            console.log(error);
        });
    },
    seo_stock(event) {
      var val = this.keyword;
      var _this = this;
      if (val === "") {
        _this.seo_stock_open = false;
        this.canSearch = false;
        // console.log(this.canSearch)
        
        return;
      }
      this.canSearch = true;
      axios
        .get("/strategist/stock/selectStock?keyword=" + val)
        .then(response => {
          console.log(response.data.code);
          if (response.data.code == 200) {
              var data = response.data.result;
            _this.serchList = data;
            _this.first = data.slice(0,1);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      _this.seo_stock_open = true;
    },
    openFullScreen() {
        this.fullscreenLoading = true;
        this.retriveMarket(this.code);
    },
    kLine(code,type,index){
        this.dayormonth = index
        var _this = this
        axios.get('/strategist/stock/kLine?stockCode='+code+'&type='+type).then((response)=>{
            console.log(response.data)
            if(response.data.code==200){
                _this.rawData =response.data.result
                _this.drawK();
            }
        }).catch(function(error) {
          console.log(error);
        });
    },
    retriveMarket(code) {
      axios
        .get("/strategist/stock/market/" + code)
        .then(
          function(response) {
            this.market = response.data.result;
            this.market.upDropSpeed = (this.market.upDropSpeed * 100).toFixed(2) + "%";
            this.fullscreenLoading = false; 
            this.upLimitPrice = response.data.result.upLimitPrice
                console.log(this.upLimitPrice)           
          }.bind(this)
        )
        .catch(function(error) {
            this.fullscreenLoading = false;  
          console.log(error);
        });
    },
    changeMap(value) {
        this.dayormonth=0
      this.shares(this.code);
    },
    drawK(value) {
      this.charts = echarts.init(document.getElementById("main"));
      var upColor = "#00da3c";
      var downColor = "#ec0000";
      var rawData = this.rawData;
      //               var rawData = value === 0 ? timeData : dayData; //分 时k和 日K
      var data = this.splitData(rawData);
      this.charts.setOption(
        {
          backgroundColor: "#fff",
          animation: false,
          legend: {
            top: 10,
            left: "center",
            data: ["日K", "MA5", "MA10", "MA20", "MA30"]
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross"
            },
            backgroundColor: "rgba(245, 245, 245, 0.8)",
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            textStyle: {
              color: "#000"
            },
            position: function(pos, params, el, elRect, size) {
              //###鼠标再图上移动时的展示框的位置，这样不会超出外图的范围
              var obj = { top: 10 };
              obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
              return obj;
            }
          },
          axisPointer: {
            link: { xAxisIndex: "all" },
            label: {
              backgroundColor: "#777"
            }
          },
          visualMap: {
            show: false,
            seriesIndex: 5,
            dimension: 2,
            pieces: [
              {
                value: 1,
                color: downColor
              },
              {
                value: -1,
                color: upColor
              }
            ]
          },
          grid: [
            //调整两个图的位置
            {
              left: "0",
              right: "0",
              height: "65%"
            },
            {
              left: "0%",
              right: "0%",
              bottom: "0",
              height: "15%"
            }
          ],
          xAxis: [
            {
              type: "category",
              data: data.categoryData,
              scale: true,
              boundaryGap: false,
              axisLine: { onZero: false },
              splitLine: { show: false },
              splitNumber: 20,
              min: "dataMin",
              max: "dataMax",
              axisPointer: {
                z: 100
              },
              axisLabel: {
                //###负责x轴坐标的样式
                rotate: -30
              }
            },
            {
              type: "category",
              gridIndex: 1,
              data: data.categoryData,
              scale: true,
              boundaryGap: false,
              axisLine: { onZero: false },
              axisTick: { show: false },
              splitLine: { show: false },
              axisLabel: { show: false },
              splitNumber: 20,
              min: "dataMin",
              max: "dataMax"
            }
          ],
          yAxis: [
            {
              scale: true,
              splitArea: {
                show: true
              },
              axisLabel: { show: false }, //###隐藏Y轴的刻度值
              axisLine: { show: false }, //###隐藏Y轴线
              show: true
            },
            {
              scale: true,
              gridIndex: 1,
              splitNumber: 2,
              axisLabel: { show: false },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { show: false }
            }
          ],
          dataZoom: [
            {
              type: "inside",
              xAxisIndex: [0, 1],
              start: 50,
              end: 100
            }
          ],
          series: [
            {
              name: "日K",
              type: "candlestick",
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
              name: "MA5",
              type: "line",
              data: this.calculateMA(5, data), //测试数据
              smooth: true,
              lineStyle: {
                normal: { opacity: 0.5 }
              },
              areaStyle: {
                normal: {
                  color: "lightblue",
                  opacity: 0.2
                }
              }
            },
            {
              name: "MA10",
              type: "line",
              data: this.calculateMA(10, data), //测试数据
              smooth: true,
              lineStyle: {
                normal: { opacity: 0.5 }
              }
            },
            {
              name: "MA20",
              type: "line",
              data: this.calculateMA(20, data), //测试数据
              smooth: true,
              lineStyle: {
                normal: { opacity: 0.7 }
              }
            },
            {
              name: "MA30",
              type: "line",
              data: this.calculateMA(30, data), //测试数据
              smooth: true,
              lineStyle: {
                normal: { opacity: 1 }
              }
            },
            {
              name: "Volume",
              type: "bar",
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: data.volumes
            }
          ]
        },
        true
      );
    },
    calculateMA(dayCount, data) {
      var result = [];
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push("-");
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
      var dm = this.dayormonth
      for (var i = 0; i < rawData.length; i++) {
        if(dm===0){
            categoryData.push(rawData[i].time.split(" ")[1].slice(0, 5));
        }else if(dm===1){
            categoryData.push(rawData[i].time.split(" ")[0].slice(5, 10));
            
        }
        values.push([
          rawData[i].openPrice,
          rawData[i].closePrice,
          rawData[i].minPrice,
          rawData[i].maxPrice
        ]);
        volumes.push([
          i,
          rawData[i].nowVolume,
          rawData[i].closePrice > rawData[i].openPrice ? 1 : -1
        ]);
      }
      return {
        categoryData: categoryData,
        values: values,
        volumes: volumes
      };
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.drawK();
    });
  }
};
</script>

<style scoped>
.title-main {
  height: 100%;
  height: 40px;
  background: #fff;
  margin-bottom: 10px;
  padding-left: 20px;
}
.title-main a {
  line-height: 36px;
  color: #818081;
  display: inline-block;
  width: 101px;
  text-align: center;
}
.title-main a.active {
  color: #3e59a7;
  border-bottom: 4px solid #3e59a7;
}
.seo-list {
  position: absolute;
  width: 100%;
  top: 32px;
  max-height: 160px;
  background: #fff;
  overflow: hidden;
}
.seo-list li {
  line-height: 32px;
  padding: 0 8px;
}
.seo-list li:hover{
    background: #ddd;
}
.canSearch.seo-btn {
  background: #f30;
}
.stock-left {
  float: left;
}
.stock-right-div2 {
  margin-top: 10px;
}
.stock-right-div2 ul li > div:last-child span {
  display: block;
  width: 78px;
  height: 30px;
  line-height: 32px;
  border: 1px solid #ee8354;
  text-align: center;
  color: #ee8354;
  margin: 0 auto;
  margin-top: 18px;
  cursor: pointer;
}
.stock-right-div2 .stock-nuber span {
  text-align: center;
  line-height: 68px;
  color: #e26042;
  font-size: 14px;
  display: block;
  text-align: center;
}
.stock-right-div2 .stock-title > span {
  display: block;
  font-size: 14px;
  color: #adb3c1;
  margin-left: 15px;
}
.stock-right-div2 .stock-title > span:first-child {
  padding-top: 18px;
  color: #1e242e;
}
.stock-right-div1 .stock-title > span:first-child {
  color: #818081;
  padding-top: 18px;
}
.stock-right-div1 .stock-title > span:last-child {
  color: #adb3c1;
  font-size: 12px;
  padding-top: 2px;
}
.stock-right-div1 .stock-title > span {
  display: block;
  margin-left: 13px;
}
.stock-right-div1 .stock-title {
  font-size: 14px;
}
.stock-right-div1 .stock-nuber {
  text-align: center;
  font-size: 14px;
}
.stock-right-div1 .stock-nuber > span:first-child {
  color: #1e242e;
  display: block;
  padding-top: 18px;
}
.stock-right-div1 .stock-nuber > span:last-child {
  color: #adb3c1;
  display: block;
  padding-top: 1px;
}
.data-stock {
  background: #f7f7f7;
}
.stock-right-div1 .data-stock li > div,
.stock-right-div2 .data-stock div {
  width: 33%;
  float: left;
}
.stock-right-div1 .data-stock li,
.stock-right-div2 .data-stock li {
  height: 68px;
  margin-bottom: 1px;
  background: #fff;
}
.stock-right-div1 .data-stock li > div:last-child {
  line-height: 68px;
  color: #e26042;
  text-align: center;
}
.stock-right > div > p {
  height: 40px;
  line-height: 40px;
  color: #3e59a7;
  border-bottom: 1px solid #f7f7f7;
  padding-left: 15px;
  font-size: 16px;
  background: #fff;
}
.stock-right {
  width: 420px;
  float: right;
}
.stock-data {
  min-height: 808px;
  width: 1024px;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 20px;
}
.stock-data:after {
  content: ".";
  clear: both;
  display: block;
  overflow: hidden;
  font-size: 0;
  height: 0;
}
.stock-seo {
  width: 1024px;
  margin: 0 auto;
  height: 240px;
}
.stock-seo > div {
  float: left;
}
#main {
  width: 594px;
  height: 482px;
}
.bg {
  background: url("../../assets/img/beijingtu02@2x.png") no-repeat;
  background-size: 100% 100%;
}
.stock {
  width: 161px;
  margin-left: 42px;
}
.stock-text {
  color: #fff;
  font-size: 14px;
  padding-top: 42px;
}
.stock-number {
  font-size: 64px;
  color: #ff583d;
  padding-top: 18px;
  font-family: fantasy;
  letter-spacing: 10px;
}
.stock-rose {
  font-size: 14px;
  color: #ff583d;
  padding-top: 13px;
}
.stock-rose > span:first-child {
  padding-right: 28px;
}
.buy {
  margin-left: 60px;
}
.buy span{
  cursor: pointer;
}
.refresh {
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
.buy-btn {
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
.stock-seo-div {
  margin-top: 20px;
  margin-left: 194px;
}
.seo-text > input {
  float: left;
}
.seo-val {
  width: 329px;
  font-size: 14px;
  padding-left: 35px;
  background: url("../../assets/img/search@2x.png") no-repeat 8px 7px;
  background-color: #eee !important;
  background-size: 16px 17px;
  border: 0;
  height: 32px;
}
.seo-btn {
  border: 0;
  width: 60px;
  height: 32px;
  font-size: 14px;
  color: #fff;
  background: #adb3c1;
}
.stock_export {
  width: 424px;
  height: 147px;
  background: #000;
  background: rgba(0, 0, 0, 0.25);
  margin-top: 15px;
}
.seo-text {
  height: 32px;
  position: relative;
}
.stock_export > div {
  width: 141px;
  float: left;
  text-align: center;
}
.stock_export > div > .bond-title {
  margin-top: 36px;
  font-size: 14px;
  color: #fff;
}
.stock_export > div > .bond-number {
  font-size: 22px;
  color: #e26042;
  margin-top: 9px;
}
.stock_export > div > .bond-rose {
  font-size: 12px;
  color: #46c032;
  margin-top: 9px;
}
.stock_export > div > .bond-rose > span:first-child {
  margin-right: 10px;
}
</style>