<template>
  <div class="mask" v-if="show">
      <div class="main">
          <div class="top flex">
              <p class="top_l"><span class="name">{{maskInfo.stockName}}</span>&nbsp;<span class="code">{{maskInfo.stockCode}}</span></p>
              <p class="top_r"><span class="price">{{maskInfo.lastPrice}}</span></p>
          </div>
          <div class="middle">
              <p>
                  <span>卖出数量</span>&nbsp;&nbsp;&nbsp;
                  <span class="blue">{{maskInfo.numberOfStrand}}股</span>
                    <span class="space"></span>
                  <span>浮动盈亏</span>&nbsp;&nbsp;&nbsp;
                  <span class="blue">{{maskInfo.profitOrLoss}}元</span>
              </p>
              <p>
                  <span>持仓天数</span>&nbsp;&nbsp;&nbsp;
                  <span class="blue">{{createTime}}天</span>
              </p>
          </div>
		  <div class="middle1">
			  <button @click="close">取消</button>
			  <button class="query" @click="sellOut">确认</button>
		  </div>
      <div class="info flex">
          <img src="../assets/img/Group.png">
          <p>点卖指令可能因跌停导致无法成交，默认至下一个交易日挂单交易。浮动盈亏仅供参考，具体以实际成交为准</p>
      </div> 
      </div>
  </div>
</template>
<script>
export default {
  props: {
    maskInfo: {
      type: Object
    },
    show: {
      type: Boolean
    },
    createTime: {
      type: [String,Number]
    }
  },
  methods: {
    close(){
      this.$emit("close");
    },
    sellOut(){
      this.$axios.post('/strategist/buyRecord/sellapply/'+this.maskInfo.id).then((res)=>{
        this.$emit("close");
        this.$alert(res.data.message, '提示', ) 
      }).catch((res)=>{
        this.$emit("close");        
      })
    }
  }
};
</script>
<style scoped>
.info {
  justify-content: center;
  height: 32px;
  color: #e26042;
}
.info img {
  width: 24px;
  height: 24px;
  display: block;
  margin-top: 5px;
  margin-right: 8px;
}
.info p {
  font-size: 12px;
  width: 306px;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
}
.mask .top {
  /* justify-content: space-around; */
  padding-left: 70px;
  line-height: 50px;
}
.mask .top .top_l {
  margin-right: 64px;
}
.name {
  font-size: 22px;
  color: #3e59a7;
}
.middle1 {
  padding: 20px;
  text-align: center;
  letter-spacing: 26px;
}
.middle1 button {
  outline: none;
  border: none;
  width: 180px;
  height: 38px;
  background-color: #ffffff;
  color: #818081;
  border: solid 1px #979797;
}
.code {
  font-size: 14px;
  color: #3e59a7;
  vertical-align: bottom;
}
.middle {
  padding-bottom: 28px;
  border-bottom: 1px dashed #ddd;
}
.middle1 .query {
  background-color: #ee8354;
  border: none;
  color: #fff;
}
.price {
  color: #ee8354;
  font-weight: bold;
  font-size: 22px;
}
.blue {
  color: #3e59a7;
}
.middle p {
  line-height: 30px;
  padding-left: 70px;
  font-size: 14px;
  color: #687284;
}
.main {
  height: 333px;
  width: 800px;
  background: #fff;
  position: absolute;
  top: 50%;
  margin-top: -162px;
  left: 50%;
  margin-left: -400px;
  box-sizing: border-box;
  padding: 30px 160px;
}
.space {
  display: inline-block;
  width: 70px;
}
</style>
