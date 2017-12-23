<template>
    <div class="user_div">
        <div>
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
                            <li v-for="blank in blanks" @click="selectStyle(blank)"
                                :class="{'actives':blank.active}">
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
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import qs from 'qs'

    export default {
        name: "recharge",
        data() {
            return {
                ruleForm: {
                    name: '',
                    resource: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入充值金额', trigger: 'blur'},
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
        computed:{

        },
        updated: function(){
            for (var i = 0; i < this.blanks.length; i++) {
               this.blanks[i]['active']=false;
            }
            console.log(JSON.stringify(this.blanks))
        },
        methods: {
            addActive: function () {

            },
            selectStyle(item) {
                this.$nextTick(function () {
                    for (var i = 0; i < this.blanks.length; i++) {
                        this.blanks[i].active = false;
                    }
                    item.active = true;
                    console.log(item.active);
                    console.log(item.id);
                });
            }
        }
    }
</script>

<style scoped>
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