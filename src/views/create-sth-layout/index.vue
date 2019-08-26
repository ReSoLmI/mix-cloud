<template>
    <div class="content-container">
        <slot>
        </slot>
        <slot name="aside">
        </slot>
    </div>
</template>

<script>
    export default {
        name: "CreateSthLayout",
        components: {},
        provide() {
            return {
                getRoot: this//暴露组件自身,子组件通过依赖注入的方式持有引用(如果需要的话)
            };
        },
        data() {
            return {
                showSidePage: false
            }
        },
        methods: {
            closeSidePage() {
                this.showSidePage = false
            },
            openSidePage() {
                this.showSidePage = true
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/variables";

    .content-container {
        width: 100%;
        height: calc(100% - #{$page-padding});
        margin-top: $page-padding;
        position: relative;
    }

    aside {
        width: 70%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
    }
    
</style>
