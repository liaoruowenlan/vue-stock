<template>
	<div class="user_div" v-loading="loading">
		<div v-model="spanValue">
			<div class="title">
				充值
				<ul>
					<li>
						<img src="../../../assets/img/myblank.png" />
						<router-link to="/myaccount/core">充值记录</router-link>
					</li>
				</ul>
			</div>
			<div>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" label-position="left">
					<el-form-item label="充值金额" prop="name">
						<el-input v-model.number="ruleForm.name"></el-input>
					</el-form-item>
					<el-form-item label="支付方式" prop="name">
						<img src="../../../assets/img/blanks@2x.png" />
					</el-form-item>
					<el-form-item label="银行卡">
						<!-- <ul>
							<li v-for="(blank, index ) in blanks" @click="selectStyle(index, blank)" :class="{'actives':blank.active}" :key="index">
								<img :src="blank.iconLink" /> {{blank.bankName}}
							</li>
						</ul> -->
						 <div class="blankTwo" v-if="blankListOne">
							<ul>
								<li class="blank-list" v-for="(item,index) in blankdata" @click="setActive(index)" :class="{'Clickactive':item.blankActive}" :key="index">
									<img :src="item.bankIconLink" />
									<div>
										<p>{{item.bankName}}</p>
										<p>{{item.bankCard}}</p>
									</div>
								</li>
							</ul>
						</div>
						<div v-else>
							  <el-button type="primary"  size="small"  @click="stockBlank">添加银行卡</el-button>
						</div>	
					</el-form-item>
					<el-form-item label="验证码" >
						<div class="AuCode">
							<input type="text" v-model="userAcd" maxlength="6"  />
							<span v-show="show" :class="this.AuCodeUp?'addColor':''" @click="getAuCode()">获取验证码</span>
							<span class="addColor" v-show="!show">{{count}}s</span>
						</div>
					</el-form-item>
				</el-form>
				<div class="pay" :class="btnUp?'addColor':''" @click="pay">
					充值
				</div>
			</div>
		</div>
		<el-dialog title="正在充值中" :visible.sync="centerDialogVisible" width="30%" center :show-close="!centerDialogVisible">
			<span style="display: block;text-align: center">正在充值中，请勿关闭窗口!</span>
			<span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="payGouser">已成功充值!</el-button>
             </span>
		</el-dialog>
	</div>
</template>

