<template xmlns="http://www.w3.org/1999/html">
	<section>
		<div>
			<div class="login-div">
				<div class="login-title">
					<div class="login-title-left"></div>
					<p>欢迎登录</p>
					<div class="login-title-right"></div>
				</div>
				<div class="phone">
					<p>手机号码</p>
					<input type="text" />
				</div>
				<div class="passworld">
					<p>登陆密码</p>
					<input type="password" />
				</div>
				<input type="button" value="登陆" class="login-btn" v-on:click="doThis()" />
				<div class="login-operation">
					<a href="#">
						忘记密码
					</a>
					<a href="#/register">
						注册账号
					</a>
				</div>
			</div>
		</div>

		<ul>
			<li v-for="item in recommendList">
				{{ item.name }}
			</li>
		</ul>
	</section>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "login",
		data () {
            return {
                recommendList: []
			}
		},
        mounted: function() {
            var _this = this;
            axios.get('http://10.0.0.99:8083/tactics/stock/stockRecommend?page=0&size=10')
			.then(function (response) {
			    _this.recommendList = response.data.result.content;
			    console.log(_this.recommendList)
			})
			.catch(function (response) {
				console.log(response);
			});
        },
		methods: {
            doThis: function () {
				alert("doThis");
            }
		}
    }
</script>
<style>
section{
	background: url("../assets/img/bg.png") no-repeat;
	background-size:100% 100%;
	height: 480px;
}
section>div {
	width: 1024px;
	margin: 0 auto;
}
.login-div {
	width: 374px;
	height: 346px;
	background: #fff;
	float: right;
	margin-top: 42px;
	position: relative;
}
.phone{
	margin-top: 28px;
	margin-bottom: 37px;
	height: 32px;
}
.phone p,.passworld p{
	margin-left: 42px;
	font-size: 14px;
	color: #687284;
	float: left;
	margin-right: 10px;
	line-height: 32px;
}
.phone input,.passworld input {
	width: 212px;
	height: 32px
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
		margin-top: 46px;
		opacity: .3;
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