<template>
    <div class="user_div">
        <div v-model="spanValue">
            <div class="title">
                充值
                <ul>
                    <li>
                        <img src="../../../assets/img/myblank.png"/>
                        充值记录
                    </li>
                </ul>
            </div>
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm"
                         label-position="left">
                    <el-form-item label="充值金额" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="支付方式" prop="name">
                        <img src="../../../assets/img/blanks@2x.png"/>
                    </el-form-item>
                    <el-form-item label="选择银行">
                        <ul>
                            <li v-for="(blank, index ) in blanks" @click="selectStyle(index, blank)"
                                :class="{'actives':blank.active}" :key="index">
                                <img :src="blank.iconLink"/>
                                {{blank.bankName}}
                            </li>
                            <!--<li class="actives">-->
                            <!--<img src="../../../assets/img/hang.png" />-->
                            <!--建设银行-->
                            <!--</li>-->
                        </ul>
                    </el-form-item>
                </el-form>
                <div class="pay" :class="btnUp?'addColor':''" @click="pay">
                    充值
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import qs from 'qs'

    export default {
        name: "recharge",
        mounted ()  {
            for (var i = 0; i < this.blanks.length; i++) {
                i===0?this.blanks[i].active = true:this.blanks[i].active = false;
                i===0?this.bindCardId=this.blanks[i].id:'';
            }
            this.blanks = Object.assign({},this.blanks);
        },
        data() {
            return {
                btnUp:"",
                token:sessionStorage.getItem('token'),
                phone:sessionStorage.getItem('phone'),
                activeIdx: 0,
                bindCardId:'',
                banCode:'null',
                publisherId:sessionStorage.getItem('id'),
                ruleForm: {
                    name: '',
                    resource: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入充值金额', trigger: 'blur'},
                        { pattern: /^([1-9]\d+|[2-9])$/, message: '充值金额不得低于2元', trigger: 'change' }
                    ]
                },
                blanks: [
                    {
                        "id": 4,
                        "bankCode": "105",
                        "bankName": "中国建设银行",
                        "iconLink": "http://10.0.0.99:8083/bankIcon/jsyh@3x.png",
                        "appSupport": true,
                        "pcSupport": null
                    },
                    {
                        "id": 11,
                        "bankCode": "303",
                        "bankName": "中国光大银行",
                        "iconLink": "http://10.0.0.99:8083/bankIcon/gdyh@3x.png",
                        "appSupport": true,
                        "pcSupport": null
                    },
                    {
                        "id": 16,
                        "bankCode": "308",
                        "bankName": "招商银行",
                        "iconLink": "http://10.0.0.99:8083/bankIcon/zsyh@3x.png",
                        "appSupport": true,
                        "pcSupport": null
                    }
                ]
            }
        },
        created(){

        },
        computed:{
            spanValue: function() {
              this.btnUp = (/^([1-9]\d+|[2-9])$/.test(this.ruleForm.name))?true:false;
            }
        },
        methods: {
            selectStyle(index, item) {
                if(this.activeIdx !== undefined){
                    this.blanks[this.activeIdx].active = false;
                }
                this.activeIdx = index;
                this.$nextTick(function () {
                    item.active = !item.active;
                    this.$data.blanks = Object.assign({},this.$data.blanks);
                    this.bindCardId = item.id;
                    this.banCode = item.bankCode
                });
            },
            pay(){
                if(this.ruleForm.name == ''){
                    return false;
                }
                window.location.href='/strategist/payment/recharge?' + qs.stringify({
                    publisherId:this.publisherId,
                    paymentType: 1,
                    amount:this.ruleForm.name,
                    banCode:this.banCode
                });
            }
        }
    }
</script>

<style scoped>
    .pay{
        width: 360px;
        height: 48px;
        background: #f9d9cb;
        text-align: center;
        color: #fff;
        margin: 0 auto;
        line-height: 48px;
        font-size: 16px;
    }
    .el-form-item__content ul li {
        float: left;
        width: 190px;
        height: 62px;
        border: 1px solid #dcdee3;
        margin-right: 24px;
        line-height: 62px;
        color: #687284;
        margin-bottom: 10px;
        background: url("../../../assets/img/no-selet.png") no-repeat 93%;
    }

    .el-form-item__content ul li.actives {
        background-image: url("../../../assets/img/selet.png");
        color: #ee8354 !important;
    }

    .el-form-item__content ul li img:first-child {
        width: 38px;
        height: 38px;
        float: left;
        margin: 13px 10px 13px 11px;
    }

    .el-form-item__content ul li:nth-child(3) {
        margin-right: 0;
    }

    .el-form-item__content > img {
        width: 302px;
        height: 77px;
    }

    .user_div {
        min-height: 538px;
    }
    .addColor{
        background:#ee8354 !important;
        color: #fff;
    }
    .el-input {
        width: 48%;
    }

    .el-form-item__label {
        font-weight: bold;
    }

    .demo-ruleForm {
        margin-top: 34px;
    }

    .user_div div.title {
        font-size: 14px;
        line-height: 36px;
        border-bottom: 1px solid #dcdee3;
        color: #3658ad;
    }

    .title ul li {
        float: left;
        margin-right: 15px;
        color: #ee8354;
    }

    .el-form-item {
        font-weight: 700;
    }

    .title ul li img {
        display: inline-block;
        vertical-align: -1px;
        width: 16px;
        height: 12px;
    }

    .title ul li:last-child img {
        width: 12px;
        height: 12px;
    }

    .title ul {
        float: right;
        color: #ee8354;
    }

    .demo-ruleForm .el-form-item.is-required .el-form-item__label:before {
        content: '' !important;
    }
</style>