<template>
    <div class="user_div" v-model="spanval">
        <div>
            <p>
                <img src="../../../assets/img/money.png"/>
                <span>登陆密码</span>
                <a @click="login">修改></a>
            </p>
            <div class="login1passWorld" v-if="newPay.payOen">
                <div>
                    <div>原密码</div>
                    <div>
                        <input v-model="oldpassworld.loginpass" type="password" placeholder="  请输入原密码"/>
                    </div>
                </div>
                <div>
                    <div class="active13">新密码</div>
                    <div class="active13">
                        <input v-model="oldpassworld.newloginpass" type="password" placeholder="  请输入新密码"/>
                    </div>
                    <p v-show="newPay.btn" class="regw">*请检查原密码</p>
                    <p v-show="newPay.PassReg" class="regw">*注册密码必须为字母数字组合6-12位</p>                    
                </div>
                <section>
                    <div @click="setPass">确定</div>
                </section>
            </div>
        </div>
        <i></i>
        <div>
            <p>
                <img src="../../../assets/img/psw.png"/>
                <span>支付密码</span>
                <a @click="login1">修改></a>
            </p>
            <div class="pass" v-if="newPay.payOen1">
                <div class="pass1">
                    <div>手机号码</div>
                    <div>
                        <input v-model="newPay.Phone" type="text" :disabled="newPay.Phone.length==11" placeholder="请输入手机号码" @blur="blur()"/>
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
                    <div v-show="newPay.AuCode1" class="regw1">
                        *验证码错误或者验证码已过期
                    </div>
                </div>
                <div class="pass3">
                    <div>新密码</div>
                    <div>
                        <input type="password" maxlength="6" v-model="newPay.PassWorld" />
                    </div>
                    <div  v-show="newPay.PayCode" class="regw1">
                        *支付密码只能为六位数字
                    </div>
                </div>
                <section>
                    <div @click="payWold">确定</div>
                </section>
            </div>
        </div>
		<i></i>
    	<div>
    		<p>
                <img src="../../../assets/img/money.png"/>
                <span>修改头像</span>
                <a @click="login3">修改></a>
            </p>
            <div class="setup-logo" v-if="newPay.setup_logo">
            	<!--<el-upload
				  class="avatar-uploader"
				  action="/strategist/publisher/headPortrait"
				  :headers="headers" 
				  name="file" 
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">				  
				  <img v-if="imageUrl" :src="imageUrl" class="avatar" >
				  <img v-else src="../../../assets/img/userdcim-.png" class="avatar" >
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>  :on-success="handlePreview"
				</el-upload>-->
				<el-upload
				  class="upload-demo"
				  ref="upload" 
				  action="/strategist/publisher/headPortrait"
				  :headers="headers" 
				   :show-file-list="false" 				   
				  :auto-upload="false" 
				  name="file"
				  :on-preview = "handlePreview"		
				  :before-upload="beforeAvatarUpload"> 
				  <el-button size="small" type="primary">点击上传</el-button>
				</el-upload>
				<img v-if="imageUrl" :src="imageUrl" class="avatar" >
				<img v-else src="../../../assets/img/userdcim-.png" class="avatar" >
				<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>

            </div>
    	</div>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "setup",
  data() {	
    return {
    	headers:{
    		Authorization: localStorage.getItem("token")
    	},
    	imageUrl:localStorage.getItem("UserImg")||'',
      	oldpassworld: {
        loginpass: "",
        newloginpass: "",
        passOpen: ""
      
      },
      newPay: {
        Phone: localStorage.getItem("phone"),
        Aucode: "",
        AuCodeAdd: "",
        payOen: false,
        payOen1: false,
        setup_logo:true,
        PassWorld: "",
        PhoneReg: "",
        btn: false,
        AuCode1: "",
        PassReg: false,
        PayCode:false
      },
      count: "",
      timer: null,
      show: true,
      
    };
  },
  computed: {
    spanval: function() {
      var test = "test" + this.newPay.Aucode;
      this.newPay.AuCodeAdd = /^1[3|4|5|7|8][0-9]{9}$/.test(this.newPay.Phone);
      this.newPay.AuCode1 = false;
      this.newPay.PhoneReg = false;
    }
  },
  methods: {
  	submitUpload(){
  		 this.$refs.upload.submit();//直接提交申请。
  		 
  	},
  	 handlePreview(res, file) {
  	 	console.log(1);
	 	localStorage.setItem("UserImg", res.result);
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'||'image/PNG';
        const isLt2M = file.size / 1024  < 500;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过500KB!');
        }
        return isJPG && isLt2M;
      },
    blur() {
      this.newPay.PhoneReg =
        this.newPay.Phone.trim() != "" &&
        !/^1[3|4|5|7|8][0-9]{9}$/.test(this.newPay.Phone);
    },
    login() {
      this.newPay.payOen = !this.newPay.payOen;
      this.newPay.payOen1 = false;
      this.newPay.setup_logo = false;
      this.oldpassworld.loginpass = ''
      this.oldpassworld.newloginpass = ''
    },
    login1() {
      this.newPay.payOen1 = !this.newPay.payOen1;
      this.newPay.payOen = false;
      this.newPay.setup_logo = false;
      this.newPay.PassWorld = ''
      this.newPay.Aucode = ''
    },
    login3(){
    	this.newPay.setup_logo = !this.newPay.setup_logo;
    	 this.newPay.payOen1 = false;
    	 this.newPay.payOen = false;
    },
    // hide() {
    //   this.oldpassworld.loginpass = null;
    //   this.oldpassworld.newloginpass = null;
    //   this.oldpassworld.passOpen = false;
    //   this.newPay.Phone = null;
    //   this.newPay.Aucode = null;
    //   this.newPay.payOen = false;
    //   this.newPay.PassWorld = null;
    //   this.newPay.PhoneReg = false;
    //   this.newPay.btn = false;
    //   this.newPay.PassReg = false;
    // },
    setPass() {
      this.newPay.PassReg = false;
      this.newPay.btn = false;
      if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(this.oldpassworld.newloginpass))) {
        this.newPay.PassReg = true;
        return;
      }
      if (!this.oldpassworld.loginpass) {
        this.newPay.btn = true;
        return;
      }

      var _this = this;
      axios
        .post(
          "/strategist/publisher/resetPassword",
          qs.stringify({
            oldPassword: this.oldpassworld.loginpass,
            newPassword: this.oldpassworld.newloginpass
          }),
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        .then(function(err) {
          if (err.data.code == 200) {
            _this.$alert("密码修改成功", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                  localStorage.clear()
                _this.$router.push("/login");
              }
            });
          } else {
            _this.$alert(err.data.message, "提示", {
              confirmButtonText: "确定"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    payWold() {
      var _this = this;
          _this.newPay.PayCode = false
          _this.newPay.AuCode1 = false
        
      if(!/^\d{6}$/.test(_this.newPay.PassWorld)){
          _this.newPay.PayCode = true
          return
      }if(!_this.newPay.Aucode){
          _this.newPay.AuCode1 = true
          return
      }
      axios
        .post(
          "/strategist/publisher/modifyPaymentPassword",
          qs.stringify({
            phone: _this.newPay.Phone,
            paymentPassword: _this.newPay.PassWorld,
            verificationCode: _this.newPay.Aucode
          })
        )
        .then(function(res) {
          console.log(res.data);
          if (res.data.code != 200) {
            clearInterval(_this.timer)
            _this.$alert(res.data.message, "提示", {
              confirmButtonText: "确定",
            });
            _this.newPay.AuCode1 = true;
          } else if (res.data.code == 200) {
            _this.$alert("密码修改成功", "提示", {
              confirmButtonText: "确定",
              callback:action=>{
                  _this.newPay.Aucode = ''
                  _this.newPay.PassWorld = '' 
              }
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getAuCode() {
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.newPay.Phone)) {
        return false;
      }
      var _this = this;
      axios
        .post(
          "/strategist/publisher/sendSms",
          qs.stringify({
            phone: _this.newPay.Phone,
            type: 5
          })
        )
        .then(function(res) {
          if(res.data.code == 200){
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
            }, 2000);
          }
          }else{
              this.$alert(res.data.message, '提示', {
                  confirmButtonText: '确定',
                });
          }

        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>

.regw {
  position: absolute;
  bottom: -30px;
  color: #e26042;
  font-size: 12px;
  left: 105px;
}
.regw1 {
  position: absolute;
  bottom: -18px;
  color: #e26042;
  font-size: 12px;
  left: 105px;
}
.addColor {
  background: #ee8354 !important;
  color: #fff !important;
}

.aucode {
  position: relative;
}

.aucode span {
  display: block;
  width: 68px;
  height: 20px;
  color: #adb3c1;
  font-size: 12px;
  text-align: center;
  background: #f7f7f7;
  border: 0;
  position: absolute;
  right: 5px;
  top: 12px;
  line-height: 20px;
  cursor: pointer;
}

.pass3 input {
  /* letter-spacing: 35px; */
  text-indent: 10px !important;
}

.pass2,
.pass3 {
  padding: 0 0 20px 34px;
}

.pass2 > div:first-child,
.pass3 > div:first-child {
  margin-right: 24px;
}

.pass1 {
  padding: 27px 0px 19px 34px;
  position: relative;
}

.pass1 > div:last-child {
  position: absolute;
  bottom: -10px;
  color: #e26042;
  font-size: 12px;
  left: 100px;
}

.pass1 > div:first-child {
  margin-right: 10px;
}

.pass1 > div {
  float: left;
  height: 33px;
  line-height: 33px;
}

.pass1 > div input,
.pass2 > div input,
.pass3 > div input {
  height: 28px;
  line-height: 28px;
  width: 256px;
  text-indent: 5px;
}

.pass > div {
  height: 33px;
  color: #687284;
  margin-top: 10px;
  position: relative;
}

.pass > div > div {
  float: left;
}

.pass section > div {
  width: 258px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  background: #ee8354;
  color: #fff;
  float: left;
  cursor: pointer;
  margin-left: 53px;
}

.pass section {
  overflow: hidden;
  margin-top: 10px;
}

.pass section > div:last-child {
  margin-left: 102px;
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
  width: 258px;
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

.login1passWorld section {
  overflow: hidden;
}

.login1passWorld section > div:last-child {
  margin-left: 108px;
}

.bgcolor {
  background: #adb3c1 !important;
}

.login1passWorld > div {
  height: 33px;
  padding-top: 21px;
  position: relative;
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

.pass {
  height: 264px;
  background: #f7f7f7;
}
</style>