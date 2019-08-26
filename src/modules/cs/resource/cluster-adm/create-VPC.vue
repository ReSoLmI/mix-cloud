<template>
    <form-layout title="创建VPC"
                 v-bind="$attrs"
                 @create="handleCreateVPC"
                 v-on="$listeners">
        <template v-slot:goback>
            <el-button type="text" icon="el-icon-close" class="icon-button" @click="$emit('close')"></el-button>
        </template>
        <template v-slot:form>
            <el-form label-position="left" ref="form" :model="form" label-width="90px" size="medium">
                <div style="height:60px;line-height:60px;">
                    <span class="secend-title" >基本信息</span>
                </div>
                <el-form-item label="地域:">{{form.RegionName}}</el-form-item>
                <el-form-item label="名称:">
                    <el-input class="input-normal" v-model="form.VPCName"></el-input>
                    <span class="tip-font">长度为2-128个字符，以大小字母或中文开头，可包含数字，"_"或"-"</span>
                </el-form-item>
                <el-form-item label="网段:" >
                    <el-select class="select-normal" v-model="form.NetworkSegmentValue" placeholder="请选择" @change="getNetworkSegment()">
                        <el-option
                        v-for="item in NetworkSegmentOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span class="tip-font">建议您使用RFC私网地址10.0.0.0/8，172.16.0.0/12，192.168.0.0/16 作为专有网络的网段。</span>
                </el-form-item>
                <el-form-item label="描述:">
                    <el-input style="width:350px;" type="textarea":autosize="{ minRows: 2, maxRows: 4}"  v-model="form.Description"></el-input>
                </el-form-item>
                <div style="height:60px;line-height:60px;">
                    <span class="secend-title">默认子网</span>
                </div>
                <el-form-item label="名称:">
                    <el-input class="input-normal" v-model="form.SubnetName"></el-input>
                    <span class="tip-font">长度为2-128个字符，以大小字母或中文开头，可包含数字，"_"或"-"</span>
                </el-form-item>
                <el-form-item label="可用区:" >
                    <el-select class="select-normal"  v-model="form.availableZonesValue" placeholder="请选择">
                        <el-option
                        v-for="item in availableZonesOptions"
                        :key="item.zoneId"
                        :label="item.localName"
                        :value="item.zoneId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="子网网段:">
                    <el-row style="margin-bottom:20px;">
                        <el-col>
                        <el-input class="input-mini" :disabled="true" v-model="form.serverNetValue[0]"></el-input>
                        <span>﹐</span>
                        <el-input class="input-mini" :disabled="netTag" v-model="form.serverNetValue[1]"></el-input>
                        <span>﹐</span>
                        <el-input class="input-mini"  v-model="form.serverNetValue[2]"></el-input>
                        <span>﹐</span>
                        <el-input class="input-mini" :disabled="true" v-model="form.serverNetValue[3]"></el-input>
                        <span> / </span>
                        <el-select class="select-mini" v-model="form.SubnetMask" placeholder="请选择">
                            <el-option
                            v-for="item in serverNetOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <span class="tip-font">一旦创建成功，网段不能修改</span>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
        </template>
    </form-layout>
</template>
<script>
import { mapActions , mapState} from "vuex";
import FormLayout from '@/views/create-sth-layout/form-layout'

