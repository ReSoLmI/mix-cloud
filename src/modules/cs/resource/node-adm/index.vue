<template>
  <div class="node-container">
    <!-- 标题栏 -->
    <div class="action-bar">
        <!-- 工具栏 -->
       <div class="left">
            <el-button type="primary" icon="el-icon-plus" @click="handleCreateNode">创建节点</el-button>
            <el-button icon="el-icon-delete" @click="dialogFormVisible = true">删除节点</el-button>
            <el-button icon="el-icon-plus" @click="handleCreateLabel">添加标签</el-button>
        </div>
       <div class="right">
        <el-select style="margin-right:10px;" filterable v-model="ResourceValue" placeholder="请选择云服务商">
          <el-option
                  v-for="item in ResourceOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>

        <el-select style="margin-right:10px;" filterable v-model="districtValue" placeholder="请选择可用区">
          <el-option
                  v-for="item in districtOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>

        <el-select style="margin-right:10px;" filterable v-model="NodeValue" placeholder="请输入节点状态">
              <el-option
                      v-for="item in NodeStatus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
          </el-select>

        <el-input style="margin-right:10px;width:180px;" v-model="ClusterName" placeholder="请输入集群名称">
          <i class="el-icon-search el-input__icon" @click="handleIconClick"></i>
        </el-input>
          <el-input style="margin-right:10px;width:180px;" v-model="NodeName" placeholder="请输入节点名称">
              <i class="el-icon-search el-input__icon" @click="handleIconClick"></i>
          </el-input>
        <i  class="el-icon-refresh-right"></i>
      </div>
    </div>
      <!-- 正文表格 -->
    <el-table class="table" :data="tableData2"
              highlight-current-row
              height="calc(100% - 80px)"
              @current-change="handleNodeChange"
              tooltip-effect="dark" style="width: 100%;min-height: 50px"
              @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50px"></el-table-column>
        <el-table-column  label="节点名称" show-overflow-tooltip>
            <template slot-scope="scope">
                <el-link type="primary" class="font-color"
                         @click="dispatchOpenSidePage">{{ scope.row.name }}
                </el-link>
            </template>
        </el-table-column>
<!--        @click="OpenDetail('detail',scope.row)">{{ scope.row.name }}-->
        <el-table-column  label="节点状态" show-overflow-tooltip>
            <template slot-scope="scope">
            <i :class="{'el-icon-circle-check':scope.row.status === '成功','el-icon-circle-close':scope.row.status === '失败'}"></i>
            {{ scope.row.event }}
            </template>
        </el-table-column>
        <el-table-column prop="nodeId" label="节点ID" show-overflow-tooltip></el-table-column>
        <el-table-column prop="role" label="节点角色" show-overflow-tooltip></el-table-column>
        <el-table-column prop="versions"  label="规格" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dockerVersions"  label="可用区" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ipAddress"  label="IP地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="OS"  label="操作系统" show-overflow-tooltip></el-table-column>
        <el-table-column prop="date" label="创建时间" show-overflow-tooltip></el-table-column>
    </el-table>
      <el-pagination class="pagination"
                     @current-change="handleNodeChange"
                     :current-page="currentPage"
                     :page-size="page_size"
                     layout="prev, pager, next, jumper"
                     :total="total_page">
      </el-pagination>

    <el-dialog title="删除节点" :visible.sync="dialogFormVisible">
      <el-divider style="margin-top: 0px"></el-divider>
      <el-form label-position="left" class="form" ref="form" label-width="100px">

        <el-form-item label="云服务商" prop="name">
          <el-input class="select" :disabled="true" placeholder="Virtual-es1"></el-input>
        </el-form-item>
        <el-form-item label="地域" prop="name">
          <el-input class="select" :disabled="true" placeholder="Virtual-es1"></el-input>
        </el-form-item>
        <el-table  ref="multipleTable" :data="tableData2" tooltip-effect="dark" style="width: 80%;" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50px"></el-table-column>
          <el-table-column label="节点名称" show-overflow-tooltip >
            <template slot-scope="scope">
              <span class="font-color">{{ scope.row.name }}</span>
              <!-- <div class="cover"></div> -->
            </template>
          </el-table-column>
          <el-table-column label="节点状态"  show-overflow-tooltip >
            <template slot-scope="scope">
              <i :class="{'el-icon-circle-check':scope.row.status === '正常','el-icon-circle-close':scope.row.status === '失败'}"></i>
              {{ scope.row.status }}
            </template>
          </el-table-column>
          <el-table-column prop="nodeId" label="节点ID" show-overflow-tooltip></el-table-column>
          <el-table-column prop="dockerVersions" label="可用区" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cluster" label="集群" show-overflow-tooltip></el-table-column>

          <el-table-column prop="date" label="创建时间" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-form-item  class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">删 除</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


  </div>
