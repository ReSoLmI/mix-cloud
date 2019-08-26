import ajax from '../utils/ajax'

const BASE_URL = '/Cluster'

//获取地域列表
export const reqRegionsList = (cancelHandle) => ajax(BASE_URL + '/api/lsh/reso/clouds/regions',{},'GET',cancelHandle)
/**
 * 获取VPC列表
 * @param regionId 地域
 * @param cancelHandle 
 */
export const reqVPCList = (regionId,cancelHandle) => ajax(BASE_URL + '/api/lsh/reso/clouds/vpcs',{regionId},'GET',cancelHandle)
/**
 * 获取云服务器可用镜像
 * @param regionId 地域
 * @param imageOwnerAlias 指定镜像来源,取值范围: system:阿里云提供的公共镜像, self:用户创建的自定义镜像,others:其他阿里云用户共享的镜像, marketplace:镜像市场提供的镜像,默认值:空,表示返回取值为system、self以及others的结果
 * @param osType 指定镜像操作系统类型,取值范围:windows,linux
 * @param architecture 指定镜像的体系架构,取值范围:i386,x86_64
 * @param cancelHandle 
 */
export const reqAvailabelImagesList = (regionId,imageOwnerAlias,osType,architecture,cancelHandle) => ajax(BASE_URL + '/api/lsh/reso/clouds/ecs/images',{regionId,imageOwnerAlias,osType,architecture},'GET',cancelHandle)
/**
 * 获取可用区列表
 * @param regionId 地域
 * @param cancelHandle 
 */
export const reqAvailabeZonesList = (regionId,cancelHandle) => ajax(BASE_URL + '/api/lsh/reso/clouds/zones',{regionId},'GET',cancelHandle)
/**
 * 创建vpc
 * @param bodyOfCreateVswitch 创建vSwitch请求参数实体类	
 * {
    regionId	        公有云地域id,vpc创建场景下，该参数可省略	
    vpcId	            所在虚拟私有云id,vpc创建场景下，该参数可省略	
    vswitchCidrBlock	虚拟交换机网段，交换机网段的掩码长度范围为16-29位。交换机的网段必须从属于所在VPC的网段
    vswitchDescription	描述信息	
    vswitchName	        虚拟交换机名称	
    zoneId              所在可用区id	
 * }
 * @param regionId          公有云地域id	
 * @param resourceGroupId   所属资源组id	
 * @param vpcCidrBlock      虚拟私有云网段，一个VPC只能指定一个网段，网段的范围包括10.0.0.0/8、172.16.0.0/12和192.168.0.0/16以及它们的子网，网段的掩码为8-24位，默认为172.16.0.0/12
 * @param vpcDescription    描述信息
 * @param vpcName           虚拟私有云名称	
 * @param cancelHandle 
 */
export const reqCreateVPC = (bodyOfCreateVswitch,regionId,resourceGroupId,vpcCidrBlock,vpcDescription,vpcName,cancelHandle) => ajax(BASE_URL + '/api/lsh/reso/clouds/vpcs',{bodyOfCreateVswitch,regionId,resourceGroupId,vpcCidrBlock,vpcDescription,vpcName},'POST',cancelHandle)

/**
 * 获取子网列表
 * @param regionId 地域
 * @param cancelHandle 
 */
export const reqvSwitchList = (regionId,cancelHandle) => ajax(BASE_URL + '/api/lsh/reso/clouds/vswitches',{regionId},'GET',cancelHandle)
/**
 * 创建子网
 * 
   @param regionId	        公有云地域id,vpc创建场景下，该参数可省略	
   @param vpcId	            所在虚拟私有云id,vpc创建场景下，该参数可省略	
   @param vswitchCidrBlock	虚拟交换机网段，交换机网段的掩码长度范围为16-29位。交换机的网段必须从属于所在VPC的网段
   @param vswitchDescription	描述信息	
   @param vswitchName	        虚拟交换机名称	
   @param zoneId              所在可用区id	
 * 
 * @param cancelHandle 
 */
export const reqCreateVSwitch = (regionId,vpcId,vswitchCidrBlock,vswitchDescription,vswitchName,zoneId,cancelHandle) => ajax(BASE_URL + '/api/lsh/reso/clouds/vswitches',{regionId,vpcId,vswitchCidrBlock,vswitchDescription,vswitchName,zoneId},'POST',cancelHandle)
/**
 * 
 * @param regionId 公有云地域id
 * @param zoneId 所在可用区id
 * @param cancelHandle 
 */
export const reqECSType = (regionId,zoneId,cancelHandle) => ajax(BASE_URL + '/api/lsh/reso/clouds/ecs/types',{regionId,zoneId},'GET',cancelHandle)
