<template>
  <div class="bannerLeft">
      <ul class="tittle flex">
          <li v-for="(item,index) in tittle" :key="index" :class="active==index?'active':''" @click='activeClick(index)'>{{item.name}}</li>
      </ul>
      <div class="contain">
          <p class="big">1234.322</p>
          <p class="updown"><span>+4.123</span> <span>+4.12%</span></p>
          <p><button>大盘详情</button></p>
      </div>
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
export default {
  data() {
    return {
      tittle: [{ name: "上证" }, { name: "深证" }, { name: "创业板" }],
      active: 0,
      ranking: [{ name: "股神排行榜", info: "月榜" }],
      rank: 0
    };
  },
  methods: {
    activeClick(index) {
      this.active = index;
    },
    rankClick(index) {
      this.rank = index;
    }
  }
};
</script>
<style scoped>
.people .red{
    color: #ea523b;
}
.profit{
    color: #687284;
}
.time {
  font-size: 12px;
}
.bannerLeft {
  width: 266px;
}
.bannerLeft .tittle {
  justify-content: flex-start;
  background: #fff;
}
.contain {
  padding: 35px 20px 40px 20px;
  background: url('../../assets/img/pankou-bg.png') no-repeat center bottom /100%,#fff;
  margin-bottom: 10px;
}
.huang{
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
  color: #ea523b;
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
.bannerLeft .tittle li {
  line-height: 40px;
  padding: 0 20px;
  color: #adb3c1;
  cursor: pointer;
  font-size: 14px;
}
.bannerLeft .tittle1 li {
  padding: 0 10px;
}
.bannerLeft .tittle li.active {
  color: #3e59a7;
  border-top: 1px solid #3e59a7;
  line-height: 38px;
}
.people {
  background: #fff;
}
.people .peopleItem {
  padding: 14px 10px;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
}
.ip{
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
