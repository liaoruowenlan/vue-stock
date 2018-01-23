<template>
	<div>
		<top-header></top-header>
		<div class="width100 market">
			<div class="market-header">
				<div class="market-header-div">
					<div class="market-header-text">
						<div>
							上证指数
						</div>
						<p>
							休市中
						</p>
					</div>
					<div class="market-header-number">
						<div class="market-header-number-left">
							<div>
								3390.34
							</div>
							<p>
								<span>+23.17</span>
								<span>+1.30%</span>
							</p>
						</div>
						<div class="market-header-number-right">
							<ul>
								<li>
									<span>最高</span>3470.12
								</li>
								<li>
									<span>今开</span>3470.12
								</li>
								<li>
									<span>成交额</span>70.52亿
								</li>
								<li>
									<span>最低</span>3470.12
								</li>
								<li>
									<span>昨收</span>3470.12
								</li>
								<li>
									<span>成交量</span>7.12亿手
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="market-body">
				<div class="market-body-div">
					<div class="market-body-left">
						
					</div>
					<div class="market-body-right">
						
					</div>
				</div>
			</div>
		</div>
		<footer-nav></footer-nav>
	</div>
</template>

<script>
	import TopHeader from '../../components/header.vue'
	import FooterNav from '../../components/footer.vue'
	import axios from "axios"
    import qs from 'qs'
	
	export default {
		data() {
			return {

			}
		},
		components: {
			TopHeader,
			FooterNav
		}
	}
</script>

<style scoped>
	
	.market-header-number-right ul{
		width: 520px;
		overflow: hidden;
	}
	.market-body{
		width: 100%;
		padding-top: 11px;
	}
	.market-body-left{
		width:748px ;
		height: 100%;
		background: #fff;
	}
	.market-body-right{
		margin-left: 10px;
		width:266px ;
		height: 100%;
		background: #fff;
	}
	.market-body-div{
		height:506px;
		width: 1024px;
		margin: 0 auto;
	}
	.market-body-div>div{
		float: left;
	}
	.market-header-number-right ul li{
		color:#fff;
		font-size: 16px;
		margin-bottom: 18px;
		float: left;
		margin-right: 85px;
	}
	.market-header-number-right ul li:nth-child(3n){
		margin-right: 0;
	}
	.market-header-number-right ul li span{
		display: inline-block;
		color: #ADB3C1;
		margin-right: 15px;
		font-size: 14px;
	}
	.market-header-number-left{
		color: #EE523b;
		margin-right: 109px;
	}
	.market-header-number-left>div{
		font-size:48px;
	}
	.market-header-number-left>p{
		font-size:16px;
		padding-top: 10px;
	}
	.market {
		height: 777px;
		width: 100%;
	}
	
	.market-header {
		height: 240px;
		background: url(../../assets/img/hangqiong-bg.png) no-repeat;
		background-size: 100% 100%;
	}
	.market-header-text div{
		color: #fff;
		font-size: 20px;
		float: left;
	}
		.market-header-text{
			height: 26px;
			padding-top: 44px;
			padding-left: 25px;
			
		}
		.market-header-number{
			padding-left: 22px;
			padding-top: 14px;
			height: 156px;
		}
		.market-header-number>div{
			float: left;
		}
	.market-header-text p {
		width: 36px;
		height: 16px;
		font-size: 12px;
		border: 1px solid #fff;
		color: #fff;
		float: left;
		    margin-top: 6px;
    margin-left: 10px;
	}
	.market-header-div{
		width: 1024px;
		margin: 0 auto;
	}
</style>