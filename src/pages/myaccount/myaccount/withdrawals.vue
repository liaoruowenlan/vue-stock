<template>
    <div class="user_div" v-model="spanbalue" >
        <div v-show="!addBlank.BlankOpen">
            <div class="title">
                提现
                <ul>
                    <li>
                        <img src="../../../assets/img/myblank.png" />
                        我的银行卡
                    </li>
                    <li>
                        <img src="../../../assets/img/withdrawsls.png" />
                        提现记录
                    </li>
                </ul>
            </div>
            <div class="user_text">
                <p>提现金额</p>
                <input type="text" v-model="money"/>
                <p>可用金额：<span>20000.00</span></p>
            </div>
            <div v-if="!blank" class="no_blank">
                <div class="addblank" @click="addblank1" >
                    <img src="../../../assets/img/addblank@2x.png" />
                    增加银行卡
                </div>
                <p>提现请先添加银行卡信息 !</p>
            </div>
            <div class="blank" v-if="blank">
                <ul :class="list1?'margin1':''">
                    <li class="blank-list" v-for="(item,index) in blankdata" @click="setActive(index)" :class="{'Clickactive':item.blankActive}">
                        <img :src="item.bankIconLink" />
                        <div>
                            <p>{{item.bankName}}</p>
                            <p>{{item.bankCard}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="withdrawals" :class="btnadd?'addColor':''">
                我要提现
            </div>
        </div>
        <div class="adblank" v-show="addBlank.BlankOpen">
            <div>
                <span class="Fzcolor" @click="hide">提现</span>
                <span class="mar5">></span>
                <span class="Fzcolor">我的银行卡</span>
                <span class="mar5">></span>
                <span>添加银行卡</span>
            </div>
            <div class="border"></div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" size="small">
                <el-form-item label="持卡人" prop="userBlank">
                    <el-input v-model="ruleForm.userBlank"></el-input>
                </el-form-item>
                <el-form-item label="身份证" prop="ID">
                    <el-input v-model="ruleForm.ID"></el-input>
                </el-form-item>
                <el-form-item label="银行卡" prop="BlankCard">
                    <el-input v-model="ruleForm.BlankCard"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="Phone">
                    <el-input v-model="ruleForm.Phone"></el-input>
                </el-form-item>
                <el-form-item label="支行信息" >
                    <el-cascader
                            :options="options2"
                            @active-item-change="handleItemChange"
                            :props="props"
                    ></el-cascader>
                </el-form-item>
            </el-form>
            <section>
                <div @click="submitdata">确定</div>
                <div class="bgcolor" @click="hide">取消</div>
            </section>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import qs from 'qs'

    export default {
        name: "withdrawals",
        data(){
         return{
             list1:'',
             activeIdx: 0,
             btnadd:false,
             blank:false,
             blankdata:{},
             token:sessionStorage.getItem('token'),
             money:'',
             addBlank:{
                 BlankOpen:''
             },
             ruleForm: {
                 userBlank:'',
                 ID:'',
                 BlankCard:'',
                 BlankTitle:'',
                 Phone:'',
             },
             rules: {
                 userBlank: [
                     { required: true, message: '请输入持卡人姓名', trigger: 'blur' },
                     { min: 2, max: 5, message: '姓名长度在 2 到 5 个字符', trigger: 'blur' }
                 ],
                 ID: [
                     { required: true, message: '请输入身份证', trigger: 'blur' },
                     { min: 15, message: '身份证长度不得少于 15 位数', trigger: 'blur' },
                     { pattern:  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请检查身份证格式', trigger: 'blur' }
                 ],
                 BlankCard: [
                     { required: true, message: '请输入银行卡', trigger: 'blur' },
                     { pattern: /^([1-9]{1})(\d{14}|\d{18})$/, message: '请检查银行卡号', trigger: 'blur' }
                 ],
                 Phone: [
                     { required: true, message: '请输入手机号码', trigger: 'blur' },
                     { pattern: /^1[34578]\d{9}$/, message: '请检查手机号码', trigger: 'blur' }
                 ]
             }
         }
        },
        mounted(){
            // for(var i= 0;){
            //
            // }
        },
        created(){
            var _this = this;
            axios.get('/strategist/bindCard/myBankCardList', {
                headers: {
                    'Authorization': this.token
                }
            })
                .then(function (res) {
                    console.log(res.data);
                    // _this.User = res.data.result;
                    _this.blank = res.data.result!='';
                    _this.list1 = res.data.result.length===1;
                    _this.blankdata = res.data.result;
                    for (var i = 0; i < _this.blankdata.length; i++) {
                        _this.blankdata[i].blankActive = (i == 0);
                        _this.activeIdx = 0;
                    }
                    _this.blankdata = Object.assign({},_this.blankdata);
                    console.log(_this.blankdata)
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        computed:{
            spanbalue:function(){
                    this.btnadd = this.money.length>0;
            }
        },
        methods:{
            submitdata(){
                var _this = this;
                axios.post('/strategist/bindCard/bindBankCard', qs.stringify({
                    name: this.rules.userBlank,
                    idCard: this.rules.userBlank,
                    phone: this.rules.userBlank,
                    bankCard: this.rules.userBlank,
                    verificationCode: this.rules.userBlank,
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
            },
            addblank1(){
                this.addBlank.BlankOpen = true;
            },
            hide(){
                this.addBlank.BlankOpen = false;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            setActive(index){
                if(this.activeIdx !== undefined){
                    this.blankdata[this.activeIdx].blankActive = false;
                }
                this.activeIdx = index;
                this.blankdata[index].blankActive = true;
                this.blankdata = Object.assign({},this.blankdata);
            }
        }
    }
</script>

<style scoped>
    .el-cascader {
        width: 100% !important;
    }
    .margin1{
        width: 375px !important;
        margin: 0 auto !important;
    }
    .blank-list div>p:first-child{
        color: #fff;
        font-size: 14px;
        padding-top: 23px;
    }
    .blank-list div{
        padding-left: 7px;
        float: left;
    }
    .blank-list div>p:last-child{
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        padding-top: 9px;
    }
    .blank ul li img{
        width:52px;
        height: 52px;
        margin: 20px 0px 20px 15px;
        border-radius: 30px;
        float: left;
    }
    .blank ul li.Clickactive{
        background-image:url("../../../assets/img/blank-selet1.png");
    }
    .user_div>div:after{
        content:".";
        clear:both;
        display:block;
        height:0;
        overflow:hidden;
        visibility:hidden;
    }
    .blank{
        min-height: 129px;
        border-bottom: 1px dashed #dcdee3;
        margin-bottom: 45px;
    }
    .blank:after{
        content:".";
        clear:both;
        display:block;
        height:0;
        overflow:hidden;
        visibility:hidden;
    }
    .blank ul li:nth-child(2n){
        margin-left:47px;
    }
    .blank ul:after{
        content:".";
        clear:both;
        display:block;
        height:0;
        overflow:hidden;
        visibility:hidden;
    }
    .blank ul li{
        width: 310px;
        height: 92px;
        border-radius: 8px;
        background-color: #4277e8;
        float: left;
        margin-left: 35px;
        margin-top: 19px;
        margin-bottom: 19px;
        background:#4277e8 url("../../../assets/img/blank-selet.png") no-repeat 286px 4px;
        background-size: 20px 20px;
    }
    .demo-ruleForm{
        width: 360px;
        margin-top: 20px;
    }
    .user_div{
        min-height: 538px;
    }
    .form-main>div:last-child{
        position: absolute;
        bottom: -24px;
        color: #e26042;
        font-size: 12px;
        left: 70px;
    }
    .adblank section > div {
        width: 134px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background: #ee8354;
        color: #fff;
        float: left;
        cursor: pointer;
        margin-top: 43px;
        margin-left: 53px;
    }
    .adblank section > div:last-child{
        margin-left: 20px;
    }

    .bgcolor {
        background: #adb3c1 !important;
    }
    .adblank section{
        overflow: hidden;
    }
    .mar10{
        margin-right: 10px !important;
    }
    .form-main>div:first-child{
        margin-right: 24px;
    }
    .form-main{
        height: 32px;
        margin-top: 21px;
        font-size: 14px;
        color: #687284;
        line-height: 32px;
        position: relative;
    }
    .form-main input {
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        width:256px;
    }
    .form-main>div{
        float: left;
        height: 32px;
    }
    .Fzcolor{
        color: #3e59a7;
        cursor: pointer;
    }
    .adblank>div>span:last-child{
        color:#687284 ;
    }
    .mar5{
        margin: 0 5px;
    }
    .el-breadcrumb__inner, .el-breadcrumb__inner a{
        color: #3e59a7 !important;
    }
    .title ul{
        float: right;
        color: #ee8354;
    }
    .addColor{
        background:#ee8354 !important;
        color: #fff !important;
    }
    .border{
        width: 798px;
        height: 1px;
        background: #dcdee3;
        margin-top: 10px;
    }
    .title ul li{
        float: left;
        margin-right: 15px;
    }
    .title ul li img{
        display: inline-block;
        vertical-align: -1px;
        width: 16px;
        height: 12px;
    }
    .title ul li:last-child img{
        width: 12px;
        height: 12px;
    }
    .user_div div.title{
        font-size: 14px;
        line-height: 36px;
        border-bottom: 1px solid #dcdee3;
        color: #687284;
    }
    .no_blank{
        height: 127px;
        margin-bottom: 44px;
        /*border-bottom: 1px dashed #dcdee3;*/
    }
    .withdrawals{
        width:360px;
        line-height: 48px;
        height: 48px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        background: #f9d9cb;
        margin: 0 auto;
        margin-bottom: 106px;
    }
    .no_blank p{
        width: 310px;
        margin: 0 auto;
        color: #e26042;
        font-size: 14px;
        padding-top: 8px;
    }
    .addblank{
        width: 310px;
        height: 92px;
        font-size: 14px;
        border-radius: 8px;
        background: #ee8354;
        line-height: 92px;
        color: #fff;
        text-align: center;
        margin: 0 auto;
        margin-top: 18px;
        cursor: pointer;
    }
    .addblank img{
        height: 15px;
        width: 15px;
        display: inline-block;
        vertical-align: -3px;
    }
    .user_text{
        height: 141px;
        border-bottom: 1px dashed #dcdee3;
    }
    .user_text p:first-child{
        color: #adb3c1;
        float: left;
        margin: 52px 10px 52px 145px;
    }
    .user_text p:last-child{
        color: #687284;
        float: left;
        font-size: 12px;
        margin: 52px 0 52px 10px;
    }
    .user_text input{
        margin: 38px 0;
        height: 42px;
        width: 302px;
        float: left;
    }
    .user_text span{
        color: #e26042;
    }
</style>