<template>
    <div class="details_right_box">
        <!-- 标题栏 -->
        <div class="title-box">
            <el-button type="text" icon="el-icon-close" class="icon-button"  @click="closeComponent"></el-button>
            <el-select class="select-mini"   v-model="serverNetValue" placeholder="请选择">
                <el-option
                  v-for="item in serverNetOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
            <ul class="tab-ul" ref="tab">
                <li @click="handleClick(0)" :class="{'tab-li-actived':activeIndex===0}">基本属性</li>
                <li @click="handleClick(1)" :class="{'tab-li-actived':activeIndex===1}">监控</li>
                <li @click="handleClick(2)" :class="{'tab-li-actived':activeIndex===2}">事件</li>
            </ul>
        </div>
        <!-- 配置 -->
        <div class="tooltip">
            <!-- 基本属性 -->
            <template v-if="activeIndex===0">
                <div class="content-box">
                    <div class="secend-title-box">
                        <i class="el-icon-tickets box-icon" style="display:inline-block;line-height:80px;font-size:50px;"></i>
                        <div style="display:inline-block;">
                            <span class="box-title">{{clusterItem.name}}</span>
                            <div>
                                <i :class="{'el-icon-circle-check':clusterItem.status === '正常','el-icon-circle-close':clusterItem.status === '失败'}"></i>
                                <span class="box-title">{{clusterItem.status}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="box-card">
                        <i class="el-icon-tickets box-icon" ></i>
                        <span class="box-title">基本信息</span>
                        <div class="divider"></div>
                            <el-col class="line">
                                <div class="left-font">集群ID：</div>
                                <span class="right-font">{{clusterItem.ID}}</span>
                            </el-col>
                            <el-col class="line">
                                <div class="left-font">云服务商：</div>
                                <span class="right-font">{{clusterItem.provider}}</span>
                            </el-col>
                            <el-col class="line">
                                <div class="left-font">地域：</div>
                                <span class="right-font">{{clusterItem.address}}</span>
                            </el-col>
                            <el-col class="line">
                                <div class="left-font">集群版本：</div>
                                <span class="right-font">{{clusterItem.versions}}</span>
                            </el-col>
                            <el-col class="line">
                                <div class="left-font">Docker版本：</div>
                                <span class="right-font">{{clusterItem.dockerVersions}}</span>
                            </el-col>
                            <el-col class="line">
                                <div class="left-font">创建时间：</div>
                                <span class="right-font">{{clusterItem.date}}</span>
                            </el-col>
                    </div>
                    <div class="box-card">
                        <i class="el-icon-tickets box-icon" ></i>
                        <span class="box-title">其他</span>
                        <div class="divider"></div>
                        <el-col class="line">
                            <div class="left-font">认证方式：</div>
                            <span class="right-font">{{clusterItem.ID}}</span>
                        </el-col>
                        <el-col class="line">
                            <div class="left-font">鉴权方式：</div>
                            <span class="right-font">{{clusterItem.provider}}</span>
                        </el-col>
                        <el-col class="line">
                            <div class="left-font">描述:</div>
                            <span class="right-font">{{clusterItem.address}}</span>
                        </el-col>
                    </div>
                </div>
                <div class="content-box">
                    <div class="box-card">
                        <i class="el-icon-tickets box-icon" ></i>
                        <span class="box-title">网络</span>
                        <div class="divider"></div>
                        <el-col class="line">
                            <div class="left-font">虚拟私有云：</div>
                            <span class="right-font">Virtual-es1 | 168.10.12.196 | 正常</span>
                        </el-col>
                        <!-- <div class="left-font" style="line-height: 40px;height: 40px;padding-left:10px;">子网：</div>  -->
                        <div class="mini-table">
                            <div class="left-font" style="float:left;padding:5px 0px 0px 10px;">子网：</div>
                            <div class="right-table">
                                <table border="0" style="display:inline-block;float:left;">
                                    <tr>
                                        <th >名称/ID</th>
                                        <th >可用区</th>
                                        <th >CIDR</th>
                                    </tr>
                                    <tr>
                                        <td>private-cloud</td>
                                        <td>杭州可用区A</td>
                                        <td>172.21.0.0/20</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <el-col class="line">
                            <div class="left-font">服务网段：</div>
                            <span class="right-font">10.247.0.0/16</span>
                        </el-col>
                        <el-col class="line">
                            <div class="left-font">容器网段：</div>
                            <span class="right-font">172.16.0.0/16</span>
                        </el-col>
                    </div>
                </div>
            </template>

            <!-- 监控 -->
            <!-- 事件 -->
            <template v-if="activeIndex===2">
                <div class="tool-box" >
                    <el-row style="margin:20px 0px;">
                        <el-col>
                            <el-date-picker
                                v-model="timeValue"
                                type="daterange"
                                class="picker-small">
                            </el-date-picker>
                        <el-input style="margin:0px 10px;" class="input-normal" v-model="eventName" placeholder="请输入事件名称">
                            <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClick"></i>
                        </el-input>
                        <i class="el-icon-refresh-right"></i>
                        </el-col>
                    </el-row>
                </div>
                <div class="full_table">
                    <el-table :data="tableData2" tooltip-effect="dark" style="width: 100%;cursor: pointer;">
                        <el-table-column prop="time" label="产生时间" show-overflow-tooltip></el-table-column>
                        <el-table-column label="事件名称" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <i :class="{'el-icon-circle-check':scope.row.status === '成功','el-icon-circle-close':scope.row.status === '失败'}"></i>
                                {{ scope.row.event }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="type" label="类型" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="object" label="对象" show-overflow-tooltip></el-table-column>
                    </el-table>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name:"VPCComponent",
    props:{
        clusterItem:Object,
    },
    components:{
    },
    data(){
        return{
            serverNetValue:"0",
            serverNetOptions:[
                {value:"0",label:"集群管理"}
            ],//服务网段选项
            activeIndex:0,//激活菜单的index
            timeValue:"",//时间
            eventName:"",//事件名称
            tableData2: [{
                time:"2019/07/15 10:16:33 GMT+08:00",
                event:"创建节点成功",
                type:"添加节点",
                status:"成功",
                object:"admin"
            },
            {
                time:"2019/07/15 10:16:33 GMT+08:00",
                event:"创建节点失败",
                type:"安装用户节点kubemetes软件",
                status:"失败",
                object:"adminsutra"
            }],
        }
    },
    mounted(){},
    methods:{
        //关闭按钮
        closeComponent() {
            this.$emit('close');//出发close自定义消息
        },
        //tab标签点击事件
        handleClick(item){
            this.activeIndex = item;
        },
        //刷新按钮
        handleIconClick(){

        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.details_right_box{
    position: absolute;
    top: 80px;
    right:0px;
    z-index: 1;
    width: 85%;
    height: calc(100% - 48px - 32px);
    background-color: #FFFFFF;
    box-shadow:-2px 2px 5px  rgba(0, 0, 0, 0.2);
    border-left: 1px solid #dae0e6;
    overflow: hidden;//继承父元素样式
    padding: 0px $space-32px;
}
.tooltip{
    position: relative;
    width: 100%;
    overflow-y:auto;
}
.icon-button{
    // margin:0px 20px;
    color:$menuText;
}
.title-box{
    background-color:$color-gray-1;
    margin:0px -32px;
    height:49px;
    line-height:49px;
}
//下拉框mini
.select-mini {
  width: 120px;
  font-size: $font-size-base;
  color: $color-text-regular;
  font-family: $select-fontfamily;
}
.tab-ul{
    display: inline-block;
    // width:calc(100% - 200px);
    height:44px;
    list-style: none;
    margin:0px 10px;
    padding:0px;
}
.tab-ul li{
    display: inline-block;
    width:80px;
    margin:0px 10px 2px 10px;
    padding:0px;
    text-align: center;
}
.tab-ul li:hover{
    border-bottom: 2px solid $color-primary;
    color: $color-primary;
}
.tab-li-actived{
    border-bottom: 2px solid $color-primary;
    color: $color-primary;
}
.content-box{
    position: relative;
    float: left;
    width: 50%;
    height: 100%;
    padding-right:$space-32px;
}
.box-card{
    width: 100%;
    display: inline-block;
    padding-top:$space-24px;
}
.secend-title-box{
    width: 100%;
    height: 80px;
    display: inline-block;
}
.box-icon{
    font-size: 25px;
    padding: $space-8px;
}
.box-title{
    font-size: 18px;
    color: $color-font;
}
.box-card .divider{
    display: block;
    width: 100%;
    height: 1px;
    background-color: #dae0e6;
    margin: 10px 0px;
}
.left-font{
    font-size: 14px;
    color: $color-black;
    width: 120px;
    display: inline-block;
}
.right-font{
    font-size: 14px;
    color: $color-font;
}
.line{
    line-height: 40px;
    height: 40px;
    padding-left:$space-8px;
}
.mini-table{
    position: relative;
    display: inline-block;
    width: 100%;
}
.right-table{
    width: calc(100% - 120px);
    height: 100%;
    display: inline-block;
    border-bottom: 1px solid #dae0e6;
}
table th{
    width: 160px;
    text-align: left;
    color: $color-black;
    font-weight: 500;
    padding-left: $space-8px;
}
table td{
    line-height: 25px;
    padding-left: $space-8px;
}
.picker-small{
    width: 180px;
}
.tool-box{
    height: 60px;
}
.tooltip .input-normal {
  width: 180px;
  font-size: $color-text-secondary;
  color: $color-text-secondary;
  font-family: $input-fontfamily;
}
.full_table{
  width: 100%;
  height: calc(100% - 150px);
}

</style>
