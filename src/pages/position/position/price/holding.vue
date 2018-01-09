<template>
    <div class="holding">
        <div class="holding-list">

        </div>
        <div class="holding-list">

        </div>
        <div class="holding-list">

        </div>
        <div class="holding-list">

        </div>
    </div>
</template>

<script>
    export default {
        name: "holding"
    }
</script>

<style scoped>
    .holding>div.holding-list{
        height: 206px;
        width: 683px;
        margin: 0 auto;
        border-bottom: 1px solid #dee0e4;
    }
    .holding::after {
        content: ".";
        clear: both;
        display: block;
        overflow: hidden;
        font-size: 0;
        height: 0;
    }
</style>