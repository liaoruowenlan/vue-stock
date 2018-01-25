<template>
  <div class="advertisement">
      <span>广告</span>
      <img src="../assets/img/topbanner.png" alt="" :class="[pos=='left'?'left':'contian']">
  </div>
</template>
<script>
export default {
  props:{
      pos:String
  }
}
</script>
<style scoped>
.advertisement{
    position: relative;
}
.advertisement span{
    position: absolute;
    border: 1px solid #fff;
    font-size: 14px;
    top: 6px;
    right: 10px;
    padding: 2px;
    color: #fff;
    border-radius: 3px;
}
.advertisement .left{
    width: 154px;
    height: 300px;
}
.advertisement .contian{
    width: 1024px;
    height: 128px;
}
</style>
