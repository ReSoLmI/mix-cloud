<template>
    <div class="event-container">
        <div class="action-bar">
            <el-date-picker style="width: 180px"
                            v-model="timeValue"
                            type="daterange"
                            class="picker-small">
            </el-date-picker>
            <el-input style="margin:0px 10px;width: 180px;" class="input-normal" v-model="eventName" placeholder="请输入事件名称">
                <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClick"></i>
            </el-input>
            <i class="el-icon-refresh-right"></i>
        </div>
        <div class="tool-box">
            <el-row style="margin:20px 0px;">
                <el-col>
                </el-col>
            </el-row>
        </div>
        <div class="full_table">
            <el-table :data="tableData2" tooltip-effect="dark" style="width: 100%;cursor: pointer;">
                <el-table-column prop="time" label="产生时间" show-overflow-tooltip></el-table-column>
                <el-table-column label="事件名称" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <i :class="{'el-icon-circle-check':scope.row.status === '成功','el-icon-circle-close':scope.row.status === '失败'}"></i>
                        {{ scope.row.event }}
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="object" label="对象" show-overflow-tooltip></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NodeEvent",
        data(){
            return {
                timeValue:"",//时间
                eventName:"",
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
        methods:{
            handleIconClick(){}

        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";

    .event-container{
        padding: $space-32px;
        position: relative;
        height: 100%;
        width: 100%;

        .action-bar {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            flex-flow: row nowrap;
            justify-items: center;
        }
    }


</style>
