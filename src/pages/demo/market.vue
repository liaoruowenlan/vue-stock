<template>
	<div>
		<top-header></top-header>
		
		<div class="width100 market">
			<div class="market-header">
				<div class="market-header-div">
					<div class="market-header-text">
						<div>
							{{info.name}}
						</div>
						<p v-if="!$time.outtime('09:30',new Date().getHours() + ':' + new Date().getMinutes())">
							休市中
						</p>
					</div>
					<div class="market-header-number">
						<div class="market-header-number-left">
							<div :class="[info.upDropSpeed>0?'red':'green']">
								{{info.lastPrice}}
							</div>
							<p :class="[info.upDropSpeed>0?'red':'green']">
								<span>{{info.upDropPrice}}</span>&nbsp;
								<span>{{(info.upDropSpeed*100).toFixed(2)}}%</span>
							</p>
						</div>
						<div class="market-header-number-right">
							<ul>
								<li>
									<span>最高</span>{{info.highestPrice}}
								</li>
								<li>
									<span>今开</span>{{info.openPrice}}
								</li>
								<li>
									<span>成交额</span>{{(info.turnover/100000000).toFixed(2)}}亿元
								</li>
								<li>
									<span>最低</span>{{info.lowestPrice}}
								</li>
								<li>
									<span>昨收</span>{{info.preClsPrice}}
								</li>
								<li>
									<span>成交量</span>{{(info.volume/100000000).toFixed(2)}}亿手
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="market-body">
				<div class="market-body-div">
					<div class="market-body-left">
						<div class="title-main">
                <a :class="dayormonth===0?'active':''" @click="changeMap(0)">时K</a> 
                <a :class="dayormonth===1?'active':''" @click="kLine(code,1,1)">日K</a>
                <a :class="dayormonth===2?'active':''" @click="kLine(code,2,2)">周K</a>
                <a :class="dayormonth===3?'active':''" @click="kLine(code,3,3)">月K</a>
            </div>
						<div id="main" style="width: 748px; height: 411px;">

            </div>
					</div>
					<div class="market-body-right">
						<div class="market-body-right-title">
							<p :class="[active == index?'activeOne':'']" v-for="(item,index) in marKetList" :key="index" @click="marKetListClick(index)">{{item.name}}</p>
						</div>
						<ul class="rank-list" v-if="active==0">
							<li v-for="(item,index) in RankList" :key="index">
								<div class="rank-list-text1">
									<p>{{item.name}}</p>
									<span>{{item.instrumentId}}</span>
								</div>
								<div :class="[item.upDropSpeed>0?'red':'green','rank-list-text2']">
									{{(item.lastPrice).toFixed(2)}}
								</div>
								<div  :class="[item.upDropSpeed>0?'red':'green','rank-list-text3']">
									{{(item.upDropPrice).toFixed(2)}}&nbsp;&nbsp;{{(item.upDropSpeed*100).toFixed(2)}}%
								</div>
							</li>
						</ul>
						<ul class="rank-list" v-if="active==1">
							<li v-for="(item,index) in RankList1" :key="index">
								<div class="rank-list-text1">
									<p>{{item.name}}</p>
									<span>{{item.instrumentId}}</span>
								</div>
								<div :class="[item.upDropSpeed>0?'red':'green','rank-list-text2']">
									{{(item.lastPrice).toFixed(2)}}
								</div>
								<div :class="[item.upDropSpeed>0?'red':'green','rank-list-text3']">
									{{(item.upDropPrice).toFixed(2)}}&nbsp;&nbsp;{{(item.upDropSpeed*100).toFixed(2)}}%
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<footer-nav></footer-nav>
	</div>
</template>

