<template>
    <div class="basic-info-container">
        <!-- 基本属性 -->
        <div class="content-box">
            <div class="secend-title-box">
                <i class="el-icon-tickets box-icon" style="display:inline-block;line-height:120px;font-size:50px;"></i>
                <div style="display:inline-block;">
                    <span class="box-title">名称</span>
                    <div>
                        <i :class="{'el-icon-circle-check':'正常' === '正常','el-icon-circle-close':'失败' === '失败'}"></i>
                        <span class="box-title">status</span>
                    </div>
                </div>
            </div>

            <lsh-info-card title="基本信息" label-width="120px" label-align="left">
                <lsh-info-card-item label="云服务商：" content="阿里云"/>
                <lsh-info-card-item label="地域：" content="杭州1区"/>
                <lsh-info-card-item label="集群：" content="mcp-cce-test2"/>
                <lsh-info-card-item label="命名空间：" content="app-02"/>
                <lsh-info-card-item label="创建时间：" content="2019-09-09 14:00:00"/>
            </lsh-info-card>
            <lsh-info-card title="基本信息" label-width="120px" label-align="left">
                <lsh-info-card-item label="云服务商：" content="阿里云"/>
                <lsh-info-card-item label="地域：" content="杭州1区"/>
                <lsh-info-card-item label="集群：" content="mcp-cce-test2"/>
                <lsh-info-card-item label="命名空间：" content="app-02"/>
                <lsh-info-card-item label="创建时间：" content="2019-09-09 14:00:00"/>
            </lsh-info-card>
            <lsh-info-card title="基本信息" label-width="120px" label-align="left">
                <lsh-info-card-item label="云服务商：" content="阿里云"/>
                <lsh-info-card-item label="地域：" content="杭州1区"/>
                <lsh-info-card-item label="集群：" content="mcp-cce-test2"/>
                <lsh-info-card-item label="命名空间：" content="app-02"/>
                <lsh-info-card-item label="创建时间：" content="2019-09-09 14:00:00"/>
            </lsh-info-card>
            <lsh-info-card title="基本信息" label-width="120px" label-align="left">
                <lsh-info-card-item label="云服务商：" content="阿里云"/>
                <lsh-info-card-item label="地域：" content="杭州1区"/>
                <lsh-info-card-item label="集群：" content="mcp-cce-test2"/>
                <lsh-info-card-item label="命名空间：" content="app-02"/>
                <lsh-info-card-item label="创建时间：" content="2019-09-09 14:00:00"/>
            </lsh-info-card>
        </div>
        <div class="content-box">
            <lsh-info-card title="路由规则" label-width="120px" label-align="left">
                <el-table ref="multipleTable"  tooltip-effect="dark"
                          style="width: 1100px">
                    <el-table-column prop="ID" label="URL" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="area" label="服务名称"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="CIDR" label="服务端口号"
                                     show-overflow-tooltip></el-table-column>
                </el-table>
            </lsh-info-card>
        </div>
    </div>
</template>

<script>
    import LshInfoCard from '@/components/InfoCard'
    import LshInfoCardItem from "@/components/InfoCard/InfoCardItem";

    export default {
        name: "NetworkRouterBasicInfo",
        components: {
            LshInfoCardItem,
            LshInfoCard
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";

    .basic-info-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: $page-padding;

        .content-box {
            position: relative;
            float: left;
            width: 50%;
            height: 100%;
            padding-right: 30px;
        }
    }

</style>
