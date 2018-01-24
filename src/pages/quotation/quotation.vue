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
                            <i class="el-icon-circle-plus addIcon" v-show="canAdd" @click="addIcon"></i>
                        </div>
                        <div class="stock-number">{{market.lastPrice?(market.lastPrice).toFixed(2):market.lastPrice}}</div>
                        <div class="stock-rose">
                            <span>{{market.upDropPrice}}</span>
                            <span>{{market.upDropSpeed}}</span>
                        </div>
                    </div>
                    <div class="buy">
                        <span class="refresh" @click="openFullScreen" v-loading.fullscreen.lock="fullscreenLoading">
                           		 刷新
                        </span>
                        <span class="buy-btn" @click="pointBuy(pcode,$event)">
                          		  点买
                        </span>
                    </div>
                    <div class="stock-seo-div">
                        <div class="seo-text">
                            <input type="text" maxlength="6" placeholder="输入股票名称／代码" class="seo-val" @blur="blur"  @focus="focus($event)" @keyup="seo_stock($event)" v-model="keyword"/>
                            <input type="button" value="搜索" :class="canSearch?'canSearch seo-btn':'seo-btn'"  @click="search(first,$event)"/>
                            <div class="seo-list" v-show= "seo_stock_open">
                                <ul>
                                    <li v-for="(item,index) in serchList" :key="index" @click.stop="search(item.code,$event)">
                                        <span>{{item.name}}</span>
                                        <span>{{item.code}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="stock_export">
                        	
                            <div v-for="(text,index) in message" :key="index">
                            	
		                                <p class="bond-title">{{text.name}}</p>
		                                <p :class="[text.upDropSpeed<0?'green':'red','bond-number']">{{text.lastPrice}}</p>
		                                <div :class="[text.upDropSpeed<0?'':'red','bond-rose']">
		                                    <span>{{text.upDropPrice}}</span>
		                                    <span>{{(text.upDropSpeed*100).toFixed(2)}}%</span>
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
                        <div id="main" style="width: 748px; height: 411px;">

                        </div>
                        <Three></Three>
                    </div>
                    <div class="stock-right">
                        <div class="stock-right-div1">
                            <p >实时交易动态</p>
                            <ul >
                                <li v-for="(item,index) in transaction" :key="index" @click="pop(item.stockCode)" class="real flex">
                                    <div class="realItem flex">
                                        <span class="name">{{item.stockName}}</span>
                                        <span class="code">{{item.stockCode}}</span>
                                    </div>
                                    <div class="money" :class="[]">
                                        <span>{{item.tradePrice}}</span>
                                    </div>
                                    <div class="sell">
                                        {{item.tradeType}}
                                    </div>
                                    <div class="ip">
                                        {{item.phone}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="stock-right-div2">
                            <p>推荐股票</p>
                            <ul class="data-stock">
                                <li v-for="(item,index) in hot" :key="index" @click.prevent="pop(item.code)" class="Recommend flex">
                                    <div class="stock-title">
                                        <span class="name">{{item.name}}</span>
                                        <span class="code">{{item.code}}</span>
                                    </div>
                                    <div class="stock-nuber">
                                        <span  :class="[item.upDropSpeed>0?'red':'green']" >{{(item.upDropSpeed*100).toFixed(2)}}%</span>
                                    </div>
                                    <div class="Rebuy">
                                        <span  @click.prevent="pointBuy(item.code,$event)">点买</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        <BuyMask @close="close"  :show="show" :dataList="dataList" :listTitle="listTitle" :amountValues="amountValues" :upLimitPrice="upLimitPrice" :name="name" :instrumentId="instrumentId"></BuyMask>
        </div>

        <footer-nav></footer-nav>
    </div>
</template>

<script>
import Three from '../../components/threeblock'
import TopHeader from "../../components/header.vue";
import FooterNav from "../../components/footer.vue";
import BuyMask from "../../components/buy.vue";
import axios from "axios";
import qs from "qs";
import SockJS from "../../assets/websoket/sockjs.min.js";
import web from "../../assets/websoket/stomp.js";
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
      pcode: "000001",
      seo_stock_open: false,
      rawData: [],
      serchList: [],
      canSearch: false,
      keyword: "",
      first: [],
      dayormonth: 0,
      fullscreenLoading: false,
      show: false,
      dataList: [],
      listTitle: [],
      amountValues: [],
      upLimitPrice: "",
      name: "",
      instrumentId: "",
      canAdd: true,
      searchArr: [],
      stompClient: null,
      stompSubscribe: null,
      stockTimeLineWs: null,
      open: true
    };
  },
  components: {
    TopHeader,
    FooterNav,
    BuyMask,
    Three
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
          _this.transaction[i].tradeTime = _this.transaction[i].tradeTime
            ? _this.transaction[i].tradeTime.substring(11, 16)
            : "无法获取";
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
    pop(code) {
      // this.$router.push({path:'/quotation',query:{code:code}})
      // this.$router.go(0)
      this.pcode = code || "000001";
      this.code = code || "000001";
      if (this.open) {
        this.resubscribe(code);
      }
      this.shares(code);
      this.retriveMarket(code);
      window.scrollTo(0, 0);
      this.$message({
        message: "切换成功",
        type: "warning",
        duration: 1000
      });
    },
    focus(event) {
      if (event.target.value == "") {
        this.seo_stock(event);
      }
    },
    blur() {
      if (this.keyword == "") {
        this.keyword == " ";
        this.serchList = [];
        this.seo_stock_open = false;
      }
    },
    addIcon() {
      this.$axios
        .post(
          "/strategist/favoriteStock/addFavoriteStock?stockCode=" + this.pcode
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: "加入成功",
              type: "success"
            });
            this.canAdd = false;
          }
        });
    },
    close() {
      this.show = false;
      this.dataList = [];
      this.listTitle = [];
      this.upLimitPrice = "";
      this.amountValues = [];
    },
    pointBuy(code, event) {
      event.stopPropagation();
      if (
        !this.$time.outtime(
          "09:30",
          new Date().getHours() + ":" + new Date().getMinutes()
        )
      ) {
        this.$alert("非交易时间段", "交易日式", {
          confirmButtonText: "确定"
        });
        return;
      }
      axios
        .get("/strategist/stock/market/" + code)
        .then(
          function(response) {
            var data = response.data.result;
            this.upLimitPrice = data.upLimitPrice;
            this.name = data.name;
            this.instrumentId = data.instrumentId;
            this.buy();
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    buy() {
      var _this = this;
      var listTitle = this.listTitle;
      var amountValues = this.amountValues;
      axios
        .get("/strategist/strategytype/lists")
        .then(response => {
          this.show = true;
          if (response.data.code == 200) {
            var data = response.data.result;
            _this.dataList = data;
            for (let i = 0; i < data.length; i++) {
              listTitle.push({ name: data[i].name, id: data[i].id });
              amountValues.push(data[i].amountValues);
            }
          }
          console.log(listTitle);
        })
        .catch(error => {
          console.log(error);
        });
    },
    search(code, event) {
      if (event.target.className === "canSearch seo-btn") {
        if (this.first.length > 0) {
          code = this.first[0].code;
        } else {
          this.$alert("请输入正确的股票代码", "提示", {
            confirmButtonText: "确定"
          });
          return;
        }
      }
      this.canSearch = false; //控制搜索按钮
      this.seo_stock_open = false; //显示模糊搜索列表
      this.keyword = ""; //清空搜索关键字
      this.pcode = code || "000001";
      this.code = code || "000001";
      // this.stompSubscribe = null
      if (this.open) {
        this.resubscribe(code);
      }
      this.shares(code);
      this.retriveMarket(code);
      this.$message({
        message: "切换成功",
        type: "warning",
        duration: 500
      });
    },
    shares(code) {
      var _this = this;
      this.$router.push({ path: "/quotation", query: { code: code } });

      axios
        .get("/strategist/stock/timeLine/" + code)
        .then(
          function(response) {
            if (response.data.code == 200) {
              _this.rawData = response.data.result;
              _this.drawK(1);
            }
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    seo_stock: _.debounce(function(event) {
      var val = event.target.value;
      if (event.keyCode == 13 && val == "") {
        return;
      } else if (event.keyCode == 13 && val != "") {
        if (this.first.length > 0) {
          val = this.first[0].code;
        } else {
          this.$alert("请输入正确的股票代码", "提示", {
            confirmButtonText: "确定"
          });
        }
        this.keyword = "";
        this.serchList = [];
        this.shares(val);
        this.retriveMarket(val);
        this.$message({
          message: "切换成功",
          type: "warning",
          duration: 500
        });
        return;
      }
      if (!val) {
        val = "0";
      }
      var _this = this;
      var nowArr = [];
      if (val === "") {
        _this.seo_stock_open = false;
        this.canSearch = false;
        return;
      }

      axios
        .get("/strategist/stock/selectStock?keyword=" + val)
        .then(response => {
          if (response.data.code == 200) {
            var data = response.data.result;
            this.canSearch = true;
            _this.serchList = data;
            _this.searchArr = data;
            _this.first = data.slice(0, 1);
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      _this.seo_stock_open = true;
    }, 300),
    openFullScreen() {
      this.fullscreenLoading = true;
      this.retriveMarket(this.code);
    },
    kLine(code, type, index) {
      this.open = false;
      if (this.stompSubscribe) {
        this.stompSubscribe.unsubscribe(this.stockTimeLineWs);
      }
      this.dayormonth = index;
      var _this = this;
      axios
        .get("/strategist/stock/kLine?stockCode=" + code + "&type=" + type)
        .then(response => {
          if (response.data.code == 200) {
            _this.rawData = response.data.result.reverse();
            _this.drawK(2);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    retriveMarket(code) {
      axios
        .get("/strategist/stock/market/" + code)
        .then(
          function(response) {
            var data = response.data.result;
            this.market = data;
            this.market.upDropSpeed =
              (this.market.upDropSpeed * 100).toFixed(2) + "%";
            setTimeout(() => {
              this.fullscreenLoading = false;
            }, 500);
            this.upLimitPrice = data.upLimitPrice;
            this.name = data.name;
            this.instrumentId = data.instrumentId;
            this.canAdd = !data.favorite;
          }.bind(this)
        )
        .catch(function(error) {
          setTimeout(() => {
            this.fullscreenLoading = false;
          }, 500);
          console.log(error);
        });
    },
    changeMap(value) {
      this.open = true;
      var _this = this;
      this.dayormonth = 0;
      this.shares(this.code);
      this.stockTimeLineWs = "/user/" + this.code + "/stockTimeLine";
      this.stompSubscribe = this.stompClient.subscribe(
        this.stockTimeLineWs,
        function(data) {
          _this.rawData = JSON.parse(data.body);
          _this.drawK();
        }
      );
    },
    drawK(value) {
      this.charts = echarts.init(document.getElementById("main"));
      var upColor = "#00da3c";
      var downColor = "#ec0000";
      var rawData = this.rawData;
      var val = value ? (value == 1 ? "时k" : "日k") : "时k";
      var data = this.splitData(rawData);
      this.charts.setOption(
        {
          backgroundColor: "#fff",
          animation: false,
          legend: {
            top: 10,
            left: "center",
            data: [val, "MA5", "MA10", "MA20", "MA30"]
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
              left: "8%",
              right: "5%",
              padding: "8px",
              height: "65%",
              width:'86%'
            },
            {
              left: "8%",
              right: "5%",
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
              axisLabel: { show: true }, //###隐藏Y轴的刻度值
              axisLine: { show: true }, //###隐藏Y轴线
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
              name: val,
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
      var dm = this.dayormonth;
      for (var i = 0; i < rawData.length; i++) {
        if (dm === 0) {
          categoryData.push(rawData[i].time.split(" ")[1].slice(0, 5));
        } else if (dm === 1) {
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
    },
    resubscribe(code) {
      var _this = this;
      if (this.stompSubscribe) {
        this.stompSubscribe.unsubscribe(this.stockTimeLineWs);
      }
      this.stockTimeLineWs = "/user/" + code + "/stockTimeLine";
      this.stompSubscribe = this.stompClient.subscribe(
        this.stockTimeLineWs,
        function(data) {
          _this.rawData = JSON.parse(data.body);
          _this.drawK();
        }
      );
    }
  },
  mounted() {
    var _this = this;
    var s = new SockJS("http://10.0.0.48:8084/socket");
    this.stompClient = Stomp.over(s);
    this.stompClient.connect({}, function() {
      _this.stockTimeLineWs = "/user/" + _this.code + "/stockTimeLine";
      _this.stompSubscribe = _this.stompClient.subscribe(
        _this.stockTimeLineWs,
        function(data) {
          _this.rawData = JSON.parse(data.body);
          _this.drawK();
        }
      );
      // 监听断开连接
      s.onclose = function(event) {
        console.log("a:" + event);
      };
    });
  },
  beforeRouteLeave(to, from, next) {
    if (this.stompSubscribe) {
      this.stompSubscribe.unsubscribe(this.stockTimeLineWs);
    }
    next();
  }
};
</script>

<style scoped>
.Recommend  .stock-title{
  width: 100px;
}
.Recommend .Rebuy{
  color: #ff7e45;
  border: 1px solid #ff7e45;
  width: 60px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  cursor: pointer;
}
.Recommend >div{
  text-align: center;
}
.Recommend  {
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding: 10px 12px;
  border-bottom: 1px dashed #ddd;
  background: #fff;
}
.Recommend .name{
  color: #1e242e;
}
.Recommend .code{
  color: #acb3c2;
}


.number {
  display: inline-block;
  margin-right: 5px;
}
.addIcon {
  font-size: 22px;
  color: #e26042;
  position: absolute;
  bottom: -2px;
  cursor: pointer;
}
a {
  cursor: pointer;
}
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
  cursor: pointer;
}
.seo-list li:hover {
  background: #ddd;
}
.canSearch.seo-btn {
  background: #f30;
}
.stock-left {
  float: left;
}
.stock-right-div1 {
  margin-bottom: 10px;
}

.real {
  padding: 10px 15px;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1px dashed #ddd;
  font-size: 12px;
}
.real .ip {
  color: #adb3c1;
}
.real .realItem {
  flex-direction: column;
  align-items: center;
}
.real .sell {
  color: #7181c8;
}
.real .realItem .name {
  color: #1e242e;
}
.real .realItem .code {
  color: #acb3c2;
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
  width: 266px;
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
  position: relative;
  padding-top: 42px;
}
.stock-number {
  font-size: 64px;
  color: #ff583d;
  padding-top: 18px;
  font-family: fantasy;
  letter-spacing: 2px;
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
.buy span {
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
  /* color: #e26042; */
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