import Vue from 'vue'
import Router from 'vue-router'

import { MessageBox } from 'element-ui';
import { clearInterval } from 'timers';
import Quotation from '../pages/quotation/quotation.vue'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home',
            meta: { login: false }
        },
        {
            path: '/home',
            name: 'Home',
            component: resolve => require(['@/pages/home/home.vue'], resolve),
            meta: { login: false }
        },
        {
            path: '/case',
            name: 'Case',
            component: resolve => require(['@/pages/home/case.vue'], resolve),
            meta:{login:false}
        },
        {   	
            path: '/dowapp',
            name: 'Dowapp',
            component: resolve => require(['@/pages/dowapp/dowapp.vue'], resolve),
            meta:{login:false}
        },
        {
            path: '/market',
            name: 'Market',
            component: resolve => require(['@/pages/demo/market.vue'], resolve),
            meta:{login:false}
        },
        {
            path: '/login',
            name: 'Login',
            component: resolve => require(['@/pages/user/login.vue'], resolve),
            meta: { login: false }
        },
        {
            path: '/reset',
            name: 'Reset',
            component: resolve => require(['@/pages/user/reset.vue'], resolve),
            meta: { login: false }
        },
        {
            path: '/register',
            name: 'Register',
            component: resolve => require(['@/pages/user/register.vue'], resolve),
            meta: { login: false }
        },
        {
            path: '/news',
            name: 'news',
            component: resolve => require(['@/pages/newsbanner/newsbanner.vue'], resolve),
            meta: { login: true }
        },
        {
            path: '/app',
            name: 'app',
            component: resolve => require(['@/pages/dowapp/dowapp.vue'], resolve),
            meta: { login: true }
        },
        {
            path: '/help',
            name: 'Help',
            component: resolve => require(['@/pages/help/help.vue'], resolve),
            meta: { login: false }
        },
        {
            path: '/newDetail',
            name: 'newDetail',
            component: resolve => require(['@/pages/newDetail/newDetail.vue'], resolve),
            meta: { login: true }
        },
        {
            path: '/quotation',
            name: 'Quotation',
            component: Quotation,
            meta: { login: true }
        },
        {
            path: '/position',
            component: resolve => require(['@/pages/position/position.vue'], resolve),
            meta: { login: true },
            children: [
                // {
                //     path: '/',
                //     component: resolve => require(['@/pages/position/position/price.vue'], resolve),
                //     redirect: '/position/price'
                // },
                {
                    path: '/',
                    redirect: '/position/price',
                    meta: { login: true },
                    component: resolve => require(['@/pages/position/position/price.vue'], resolve),
                    children: [
                        {
                            path: '/position/price',
                            redirect: '/position/price/holding',
                            component: resolve => require(['@/pages/position/position/price/holding.vue'], resolve),
                            meta: { login: true }
                        },
                        {
                            path: '/position/price/holding',
                            component: resolve => require(['@/pages/position/position/price/holding.vue'], resolve),
                            meta: { login: true }
                        },
                        {
                            path: '/position/price/settlement',
                            component: resolve => require(['@/pages/position/position/price/settlement.vue'], resolve),
                            meta: { login: true }
                        }
                    ]
                },
                {
                    path: '/position/optional',
                    component: resolve => require(['@/pages/position/position/optional.vue'], resolve),
                    meta: { login: true }
                }
            ]
        },
        {

            path: '/myaccount',
            // name:'Myaccount',
            component: resolve => require(['@/pages/myaccount/myaccount.vue'], resolve),
            meta: { login: true },
            children: [
                {
                    path: '/',
                    component: resolve => require(['@/pages/myaccount/myaccount/capital.vue'], resolve),
                    redirect: '/myaccount/capital',
                    meta: { login: true }
                },
                {
                    path: '/myaccount/capital',
                    component: resolve => require(['@/pages/myaccount/myaccount/capital.vue'], resolve),
                    name: 'capital',
                    meta: { login: true }
                },
                {
                    path: '/myaccount/core',
                    component: resolve => require(['@/pages/myaccount/myaccount/core.vue'], resolve),
                    meta: { login: true }
                },
                {
                    path: '/myaccount/recharge',
                    component: resolve => require(['@/pages/myaccount/myaccount/recharge.vue'], resolve),
                    meta: { login: true }
                },
                {
                    path: '/myaccount/setup',
                    component: resolve => require(['@/pages/myaccount/myaccount/setup.vue'], resolve),
                    meta: { login: true }
                },
                {
                    path: '/myaccount/withdrawals',
                    component: resolve => require(['@/pages/myaccount/myaccount/withdrawals.vue'], resolve),
                    meta: { login: true }
                }]
        },
        {
            path: '/FooterIndex',
            component: resolve => require(['@/pages/footer/footerIndex'], resolve),
            name: 'FooterIndex',
            meta: { login: true },
            children: [
                {
                    path: '/FooterIndex/footerL',
                    name: 'footerL',
                    component: resolve => require(['@/pages/footer/footerL'], resolve),
                    meta: { login: true }
                },
                {
                    path: '/FooterIndex/footerM',
                    name: 'footerM',
                    component: resolve => require(['@/pages/footer/footerM'], resolve),
                    meta: { login: true }
                },
                {
                    path: '/FooterIndex/footerR',
                    name: 'footerR',
                    component: resolve => require(['@/pages/footer/footerR'], resolve),
                    meta: { login: true }
                }
            ]
        },

    ]
})
router.beforeEach((to, from, next) => { // 没有token时候,无法跳转其他页面.
    const Token = localStorage.getItem("token");

    if (to.meta.login && !Token) {
        MessageBox.alert('您还没有登录，请先登录', '提示', { confirmButtonText: '确定', }).then(() => {
            next('/login')
        })
    } else {
        next()
    }
})
// router.afterEach((to, from) => {
//     const Token = localStorage.getItem("token");
//     if (!Token) return;
//     console.log(!to.meta.login,!Token)
//     if(!to.meta.login && !Token) return;
//     // 移动了就更新最近一次移动的时间。
//     document.onmousemove = function () {
//         window.lastMove = new Date().getTime();
//     };
//     window.lastMove = new Date().getTime();//最近一次移动时间
//     window.time1 = window.setInterval(function () {//每1秒钟检查一次。
//         var now = new Date().getTime();
//         // 如果超时了
//         // console.log(now - lastMove)
//         if (now - lastMove > 1000*60*.25) {
//             // 自己写了撒。
//             MessageBox.alert('由于长时间未操作，您已退出登录！', '提示', { confirmButtonText: '确定', }).then(() => {
//                 localStorage.clear()
//                 router.push('/login')
//                 return
//             })
//         }
//     }, 1000);
// })
export default router;