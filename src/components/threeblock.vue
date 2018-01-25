<template>
  <div class="threeBlock">
        <ul class="top clearfix">
            <li v-for="(item,index) in title" :key="index" :class="[active==index?'active':'','fl']" @click="activeClick(index)">{{item.name}}</li>
        </ul>
        <ul class="bottom" v-if="active==0"  v-loading="loading">
            <router-link :to="{path:'/newDetail',query:{id:item.id}}" tag="li" class="clearfix" v-for="(item,index) in oneList" :key="index">
                <p class="fl left">{{item.title}}</p>
                <p class="fr right">{{item.createDate}}</p>
            </router-link>
        </ul>
        <ul class="bottom" v-if="active==1"  v-loading="loading">
            <li class="clearfix"  v-for="(item,index) in twoList" :key="index">
                <p class="fl left">冰雪经济靠滑雪难盈利，知名地产商入局也要卖房补血冰雪经济靠滑雪难盈利，知名地产商入局也要卖房补血</p>
                <p class="fr right">2018.01.23</p>
            </li>
        </ul>
        <div v-if="active==2" v-loading="loading">
          <el-collapse v-model="activeName" accordion >
              <el-collapse-item :title="'截止日期'+item.jiezhiriqi" :name="index+1"  v-for="(item,index) in threeList" :key="index">
                  <div class="clearfix">
                    <p><span>股票代码</span><span>{{item.stockCode}}</span></p>
                    <p><span>每股净资产</span><span>{{item.meigujinzichan||'--'}}</span></p>
                    <p><span>每股收益</span><span>{{item.meigushouyi||'--'}}</span></p>
                    <p><span>每股现金含量</span><span>{{item.meiguxianjinhanliang||'--'}}</span></p>
                    <p><span>每股资金公积金</span><span>{{item.meiguzibengongjijin||'--'}}</span></p>
                    <p><span>固定资产合计</span><span>{{item.gudingzichanheji||'--'}}</span></p>
                    <p><span>流动资产合计</span><span>{{item.liudongzichanheji||'--'}}</span></p>
                    <p><span>资产总计</span><span>{{item.zichanzongji||'--'}}</span></p>
                    <p><span>长期负债合计</span><span>{{item.changqifuzaiheji||'--'}}</span></p>
                    <p><span>主营业务收入</span><span>{{item.zhuyingyewushouru||'--'}}</span></p>
                    <p><span>财务费用</span><span>{{item.caiwufeiyong||'--'}}</span></p>
                    <p><span>净利润</span><span>{{item.jinlirun||'--'}}</span></p>
                  </div>
              </el-collapse-item>
          </el-collapse>
            <el-pagination
              layout="prev, pager, next"
              :size="pageSize"
              @current-change="change"
              :total="secondTotal">
            </el-pagination>
        </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  props: {
    code: [String, Number]
  },
  data() {
    return {
      title: [{ name: "新闻" }, { name: "简介" }, { name: "财务" }],
      active: 0,
      activeName: 0,
      secondTotal: 4,
      page: 0,
      pageSize: 4,
      type: ["stock_news", "company_profile", "financial_summary"],
      oneList: [],
      twoList: [],
      threeList: [],
      loading: false
    };
  },
  mounted() {
    this.getList();
  },
  watch: {
    code() {
      this.getList();
    }
  },
  methods: {
    change(val) {
      return;
    },
    activeClick(index) {
      this.activeName = 0;
      this.loading = true;
      this.active = index;
      this.getList();
    },
    getList() {
      var _this = this;
      this.$axios
        .get(
          "/strategist/crawler/selectData?" +
            qs.stringify({
              type: _this.type[_this.active],
              code: _this.code,
              page: _this.page,
              pageSize: _this.pageSize
            })
        )
        .then(res => {
          _this.loading = false;
          if (res.data.code == 200) {
            if (_this.active == 0) {
              _this.oneList = res.data.data;
            } else if (_this.active == 1) {
              _this.twoList = res.data.data;
            } else {
              _this.threeList = res.data.data;
            }
          }
        })
        .catch(res => {
          _this.loading = false;
          console.log(res);
        });
    }
  }
};
</script>

<style scoped>
.top {
  background: #fbfbfb;
}
.el-collapse-item__content  div{
  border-top: 1px solid #ddd
}
.el-collapse-item__content p {
  float: left;
  width: 50%;
}
.threeBlock{
  max-width: 748px;
}
.el-collapse-item__content p span:first-of-type{
  display: inline-block;
  color: #adb3c1;
  width: 100px;
}
.el-pagination {
  background: #fff;
}
.el-collapse {
  background: #fff;
}
.el-collapse-item {
  padding: 0 10px;
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
  cursor: pointer;
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
