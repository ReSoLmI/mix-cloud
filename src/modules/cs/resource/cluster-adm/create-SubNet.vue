<template>
    <form-layout title="创建子网"
                 v-bind="$attrs"
                 @create="handleCreateSubNet"
                 v-on="$listeners">
        <template v-slot:goback>
            <el-button type="text" icon="el-icon-close" class="icon-button" @click="$emit('close')"></el-button>
        </template>
        <template v-slot:form>
            <el-form label-position="left" ref="form" :model="form" label-width="90px" size="medium">
                <el-form-item label="名称:">
                    <el-input class="input-normal" v-model="form.SubNetName"></el-input>
                    <span class="tip-font">长度为2-128个字符，以大小字母或中文开头，可包含数字，"_"或"-"</span>
                </el-form-item>
                <el-form-item label="VPC:">{{form.VPCName}}</el-form-item>
                <el-form-item label="Ipv4网段:">{{form.Ipv4}}</el-form-item>
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
                <el-form-item label="可用IP数:">{{form.IPcount}}</el-form-item>
            </el-form>
        </template>
    </form-layout>
</template>
<script>
import { mapActions , mapState} from "vuex";
import FormLayout from '@/views/create-sth-layout/form-layout'

export default {
    name:"SubNetComponent",
    components: {
        FormLayout,
    },
    props:{
        VPCId:String,
    },
    data(){
        return{
            form:{
                SubNetName:'',//子网名称
                RegionId:"",//地域id
                VPCName:"",//名称
                Ipv4:"",//ipv4网段
                availableZonesValue:"",//可用区
                serverNetValue:['192','168','0','0'],//子网数组
                SubnetMask:'24',//子网掩码
                IPcount:"252",//IP数
            },
            availableZonesOptions:[],//子网段选项
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
            netTag:true,//子网掩码框是否显示
        }
    },
    mounted(){
        //从路由中获取地域id
        this.form.RegionId = this.$route.params.regionId;
        //获取VPC相关信息
        let VPCObject = this.$store.state['cluster'].VPCList.find(item => item.vpcId === this.VPCId);
        this.form.VPCName = VPCObject.vpcName;
        this.form.Ipv4 = VPCObject.cidrBlock;
        //获取可用区列表
        this.getAvailabelZones();
    },
    methods:{
        ...mapActions({
            getAvailabelZonesOptions: "cluster/getAvailabelZonesList",
            createSubNet:"cluster/createSubNet",
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
            let arr = this.Ipv4.split(/\.|\//)
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
        //创建子网
        handleCreateSubNet(){
            //确认必须参数不为空
            if(this.form.SubNetName != '' && this.form.availableZonesValue != ''){
                //处理子网数据
                let arr = this.form.serverNetValue.map((item)=>item).join('.')
                let vpc_vswitchCidrBlock = arr + '/' + this.form.SubnetMask;
                const _this = this;
                _this.createSubNet({regionId:_this.form.RegionId,vpcId:_this.VPCId,vswitchCidrBlock:vpc_vswitchCidrBlock,vswitchDescription:"",vswitchName:_this.form.SubNetName,zoneId:_this.form.availableZonesValue,callback:(data => {
                    console.log("子网创建",data.resMsg);
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

</style>
