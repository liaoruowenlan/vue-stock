<template>
    <div>
        <top-header></top-header>
        <swiper></swiper>

        <div class="width100">
            <div class="news">
                <img src="../../assets/img/sy-gonggao copy@2x.png" />
                <p>
                    <a href="#">
                        银行为广大中小微企业提供的线上流动资金贷款服务，该产品为结合大数据...
                    </a>
                </p>
                <div>
                    <p>累计匹配策略人数<span>{{money1}}</span>人</p>
                    <p>累计实现交易金额<span>{{money2}}</span>万</p>
                </div>
            </div>
            <div class="buy">
                <a href="#">
                    查看详情>
                </a>
                <a href="#">我要点买</a>
            </div>
            <div class="qrcode">

            </div>
            <div class="introduce">

            </div>
        </div>
        <div class="width100">
            <footer-nav></footer-nav>
        </div>
    </div>
</template>

<script>
    import TopHeader from '../../components/header.vue'
    import FooterNav from '../../components/footer.vue'
    import Swiper from '../../components/swiper.vue'
    export default {
        name: "home",
        components:{
            TopHeader,
            FooterNav,
            Swiper
        },
        data(){
            return {
                money1:'36890',
                money2:'12690'
            }
        }
    }
</script>

<style scoped>

.news{
    height: 42px;
    background: #ffffff;
    width: 1024px;
    margin: 0 auto;
    position: relative;
}
    .news>img{
        width:14px;
        height: 14px;
        position: absolute;
        top: 14px;
        left: 7px;
    }
    .news>p{
        line-height: 42px;
        font-size: 14px;
        margin-left: 27px;
        float: left;

    ;
    }
    .news>p a{
        color: #687284;
    }
    .news>div{
        float: right;
        height: 42px;
        line-height: 36px;
        font-size: 14px;
        color: #3e59a7;
    }
.news>div p{
    float: left;
}
.news>div p>span{
    color: #e26042;
    font-size: 20px;
    font-weight: bold;
    display: inline-block;
    padding: 0 7px;
}
.news>div p:last-child{
    padding-left: 20px;
    padding-right: 8px;
}
    .buy{
        height: 420px;
        width: 1024px;
        margin: 20px auto;
        background: url("../../assets/img/Rectangle5@2x.png") no-repeat;
        background-size: 100% 100%;
        margin-bottom: 20px;
        position: relative;
    }
    .width100{
        padding-bottom: 1px;
    }
    .buy>a:first-child{
        width: 64px;
        height: 16px;
        font-size: 12px;
        color: #e26042;
        display: block;
        text-align: justify;
        position: absolute;
        top: 149px;
        left: 502px;
    }
    .buy>a:last-child{
        width: 192px;
        height: 36px;
        background-image: linear-gradient(259deg, #ff622d, #ffa255);
        display: block;
        text-align: center;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        letter-spacing: 1px;
        position: absolute;
        left: 411px;
        top: 284px;
    }
    .qrcode{
        height: 540px;
        width: 1024px;
        background: url("../../assets/img/Rectangle6@2x.png") no-repeat;
        background-size: 100% 100%;
        margin: 20px auto;
    }
    .introduce{
        height: 254px;
        width: 1024px;
        background: url("../../assets/img/Rectangle7@2x.png") no-repeat;
        background-size: 100% 100%;
        margin: 20px auto;
    }
</style>