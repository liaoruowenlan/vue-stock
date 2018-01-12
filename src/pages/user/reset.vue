<template>
    <div v-model="spanValue">
        <top-header></top-header>
        <section>
            <div>
                <div class="login-div">
                    <div class="login-title">
                        <div class="login-title-left"></div>
                        <p>重置密码</p>
                        <div class="login-title-right"></div>
                    </div>
                    <div class="phone">
                        <p>手机号码</p>
                        <input type="text" v-model="phone.userPhone"  MAXLENGTH="11" @blur="blur()"/>
                        <div v-if="phone.phoneReg">{{phone.phoneMsg}}</div>
                    </div>
                    <div class="AuCode">
                        <p class="mr24">验证码</p>
                        <input type="text" v-model="AuCode.userAcd" maxlength="4"  />
                        <span v-show="show" :class="this.AuCode.AuCodeUp?'addColor':''" @click="getAuCode()">获取验证码</span>
                        <span class="addColor" v-show="!show">{{count}}s</span>
                        <div v-if="AuCode.AuCodeReg">{{AuCode.AuCodeMeg}}</div>
                    </div>
                    <div class="passworld">
                        <p>登陆密码</p>
                        <input type="password" v-model="password.userPwd" ref="passwordInput" />
                        <img :src="imgSrc"  @click="changePasswordType()"/>
                        <div v-if="password.Pwdreg">{{password.phoneMsg}}</div>
                    </div>
                    <input type="button" value="确定" class="login-btn"  :class="btnUp?'addColor':''" @click="resetPwd()"  />
                </div>
            </div>
        </section>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import TopHeader from '../../components/header.vue'
    import FooterNav from '../../components/footer.vue'
    import axios from 'axios'
    import qs from 'qs'
    export default {
        name: "reset",
        components: {
            TopHeader,
            FooterNav
        },
        data(){
            return{
                phone:{
                    userPhone:"",
                    phoneReg:"",
                    phoneMsg:"*请检查手机号码格式"
                },
                password:{
                    userPwd:"",
                    Pwdreg:"",
                    phoneMsg:"*账号或密码错误，请仔细核对"
                },
                AuCode:{
                    userAcd:"",
                    AuCodeReg:"",
                    AuCodeMeg:"*验证码有误，请重新输入",
                    AuCodeUp:""
                },
                btnUp:"",
                count:"",
                show: true,
                timer: null,
                imgSrc:'../src/assets/img/dl-yincang@2x.png'
            }
        },
        computed:{
            spanValue:function () {
                this.btnUp = this.phone.userPhone.length > 0 && this.password.userPwd.length > 0 && this.AuCode.userAcd.length > 0;
                this.AuCode.AuCodeUp = /^1[3|4|5|7|8][0-9]{9}$/.test(this.phone.userPhone);
                this.AuCode.AuCodeReg = false;
                this.password.Pwdreg = false;
                this.phone.phoneReg = false;
            }
        },
        mounted: function () {

        },
        methods: {
            resetPwd(){
                var _this = this;
                axios.post('/strategist/publisher/modifyPassword', qs.stringify({
                    phone: this.phone.userPhone,
                    password: this.password.userPwd,
                    verificationCode:this.AuCode.userAcd
                }))
                .then(function(res){
                    if(res.data.code!=200){
                        _this.password.PwdReg = true;
                        _this.AuCode.AuCodeReg=true;
                        return false;
                    }else if(res.data.code==200){
                        sessionStorage.setItem("token",res.data.result.token);
                        sessionStorage.setItem("phone", _this.phone.userPhone);
                        sessionStorage.setItem('id',res.data.result.id);
                         _this.$router.push({ path: 'home' });
                    }
                })
                .catch(function(err){
                    console.log(err);
                })
            },
            changePasswordType() {
                var origin = this.$refs.passwordInput.type;
                this.$refs.passwordInput.type = origin == "password" ? "text" : "password";
                this.imgSrc = this.imgSrc=="../src/assets/img/dl-yincang@2x.png"?this.imgSrc="../src/assets/img/show@2x.png":this.imgSrc="../src/assets/img/dl-yincang@2x.png";
            },
            blur(){
                this.phone.phoneReg = this.phone.userPhone.trim() != '' && !(/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone.userPhone));
            },
            reset(){

            },
            getAuCode(){
                if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone.userPhone)){
                    return false;
                }
                var _this = this;
                axios.post("/strategist/publisher/sendSms",qs.stringify({
                    phone:_this.phone.userPhone,
                    type:2
                }))
                    .then(function(res){
                        if(res.data.code==2004){
                            _this.phone.phoneMsg = '该用户尚未注册。正在跳转注册页面中';
                            _this.phone.phoneReg = true;
                            _this.$message({
                                message: '该用户尚未注册。正在跳转注册页面中',
                                type: 'warning',
                                customClass:'noreset',
                                center:true,
                                duration:'3000',
                                onClose:function(){
                                    _this.$router.push({ path: 'register' });
                                }
                            });
                            return false;
                        }
                        const TIME_COUNT = 60;
                        if (!_this.timer) {
                            _this.count = TIME_COUNT;
                            _this.show = false;
                            _this.timer = setInterval(() => {
                                if (_this.count > 0 && _this.count <= TIME_COUNT) {
                                    _this.count--;
                                } else {
                                    _this.show = true;
                                    clearInterval(_this.timer);
                                    _this.timer = null;
                                }
                            }, 1000)
                        }
                    }).catch(function(err){
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .noreset{
        margin-top: 20% !important;
    }
    section {
        background: url("../../assets/img/bg.png") no-repeat;
        background-size: 100% 100%;
        height: 480px;
    }
    .addColor{
        background:#ee8354 !important;
        color: #fff !important;
    }
    section > div {
        width: 1024px;
        margin: 0 auto;
    }

    .passworld img {
        width: 16px;
        height: 7.5px;
        position: absolute;
        right: 66px;
        top: 12px;
    }

    .passworld img:hover {
        cursor: pointer;
    }

    .login-div {
        width: 374px;
        height: 382px;
        background: #fff;
        float: right;
        margin-top: 42px;
        position: relative;
    }
    .AuCode span{
        display: block;
        width: 68px;
        height: 20px;
        color: #adb3c1;
        font-size: 12px;
        text-align: center;
        background:#f7f7f7 ;
        border: 0;
        position: absolute;
        right: 60px;
        top: 6px;
        line-height: 20px;
        cursor: pointer;
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
        margin-top: 35px;
    }

    .phone, .passworld, .AuCode {
        position: relative;
    }

    .phone > div, .passworld > div, AuCode > div {
        position: absolute;
        bottom: -21px;
        color: #e26042;
        font-size: 12px;
        left: 110px;
    }

    .phone {
        margin-top: 23px;
        margin-bottom: 28px;
    }

    .mr24 {
        margin-right: 24px !important;
    }

    .phone p, .passworld p, .AuCode p {
        margin-left: 42px;
        font-size: 14px;
        color: #687284;
        float: left;
        margin-right: 10px;
        line-height: 32px;
    }

    .AuCode {
        margin-bottom: 33px;
    }

    .phone input, .passworld input, .AuCode input {
        width: 212px;
        height: 28px
    }

    button {
        width: 68px;
        height: 20px;
        color: #adb3c1;
        font-size: 12px;
        text-align: center;
        background: #f7f7f7;
        border: 0;
        position: absolute;
        right: 60px;
        top: 6px;
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
