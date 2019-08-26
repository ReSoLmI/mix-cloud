<template>
    <div class="container">
        <!-- 标题栏 -->
        <div class="sheet-nav clearfix">

            <header class="server-title">{{title?title:serveTitle}}</header>
            <template v-if="isSheetPage">
                <el-tabs class="tabs" :value="activeNav" style="margin-left: 30px;flex:auto" @tab-click="handleClick">
                    <el-tab-pane v-for="route in sheetRouters" :label="route.meta&&route.meta.title"
                                 :name="route.name" :key="route.path"></el-tab-pane>
                </el-tabs>
            </template>

        </div>
        <div class="content">
            <slot>
            </slot>
            <side-page-stack ref="sidePageStack"/>
        </div>
    </div>
</template>
<script>
    import {constantRoutes} from '@/router'
    import SidePageStack from "@/views/side-page-stack/index";

    export default {
        name: 'TableContentLayout',
        components: {SidePageStack},
        data() {
            return {}
        },
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        // provide() {
        //     return {
        //         getTableLayout: this
        //     };
        // },
        computed: {
            isSheetPage() {
                const route = this.$route
                const {meta} = route
                return meta && meta.isSheet
            },
            activeNav() {
                const route = this.$route
                const {name} = route
                return name
            },
            serveTitle() {
                const route = this.isSheetPage ? this.$route.matched[this.$route.matched.length - 1].parent : this.$route
                const {meta, name, path} = route
                return (meta && meta.title) || name || path
            },
            sheetRouters() {
                if (this.isSheetPage) {
                    let trueRoute = this.$route.matched[this.$route.matched.length - 1].parent
                    const {name} = trueRoute
                    const configRoute = this.matchRoute(name, constantRoutes)
                    return configRoute && configRoute.children
                } else {
                    return []
                }
            }

        },
        methods: {
            openSidePage(pageComponent, option, singleTask) {
                this.$refs.sidePageStack.openPage(pageComponent, option, singleTask)
            },
            // getSideStack() {
            //     return this.$refs.sidePageStack
            // },
            //递归匹配父级路由
            matchRoute(name, routers) {
                for (let route of routers) {
                    if (name === route.name) {
                        return route
                    }
                    const children = route.children
                    if (children && children.length > 0) {
                        const find = this.matchRoute(name, children)
                        if (find) {
                            return find
                        }
                    }
                }
                return null
            },
            handleClick(tab, event) {
                this.$router.push({name: tab.name})
            },
            hasOneShowingChild(children = [], parent) {
                //刷选出没有配置hidden属性的路由,showing=!hidden
                const showingChildren = children.filter(item => {
                    //配置了hidden属性的路由不进行渲染
                    if (item.hidden) {
                        return false
                    } else {
                        // 设置Temp,改Temp只会在只有一个子路由的时候生效,因为如果大于1,该方法直接返回了false,不会继续往下判断
                        this.onlyOneChild = item
                        return true
                    }
                })

                // 如果只有一个子路由,返回true,
                // 这个子路由默认显示(不显示父路由),但决定权还是在看其父路由是否设置了alwaysShow属性
                if (showingChildren.length === 1) {
                    return true
                }

                // 如果没有子路由则显示父路由,返回true
                if (showingChildren.length === 0) {
                    this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
                    return true
                }

                return false
            },
        },
        mounted() {
        },
    }
</script>
<style lang="scss" scoped>
    @import "~@/styles/variables.scss";

    .container {
        width: 100%;
        height: 100%;
        min-width: 1120px;
        position: relative;

        .sheet-nav {
            padding: $page-padding $page-padding 0 $page-padding;
            height: auto;
            display: flex;

            .server-title {
                display: inline-block;
                height: $space-48px;
                line-height: $space-48px;
                font-size: $font-size-h1;
                padding-right: $space-16px;
                flex: 0 0 auto;
            }

            .tabs {
                flex: 1 1 auto;
            }
        }

        .content {
            width: 100%;
            height: calc(100% - #{$space-48px} - #{$page-padding}); //100%-标题高度
            position: relative;
        }
    }

</style>
