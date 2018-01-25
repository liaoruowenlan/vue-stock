<template>
	<div>
		<top-header></top-header>
		
		<div class="width100 market">
			<div class="market-header">
				<div class="market-header-div">
					<div class="market-header-text">
						<div>
							上证指数
						</div>
						<p>
							休市中
						</p>
					</div>
					<div class="market-header-number">
						<div class="market-header-number-left">
							<div>
								3390.34
							</div>
							<p>
								<span>+23.17</span>
								<span>+1.30%</span>
							</p>
						</div>
						<div class="market-header-number-right">
							<ul>
								<li>
									<span>最高</span>3470.12
								</li>
								<li>
									<span>今开</span>3470.12
								</li>
								<li>
									<span>成交额</span>70.52亿
								</li>
								<li>
									<span>最低</span>3470.12
								</li>
								<li>
									<span>昨收</span>3470.12
								</li>
								<li>
									<span>成交量</span>7.12亿手
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="market-body">
				<div class="market-body-div">
					<div class="market-body-left">
						<el-autocomplete
			class="inline-input"
			v-model="state"
			:fetch-suggestions="querySearch"
			placeholder="输入股票名称／代码"
			@select="handleSelect"
		></el-autocomplete>
					</div>
					<div class="market-body-right">
						<div class="market-body-right-title">
							<p :class="[active == index?'activeOne':'']" v-for="(item,index) in marKetList" :key="index" @click="marKetListClick(index)">{{item.name}}</p>
						</div>
						<ul class="rank-list" v-if="active==0">
							<li v-for="(item,index) in RankList" :key="index">
								<div class="rank-list-text1">
									<p>{{item.Aname}}</p>
									<span>{{item.Anumber}}</span>
								</div>
								<div class="rank-list-text2">
									{{item.Amoney}}
								</div>
								<div class="rank-list-text3">
									{{item.Aplus}}&nbsp;&nbsp;{{item.Areduce}}
								</div>
							</li>
						</ul>
						<ul class="rank-list" v-if="active==1">
							<li v-for="(item,index) in RankList1" :key="index">
								<div class="rank-list-text1">
									<p>{{item.Aname}}</p>
									<span>{{item.Anumber}}</span>
								</div>
								<div class="rank-list-text2">
									{{item.Amoney}}
								</div>
								<div class="rank-list-text3">
									{{item.Aplus}}&nbsp;&nbsp;{{item.Areduce}}
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

export default {
  data() {
    return {
      restaurants: [],
      active: 0,
      state: "",
      first: "",
      marketCode: "000001",
      marKetList: [
        {
          name: "涨幅板"
        },
        {
          name: "跌幅板"
        }
      ],
      RankList: [
        {
          Aname: "贵州茅台",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "+12.25",
          Areduce: "+10.00%"
        },
        {
          Aname: "贵州茅台",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "+12.25",
          Areduce: "+10.00%"
        },
        {
          Aname: "贵州茅台",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "+12.25",
          Areduce: "+10.00%"
        },
        {
          Aname: "贵州茅台",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "+12.25",
          Areduce: "+10.00%"
        },
        {
          Aname: "贵州茅台",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "+12.25",
          Areduce: "+10.00%"
        },
        {
          Aname: "贵州茅台",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "+12.25",
          Areduce: "+10.00%"
        },
        {
          Aname: "贵州茅台",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "+12.25",
          Areduce: "+10.00%"
        },
        {
          Aname: "贵州茅台",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "+12.25",
          Areduce: "+10.00%"
        },
        {
          Aname: "贵州茅台",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "+12.25",
          Areduce: "+10.00%"
        },
        {
          Aname: "贵州茅台",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "+12.25",
          Areduce: "+10.00%"
        }
      ],
      RankList1: [
        {
          Aname: "中国牛逼股票",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "-12.25",
          Areduce: "-10.00%"
        },
        {
          Aname: "中国牛逼股票",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "-12.25",
          Areduce: "-10.00%"
        },
        {
          Aname: "中国牛逼股票",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "-12.25",
          Areduce: "-10.00%"
        },
        {
          Aname: "中国牛逼股票",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "-12.25",
          Areduce: "-10.00%"
        },
        {
          Aname: "中国牛逼股票",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "-12.25",
          Areduce: "-10.00%"
        },
        {
          Aname: "中国牛逼股票",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "-12.25",
          Areduce: "-10.00%"
        },
        {
          Aname: "中国牛逼股票",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "-12.25",
          Areduce: "-10.00%"
        },
        {
          Aname: "中国牛逼股票",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "-12.25",
          Areduce: "-10.00%"
        },
        {
          Aname: "中国牛逼股票",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "-12.25",
          Areduce: "-10.00%"
        },
        {
          Aname: "中国牛逼股票",
          Anumber: "600519",
          Amoney: "773.640",
          Aplus: "-12.25",
          Areduce: "-10.00%"
        }
      ]
    };
  },
  components: {
    TopHeader,
    FooterNav
  },
  methods: {
    marKetListClick(index) {
      this.active = index;
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var _this = this;
      this.$axios
        .get("/strategist/stock/selectStock?keyword=" +queryString)
        .then(response => {
          if (response.data.code == 200) {
            var data = response.data.result;
            // _this.restaurants = data;
			_this.first = data.slice(0, 1);
			for(let i=0;i<data.length;i++){
				data[i].value = data[i].name +"    "+data[i].code
			}
			cb(data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      // 调用 callback 返回建议列表的数据
    },

    handleSelect(item) {
      console.log(item);
    }
  },
};
</script>

<style scoped>
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
  color: #ea523b;
  font-size: 12px;
}

.rank-list-text3 {
  font-size: 12px;
  color: #ea523b;
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
  width: 520px;
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
}

.market-header-div {
  width: 1024px;
  margin: 0 auto;
}
</style>