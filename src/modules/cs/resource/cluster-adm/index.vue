<template>
  <div class="cluster-adm-container">
      <div class="action-bar">
          <div class="left">
              <el-button type="primary" icon="el-icon-plus" @click="handleCreateCluster">创建集群</el-button>
              <el-button icon="el-icon-delete">删除集群</el-button>
              <el-button>操作记录</el-button>
          </div>
          <div class="right">
              <el-select style="margin-right:10px;" filterable v-model="ResourceValue" placeholder="请选择">
                  <el-option
                  v-for="item in ResourceOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>

              <el-select style="margin-right:10px;" filterable v-model="ResourceValue" placeholder="请选择">
                  <el-option
                  v-for="item in ResourceOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>

              <el-input style="margin-right:10px;width:180px;" v-model="ClusterName" placeholder="请输入集群名称">
                  <i class="el-icon-search el-input__icon" @click="handleIconClick"></i>
              </el-input>
              <i  class="el-icon-refresh-right"></i>
          </div>
      </div>

      <!-- 正文表格 -->
      <el-table class="table" ref="multipleTable"
              :data="tableData2"
              highlight-current-row
              height="calc(100% - 80px)"
              @current-change="handleCurrentChange"
              tooltip-effect="dark" style="width: 100%;min-height: 50px"
              @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50px"></el-table-column>
          <el-table-column  label="集群名称" show-overflow-tooltip>
          <template slot-scope="scope">
              <span class="font-color" @click="OpenDetail('detail',scope.row)">{{ scope.row.name }}</span>
              <!-- <div class="cover"></div> -->
          </template>
          </el-table-column>
          <el-table-column label="集群状态" show-overflow-tooltip>
          <template slot-scope="scope">
              <i :class="{'el-icon-circle-check':scope.row.status === '正常','el-icon-circle-close':scope.row.status === '失败'}"></i>
              {{ scope.row.status }}
          </template>
          </el-table-column>
          <el-table-column prop="provider" label="云服务商" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="地域" show-overflow-tooltip></el-table-column>
          <el-table-column prop="versions" label="集群版本" show-overflow-tooltip></el-table-column>
          <el-table-column prop="dockerVersions" label="Docker版本" show-overflow-tooltip></el-table-column>
          <el-table-column prop="date" label="创建时间" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination class="pagination"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="page_size"
                  layout="prev, pager, next, jumper"
                  :total="total_page">
      </el-pagination>

      <!-- <template v-if="showSidePage">
          <detail-layout @close="closeSidePage"></detail-layout>
      </template> -->
      <component :is="currentComponent" @close="closeComponent" :clusterItem="clusterItem" v-if="componentTag"></component>
  </div>
</template>
<script>
import { mapActions , mapState} from "vuex";
import detail from './details'
import TableContentLayout from "@/views/table-content-layout/index";

export default {
  name: 'Cluster',
  components:{
    detail,
    TableContentLayout
  },
  data() {
    return {
      ResourceOptions: [
        { value: '阿里云', label: '阿里云' },
        { value: '华为云', label: '华为云' },
        { value: '时速云', label: '时速云' }
      ],
      ResourceValue: '',//下拉框值
      ClusterName: '',//输入框集群名称
      tableData2: [
        {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-02 10:00:00',
          name: 'msp-cce-test1',
          status: '正常',
          provider:'阿里云',
          address:'杭州1区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-04 10:00:00',
          name: 'msp-cce-test2',
          status: '正常',
          provider:'阿里云',
          address:'杭州4区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-05 10:00:00',
          name: 'msp-cce-test3',
          status: '正常',
          provider:'阿里云',
          address:'杭州6区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test4',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test5',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test6',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test7',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test8',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test9',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        },, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test9',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test9',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test9',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test9',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        },, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test9',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test9',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test9',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test9',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test9',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test9',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }, {
          ID:"54sd54dd5f554fwsf451s-115sf-dd4dsd1d",
          date: '2016-05-06 10:00:00',
          name: 'msp-cce-test10',
          status: '失败',
          provider:'华为云',
          address:'杭州3区',
          versions:'v1.11.7r0',
          dockerVersions:'173.06.1.26',
        }
        ],
        multipleSelection: [],//存放表格选中数据
        currentPage:5,//当前页
        page_size:15,//每页显示条数
        total_page:400,//总条数
        currentComponent:"detail",//详情框组件
        componentTag:false,//是否显示组件
        tableHeight:"",//表格自适应高度
        clusterItem:{}//获取点击集群信息
    }
  },
  mounted() {
    // this.getVPCList();
  },
  computed:{
    ...mapState({
        VPCList: state => state['cluster'].VPCList,
      }),
  },
  methods: {
    ...mapActions({
      getVPCList: "cluster/getVPCList",
    }),
    //输入框搜索按钮点击事件
      handleIconClick(ev) {
        console.log(ev);
      },
      //获取勾选数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log("gouxuan",this.multipleSelection);
      },
      //分页跳转
      handleCurrentChange(val) {
      },
      //创建集群
      handleCreateCluster(){
        this.$router.push({ name: 'CreateCluster',params: { regionId:'cn-zhangjiakou'}})
      },
      //关闭子页面
      closeComponent(){
        this.componentTag = false;
      },
      //打开子页面
      OpenDetail(componentName,item){
        this.componentTag = true;
        this.currentComponent = componentName;
        this.clusterItem = item;
        console.log("clusterItem",this.clusterItem);
      },

    },

}
</script>
<style lang="scss" scoped>
    @import "~@/styles/variables.scss";

    .cluster-adm-container {
        padding: $space-32px;
        position: relative;
        height: 100%;
        width: 100%;

        .action-bar {
            display: flex;
            width: 100%;
            justify-content: space-between;
            height: $space-32px;
        }

        .table {
            width: 100%;
            margin-top: $space-16px;
        }

        .pagination {
            height: $space-32px;
            text-align: center;
        }

        .sidepage {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 90%; //calc(100% - 144px)
            height: calc(100% - #{$normal-component-height} - #{$space-16px}); //-actionBar高度32px-间距16px
            z-index: $z-level-side-page;
            background-color: $color-background;
            padding-top: $side-bar-sub-menu-height;

            .window-header {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: $side-bar-sub-menu-height;
                background: $color-dark-background;
            }

            .content {
                width: 100%;
                height: 100%;
                overflow: auto;
                padding-left: $page-padding;
            }

            &:after {
                height: 100%;
                top: 0;
                border-right: 1px solid $color-border;
                content: " ";
                position: absolute;
                left: -6px;
                width: 6px;
                background: linear-gradient(270deg, rgba(197, 219, 232, .4), rgba(211, 220, 227, 0));
            }
        }
    }


</style>
