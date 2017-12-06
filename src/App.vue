<template>

    <div id="app">

        <top-header></top-header>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
        <footer-nav></footer-nav>

    </div>

</template>
<script>

    import TopHeader from './components/header.vue'
    import FooterNav from './components/footer.vue'

    export default {
        name: 'app',
        components: {
            TopHeader,
            FooterNav
        }
    }
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0
    }
</style>