<script>
	import axios from "axios"
	import qs from 'qs'

	export default {
		name: "recharge",
		mounted() {
			// for(var i = 0; i < this.blanks.length; i++) {
			// 	i === 0 ? this.blanks[i].active = true : this.blanks[i].active = false;
			// 	i === 0 ? this.bindCardId = this.blanks[i].id : '';
			// }
			// this.blanks = Object.assign({}, this.blanks);
		},
		data() {
			// 验证充值正则表达式；
			var RegText = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('充值金额不能为空'));
				}
				// if(!Number.isInteger(value)) {
				// 	callback(new Error('充值金额须为整数且大于100'));
				// } else {
				// 	if(value <= 99) {
				// 		callback(new Error('充值金额必须大于100'));
				// 	}
				// 	if(value >= 4501) {
				// 		callback(new Error('充值金额不能大于4500'));
				// 	} else {
				// 		callback();
				// 	}
				// }
			};
			return {
				AuCodeUp:'',
				show:true,
				paymentNo:'000000',
				userAcd:'',
				blankActive:'',
				centerDialogVisible: false,
				btnUp: "",
				blankListOne:true,
				loading:'',
				count:'',
				blank:'',
				blankId:'',
				token: localStorage.getItem('token'),
				phone: localStorage.getItem('phone'),
				activeIdx: 0,
				bindCardId: '',
				banCode: 'null',
				diaOpen: false,
				blankdata: {},
				publisherId: localStorage.getItem('id'),
				ruleForm: {
					name: '',
					resource: '',
				},
				rules: {
					name: [{
						validator: RegText,
						trigger: "blur"
					}]
				}
			}
		},
		created() {
			 var _this = this;
      	axios
        .get("/strategist/bindCard/myBankCardList", {
          headers: {
            Authorization: this.token
          }
        })
        .then(function(res) {
			if(res.data.result.length == 0){
				_this.blankListOne = false;
			}
          console.log(res.data);
          // _this.User = res.data.result;
          _this.blankdata = res.data.result;
          _this.blankId = res.data.result[0].id;
          for (var i = 0; i < _this.blankdata.length; i++) {
            _this.blankdata[i].blankActive = i == 0;
            _this.activeIdx = 0;
          }
          _this.blankdata = Object.assign({}, _this.blankdata);
        })
        .catch(function(err) {
          console.log(err);
        });
		},
		computed: {
			spanValue: function() {
				// this.btnUp = this.ruleForm.name > 99 && this.ruleForm.name < 4501 && this.ruleForm.name != "" && Number.isInteger(this.ruleForm.name)
				this.btnUp = true;
			}
		},
		methods: {
			getAuCode(){
				  if(!this.btnUp){
			        return false;
                }
                var _this = this;
                axios.post("/strategist/payment/quickpaymessage",qs.stringify({
                    amount:_this.ruleForm.name,
                    bindCardId:_this.blankId
                }))
                    .then(function(res){
						if(res.data.code==2012){
							 _this.$message({
                                message: '不支持的银行卡号。',
                                type: 'error',
                                duration:1500
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
						_this.paymentNo = res.data.result;
                    }).catch(function(err){
                        console.log(err)
                })
			},
			Unbundling(item) {
			this.singleBank = item;
			console.log(item);
			},
			stockBlank(){
				 this.$router.push({ path: 'withdrawals' });
			},
			setActive(index) {
				if (this.activeIdx !== undefined) {
					this.blankdata[this.activeIdx].blankActive = false;
				}
				this.activeIdx = index;
				this.BBlank = this.blankdata[index].bankCard;
				this.blankId = this.blankdata[index].id;
				console.log(this.blankId);
				this.blankdata[index].blankActive = true;
				this.blankdata = Object.assign({}, this.blankdata);				
			},
			pay() {
				var _this = this;
				
				if(!this.btnUp) {
					return false;
				}
				//充值金额不能为空、充值金额不能有小数点、充值金额不能大于50000、充值金额不能小于100
				 _this.loading = true;
				 axios.post("/strategist/payment/quickpay",qs.stringify({
                    paymentNo:this.paymentNo,
					bindCardId:this.blankId,
					validaCode:this.userAcd
                }))
				.then(function(res){
					if(res.data.code == '1003'){
						 _this.loading = false;
						 _this.$message({
                                message: '请先获取验证码',
                                type: 'error',
                                duration:1500
                            });
                            return false;
					}
					if(res.data.code == "200"){
						 _this.loading = false;
						 _this.$message({
                                message: '充值成功，正在跳转中',
								type: 'success',
								duration:3000,
								onClose:function(){
									 _this.$router.push({ path: 'capital' });
								}
                            });
							return false;	
					}else{
						 _this.$message({
                                message:res.data.message,
								type: 'error',
								duration:1500
                            });
							return false;	
					}
				})
				.catch(function(err){
                        console.log(err)
                })
			},
			payGouser() {
				var _this = this;
				_this.$router.push({
					path: '/myaccount/capital'
				});
			}
		}
	}
</script>

<style scoped>
	.addColor{
		background:#ee8354 !important;
		color: #fff !important;
	}
	.AuCode input{
		    width: 214px;
			height: 30px;
			line-height: 30px;
			border: solid 1px #dcdee3;		
	}
	.AuCode span {
display: block;
    width: 68px;
    height: 20px;
    color: #adb3c1;
    font-size: 12px;
    text-align: center;
    background: #f7f7f7;
    border: 0;
    position: absolute;
    top: 10px;
    left: 145px;
    line-height: 20px;
    cursor: pointer;
}
	.el-dialog__body {
		text-align: center !important;
	}
	.el-form-item__content ul li.actives {
		background-image: url("../../../assets/img/selet.png");
		color: #ee8354 !important;
	}
	.pay {
		width: 360px;
		height: 48px;
		background: #f9d9cb;
		text-align: center;
		color: #fff;
		margin: 0 auto;
		line-height: 48px;
		font-size: 16px;
		margin-bottom: 20px;
	}
	
	.el-form-item__content>img {
		width: 302px;
		height: 42px;
	}
	
	.user_div {
		min-height: 538px;
	}
	
	.addColor {
		background: #ee8354 !important;
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
		color: #687284;
	}
	
	.title ul li {
		float: left;
		margin-right: 15px;
		color: #ee8354;
	}
	
	.title ul li a {
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
.blankTwo ul li.Clickactive {
  background-image: url("../../../assets/img/blank-selet1.png");
}
.blankTwo ul li:nth-child(2n){
	margin-right: 0;
}
.blankTwo ul li {
     width: 310px;
	height: 92px;
	border-radius: 8px;
	background-color: #4277e8;
	float: left;
	margin-right: 25px;
	margin-bottom: 19px;
	background: #4277e8 url("../../../assets/img/blank-selet.png") no-repeat 286px
		4px;
	background-size: 20px 20px;
}
.blank-list {
    cursor: pointer;
}
/* .no-bg {
    background: #4277e8 !important;
} */
.blankTwo ul li img {
    width: 52px;
    height: 52px;
    margin: 20px 0px 20px 15px;
    border-radius: 30px;
    float: left;
}
.blankTwo .blank-list div {
    padding-left: 7px;
    float: left;
}
.blankTwo .blank-list div > p:first-child {
    color: #fff;
	font-size: 14px;
	padding-top: 23px;
	line-height: initial;
}
.blankTwo .blank-list div > p:last-child {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
	padding-top: 9px;
	line-height: initial;
}
</style>