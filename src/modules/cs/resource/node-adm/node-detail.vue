<template>
    <detail-layout
            v-bind="$attrs"
            v-on="$listeners"
            :componentsInfo="componentsInfo">
        <template v-slot:actions>
            <el-select v-model="NodeValue" placeholder="节点操作">
            <el-option
            v-for="item in NodeStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
            </el-select>
        </template>
    </detail-layout>

</template>
<script>
    import DetailLayout from "@/views/detail-layout/index";
    import {NodeBasicInfo,NodeMonitor,NodeEvent,NodeLabel} from "@/utils/componentPool";

    export default {
        name: "nodeDetailComponent",
        components: {DetailLayout},
        props:{
            nodeItem:Object,
        },
        data(){
            const componentsInfo = this.obtainComponentsProps()
            return{
                componentsInfo,
                NodeValue:'',
                NodeStatus:[
                    { value: '正常', label: '正常' },
                    { value: '异常', label: '异常' }
                ],
                activeIndex:0,//激活菜单的index
                timeValue:"",//时间
                eventName:"",//事件名称
                tableData2: [{
                    time:"2019/07/15 10:16:33 GMT+08:00",
                    event:"创建节点成功",
                    type:"添加节点",
                    status:"成功",
                    object:"admin"
                },
                    {
                        time:"2019/07/15 10:16:33 GMT+08:00",
                        event:"创建节点失败",
                        type:"安装用户节点kubemetes软件",
                        status:"失败",
                        object:"adminsutra"
                    }],

            }
        },
        mounted(){
        },
        methods:{
            obtainComponentsProps() {
                const componentsInfo = [{
                    description: '基本属性',
                    name: NodeBasicInfo.name,
                    component: NodeBasicInfo
                }, {
                    description: '监控',
                    name: NodeMonitor.name,
                    component: NodeMonitor
                }, {
                    description: '事件',
                    name: NodeEvent.name,
                    component: NodeEvent
                }, {
                    description: '标签管理',
                    name: NodeLabel.name,
                    component: NodeLabel
                }
                ]
                return componentsInfo
            },
            onSubmit() {
                console.log('submit!');
            },
            closeComponent() {
                this.$emit('close');//出发close自定义消息
            },
            //tab标签点击事件
            handleClick(item){
                this.activeIndex = item;
            },
            //刷新按钮
            handleIconClick(){

            },
        }
    }
</script>
<style scoped>

</style>
