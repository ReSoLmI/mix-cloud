<template>
<create-sth-layout>
        <form-layout title="创建集群" @close="$router.push({name:'Cluster'});">
          <template v-slot:settings> 
              <el-button type="text" icon="el-icon-edit" class="settings">修改配置</el-button>
          </template>
            <template v-slot:form>
              <el-form label-position="left" ref="form" :model="form" label-width="120px" size="medium">
                <el-form-item label="集群名称">
                  <el-input class="input-normal" v-model="form.ClusterName"></el-input>
                  <span class="tip-font">名称为1-63个字符，可包含数字、汉字、英文字符，或"-"</span>
                </el-form-item>
                <el-form-item label="云服务商" >
                  <el-select class="select-normal"  v-model="form.ResourceValue" placeholder="请选择">
                    <el-option
                      v-for="item in ResourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <span class="tip-font">未检测到可用accesskey，请点击<a>添加accesskey</a></span>
                </el-form-item>
                <el-form-item label="地域">
                  <el-select  class="select-normal" v-model="form.RegionsValue" placeholder="请选择" @change="refresh()">
                    <el-option
                      v-for="item in RegionsOptions"
                      :key="item.regionId"
                      :label="item.localName"
                      :value="item.regionId">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="VPC">
                  <el-row>
                    <el-col>
                      <el-select  class="select-normal" :disabled="VPCTag"  v-model="form.VPCValue" placeholder="请选择">
                        <el-option
                          v-for="item in VPCOptions"
                          :key="item.vpcId"
                          :label="item.vpcName"
                          :value="item.vpcId">
                        </el-option>
                      </el-select>
                      <i class="el-icon-refresh-right" @click="getVPC()"></i>
                    </el-col>
                    <el-col>
                      <el-button type="text" icon="el-icon-plus" @click="OpenRightBox('VPCComponent')">创建VPC</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="子网">
                  <el-row>
                    <el-col>
                      <el-table ref="multipleTable" :data="subnetTable" tooltip-effect="dark" style="width: 1100px;cursor:pointer;" @current-change="handleSubnet">
                        <el-table-column show-overflow-tooltip>
                          <template slot="header" slot-scope="scope">
                              <i class="el-icon-refresh-right" style="margin-left:0px;" @click="getSubnet()"></i>名称
                          </template>
                          <template slot-scope="scope">
                              <el-checkbox v-model="scope.row.checked" :label="scope.row.vswitchName" ></el-checkbox>
                          </template>
                        </el-table-column>
                        <el-table-column prop="vswitchId" label="ID" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="zoneId" label="可用区" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="cidrBlock" label="CIDR" show-overflow-tooltip></el-table-column>
                      </el-table>
                    </el-col>
                    <el-col>
                      <el-button type="text" icon="el-icon-plus" :disabled="!isVPCChecked" @click="OpenRightBox('SubNetComponent')">创建子网</el-button>
                      <span class="tip-font">选择 1-3 个子网。为保证集群高可用，建议选择不同可用区的子网</span>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="模板创建">
                  <el-radio-group v-model="form.radio7">
                    <el-radio-button label="是"></el-radio-button>
                    <el-radio-button label="否"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="负载均衡SLB">
                  <el-input class="input-normal" disabled v-model="form.SLB"></el-input>
                  <span class="tip-font">该规格最大支持连接数：5000，新建链接数（cps）：3000，每秒查询数（qps）：1000</span>
                </el-form-item>
                <el-form-item label="弹性IP">
                  <el-row>
                    <el-col>
                      <el-checkbox v-model="form.IPchecked" disabled>创建默认弹性IP</el-checkbox>
                      <div style="display:inline-block;margin:0px 20px;">带宽</div>
                      <el-input class="input-small" value="53Mbps" :disabled="true"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="安全组">
                  <span class="">所选安全组：控制面板安全组（默认开放端口）</span>
                  <i class="el-icon-question"></i>
                </el-form-item>
                <el-form-item label="节点计费模式">
                  <el-row>
                    <el-radio-group v-model="form.radio1">
                      <el-radio-button label="按量付费"></el-radio-button>
                      <el-radio-button label="包年包月"></el-radio-button>
                    </el-radio-group>
                  </el-row>
                  <el-row v-if="form.radio1 == '包年包月'" >
                    <el-col style="margin:20px 0px;">
                      <span class="span-normal" style="margin-right:10px;">购买时长</span>
                      <el-select class="select-mini" v-model="form.purchaseTimeValue" placeholder="请选择">
                        <el-option
                          v-for="item in purchaseTimeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col style="margin-bottom:20px;">
                      <span class="span-normal" style="margin-right:10px;">自动续费</span>
                      <el-checkbox v-model="form.renewalsChecked" style="margin-right:10px;">开启</el-checkbox>
                      <el-select class="select-mini" v-model="form.renewalsValue" placeholder="请选择">
                        <el-option
                          v-for="item in purchaseTimeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="镜像">
                  <el-row>
                    <el-radio-group v-model="form.radio2" @change="getImages()">
                      <el-radio-button label="公共镜像"></el-radio-button>
                      <el-radio-button label="自定义镜像"></el-radio-button>
                    </el-radio-group>
                  </el-row>
                  <el-row style="margin:20px 0px;">
                    <el-col >
                      <el-select  class="select-small" v-model="form.OS" @change="getImages()" placeholder="请选择操作系统" >
                      <el-option
                        v-for="item in OSOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-select class="select-medium" style="margin-left:10px;" v-model="form.OSVersion" @change="getImages()" placeholder="请选择操作系统版本" >
                      <el-option
                        v-for="item in OSVersionOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    </el-col>
                  </el-row>
                  <el-row style="margin:20px 0px;" >
                    <el-col >
                      <el-select class="select-normal" :disabled="imageTag"  v-model="form.ImageValue" placeholder="请选择镜像">
                        <el-option
                          v-for="item in ImagesOptions"
                          :key="item.imageId"
                          :label="item.osName"
                          :value="item.imageId">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-form-item>
                <!-- 分割线 -->
                <el-divider></el-divider>
                <el-form-item label="集群高可用部署">
                  <el-radio-group v-model="form.radio3">
                    <el-radio-button label="是"></el-radio-button>
                    <el-radio-button label="否"></el-radio-button>
                  </el-radio-group>
                  <span class="tip-font">可用节点数3，集群创建完成后，高可用模式及普通模式之间不可变更，请按实际使用场景选择</span>
                </el-form-item>
                <el-form-item label="集群管理规模">
                  <el-row style="margin-bottom:20px;">
                    <el-col>
                      <el-radio-group v-model="form.radio4">
                        <el-radio-button label="<=50"></el-radio-button>
                        <el-radio-button label="<=100"></el-radio-button>
                        <el-radio-button label="<=500"></el-radio-button>
                        <el-radio-button label="<=1000"></el-radio-button>
                        <el-radio-button label="自定义"></el-radio-button>
                      </el-radio-group>
                    </el-col>
                  </el-row>
                  <el-row style="margin-bottom:20px;">
                    <el-col>
                      <span class="span-normal" style="margin-right:10px;">vCPU</span>
                      <el-select style="margin-right:10px;" class="select-small" v-model="form.clustervCPUValue"  placeholder="请选择">
                        <el-option
                          v-for="item in clustervCPUOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <span class="span-normal" style="margin-right:10px;">内存</span>
                      <el-select style="margin-right:10px;" class="select-small" v-model="form.clusterMemoryValue"  placeholder="请选择">
                        <el-option
                          v-for="item in clusterMemoryOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <span class="span-normal" style="margin-right:10px;">带宽</span>
                      <el-input class="input-small" value="5Mbps" :disabled="true"></el-input>
                    </el-col>
                  </el-row>
                  <el-row style="margin-bottom:20px;">
                    <el-col>
                      <span class="span-normal" style="margin-right:10px;">系统盘</span>
                      <el-select style="margin-right:10px;" class="select-small" v-model="form.clusterSysDiskTypeValue"  placeholder="请选择">
                        <el-option
                          v-for="item in clusterSysDiskTypeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <el-select style="margin-right:10px;" class="select-small" v-model="form.clusterSysDiskValue"  placeholder="请选择">
                        <el-option
                          v-for="item in clusterSysDiskOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <span class="span-normal" style="margin-right:10px;">数据盘</span>
                      <el-select style="margin-right:10px;" class="select-small" v-model="form.clusterDataDiskTypeValue"  placeholder="请选择">
                        <el-option
                          v-for="item in clusterDataDiskTypeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <el-select class="select-small" v-model="form.clusterDataDiskValue"  placeholder="请选择">
                        <el-option
                          v-for="item in clusterDataDiskOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-form-item>
                <!-- 分割线 -->
                <el-divider></el-divider>
                <el-form-item label="节点类型">
                  <el-row>
                    <el-radio-group v-model="form.radio5">
                      <el-radio-button label="新增节点"></el-radio-button>
                      <el-radio-button label="添加已有节点"></el-radio-button>
                    </el-radio-group>
                  </el-row>
                  <el-row v-if="form.radio5 == '添加已有节点'" style="margin-top:20px;">
                    <el-col>
                      <span class="span-normal" style="margin-right:10px;">实例ID</span>
                      <el-select  class="select-mini" style="margin-right:10px;" v-model="form.instanceIDValue" placeholder="请选择">
                        <el-option
                          v-for="item in instanceIDOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <el-input class="input-medium" v-model="form.instanceID" placeholder="请输入实例ID进行精确查询">
                        <i class="el-icon-search el-input__icon" slot="suffix" @click=""></i>
                      </el-input>
                    </el-col>
                  </el-row>
                  <el-row v-if="form.radio5 == '添加已有节点'" style="margin:20px 0px;">
                    <el-table ref="multipleTable" :data="Table" tooltip-effect="dark" style="width: 1100px">
                      <el-table-column show-overflow-tooltip>
                        <template slot="header" slot-scope="scope">
                            <i class="el-icon-refresh-right" style="margin-left:0px;"></i>实例ID
                        </template>
                        <template slot-scope="scope">
                            <el-checkbox :label="scope.row.name" ></el-checkbox>
                        </template>
                      </el-table-column>
                      <el-table-column prop="ID" label="实例名称" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="area" label="IP地址（ID）" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="CIDR" label="可用区" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="CIDR" label="网络类型" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="CIDR" label="实例规格" show-overflow-tooltip></el-table-column>
                    </el-table>
                  </el-row>
                </el-form-item>
                <el-form-item label="实例规格" v-if="form.radio5 == '新增节点'">
                  <el-row style="margin-bottom:20px;">
                    <el-col>
                      <el-select  class="select-normal"  v-model="form.ECSTypeValue" placeholder="请选择">
                        <el-option
                          v-for="item in ECSTypeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <i class="el-icon-refresh-right"></i>
                    </el-col>
                  </el-row>
                  <el-row style="margin-bottom:20px;">
                    <el-col>
                      <span class="span-normal" style="margin-right:10px;">vCPU</span>
                      <el-select style="margin-right:10px;" class="select-small" v-model="form.instanceSpecificationvCPUValue"  placeholder="请选择">
                        <el-option
                          v-for="item in instanceSpecificationvCPUOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <span class="span-normal" style="margin-right:10px;">内存</span>
                      <el-select style="margin-right:10px;" class="select-small" v-model="form.instanceSpecificationMemoryValue"  placeholder="请选择">
                        <el-option
                          v-for="item in instanceSpecificationMemoryOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="数量" v-if="form.radio5 == '新增节点'">
                  <el-input-number class="input-number-normal" v-model="form.NodeNumber" controls-position="right" :min="1" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label="系统盘" v-if="form.radio5 == '新增节点'">
                  <el-row>
                    <el-col>
                      <el-select style="margin-right:10px;" class="select-small" v-model="form.NodeSysDiskTypeValue"  placeholder="请选择">
                          <el-option
                            v-for="item in clusterSysDiskTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      <el-input-number class="input-number-medium" v-model="form.SysDiskNumber" controls-position="right" :min="1" :max="10"></el-input-number>
                      <!-- 单位 -->
                      <span class="span-normal" style="margin-left:10px;">GiB</span>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="数据盘" v-if="form.radio5 == '新增节点'">
                  <el-row style="margin-bottom:20px;">
                    <span class="">你已选择 1 块盘，还可以选择 9块盘</span>
                  </el-row>
                  <el-row style="margin-bottom:20px;">
                    <el-col>
                        <el-select style="margin-right:10px;" class="select-small" v-model="form.NodeSysDiskTypeValue"  placeholder="请选择">
                          <el-option
                            v-for="item in clusterSysDiskTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      <el-input-number class="input-number-medium" v-model="form.SysDiskNumber" controls-position="right" :min="1" :max="10"></el-input-number>
                      <!-- 单位 -->
                      <span class="span-normal" style="margin-left:10px;">GiB</span>
                    </el-col>
                  </el-row>
                  <el-row style="margin-bottom:20px;">
                    <el-col>
                      <el-button class="btn-plus" type="primary" icon="el-icon-plus"></el-button>
                      <span class="span-normal" style="margin-left:5px;">添加一块数据盘</span>
                    </el-col>
                  </el-row>
                </el-form-item>
                <!-- 分割线 -->
                <el-divider></el-divider>
                <el-form-item label="登录方式">
                  <el-row>
                    <el-radio-group v-model="form.radio6">
                      <el-radio-button label="密码"></el-radio-button>
                      <el-radio-button label="密钥对"></el-radio-button>
                    </el-radio-group>
                  </el-row>
                </el-form-item>
                <el-form-item label="用户名" v-if="form.radio6=='密码'">
                  <span class="span-normal">root</span>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="form.radio6=='密码'">
                  <el-input type="password" class="input-normal" placeholder="请输入密码" v-model="form.password" autocomplete="off"></el-input>
                  <span class="tip-font">8 - 30 个字符，且同时包含三项（大、小写字母，数字和特殊符号）</span>
                </el-form-item>
                <el-form-item label="确认密码"  prop="checkPassword" v-if="form.radio6=='密码'">
                  <el-input type="password" class="input-normal" placeholder="请再次输入密码" v-model="form.checkPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密钥对" v-if="form.radio6=='密钥对'">
                  <el-row>
                    <el-col>
                      <el-select  class="select-normal"   v-model="form.VPCValue" placeholder="请选择密钥对">
                        <el-option
                          v-for="item in VPCOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <i class="el-icon-refresh-right"></i>
                    </el-col>
                    <el-col>
                      <el-button type="text" icon="el-icon-plus" @click="OpenRightBox('KeyPairComponent')">添加密钥对</el-button>
                      <span class="tip-font">您可以访问 ECS 控制台</span>
                    </el-col>
                  </el-row>
                </el-form-item>
                <!-- 分割线 -->
                <el-divider></el-divider>
                <el-form-item label="网络插件">
                  <el-radio-group v-model="form.radio8">
                    <el-radio-button label="Flannal"></el-radio-button>
                    <el-radio-button label="Calico"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="容器网段" >
                  <el-row style="margin-bottom:20px;">
                    <el-col>
                        <el-select class="select-normal"   v-model="form.containerNetValue" placeholder="请选择">
                        <el-option
                          v-for="item in containerNetOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <span class="tip-font">请填写有效的私有网段，即以下网段及其子网：10.0.0.0/8，172.16-31.0.0/12-16，192.168.0.0/16 </span>
                    </el-col>
                  </el-row>
                  <el-row style="margin-bottom:20px;">
                    <el-col>
                      <el-select class="select-mini" v-model="form.containerNetHeadValue" placeholder="请选择">
                        <el-option
                          v-for="item in IPOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <span>﹐</span>
                      <el-input class="input-mini" v-model="form.containerNetMidValue"></el-input>
                      <span>﹐</span>
                      <el-input class="input-mini" :disabled="true" value="0"></el-input>
                      <span>﹐</span>
                      <el-input class="input-mini" :disabled="true" value="0"></el-input>
                      <span> / </span>
                      <el-select class="select-mini" v-model="form.containerNetEndValue" placeholder="请选择">
                        <el-option
                          v-for="item in IPOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <span class="tip-font">不能与 VPC 的网段重复，创建成功后不能修改</span>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="服务网段" >
                  <el-row style="margin-bottom:20px;">
                    <el-col>
                        <el-select class="select-normal"   v-model="form.serverNetValue" placeholder="请选择">
                        <el-option
                          v-for="item in serverNetOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <span class="tip-font">可选范围：10.0.0.0/16-24，172.16-31.0.0/16-24，192.168.0.0/16-24</span>
                    </el-col>
                  </el-row>
                  <el-row style="margin-bottom:20px;">
                    <el-col>
                      <el-select class="select-mini" v-model="form.serverNetHeadValue" placeholder="请选择">
                        <el-option
                          v-for="item in IPOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <span>﹐</span>
                      <el-input class="input-mini" v-model="form.serverNetMidValue"></el-input>
                      <span>﹐</span>
                      <el-input class="input-mini" :disabled="true" value="0"></el-input>
                      <span>﹐</span>
                      <el-input class="input-mini" :disabled="true" value="0"></el-input>
                      <span> / </span>
                      <el-select class="select-mini" v-model="form.serverNetEndValue" placeholder="请选择">
                        <el-option
                          v-for="item in IPOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <span class="tip-font">不能与 VPC 及 VPC 内已有 Kubernetes 集群使用的网段重复，创建成功后不能修改</span>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form>
            </template>
        </form-layout>
        <template v-slot:aside v-if="componentTag">
            <component :is="currentComponent" @close="closeComponent" is-side v-bind="componentData"></component>
            <!--<create-routing-rule ></create-routing-rule>-->
        </template>
    </create-sth-layout>

