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
            <div class="no_blank">
                <div class="addblank" @click="addblank1" >
                    <img src="../../../assets/img/addblank@2x.png" />
                    增加银行卡
                </div>
                <p>提现请先添加银行卡信息 !</p>
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
                    <el-input v-model="ruleForm.BlankTitle"></el-input>
                </el-form-item>
            </el-form>
            <!--<div class="form">-->
                 <!--<div class="form-main">-->
                    <!--<div>持卡人</div>-->
                    <!--<div>-->
                        <!--<input type="text" v-model="addBlank.userBlank" />-->
                    <!--</div>-->
                     <!--<div>-->
                         <!--*请输入持卡人姓名-->
                     <!--</div>-->
                <!--</div>-->
                <!--<div class="form-main">-->
                    <!--<div>身份证</div>-->
                    <!--<div>-->
                        <!--<input type="text"  v-model="addBlank.ID" />-->
                    <!--</div>-->
                    <!--<div>-->
                        <!--*身份证信息错误，请检查后输入-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="form-main">-->
                    <!--<div>银行卡</div>-->
                    <!--<div>-->
                        <!--<input type="text" v-model="addBlank.BlankCard"/>-->
                    <!--</div>-->
                    <!--<div>-->
                        <!--*请输入正确的银行卡信息-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="form-main">-->
                    <!--<div class="mar10">支行信息</div>-->
                    <!--<div>-->
                        <!--<input type="text"  v-model="addBlank.BlankTitle"/>-->
                    <!--</div>-->
                    <!--<div>-->
                        <!--*请输入相应的支行信息-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="form-main">-->
                    <!--<div>手机号</div>-->
                    <!--<div>-->
                        <!--<input type="text"  v-model="addBlank.Phone" />-->
                    <!--</div>-->
                    <!--<div>-->
                        <!--*请输入11位数字-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
                <!--<el-form-item label="活动名称" prop="name">-->
                    <!--<el-input v-model="ruleForm.name"></el-input>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
            <section>
                <div>确定</div>
                <div class="bgcolor" @click="hide">取消</div>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "withdrawals",
        data(){
         return{
             btnadd:false,
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
        computed:{
            spanbalue:function(){
                    this.btnadd = this.money.length>0;
            }
        },
        methods:{
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
            }
        }
    }
</script>

<style scoped>
    .demo-ruleForm{
        width: 360px;
        margin-top: 20px;
    }
    .user_div{
        height: 538px;
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
        margin-top:34px;
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
    .user_div{
        height: 538px;
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