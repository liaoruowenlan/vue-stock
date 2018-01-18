import Vue from 'vue'
import Router from 'vue-router'

import { MessageBox } from 'element-ui';

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'Home',
            component: resolve => require(['@/pages/home/home.vue'], resolve)
        },
        {
            path: '/login',
            name: 'Login',
            component:  resolve => require([ '@/pages/user/login.vue'], resolve)
        },
        {
            path: '/reset',
            name: 'Reset',
            component:  resolve => require([ '@/pages/user/reset.vue'], resolve)
        },
        {
            path: '/register',
            name: 'Register',
            component:  resolve => require(['@/pages/user/register.vue'], resolve)
        },
        {
            path: '/help',
            name: 'Help',
            component: resolve => require(['@/pages/help/help.vue'], resolve)
        },
        {
            path: '/quotation',
            name: 'Quotation',
            component:  resolve => require(['@/pages/quotation/quotation.vue'], resolve)
        },
        {
            path: '/position',
            component: resolve => require(['@/pages/position/position.vue'], resolve),
            children: [
                // {
                //     path: '/',
                //     component: resolve => require(['@/pages/position/position/price.vue'], resolve),
                //     redirect: '/position/price'
                // },
                {
                    path: '/',
                    redirect:'/position/price',
                    component: resolve => require(['@/pages/position/position/price.vue'], resolve),
                    children:[
                        {
                            path: '/',
                            redirect: '/position/price/holding',
                            component: resolve => require(['@/pages/position/position/price/holding.vue'], resolve),
                        },
                        {
                            path: '/position/price/holding',
                            name:'holding',
                            component: resolve => require(['@/pages/position/position/price/holding.vue'], resolve)
                        },
                        {
                            component: resolve => require(['@/pages/position/position/price/settlement.vue'], resolve) ,
                            path: '/position/price/settlement'
                        }
                    ]
                },
                {path: '/position/optional', component:  resolve => require(['@/pages/position/position/optional.vue'], resolve) }
            ]
        },
        {

            path: '/myaccount',
            // name:'Myaccount',
            component:resolve => require(['@/pages/myaccount/myaccount.vue'], resolve),
            children: [
                {path: '/', component:resolve => require(['@/pages/myaccount/myaccount/capital.vue'], resolve) , redirect: '/myaccount/capital'},
                {path: '/myaccount/capital', component: resolve => require(['@/pages/myaccount/myaccount/capital.vue'], resolve) ,name:'capital'},
                {path: '/myaccount/core', component: resolve => require(['@/pages/myaccount/myaccount/core.vue'], resolve) },
                {path: '/myaccount/recharge', component: resolve => require(['@/pages/myaccount/myaccount/recharge.vue'], resolve) },
                {path: '/myaccount/setup', component: resolve => require(['@/pages/myaccount/myaccount/setup.vue'], resolve) },
                {path: '/myaccount/withdrawals', component: resolve => require(['@/pages/myaccount/myaccount/withdrawals.vue'], resolve) }]
        },
        {
            path:'/FooterIndex',
            component:resolve => require(['@/pages/footer/footerIndex'], resolve),
            name:'FooterIndex',
            children:[
                {
                    path:'/FooterIndex/footerL',
                    name:'footerL',
                    component: resolve => require(['@/pages/footer/footerL'], resolve)
                },
                {
                    path:'/FooterIndex/footerM',
                    name:'footerM',
                    component:resolve => require(['@/pages/footer/footerM'], resolve)
                },
                {
                    path:'/FooterIndex/footerR',
                    name:'footerR',
                    component:resolve => require(['@/pages/footer/footerR'], resolve)
                }
            ]
        },
        
    ]
})
router.beforeEach((to, from, next) => { // 没有token时候,无法跳转其他页面.
    const Token = sessionStorage.getItem("token");
    // console.log(to)
    if(  to.name == 'Quotation' || to.name == 'holding'|| to.name == 'capital'|| to.name == 'holding' ){
        if(!Token){
            MessageBox.alert('您还没有登录，请先登录','提示',{confirmButtonText: '确定',})
            next('/login')
        }else{
            next()
        }
    }else{
        next()
    }
})
export default router;