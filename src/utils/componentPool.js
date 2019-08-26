//集群组件
export const Cluster = () => import('@/modules/cs/resource/cluster-adm')
//网路路由组件
export const NetworkRouter = () => import('@/modules/cs/resource/networks-adm/router')
//网路路由基本属性组件
export const NetworkRouterBasicInfo = () => import('@/modules/cs/resource/networks-adm/router/detail/BasicInfo')
//网路服务组件
export const NetworkService = () => import('@/modules/cs/resource/networks-adm/service')
//监控组件
export const Monitor = () => import('@/modules/cs/resource/networks-adm/router/detail/Monitor')
//事件组件
export const Event = () => import('@/modules/cs/resource/networks-adm/router/detail/Event')
//创建路由规则组件
export const CreateRoutingRule = () => import('@/modules/cs/resource/networks-adm/router/create-routing-rule')
//节点管理
export const Node = () => import('@/modules/cs/resource/node-adm')
//新增节点
export const CreateNode = () => import('@/modules/cs/resource/node-adm/create-node')
//新增节点标签
export const CreateNodeLabel = () => import('@/modules/cs/resource/node-adm/create-label')
//新增节点子网
export const CreateNodeSubNet = () => import('@/modules/cs/resource/node-adm/create-SubNet')
//新增节点密钥对
export const CreateNodeSecretKey = () => import('@/modules/cs/resource/node-adm/create-SecretKey')
//节点基本属性组件
export const NodeBasicInfo = () => import('@/modules/cs/resource/node-adm/detail/NodeBasicInfo')
//节点监控组件
export const NodeMonitor = () => import('@/modules/cs/resource/node-adm/detail/NodeMonitor')
//节点事件组件
export const NodeEvent = () => import('@/modules/cs/resource/node-adm/detail/NodeEvent')
//节点标签管理
export const NodeLabel = () => import('@/modules/cs/resource/node-adm/detail/NodeLabel')


export default{
    Cluster,
    NetworkRouter,
    NetworkRouterBasicInfo,
    NetworkService,
    Monitor,
    Event,
    CreateRoutingRule,
    Node,
    CreateNode,
    CreateNodeLabel,
    CreateNodeSubNet,
    CreateNodeSecretKey,
    NodeBasicInfo,
    NodeMonitor,
    NodeEvent,
    NodeLabel
}
