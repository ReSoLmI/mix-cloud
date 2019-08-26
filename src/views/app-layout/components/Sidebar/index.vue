<template>
    <div class="sidebar has-logo" :class="{hideSidebar:isCollapse}"
         @mouseenter="onMouseEnter"
         @focus="onMouseEnter"
         @blur="onMouseLeave"
         @mouseleave="onMouseLeave">
        <!--<p style="height: 50px;color: red;">容器服务</p>-->
        <div class="service-title">
            <span>容器服务</span>
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <!--
                "mode               模式horizontal / vertical
                :collapse           是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
                :default-active     默认激活的菜单的index
                :unique-opened      是否只保持一个子菜单的展开
                :collapse-transition是否开启折叠动画->这里禁用,使用定制的样式动画

                :background-color	菜单的背景色（仅支持 hex 格式）
                :text-color         菜单的文字颜色（仅支持 hex 格式）
                :active-text-color  当前激活菜单的文字颜色（仅支持 hex 格式）
            -->
            <el-menu
                    mode="vertical"
                    :collapse="isCollapse"
                    :default-active="activeMenu"
                    :unique-opened=false
                    :collapse-transition=false

                    :text-color="variables.menuText"
                    :active-text-color="variables.menuActiveText">

                <sidebar-item v-for="route in permission_routes"
                              :key="route.path"
                              :item="route"
                              :base-path="route.path"/>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import SidebarItem from './SidebarItem'
    import variables from '@/styles/variables.scss'
    import {constantRoutes} from '@/router'

    export default {
        data() {
            return {
                permission_routes: constantRoutes,
                isEmporarilyOn: false //标记sideBar是否临时开启
            }
        },
        components: {
            SidebarItem
        },
        computed: {
            ...mapGetters([
                // 'permission_routes',
                'sidebar'
            ]),
            activeMenu() {
                const route = this.$route
                const {meta, path} = route
                // if set path, the sidebar will highlight the path you set
                if (meta.activeMenu) {
                    return meta.activeMenu
                }
                return path
            },
            showLogo() {
                return this.$store.state.settings.sidebarLogo
            },
            variables() {
                return variables
            },
            isCollapse() {
                return !this.sidebar.opened
            }
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar')
            },
            onMouseEnter() {
                if (!this.isCollapse) return;
                console.log("onMouseEnter");
                this.toggleSideBar()
                this.isEmporarilyOn = true
            },
            onMouseLeave() {
                if (!this.isEmporarilyOn) return
                console.log("onMouseLeave");
                this.toggleSideBar()
                this.isEmporarilyOn = false
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../../styles/variables.scss';

    .sidebar {
        transition: width 0.28s;
        width: $sideBarWidth !important;
        height: 100%;
        font-size: 0px;//去除导航列表inline-block留下的空白间隙
        top: 0;
        bottom: 0;
        left: 0;
        z-index: $z-level-1210;
        overflow: hidden;
        background-color: $sideBarBg;

        .service-title {
            position: relative;
            width: 100%;
            height: $serviceTitleHeight;
            padding: 0 $space-16px ;

            span {
                color: $color-black-dark;
                line-height: $serviceTitleHeight;
                font-size: $fontsize-20;
            }
        }
    }
</style>
<style lang="scss">
    @import '../../../../styles/variables.scss';

    .sidebar {

        // reset element-ui css
        .horizontal-collapse-transition {
            transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
        }

        //隐藏导航栏的滚动块的横向滚动条
        .scrollbar-wrapper {
            overflow-x: hidden !important;
        }

        .el-scrollbar__bar.is-vertical {
            right: 0px;
        }

        .el-scrollbar {
            height: 100%;
        }

        //导航栏的滚动块高度要减去服务标题的高度
        &.has-logo {
            .el-scrollbar {
                height: calc(100% - #{$serviceTitleHeight});
            }
        }

        //隐藏导航栏的滚动块的横向滚动条容器
        .is-horizontal {
            display: none;
        }

        a {
            display: inline-block;
            width: 100%;
            overflow: hidden;
        }

        // TODO:  by
        [class^="icon-"], [class*=" icon-"] {
            margin-right: $space-16px;
            font-size: 22px;
        }

        .el-menu {
            //去除默认右边框
            border: none;
            height: 100%;
            width: 100% !important;
        }

        // menu hover
        .submenu-title-noDropdown,
        .el-submenu__title {
            background-color: $menuBg !important;

            &:hover {
                background-color: $menuHover !important;
            }
        }

        .is-active > .el-submenu__title {
            color: $subMenuActiveText !important;
        }

        & .nest-menu .el-submenu > .el-submenu__title,
        & .el-submenu .el-menu-item {
            min-width: $sideBarWidth !important;
            background-color: $subMenuBg !important;

            &:hover {
                background-color: $subMenuHover !important;
            }
        }
    }

    .hideSidebar {
        &.sidebar {
            width: $sideBarMinWidth !important;

            .service-title {
                visibility:hidden
            }
        }

        .main-container {
            margin-left: $sideBarMinWidth;
        }

        .submenu-title-noDropdown {
            padding: 0 !important;
            position: relative;

            .el-tooltip {
                padding: 0 !important;

                [class^="icon-"], [class*=" icon-"] {
                    margin-left: 20px;
                }
            }
        }

        .el-submenu {
            overflow: hidden;

            & > .el-submenu__title {
                padding: 0 !important;

                [class^="icon-"], [class*=" icon-"] {
                    margin-left: 20px;
                }

                .el-submenu__icon-arrow {
                    display: none;
                }
            }
        }

        .el-menu--collapse {
            .el-submenu {
                & > .el-submenu__title {
                    & > span {
                        height: 0;
                        width: 0;
                        overflow: hidden;
                        visibility: hidden;
                        display: inline-block;
                    }
                }
            }
        }
    }

    .withoutAnimation {

        .main-container,
        .sidebar-container {
            transition: none;
        }
    }

    .el-menu--collapse .el-menu .el-submenu {
        min-width: $sideBarWidth !important;
    }


    // when menu collapsed
    .el-menu--vertical {
        & > .el-menu {
            [class^="icon-"], [class*=" icon-"] {
                margin-right: 16px;
            }
        }

        .nest-menu .el-submenu > .el-submenu__title,
        .el-menu-item {
            &:hover {
                // you can use $subMenuHover
                background-color: $menuHover !important;
            }
        }

        // the scroll bar appears when the subMenu is too long
        > .el-menu--popup {
            max-height: 100vh;
            overflow-y: auto;

            &::-webkit-scrollbar-track-piece {
                background: #d3dce6;
            }

            &::-webkit-scrollbar {
                width: 6px;
            }

            &::-webkit-scrollbar-thumb {
                background: #99a9bf;
                border-radius: 20px;
            }
        }
    }

</style>
