<template>
    <create-sth-layout ref="containerHandle">
        <form-layout title="创建服务" @close="$router.go(-1);">
            <template v-slot:form>
                <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px">
                    <el-form-item label="服务名称" prop="name">
                        <el-input v-model="temp.name" placeholder="请输入路由名称"/>
                    </el-form-item>
                    <el-form-item label="访问类型" prop="cloudServiceProvider">
                        <el-select v-model="temp.cloudServiceProvider" placeholder="请选择云服务商">
                            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="云服务商" prop="cloudServiceArea">
                        <el-select v-model="temp.cloudServiceArea" placeholder="请选择地域">
                            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地域" prop="cluster">
                        <el-select v-model="temp.cluster" placeholder="请选择集群">
                            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="集群名称" prop="namespace">
                        <el-select v-model="temp.namespace" placeholder="请选择命名空间">
                            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="命名空间" prop="port">
                        <el-select v-model="temp.namespace" placeholder="请选择命名空间">
                            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关联工作负载" prop="protocol">
                        <el-select v-model="temp.namespace" placeholder="请选择命名空间">
                            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="端口映射">
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
                                    添加端口映射
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="标签">
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
                                    添加标签
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </template>
        </form-layout>
        <template v-slot:aside v-if="showSidePage">
            <component :is="currentSideComponent" @close="closeSidePage"></component>
            <!--<create-routing-rule ></create-routing-rule>-->
        </template>
    </create-sth-layout>
</template>

<script>
    import CreateSthLayout from '@/views/create-sth-layout'
    import FormLayout from '@/views/create-sth-layout/form-layout'
    import CreatePortMapping from "@/modules/cs/resource/networks-adm/service/create-service/CreatePortMapping";


    export default {
        name: "CreateRouter",
        components: {
            CreateSthLayout,
            FormLayout,
            CreatePortMapping
        },
        data() {
            return {
                showSidePage: false,
                currentSideComponent: "CreatePortMapping",
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
                // this.$refs.containerHandle.closeSidePage()
                this.showSidePage = false
            },
            openSidePage() {
                // this.$refs.containerHandle.openSidePage()
                this.showSidePage = true
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables";

</style>
