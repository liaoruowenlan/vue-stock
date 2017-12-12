<template>
    <div>
        <top-header></top-header>
        <div class="width100">
            <div class="user-title"></div>
            <div class="user-operation">
                <div>
                    <ul>
                        <li>
                            <span>

                            </span>
                            <a href="#">个人中心</a>
                        </li>
                        <li>
                            <span>

                            </span>
                            <a href="#">资金明细</a>
                        </li>
                        <li>
                            <span>

                            </span>
                            <a href="#">充值</a>
                        </li>
                        <li>
                            <span>

                            </span>
                            <a href="#">提现</a>
                        </li>
                        <li>
                            <span class="hover">

                            </span>
                            <a href="#/setup">设置</a>
                        </li>

                    </ul>
                </div>
                <div>

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
        name: "setup",
        components: {
            TopHeader,
            FooterNav
        },
        mounted: function () {

        },
        methods: {

        }
    }
</script>

<style scoped>
    .width100 {
        height: 718px;
    }

    .user-title {
        background: url("../../assets/img/user.png") no-repeat;
        background-size: 100% 100%;
        height: 240px;
    }

    .user-operation {
        height: 538px;
        background: #fff;
        width: 1024px;
        margin: 0 auto;
        margin-top: -90px;
    }

    .user-operation > div {
        float: left;
    }

    .user-operation > div:first-child {
        width: 141px;
        margin-left: 20px;
        background: #f7f7f7;
        margin-top: 25px;
    }

    .user-operation > div:first-child li {
        height: 44px;
        position: relative;
        width: 140px;
        text-align: center;
        line-height: 44px;
        border-bottom: 1px solid #dedee3;
    }

    .user-operation > div:first-child li a {
        font-size: 14px;
        color: #687284;
        display: block;
    }

    .user-operation > div:first-child li .hover {
        width: 6px;
        height: 20px;
        position: absolute;
        background: #ee8354;
        left: 0;
        top: 12px;
    }
    li:hover span{
        width: 6px;
        height: 20px;
        position: absolute;
        background: #ee8354;
        left: 0;
        top: 12px;
    }
</style>