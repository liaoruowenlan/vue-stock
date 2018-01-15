<template>
    <div class="user_div" v-model="spanbalue" >
        <div v-show="addBlank.BlankOpen">
            <div class="title">
                提现
                <ul>
                    <li @click="myblankClick">
                        <img src="../../../assets/img/myblank.png" />
                        我的银行卡
                    </li>
                    <li>
                        <img src="../../../assets/img/withdrawsls.png" />
                        <router-link to="/myaccount/core">提现记录</router-link>
                    </li>
                </ul>
            </div>
            <div class="user_text">
                <p>提现金额</p>
                <input type="text" class="winmoney" v-model="moneyOne" @keyup="userMoneyC"/>
                <p class="uesrmoney">可用金额：<span>{{userMoney}}</span></p>
                <div v-show="userMoneyReg" class="user_text_red">
                    {{userMoneyText}}
                </div>
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
                    <li class="blank-list" v-for="(item,index) in blankdata" @click="setActive(index)" :class="{'Clickactive':item.blankActive}" :key="index">
                        <img :src="item.bankIconLink" />
                        <div>
                            <p>{{item.bankName}}</p>
                            <p>{{item.bankCard}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="withdrawals" :class="btnadd?'addColor':''" @click="userPaypass">
                我要提现
            </div>
        </div>
        <div class="adblank" v-show="addBlank.myblank1">
            <div>
                <span class="Fzcolor" @click="hide">提现</span>
                <span class="mar5">></span>
                <span  @click="myblankClick" class="Fzcolor">我的银行卡</span>
                <span class="mar5">></span>
                <span>添加银行卡</span>
            </div>
            <div class="border"></div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm ruleFa" size="small">
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
                    <el-cascader :disabled="cascadeDisabled" :options="provinces" @active-item-change="handleCascadeChange" :props="props" v-model="ruleForm.cnaps"></el-cascader>
                </el-form-item>
            </el-form>
            <section>
                <div @click="submitdata">确定</div>
                <div class="bgcolor" @click="hide">取消</div>
            </section>
        </div>
        <div class="adblank" v-show="myBlank">
            <div>
                <span class="Fzcolor" @click="hide">提现</span>
                <span class="mar5">></span>
                <span>我的银行卡</span>
            </div>
            <div class="border"></div>
            <div class="user-div">
                <div class="frozen">
                    <div>
                        <span>{{lengths}}</span>
                    </div>
                    <p>我的银行卡</p>
                </div>
                <div class="user_btn">
                    <div class="pay" @click="addblank1">
                        绑定银行卡
                    </div>
                    <div class="withdrawals">
                        <router-link to="/myaccount/recharge">提现</router-link>
                    </div>
                </div>
            </div>
            <div class="blank">
                <ul :class="list1?'margin1':''">
                    <li class="blank-list no-bg" v-for="(item,index) in blankdata" :key="index">
                        <img :src="item.bankIconLink" />
                        <div>
                            <p>{{item.bankName}}</p>
                            <p>{{item.bankCard}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <el-dialog
                title="请输入支付密码"
                :visible.sync="centerDialogVisible"
                width="30%"
                custom-class="dialogg"
                center>
            <div>
                <input type="password"  class="payPasw" maxlength="6" @keyup="showTime($event)" ref="paymentPwdInput"  v-model="payPass"/>
            </div>
            <span slot="footer" class="dialog-footer">
            <div @click="userWithd" :class="PostPay?'addColor':''" class="paypassword">
                确定
            </div>
                <input type="text"  style="display: none;"/>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    import axios from "axios"
    import qs from 'qs'

    export default {
        name: "withdrawals",
        data(){
         return{
             payPass:'',
             myBlank:'',
             list1:'',
             userMoneyReg:'',
             userMoneyText:'',
             abcdefghijk:null,
             activeIdx: 0,
             btnadd:false,
             PostPay:false,
             blank:false,
             blankId:'',
             cascadeDisabled: true,
             blankdata:{},
             lengths:"",
             BBlank:'',
             userMoney:'',
             centerDialogVisible: false,
             token:sessionStorage.getItem('token'),
             moneyOne:'',
             addBlank:{
                 BlankOpen:true,
                 myblank1:''
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
             },
             provinces: [],
             props: {
                 value: 'value',
                 label: 'label',
                 children: 'children'
             }
         }
        },
        mounted(){

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
                _this.lengths = res.data.result.length;
                _this.BBlank =  res.data.result.length>0?res.data.result[0].bankCard:''
                _this.blankId = res.data.result[0].id;
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
            axios.get('/strategist/capitalAccount/', {
                headers: {
                    'Authorization': this.token
                }
            })
                .then(function (res) {
                    _this.userMoney = res.data.result.availableBalance;
                })
                .catch(function (err) {
                    console.log(err);
                });
            // 加载省份
            this.loadProvinces();
        },
        computed:{
            spanbalue:function(){
                    this.btnadd = this.moneyOne>=1;
                 this.cascadeDisabled =  /^([1-9]{1})(\d{14}|\d{18})$/.test(this.ruleForm.BlankCard)?false:true;
            }
        },
        methods:{
            /**
             * 提现金额失去焦点
             **/
            userMoneyC(){
                this.userMoneyReg = false;
            },
            /**
             * 支付密码失去焦点
             **/
            showTime(event){
                this.payPass = this.payPass.replace(/[^\d]/g,'');
                if (event.keyCode==13){
                    alert('1');
                }
                if(this.payPass.length===6){
                    this.$refs.paymentPwdInput.blur();
                    this.PostPay = true ;
                }else{
                    this.PostPay = false ;
                }
                console.log(this.payPass.length)
            },
            /**
            * 用户点击我的银行卡
            **/
            myblankClick(){
                this.myBlank = true;
                this.addBlank.BlankOpen = false;
                this.addBlank.myblank1 = false;
            },
            userWithd(){ //用户点击提现;moneyOne payPass BBlank
                var _this = this;
                this.$axios.post('/strategist/payment/withdrawals',qs.stringify({
                   amount:this. moneyOne,
                   paymentPassword:this. payPass,
                   bindCardId:this.blankId
                })).then((res)=>{
                    if(res.data.code == 200){
                        // this.$alert('已提交提现申请', '提示', {
                            // confirmButtonText: '我知道了',})
                        this.$message({
                            message: '已提交提现申请',
                            type: 'success',
                            duration:'1500',
                            onClose:function(){
                                _this.$router.push({ path: '/myaccount/capital'});
                            }
                        });
                    }else{
                         this.$message({
                            message: res.data.message,
                            type: 'warning'
                        });
                    }
                })

            },
            /**
             * 用户点击我要提现
             **/
            userPaypass(){
                if(!this.blank){
                    this.userMoneyReg = true;
                    this.userMoneyText = '*请先绑定银行卡！';
                    return false;
                }
                // if(this.moneyOne < 500){
                //     this.userMoneyReg = true;
                //     this.userMoneyText = '*提现金额需大于或等于500';
                //     return false;
                // }
                if(this.moneyOne>this.userMoney){ //。
                    this.userMoneyReg=true;
                    this.userMoneyText = '*提现金额不得大于用户余额';
                    return false;
                }
                if(!(/^[0-9]+$/.test(this.moneyOne))){
                    this.userMoneyReg = true;
                    this.userMoneyText = '*提现金额需为整数。'
                    return false;
                }
                this.centerDialogVisible = this.btnadd;
            },
            /**
             * 处理没有输入银行银行卡的情况
             */
            handleNoBankCard() {
                // TODO
                console.log("no bankCard");
            },
            /**
             * 处理没有支行的情况
             */
            handleNoCnaps() {
                // TODO
                console.log("no cnaps");
            },
            /**
             * 级联操作
             */
            handleCascadeChange(code) {
                var codeArr = ("" + code).split(",");
                if(codeArr.length == 1) {
                    this.loadCities(codeArr[0]);
                } else if(codeArr.length == 2) {
                    if(!this.ruleForm.BlankCard || this.ruleForm.BlankCard.trim() == "") {
                        this.handleNoBankCard();
                        return;
                    }
                    this.loadCnaps(codeArr[0], codeArr[1], this.ruleForm.BlankCard.trim());
                } else {
                    alert(code);
                }
            },
            /**
             * 加载支行列表
             */
            loadCnaps(provinceCode, cityCode, bankCard) {
                var _this = this;
                axios.get('/strategist/cnaps/lists/'+ cityCode + "?bankCard=" + bankCard, {
                    headers: {
                        'feign': 'true',
                        'Authorization': this.token
                    }
                })
                .then(function(res){
                    if("200" == res.data.code) {
                        var cnaps = res.data.result;
                        for(var i = 0; i < _this.provinces.length; i++) {
                            if(_this.provinces[i].value == provinceCode) {
                                var cities = _this.provinces[i].children;
                                for(var j = 0; j < cities.length; j++) {
                                    if(cities[j].value == cityCode) {
                                        for(var k = 0; k < cnaps.length; k++) {
                                            cnaps[k].value = cnaps[k].cnaps + "_" + cnaps[k].bnkName;
                                            cnaps[k].label = cnaps[k].bnkName;
                                        }
                                        cities[j].children = cnaps;
                                    }
                                }
                                _this.provinces = Object.assign([], _this.provinces);
                            }
                        }
                    } else {
                        _this.handleNoCnaps();
                    }
                })
                .catch(function(err){
                    _this.handleNoCnaps();
                });
            },
            /**
             * 加载城市
             */
            loadCities(provinceCode) {
                var _this = this;
                axios.get('/strategist/areainfo/children/'+ provinceCode)
                .then(function(res){
                    if("200" == res.data.code) {
                        var cities = res.data.result;
                        for(var i = 0; i < _this.provinces.length; i++) {
                            if(_this.provinces[i].value == provinceCode) {
                                for(var j = 0; j < cities.length; j++) {
                                    cities[j].value = cities[j].areaCode;
                                    cities[j].label = cities[j].areaName;
                                    cities[j].children = [];
                                }
                                _this.provinces[i].children = cities;
                                _this.provinces = Object.assign([], _this.provinces);
                            }
                        }
                    } else {
                        console.log(res.data.code + ":" + res.data.message)
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            },
            /**
             * 加载省份
             */
            loadProvinces() {
                var _this = this;
                axios.get('/strategist/areainfo/provinces',{
                    headers: {
                        'Authorization': this.token
                    }
                })
                .then(function(res){
                    if("200" == res.data.code) {
                        _this.provinces = res.data.result;
                        for(var i = 0; i < _this.provinces.length; i++) {
                            _this.provinces[i].value = _this.provinces[i].areaCode;
                            _this.provinces[i].label = _this.provinces[i].areaName;
                            _this.provinces[i].children = [];
                        }
                        _this.provinces = Object.assign([], _this.provinces);
                    } else {
                        console.log(res.data.code + ":" + res.data.message)
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            },
            submitdata(){
                var _this = this;
                // 请求数据对象
                if(this.ruleForm.userBlank==''||this.ruleForm.ID==''||this.ruleForm.Phone==''||this.ruleForm.BlankCard==''){
                    this.$message({
                        message: '请核实用户银行卡资料',
                        customClass:'ablout',
                        type: 'warning'
                    });
                    return false;
                }
                var requestObj = {
                    name: this.ruleForm.userBlank,
                    idCard: this.ruleForm.ID,
                    phone: this.ruleForm.Phone,
                    bankCard: this.ruleForm.BlankCard
                };
                if(this.ruleForm.cnaps) {
                    requestObj.branchCode = ("" + this.ruleForm.cnaps).split(",")[2].split("_")[0];
                    requestObj.branchName = ("" + this.ruleForm.cnaps).split(",")[2].split("_")[1];
                }
                // 发送绑卡请求
                axios.post('/strategist/bindCard/bindBankCard', qs.stringify(requestObj))
                .then(function(res){
                    if(res.data.code!=200){
                        _this.$message({
                            message: res.data.message,
                            customClass:'ablout',
                            type: 'warning'
                        });
                            console.log(res.data)
                        return false;
                    }else{
                        _this.$message({
                            message: '绑定成功，正在跳转中。',
                            type: 'success',
                            customClass:'ablout',
                            onClose:function(){
                                location.reload()
                            }
                        });
                    }

                })
                .catch(function(err){
                    console.log(err);
                })
            },
            /**
             * 用户点击增加银行卡按钮
             */
            addblank1(){
                this.addBlank.BlankOpen = false;
                this.addBlank.myblank1 = true;
                this.myBlank = false;
            },
            /**
             * 用户点击提现按钮
             */
            hide(){
                this.addBlank.BlankOpen = true;
                this.addBlank.myblank1 = false;
                this.myBlank = false;
            },
            // submitForm(formName) {
            //     this.$refs[formName].validate((valid) => {
            //         if (valid) {
            //             alert('submit!');
            //         } else {
            //             console.log('error submit!!');
            //             return false;
            //         }
            //     });
            // },
            // resetForm(formName) {
            //     this.$refs[formName].resetFields();
            // },
            setActive(index){
                if(this.activeIdx !== undefined){
                    this.blankdata[this.activeIdx].blankActive = false;
                }
                this.activeIdx = index;
                this.BBlank = this.blankdata[index].bankCard;
                this.blankId =this.blankdata[index].id;
                this.blankdata[index].blankActive = true;
                this.blankdata = Object.assign({},this.blankdata);
            }
        }
    }
</script>

<style>
    .paypassword{
        width: 300px;
        height: 40px;
        background: #f9d9cb;
        color: #fff;
        text-align: center;
        line-height: 40px;
        margin: 0 auto;
        font-size: 16px;
    }
    .dialogg{
        width: 408px !important;
        margin-top: 40vh !important;
        height: 236px !important;
        border-radius: 10px;
    }
    .ablout{
        min-width: 265px !important;
        top: 410px !important;
    }
    .payPasw{
        width: 286px;
        height: 42px;
        margin: 0 auto;
        display: block;
        letter-spacing: 40px;
        text-indent: 25px;
        background: url("../../../assets/img/passWborder.png") no-repeat;
    }
    .no-bg{
        background: #4277e8!important;
    }
    .user-div{
        border-bottom: 1px dashed #dcdee3;
        height: 99px;
    }
    .user_btn{
        float: left;
        width: 230px;
        position: relative;
        font-size: 14px;
        padding-top: 10px;
        padding-left: 130px;
    }
    .user_btn > div {
        width: 120px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        margin: 0 auto;
    }
    .pay  {
        color: #fff;
        background: #ee8354;
        display: block;
        cursor: pointer;
    }
    .user_btn .withdrawals a {
        display: block;
        width: 118px;
        height: 30px;
        color: #ee8354;
        border: 1px solid #ee8354;
        margin-top: 6px;
        background: #fff;
        font-size: 14px;
        cursor: pointer;
    }
    .frozen{
        float: left;
        width: 230px;
        position: relative;
        font-size: 14px;
        padding-top: 10px;
        text-align: center;
        padding-left: 20px;
    }
    .frozen > div {
        text-align: center;
    }

    .frozen > div > span:first-child {
        font-size: 14px;
        color: #e26042;
    }

   .frozen > div > span:last-child {
        font-size: 32px;
        font-weight: bold;
        color: #e26042;
    }

     .frozen > p {
        text-align: center;
        margin-top: 8px;
    }

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
    .ruleFa{
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
    .title ul a{
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
        cursor: pointer;
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
        position: relative;
    }
    .user_text_red{
        position: absolute;
        bottom: 30px;
        color: #e26042;
        font-size: 12px;
        left: 211px;
    }
    .user_text p:first-child{
        color: #adb3c1;
        float: left;
        margin: 52px 10px 52px 145px;
    }
    .user_text>p.uesrmoney{
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
        font-size: 18px;
        text-indent: 10px;
    }
    .user_text span{
        color: #e26042;
    }
</style>