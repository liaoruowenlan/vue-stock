<template>
    <div>
        <top-header></top-header>
        <div class="width100">
            <div class="position">
                <div class="position-left">
                    <ul>
                        <li v-for="(item) in navLists"><router-link :to="item.url"><i></i>{{item.text}}</router-link></li>
                    </ul>
                </div>
                <div class="position-right">
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
                <div style="clear: both;">

                </div>
            </div>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import TopHeader from '../../components/header.vue'
    import FooterNav from '../../components/footer.vue'

    export default {
        name: "position",
        data(){
            return{
                navLists:[
                    {
                        "text":"持仓",
                        "url":"/position/price"
                    },
                    {
                        "text":"自选股",
                        "url":"/position/optional"
                    }
                ]
            }
        },
        components:{
            TopHeader,
            FooterNav
        }
    }
</script>

<style scoped>
.position{
    width: 1024px;
    min-height: 656px;
    margin: 0 auto;
    padding-top: 10px;
    margin-bottom: 20px;
    background: #f7f7f7;
}
.position:after{
    content:"";
    display:block;
    height:0;
    clear:both;
    visibility:hidden;
}
.position-right{
    float: right;
    width: 884px;
    margin: 0 auto;
    margin-left: 9px;
    background: #fff;
    min-height: 626px;
}

.position-left ul li {
    height: 44px;
    position: relative;
    width: 131px;
    text-align: center;
    line-height: 44px;
    color: #687284;
}
.position-left>ul li a{
    color: #687284;
}
.position-left li:hover a{
    color: #ee8354;
}
.router-link-active{
    color: #ee8354 !important;
    background: url("../../assets/img/border-bg@2x.png") no-repeat;
    display: block;
    background-size: 4.5% 103%;
}
.position-left{
    float: left;
    background: #f7f7f7 !important;
    width: 131px;
}
    .position .position-left>ul{
        height: 626px;
        background: #ffffff;
    }
</style>