<template>
	<section>
		<div>
			<div class="login-div">
				<div class="login-title">
					<div class="login-title-left"></div>
					<p>欢迎注册</p>
					<div class="login-title-right"></div>
				</div>
				<div class="phone">
					<p>手机号码</p>
					<input type="text" />
				</div>
				<div class="AuCode">
					<p class="mr24">验证码</p>
					<input type="text" />
					<button>获取验证码</button>
				</div>
				<div class="passworld">
					<p>登陆密码</p>
					<input type="password" />
					<img src="../assets/img/dl-yincang@2x.png" v-on:click="myMethod()" />
				</div>
				<input type="button" value="注册" class="login-btn"  />
				<div class="login-operation">
					<a href="#"></a>
					<a href="#/login">
						已有账号，直接登录
					</a>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
	    name: "register",
		mounted: function() {

		},
		methods: {
	        myMethod: function () {
				var _this = this;
				alert(_this.src);
            }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	section{
		background: url("../assets/img/bg.png") no-repeat;
		background-size:100% 100%;
		height: 480px;
	}
	section>div {
		width: 1024px;
		margin: 0 auto;
	}
	.passworld img{
		width: 16px;
		height: 7.5px;
		position: absolute;
		right: 66px;
		top: 12px;
	}
	.passworld img:hover{
		cursor: pointer;
	}
	.login-div {
		width: 374px;
		height: 382px;
		background: #fff;
		float: right;
		margin-top: 42px;
		position: relative;
	}
	.login-title{
		text-align: center;
		font-size: 18px;
		color: #1e242e;
	}
	.login-title>div{
		position: absolute;
		top: 45px;
		height: 1px;
		width: 80px;
		background: #1e242e;
	}
	.login-title-left{
		left: 45px;
	}
	.login-title-right{
		right: 45px;
	}
	.login-title p{
		margin-top: 32px;
	}
	.login-btn{
		width: 260px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		font-size: 16px;
		color: #fff;
		background:#ee8354 ;
		border: 0;
		margin-left: 54px;
		margin-top: 35px;
		opacity: .3;
	}
	.phone,.passworld,.AuCode{
		position: relative;
	}
	.phone>div,.passworld>div,AuCode>div{
		position: absolute;
		bottom: -21px;
		color: #e26042;
		font-size: 12px;
		left: 110px;
	}
	.phone{
		margin-top: 23px;
		margin-bottom: 28px;
	}
	.mr24{
		margin-right: 24px !important;
	}

	.phone p,.passworld p,.AuCode p{
		margin-left: 42px;
		font-size: 14px;
		color: #687284;
		float: left;
		margin-right: 10px;
		line-height: 32px;
	}
	.AuCode{
		margin-bottom: 33px;
	}
	.phone input,.passworld input,.AuCode input{
		width: 212px;
		height: 28px
	}
	button{
		width: 68px;
		height: 20px;
		color: #adb3c1;
		font-size: 12px;
		text-align: center;
		background:#f7f7f7 ;
		border: 0;
		position: absolute;
		right: 60px;
		top: 6px;
	}
	.login-operation{
		width: 260px;
		margin-left: 54px;
		margin-top: 8px;
	}
	.login-operation>a:first-child{
		font-size: 12px;
		color: #3db3c1;
		text-decoration: underline;
		float: left;
	}
	.login-operation>a:last-child{
		font-size: 12px;
		color: #ee8354;
		float: right;
	}
</style>
