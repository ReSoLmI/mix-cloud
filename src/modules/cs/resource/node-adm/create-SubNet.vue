<template>
    <form-layout title="创建子网" @close="$emit('close')" is-side>
        <template v-slot:form>
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px">
                <el-form-item label="名称：" prop="path">
                    <el-input v-model="temp.path" placeholder="请输入名称"/>
                    <span class="tip-font">长度为2-128个字符，以大小字母或中文开头，可包含数字，"_"或"-"</span>
                </el-form-item>
                <el-form-item label="VPC：" prop="serverName">{{temp.serverName}}</el-form-item>
                <el-form-item label="Ipv4网段:" prop="port">{{temp.port}}</el-form-item>

                <el-form-item label="可用区：">
                    <el-select class="select" v-model="temp.territory" placeholder="请选择地域">
                        <el-option
                                v-for="item in territoryOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="子网网段:">
                    <el-row >
                        <el-col>
                            <el-input  :disabled="true" v-model="temp.serverNetValue1"></el-input>
                            <span>﹐</span>
                            <el-input  :disabled="true" v-model="temp.serverNetValue2"></el-input>
                            <span>﹐</span>
                            <el-input   value="0"></el-input>
                            <span>﹐</span>
                            <el-input  :disabled="true" value="0"></el-input>
                            <span> / </span>
                            <el-select  v-model="temp.clusterName" placeholder="请选择">
                                <el-option
                                        v-for="item in clusterNameOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <span class="tip-font">一旦创建成功，网段不能修改</span>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="可用IP数:" prop="weightedProportions">{{temp.weightedProportions}}</el-form-item>
            </el-form>
        </template>
    </form-layout>
</template>

<script>
    import FormLayout from '@/views/create-sth-layout/form-layout'

    export default {
        name: "CreateRoutingRule",
        components: {
            FormLayout,
        },
        data() {
            return {
                temp: {
                    id: undefined,
                    path: '',
                    serverName: 'asdfasf',
                    serverNetValue1:'',
                    serverNetValue2:'',
                    serverNetValue3:'',
                    port: '192.168.0.1',
                    weightedProportions: '256',
                    // territory:'',

                    clusterName:[
                        { value: '阿里云', label: '阿里云' },
                        { value: '华为云', label: '华为云' },
                        { value: '时速云', label: '时速云' }
                    ],
                },
                territoryOptions:[
                    { value: '华东区', label: '华东区' },
                    { value: '华北区', label: '华北区' },
                    { value: '西南区', label: '西南区' }
                ],
                clusterNameOptions:[
                    { value: '华东区', label: '华东区' },
                    { value: '华北区', label: '华北区' },
                    { value: '西南区', label: '西南区' }
                ],
                rules: {
                    type: [{required: true, message: 'type is required', trigger: 'change'}],
                    timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
                    title: [{required: true, message: 'title is required', trigger: 'blur'}]
                },
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables";

    .select-mini {
        width: 100px;
        font-size: $font-size-base;
        color: $color-text-regular;
        font-family: $select-fontfamily;
    }
</style>
