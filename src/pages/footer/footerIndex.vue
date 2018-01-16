<template>
  <div class="width100">
      <Header></Header>
      <div class="position-right">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
      <Footer></Footer>
  </div>

</template>
<script>
import Header from "../../components/header";
import Footer from "../../components/footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>