</template>
<script>
  import NodeDetail from '../node-adm/node-detail'
  import SidePageStack from "@/views/side-page-stack/index";
  export default {
    name: 'Node',
    components:{
        NodeDetail,
        SidePageStack
    },
    data() {
      return {
        activeName: 'first',
        ResourceOptions: [
          { value: '阿里云', label: '阿里云' },
          { value: '华为云', label: '华为云' },
          { value: '时速云', label: '时速云' }
        ],
        districtOptions: [
          { value: '杭州1区', label: '杭州1区' },
          { value: '华东2区', label: '华东2区' },
          { value: '华南6区', label: '华南6区' }
        ],
        ResourceValue: '',//下拉框值
        districtValue:'',
        ClusterName: '',//输入框集群名称
        NodeName:'',
        NodeValue:'',
        NodeStatus:[
          { value: '正常', label: '正常' },
          { value: '异常', label: '异常' }
        ],
        tableData2: [
          {
          date: '2019/05/02 10:15:32 GMT+08:00',
          name: 'msp-cce-test2',
          status: '正常',
          nodeId:'192.168.10.2',
          role:'domain',
          provider:'华为云',
          versions:'4核 8G',
          dockerVersions:'杭州1区',
          ipAddress:'173.06.1.26',
          OS:'Windows',
            cluster:'msp-cce',
          label:'集群节点'
        },
          {
          date: '2017-05-02 10:00:00 GMT+08:00',
          name: 'msp-test2',
          status: '正常',
          nodeId:'192.168.100.35',
          role:'user',
          provider:'华为云',
          versions:'4核 16G',
          dockerVersions:'华东2区',
          ipAddress:'173.06.1.26',
          OS:'Windows',
            cluster:'msp-cce',
          label:'集群节点'
        },
          {
          date: '2016-07-02 10:00:00 GMT+08:00',
          name: 'app02',
          status: '正常',
          nodeId:'192.168.2.1',
          role:'user',
          provider:'华为云',
          address:'admin',
          versions:'4核 8G',
          dockerVersions:'华南6区',
          ipAddress:'73.106.10.26',
          OS:'Linux',
            cluster:'msp-cce',
          label:'集群节点'
        },
          {
          date: '2016-05-03 10:00:00 GMT+08:00',
          name: 'test02',
          status: '正常',
          nodeId:'192.168.10.6',
          role:'Master',
          provider:'阿里云',
          versions:'4核 16G',
          dockerVersions:'杭州1区',
          ipAddress:'173.206.120.16',
          OS:'Windows',
            cluster:'msp-cce',
          label:'集群节点'
        },
          {
            date: '2016-05-03 10:00:00 GMT+08:00',
            name: 'test02',
            status: '正常',
            nodeId:'192.168.10.6',
            role:'Master',
            provider:'腾讯云',
            versions:'4核 8G',
            dockerVersions:'杭州1区',
            ipAddress:'173.206.120.16',
            OS:'Linux',
            cluster:'msp-cce',
            label:'集群节点'
          },
          {
            date: '2016-05-03 10:00:00 GMT+08:00',
            name: 'test02',
            status: '正常',
            nodeId:'192.168.10.6',
            role:'Master',
            provider:'华为云',
            versions:'4核 8G',
            dockerVersions:'杭州1区',
            ipAddress:'173.206.120.16',
            OS:'Windows',
            cluster:'msp-cce',
            label:'集群节点'
          },
          {
            date: '2016-05-03 10:00:00 GMT+08:00',
            name: 'test02',
            status: '正常',
            nodeId:'192.168.10.6',
            role:'Master',
            provider:'阿里云',
            versions:'4核 32G',
            dockerVersions:'杭州1区',
            ipAddress:'173.206.120.16',
            OS:'Linux',
            cluster:'msp-cce',
            label:'集群节点'
          }
        ],
        multipleSelection: [],//存放表格选中数据
        currentPage:1,//当前页
        page_size:10,//每页显示条数
        total_page:11,//总条数
        nodeDetailComponent:"detail",
        componentTag:false,
        nodeItem:{},//获取点击集群信息
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      //输入框搜索按钮点击事件
      handleIconClick(ev) {
        console.log(ev);
      },
      //获取勾选数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //分页跳转
      handleNodeChange(val) {
      },
      //创建集群
      handleCreateNode(){
        this.$router.push({ name: 'CreateNode'})
      },
      handleCreateLabel(){
        this.$router.push({ name: 'CreateLabel'})
      },
      dispatchOpenSidePage(){
        this.$emit('openSidePage',this.$options.components.NodeDetail, {}, true)
      },

      //打开子页面
      OpenDetail(componentName,item){

        this.componentTag = true;
        this.nodeDetailComponent = componentName;
        this.nodeItem = item;
        console.log("nodeItem",this.nodeItem);
        // console.log("clusterItem",this.nodeItem);
      },
      //关闭子页面
      closeComponent(){
        this.componentTag = false;
      },
    },
    mounted() {},
  }
</script>
<style lang="scss" scoped>
  @import "~@/styles/variables.scss";
  .node-container {
      width: 100%;
      height: 100%;
      padding: $padding-size;
      position: relative;
  }
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





  .list{
    background-color:#99a9bf;
  }
.detail{
  position: absolute;
  top:125px;
  left: 521px;
  width: 1399px;
  height: 851px;
  background-color: #FEFEFF;
}
  .detail-title{
    width: 1399px;
    height: 50px;
    background-color:#F0F2F5;
  }

  .title-font {
    color: $title-color;
    font-size: $title-size;
    line-height: $title-lineheight;
    font-family: $title-fontfamily;
    font-weight: $titlt-fontweight;

  }
  .tooltip {
    position: relative;
    top: 14px;
  }
  .tooltip .el-col  {
    margin-bottom: 30px;
  }
  .tooltip .el-button + .el-button {
    margin-left: 20px;
  }
  //修改了原属组件下拉框样式
  .tooltip .select-normal {
    width: 110px;
    height: 36px;
    font-size: $select-fontsize;
    color: $select-fontcolor;
    font-family: $select-fontfamily;
  }
  .node-normal {
    width: 160px;
    height: 36px;
    font-size: $select-fontsize;
    color: $select-fontcolor;
    font-family: $select-fontfamily;
  }
  //修改了原属组件输入框样式
  .tooltip .input-normal {
    width: 180px;
    height: 36px;
    font-size: $input-fontsize;
    color: $input-fontcolor;
    font-family: $input-fontfamily;
  }
  .tooltip .el-icon-refresh-right{
    font-size:18px;
    margin:10px 0px;
  }
  // 设置主题字体颜色
  .font-color{
    color:$color-primary;
  }
  .dialog{
    width: 500px;
    height: 500px;
    background-color: red;
  }

  .select{
    width: 350px;
  }
  .form{
    width: 900px;
    height: 600px;
  }
  .dialog-footer{
    margin-left: 600px;
    margin-top: 40px;
  }
</style>

