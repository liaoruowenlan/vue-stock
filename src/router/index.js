import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home.vue'
import Login from '@/pages/user/login.vue'
import Reset from '@/pages/user/reset.vue'
import Register from '@/pages/user/register.vue'

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
        }
	]
})
