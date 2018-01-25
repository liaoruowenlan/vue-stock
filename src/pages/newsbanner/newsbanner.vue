<template>
  <div class="newsbanner">
      <TopHeader></TopHeader>
      <div class="a">
            <div class="banner flex">
                <News></News>
                <div class="newsleft">
                    <Left></Left>
                    <Advertisement pos="left"></Advertisement>
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
import Advertisement from '../../components/advertisement'
export default {
  components: {
    TopHeader,
    FooterNav,
    News,
    Left,
    Advertisement
  }
};
</script>
<style scoped>
	.newsleft{
		margin-left: 10px;
	}
.newsbanner .a{
    padding-bottom: 40px;
    background: url("../../assets/img/newsback.png") no-repeat 0 bottom /100%,
      #f7f7f7;

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
