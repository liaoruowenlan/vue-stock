<template>
    <div class="optional-seo">
        <div>
            <input type="text" class="seo-text" placeholder="输入股票名称/代码/简拼" />
            <input type="button" value="搜索" class="seo-btn"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "optional"
    }
</script>

<style scoped>
    .optional-seo>div{
        width: 814px;
        margin: 0 auto;
        margin-top: 11px;
    }
.optional-seo>div>.seo-text{
    width: 715px;
    height: 28px;
    padding-left: 36px;
    border: 0;
    background: url("../../../assets/img/search@2x.png") no-repeat 11px 6px;
    background-size: 15px 17px;
    border: solid 1px #dee0e4;
    float: left;
    line-height: 30px;
}
    .optional-seo>div>.seo-btn{
        border: 0;
        float: left;
        color: #fff;
        font-size: 14px;
        width: 60px;
        height: 30px;
        background: #dee0e4;
    }
</style>