import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home.vue'
import Login from '@/pages/user/login.vue'
import Reset from '@/pages/user/reset.vue'
import Register from '@/pages/user/register.vue'
import Help from '@/pages/help/help.vue'
import Myaccount from '@/pages/myaccount/myaccount.vue'

import Capital from '@/pages/myaccount/myaccount/capital.vue'
import Core from '@/pages/myaccount/myaccount/core.vue'
import Recharge from '@/pages/myaccount/myaccount/recharge.vue'
import Setup from '@/pages/myaccount/myaccount/setup.vue'
import Withdrawals from '@/pages/myaccount/myaccount/withdrawals.vue'
import Quotation from '@/pages/quotation/quotation.vue'


Vue.use(Router)

export default new Router({
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

            path: '/myaccount',
            component: Myaccount,
            children: [
                {path: '/', component: Capital,redirect: '/myaccount/capital'},
                {path: '/myaccount/capital', component: Capital},
                {path: '/myaccount/core', component: Core},
                {path: '/myaccount/recharge', component: Recharge},
                {path: '/myaccount/setup', component: Setup},
                {path: '/myaccount/withdrawals', component: Withdrawals}]
        }
        ]
})