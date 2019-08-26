import {reqVPCList ,
    reqRegionsList ,
    reqAvailabelImagesList ,
    reqAvailabeZonesList ,
    reqvSwitchList ,
    reqCreateVPC,
    reqCreateVSwitch,
    reqECSType,
} from '@/api/cluster'

const state = {
    regionsList:[],//地域列表
    VPCList:[],//VPC列表
    // availableImages:[],//镜像列表
    // availableZones:[],//可用区列表
    ECSType:[],//实例规格
}

const mutations = {
    //地域列表
    SAVE_REGIONS_LIST(obj,value){
        state.regionsList = value;
    },
    //VPC列表
    SAVE_VPC_LIST(obj,value){
        state.VPCList = value;
    },
    //镜像列表
    // SAVE_AVAILABLE_IMAGES_LIST(obj,value){
    //     state.availableImages = value;
    // },
    //可用区列表
    // SAVE_AVAILABLE_ZONES_LIST(obj,value){
    //     state.availableZones = value;
    // },
    //实例规格
    SAVE_ECS_TYPE_LIST(obj,value){
        state.ECSType = value;
    },
}

const actions = {
    //地域列表
    async getRegionsList (obj,{cancelHandle}) {
        try {
        const result = await reqRegionsList(cancelHandle)
        obj.commit('SAVE_REGIONS_LIST', result.data)
        } catch (e) {
            console.log(e)
        }
    },
    //VPC列表
    async getVPCList (obj,{regionId,callback,cancelHandle}) {
        try {
        const result = await reqVPCList(regionId,callback,cancelHandle)
        obj.commit('SAVE_VPC_LIST', result.data)
        callback && callback(result.data)
        } catch (e) {
            console.log(e)
        }
    },
    //镜像列表
    async getAvailabelImagesList (obj,{regionId,imageOwnerAlias,osType,architecture,callback,cancelHandle}) {
        try {
        const result = await reqAvailabelImagesList(regionId,imageOwnerAlias,osType,architecture,callback,cancelHandle)
        // obj.commit('SAVE_AVAILABLE_IMAGES_LIST', result.data)
        callback && callback(result.data)
        } catch (e) {
            console.log(e)
        }
    },
    //可用区列表
    async getAvailabelZonesList (obj,{regionId,callback,cancelHandle}) {
        try {
        const result = await reqAvailabeZonesList(regionId,callback,cancelHandle)
        // obj.commit('SAVE_AVAILABLE_ZONES_LIST', result.data)
        callback && callback(result.data)
        } catch (e) {
            console.log(e)
        }
    },
    //创建VPC
    async createVPC (obj,{bodyOfCreateVswitch,regionId,resourceGroupId,vpcCidrBlock,vpcDescription,vpcName,callback,cancelHandle}) {
        try {
        const result = await reqCreateVPC(bodyOfCreateVswitch,regionId,resourceGroupId,vpcCidrBlock,vpcDescription,vpcName,callback,cancelHandle)
        callback && callback(result.data)
        } catch (e) {
            console.log(e)
        }
    },
    //子网列表
    async getvSwitchList (obj,{regionId,callback,cancelHandle}) {
        try {
        const result = await reqvSwitchList(regionId,callback,cancelHandle)
        callback && callback(result.data)
        } catch (e) {
            console.log(e)
        }
    },
    //创建子网
    async createSubNet (obj,{regionId,vpcId,vswitchCidrBlock,vswitchDescription,vswitchName,zoneId,callback,cancelHandle}) {
        try {
        const result = await reqCreateVSwitch(regionId,vpcId,vswitchCidrBlock,vswitchDescription,vswitchName,zoneId,callback,cancelHandle)
        callback && callback(result.data)
        } catch (e) {
            console.log(e)
        }
    },
    //实例规格获取
    async getECSTypeList (obj,{regionId,zoneId,callback,cancelHandle}) {
        try {
        const result = await reqECSType(regionId,zoneId,callback,cancelHandle)
        obj.commit('SAVE_ECS_TYPE_LIST', result.data)
        callback && callback(result.data)
        } catch (e) {
            console.log(e)
        }
    },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
