<template>
    <div>
        <top-header></top-header>
        <div class="quotation">
            <div class="width100 bg">
                <div class="stock-seo">
                    <div class="stock">
                        <div class="stock-text">
                            <span class="text">平安银行</span>
                            <span class="number">000001</span>
                        </div>
                        <div class="stock-number">
                            12.41
                        </div>
                        <div class="stock-rose">
                            <span>+0.17%</span>
                            <span>+1.30%</span>
                        </div>
                    </div>
                    <div class="buy">
                        <a href="#" class="refresh">
                            刷新
                        </a>
                        <a href="#" class="buy-btn">
                            点买
                        </a>
                    </div>
                    <div class="stock-seo-div">
                        <div class="seo-text">
                            <input type="text" placeholder="输入股票名称／代码／简拼" class="seo-val" />
                            <input type="button" value="搜索" class="seo-btn"/>
                        </div>
                        <div class="stock_export">
                            <div v-for="text in message">
                                <p class="bond-title">{{text.name}}</p>
                                <p class="bond-number">{{text.lastPrice}}</p>
                                <div class="bond-rose">
                                    <span>{{text.upDropPrice}}</span>
                                    <span>{{text.upDropSpeed}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="width100">
                <div class="stock-data">
                    <div id="main" style="width: 594px; height: 482px">
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
    import  axios from 'axios'

    import echarts from 'echarts'

    export default {
        name: "quotation",
        data(){
            return{
                message: null
            }
        },
        components:{
            TopHeader,
            FooterNav
        },
        created(){
            axios.get('/strategist/system/stockMarketExponent')
            .then(function (response) {
                if(response.data.code == 200){
                    this.message = response.data.result;
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })
        },
        mounted(){

        }
    }

</script>

<style scoped>
    .stock-data{
        width: 1024px;
        background: #fff;
        margin: 0 auto;
    }
    .stock-seo{
        width: 1024px;
        margin: 0 auto;
        height: 240px;
    }
    .stock-seo>div{
        float: left;
    }
    #main{
        width: 594px;
        height: 482px;
    }
.bg{
    background: url("../../assets/img/beijingtu02@2x.png") no-repeat;
    background-size: 100% 100%;
}
    .stock{
        width: 161px;
        margin-left: 42px;
    }
    .stock-text{
        color: #fff;
        font-size: 14px;
        padding-top: 42px;
    }
    .stock-number{
        font-size: 64px;
        color: #ff583D;
        padding-top: 18px;
        font-family: fantasy;
        letter-spacing: 10px;
    }
    .stock-rose{
        font-size: 14px;
        color: #ff583d;
        padding-top: 13px;
    }
    .stock-rose>span:first-child{
        padding-right: 28px;
    }
    .buy{
        margin-left: 60px;
    }
    .refresh{
        margin-top: 77px;
        display: block;
        width: 133px;
        height: 32px;
        border: 1px solid #adb3c1;
        color: #adb3c1;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
    }
    .buy-btn{
        display: block;
        margin-top: 26px;
        width: 133px;
        height: 32px;
        border: 1px solid #ee8354;
        background: #ee8354;
        text-align: center;
        color: #ffffff;
        line-height: 32px;
        font-size: 14px;
    }
    .stock-seo-div{
        margin-top: 20px;
        margin-left: 194px;
    }
    .seo-text>input  {
        float: left;
    }
    .seo-val{
        width: 329px;
        font-size: 14px;
        padding-left:35px ;
        background: url("../../assets/img/search@2x.png") no-repeat 8px 7px;
        background-color:#fff !important;
        background-size:16px 17px;
        border: 0;
        height: 32px;
    }
    .seo-btn{
        border: 0;
        width: 60px;
        height: 32px;
        font-size:14px;
        color: #fff;
        background:#adb3c1 ;
    }
    .stock_export{
        width: 424px;
        height: 147px;
        background: #000;
        background:rgba(0,0,0,.25);
        margin-top: 15px;
    }
    .seo-text{
        overflow: hidden;
    }
    .stock_export>div{
        width:141px;
        float: left;
        text-align: center;
    }
    .stock_export>div>.bond-title{
        margin-top: 36px;
        font-size: 14px;
        color: #fff;
    }
    .stock_export>div>.bond-number{
        font-size: 22px;
        color: #e26042;
        margin-top: 9px;
    }
    .stock_export>div>.bond-rose{
        font-size: 12px;
        color: #46c032;
        margin-top: 9px;
    }
    .stock_export>div>.bond-rose>span:first-child{
        margin-right: 10px;
    }
    .stock-data{
        height: 808px;
        width: 1024px;
        margin: 0 auto;
        background: #fff;
    }
</style>