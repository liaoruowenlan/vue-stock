<template>
    <header class="nav">
        <div class="logo">
            <img src="../assets/img/logo.png" />
        </div>
        <div class="Tlogo-nav">
            <ul id="warp">
                <li class="" v-for="(item,index) in navLists" :key="index"><router-link :to="item.url" active-class="bote">{{item.text}}</router-link></li>
            </ul>
        </div>
        <div class="nav-login">
            <ul v-if="!loginOpen">
                <li>
                    <router-link to="/register">注册</router-link>
                </li>
                <li class="border"></li>
                <li>
                    <router-link to="/login">登录</router-link>
                </li>
            </ul>
            <div v-if="loginOpen" class="loginitem">
                欢迎回来，<a href="javascript:;">{{phone}}</a>
                <div class="signout" @click="signout">退出登录</div>
            </div>
            <div>
                    <img src="../assets/img/help.png" class="help-img" />
                &nbsp;<router-link class="help" to="/help">帮助中心</router-link>
            </div>
        </div>
    </header>
</template>

<script>
export default {
  // name: "header",
  data() {
    return {
      navLists: [
        {
          text: "首页",
          url: "/home"
        },
        {
          text: "行情",
          url: "/quotation"
        },
        {
          text: "持仓",
          url: "/position"
        },
        {
          text: "咨询",
          url: "/news"
        },
        {
          text: "APP",
          url: "/app"
        },
        {
          text: "我的",
          url: "/myaccount"
        }
      ],
      phone: "",
      loginOpen: false
    };
  },
  mounted: function() {
    this.refreshUserInfo();
    // var token = localStorage.getItem("token");
    // if(!token){
    //     this.$router.push({ path: 'myaccount' });
    // }
    // 获取token信息，没有就设置总开关、
    //
  },
  methods: {
    signout() {
      this.$confirm("是否退出", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.clear();
          this.loginOpen = false;
          this.$router.push("/home");
        })
        .catch(() => {});
    },
    refreshUserInfo: function() {
      var phone = localStorage.getItem("phone");
      if (phone) {
        this.loginOpen = true;
        this.phone = phone.substring(0, 3) + "****" + phone.substring(7);
      }
    }
  }
};
</script>

<style scoped>
.loginitem {
  position: relative;
}
.loginitem:hover a {
  color: #ff7e45;
}
.loginitem:hover .signout {
  display: block;
}
.signout {
  position: absolute;
  z-index: 99;
  color: #687284;
  right: -10px;
  top: 58px;
  display: none;
  height: 40px;
  width: 100px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.signout:after {
  display: block;
  content: "";
  width: 8px;
  height: 8px;
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
  background: #fff;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  position: absolute; /*绝对定位1*/
  top: -5px;
  left: 46px;
}
.nav {
  width: 1024px;
  margin: 0 auto;
  height: 80px;
  background: #fff;
}
.help {
  font-size: 14px;
}
.logo {
  float: left;
  width: 338px;
  height: 52px;
  margin: 14px 0;
}

.logo > img {
  width: 320px;
  height: 44px;
}

.Tlogo-nav {
  float: left;
}

.Tlogo-nav ul {
  margin: 25px 0;
  height: 30px;
}

.Tlogo-nav ul li {
  float: left;
  width: 68px;
  text-align: center;
  font-size: 16px;
  color: #687284;
  /* margin-left: 10px; */
}
.Tlogo-nav ul li a {
  color: #687284;
}
.bote {
  color: #3e59a7;
  border-bottom: 4px solid #3e59a7;
}
.logo-nav ul li:hover {
  color: #3e59a7 !important;
  border-bottom: 4px solid #3e59a7;
}
.logo-nav ul li a:hover {
  color: #3e59a7 !important;
  border-bottom: 4px solid #3e59a7;
}

.nav-login {
  float: right;
  height: 80px;
}

.nav-login > ul > li {
  float: left;
  font-size: 14px;
  margin: 30px 0;
  color: #687284;
}
.nav-login > ul > li a {
  color: #687284;
}
.nav-login > ul {
  height: 80px;
  float: left;
}
.nav-login > ul > li a:hover {
  color: #ff7e45;
}
.nav-login > div a {
  color: #687284;
}
.nav-login > div:last-child {
  float: right;
  height: 80px;
  line-height: 72px;
  margin-left: 20px;
}
.nav-login > div:first-child {
  float: left;
  line-height: 73px;
  font-size: 14px;
  color: #687284;
}
.border {
  width: 1px;
  background: #dcdee3;
  height: 21px;
  margin: 30px 10px !important;
}
.help-img {
  display: inline-block;
  vertical-align: text-bottom;
  margin-top: -3px;
}
.logo-nav ul li:last-child a {
  padding: 0 0 !important;
}
</style>