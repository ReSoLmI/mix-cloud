<template>
    <!--如果该route的hidden属性为true就无需进行渲染了-->
    <div v-if="!item.hidden">
        <!--如果该路由(只有1个或者0个可见子路由)并且(该唯一子路由没有子路由)并且(没有配置alwaysShow属性) 时渲染-->
        <!--渲染叶子->如果没有可见子节点,直接渲染自身;如果路由自身没有设置alwaysShow属性,且只有一个可见子节点,并且该子节点是叶子,则渲染子路由;-->
        <template
                v-if="(hasOneShowingChild(item.children,item) && !onlyOneChild.children&&!item.alwaysShow)||( hasNoShowingChild(item.children,item)  )">
            <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
                <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
                    <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title"/>
                </el-menu-item>
            </app-link>
        </template>
        <!--否则如果该路由有多个子路由,或者该路由有孙子路由,或者该路由配置了alwaysShow属性 时渲染-->
        <!--渲染节点-->
        <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
            <!--自定义渲染样式item样式插入el-submenu插槽中:icon+title-->
            <template slot="title">
                <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title"/>
            </template>
            <!--递归渲染子路由-->
            <sidebar-item
                    v-for="child in item.children"
                    :key="child.path"
                    :is-nest="true"
                    :item="child"
                    :base-path="resolvePath(child.path)"
                    class="nest-menu"
            />
        </el-submenu>
    </div>
</template>

<script>
    import path from 'path'
    import {isExternal} from '@/utils/validate'
    import Item from './Item'
    import AppLink from './Link'
    import {mapGetters} from 'vuex'
    // import FixiOSBug from './FixiOSBug'

    export default {
        name: 'SidebarItem',
        components: {Item, AppLink},
        // mixins: [FixiOSBug],
        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
            //是否是二级及以上导航
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        data() {
            // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
            // TODO: refactor with render function
            this.onlyOneChild = null
            return {}
        },
        computed: {
            ...mapGetters([
                // 'permission_routes',
                'sidebar'
            ]),
            isCollapse() {
                return !this.sidebar.opened
            }
        },
        methods: {
            /**
             * 判断是否只有0个或1个子路由,会该方法刷新onlyOneChild的值
             * @param children 子路由数组
             * @param parent 父路由
             * @returns {boolean} 是否只有一个子路由(包含0个子路由)
             */
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

            /**
             * 判断是否没有可见子节点路由
             * @param children 子路由数组
             * @param parent 父路由
             * @returns {boolean} 是否没有可见子节点路由
             */
            hasNoShowingChild(children = [], parent) {
                //刷选出没有配置hidden属性的路由,showing=!hidden
                const showingChildren = children.filter(item => {
                    //配置了hidden属性的路由不进行渲染
                    if (item.hidden) {
                        return false
                    } else {
                        // 设置Temp,改Temp只会在只有一个子路由的时候生效,因为如果大于1,该方法直接返回了false,不会继续往下判断
                        return true
                    }
                })

                // 如果没有可见子路由则显示父路由,返回true
                if (showingChildren.length === 0) {
                    return true
                }

                return false
            },
            resolvePath(routePath) {
                if (isExternal(routePath)) {
                    return routePath
                }
                if (isExternal(this.basePath)) {
                    return this.basePath
                }
                return path.resolve(this.basePath, routePath)
            }
        }
    }
</script>
