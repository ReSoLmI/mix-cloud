<template>
    <div class="foot-bar clearfix">
        <div class="right">
            <span class="item">版权所有©杭州朗澈科技有限公司保留一切所有权</span>
            <router-link class="item gap" to="/">法律声明</router-link>
            <router-link class="item gap" to="/">隐私政策声明</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/variables";

    .foot-bar {
        position: relative;
        text-align: center;
        line-height: $copyright-container-height;
        height: $copyright-container-height;
        color: $color-gray-3;
        padding: 0 $component-padding;

        .right {
            float: right !important;
        }

        .item {
            margin: 0 $component-padding;
        }

        a:hover {
            color: $white;
        }

        .gap:before {
            content: '|';
            position: absolute;
            margin-left: calc(-2px - #{$component-padding});
            margin-top: -1px;
            color: $color-gray-3;
        }
    }

</style>
