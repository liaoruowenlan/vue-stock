<template>
	<div>
		<top-header></top-header>
		<div class="aBpp">
			
		</div>
		<footer-nav></footer-nav>
	</div>
</template>

<script>
	import TopHeader from '../../components/header.vue'
    import FooterNav from '../../components/footer.vue'
	
	export default{
		components:{
			TopHeader,
			FooterNav
		},
		data(){
			return{
				
			}
		}

	}
</script>

<style scoped>
.aBpp{
	height: 600px;
	background: #000;
	width: 100%;
}
/*.aBpp .ap_body{
	width: 1024px;
	background: #fff !important;
	height: 100%;
}*/
</style>