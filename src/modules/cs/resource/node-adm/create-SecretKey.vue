<template>
    <form-layout title="新建密钥对" @close="$emit('close')" is-side>
        <template v-slot:form>
            <el-form label-position="left" class="form" ref="form" :model="form" label-width="100px">
                <el-form-item label="密钥对名称：" prop="password">
                    <el-input type="password" class="input-normal" placeholder="请输入密钥对名称" autocomplete="off"></el-input>
                    <span class="tip-font">长度为2-128个字符，以大小字母或中文开头，可包含数字，"_"或"-"</span>
                </el-form-item>
                <el-form-item label="创建类型：">
                    <el-select  v-model="form.scretKey" placeholder="请选择创建密钥类型">
                        <el-option
                                v-for="item in scretKey"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资源组：" v-if="form.scretKey =='自动新建密钥对'">
                    <el-select class="select" v-model="form.resource" placeholder="请选择">
                        <el-option
                                v-for="item in resource"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签：" v-if="form.scretKey =='自动新建密钥对'">
                    <el-select  v-model="form.labelKey" placeholder="请选择已有标签键或输入新键">
                        <el-option
                                v-for="item in labelKey"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select  v-model="form.labelValue" placeholder="请选择已有标签键或输入新键">
                        <el-option
                                v-for="item in labelValue"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input
                              style="margin-top: 20px"
                              class="textarea"
                              type="textarea"
                              :rows="10"
                              placeholder="请输入内容"
                              v-model="form.labelKey">
                    </el-input>
                </el-form-item>
                <el-form-item label="公钥内容：" v-if="form.scretKey =='导入已有密钥对'">
                    <textarea class="textarea" rows="20" >ssh-rsaAAAAB3NzaC1yc2EAAAADAQABAAABAQChYaZjH0O5O9dYO/uvHqo1zf8v</textarea>
                </el-form-item>
            </el-form>
        </template>
    </form-layout>
</template>

<script>
    import FormLayout from '@/views/create-sth-layout/form-layout'
    export default {
        name: "SecretKeyComponent",
        components: {
            FormLayout,
        },
        data(){
            return{
                form:{
                    scretKey:"自动新建密钥对",
                    labelKey:"",
                    labelValue:"",
                    serverNetValue3:"",
                    textarea:[],
                },
                territory:[
                    { value: '华东区', label: '华东区' },
                    { value: '华北区', label: '华北区' },
                    { value: '西南区', label: '西南区' }
                ],
                serverNetOptions:[
                    { value: '1', label: '1' },
                    { value: '11', label: '11' },
                    { value: '22', label: '22' }
                ],
                resource:[
                    { value: '华东区', label: '华东区' },
                    { value: '华北区', label: '华北区' },
                    { value: '西南区', label: '西南区' }
                ],
                labelKey:[
                    { value: 'name', label: 'name' },
                    { value: 'number', label: 'number' },
                    { value: 'datetime', label: 'datetime' }
                ],
                labelValue:[
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' }
                ],
                scretKey:[
                    { value: '自动新建密钥对', label: '自动新建密钥对' },
                    { value: '导入已有密钥对', label: '导入已有密钥对' },
                ]

            }
        },
        mounted(){
        },
        methods:{
            closeComponent() {
                this.$emit('close');//出发close自定义消息
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";
    .tooltip{
        position: relative;
    }
    .tooltip >>> label{
        color: $blue;
        font-size: 16px;
        line-height: 40px;
        padding: $padding-size;
    }
    .right_box{
        position: absolute;
        top: 0px;
        right:0px;
        z-index: 1;
        width: 70%;
        height: 100%;
        background-color: #FFFFFF;
        box-shadow:0px 2px 5px 0px rgba(0, 0, 0, 0.2);
        bottom:30px;
        overflow: inherit;//继承父元素样式
        padding: 30px;
    }
    .input-normal {
        width: 350px;
        height: 36px;
        font-size: $input-fontsize;
        color: $input-fontcolor;
        font-family: $input-fontfamily;
    }
    .select{
        width: 350px;
    }
    .input-mini {
        width: 100px;
        font-size: $input-fontsize;
        color: $input-fontcolor;
        font-family: $input-fontfamily;
    }
    .select-mini{
        width: 100px;
        margin-left: 5px;
        font-size: $select-fontsize;
        color: $select-fontcolor;
        font-family: $select-fontfamily;
    }
    .textarea{
        background-color:black;
        width: 755px;
        color: #FFFFFF
    }
    .form{
        margin-top: 31px;
        margin-left: 40px;
    }
</style>
