<template>
  <div class="mask" v-show="show">
      <div class="main">
          <h2>中国中铁</h2>
          <ul class="firstUl">
              <li  v-for="(item,index) in dataList" :key="index" class="topone clearfix">
                  <span class="label fl">点买类型</span>
                  <ul class="toptwo fr clearfix" ref="toptwo">
                      <li :class="index1==index?'active fl':'fl'" @click="click(index)">{{item.name}}</li>
                  </ul>
              </li> 
              <li class="topone clearfix">
                  <span class="label fl">点买类型</span>
                  <div>100股</div>
              </li>
          </ul>
          <ul class="secondUl">
            <li class="delayed">
              <el-checkbox  v-model="checked" >递延费到期自动支付</el-checkbox>
            </li>
            <li class="buyNow">
              <button>立即点买</button>
            </li>
            <li class="info">
              交易时间 09:30-11:30 13:30-14:50
            </li>
          </ul>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Array
    }
  },
  data() {
    return {
      index1: 0,
      color1: "",
      checked: false
    };
  },
  methods: {
    click(index) {
      this.index1 = index;
    }
  }
};
</script>
<style scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  top: 0;
  left: 0;
}
.mask .main {
  width: 800px;
  height: 678px;
  position: absolute;
  background-color: #ffffff;
  left: 50%;
  margin-left: -339px;
  top: 50%;
  margin-top: -400px;
  padding: 30px 140px;
  box-sizing: border-box;
}
.mask .main h2 {
  line-height: 50px;
  font-family: MicrosoftYaHei;
  font-size: 22px;
  text-align: center;
  color: #1e242e;
  font-weight: normal;
  border-bottom: 1px solid #ece7e7;
  margin-bottom: 20px;
}
.firstUl li:last-child {
  border: none;
}
.topone {
  border-bottom: 1px dashed #ece7e7;
  padding: 10px 0;
}
.toptwo {
  width: 84%;
}
.topone .label {
  font-size: 14px;
  display: inline-table;
  line-height: 20px;
  color: #687284;
  margin-right: 20px;
  margin-top: 2px;
  width: 56px;
}
.toptwo li {
  display: inline-block;
  width: 70px;
  height: 24px;
  border: solid 1px #dee0e4;
  text-align: center;
  margin-right: 30px;
  margin-bottom: 12px;
}
li.active {
  background-color: #ee8354;
  border: solid 1px #ee8354;
  color: #fff;
}
.secondUl li {
  padding: 10px 0;
}
.delayed {
  text-align: right;
}
.buyNow {
  text-align: center;
}
.secondUl button {
  width: 400px;
  height: 42px;
  background-color: #ee8354;
  border: none;
  outline: none;
  color: #fff;
  font-size: 16px;
}
li.info {
  font-size: 12px;
  color: #b2b0b3;
  padding: 0;
  text-align: center;
}
</style>
