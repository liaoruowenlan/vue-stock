<template>
	<div class="user_div">
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
					<el-form-item label="选择银行">
						<ul>
							<li v-for="(blank, index ) in blanks" @click="selectStyle(index, blank)" :class="{'actives':blank.active}" :key="index">
								<img :src="blank.iconLink" /> {{blank.bankName}}
							</li>
						</ul>
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
			for(var i = 0; i < this.blanks.length; i++) {
				i === 0 ? this.blanks[i].active = true : this.blanks[i].active = false;
				i === 0 ? this.bindCardId = this.blanks[i].id : '';
			}
			this.blanks = Object.assign({}, this.blanks);
		},
		data() {
			// 验证充值正则表达式；
			var RegText = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('充值金额不能为空'));
				}
				if(!Number.isInteger(value)) {
					callback(new Error('充值金额须为整数且大于100'));
				} else {
					if(value <= 99) {
						callback(new Error('充值金额必须大于100'));
					}
					if(value >= 50001) {
						callback(new Error('充值金额不能大于50000'));
					} else {
						callback();
					}
				}


			};
			return {
				centerDialogVisible: false,
				btnUp: "",
				token: localStorage.getItem('token'),
				phone: localStorage.getItem('phone'),
				activeIdx: 0,
				bindCardId: '',
				banCode: 'null',
				diaOpen: false,
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
				},
				blanks: [

				]
			}
		},
		created() {
			var _this = this;
			axios.get('/strategist/cnaps/bankinfo/pclists')
				.then(function(res) {
					_this.blanks = res.data.result;
					for(var i = 0; i < _this.blanks.length; i++) {
						_this.blanks[i].active = (i == 0);
						if(i == 0) {
							_this.bindCardId = _this.blanks[i].id;
							_this.bankCode = _this.blanks[i].bankCode;
						}
					}
					_this.blanks = Object.assign({}, _this.blanks);
				})
				.catch(function(err) {
					console.log(err)
				});
		},
		computed: {
			spanValue: function() {
				this.btnUp = this.ruleForm.name > 99 && this.ruleForm.name < 50001 && this.ruleForm.name != "" && Number.isInteger(this.ruleForm.name)
			}
		},
		methods: {
			selectStyle(index, item) {
				if(this.activeIdx !== undefined) {
					this.blanks[this.activeIdx].active = false;
				}
				this.activeIdx = index;
				this.$nextTick(function() {
					item.active = !item.active;
					this.$data.blanks = Object.assign({}, this.$data.blanks);
					this.bindCardId = item.id;
					this.bankCode = item.bankCode
				});
			},
			pay() {
				if(!this.btnUp) {
					return false;
				}
				console.log(1);
				//充值金额不能为空、充值金额不能有小数点、充值金额不能大于50000、充值金额不能小于100
				var jump = '/strategist/payment/recharge?' + qs.stringify({
					publisherId: this.publisherId,
					paymentType: 1,
					amount: this.ruleForm.name,
					bankCode: this.bankCode
				});
				window.open(jump), "_blank";
				this.centerDialogVisible = true;
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
	.el-dialog__body {
		text-align: center !important;
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
	
	.el-form-item__content ul {
		width: 645px !important;
		overflow: hidden;
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
	
	.el-form-item__content ul li:nth-child(3n) {
		margin-right: 0;
	}
	
	.el-form-item__content>img {
		width: 302px;
		height: 77px;
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
		color: #3658ad;
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
</style>