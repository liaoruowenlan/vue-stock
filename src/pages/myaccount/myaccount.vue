<template>
    <div>
        <top-header></top-header>
        <div class="width100">
            <div class="user-title"></div>
            <div class="user-operation">
                <div>
                    <ul>
                        <li>
                            <router-link to="/myaccount/capital">
                            <i></i>
                                个人中心
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/myaccount/core">
                            <i></i>
                            资金明细
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/myaccount/recharge">
                            <i></i>
                            充值
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/myaccount/withdrawals">
                            <i></i>
                            提现
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/myaccount/setup">
                            <i></i>
                           设置
                            </router-link>
                        </li>

                    </ul>
                </div>
                <div>
                    <transition name="fade" mode="out-in">
                    <router-view></router-view>
                    </transition>
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
        name: "myaccount",
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
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0
    }
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
        color: #687284;
        border-bottom: 1px solid #dedee3;
    }

    .user-operation > div:first-child li .hover {
        width: 6px;
        height: 20px;
        position: absolute;
        background: #ee8354;
        left: 0;
        top: 12px;
    }

    .user-operation > div:first-child li a:hover{
        color: #ee8354;
    }
    li:hover a{
        color: #ee8354;
    }
    li:hover i {
        width: 6px;
        height: 20px;
        position: absolute;
        background: #ee8354;
        left: 0;
        top: 12px;
    }
    .router-link-active{
        color: #ee8354;
    }
</style>