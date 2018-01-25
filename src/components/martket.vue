<template>
  <div class="market">
      <ul class="tittle flex">
          <li v-for="(item,index) in tittle" :key="index" :class="active==index?'active':''" @click='activeClick(index)'>{{item.name}}</li>
      </ul>
      <div :class="[item.upDropSpeed>0?'red':'green','contain']" v-for="(item,index) in market" :key="index" v-if="active==index">
          <p class="big">{{(item.lastPrice).toFixed(2)}}</p>
          <p class="updown"><span>{{item.upDropPrice>0?'+'+item.upDropPrice:item.upDropPrice}}</span> <span>{{item.upDropSpeed>0?'+'+((item.upDropSpeed)*100).toFixed(2):((item.upDropSpeed)*100).toFixed(2)}}%</span></p>
          <p><button>大盘详情</button></p>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tittle: [{ name: "上证" }, { name: "深证" }, { name: "创业板" }],
      market: [],
      active: 0
    };
  },
  mounted() {
    this.getMarket();
  },
  methods: {
    activeClick(index) {
      this.active = index;
    },
    getMarket() {
      var _this = this;
      this.$axios
        .get("/strategist/system/stockMarketExponent")
        .then(function(response) {
          if (response.data.code == 200) {
            _this.market = response.data.result;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.tittle li {
  line-height: 40px;
  flex-grow: 1;
  text-align: center;
  color: #adb3c1;
  cursor: pointer;
  font-size: 14px;
  box-sizing: border-box;
}
.tittle1 li {
  padding: 0 10px;
}
.tittle li.active {
  color: #3e59a7;
  border-top: 1px solid #3e59a7;
  line-height: 38px;
}
.contain {
  padding: 20px;
  background: url("../assets/img/pankou-bg.png") no-repeat center bottom /100%,
    #fff;
  margin-bottom: 10px;
}
.contain p {
  text-align: center;
  line-height: 28px;
}
.contain .big {
  font-size: 22px;
}
.contain .updown {
  font-size: 14px;
}
.contain button {
  width: 102px;
  height: 26px;
  border: solid 1px #3e59a7;
  color: #3e59a7;
  background: transparent;
}
</style>
