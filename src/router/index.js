import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import ViewHub from '@/pages/app-hub'
import TableContentHub from '@/pages/table-content-hub'

import ComponentPool from '@/utils/componentPool'

export const constantRoutes = [
    {
        path: '/',
        component: ViewHub,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/pages/home'),
                name: 'Dashboard',
                meta: {title: '总览'}
                // meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
            }
        ]
    },
    //   ssRouter
    // {
    //     path: '/',
    //     component: ViewHub,
    //     redirect: '/dashboard',
    // },
    // {
    //     path: 'dashboard',
    //     name: 'Dashboard',
    //     component: () => import('@/modules/cs/menu1/index'),
    //     meta: {title: '总览'}
    // },
    {
        path: '/aos',
        component: ViewHub,
        name: 'AOS',
        meta: {title: '应用编排', icon: 'aos'},
        redirect: '/aos/application',
        children: [
            {
                path: 'application',
                component: TableContentHub,
                name: 'Application',
                meta: {title: '应用管理'}
            },
            {
                path: 'service',
                component: TableContentHub,
                name: 'Service',
                meta: {title: '服务管理'}
            }
        ]
    },
    {
        path: '/ros',
        component: ViewHub,
        name: 'ROS',
        meta: {title: '资源编排'},
        redirect: '/ros/cluster',
        children: [
            {
                path: 'cluster',
                component: ComponentPool.Cluster,
                name: 'Cluster',
                meta: {title: '集群管理', appHubLayout: 'table-content-layout'},
            },
            {
                path: 'node',
                component: ComponentPool.Node,
                name: 'Node',
                meta: {title: '节点管理', appHubLayout: 'table-content-layout'}
            },
            {
                path: 'create-node',
                component: ComponentPool.CreateNode,
                name: 'CreateNode',
                meta: {title: '新增节点',activeMenu:'/ros/node'},
                hidden: true
            },
            {
                path: 'create-label',
                component: ComponentPool.CreateNodeLabel,
                name: 'CreateLabel',
                meta: {title: '添加标签',activeMenu:'/ros/node'},
                hidden: true
            },
            {
                path: 'network',
                component: TableContentHub,
                name: 'Network',
                meta: {title: '网络管理'},
                redirect: '/ros/network/router',
                children: [
                    {
                        path: 'router',
                        component: ComponentPool.NetworkRouter,
                        name: 'NetworkRouter',
                        meta: {title: '网络路由', isSheet: true, activeMenu: '/ros/network'},
                        hidden: true,
                    },
                    {
                        path: 'service',
                        component: ComponentPool.NetworkService,
                        name: 'NetworkService',
                        meta: {title: '网络服务', isSheet: true, activeMenu: '/ros/network'},
                        hidden: true
                    },
                    {
                        path: 'strategy',
                        component: () => import('@/modules/cs/resource/networks-adm/strategy'),
                        name: 'NetworkStrategy',
                        meta: {title: '网络策略', isSheet: true, activeMenu: '/ros/network'},
                        hidden: true
                    }
                ]
            },
            {
                path: 'storage',
                component: () => import('@/modules/cs/resource/storage-adm'),
                name: 'Storage',
                meta: {title: '存储管理', appHubLayout: 'table-content-layout'}
            },
            {
                path: 'namespace',
                component: () => import('@/modules/cs/resource/namespace-adm'),
                name: 'Namespace',
                meta: {title: '命名空间管理', appHubLayout: 'table-content-layout'}
            },
            {
                //创建集群
                path: 'create-cluster/:regionId',
                component: () => import('@/modules/cs/resource/cluster-adm/create-cluster'),
                name: 'CreateCluster',
                hidden: true,
                meta: {activeMenu: '/ros/cluster'}
            },
            {
                //创建网络路由
                path: 'create-router',
                component: () => import('@/modules/cs/resource/networks-adm/router/create-router'),
                name: 'CreateRouter',
                hidden: true,
                meta: {activeMenu: '/ros/network', appHubLayout: 'create-sth-layout'}
            },
            {
                //创建网络服务
                path: 'create-service',
                component: () => import('@/modules/cs/resource/networks-adm/service/create-service'),
                name: 'CreateService',
                hidden: true,
                meta: {activeMenu: '/ros/network'}
            },
        ]
    }
]


const createRouter = () => new VueRouter({
    // mode: 'history', // require service support
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    mode: 'history',//需要服务器支持
    base: '/',//与assetsPublicPath同步
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