<script>
import TopHeader from "../../components/header.vue";
import FooterNav from "../../components/footer.vue";
import axios from "axios";
import qs from "qs";
import SockJS from "../../assets/websoket/sockjs.min.js";
import web from "../../assets/websoket/stomp.js";
import echarts from "echarts";
export default {
  data() {
    return {
      active: 0,
      first: "",
      info: {},
      stompClient: null,
      stompSubscribe: null,
      stockTimeLineWs: null,
      code: this.$route.query.code || "000001",
      dayormonth: 0,
      marKetList: [
        {
          name: "涨幅板"
        },
        {
          name: "跌幅板"
        }
      ],
      rawData: [],
      RankList: [],
      RankList1: [],
      rankType:1
    };
  },
  components: {
    TopHeader,
    FooterNav
  },
  mounted() {
    this.shares(this.code);
    this.getList();
    this.getmarket();
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
  methods: {
    getList(){
      var _this = this;
      this.$axios.get("/strategist/stock/"+this.code+"/ranking?"+qs.stringify({
        rankType:this.rankType,
        size:10
      })).then(res => {
        if (res.data.code == 200) {
          if(_this.active==0){
            _this.RankList = res.data.result;
          }else{
            _this.RankList1 = res.data.result;
            
          }
        }
      });
    },
    getmarket() {
      var _this = this;
      this.$axios.get("/strategist/stock/market/" + this.code).then(res => {
        if (res.data.code == 200) {
          _this.info = res.data.result;
        }
      });
    },
    marKetListClick(index) {
      if(this.active == index) return
      this.active = index;
      this.rankType =index+1;
      this.getList()
    },
    shares(code) {
      var _this = this;
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
    kLine(code, type, index) {
      if (this.dayormonth == index) return;
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
            _this.drawK(type);
          }
        })
        .catch(function(error) {
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
      var val =
        value == 1 ? "时k" : value == 2 ? "日k" : value == 3 ? "周k" : "月k";
      var data = this.splitData(this.rawData);
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
              width: "86%"
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
        } else if (dm === 2) {
          categoryData.push(rawData[i].time.split(" ")[0].slice(5, 10));
        } else if (dm === 3) {
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
  beforeRouteLeave(to, from, next) {
    if (this.stompSubscribe) {
      this.stompSubscribe.unsubscribe(this.stockTimeLineWs);
    }
    next();
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
  cursor: pointer;
}
.title-main a.active {
  color: #3e59a7;
  border-bottom: 4px solid #3e59a7;
}
.market-body-right-title {
  height: 33px;
  border-bottom: 1px solid #dedee3;
}
.rank-list {
  padding: 0 10px;
}

.rank-list li {
  height: 44px;
  border-bottom: 1px solid #f7f7f7;
}

.rank-list li:last-child {
  border: 0;
}

.rank-list li > div {
  float: left;
}

.rank-list-text1 {
  width: 35%;
  font-size: 12px;
  color: #adb3c1;
}

.rank-list-text1 > p {
  font-size: 14px;
  margin-top: 7px;
  color: #1e242e;
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rank-list-text2 {
  width: 25%;
  line-height: 45px;
  font-size: 12px;
}

.rank-list-text3 {
  font-size: 12px;
  width: 40%;
  line-height: 45px;
}

.market-body-right-title > p {
  float: left;
  width: 50px;
  text-align: center;
  font-size: 14px;
  line-height: 33px;
  color: #687284;
  margin-left: 10px;
  cursor: pointer;
}

.market-body-right-title > p.activeOne {
  color: #3e59a7;
  border-bottom: 1px solid #3e59a7;
}

.market-header-number-right ul {
  width: 570px;
  overflow: hidden;
}

.market-body {
  width: 100%;
  padding-top: 11px;
}

.market-body-left {
  width: 748px;
  height: 100%;
  background: #fff;
}

.market-body-right {
  margin-left: 10px;
  width: 266px;
  height: 100%;
  background: #fff;
}

.market-body-div {
  height: 506px;
  width: 1024px;
  margin: 0 auto;
}

.market-body-div > div {
  float: left;
}

.market-header-number-right ul li {
  color: #fff;
  font-size: 16px;
  margin-bottom: 18px;
  float: left;
  margin-right: 85px;
}

.market-header-number-right ul li:nth-child(3n) {
  margin-right: 0;
}

.market-header-number-right ul li span {
  display: inline-block;
  color: #adb3c1;
  margin-right: 15px;
  font-size: 14px;
}

.market-header-number-left {
  color: #ee523b;
  margin-right: 109px;
}

.market-header-number-left > div {
  font-size: 48px;
}

.market-header-number-left > p {
  font-size: 16px;
  padding-top: 10px;
}

.market {
  height: 777px;
  width: 100%;
}

.market-header {
  height: 240px;
  background: url(../../assets/img/hangqiong-bg.png) no-repeat;
  background-size: 100% 100%;
}

.market-header-text div {
  color: #fff;
  font-size: 20px;
  float: left;
}

.market-header-text {
  height: 26px;
  padding-top: 44px;
  padding-left: 25px;
}

.market-header-number {
  padding-left: 22px;
  padding-top: 14px;
  height: 156px;
}

.market-header-number > div {
  float: left;
}

.market-header-text p {
  width: 36px;
  height: 16px;
  font-size: 12px;
  border: 1px solid #fff;
  color: #fff;
  float: left;
  margin-top: 6px;
  margin-left: 10px;
  padding: 0 2px;
}

.market-header-div {
  width: 1024px;
  margin: 0 auto;
}
</style>