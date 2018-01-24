<template>
	<div>
		<top-header></top-header>
		<div class="aBpp">
			<div class="aBpp-swiper">
				<div class="aBpp-swiper-left">
					<img class="img-app1" src="../../assets/img/app-biaoti.png"  />
					<div class="img-app2">					
							<img src="../../assets/img/app-anniu.png" />
							<img src="../../assets/img/app-erweima.png"  />
					</div>
				</div>
				<div class="aBpp-swiper-right">
					<img class="aBpp-swiper-right-img" src="../../assets/img/app-shouji.png" />
					<img class="aBpp-swiper-right-img1" src="../../assets/img/app-alert.png" />
					<div class="app-swiper-img">
						<el-carousel indicator-position="none" height="414px"  arrow="never"  :interval="8000">
					      <el-carousel-item v-for="(item,index) in AppSwiper" :key="index">
					       <img :src="item.img" />					   
					      </el-carousel-item>
					    </el-carousel>
				   </div>
					<div class="app-swiper-text">
						<el-carousel indicator-position="none" height="110px"  arrow="never" :interval="8000" >
					      <el-carousel-item v-for="(item,index) in AppSwiper" :key="index">
						       	<h3 class="overas1">{{item.title}}</h3>
						      		<p class="overas2">
						      			{{item.text}}
						      	</p>	
					      </el-carousel-item>
					    </el-carousel>
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
	
	export default{
		components:{
			TopHeader,
			FooterNav
		},
		data(){
			return{
				 AppSwiper:[
                    {
                         "img": require("../../assets/img/app-jiemian.png"),
                         "title":'APP首页',
                         "text":'信息大聚合，概览大盘信息交易动态与热门股票随时掌握'
                         
                    },
                    {
                       	"img": require("../../assets/img/app-jiemian02.png"),
                       	"title":'持仓',
                       	"text":'对自己持仓对股票随时进行管理，盈亏与结算方便快捷'
                    },
                    {
                        "img": require("../../assets/img/app-jiemian03.png"),
                        "title":'自选',
                        "text":'管理自选股票，及时了解自选股的涨跌'
                    },
                    {
                        "img": require("../../assets/img/app-jiemian04.png"),
                        "title":'资讯',
                        "text":'24小时资讯直播，要闻传递，及时查看第一手资料'
                    },
                    {
                        "img": require("../../assets/img/app-jiemian05.png"),
                        "title":'我的',
                        "text":'账户管理，管理持仓、资金明细、账户设置，还可推广赚钱'
                    }
                ]
			}
		}

	}
</script>

<style scoped>

	.overas1{
		font-size: 20px;
		color: #ff2727;
		font-weight: normal;
	}
	.overas2{
		font-size: 16px;
		color: #fa7000;
	}
	.app-swiper-img{
		width: 235px;
		height: 0 !important;
		margin-left: 16px;
		float: left;
    	margin-top: 64px;
	}
	.aBpp-swiper-right-img1{
			left: 350px;
		    top: 180px;
		    position: absolute;
	}
.app-swiper-text{
	    position: absolute;
    top: 220px;
    height: 0 !important;
    width: 210px;
    left: 400px;
}

.aBpp{
	height: 600px;
	width: 100%;
	background: url(../../assets/img/app-bg.png) no-repeat;
	background-size:100% 100%;
}
.aBpp>.aBpp-swiper{
	width: 1024px;
	margin: 0 auto;
	height: 100%;
}
.aBpp-swiper>div{
	float: left;
}
.img-app1{
	padding-top: 134px;
	padding-left: 95px;
}
.img-app2{
	    padding-left: 54px;
    padding-top: 50px;
}
.img-app2>img:last-child{
	margin-left: 15px;
	margin-top: -15px;
}
.img-app2>img{
	float: left;
}
.aBpp-swiper-right{
	padding-left: 62px;
    margin-top: 24px;
    overflow: hidden;
    position: relative;
    height: 576px;
    width: 587px;
}
.aBpp-swiper-right-img{
	position: absolute;
}

</style>