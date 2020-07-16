<template>
    <div class="userlist">
        <div class="filter-container dn">
            <el-form :inline="true" :model="listQuery">
                <el-row>

                    <el-col :span="4">
                        <el-form-item label="质保码:">
                            <el-input
                                    v-model="listQuery.code"
                                    size="mini"
                                    @keyup.enter.native="handleFilter()"
                            />
                        </el-form-item>
                    </el-col>

                    <el-col :span="4">
                        <el-form-item label="状态:">
                            <el-select v-model="listQuery.is_blick" size="mini" placeholder="请选择">
                                <el-option
                                        v-for="item in optionsblick"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>

                        </el-form-item>

                    </el-col>
                    <el-col :span="4" style="margin-top: 5px">
                        <el-tooltip content="搜索" placement="top">
                            <el-button v-waves type="primary" size="mini" @click="handleFilter()">搜索</el-button>
                        </el-tooltip>

                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 操作 -->

        <div style="padding-bottom: 100px">
            <el-table
                    :data="list"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="code"
                        label="质保码"
                        min-width="180">
                    <template slot-scope="scope">
                        <span class="link-type">{{scope.row.code}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                        min-width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.status}} </span>
                    </template>
                </el-table-column>

                <el-table-column label="管理" fixed="right" align="center" min-width="200px" class-name="small-padding">
                    <template slot-scope="scope">

                        <el-button type="danger" size="mini" @click="handelDelete(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
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
    import {GetWarrantyByCode,GetIdByDeleteCode} from '@/api/warrantycard'
    import {Citylist} from '@/api/city'
    import waves from '@/directive/waves'

    export default {
        directives: {
            waves
        },
        data() {
            return {
                listQuery: {
                    page: 1,
                    limit: 10,
                    status: undefined,
                    title: '',
                    nickname: '',
                    contact: '',
                    cityCode: ''
                },
                optionsblick: [{
                    value: '1',
                    label: '未使用'
                }, {
                    value: '2',
                    label: '已使用'
                }],
                list: null,
                total: 1,
                checked: true,
                listLoading: true,

                cityoptions: [] // 地址
            }
        },
        filters: {
            blick(str) {
                console.log(str)
                if (str === 1) {
                    return '未使用'
                } else {
                    return '已使用'

                }
            }
        },
        created() {
            // this.permissions = this.group.btn.split(",");
            // Citylist().then(res => {
            //   this.cityoptions = res.data;
            // });
            this.listQuery.card_id=this.$route.query.card_id

            this.fetchList()
        },
        methods: {

            handleCreate() {
                this.$router.push({path: '/user/warrantyinfo'})
            },

            fetchList() {
                this.listLoading = true
                console.log(this.listQuery.page)
                GetWarrantyByCode(this.listQuery).then(response => {
                    this.list = response.data.data
                    this.total = response.data.total
                    this.listLoading = false
                    console.log(response.data.data, '111')
                })
            },
            handleFilter() {
                this.listQuery.page = 1
                this.fetchList()
            },
            handleSizeChange(val) {
                this.listQuery.page = val
                this.fetchList()
            },

            handleCurrentChange(val) {
                this.listQuery.page = val
                this.listQuery.sstatus = val
                this.fetchList()
            },
            handelDelete(row) {
                let index=this.list.indexOf(row);
                GetIdByDeleteCode(row.id).then(res => {
                    this.list.splice(index, 1)
                    this.$message.success('删除成功')

                })
            },
            //导出数据
            handleDownload() {
                this.listLoading = true
                GetCodeByDownload(this.listQuery).then(res => {
                    import('@/vendor/Export2Excel').then(excel => {
                        console.log(excel)
                        const tHeader = res.data.tHeader
                        const filterVal = res.data.filterVal
                        const data = this.formatJson(res.data.data, filterVal)

                        var day2 = new Date()
                        day2.setTime(day2.getTime())
                        var s2 =
                            day2.getFullYear() +
                            '-' +
                            (day2.getMonth() + 1) +
                            '-' +
                            day2.getDate()
                        excel.export_json_to_excel({
                            header: tHeader,
                            data,
                            filename: '会员导出-' + s2
                        })
                        this.listLoading = false
                        this.$message.success('下载成功')
                    })
                })
            },
            formatJson(data, filterVal) {
                return data.map(v =>
                    filterVal.map(j => {
                        if (j === 'timestamp') {
                            return parseTime(v[j])
                        } else {
                            return v[j]
                        }
                    })
                )
            },
        }
    }
</script>
<style lang="scss" scoped>
    .userlist {
        padding: 20px;

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

        .no-data {
            height: 100px;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }

        .filter-container .el-form-item__label {
            width: 64px;
        }

        .new-table {
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
            "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
            display: flex;
            font-size: 12px;
            flex-direction: column;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

            .table-warp {
                margin: 0 30px;
                height: 100px;
                border-bottom: 1px solid #dcdcdc;
                display: flex;
                align-items: center;

                .warp_imgs {
                    width: 55px;
                    height: 55px;
                    border-radius: 10px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .warp_bao {
                    margin-left: 3%;
                    width: 55%;

                    .warp_content {
                        display: flex;
                        font-size: 12px;
                        height: 30px;
                        line-height: 30px;

                        .warp_content_1 {
                            display: flex;
                            width: 40%;

                            span {
                                display: block;
                            }

                            .wa_title {
                                display: block;
                                width: 25%;
                                color: #666666;
                                text-align-last: justify;
                            }

                            .wa_colon {
                                color: #666666;
                            }
                        }

                        .warp_content_2 {
                            width: 20%;
                            display: flex;

                            span {
                                display: block;
                            }

                            .wa_title {
                                display: block;
                                color: #666666;
                                text-align-last: justify;
                            }

                            .wa_colon {
                                color: #666666;
                            }

                            .wa_name {
                                color: #009cff;
                            }
                        }

                        .warp_content_3 {
                            display: flex;
                            width: 50%;

                            span {
                                display: block;
                            }

                            .wa_title {
                                display: block;
                                width: 12%;
                                color: #666666;
                                text-align-last: justify;
                            }

                            .wa_colon {
                                color: #666666;
                            }
                        }
                    }
                }
            }

            .table-warp:nth-last-child(1) {
                border: 0;
            }
        }

    }

    .nick {
        display: flex;

        .warp_imgs {
            width: 55px;
            height: 55px;
            border-radius: 10px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .text {
            height: 100%;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-top: 10px;

            span {
                line-height: 1.5;
                font-size: 13px;
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
