<template>
  <div class="newsbanner">
      <TopHeader></TopHeader>
      <div class="a">
            <div class="banner flex">
                <News></News>
                <div class="newsleft">
                    <Left></Left>
                    <div>11111</div>
                </div>
            </div>
      </div>
      <FooterNav></FooterNav>
  </div>
</template>
<script>
import TopHeader from "../../components/header.vue";
import FooterNav from "../../components/footer.vue";
import News from "../home/news";
import Left from "../../components/martket";
export default {
  components: {
    TopHeader,
    FooterNav,
    News,
    Left
  }
};
</script>
<style scoped>
.newsbanner .a{
    padding-bottom: 40px;
    background: url("../../assets/img/newsback.png") no-repeat 0 bottom /100%,
      #fff;

}
.banner {
  justify-content: space-between;
  margin: 0px auto;
  width: 1024px;
}
.market {
  margin-top: 20px;
}
.tittle li {
  padding: 0 9px;
}
</style>
