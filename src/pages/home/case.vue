<template>
	<div>
		<top-header></top-header>
		<div class="width100 case">
			<div class="case-title">
				 <router-link to="/register">首页</router-link>
				<span>&gt;</span> 
				<span>点买模式案列</span>
			</div>
			<div class="case-setion">
				<ul class="case-ul">
					<li>
						<img src="../../assets/img/anli-01.png" />
						<img class="case-img-b" src="../../assets/img/anli-jiantou.png" />
						<p>
							小优是个有为青年，经好友邀请，想把手头上的1万元投入到优股网，优股网有止损比例限制，小优很放心；
						</p>
					</li>
					<li>
						<img src="../../assets/img/anli-02.png" />
						<img class="case-img-b" src="../../assets/img/anli-jiantou.png" />
						<p>
							看了大盘行情，小优决定点买平台推出的A方案：5倍杠杆、20元/股，共2500股，止损率17.5%，风险相对小；
						</p>
					</li>
					<li>
						<img src="../../assets/img/anli-03.png" />
						<img class="case-img-b" src="../../assets/img/anli-jiantou.png" />
						<p>
							小优提交订单后，优股网客服快速进行处理，冻结了1万元保证金；
						</p>
					</li>
					<li>
						<img src="../../assets/img/anli-04.png" />
						<img class="case-img-b" src="../../assets/img/anli-jiantou.png" />
						<p>
							股票上涨后，小优很是惊喜，于是立即发起卖出指令，卖出2500股，卖出价为22元；
						</p>
					</li>
					<li>
						<img src="../../assets/img/anli-05.png" />
						<img class="case-img-b" src="../../assets/img/anli-jiantou.png" />
						<p class="case-ul-p">
							小优获得盈利的90%，投资人获得10%，即（22-20）*2500*90%=4500元；
						</p>
					</li>
					<li>
						<img src="../../assets/img/anli-06.png" />
						<p class="case-ul-p">
							经核算，扣除服务费225元（成本）后，小优最终获利4500-225=4225元；
						</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="width100-bg">
			<footer-nav></footer-nav>
		</div>
	</div>
</template>

<script>
	import TopHeader from '../../components/header.vue'
	import FooterNav from '../../components/footer.vue'

	export default {
		name: "case",
		 components:{
            TopHeader,
            FooterNav
		},
		data() {
			return{
				
			}
		}
	}
</script>

<style scoped>
	.case{
		height: 1122px;
	}
	.case-title{
		padding-top: 10px;
		width: 1024px;
		margin: 0 auto;
		font-size: 14px;
		color:#ADB3C1;
	}
		.case-title>a{
			color: #3E59A7;
		}
		.case-setion{
			width: 1024px;
			margin: 0 auto;
			height: 1065px;
			background: #fff;
			margin-top: 8px;
		}
		.case ul li{
			position: relative;
			height: 178px;
		}
		.case ul li:first-child{
			padding-top: 26px;
		}
		.case ul li:first-child p{
			top: 79px !important;
		}
		.case-ul li img{
			margin: 0 auto;
		}
		.case-ul-p{
			width: 618px !important;
			height: 24px !important;
			top: 63px !important;
		}
		.case-img-b{
			margin-top: 17px !important;	
		}
		.case ul li p{
			width: 551px;
			height: 48px;
			font-size: 18px;
			color: #fff;
			position: absolute;
			left: 299px;
			top: 53px;
		}
</style>