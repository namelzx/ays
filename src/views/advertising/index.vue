<template> 
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>


                <i class="el-icon-search"></i>
                <span>筛选搜索</span>

                <div class="filter-container dn">
                    <el-form :inline="true" :model="listQuery">
                        <el-row>
                            <el-col :span="4">
                                <el-form-item label="广告名称:">
                                    <el-input v-model="listQuery.name" size="mini" @keyup.enter.native="handleFilter()" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="广告类型:">
                                    <el-select
                                            v-model="listQuery.type"
                                            size="mini"
                                            filterable
                                            clearable
                                            placeholder
                                            @change="handleSearchList()"
                                    >
                                        <el-option v-for="item in typeOptions" :label="item.label" :value="item.value" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <el-button
                        style="float:right"
                        type="primary"
                        @click="handleSearchList()"
                        size="small">
                    查询搜索
                </el-button>
                <el-button
                        style="float:right;margin-right: 15px"
                        @click="handleResetSearch()"
                        size="small">
                    重置
                </el-button>
            </div>
            <div style="margin-top: 15px">

            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
            <el-button size="mini" class="btn-add" @click="handleAdd()">添加广告</el-button>
        </el-card>
        <div class="table-container">
            <el-table ref="homeAdvertiseTable"
                      :data="list"
                      style="width: 100%;"
                      @selection-change="handleSelectionChange"
                      v-loading="listLoading" border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="编号" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="广告名称" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="广告位置" width="120" align="center">
                <template slot-scope="scope">{{scope.row.type | formatType}}</template>
                </el-table-column>
                <el-table-column label="广告图片" width="120" align="center">
                    <template slot-scope="scope"><img style="height: 80px;width: 100%" :src="scope.row.images_url">
                    </template>
                </el-table-column>

                <el-table-column label="上线/下线" width="120" align="center">
                    <template slot-scope="scope">
                        <el-switch
                                @change="handleUpdateStatus(scope.$index, scope.row)"
                                :active-value="1"
                                :inactive-value="0"
                                v-model="scope.row.status">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini"
                                   type="text"
                                   @click="handleUpdate(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button size="mini"
                                   type="text"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination-container">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes,prev, pager, next,jumper"
                    :page-size="listQuery.limit"
                    :page-sizes="[5,10,15]"
                    :current-page.sync="listQuery.page"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {GetDataByList, updateStatus, deleteHomeAdvertise} from '@/api/banner';

    const defaultListQuery = {
        limit: 20,
        page: 1,
        name: null,
        type: null,
        endTime: null
    };
    const defaultTypeOptions = [
        {
            label: '门店广告',
            value: 1
        },
        {
            label: '用户订单填写',
            value: 2
        },
        {
            label: '营销推广广告',
            value: 3
        }
    ];
    export default {
        name: 'homeAdvertiseList',
        data() {
            return {
                listQuery: Object.assign({}, defaultListQuery),
                typeOptions: Object.assign({}, defaultTypeOptions),
                list: null,
                total: null,
                listLoading: false,
                multipleSelection: [],
                operates: [
                    {
                        label: "删除",
                        value: 0
                    }
                ],
                operateType: null
            }
        },
        created() {
            this.getList();
        },
        filters: {
            formatType(type) {
                if (type === 1) {
                    return '门店广告位';
                }
                if (type === 2) {
                    return '用户订单填写广告';
                }
                if (type === 3) {
                    return '营销推广广告';
                }
            },
            formatTime(time) {
                if (time == null || time === '') {
                    return 'N/A';
                }
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            },
        },
        methods: {
            handleResetSearch() {
                this.listQuery = Object.assign({}, defaultListQuery);
            },
            handleSearchList() {
                this.listQuery.pageNum = 1;
                this.getList();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getList();
            },
            handleUpdateStatus(index, row) {
                this.$confirm('是否要修改上线/下线状态?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var temp = {
                        id: row.id,
                        status: row.status
                    }

                    updateStatus(temp).then(response => {
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'success',
                        message: '已取消操作!'
                    });
                    this.getList();
                });
            },
            handleDelete(index, row) {
                this.deleteHomeAdvertise(row.id);
            },
            handleBatchOperate() {
                if (this.multipleSelection < 1) {
                    this.$message({
                        message: '请选择一条记录',
                        type: 'warning',
                        duration: 1000
                    });
                    return;
                }
                let ids = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    ids.push(this.multipleSelection[i].id);
                }
                if (this.operateType === 0) {
                    //删除
                    this.deleteHomeAdvertise(ids);
                } else {
                    this.$message({
                        message: '请选择批量操作类型',
                        type: 'warning',
                        duration: 1000
                    });
                }
            },
            handleAdd() {
                this.$router.push({path: '/advertising/advertising/create'})
            },
            handleUpdate(index, row) {
                this.$router.push({path: '/advertising/edit/' + row.id})
            },
            getList() {
                this.listLoading = true;
                GetDataByList(this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.data.data;
                    console.log(response.data)
                    this.total = response.data.total;
                })
            },
            deleteHomeAdvertise(ids) {
                this.$confirm('是否要删除该广告?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = new URLSearchParams();
                    params.append("ids", ids);
                    deleteHomeAdvertise(params).then(response => {
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                })
            }
        }
    }
</script>
<style scoped>
    .input-width {
        width: 203px;
    }
</style>


