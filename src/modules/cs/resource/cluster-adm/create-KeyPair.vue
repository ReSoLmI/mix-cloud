<template>
    <form-layout title="新建密钥对"
                 v-bind="$attrs"
                 v-on="$listeners">
        <template v-slot:goback>
            <el-button type="text" icon="el-icon-close" class="icon-button" @click="$emit('close')"></el-button>
        </template>
        <template v-slot:form>
            <el-form label-position="left" ref="form" :model="form" label-width="90px" size="medium">
                <el-form-item label="密钥对名称:">
                    <el-input class="input-normal" v-model="form.Name"></el-input>
                    <span class="tip-font">长度为2-128个字符，以大小字母或中文开头，可包含数字，"_"或"-"</span>
                </el-form-item>
                <el-form-item label="创建类型：" >
                    <el-select class="select-normal"  v-model="form.keyTypeValue" placeholder="请选择">
                        <el-option
                        v-for="item in keyTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资源组：" >
                    <el-select class="select-normal"  v-model="form.resourceValue" placeholder="请选择">
                        <el-option
                        v-for="item in resourceOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签：" >
                    <el-col>
                        <el-select style="margin-right:10px;" class="select-normal"  v-model="form.tagValue1"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择已有标签键或输入新键">
                            <el-option
                            v-for="item in tagOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select class="select-normal"  v-model="form.tagValue2"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择已有标签键或输入新键">
                            <el-option
                            v-for="item in tagOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <div class="tag-box"></div>
                </el-form-item>
            </el-form>
        </template>
    </form-layout>
</template>
<script>
import FormLayout from '@/views/create-sth-layout/form-layout'

export default {
    name:"SubNetComponent",
    components: {
        FormLayout,
    },
    data(){
        return{
            form:{
                Name:"",//密钥对名称
                keyTypeValue:"0",//类型
                resourceValue:"",//资源组
                tagValue1:"",//标签1
                tagValue2:"",//标签2
            },
            keyTypeOptions:[
                {value:"0",label:"自动新建密钥对"},
                {value:"1",label:"导入已有密钥对"}
            ],//创建类型
            resourceOptions:[],//资源组
            tagOptions:[
                {value:"0",label:"ccc"},
                {value:"1",label:"kkk"}
            ],//标签

        }
    },
    mounted(){
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
//标签
.tag-box{
    border: 1px dotted $color-border;
    width: 100%;
    height: 132px;
}
</style>
