<template>
    <create-sth-layout>
        <form-layout title="创建节点" @close="$router.go(-1);">
            <template v-slot:form>
                <el-form ref="from" :model="form" label-position="left" label-width="120px">
                    <el-form-item label="云服务商" prop="name">
                        <el-select class="select" v-model="form.cloudServiceProvider" placeholder="请选择云服务商">
                            <el-option
                                    v-for="item in cloudServiceProvider"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <span style="margin-left: 10px">未检测到可用accesskey，请点击<a href="">添加accesskey</a></span>
                    </el-form-item>
                    <el-form-item label="地域">
                        <el-select class="select" v-model="form.territory" placeholder="请选择地域">
                            <el-option
                                    v-for="item in territory"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="集群名称">
                        <el-select class="select" v-model="form.clusterName" placeholder="请选择集群名称">
                            <el-option
                                    v-for="item in clusterName"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="VPC" prop="name">
                        <el-input class="select" :disabled="true" placeholder="Virtual-es1"></el-input>
                    </el-form-item>
                    <el-form-item label="子网">
                        <el-row>
                            <el-col>
                                <el-table ref="multipleTable" :data="Table" tooltip-effect="dark" style="width: 1100px">
                                    <el-table-column show-overflow-tooltip label="名称">
                                        <template slot="header">
                                            <i class="el-icon-refresh-right"></i>名称
                                        </template>
                                        <template slot-scope="scope">
                                            <el-checkbox :label="scope.row.name" ></el-checkbox>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="ID" label="ID" show-overflow-tooltip></el-table-column>
                                    <el-table-column prop="area" label="可用区" show-overflow-tooltip></el-table-column>
                                    <el-table-column prop="CIDR" label="CIDR" show-overflow-tooltip></el-table-column>
                                </el-table>
                            </el-col>
                            <el-col>
                                <el-button type="text" @click="OpenRightBox('SubNetComponent')"><i class="el-icon-plus"></i>创建子网</el-button>
                                <span class="tip-font">选择 1-3 个子网。为保证集群高可用，建议选择不同可用区的子网</span>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="节点计费方式">
                        <el-row>
                            <el-radio-group v-model="form.radio1">
                                <el-radio-button label="按量付费"></el-radio-button>
                                <el-radio-button label="包年包月"></el-radio-button>
                            </el-radio-group>
                        </el-row>
                    </el-form-item>
                    <el-form-item v-if="form.radio1=='包年包月'">
                        <label style="margin-right: 10px">购买时长</label>
                        <el-select   v-model="form.billingTime" placeholder="请选择云服务商">
                            <el-option
                                    v-for="item in billingTimeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="form.radio1=='包年包月'">
                        <label style="margin-right: 10px">自动续费</label>
                        <el-checkbox label="开启"  name="type" style="margin-right: 10px"></el-checkbox>
                        <el-select  v-model="form.billingTime" placeholder="请选择云服务商" >
                            <el-option
                                    v-for="item in billingTimeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="节点实例数">
                        <el-input-number class="input-number-normal select" v-model="form.NodeInstanceNumber" controls-position="right" :min="1" :max="10"></el-input-number>
                    </el-form-item>
                    <el-form-item label="节点类型">
                        <el-row>
                            <el-radio-group v-model="form.radio2">
                                <el-radio-button label="新增节点"></el-radio-button>
                                <el-radio-button label="添加已有节点"></el-radio-button>
                            </el-radio-group>
                        </el-row>
                    </el-form-item>
                    <el-form-item v-if="form.radio2=='添加已有节点'">
                        <el-row>
                            <el-col>
                                <el-table ref="multipleTable" :data="Table" tooltip-effect="dark" style="width: 800px">
                                    <el-table-column show-overflow-tooltip>
                                        <template slot="header">
                                            <i class="el-icon-refresh-right" style="margin-left:0px;"></i>实例名称
                                        </template>
                                        <template slot-scope="scope">
                                            <el-checkbox :label="scope.row.name" ></el-checkbox>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="ID" label="实例ID" show-overflow-tooltip></el-table-column>
                                    <el-table-column prop="area" label="可用区" show-overflow-tooltip></el-table-column>
                                    <el-table-column prop="network" label="网络类型" show-overflow-tooltip></el-table-column>
                                    <el-table-column prop="CIDR" label="实例规格" show-overflow-tooltip></el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="节点规格" v-if="form.radio3 == '新增节点'">
                        <el-row style="margin-bottom:20px;">
                            <el-col>
                                <el-select  class="select-normal"  v-model="form.nodeSpecification" placeholder="请选择">
                                    <el-option
                                            v-for="item in nodeSpecificationOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="el-icon-refresh-right"></i>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:20px;">
                            <el-col>
                                <span class="span-normal" style="margin-right:10px;">架构</span>
                                <el-select style="margin-right:10px;" class="select-small" v-model="form.architecture"  placeholder="请选择">
                                    <el-option
                                            v-for="item in architectureOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <span class="span-normal" style="margin-right:10px;">vCPU</span>
                                <el-select style="margin-right:10px;" class="select-small" v-model="form.vcpu"  placeholder="请选择">
                                    <el-option
                                            v-for="item in vcpuOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <span class="span-normal" style="margin-right:10px;">内存</span>
                                <el-select style="margin-right:10px;" class="select-small" v-model="form.nodeMemory"  placeholder="请选择">
                                    <el-option
                                            v-for="item in nodeMemoryOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="系统盘" v-if="form.radio3 == '新增节点'">
                        <el-row>
                            <el-col>
                                <el-select style="margin-right:10px;" class="select-small" v-model="form.nodeSystemDisk"  placeholder="请选择">
                                    <el-option
                                            v-for="item in nodeSystemDiskOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-input-number class="input-number-medium" v-model="form.nodeSystemNumber" controls-position="right" :min="1" :max="10"></el-input-number>
                                <!-- 单位 -->
                                <span class="span-normal" style="margin-left:10px;">GiB</span>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="数据盘" v-if="form.radio3 == '新增节点'">
                        <el-row style="margin-bottom:20px;">
                            <span class="">你已选择 {{form.nodeDataNumber}} 块盘，还可以选择{{getSurplusNumber()}}块盘</span>
                        </el-row>
                        <el-row style="margin-bottom:20px;">
                            <el-col>
                                <el-select style="margin-right:10px;" class="select-small" v-model="form.nodeDataDisk"  placeholder="请选择">
                                    <el-option
                                            v-for="item in nodeDataDiskOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-input-number class="input-number-medium" v-model="form.nodeDataNumber" controls-position="right" :min="1" :max="10"></el-input-number>
                                <!-- 单位 -->
                                <span class="span-normal" style="margin-left:10px;">GiB</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:20px;">
                            <el-col>
                                <el-button class="btn-plus" type="primary" icon="el-icon-plus"></el-button>
                                <span class="span-normal" style="margin-left:5px;" >添加一块数据盘</span>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="登录方式">
                        <el-row>
                            <el-radio-group v-model="form.radio4">
                                <el-radio-button label="密码"></el-radio-button>
                                <el-radio-button label="密钥对"></el-radio-button>
                            </el-radio-group>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="用户名" v-if="form.radio4=='密码'">
                        <span class="span-normal">root</span>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" v-if="form.radio4=='密码'">
                        <el-input type="password" class="password" placeholder="请输入密码" v-model="form.password" autocomplete="off"></el-input>
                        <span class="tip-font">8 - 30 个字符，且同时包含三项（大、小写字母，数字和特殊符号）</span>
                    </el-form-item>
                    <el-form-item label="确认密码"  prop="checkPassword" v-if="form.radio4=='密码'">
                        <el-input type="password" class="password" placeholder="请再次输入密码" v-model="form.checkPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密钥对" v-if="form.radio4=='密钥对'">
                        <el-row>
                            <el-col>
                                <el-select  class="select-normal"   v-model="form.VPCValue" placeholder="请选择密钥对">
                                    <el-option
                                            v-for="item in VPCOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="el-icon-refresh-right"></i>
                            </el-col>
                            <el-col>
                                <el-button type="text" @click="OpenRightBox('SecretKeyComponent')"><i class="el-icon-plus"></i>创建密钥</el-button>
                                <span class="tip-font">选择 1-3 个子网。为保证集群高可用，建议选择不同可用区的子网</span>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </template>
        </form-layout>
        <component :is="nodeComponent" @close="closeComponent" v-show="componentTag"></component>
