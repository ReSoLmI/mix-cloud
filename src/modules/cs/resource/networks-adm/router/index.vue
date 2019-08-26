<template>
    <div class="router-container">

        <div class="action-bar">
            <div class="left">
                <el-button type="primary" icon="el-icon-plus" @click="handleCreateCluster">创建路由</el-button>
                <el-button icon="el-icon-delete">删除路由</el-button>
            </div>
            <div class="right">
                <el-select style="margin-right:10px;" filterable
                           v-model="ResourceValue" placeholder="请选择">
                    <el-option
                            v-for="item in ResourceOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select style="margin-right:10px;" filterable
                           v-model="ResourceValue" placeholder="请选择">
                    <el-option
                            v-for="item in ResourceOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select style="margin-right:10px;" filterable
                           v-model="ResourceValue" placeholder="请选择">
                    <el-option
                            v-for="item in ResourceOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select style="margin-right:10px;" filterable
                           v-model="ResourceValue" placeholder="请选择">
                    <el-option
                            v-for="item in ResourceOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <i class="el-icon-refresh-right"></i>
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
            <el-table-column label="路由名称" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-link type="primary" class="font-color"
                             @click="dispatchOpenSidePage">{{ scope.row.name }}
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column prop="namespace" label="命名空间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="port" label="访问端口" show-overflow-tooltip></el-table-column>
            <el-table-column prop="protocol" label="访问协议" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
        </el-table>

        <el-pagination class="pagination"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-size="page_size"
                       layout="prev, pager, next, jumper"
                       :total="total_page">
        </el-pagination>

        <!--<side-page-stack ref="sidePageStack"/>-->

        <!--<delete-confirm-dialog :visible.sync="visible" title="删除集群"  confirmHint="我已知晓以上信息并确认删除以上集群">-->
        <!--<el-table :data="tableData2" tooltip-effect="dark" style="width: 100%;cursor: pointer;">-->
        <!--<el-table-column prop="time" label="产生时间" show-overflow-tooltip></el-table-column>-->
        <!--<el-table-column label="事件名称" show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
        <!--<i :class="{'el-icon-circle-check':scope.row.status === '成功','el-icon-circle-close':scope.row.status === '失败'}"></i>-->
        <!--{{ scope.row.event }}-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="type" label="类型" show-overflow-tooltip></el-table-column>-->
        <!--<el-table-column prop="object" label="对象" show-overflow-tooltip></el-table-column>-->
        <!--</el-table>-->
        <!--&lt;!&ndash;<template v-slot:footer>&ndash;&gt;-->

        <!--&lt;!&ndash;</template>&ndash;&gt;-->
        <!--</delete-confirm-dialog>-->
    </div>
</template>
<script>
    import RouteDetail from './detail'
    import DeleteConfirmDialog from "@/views/delete-confirm-dialog/index";
    import SidePageStack from "@/views/side-page-stack/index";

    export default {
        name: 'NetworkRouter',
        components: { SidePageStack, DeleteConfirmDialog, RouteDetail},
        // inject: ['getTableLayout'],
        data() {
            return {
                visible: false,
                showSidePage: false,
                ResourceOptions: [
                    {value: '阿里云', label: '阿里云'},
                    {value: '华为云', label: '华为云'},
                    {value: '时速云', label: '时速云'}
                ],
                ResourceValue: '',//下拉框值
                ClusterName: '',//输入框集群名称
                tableData2: [
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                    {
                        name: 'route1',
                        namespace: 'app-1',
                        port: '8080',
                        protocol: 'http://',
                        createTime: '2019-08-09 13:00:00',
                    },
                ],
                multipleSelection: [],//存放表格选中数据
                currentPage: 5,//当前页
                page_size: 15,//每页显示条数
                total_page: 400,//总条数
                tableMaxHeight: 653,
                currentRow: null
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
                // console.log("gouxuan",this.multipleSelection);
            },
            //分页跳转
            handleCurrentChange(val) {
            },
            //创建集群
            handleCreateCluster() {
                this.$router.push({name: 'CreateRouter'})
            },
            dispatchOpenSidePage(){
                this.$emit('openSidePage',this.$options.components.RouteDetail, {}, true)
            },
            // openSidePage() {
            //     // this.showSidePage = true
            //     // this.$showSidePage(this.$options.components.DetailLayout)
            //     this.$refs.sidePageStack.openPage(this.$options.components.RouteDetail, {}, true)
            // }
        },
        mounted() {
        },
        computed: {}
    }
</script>
<style lang="scss" scoped>
    @import "~@/styles/variables.scss";

    .router-container {
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

        .test {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 90%; //calc(100% - 144px)
            height: 100%;
            z-index: $z-level-side-page;

            > div {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 90%; //calc(100% - 144px)
                height: calc(100% - #{$normal-component-height} - #{$space-16px}); //-actionBar高度32px-间距16px
                z-index: $z-level-side-page;
                background-color: $color-background;
                margin-right: -$page-padding;
                margin-bottom: -$page-padding;
                padding-top: $side-bar-sub-menu-height;
            }
        }

        .sidepage {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 90%; //calc(100% - 144px)
            height: calc(100% - #{$normal-component-height} - #{$space-16px}); //-actionBar高度32px-间距16px
            z-index: $z-level-side-page;
            background-color: $color-background;
            margin-right: -$page-padding;
            margin-bottom: -$page-padding;
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

