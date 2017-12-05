<template>
	<div id="app">
		<header class="nav">
			<div class="logo">
				<img src="src/assets/img/logo.png" />
			</div>
			<div class="logo-nav">
				<ul>
					<li class="active">
						首页
					</li>
					<li>
						详情
					</li>
					<li>
						持仓
					</li>
					<li>
						我的账户
					</li>
				</ul>
			</div>
			<div class="nav-login">
				<ul>
					<li>
						<a href="#/register">注册</a>
					</li>
					<li class="border"></li>
					<li>
						<a href="#/login">登陆</a>
					</li>
					<li>
						帮助中心
					</li>
				</ul>
			</div>
		</header>
		<router-view/>
		<footer>
			<div class="footer-nav">
				<p>新手指引</p>
				<ul>
					<li>
						点买交易
					</li>
					<li>
						履约保证金
					</li>
					<li>
						递延费
					</li>
					<li>
						递延条件
					</li>
				</ul>
			</div>
			<div class="footer-nav">
				<p>常见时间</p>
				<ul>
					<li>
						禁止股票
					</li>
					<li>
						收费说明
					</li>
					<li>
						操作止损
					</li>
					<li>
						操作时间
					</li>
				</ul>
			</div>
			<div class="footer-nav">
				<p>了解我们</p>
				<ul>
					<li>
						公司介绍

					</li>
					<li>
						网站公告
					</li>
					<li>
						联系我们
					</li>
				</ul>

			</div>
			<div class="tel">
				<p class="Customer">客户热线</p>
				<p class="Customer-tel">0755-23065340</p>
				<p class="Customer-time">服务时间 8：00-21：00</p>
			</div>
		</footer>
	</div>
</template>
<script>
export default {
  name: 'app'
}
</script>

<style>

</style>
