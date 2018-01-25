<template>
    <div class="hot">
        <ul class="tittle clearfix">
            <li :class="[active==index?'active':'','fl']" v-for="(item,index) in tittle" :key="index" @click="tittleClick(index)">{{item.name}}</li>
        </ul>
        <ul class="section" v-loading="loading" v-if="active==0">
            <li class="item flex"  v-for="(item,index) in transaction" :key="index">
                <div class="one">
                    <span class="name">{{item.stockName}}</span>
                    <span class="code">{{item.stockCode}}</span>
                </div>
                <div class="two">
                    <span class="status">{{item.tradeType}}</span>
                </div>
                <div class="three">
                    <span class="ip">{{item.phone}}</span>
                </div>
                <div class="fore">
                    <span class="money">{{item.profit?(item.profit).toFixed(2)+'元':"----"}}</span>
                </div>
                <div class="five">
                    <button @click="pointBuy(item.stockCode,$event)">点买</button>
                </div>
            </li>
        </ul>
        <ul class="section" v-loading="loading" v-if="active==1">
            <li class="hotitem clearfix"  v-for="(item,index) in hot" :key="index">
                <div class=" fl">
                    <span class="name">{{item.name}}</span>
                    <span class="code">{{item.code}}</span>
                </div>
                <div class="fl">
                    <span class="nowprice">当前价 :</span>
                    <span :class="[item.upDropSpeed>0?'red':'green','price']">{{ (item.lastPrice).toFixed(2)}}</span>
                </div>
                <div class="three fl">
                    <span class="ip">涨跌幅</span>
                    <span :class="[item.upDropSpeed>0?'red':'green','price','ip']">{{(item.upDropSpeed*100).toFixed(2)}}</span>
                </div>
                <div class="five fl">
                    <button @click="pointBuy(item.code,$event)">点买</button>
                </div>
            </li>
        </ul>
        <el-pagination
            layout="prev, pager, next"
            @current-change="currentPage"
            :total="8">
        </el-pagination>
        <BuyMask @close="close"  :show="show" :dataList="dataList" :listTitle="listTitle" :amountValues="amountValues" :upLimitPrice="upLimitPrice" :name="name" :instrumentId="instrumentId"></BuyMask>
    </div>
</template>
<script>
import qs from "qs";
import axios from "axios";
import BuyMask from '../../components/buy'
export default {
  components: {
    BuyMask,
  },
  data() {
    return {
      tittle: [
        {
          name: "交易动态"
        },
        {
          name: "热门股票"
        }
      ],
      transaction: [],
      total: 0,
      page: 0,
      active: 0,
      loading: false,
      isHot: false,
      hot: [],
      show:false,
      dataList:[],
      listTitle:[],
      amountValues:[],
      upLimitPrice:'',
      name:'',
      instrumentId:''
    };
  },
  mounted() {
    this.getTransaction();
  },
  methods: {
    close() {
      this.show = false;
      this.dataList = [];
      this.listTitle = [];
      this.upLimitPrice = "";
      this.amountValues = [];
    },
    tittleClick(index) {
      this.loading = true;
      if (index == 0) {
        this.isHot = false;
        this.getTransaction();
      } else {
        this.isHot = true;
        this.getHot();
      }
      this.active = index;
    },
    currentPage(val) {
      this.page = val - 1;
      if (index == 0) {
        this.getTransaction();
      } else {
        this.getHot();
      }
    },
 
    getHot() {
      var _this = this;
      this.$axios
        .get(
          "/strategist/stock/stockRecommend?" +
            qs.stringify({
              page: 0,
              size: 8
            })
        )
        .then(function(res) {
          setTimeout(() => {
            _this.hot = res.data.result.content;
            _this.loading = false;
          }, 400);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getTransaction() {
      var _this = this;
      this.$axios
        .get(
          "/strategist/buyRecord/tradeDynamic?" +
            qs.stringify({
              page: this.page,
              size: 8
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
          setTimeout(() => {
            _this.transaction = Object.assign({}, _this.transaction);
            _this.total = res.data.result.totalElements;
            _this.loading = false;
          }, 400);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    pointBuy(code,event) {
      event.stopPropagation()
      if(!this.$time.outtime('09:30',new Date().getHours()+':'+new Date().getMinutes())){
        this.$alert('非交易时间段', '交易日式', {
          confirmButtonText: '确定',
        });
        return 
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
              listTitle.push({name:data[i].name,id:data[i].id});
              amountValues.push(data[i].amountValues);
            }
          }
          console.log(listTitle)
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
};
</script>
<style scoped>
.nowprice{
  color: #687284;
}
.hotitem{
  border-bottom: 1px dashed #ddd;
}
.hotitem>div{
  width: 25%;
  font-size: 12px;
  text-align: center;
  padding: 8px 0;
  line-height: 30px;
}
.el-pagination {
  background: #fff;
}
.hot {
  width: 748px;
}
.hot .tittle {
  text-align: center;
  width: 100%;
  background: #fbfbfb;
}
.hot .tittle li {
  box-sizing: border-box;
  line-height: 42px;
  width: 120px;
  cursor: pointer;
  color: #687284;
  float: left;
}
.hot .tittle .active {
  color: #3e59a7;
  line-height: 40px;
  border-top: 1px solid #3e59a7;
}
.section {
  background: #fff;
  padding: 4px 0px;
  min-height: 395px;
}
.section .one {
  width: 140px;
}
.section .two {
  font-size: 12px;
  border: 1px solid #ff7e45;
  display: inline-block;
  width: 36px;
  height: 18px;
  text-align: center;
  color: #ff7e45;
}
.section .three {
  color: #687284;
}
.section .fore {
  color: #ea523b;
  font-size: 14px;
  text-align: center;
  width: 100px;
}
.section .item {
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed #dcdee3;
}
.section .item:last-child {
  /* border: none; */
}
.section .name {
  font-size: 18px;
  color: #1e242e;
}
.section .code {
  font-size: 12px;
  color: #adb3c1;
}
.five button {
  width: 96px;
  height: 28px;
  background-color: #ff7e45;
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
}
</style>
