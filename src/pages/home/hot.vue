<template>
    <div class="hot">
        <ul class="tittle clearfix">
            <li :class="[active==index?'active':'','fl']" v-for="(item,index) in tittle" :key="index" @click="tittleClick(index)">{{item.name}}</li>
        </ul>
        <ul class="section" v-for="(item,index) in 8" :key="index">
            <li class="item flex">
                <div class="one">
                    <span class="name">万科A</span>
                    <span class="code">000002</span>
                </div>
                <div class="two">
                    <span class="status">卖出</span>
                </div>
                <div class="three">
                    <span class="ip">123****3421</span>
                </div>
                <div class="fore">
                    <span class="money">盈利 1355.80元</span>
                </div>
                <div class="five">
                    <button>点买</button>
                </div>
            </li>
        </ul>
        <el-pagination
            layout="prev, pager, next"
            :total="50">
        </el-pagination>
    </div>
</template>
<script>
export default {
  data () {
      return {
          tittle:[
              {
                  name:'交易动态',
              },
              {
                  name:'热门股票',
              }
          ],
          active:0
      }
  },
  methods: {
      tittleClick(index){
          this.active = index
      }
  }
}
</script>
<style scoped>
.el-pagination{
    background: #fff;
}
.hot{
    width: 748px;
}
.hot .tittle{
    text-align: center;
    width: 100%;
    background: #fbfbfb;
}
.hot .tittle li{
    box-sizing: border-box;
    line-height: 42px;
    width: 120px;
    cursor: pointer;
    color: #687284;
}
.hot .tittle .active{
    color: #3e59a7;
    line-height: 40px;
    border-top: 1px solid #3e59a7;
}
.section{
    background: #fff;
    padding: 4px 0px;
}
.section .one{
    width: 140px;
}
.section .two{
    font-size: 12px;
    border: 1px solid #ff7e45;
    display: inline-block;
    width: 36px;
    height: 18px;
    text-align: center;
    color: #ff7e45;
}
.section .three{
    color: #687284;
}
.section .fore{
    color:#ea523b;
    font-size: 14px; 
}
.section .item{
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px dashed #dcdee3;
}
.section .item:last-child{
    /* border: none; */
}
.section .name{
    font-size: 18px;
    color: #1e242e;
}
.section .code{
    font-size: 12px;
    color: #adb3c1;
}
.five button{
     width: 96px;
  height: 28px;
  background-color: #ff7e45;
  border: none;
  outline: none;
  color: #fff;
}
</style>
