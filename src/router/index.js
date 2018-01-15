import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home.vue'
import Login from '@/pages/user/login.vue'
import Reset from '@/pages/user/reset.vue'
import Register from '@/pages/user/register.vue'
import Help from '@/pages/help/help.vue'
import Myaccount from '@/pages/myaccount/myaccount.vue'
import Position from '@/pages/position/position.vue'

import Capital from '@/pages/myaccount/myaccount/capital.vue'
import Core from '@/pages/myaccount/myaccount/core.vue'
import Recharge from '@/pages/myaccount/myaccount/recharge.vue'
import Setup from '@/pages/myaccount/myaccount/setup.vue'
import Withdrawals from '@/pages/myaccount/myaccount/withdrawals.vue'
import Quotation from '@/pages/quotation/quotation.vue'

import Price from '@/pages/position/position/price.vue'

import Holding from '@/pages/position/position/price/holding.vue'
import Settlement from '@/pages/position/position/price/settlement.vue'

import Optional from '@/pages/position/position/optional.vue'
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
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/reset',
            name: 'Reset',
            component: Reset
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/help',
            name: 'Help',
            component: Help
        },
        {
            path: '/quotation',
            name: 'Quotation',
            component: Quotation
        },
        {
            path: '/position',
            name: 'Position',
            component: Position,
            children: [
                // {
                //     path: '/',
                //     component: Price,
                //     redirect: '/position/price'
                // },
                {
                    path: '/',
                    redirect:'/position/price',
                    component: Price,
                    children:[
                        {
                            path: '/',
                            redirect: '/position/price/holding',
                            component: Holding,
                        },
                        {
                            component: Holding,
                            name:'holding',
                            path: '/position/price/holding'
                        },
                        {
                            component: Settlement,
                            path: '/position/price/settlement'
                        }
                    ]
                },
                {path: '/position/optional', component: Optional}
            ]
        },
        {

            path: '/myaccount',
            // name:'Myaccount',
            component: Myaccount,
            children: [
                {path: '/', component: Capital, redirect: '/myaccount/capital'},
                {path: '/myaccount/capital', component: Capital,name:'capital'},
                {path: '/myaccount/core', component: Core},
                {path: '/myaccount/recharge', component: Recharge},
                {path: '/myaccount/setup', component: Setup},
                {path: '/myaccount/withdrawals', component: Withdrawals}]
        }
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