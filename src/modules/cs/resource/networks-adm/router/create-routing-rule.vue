<template>
    <form-layout title="添加路由规则"
                 v-bind="$attrs"
                 v-on="$listeners">
        <template v-slot:goback>
            <el-button type="text" icon="el-icon-close" class="icon-button" @click="$emit('close')"></el-button>
        </template>
        <template v-slot:form>
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px">
                <el-form-item label="路径" prop="path">
                    <el-input class="input-normal" v-model="temp.path" placeholder="请输入路径"/>
                </el-form-item>
                <el-form-item label="服务名称" prop="serverName">
                    <el-input class="input-normal" v-model="temp.serverName" placeholder="请输入服务名称"/>
                </el-form-item>
                <el-form-item label="服务端口" prop="port">
                    <el-input class="input-normal" v-model="temp.port" placeholder="请输入服务端口"/>
                </el-form-item>
                <el-form-item label="权重比例" prop="weightedProportions">
                    <el-input class="input-normal" v-model="temp.weightedProportions" placeholder="请输入权重比例"/>
                </el-form-item>
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
        props:{
        },
        data() {
            return {
                temp: {
                    id: undefined,
                    path: '',
                    serverName: '',
                    port: '',
                    weightedProportions: '',
                },
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

</style>
