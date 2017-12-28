<template>
    <div>
        <top-header :phone="phoneTran" :loginOpen="userOpen"></top-header>
        <section>
            <div>
                <div class="login-div">
                    <span v-model="spanValue"></span>
                    <div class="login-title">
                        <div class="login-title-left"></div>
                        <p>欢迎登录</p>
                        <div class="login-title-right"></div>
                    </div>
                    <div class="phone">
                        <p>手机号码</p>
                        <input type="text" v-model="phone.UserPhone" maxlength="11" @blur="blur()" autocomplete="off"/>
                        <div v-if="phone.PhoneReg">{{phone.PhoneMsg}}</div>
                    </div>
                    <div class="passworld">
                        <p>登陆密码</p>
                        <input type="password" v-model="Pwd.UserPwd" @keyup="change()" autocomplete="off"/>
                        <div v-if="Pwd.PwdReg">{{Pwd.PwdMsg}}</div>
                    </div>
                    <input :class="btnUp?'addColor':''" type="button" value="登陆" class="login-btn" @click="login"/>
                    <div class="login-operation">
                        <a href="#/reset">
                            忘记密码
                        </a>
                        <a href="#/register">
                            注册账号
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import TopHeader from '../../components/header.vue'
    import FooterNav from '../../components/footer.vue'
    import axios from "axios"
    import qs from 'qs'

    export default {
        name: "login",
        components: {
            TopHeader,
            FooterNav
        },
        data() {
            return {
                phone:{
                  UserPhone:"",
                  PhoneMsg:"*请检查您登陆号码",
                  PhoneReg:""
                },
                Pwd:{
                    UserPwd:"",
                    PwdMsg:"*账号或密码错误，请仔细核对",
                    PwdReg:""
                },
                btnUp: false,
                phoneTran: '',
                userOpen:''
            }
        },
        computed: {
          spanValue: function() {
              console.log(1);
              if(this.phone.UserPhone.length > 0 && this.Pwd.UserPwd.length > 0){
                  this.btnUp = true;
              } else {
                  this.btnUp = false;
              }
          }
        },
        methods: {
            change() {
                this.phone.PhoneReg = false;
            },
            blur() {
                this.phone.PhoneReg = this.phone.UserPhone.trim() != '' && !(/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone.UserPhone));
            },
            login(){
                var _this = this;
                axios.post('/strategist/login', qs.stringify({
                    phone: this.phone.UserPhone,
                    password: this.Pwd.UserPwd
                }))
                .then(function(res){
                    if(res.data.code!=200){
                        _this.Pwd.PwdReg = true;
                        return false;
                    }
                    console.log(res.data);
                    console.log(res.data.result.id);
                    console.log(res.data.result.token);
                    sessionStorage.setItem("token",res.data.result.token);
                    sessionStorage.setItem("phone", _this.phone.UserPhone);
                    sessionStorage.setItem('id',res.data.result.id);
                    _this.$children[0].refreshUserInfo();
                    _this.$router.push({ path: 'myaccount' });
                    // 修改header data
                })
                .catch(function(err){
                    console.log(err);
                })
            }
        }
    }
</script>
<style scoped>
    section {
        background: url("../../assets/img/bg.png") no-repeat;
        background-size: 100% 100%;
        height: 480px;
    }

    section > div {
        width: 1024px;
        margin: 0 auto;
    }
    .addColor{
        background:#ee8354 !important;
        color: #fff;
    }

    .login-div {
        width: 374px;
        height: 346px;
        background: #fff;
        float: right;
        margin-top: 42px;
        position: relative;
    }

    .phone, .passworld {
        position: relative;
    }

    .phone > div, .passworld > div {
        position: absolute;
        bottom: -21px;
        color: #e26042;
        font-size: 12px;
        left: 110px;
    }

    .phone {
        margin-top: 28px;
        margin-bottom: 37px;
    }

    .phone p, .passworld p {
        margin-left: 42px;
        font-size: 14px;
        color: #687284;
        float: left;
        margin-right: 10px;
        line-height: 32px;
    }

    .phone input, .passworld input {
        width: 212px;
        height: 28px;
        line-height:28px;
    }

    .login-title {
        text-align: center;
        font-size: 18px;
        color: #1e242e;
    }

    .login-title > div {
        position: absolute;
        top: 45px;
        height: 1px;
        width: 80px;
        background: #1e242e;
    }

    .login-title-left {
        left: 45px;
    }

    .login-title-right {
        right: 45px;
    }

    .login-title p {
        margin-top: 32px;
    }

    .login-btn {
        width: 260px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #fff;
        background: #f9d9cb;
        border: 0;
        margin-left: 54px;
        margin-top: 46px;
    }

    .login-operation {
        width: 260px;
        margin-left: 54px;
        margin-top: 8px;
    }

    .login-operation > a:first-child {
        font-size: 12px;
        color: #3db3c1;
        text-decoration: underline;
        float: left;
    }

    .login-operation > a:last-child {
        font-size: 12px;
        color: #ee8354;
        float: right;
    }
</style>