<template>
    <div id="console-base">
        <div class="console-base-container">
            <navbar class="top"/>
            <div class="side"></div>
            <foot-bar class="bottom"></foot-bar>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Navbar from "./Navbar";
    import FootBar from "./FootBar";

    export default {
        name: 'Console',
        components: {
            Navbar, FootBar
        },
        mixins: [],
        computed: {
            ...mapState({
                sidebar: state => state.app.sidebar,
            }),
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            }
        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('app/closeSideBar', {withoutAnimation: false})
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";
    @import "~@/styles/variables.scss";

    .console-base-container {
        font-size: $base-fontsize;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        .top {
            position: fixed;
            top: 0;
            left: 0;
            z-index: $z-level-1230 !important;
            background-color: $color-primary;
            width: 100%;
        }

        .bottom {
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: $z-level-1230 !important;
            background-color: $color-primary;
            width: 100%;
        }


    }


</style>