</template>
<script>
import { mapActions , mapState} from "vuex";
import CreateSthLayout from '@/views/create-sth-layout'
import FormLayout from '@/views/create-sth-layout/form-layout'

import VPCComponent from './create-VPC';
import SubNetComponent from './create-SubNet';
import KeyPairComponent from './create-KeyPair';
export default {
  name: 'CreateCluster',
  components:{
    CreateSthLayout,
    FormLayout,
    VPCComponent,
    SubNetComponent,
    KeyPairComponent
  },
  data() {
    return {
      ResourceOptions: [
        { value: '阿里云', label: '阿里云' },
        { value: '华为云', label: '华为云' },
        { value: '时速云', label: '时速云' }
      ],//云服务商

      subnetTable:[],//子网表格

      VPCOptions:[],//vpc option
      OSOptions:[
        { value: 'linux', label: 'Linux' },
        { value: 'windows', label: 'Windows' }
      ],//镜像系统

      OSVersionOptions:[
        { value: 'i386', label: '32位' },
        { value: 'x86_64', label: '64位' }
      ],//镜像系统版本
      ImagesOptions:[],//镜像名option

      clustervCPUOptions:[
        { value: '0', label: '2' },
        { value: '1', label: '4' },
        { value: '2', label: '6' },
        { value: '3', label: '8' }
      ],//集群管理vCPU

      clusterMemoryOptions:[
        { value: '0', label: '2GiB' },
        { value: '1', label: '4GiB' },
        { value: '2', label: '16GiB' },
        { value: '3', label: '32GiB' }
      ],//集群管理内存

      clusterSysDiskTypeOptions:[
        { value: '0', label: '高效云盘' },
        { value: '1', label: '高效云盘4' },
        { value: '2', label: '高效云盘6' },
        { value: '3', label: '高效云盘8' }
      ],//集群管理系统硬盘类型

      clusterSysDiskOptions:[
        { value: '0', label: '20GiB' },
        { value: '1', label: '40GiB' },
        { value: '2', label: '160GiB' },
        { value: '3', label: '320GiB' }
      ],//集群管理系统硬盘大小

      clusterDataDiskTypeOptions:[
        { value: '0', label: '高效云盘' },
        { value: '1', label: '高效云盘4' },
        { value: '2', label: '高效云盘6' },
        { value: '3', label: '高效云盘8' }
      ],//集群管理数据硬盘类型

      clusterDataDiskOptions:[
        { value: '0', label: '20GiB' },
        { value: '1', label: '40GiB' },
        { value: '2', label: '160GiB' },
        { value: '3', label: '320GiB' }
      ],//集群管理数据硬盘大小

      ECSTypeOptions:[
        { value: '0', label: '4核8G（ecs.hfc5.xlarge） 5Mbps' },
        { value: '1', label: '4核16G（ecs.hfc5.xlarge） 5Mbps' },
        { value: '2', label: '4核32G（ecs.hfc5.xlarge） 5Mbps' },
      ],//实例规格

       instanceSpecificationvCPUOptions:[
        { value: '0', label: '2' },
        { value: '1', label: '4' },
        { value: '2', label: '6' },
        { value: '3', label: '8' }
      ],//实例规格vCPU

      instanceSpecificationMemoryOptions:[
        { value: '0', label: '2GiB' },
        { value: '1', label: '4GiB' },
        { value: '2', label: '16GiB' },
        { value: '3', label: '32GiB' }
      ],//实例规格内存

      containerNetOptions:[],//容器网段
      IPOptions:[
        { value: '0', label: '10' },
        { value: '1', label: '172' },
        { value: '2', label: '196' },
      ],//内网IP选项

      serverNetOptions:[],//服务网段选项
      purchaseTimeOptions:[
        { value: '0', label: '1年' },
        { value: '1', label: '2年' },
      ],//包年包月选项

      instanceIDOptions:[
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' }
      ],//实例ID个数
      form:{
        ClusterName:"",//创建集群名称
        ResourceValue:"阿里云",//云服务商选值
        RegionsValue:"",//地域选值
        VPCValue:"",//地域选值
        SLB:"简约型I（slb.s1.small）",//SLB
        IPchecked:true,//弹性IP
        radio1:"按量付费",//节点计费模式
        purchaseTimeValue:"0",//购买时长
        renewalsChecked:true,//是否自动续费
        renewalsValue:"0",// 自动续费时长
        radio2:"公共镜像",//公共镜像
        ImageValue:"",//用户选择的镜像值
        OS:"",//操作系统
        OSVersion:"",//os版本
        radio3:"是",//集群高可用部署
        radio4:"<=50",//集群管理规模
        clustervCPUValue:"0",//vCPU
        clusterMemoryValue:"0",//内存
        clusterSysDiskTypeValue:"0",//系统盘类型
        clusterSysDiskValue:"0",//系统盘大小
        clusterDataDiskTypeValue:"0",//数据盘类型
        clusterDataDiskValue:"0",//数据盘大小
        radio5:"新增节点",//节点类型
        instanceIDValue:1,//实例ID个数
        instanceID:"",//查找的实例ID
        radio6:"密码",//登陆方式
        radio7:"是",//模板创建
        ECSTypeValue:"0",//实例规格
        instanceSpecificationvCPUValue:"0",//实例规格vCPU
        instanceSpecificationMemoryValue:"0",//实例规格内存
        NodeSysDiskTypeValue:"0",//节点系统盘类型（option与集群管理中option相同）
        NodeNumber:0,//节点数量
        SysDiskNumber:0,//节点系统盘数量
        password:"",//登录方式密码
        checkPassword:"",//登陆方式确认密码
        containerNetValue:"",//容器网段
        containerNetHeadValue:"1",//容器网段ip第一个值
        containerNetMidValue:"0",//容器网段ip第二个值
        containerNetEndValue:"0",//容器网段ip结尾
        serverNetValue:"",//服务网段
        serverNetHeadValue:"1",//服务网段ip第一个值
        serverNetMidValue:"0",//服务网段ip第二个值
        serverNetEndValue:"0",//服务网段ip结尾
        radio8:"Flannal",//网络插件
      },//表单数据
      currentComponent:"",//动态组件
      componentTag:false,//是否显示组件
      reqCancelHandles:[],//网络请求句柄
      VPCTag:true,//VPC是否可选
      imageTag:true,//是否显示镜像下拉框
      isVPCChecked:false,//是否已选择VPC
      componentData:{},//动态组件参数对象
    }
  },
  mounted() {
    const _this = this;
    //获取地域
    this.getRegionsOptions({cancelHandle:_this.reqCancelHandles})
    //获取初始地域值
    this.form.RegionsValue = this.$route.params.regionId;
    //获取VPC
    this.getVPC();
    //获取子网列表
    this.getSubnet();
  },
  watch:{
    'form.VPCValue':function(){
      this.isVPCChecked = true;//当选择了vpc时，触发创建子网按钮可用
    },
  },
  computed:{
    ...mapState({
        RegionsOptions: state => state['cluster'].regionsList,//地域
        // VPCOptions: state => state['cluster'].VPCList,//VPC
        // ImagesOptions: state => state['cluster'].availableImages,//公共镜像
      }),
  },
  methods: {
    ...mapActions({
      getVPCList: "cluster/getVPCList",
      getRegionsOptions: "cluster/getRegionsList",
      getAvailabelImagesOptions: "cluster/getAvailabelImagesList",
      getvSwitchTable: "cluster/getvSwitchList",
      getECSTypeList: "cluster/getECSTypeList",
      
    }),
    //关闭子页面
    closeComponent(){
      this.componentTag = false;
    },
    //获取勾选数据
    handleSubnet(row) {
      // row.checked = true;//点击单行勾选
      let count = 0;
      this.subnetTable.forEach(item => {
          // 排他,每次选择时把其他选项都清除
          // if (item.vswitchId !== row.vswitchId) {
          //   item.checked = false
          // }
          if(count < 3){
            if(item.checked){
              count++
            }
          }else{
            console.log("已超出选值");
            row.checked = false;
          }
          
        })
    },
    //打开创建子页面
    OpenRightBox(componentName){
      this.componentTag = true;
      this.currentComponent = componentName;
      //创建子网需要的VPC参数
      if(this.currentComponent == 'SubNetComponent'){
        this.componentData = {VPCId:this.form.VPCValue};
      }
    },
    //地域更改
    refresh(){
      let regionId = this.form.RegionsValue;
      //刷新页面，更新参数
      this.$router.push({ name: 'CreateCluster', params: { regionId }})
    },
    //获取VPC列表
    getVPC(){
      if(this.form.RegionsValue != ""){
        const _this = this;
        _this.getVPCList({regionId:_this.form.RegionsValue,callback:(data) => {
          if(data.length != 0){
            _this.VPCTag = false;
            _this.VPCOptions = data;//设置option
          }else{
            _this.VPCTag = true;
            _this.form.VPCValue = "";//重置VPC
          }
        },cancelHandle:_this.reqCancelHandles})
      }
    },
    //获取子网列表
    getSubnet(){
      if(this.form.RegionsValue != ""){
        const _this = this;
        _this.getvSwitchTable({regionId:_this.form.RegionsValue,callback:(data) => {
          data.forEach(item => {
            item.checked = false
          });//获取表格数据并添加选中属性
          _this.subnetTable = data;
        },cancelHandle:_this.reqCancelHandles})
      }
    },
    //镜像选择
    getImages(){
      console.log("images",this.form.radio2);
      const _this = this;
      if(this.form.OS && this.form.OSVersion){
        let owner = "";
        if(this.form.radio2 == '公共镜像' ){
          owner = 'system'
        }else{
          owner = 'self'
        }
        _this.getAvailabelImagesOptions({regionId:_this.form.RegionsValue,imageOwnerAlias:owner,osType:_this.form.OS,architecture:_this.form.OSVersion,callback:(data) => {
          if(data.length != 0){
            _this.imageTag = false;//可选
            _this.ImagesOptions = data;//设置option
          }else{
            _this.imageTag = true;//不可选
            _this.form.ImageValue = "";//重置镜像值
          }
          },cancelHandle:_this.reqCancelHandles})
      }
    },
    //获取实例规格
    getECSType(){
      const _this = this;
      _this.getECSTypeList({regionId:_this.form.RegionsValue,zoneId:_this.form.regionId,callback:(data) => {
          console.log("实例获取成功",data);
        },cancelHandle:_this.reqCancelHandles})
    },
  },  
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";

//按钮添加样式
.btn-plus{
  padding: 5px;
}
//span标签字体样式
.span-normal{
  width: 50px;
  font-size:14px;
  line-height: 30px;
}
//修改配置样式
.settings{
  position:relative;
  float:right;
  margin:$space-8px $space-32px;
  color:$color-text-regular;
}
</style>
