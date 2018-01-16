<template>
    <footer>
        <div class="footer-nav">
            <p>新手指引</p>
            <ul>
                <router-link tag="li" :to="{path:'/FooterIndex/footerL',query:{l:'one'}}">
                    点买交易
                </router-link>
                <router-link tag="li" :to="{path:'/FooterIndex/footerL',query:{l:'two'}}">
                    履约保证金
                </router-link >
                <router-link tag="li" :to="{path:'/FooterIndex/footerL',query:{l:'three'}}">
                    递延费
                </router-link >
                <router-link tag="li" :to="{path:'/FooterIndex/footerL',query:{l:'fore'}}">
                    递延条件
                </router-link >
            </ul>
        </div>
        <div class="footer-nav">
            <p>常见问题</p>
            <ul>
                <router-link tag="li" :to="{path:'/FooterIndex/footerM',query:{M:'one'}}">
                    禁止股票
                </router-link >
                <router-link tag="li" :to="{path:'/FooterIndex/footerM',query:{M:'two'}}">
                    收费说明
                </router-link >
                <router-link tag="li" :to="{path:'/FooterIndex/footerM',query:{M:'three'}}">
                    操作止损
                </router-link  >
                <router-link tag="li" :to="{path:'/FooterIndex/footerM',query:{M:'fore'}}">
                    操作时间
                </router-link >
            </ul>
        </div>
        <div class="footer-nav">
            <p>了解我们</p>
            <ul>
                <router-link tag="li"  :to="{path:'/FooterIndex/footerR',query:{R:'one'}}">
                    公司介绍
                </router-link >
                <router-link tag="li"  :to="{path:'/FooterIndex/footerR',query:{R:'two'}}">
                    网站公告
                </router-link>
                <router-link tag="li"  :to="{path:'/FooterIndex/footerR',query:{R:'three'}}">
                    联系我们
                </router-link >
            </ul>

        </div>
        <div class="tel">
            <!--<p class="Customer">-->
            <!--<img class="footer-phone" src="../assets/img/phone.png"/>-->
                <!--客户热线-->
            <!--</p>-->
            <!--<p class="Customer-tel">0755-23065340</p>-->
            <!--<p class="Customer-time">服务时间 8：00-21：00</p>-->
            <div class="continuity">
                <div class="continuity-left">
                    <img src="../assets/img/kf-tel.png" />
                </div>
                <div class="continuity-right">
                    <p class="continuity-onep">
                        <img class="footer-phone" src="../assets/img/phone.png"/>
                        客户热线
                    </p>
                    <p class="continuity-twop">
                        0755-23065340
                    </p>
                    <p class="continuity-threep">
                        服务时间 8:00-21:00
                    </p>
                </div>
            </div>
            <p class="YG-Show">
                优股网 ©2018    深圳市惠普优选科技有限公司
            </p>
            <p class="YG-Show">
                备案/许可证号: 粤ICP备17160831号
            </p>
        </div>
    </footer>
</template>

<script>
    export default {
        // name: "footer"
    }
</script>

<style scoped>
    .continuity-threep{
        font-size: 12px;
        color: #687284;
    }
    .YG-Show{
        font-size: 14px;
        color: #687284;
        margin-bottom: 6px;
    }
    .continuity-twop{
        color: #3e59a7;
        font-size: 16px;
        line-height: 28px;
        font-weight: 700;
    }
    .continuity-onep{
        color: #1c242f;
        font-size: 14px;
        height: 21px;
    }
    .continuity-onep>img{

    }
    .continuity{
        height:80px;
        margin-top:10px;
    }
    .continuity>div{
        float: left;
        height: 100%;
    }
    .continuity-left>img{
        width:132px;
        height: 64px;
    }
    .continuity-right{
        margin-left: 23px;
    }
    li{
    cursor: pointer;
}
    footer {
        height: 208px;
        width: 1024px;
        margin: 0 auto;
        background: #fff;
    }

    footer>div.footer-nav {
        width: 88px;
        height: 128px;
        margin-right: 119px;
        float: left;
        margin-top: 28px;
    }

    footer>.footer-nav p {
        font-size: 16px;
        color: #1e242e;
        text-align: center;
    }

    footer>.footer-nav ul {
        text-align: center;
        line-height: 36px;
    }

    footer>div ul li {
        color: #687284;
        font-size: 14px;
    }

    .tel {
        float: left;
        margin-top: 28px;
    }

    .Customer {
        font-size: 16px;
        margin-bottom: 10px;
        color: #1e242e;
    }

    .Customer-tel {
        font-size: 16px;
        font-weight: bold;
        line-height: 2;
        width: 136px;
        color: #3e59a7;
    }

    .Customer-time {
        width: 183px;
        font-size: 14px;
        line-height: 2.29;
        height: 32px;
    }
    .footer-phone{
        vertical-align: middle;
        margin-top: -3px;
        display: inline-block;
    }
</style>