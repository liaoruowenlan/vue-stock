<template>
  <div class="newsmust">
    <!-- <el-autocomplete
      class="inline-input"
      v-model="state1"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete> -->
      <div class="top flex">
          <ul class="tittle flex">
            <li v-for="(item,index) in tittle" :key="index" @click="tittleClick(index)" :class="[active==index?'active':'']">{{item.name}}</li>
          </ul>
          <div class="refresh flex" @click="refresh">
              <img src="../../assets/img/shuaxin.png" alt="">
              <span>刷新</span>
          </div>
      </div>
      <div class="newsItem" v-if="active==0" v-loading="loading">
          <ul>
              <li class="onenew" v-for="(item,index) in newsItemList" :key="index">
                    <p class="flex">
                      <img src="../../assets/img/zixun-shijian.png" alt=""/>
                      <span>{{item.createTime}}</span>
                    </p>
                    <p class="newinfo">{{item.brief}}</p>
              </li>
          </ul>
      </div>
      <div class="focusnews" v-if="active==1"  v-loading="loading">
        <ul>
          <li  class="focusnewsItem flex" v-for="(item,index) in focusnewsList" :key="index" @click="goDetail(item.id)">
            <img :src="item.coverUrl||'../../assets/img/news.png'">
            <div>
              <p class="til">{{item.title}}</p>
              <p class="time">{{item.createTime}}</p>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      restaurants: [],
      state1: "",
      tittle: [{ name: "7*24" }, { name: "要闻" }],
      active: 0,
      page:0,
      focusnewsList:[],
      newsItemList:[],
      loading:false
    };
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.getFocusnews();
    this.getnewsItem();
  },
  methods: {
    goDetail(id){
      this.$router.push({path:'newDetail',query:{id:id}})
    },
    tittleClick(index) {
      this.loading = true;      
      this.active = index;
      if(this.active==0){
        this.getnewsItem()
      }else{
        this.focusnewsList = []
        this.getFocusnews()
      }
    },
    refresh(){
      this.loading = true;
        if(this.active==0){
          this.getnewsItem()
        }else{
          this.getFocusnews()
        }
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层"
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺"
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819"
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
        },
        { value: "枪会山", address: "上海市普陀区棕榈路" },
        { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { value: "钱记", address: "上海市长宁区天山西路" },
        { value: "壹杯加", address: "上海市长宁区通协路" },
        {
          value: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
        },
        { value: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          value: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
        },
        {
          value: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6"
        },
        {
          value: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号"
        },
        { value: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { value: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          value: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号"
        },
        { value: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { value: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          value: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室"
        },
        {
          value: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部"
        },
        { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { value: "浏阳蒸菜", address: "天山西路430号" },
        { value: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          value: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室"
        },
        { value: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号"
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼"
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
        }
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    getnewsItem(){
      var _this = this
      this.$axios
        .get(
          "/strategist/crawler/informationData?page=" + this.page + "&pageSize=10"
        )
        .then(results => {
      _this.loading = false;
          
          var data = results.data
          if(data.code ==200){
            _this.newsItemList = data.data
          }
        }).catch((res)=>{
          console.log(res)
        });
    },
    getFocusnews() {
      var _this = this
      this.$axios
        .get(
          "/strategist/crawler/importantNews?page=" + this.page + "&pageSize=10"
        )
        .then(results => {
          setTimeout(() => {
          _this.loading = false;
            
          }, 1000);
            var data = results.data
            if(data.code ==200){
              _this.focusnewsList = data.data
            }
          
        }).catch((res)=>{
          console.log(res)
        });
    }
  }
};
</script>
<style scoped>
.focusnews .focusnewsItem .time {
  font-size: 12px;
  color: #adb3c1;
  margin-top: 10px;
}
.focusnews .focusnewsItem .til {
  font-size: 18px;
  color: #1e242e;
}
.focusnews .focusnewsItem {
  justify-content: flex-start;
}
.focusnews li {
  padding: 9px 0;
  border-bottom: 1px dashed #ddd;
}
.focusnews img {
  width: 144px;
  height: 102px;
  margin-right: 21px;
}
.focusnews ul{
  padding: 0 8px;
}
.focusnews {
  background: #fff;
  min-height: 600px;
  padding: 0 14px;
}
.onenew {
  border-bottom: 1px dashed #ddd;
  padding: 8px 0;
}
.onenew p:first-child {
  justify-content: flex-start;
  align-items: center;
  line-height: 30px;
}
.onenew p:first-child img {
  width: 11px;
  height: 11px;
  margin-right: 8px;
}
.onenew p:first-child span {
  color: #ff7e45;
  font-size: 12px;
}
.newinfo {
  color: #1e242e;
  font-size: 14px;
}
.newsmust {
  margin: 20px auto;
  /* width: 100%; */
  flex-grow:1;
}
.newsItem {
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
  cursor: pointer;
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
