<template>
  <div class="newsmust">
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
.onenew,.focusnewsItem{
  cursor: pointer;
}
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