<!--        <template v-slot:aside v-if="showSidePage">-->
<!--            <component :is="currentSideComponent" @close="closeSidePage"></component>-->
<!--            &lt;!&ndash;<create-routing-rule ></create-routing-rule>&ndash;&gt;-->
<!--        </template>-->
    </create-sth-layout>
</template>

<script>
    import SubNetComponent from '../node-adm/create-SubNet'
    import SecretKeyComponent from '../node-adm/create-SecretKey'
    import CreateSthLayout from "@/views/create-sth-layout/index";
    import FormLayout from "@/views/create-sth-layout/form-layout/index";
    export default {
        name: "CreateNode",
        components:{
            FormLayout,
            CreateSthLayout,
            // eslint-disable-next-line vue/no-unused-components
            SubNetComponent,
            SecretKeyComponent
        },
        data() {
            return {
                dynamicValidateForm: {
                    domains: [{
                        value: ''
                    }],
                },
                form: {
                    NodeInstanceNumber:"0",
                    nodeSpecification:"0",//实例规格
                    architecture:"0",//实例规格架构
                    vcpu:"0",
                    nodeMemory:"0",
                    nodeSystemDisk:"0",
                    nodeDataDisk:"0",
                    instanceSpecificationvCPUValue:"0",//实例规格vCPU
                    instanceSpecificationMemoryValue:"0",//实例规格内存
                    NodeSysDiskTypeValue:"0",//节点系统盘类型（option与集群管理中option相同）
                    NodeNumber:0,//节点数量
                    nodeSystemNumber:0,
                    // surplusNumber:0,
                    nodeDataNumber:0,
                    billingTime:"1年",
                    radio1:'按量付费',
                    radio2:'新增节点',
                    radio3:"新增节点",//节点类型
                    radio4:"密码",
                },
                cloudServiceProvider:[
                    { value: '阿里云', label: '阿里云' },
                    { value: '华为云', label: '华为云' },
                    { value: '时速云', label: '时速云' }
                ],
                territory:[
                    { value: '华东区', label: '华东区' },
                    { value: '华北区', label: '华北区' },
                    { value: '西南区', label: '西南区' }
                ],
                clusterName:[
                    { value: '阿里云', label: '阿里云' },
                    { value: '华为云', label: '华为云' },
                    { value: '时速云', label: '时速云' }
                ],
                Table:[
                    {name:"1asrda",ID:"192.168.0.1",area:"aaa",network:"HTTP",CIDR:"8GB",checked:false},
                    {name:"1asrda",ID:"192.168.0.1",area:"aaa",network:"TCP",CIDR:"32GB",checked:false},
                    {name:"1asrda",ID:"192.168.0.1",area:"aaa",network:"HTTPS",CIDR:"16GB",checked:false},
                ],//子网表格
                nodeSpecificationOptions:[
                    { value: '0', label: '4核8G（ecs.hfc5.xlarge） 5Mbps' },
                    { value: '1', label: '4核16G（ecs.hfc5.xlarge） 5Mbps' },
                    { value: '2', label: '4核32G（ecs.hfc5.xlarge） 5Mbps' },
                ],
                architectureOptions:[
                    { value: '0', label: 'x86计算' },
                    { value: '1', label: 'x64计算' },
                    { value: '2', label: 'x32计算' },
                ],
                vcpuOptions:[
                    { value: '0', label: '8核' },
                    { value: '1', label: '6核' },
                    { value: '2', label: '4核' },
                ],
                nodeMemoryOptions:[
                    { value: '0', label: '512GB' },
                    { value: '1', label: '1024GB' },
                    { value: '2', label: '2048GB' },
                ],
                nodeSystemDiskOptions:[
                    { value: '0', label: '高效云盘1' },
                    { value: '1', label: '高效云盘2' },
                    { value: '2', label: '高效云盘4' },
                ],
                nodeDataDiskOptions:[
                    { value: '0', label: '高效云盘1' },
                    { value: '1', label: '高效云盘2' },
                    { value: '2', label: '高效云盘4' },
                ],
                VPCOptions: [
                    { value: 'VPC1', label: 'VPC1' },
                    { value: 'VPC2', label: 'VPC2' },
                    { value: 'VPC3', label: 'VPC3' },
                    { value: 'VPC4', label: 'VPC4' }
                ],//VPC
                billingTimeOptions:[
                    { value: '0', label: '1年' },
                    { value: '1', label: '2年' },
                    { value: '2', label: '3年' },
                ],
                nodeComponent:"",
                componentTag:true

            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            back(){
                this.$router.go(-1);
            },
            //打开子页面
            OpenRightBox(componentName){
                this.componentTag = true;
                this.nodeComponent = componentName;
            },
            //关闭子页面
            closeComponent(){
                this.componentTag = false;
            },
            getSurplusNumber(){
                let oldNumber = this.form.nodeDataNumber;
                this.form.newNumber = 10 - oldNumber;
                return  this.form.newNumber;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";
    .container {
        width: 100%;
        height: 100%;
    }
    .title{
        color:$title-color;
        margin-top: 29px;
        height: $topBarHeight;
        background-color:#F0F2F5;
        font-size: $title-size;
        line-height: $title-lineheight +15px ;
        font-family: $title-fontfamily;
        padding:0;
    }
    .back{
        margin-left: 32px;
        font-size: 14px;
    }
    a{
        color: $color-primary;
    }
    .line{
        margin: 6px;
        height: 25px;
        color: #99a9bf;
    }
    .tooltip{
        position: relative;
    }
    .tooltip >>> label{
        color: $blue;
        font-size: 16px;
        line-height: 40px;
        padding: $padding-size;
    }
    .el-icon-refresh-right{
        color: $color-primary;
        font-size:18px;
        margin:10px;
    }
    .select{
        width: 350px;
    }
    .password{
        width: 180px;
    }
    .form{
        margin-top: 31px;
        margin-left: 40px;
    }
    .input-number-medium{
        width: 220px;
    }
</style>

