<template>
  <div class="bannerLeft">
      <market-item></market-item>
      <ul class="tittle tittle1 flex">
          <li v-for="(item,index) in ranking" :key="index" :class="rank==index?'active':''" @click='rankClick(index)'>{{item.name}} <span class="time">({{item.info}})</span></li>
      </ul>
      <ul class="people">
          <li class="peopleItem flex" v-for="(item,index) in 5" :key="index">
              <div class="face">
                  <img src="../../assets/img/hang.png" class="faceItem">
                  <img src="../../assets/img/huangguan.png" class="huang" v-if="index<3">
              </div>
              <div class="ip">123****1212</div>
              <div :class="[index<3?'red':'','profit']">盈利22.8万</div>
          </li>
      </ul>
  </div>
</template>
<script>
import MarketItem from '../../components/martket'
export default {
    components: {
        MarketItem
    },
  data() {
    return {
      active: 0,
      ranking: [{ name: "股神排行榜", info: "月榜" }],
      rank: 0,
      market: []
    };
  },
  mounted () {
      this.getMarket()
  },
  methods: {
    activeClick(index) {
      this.active = index;
    },
    rankClick(index) {
      this.rank = index;
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
.people .red {
  color: #ea523b;
}
.profit {
  color: #687284;
}
.time {
  font-size: 12px;
}
.bannerLeft {
  width: 266px;
}
 .tittle li {
  line-height: 40px;
  padding: 0 20px;
  color: #adb3c1;
  cursor: pointer;
  font-size: 14px;
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
  background: url("../../assets/img/pankou-bg.png") no-repeat center bottom /100%,
    #fff;
  margin-bottom: 10px;
}
.huang {
  position: absolute;
  left: 2px;
  top: -9px;
}
.time {
  font-size: 12px;
  color: #adb3c1;
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
.people {
  background: #fff;
}
.people .peopleItem {
  padding: 12px 10px;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
}
.ip {
  color: #687284;
  margin: 0 36px 0 12px;
}
.people .face {
  position: relative;
}
.faceItem {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
