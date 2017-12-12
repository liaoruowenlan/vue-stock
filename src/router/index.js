import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home.vue'
import Login from '@/pages/user/login.vue'
import Reset from '@/pages/user/reset.vue'
import Register from '@/pages/user/register.vue'
import Help from '@/pages/help/help.vue'
import Setup from '@/pages/myaccount/setup.vue'

Vue.use(Router)

export default new Router({
	routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
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
            path: '/setup',
            name: 'Setup',
            component: Setup
		}
	]
})