export default {
    name:"VPCComponent",
    components: {
        FormLayout,
    },
    data(){
        return{
            form:{
                RegionName:"",//地域名称
                RegionId:"",//地域id
                VPCName:'',//vpc名称
                SubnetName:"",//子网名称
                NetworkSegmentValue:0,//网段
                Description:"",//描述
                serverNetValue:['192','168','0','0'],//子网数组
                SubnetMask:'24',//子网掩码
                availableZonesValue:"",//可用区选值
            },
            netTag:true,
            NetworkSegmentOptions:[
                {value:0,label:"192.168.0.0/16"},
                {value:1,label:"172.16.0.0/12"},
                {value:2,label:"10.0.0.0/8"}
            ],//子网段选项
            serverNetOptions:[
                {value:17,label:'17'},
                {value:18,label:'18'},
                {value:19,label:'19'},
                {value:20,label:'20'},
                {value:21,label:'21'},
                {value:22,label:'22'},
                {value:23,label:'23'},
                {value:24,label:'24'},
                {value:25,label:'25'},
                {value:26,label:'26'},
                {value:27,label:'27'},
                {value:28,label:'28'},
                {value:29,label:'29'}
            ],//服务网段选项
            availableZonesOptions:[],//可用区选项
            reqCancelHandles:[],//网络请求句柄
        }
    },
    computed:{
        ...mapState({
            // RegionsOptions: state => state['cluster'].regionsList,//可用区
        }),
    },
    mounted(){
        //获取地域id对应的地域名称
        this.form.RegionId = this.$route.params.regionId;//从路由中获取地域id
        this.form.RegionName = this.$store.state['cluster'].regionsList.find(item => item.regionId === this.form.RegionId).localName
        //获取可用区列表
        this.getAvailabelZones();
    },
    methods:{
        ...mapActions({
            getAvailabelZonesOptions: "cluster/getAvailabelZonesList",
            createVPC: "cluster/createVPC",
        }),
        //获取可用区下拉框选项
        getAvailabelZones(){
            const _this = this;
            _this.getAvailabelZonesOptions({regionId:_this.form.RegionId,callback:(data) => {
                if(data.length != 0){
                    _this.availableZonesOptions = data;//设置option
                }
            },cancelHandle:_this.reqCancelHandles})
        },
        //网段选择联动
        getNetworkSegment(){
            this.form.SubnetMask = '24';//设置子网掩码初始值
            this.serverNetOptions = [
                {value:16,label:'16'},
                {value:17,label:'17'},
                {value:18,label:'18'},
                {value:19,label:'19'},
                {value:20,label:'20'},
                {value:21,label:'21'},
                {value:22,label:'22'},
                {value:23,label:'23'},
                {value:24,label:'24'},
                {value:25,label:'25'},
                {value:26,label:'26'},
                {value:27,label:'27'},
                {value:28,label:'28'},
                {value:29,label:'29'}
            ]//初始化子网掩码选项
            let item = this.NetworkSegmentOptions.find(item => item.value === this.form.NetworkSegmentValue)
            let arr = item.label.split(/\.|\//)
            //删除选项中小于初始子网掩码的值
            let tempOptions = this.serverNetOptions;
            for(let i = 0; i < tempOptions.length; i++){
                if(tempOptions[i].value <= arr.splice(4,1)){
                    this.serverNetOptions.splice(i,1);
                }
            }
            this.form.serverNetValue = arr;//获取子网值
            //设置子网是否可更改第二个数值
            switch(this.form.NetworkSegmentValue){
                case 0: {
                    this.netTag = true;
                    break;
                }
                case 1: {
                    this.netTag = false;
                    break;
                }
                case 3: {
                    this.netTag = false;
                    break;
                }
                default: break;
            }
        },
        //创建VPC
        handleCreateVPC(){
            //确认必须参数不为空
            if(this.form.SubnetName !=  '' && this.form.availableZonesValue != ''){
                //处理子网数据
                let arr = this.form.serverNetValue.map((item)=>item).join('.')
                let vpc_vswitchCidrBlock = arr + '/' + this.form.SubnetMask
                //处理vpc网段
                let vpc_vpcCidrBlock = this.NetworkSegmentOptions.find(item  => item.value === this.form.NetworkSegmentValue).label;
                //处理创建子网实体对象
                let vpc_bodyOfCreateVswitch = {
                    "vswitchCidrBlock":vpc_vswitchCidrBlock,
                    "vswitchName":this.form.SubnetName,
                    "zoneId":this.form.availableZonesValue
                };
                const _this = this;
                _this.createVPC({bodyOfCreateVswitch:vpc_bodyOfCreateVswitch,regionId:_this.form.RegionId,resourceGroupId:"",vpcCidrBlock:vpc_vpcCidrBlock,vpcDescription:_this.form.Description,vpcName:_this.form.VPCName,callback:(data => {
                    console.log("vpc创建",data.resMsg);
                }),cancelHandle:_this.reqCancelHandles})
            }else{
                console.log("必选参数未填写完整");
            }
        },
    }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.secend-title{
    color: $color-text-primary;
    font-size: 16px;
    font-family: Microsoft YaHei Regular;
    line-height: 50px;
}
</style>
