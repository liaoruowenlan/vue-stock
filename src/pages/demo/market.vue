<template>
	<div>
		 <top-header></top-header>
		 <div class="width100 market">
		 	<div class="market-header">
		 		
		 	</div>
		 </div>
		 <footer-nav></footer-nav>
	</div>
</template>

<script>
	import TopHeader from '../../components/header.vue'
    import FooterNav from '../../components/footer.vue'
	
	export default{
		data(){
			return{
				
			}
		},
		components:{
			TopHeader,
			FooterNav
		}
	}
</script>

<style scoped>
	.market{
		height: 777px;
		width: 100%;
	}
	.market-header{
		height: 240px;
		background:url(../../assets/img/hangqiong-bg.png) no-repeat;
		background-size:100% 100%;
	}
</style>