<template>
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
            <p class="Customer">
            <img class="footer-phone" src="../assets/img/phone.png"/>
                客户热线
            </p>
            <p class="Customer-tel">0755-23065340</p>
            <p class="Customer-time">服务时间 8：00-21：00</p>
        </div>
    </footer>
</template>

<script>
    export default {
        // name: "footer"
    }
</script>

<style scoped>
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
        font-size: 14px;
        color: #1e242e;
        text-align: center;
    }

    footer>.footer-nav ul {
        text-align: center;
        line-height: 36px;
    }

    footer>div ul li {
        color: #687284;
        font-size: 12px;
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