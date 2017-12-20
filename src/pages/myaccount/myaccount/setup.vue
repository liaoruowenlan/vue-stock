<template>
    <div class="user_div" v-model="spanval">
        <div>
            <p>
                <img src="../../../assets/img/money.png"/>
                <span>登陆密码</span>
                <a @click="login">修改></a>
            </p>
            <div class="login1passWorld" v-if="oldpassworld.passOpen">
                <div>
                    <div>原密码</div>
                    <div>
                        <input v-model="oldpassworld.loginpass" type="password" placeholder="  请输入原密码"/>
                    </div>
                </div>
                <div>
                    <div>新密码</div>
                    <div>
                        <input v-model="oldpassworld.newloginpass" type="password" placeholder="  请输入新密码"/>
                    </div>
                </div>
                <section>
                    <div>确定</div>
                    <div class="bgcolor" @click="hide">取消</div>
                </section>
            </div>
        </div>
        <i></i>
        <div>
            <p>
                <img src="../../../assets/img/psw.png"/>
                <span>支付密码</span>
                <a @click="paylogin">修改></a>
            </p>
            <div class="pass" v-if="newPay.payOen">
                <div class="pass1">
                    <div>手机号码</div>
                    <div>
                        <input v-model="newPay.Phone" type="text" placeholder="请输入手机号码" @blur="blur()"/>
                    </div>
                    <div v-show="newPay.PhoneReg">*请检查账号格式</div>
                </div>
                <div class="pass2">
                    <div>验证码</div>
                    <div class="aucode">
                        <input type="text" maxlength="4" v-model="newPay.Aucode" />
                        <span v-show="show" @click="getAuCode" :class="this.newPay.AuCodeAdd?'addColor':''">获取验证码</span>
                        <span class="addColor" v-show="!show">{{count}}s</span>
                    </div>
                </div>
                <div class="pass3">
                    <div>新密码</div>
                    <div>
                        <input type="password" maxlength="6" v-model="newPay.PassWorld"/>
                    </div>
                </div>
                <section>
                    <div>确定</div>
                    <div class="bgcolor" @click="hide">取消</div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'


    export default {
        name: "setup",
        data() {
            return {
                oldpassworld:{
                    loginpass:'',
                    newloginpass:'',
                    passOpen:''
                },
                newPay:{
                    Phone:'',
                    Aucode:'',
                    AuCodeAdd:'',
                    payOen:'',
                    PassWorld:'',
                    PhoneReg:'',
                },
                count:"",
                timer: null,
                show: true
            }
        },
        computed:{
            spanval:function(){
                this.newPay.AuCodeAdd = /^1[3|4|5|7|8][0-9]{9}$/.test(this.newPay.Phone);
            }
        },
        methods: {
            blur(){
                this.newPay.PhoneReg = this.newPay.Phone.trim() != '' && !(/^1[3|4|5|7|8][0-9]{9}$/.test(this.newPay.Phone));
            },
            login() {
                this.newPay.payOen = false;
                this.oldpassworld.passOpen = true;
            },
            paylogin(){
                this.newPay.payOen = true;
                this.oldpassworld.passOpen = false;
            },
            hide() {
                this.oldpassworld.loginpass=null;
                this.oldpassworld.newloginpass=null;
                this.oldpassworld.passOpen=false;
                this.newPay.Phone=null;
                this.newPay.Aucode=null;
                this.newPay.payOen = false;
                this.newPay.PassWorld=null;
                this.newPay.PhoneReg = false;
            },
            getAuCode(){
                if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.newPay.Phone)){
                    return false;
                }
                var _this = this;
                axios.post("/strategist/publisher/sendSms",qs.stringify({
                    phone:_this.newPay.Phone,
                    type:2
                }))
                    .then(function(res){
                        console.log(res.data);
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
    .addColor{
        background:#ee8354 !important;
        color: #fff !important;
    }
    .aucode{
        position: relative;
    }
    .aucode span{
        display: block;
        width: 68px;
        height: 20px;
        color: #adb3c1;
        font-size: 12px;
        text-align: center;
        background:#f7f7f7 ;
        border: 0;
        position: absolute;
        right: 5px;
        top: 12px;
        line-height: 20px;
        cursor: pointer;
    }
    .pass3 input{
        letter-spacing: 35px;
        text-indent: 10px !important;
    }
    .pass2,.pass3{
        padding: 0 0 20px 34px;
    }
    .pass2>div:first-child,.pass3>div:first-child{
        margin-right: 24px;
    }
    .pass1{
        padding: 27px 0px 19px 34px;
        position: relative;
    }
    .pass1>div:last-child{
        position: absolute;
        bottom: -10px;
        color: #e26042;
        font-size: 12px;
        left: 100px;
    }
    .pass1>div:first-child{
        margin-right: 10px;
    }
    .pass1>div{
        float:left;
        heigh:33px;
        line-height: 33px;
    }
    .pass1>div input,.pass2>div input,.pass3>div input{
        height: 28px;
        line-height: 28px;
        width: 256px;
        text-indent: 5px;
    }
    .pass>div{
        height:33px;
        color: #687284;    margin-top: 10px;
    }
    .pass>div>div{
        float: left;
    }
    .pass section > div {
        width: 134px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background: #ee8354;
        color: #fff;
        float: left;
        cursor: pointer;
        margin-left: 53px;
    }
    .pass section{
        overflow: hidden;
    }

    .pass section > div:last-child{
        margin-left: 20px;
    }
    .user_div {
        height: 538px;
    }
    i {
        border: 1px dashed #dcdee3;
        width: 100%;
        display: block;
    }

    .user_div > div {
        position: relative;
        line-height: 42px;
    }

    .user_div > div span {
        margin-left: 5px;
    }

    .user_div > div p:first-child {
        color: #687284;
    }
    .user_div > div p img {
        display: inline-block;
        vertical-align: -2px;
        width: 13px;
        height: 16px;
    }

    .user_div > div a {
        color: #ee8354;
        margin-left: 30px;
        cursor: pointer;
    }

    .login1passWorld section > div {
        width: 134px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background: #ee8354;
        color: #fff;
        float: left;
        cursor: pointer;
        margin-top: 25px;
        margin-left: 53px;
    }
    .login1passWorld section{
        overflow: hidden;
    }

    .login1passWorld section > div:last-child{
        margin-left: 20px;
    }

    .bgcolor {
        background: #adb3c1 !important;
    }

    .login1passWorld > div {
        height: 33px;
        padding-top: 21px;
    }

    .login1passWorld > div:last-child {
        padding-top: 21px;
    }

    .login1passWorld input {
        height: 28px;
        line-height: 28px;
        background: #fff;
        width: 256px;
    }

    .login1passWorld > div > div {
        float: left;
        height: 33px;
        font-size: 14px;
        color: #687284;
        line-height: 33px;
    }

    .login1passWorld > div > div:first-child {
        margin: 0 30px 0 34px;
    }

    .login1passWorld {
        height: 193px;
        width: 770px;
        background: #f7f7f7;
        margin-bottom: 19px;
    }
.pass{
    height: 254px;
    background: #f7f7f7;
}
</style>