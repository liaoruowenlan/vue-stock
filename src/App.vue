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

</style>
