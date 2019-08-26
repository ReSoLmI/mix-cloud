<template>
    <create-sth-layout>
        <form-layout title="创建路由" @close="$router.go(-1);">
            <template v-slot:form>
                <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px">
                    <el-form-item label="路由名称" prop="name">
                        <el-input class="input-normal" v-model="temp.name" placeholder="请输入路由名称"/>
                    </el-form-item>
                    <el-form-item label="云服务商" prop="cloudServiceProvider">
                        <el-select class="select-normal" v-model="temp.cloudServiceProvider" placeholder="请选择云服务商">
                            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地域" prop="cloudServiceArea">
                        <el-select class="select-normal" v-model="temp.cloudServiceArea" placeholder="请选择地域">
                            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="集群名称" prop="cluster">
                        <el-select class="select-normal" v-model="temp.cluster" placeholder="请选择集群">
                            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="命名空间" prop="namespace">
                        <el-select class="select-normal" v-model="temp.namespace" placeholder="请选择命名空间">
                            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="命名空间" prop="namespace">
                        <el-select v-model="temp.namespace" placeholder="请选择命名空间">
                            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="命名空间" prop="namespace">
                        <el-select v-model="temp.namespace" placeholder="请选择命名空间">
                            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="命名空间" prop="namespace">
                        <el-select v-model="temp.namespace" placeholder="请选择命名空间">
                            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="命名空间" prop="namespace">
                        <el-select v-model="temp.namespace" placeholder="请选择命名空间">
                            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="对外端口" prop="port">
                        <el-input class="input-normal" v-model="temp.port" placeholder="请输入对外端口"/>
                    </el-form-item>
                    <el-form-item label="对外协议" prop="protocol">
                        <el-input class="input-normal" v-model="temp.protocol" placeholder="请输入对外协议"/>
                    </el-form-item>
                    <el-form-item label="域名" prop="domain">
                        <el-input class="input-normal" v-model="temp.domain" placeholder="请输入域名"/>
                    </el-form-item>
                    <el-form-item label="子网">
                        <el-row>
                            <el-col>
                                <el-table ref="multipleTable" :data="Table" tooltip-effect="dark"
                                          style="width: 1100px">
                                    <el-table-column show-overflow-tooltip>
                                        <template slot="header" slot-scope="scope">
                                            <i class="el-icon-refresh-right" style="margin-left:0px;"></i>名称
                                        </template>
                                        <template slot-scope="scope">
                                            <el-checkbox :label="scope.row.name"></el-checkbox>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="ID" label="ID" show-overflow-tooltip></el-table-column>
                                    <el-table-column prop="area" label="可用区"
                                                     show-overflow-tooltip></el-table-column>
                                    <el-table-column prop="CIDR" label="CIDR"
                                                     show-overflow-tooltip></el-table-column>
                                </el-table>
                            </el-col>
                            <el-col>
                                <el-button type="text" icon="el-icon-plus" @click="openSidePage">
                                    添加路由规则
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </template>
        </form-layout>
        <template v-slot:aside v-if="showSidePage">
            <component :is="currentSideComponent" @close="closeSidePage" is-side></component>
            <!--<create-routing-rule ></create-routing-rule>-->
        </template>
    </create-sth-layout>
</template>

<script>
    import CreateSthLayout from '@/views/create-sth-layout'
    import FormLayout from '@/views/create-sth-layout/form-layout'
    import CreateRoutingRule from './create-routing-rule'

    export default {
        // TODO: 此处需重构,CreateRouter需抽离,单组件行驶存在,子组件与其解耦合,以容器id方式通过容器与子组件通信, by 吴斌
        name: "CreateRouter",
        components: {
            CreateSthLayout,
            FormLayout,
            CreateRoutingRule
        },
        data() {
            return {
                showSidePage: false,
                currentSideComponent: "CreateRoutingRule",
                temp: {
                    id: undefined,
                    name: '',
                    importance: 1,
                    remark: '',
                    timestamp: new Date(),
                    title: '',
                    type: '',
                    status: 'published',
                    cloudServiceProvider: '',
                    cloudServiceArea: '',
                    cluster: '',
                    namespace: '',
                    port: '',
                    protocol: '',
                    domain: '',
                },
                Table: [
                    {name: "1asrda", ID: "192.168.0.1", area: "aaa", CIDR: "aaa", checked: false},
                    {name: "1asrda", ID: "192.168.0.1", area: "aaa", CIDR: "aaa", checked: false},
                    {name: "1asrda", ID: "192.168.0.1", area: "aaa", CIDR: "aaa", checked: false},
                ],//子网表格

                rules: {
                    type: [{required: true, message: 'type is required', trigger: 'change'}],
                    timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
                    title: [{required: true, message: 'title is required', trigger: 'blur'}]
                },
            }
        },
        methods: {
            closeSidePage() {
                this.showSidePage = false
            },
            openSidePage() {
                this.showSidePage = true
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables";

</style>
