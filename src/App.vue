<template>

    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>

</template>
<script>
    

    export default {
        name: 'app'
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
