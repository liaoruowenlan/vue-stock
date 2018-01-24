<template>
  <div class="threeBlock">
        <ul class="top clearfix">
            <li v-for="(item,index) in title" :key="index" :class="[active==index?'active':'','fl']" @click="activeClick(index)">{{item.name}}</li>
        </ul>
        <ul class="bottom" v-if="active==0">
            <li class="clearfix">
                <p class="fl left">冰雪经济靠滑雪难盈利，知名地产商入局也要卖房补血</p>
                <p class="fr right">2018.01.23</p>
            </li>
        </ul>
        <ul class="bottom" v-if="active==1">
            <li class="clearfix">
                <p class="fl left">冰雪经济靠滑雪难盈利，知名地产商入局也要卖房补血冰雪经济靠滑雪难盈利，知名地产商入局也要卖房补血</p>
                <p class="fr right">2018.01.23</p>
            </li>
        </ul>
        <el-collapse v-model="activeName" accordion  v-if="active==2">
            <el-collapse-item title="一致性 Consistency" name="1">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback" name="2">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
        </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: [{ name: "新闻" }, { name: "简介" }, { name: "财务" }],
      active: 0,
      activeName:1,
    };
  },
  methods: {
    activeClick(index) {
      this.active = index;
    }
  }
};
</script>

<style scoped>
.el-collapse{
    background: #fff;
}
.el-collapse-item{
    padding: 0 10px
}
.right {
  font-size: 12px;
  color: #adb3c1;
}
.left {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 600px;
  font-size: 14px;
  color: #1e242e;
}
.threeBlock {
  padding: 20px 0;
}
.bottom {
  margin-top: 8px;
  background: #fff;
  padding: 8px 20px;
}
.bottom li {
  padding: 10px 0;
  border-bottom: 1px dashed #ddd;
}
.threeBlock .top li {
  width: 100px;
  text-align: center;
  line-height: 34px;
  color: #687284;
  font-size: 12px;
  cursor: pointer;
}
.threeBlock .top li.active {
  color: #3e59a7;
  border-top: 2px solid #3e59a7;
  line-height: 30px;
}
</style>
