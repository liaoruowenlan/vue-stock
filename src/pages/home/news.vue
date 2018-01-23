<template>
  <div class="newsmust">
      <div class="top flex">
          <ul class="tittle flex">
            <li v-for="(item,index) in tittle" :key="index" @click="tittleClick(index)" :class="[active==index?'active':'']">{{item.name}}</li>
          </ul>
          <div class="refresh flex">
              <img src="../../assets/img/shuaxin.png" alt="">
              <span>刷新</span>
          </div>
      </div>
      <div class="newsItem">
          <ul>
              <li class="onenew" v-for="(item,index) in 6" :key="index">
                    <p class="flex">
                      <img src="../../assets/img/zixun-shijian.png" alt=""/>
                      <span>11:22:22</span>
                    </p>
                    <p class="newinfo">【一季度江苏工业景气调查出炉 宏观经济呈谨慎向好势头】由江苏省发改委、省信息中心联合开展的2018年一季度江苏工业景气调查最新出炉。调查涉及全省12个设区市的机械、电子、纺织、化工、食品、新能源、新材料、物联网、节能环保以及生物技术和新医药等新兴产业在内的40个行业。结果表明：2017年四季度，宏观经济环境景气值为0.31，景气度继续处于较为景气区间内，保持了平稳向好发展势头；预计今年一季度宏观经济环境和总体经营状况谨慎向好发展势头仍将延续。（新华日报）</p>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tittle: [{ name: "7*24" }, { name: "要闻" }],
      active: 0
    };
  },
  methods: {
    tittleClick(index) {
      this.active = index;
    }
  }
};
</script>
<style scoped>
.onenew{
    border-bottom: 1px dashed #ddd;
    padding: 8px 0;
}
.onenew p:first-child{
    justify-content: flex-start;
    align-items: center;
    line-height: 30px;
}
.onenew p:first-child img{
    width: 11px;
    height: 11px;
    margin-right: 8px;
}
.onenew p:first-child span{
    color: #ff7e45;
    font-size: 12px;
}
.newinfo{
    color: #1e242e;
    font-size: 14px;
}
.newsmust{
    margin: 20px auto;
    width: 1024px;
}
.newsItem{
    background: #fff;
    padding: 17px;
}
.top {
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  background: #fbfbfb;
}
.top .tittle li {
  line-height: 42px;
  padding: 0 50px;
  color: #687284;
  cursor: pointer;
  font-size: 16px;
}
.top .tittle1 li {
  padding: 0 10px;
}
.top .tittle li.active {
  color: #3e59a7;
  border-top: 2px solid #3e59a7;
  line-height: 38px;
}
.refresh {
  align-items: center;
}
.refresh img {
  width: 16px;
  height: 15px;
  margin-right: 7px;
}
.refresh span {
  color: #ff7e45;
}
</style>
