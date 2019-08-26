<template>
    <form-layout title="添加端口映射" @close="$emit('close')" is-side>
        <template v-slot:form>
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px">
                <el-form-item label="协议" prop="path">
                    <el-input v-model="temp.path" placeholder="请输入协议"/>
                </el-form-item>
                <el-form-item label="服务端口号" prop="serverPort">
                    <el-input v-model="temp.serverName" placeholder="请输入服务端口号"/>
                </el-form-item>
                <el-form-item label="容器端口号" prop="potPort">
                    <el-input v-model="temp.port" placeholder="请输入容器端口号"/>
                </el-form-item>
            </el-form>
        </template>
    </form-layout>
</template>

<script>
    import FormLayout from "@/views/create-sth-layout/form-layout/index";

    export default {
        name: "CreatePortMapping",
        components: {FormLayout},
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
    }
</script>

<style lang="scss" scoped>

</style>
