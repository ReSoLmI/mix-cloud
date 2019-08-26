<template>
    <div class="app-container">
        <!--<div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>-->
        <sidebar class="left"/>
        <div class="base-line">
            <div class="handle" @click="toggleSideBar">
                <i class="icon-font icon-youjian"></i>
            </div>
        </div>
        <div class="scroll-wrapper">
            <slot>
                <router-view :key="this.$route.fullPath"/>
            </slot>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Sidebar from "./components/Sidebar";

    export default {
        name: "AppLayout",
        components: {
            Sidebar
        },
        mixins: [],
        computed: {
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
                showSettings: state => state.settings.showSettings,
                needTagsView: state => state.settings.tagsView,
                fixedHeader: state => state.settings.fixedHeader
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
            },
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar')
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";
    @import "~@/styles/variables.scss";

    .app-container {
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-start;
        height: 100%;
        overflow: hidden;

        .left {
            order: 0;
            flex: 0 0 auto;
            height: 100%;
            position: relative;
        }

        .base-line {
            order: 0;
            flex: 0 0 auto;
            height: 100%;
            width: 0;
            position: relative;

            .handle {
                width: 0;
                height: 64px;
                position: absolute;
                /*top: calc(50% - 32px);*/
                top: 0;
                bottom: 0;
                margin: auto;
                z-index: $z-level-1230;
                line-height: 46px;
                border-color: transparent transparent transparent $color-dark-background;
                border-style: solid;
                border-width: 9px 9px 9px 20px;
                border-image: none 100% / 1 / 0 stretch;
                cursor: pointer;
                color: rgb(191, 191, 191);
                right: -27px;
                transition: right 0.1s ease-in-out 0s, border 0.1s ease 0s;


                i {
                    width: 12px;
                    position: relative;
                    left: -15px;
                    color: rgb(193, 193, 193);
                    transform: rotate(180deg);
                    transition: transform 0.5s ease-in-out 0s, left 0.1s ease-in-out 0s;

                    &:before {
                        width: 12px;
                        font-size: 12px;
                        line-height: inherit;
                    }

                }
            }

        }

        .scroll-wrapper {
            order: 1;
            flex: 1 1 auto;
            height: 100%;
            width: 100%;
            overflow-x: auto;
            position: relative;
        }
    }


</style>
