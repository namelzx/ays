<template>
    <div class="app-container">
        <!-- 搜索 -->

        <!--{{regionHiera}}-->

        <div class="filter-container dn">
            <el-form :inline="true" :model="listQuery">
                <el-row>
                    <el-col :span="4">
                        <el-form-item label="推广单号:">
                            <el-input v-model="listQuery.id" size="mini" @keyup.enter.native="handleFilter()"/>
                        </el-form-item>
                    </el-col>


                    <el-col :span="4">
                        <el-form-item label="安装单号:">
                            <el-input
                                    v-model="listQuery.contact"
                                    size="mini"
                                    @keyup.enter.native="handleFilter()"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="日期:">
                            <el-date-picker
                                    v-model="listQuery.startTime"
                                    style="width: 250px;"
                                    size="mini"
                                    type="datetimerange"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['12:00:00']"
                            />
                            <!--<el-input size="mini" v-model="listQuery.shopname" placeholder="请输入内容"></el-input>-->
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
        </div>

        <!-- 操作 -->
        <el-row style="margin-bottom: 10px;    text-align: right;    margin-right: 45px;">
            <el-col :xs="24" :sm="24" :lg="24">
                <el-tooltip content="搜索" placement="top">
                    <el-button
                            v-if="rolesbtn('o-96-1')"
                            v-waves
                            type="primary"
                            size="mini"
                            @click="handleFilter()"
                    >搜索
                    </el-button>
                </el-tooltip>
            </el-col>
        </el-row>

        <!-- 表格 -->
        <div v-loading="listLoading" class="new-table">
            <div class="tab">
                <!--<div class="list-item che">-->
                <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选-->
                <!--</el-checkbox>-->

                <!--</div>-->
                <div
                        class="list-item"
                        :class="listQuery.status===1?'selected':''"
                        style="width: 15%"
                        @click="handleStatusChange(1)"
                >
                    <span>审核通过</span>
                    <span class="price">{{ countdata[1]['total'] }}</span>
                </div>
                <div
                        class="list-item"
                        :class="listQuery.status===2?'selected':''"
                        style="width: 15%"
                        @click="handleStatusChange(2)"
                >
                    <span>待审核</span>
                    <span class="price">{{ countdata[2]['total'] }}</span>
                </div>

                <div
                        class="list-item"
                        :class="listQuery.status==='all'?'selected':''"
                        @click="handleStatusChange('all')"
                >
                    <span>全部</span>
                    <span class="price">{{ countdata[1]['total'] + countdata[2]['total'] }}</span>
                </div>
                <!--<div class="list-item " @click="handleStatusChange(6)" :class="listQuery.sstatus===9?'selected':''">-->
                <!--<span>驳回</span>-->
                <!--<span class="price">{{countdata[6]['total']}}</span>-->
                <!--</div>-->
            </div>
            <div v-for="(item,index) in list" v-if="total>0" class="table">
                <div class="table-title">
                    <div class="list-item che">
                        <!--<el-checkbox @change="handelcheck(item.id)" v-model="item.is_check" :key="item.id">{{item.id}}</el-checkbox>-->
                    </div>
                    <div class="list-item">
                        <span>推广单号:</span>
                        <span>{{ item.id }}</span>
                    </div>
                    <div class="list-item">
                        <span>安装单号:</span>
                        <span>{{ item.order_id }}</span>
                    </div>
                    <div class="list-item">
                        <span>上传日期:</span>
                        <span>{{ item.create_time }}</span>
                    </div>
                    <div class="list-item">
                        <span>推广类型:</span>
                        <span>{{ item.type }}</span>
                    </div>

