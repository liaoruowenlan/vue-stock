<template>
  <div class="main">
      <TopHeader></TopHeader>
      <div class="banner">
        <h3>{{data.title}}</h3>
        <p class="time">{{data.createTime}}</p>
        <div v-html="data.content" class="content" ref="content"></div>
      </div>
        <FooterNav></FooterNav>
  </div>
</template>
<script>
import qs from "qs";
import TopHeader from "../../components/header.vue";
import FooterNav from "../../components/footer.vue";
export default {
  data() {
    return {
      data: {
        title: "",
        createTime: "",
        content: ""
      }
    };
  },
  components: {
    TopHeader,
    FooterNav
  },
  mounted() {
    console.log(this.$route.query.id);
    if (this.$route.query.id != "") {
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      var _this = this;
      this.$axios
        .get(
          "/strategist/crawler/dailyReportDetail?" +
            qs.stringify({
              id: this.$route.query.id
            })
        )
        .then(res => {
          if (res.data.code == 200) {
            _this.data = res.data.data;
          }
        });
    }
  },
  updated () {
      console.log(this.$refs.content.children)
      var children = this.$refs.content.children || []
      for(let i=0;i<children.length;i++){
          children[i].style.margin="10px 0"
          children[i].style.textIndent="24px"
      }
    //   this.$refs.content.children.style.margin="10px 0"
  }
};
</script>
<style scoped>
.main{
    /* background: #f0f3fa; */
}
.banner {
  width: 1024px;
  margin: 20px auto;
  padding: 8px;
  background: #fff;
}
.banner h3{
    font-size: 22px;
    color: #1e242e;
    font-weight: normal;
    margin-bottom: 6px;
}
.time{
    font-size: 12px;
    color: #adb3c1;
}
.content p{
    margin: 10px 0 !important;
}
</style>
