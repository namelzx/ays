
<template>
    <!-- 质保码    -->
    <div class="card">
        <div class="app-container pageclass">
            <div class="filter-container">
                <el-form :inline="true" :model="listQuery">
                            <el-form-item label="标题:">
                                <el-input
                                        size="mini"
                                        @keyup.enter.native="getList()"
                                        v-model="listQuery.title"
                                ></el-input>
                            </el-form-item>

                                    <el-button type="primary"  size="mini" class="btn-add" @click="handleAdd()">添加帮助</el-button>






                </el-form>
            </div>
            <div class="new-table">
                <div class="table_list" v-for="(item,index) in list" :key="index">
                    <div class="list_name" style="line-height: 70px">
                        <img style="width: 60px; height: 28px" :src="item.img_url"/>

                    </div>
                    <div class="list_name">
                        <div class="name_title">
                            <span>标题：</span>
                            <span class="title_span">{{item.title}}</span>
                        </div>
                        <div class="name_title">
                            <span>图文：</span>
                            <span class="title_span">{{item.desc}}</span>
                        </div>
                    </div>
                    <div class="list_name">
                        <div class="name_title">
                            <span>日期：</span>
                            <span class="title_span">{{item.create_time}}</span>
                        </div>
                    </div>
                    <div class="list_button">
                        <el-button type="primary"
                                  @click="handleUpdateStatus(index, item)"
                                   size="mini">{{item.status===1?'取消置顶':'置顶'}}</el-button>
                        <el-button type="primary" @click="handleUpdate(index,item)" size="mini">修改</el-button>
                        <el-button type="warning" plain @click="handleDelete(index,item)" size="mini">删除</el-button>
                    </div>
                </div>
            </div>

        </div>

        <div class="pageclass">
            <div class="pagination-container page">
                <el-pagination
                        v-show="total > 0"
                        :current-page="listQuery.page"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="listQuery.psize"
                        :total="total"
                        background
                        layout="total, sizes, prev, pager, next, jumper"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import {GetDataByList, updateStatus, deleteHomeAdvertise} from '@/api/help';

    const defaultListQuery = {
        limit: 20,
        page: 1,
        name: null,
        type: null,
        endTime: null
    };
    const defaultTypeOptions = [
        {
            label: 'PC首页轮播',
            value: 0
        },
        {
            label: 'APP首页轮播',
            value: 1
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
                    return 'APP首页轮播';
                } else {
                    return 'PC首页轮播';
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
                this.$confirm('是否要修改置顶状态?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var temp = {
                        id: row.id,
                        status: row.status
                    }
                    if(row.status===1){
                        temp.status=0
                    }else{
                        temp.status=1
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
                this.$router.push({path: '/shop/help/edit'})
            },
            handleUpdate(index, row) {
                this.$router.push({path: '/shop/help/edit/' + row.id})
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
<style scoped lang="scss">
    .card {
        .new-table {
            padding-bottom: 30px;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
            "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
            display: flex;
            font-size: 12px;
            flex-direction: column;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

            .table_list {
                margin: 0 30px;
                border-bottom: 1px solid #DCDCDC;
                display: flex;
                flex-direction: row;

                .list_name {
                    padding: 5px 0;
                    font-size: 7px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    width: 22%;
                    text-align: center;
                    .name_title {
                        display: flex;
                        padding: 6px 0;
                        color: #666666;

                        .title_span {
                            color: #333333;
                        }

                        .span_overflow {
                            width: 83%;
                            display: block;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }

                .list_button {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    width: 34%;
                }

            }
        }
    }

    .pageclass {
        .pagination-container {
            position: fixed;
            bottom: 0;
            padding-top: 4px;
            padding-bottom: 9px;
            background: #ffffff;
            width: 100%;
            padding-left: 20px;
            /*text-align: c;*/
        }
    }
</style>