<!--                    <div class="list-item a-link">-->
<!--                        <a @click="handelInfo(item)">详情</a>-->
<!--                        <a v-if="rolesbtn('o-67-5')" @click="handleEdit(item)">修改</a>-->
<!--                    </div>-->
                </div>
                <div class="table-content">
                    <div class="table-filed">
                        <el-image style="width: 10rem;height: 5rem" v-if="item.type=='图文'"
                                  :src="item.imagetext.assembly"></el-image>
                        <video style="    width: 10rem;
    height: 5rem;" v-if="item.type=='视频'" :src="item.video[0].url"></video>
                    </div>
                    <div class="table-filed jp">
                        <div class="filed-span">
                            <span>购买产品</span>
                            <div>
                                <div  class="field">{{ item.order.product_titile }}</div>
                            </div>
                        </div>
                        <div class="filed-span">
                            <span>状态</span>
                            <div>
                                :
                                <div class="field">{{ item.status }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="table-filed jp">
                        <div class="filed-span">
                            <span>车型</span>
                            <div>:
                                <div  class="field">{{ item.order.model_title }}</div>
                            </div>
                        </div>
                        <div class="filed-span">
                            <span>处理人</span>
                            <div class="kc">:
                                <div class="field" v-if="item.admin">{{ item.admin.realName }}</div>
                                <span v-else>未处理</span>
                            </div>
                        </div>
                    </div>
                    <div class="table-filed jp">
                        <div class="filed-span">
                            <span>安装门店</span>
                            <div>:
                                <div v-if="item.order"  class="field">{{ item.order.shop.shopname }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="table-filed jl" style="justify-content: center">
                        <div class="filed-price">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    v-if="item.status==='审核'"
                                    @click="handleRelease(item)"
                            >发布</el-button>
                            <el-button
                                    size="mini"
                                    v-if="item.status==='通过'"
                                    type="primary"
                                    @click="handleUpdate(item)"
                            >查看</el-button>
                        </div>
                    </div>

                </div>
            </div>

            <div v-if="total<1" class="no-data">当前暂无数据</div>
        </div>
        <!-- 分页 -->
        <div class="pagination-container">
            <el-pagination
                    v-show="total>0"
                    :current-page="listQuery.page"
                    :page-sizes="[10,20,30, 50]"
                    :page-size="listQuery.psize"
                    :total="total"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            />
        </div>


        <!--详情数据-->

        <mar-form ref="marform" @handleUpdate="handleFilter()"></mar-form>
        <ting-from ref="tingfrom" @handleUpdate="handleFilter()"></ting-from>
    </div>
</template>

<script>
    var app0

    import {
        del,
        GetDataByList,
        GetQueryBydownload,
    } from '@/api/marketing'
    import waves from '@/directive/waves'
    import  MarForm from './marketing/form'
    import  tingFrom from './marketing/marketing'

    import {getArrByKey, pickerOptions} from '@/utils'
    import {mapGetters} from 'vuex'

    import {regionDataPlus} from 'element-china-area-data'


    export default {
        name: 'Roles',
        // components: { rolesForm },
        directives: {
            waves
        },
        components: {MarForm,tingFrom},
        filters: {
            statusFilter(status) {
                const statusMap = {
                    0: '禁用',
                    1: '正常'
                }
                return statusMap[status]
            }
        },
        data() {
            return {
                isIndeterminate: true,
                checkedCities: [], // 已选择
                checkAll: false,
                dialogAudit: false,
                loading: true,
                sumorder: 0,
                reTitle: '',


                infodialogVisible: false, // 打开详情
                reOption: [],
                is_disabled: false,
                shopQuery: {
                    cityCode: undefined,
                    shopname: undefined,
                    tel: undefined
                },
                postFrom: {},
                permissions: [], // 权限组
                RedialogVisible: false,
                ReturndialogVisible: false,
                ReturnData: {
                    type: 1,
                    price: undefined,
                    courier: undefined,
                    courier_order_no: undefined,
                    name: undefined
                },
                innerVisible: false,
                dialogVisible: false,
                checked: true,
                tableKey: 0,

                list: null,
                total: 0,

                //
                selectedRows: null,
                listLoading: true,
                showSearch: false,
                options: [],
                shop: [],
                listQuery: {
                    page: 1,
                    limit: 10,
                    status: 'all',
                    title: '',
                    sstatus: 'all'
                },
                allsum: 0,
                countdata: [
                    {
                        total: 1,
                        status: 1
                    },
                    {
                        total: 1,
                        status: 1
                    },
                    {
                        total: 1,
                        status: 1
                    },

                ],
                buttonDisabled: true,
                deleting: false,
                pickerOptions: pickerOptions,
                currentIndex: -1,
                regionHiera: [],
                Stitle: '',
                checklist: []
            }
        },
        computed: {
            ...mapGetters(['userinfo', 'brand', 'group'])
        },
        watch: {},
        created() {
            this.permissions = this.group.btn.split(',')
            this.fetchList()
        },

        methods: {

            handleRelease(row){
                this.$refs.tingfrom.handleEdit(row)
            },
            // 导出数据
            handleDownload() {
                // this.downloadLoading = true
                GetQueryBydownload(this.listQuery).then(res => {
                    import('@/vendor/Export2Excel').then(excel => {
                        console.log(excel)
                        const tHeader = [
                            '安装单号',
                            '订单状态',
                            '购买平台',
                            '购买单号',
                            '购买账号',
                            '购买产品',
                            '订单金额',
                            '联系人',
                            '联系电话',
                            '省',
                            '市',
                            '区',
                            '详细地址',
                            '车牌号',
                            '车型',
                            '备注',
                            '提交时间',
                            '门店类别',
                            '门店状态',
                            '有无宝典',
                            '门店名称',
                            '门店地址',
                            '门店电话',
                            '安装费用',
                            '主业务员',
                            '次业务员',
                            '客服',
                            '客服备注',
                            '派单时间',
                            '业务确认时间',
                            '门店确认时间',
                            '安装完成时间',
                            '结算时间',
                            '结算方式',
                            '是否驳回',
                            '驳回原因',
                            '回访',
                            '售后'
                        ]
                        const filterVal = [
                            'id',
                            'status',
                            'lazada_title',
                            'buy_order_no',
                            'buy_account',
                            'product_titile',
                            'no_price',
                            'contact',
                            'tel',
                            'city_province',
                            'city_city',
                            'city_carea',
                            'city_desc',
                            'number_plate',
                            'model_title',
                            'desc',
                            'create_time',
                            'shop_type',
                            'shop_status',
                            'is_book',
                            'shop_name',
                            'shop_city',
                            'shop_tel',
                            'ins_cost',
                            'sales_name',
                            'insales_name',
                            'pre_name',
                            'service_desc',
                            'send_time',
                            'business_time',
                            'stores_time',
                            'install_time',
                            'settlement_time',
                            'settlement_type',
                            'is_rejected',
                            'rejected_txt',
                            'return',
                            'after_sales'
                        ]
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
                            filename: s2
                        })
                        this.downloadLoading = false
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

            rolesbtn(val) {
                var index = this.permissions.indexOf(val)
                if (index > -1) {
                    return true
                } else {
                    return false
                }
            },
            handeldownload() {
                this.$message('暂无导出')
            },

            // 打开详情
            handelInfo(row) {
                this.postFrom = row
                if (row.city_code.constructor === String) {
                    this.postFrom.city_code = this.postFrom.city_code.split(',')
                }
                if (row.car_model.constructor === String) {
                    this.postFrom.car_model = this.postFrom.car_model.split(',')
                }
                if (row.lazada_list.constructor === String) {
                    this.postFrom.lazada_list = this.postFrom.lazada_list.split(',')
                }
                const lazada = this.postFrom.lazada_list
                this.postFrom.lazada_list = []

                for (let i = 0; i < lazada.length; i++) {
                    this.postFrom.lazada_list.push(parseInt(lazada[i]))
                }
                this.infodialogVisible = !this.infodialogVisible
            },
            // 所选门店
            fetchList() {
                this.listLoading = true
                GetDataByList(this.listQuery).then(response => {
                    this.list = response.data.data
                    this.total = response.data.total
                    let countdata = response.data.coudata
                    var temp = []
                    var allsum = 0
                    for (let i = 0; i < 13; i++) {
                        temp.push({ total: 0, status: i })
                    }
                    console.log(countdata)
                    for (let i = 0; i < countdata.length; i++) {
                        allsum = allsum + countdata[i].total
                        temp[countdata[i].status].total = countdata[i].total
                        if (countdata[i].status === 9) {
                            if (temp[0].total === 0) {
                                temp[0].total = countdata[i].total
                            } else {
                                temp[0].total = temp[0].total + countdata[i].total
                            }
                        }
                    }

                    this.listLoading = !this.listLoading
                    this.allsum = allsum
                    console.log(temp)
                    this.countdata = temp

                    this.listLoading = !this.listLoading
                    this.listLoading = false
                })
            },
            handleFilter() {
                this.listQuery.page = 1
                this.fetchList()
            },

            handleSizeChange(val) {
                this.listQuery.psize = val
                this.fetchList()
            },

            handleStatusChange(val) {
                this.listQuery.page = 1
                this.listQuery.status = val
                this.fetchList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.fetchList()
            },

            handleUpdate(row) {
                this.$refs.marform.handleView(row)
            },

            handleDelete(index, id) {
                const _this = this
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        _this.$set(_this.list[index], 'delete', true)
                        del(id)
                            .then(response => {
                                if (response.status === 1) {
                                    _this.list.splice(index, 1)
                                    _this.total = _this.total - 1
                                    _this.$notify.success(response.msg)
                                    this.fetchList()
                                } else {
                                    _this.$notify.error(response.msg)
                                }
                                _this.$set(_this.list[index], 'delete', false)
                            })
                            .catch(error => {
                                _this.$set(_this.list[index], 'delete', false)
                            })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .return {
        .el-form-item--medium {
            margin-bottom: 0px !important;
        }
    }

    .tish {
        color: red;
        font-size: 12px;
    }

    .el-dialog__body {
        padding: 1px 20px;
        padding-left: 35px;

        .el-form-item__label {
            font-weight: 400;
            font-size: 12px;
        }
    }

    .el-dialog__title {
        font-size: 14px;
    }

    .new-table {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        display: flex;
        font-size: 12px;
        flex-direction: column;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

        .tab {
            height: 50px;
            border-bottom: 1px solid #e4e7ed;
            margin-bottom: 10px;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-left: 27px;
            padding-right: 20px;
            line-height: 1.5;
            font-size: 12px;

            .list-item {
                display: flex;
                justify-content: center;
                width: 10%;
                font-weight: 500;

                .price {
                    color: red;
                }
            }

            .che {
                width: 3%;
            }

            .selected {
                /*background: yellow;*/
                position: relative;
                color: #409eff;
            }

            .selected::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: -9px;
                width: 100%;
                height: 2px;
                background-color: #409eff;
                z-index: 1;
            }
        }

        .table {
            margin-bottom: 10px;
            padding-left: 15px;
            padding-right: 15px;

            .table-title {
                background: #eaf3ff;
                padding: 8px 16px 8px 16px;
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;

                display: flex;
                flex-direction: row;
                align-items: center;

                .list-item {
                    width: 25%;
                }

                .a-link {
                    color: #409eff;
                    width: 20%;
                }

                .che {
                    width: 3%;
                }
            }

            .table-content {
                border-right: 1px solid #f2f2f6;
                border-left: 1px solid #f2f2f6;
                display: flex;
                flex-direction: row;
                padding: 0 0 0 40px;
                flex-direction: row;
                flex-wrap: wrap;

                .table-filed {
                    display: flex;
                    flex-direction: column;
                    width: 21%;
                    padding-top: 1rem;
                    padding-bottom: 1rem;

                    .filed-span {
                        display: flex;
                        flex-direction: row;
                        height: 22px;
                        line-height: 22px;

                        span {
                            width: 14%;
                            color: #606266;
                        }

                        div {
                            display: flex;
                            flex-direction: row;
                            width: 80%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        .field {
                            padding-left: 5px;
                        }
                    }
                }

                .jp {
                    width: 20%;

                    .filed-span {
                        span {
                            text-align-last: justify;
                            width: 30%;
                        }
                    }
                }

                .jl {
                    width: 10%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    .filed-price {
                        font-weight: 800;
                        color: red;
                        font-size: 20px;
                    }
                }
            }

            .table-bottom {
                background: #f2f2f6;
                border-top-right-radius: 0px;
                border-top-left-radius: 0px;
                border-bottom-right-radius: 10px;
                border-bottom-left-radius: 10px;

                .list-item {
                    width: 15%;
                    display: flex;

                    span {
                        color: #606266;
                    }
                }

                .a-link {
                    width: 80%;
                }

                .shop-item {
                    width: 25%;
                }

                .order-btn {
                    width: 50%;
                    text-align: center;
                    display: flex;
                    justify-content: flex-end;

                    .is-plain {
                        padding-top: 3px;
                        padding-bottom: 3px;
                        font-size: 2px;
                        /*span {*/
                        /*color: #FFBA00;*/
                        /*}*/
                    }

                    is-plain:hover {
                        background: #fff83c !important;
                    }
                }

                .che {
                    width: 3%;
                }
            }
        }
    }

    .text-red {
        color: red;
        cursor: pointer;
    }

    .text-green {
        color: green;
        cursor: pointer;
    }

    .n-post {
        .el-dialog__body {
            padding: 10px 10px;

            .el-form-item__label {
                font-weight: 400;
                font-size: 12px;
            }
        }
    }

    .filter-container .el-form-item__label {
        width: 64px;
    }

    .no-data {
        height: 100px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
</style>
