<template>
    <!-- 质保码    -->
    <div class="card">
        <div class="app-container pageclass">
            <div class="filter-container dn">
                <el-form :inline="true" :model="listQuery">
                    <el-row>
                        <el-col :span="4">
                            <el-form-item label="车主:">
                                <el-input @keyup.enter.native="handleFilter()" size="mini"
                                          v-model="listQuery.user"></el-input>
                            </el-form-item>
                        </el-col>
                        <!--                        <el-col :span="4">-->
                        <!--                            <el-form-item label="产品:">-->
                        <!--                                <el-input-->
                        <!--                                        @keyup.enter.native="handleFilter()"-->
                        <!--                                        size="mini"-->
                        <!--                                        v-model="listQuery.product"-->
                        <!--                                ></el-input>-->
                        <!--                            </el-form-item>-->
                        <!--                        </el-col>-->
                        <el-col :span="4">
                            <el-form-item label="质保码:">
                                <el-input
                                        @keyup.enter.native="handleFilter()"
                                        size="mini"
                                        v-model="listQuery.guarantee_code"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="电话:">
                                <el-input
                                        @keyup.enter.native="handleFilter()"
                                        size="mini"
                                        v-model="listQuery.tel"
                                ></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>


                    <el-row style="margin-bottom: 10px;    text-align: right;    margin-right: 45px;">
                        <el-col :xs="24" :sm="24" :lg="24">
                            <el-tooltip content="搜索" placement="top">
                                <el-button type="primary" size="mini" @click="handleFilter()">搜索</el-button>
                            </el-tooltip>
                            <el-tooltip content="导出" placement="top">
                                <el-button type="primary" size="mini" @click="handleDownload()">下载</el-button>
                            </el-tooltip>

                        </el-col>
                    </el-row>

                </el-form>
            </div>
            <div class="new-table">
                <div class="table_list" v-for="(item,index) in list" :key="index">
                    <div class="list_name">
                        <div class="name_title">
                            <span>产品：</span>
                            <span class="title_span">{{item.product_title}}</span>
                        </div>
                        <div class="name_title">
                            <span>车型：</span>
                            <span class="title_span span_overflow">
                                <span v-if="item.model">
                                 {{item.model.carseries.series_name}}
                                    {{item.model.model_name}}

                                    </span>
                            </span>
                        </div>
                        <div class="name_title">
                            <span>车牌：</span>
                            <span class="title_span">{{item.provincial}}{{item.plate_numer}}</span>
                        </div>
                    </div>
                    <div class="list_name">
                        <div class="name_title">
                            <span>车主姓名：</span>
                            <span class="title_span">{{item.user}}</span>
                        </div>
                        <div class="name_title">
                            <span>车主电话：</span>
                            <span class="title_span">{{item.user_phone}}</span>
                        </div>
                        <div class="name_title">
                            <span>车主地区：</span>
                            <span class="title_span">{{item.user_address}}</span>
                        </div>
                    </div>
                    <div class="list_name">
                        <div class="name_title">
                            <span>安装门店：</span>
                            <span class="title_span">{{item.shop_user}}</span>
                        </div>
                        <div class="name_title">
                            <span>门店电话：</span>
                            <span class="title_span">{{item.shop_phone}}</span>
                        </div>
                        <div class="name_title">
                            <span>门店地区：</span>
                            <span class="title_span">{{item.shop_address}}</span>
                        </div>
                    </div>
                    <div class="list_name">
                        <div class="name_title">
                            <span>有  效  期：</span>
                            <span class="title_span">{{item.codeday}}天</span>
                        </div>
                        <div class="name_title">
                            <span>购买日期：</span>
                            <span class="title_span">{{item.buytime|parseTime}}</span>
                        </div>
                        <div class="name_title">
                            <span>质  保  码：</span>
                            <span class="title_span">{{item.code}}</span>
                        </div>
                    </div>


                    <div class="list_button">
                        <el-button
                                type="primary"
                                plain size="mini"
                                @click="handleUpdate(item)"
                        >编辑
                        </el-button>
                        <el-button type="warning" @click="handleDelete(index,item.id)" plain size="mini">删除</el-button>
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

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="选择产品">
                    <el-cascader
                            size="mini"
                            :options="productTree"
                            filterable
                            clearable
                            placeholder
                            v-model="form.product_all"
                            ref="product"
                            @change="handelProduct"
                            change-on-select
                    ></el-cascader>
                </el-form-item>

                <el-form-item label="质保码">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="质保期">
                    <el-input v-model="form.codeday"></el-input>
                </el-form-item>

                <el-form-item label="车型">


                    <el-cascader
                            size="mini"
                            :props="props"
                            filterable
                            clearable
                            v-model="form.car_model"
                    ></el-cascader>
                </el-form-item>

                <el-form-item label="车牌">
                    <el-select v-model="form.provincial" placeholder="请选择">
                        <el-option
                                v-for="item in abbreviation"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="车牌号码">
                    <el-input v-model="form.plate_numer"></el-input>
                </el-form-item>


                <el-form-item label="姓名">
                    <el-input v-model="form.user"></el-input>
                </el-form-item>

                <el-form-item label="电话">
                    <el-input v-model="form.user_phone"></el-input>
                </el-form-item>

                <el-form-item
                        size="mini"
                        label="地址:"
                        class="postInfo-container-item"
                >
                    <el-cascader
                            size="mini"
                            clearable
                            :options="cityoptions"
                            v-model="form.user_city_code"
                            ref="elcascader"
                            @visible-change="elCascaderOnlick"
                            @expand-change="elCascaderOnlick"
                            change-on-select
                    ></el-cascader>
                </el-form-item>


                <el-form-item label="店名">
                    <el-input v-model="form.shop_user"></el-input>
                </el-form-item>

                <el-form-item label="电话">
                    <el-input v-model="form.shop_phone"></el-input>
                </el-form-item>


                <el-form-item
                        size="mini"
                        label="地址:"
                        class="postInfo-container-item"
                >
                    <el-cascader
                            size="mini"
                            clearable
                            :options="cityoptions"
                            v-model="form.shop_city_code"
                            ref="elcascader"
                            @visible-change="elCascaderOnlick"
                            @expand-change="elCascaderOnlick"
                            change-on-select
                    ></el-cascader>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handelSave">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getBrand, getModel, getSeries} from "@/api/tools";

    import {GetDeleteById, GetDataByList, GetCodeByDownload, PostSaveByData} from '@/api/usercard';
    import {GetInfoById} from "@/api/product";

    import {parseTime} from '@/utils/index'

    import {Citylist} from '@/api/city'
    import {GetProductByTree} from '@/api/product'

    export default {
        name: "guaranteecard",
        data() {
            return {

                dialogVisible: false,
                props: {
                    lazy: true,
                    lazyLoad(node, resolve) {
                        const {level} = node

                        if (level === 0) {
                            getBrand().then(res => {

                                var data = res.data

                                let nodes = []
                                for (let i = 0; i < data.length; i++) {
                                    nodes.push({label: data[i].name, value: data[i].brandid})
                                }
                                resolve(nodes)

                            })

                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                        }
                        if (level === 1) {
                            getSeries(node.data.value).then(res => {
                                var data = res.data
                                let nodes = []
                                for (let i = 0; i < data.length; i++) {
                                    nodes.push({
                                        label: data[i].factory_name + ' ' + data[i].series_name,
                                        value: data[i].series_id
                                    })
                                }
                                resolve(nodes)

                            })

                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                        }

                        if (level === 2) {
                            getModel(node.data.value).then(res => {
                                var data = res.data
                                let nodes = []
                                for (let i = 0; i < data.length; i++) {
                                    nodes.push({label: data[i].label, value: data[i].value, leaf: level >= 2})
                                }
                                resolve(nodes)

                            })

                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                        }
                        if (level === 3) {
                            let nodes = []
                            resolve(nodes)
                        }
                    }
                },
                total: 1,
                list: [],
                form: {},
                abbreviation: [
                    {id: "1", name: "京"},
                    {id: "2", name: "津"},
                    {id: "3", name: "沪"},
                    {id: "4", name: "渝"},
                    {id: "5", name: "豫"},
                    {id: "6", name: "冀"},
                    {id: "7", name: "云"},
                    {id: "8", name: "辽"},
                    {id: "9", name: "黑"},
                    {id: "10", name: "湘"},
                    {id: "11", name: "鲁"},
                    {id: "12", name: "皖"},
                    {id: "13", name: "新"},
                    {id: "14", name: "苏"},
                    {id: "15", name: "浙"},
                    {id: "16", name: "赣"},
                    {id: "17", name: "桂"},
                    {id: "18", name: "鄂"},
                    {id: "19", name: "晋"},
                    {id: "20", name: "蒙"},
                    {id: "21", name: "陕"},
                    {id: "22", name: "闽"},
                    {id: "23", name: "吉"},
                    {id: "24", name: "粤"},
                    {id: "25", name: "青"},
                    {id: "26", name: "藏"},
                    {id: "27", name: "宁"},
                    {id: "28", name: "琼"},
                    {id: "29", name: "港"},
                    {id: "30", name: "澳"},
                    {id: "31", name: "台"},
                    {id: "32", name: "贵"},
                    {id: "33", name: "川"}
                ],
                listQuery: {
                    page: 1,
                    limit: 10,
                    car_name: '',
                    product: '',
                    guarantee_code: '',
                    startTime: '',
                    tel: '',
                    car_model: '',
                    cityCode: '',
                },
                productTree: [],
                cityoptions: [], //地址
            }
        },
        created() {
            Citylist().then(res => {
                this.cityoptions = res.data
            })
            GetProductByTree().then(res => {
                this.productTree = res.data
            })
            this.fetchList()
        },
        methods: {

            handelProduct(e) {
                console.log(e)
                if (e.length > 1) {
                    GetInfoById(e[1]).then(res => {
                        console.log(res
                        )
                        this.form.codeday = res.data.quality_time
                    })
                }
            },
            handelSave() {
                console.log(this.form)
                PostSaveByData(this.form).then(res => {
                    console.log(res)
                    this.dialogVisible = false
                    this.$message.success('更新成功');
                    this.fetchList()
                })
            },
            handleUpdate(row) {
                console.log(row)
                this.form = {}
                let product_all = row.product_all
                console.log(product_all)
                if (product_all !== null) {
                    if (product_all.constructor == String) {
                        product_all = product_all.split(',')
                        let temp = []
                        product_all.forEach(item => {
                            temp.push(parseInt(item))
                        })
                        product_all = temp
                    }
                }
                let car_model = row.car_model
                if (car_model !== null) {
                    if (car_model.constructor == String) {
                        car_model = car_model.split(',')
                        car_model.forEach(item => {
                            item = parseInt(item)
                        })
                    }
                }
                let user_address = row.user_city_code
                if (user_address !== null) {
                    if (user_address.constructor == String) {
                        user_address = user_address.split(',')
                        let temp = [];
                        user_address.forEach(item => {
                            temp.push(parseInt(item))
                        })
                        user_address = temp
                    }
                }

                let shop_address = row.shop_city_code
                console.log(shop_address)
                if (shop_address !== null) {
                    if (shop_address.constructor == String) {
                        shop_address = shop_address.split(',')
                        let temp = [];
                        shop_address.forEach(item => {
                            temp.push(parseInt(item))
                        })
                        shop_address = temp
                    }
                }
                this.form = row
                this.form.product_all = product_all
                this.form.car_model = car_model
                this.form.user_city_code = user_address
                this.form.shop_city_code = shop_address
                this.dialogVisible = true
            },

            handleClose() {
                this.dialogVisible = false
            },
            handleDelete(index, id) {
                const _this = this
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$set(_this.list[index], 'delete', true)
                    GetDeleteById(id).then(response => {
                        if (response.status === 1) {
                            _this.list.splice(index, 1)
                            _this.total = _this.total - 1
                            _this.$notify.success(response.msg)
                        } else {
                            _this.$notify.error(response.msg)
                        }
                        _this.$set(_this.list[index], 'delete', false)
                    }).catch((error) => {
                        _this.$set(_this.list[index], 'delete', false)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            fetchList() {
                GetDataByList(this.listQuery).then(res => {
                    console.log(res)
                    this.list = res.data.data
                    this.total = res.data.total
                })
            },
            elCascaderproduct() {
                let that = this
                setTimeout(function () {
                    document.querySelectorAll('.el-cascader-node__label').forEach(el => {
                        el.onclick = function () {
                            this.previousElementSibling.click()
                            that.$refs.product.dropDownVisible = false
                        }
                    })
                    document
                        .querySelectorAll('.el-cascader-panel .el-radio')
                        .forEach(el => {
                            el.onclick = function () {
                                that.$refs.product.dropDownVisible = false
                            }
                        })
                }, 100)
            },
            elCascaderCar() {
                let that = this
                setTimeout(function () {
                    document.querySelectorAll('.el-cascader-node__label').forEach(el => {
                        el.onclick = function () {
                            this.previousElementSibling.click()
                            that.$refs.car.dropDownVisible = false
                        }
                    })
                    document
                        .querySelectorAll('.el-cascader-panel .el-radio')
                        .forEach(el => {
                            el.onclick = function () {
                                that.$refs.car.dropDownVisible = false
                            }
                        })
                }, 100)
            },
            elCascaderOnlick() {
                let that = this
                setTimeout(function () {
                    document.querySelectorAll('.el-cascader-node__label').forEach(el => {
                        el.onclick = function () {
                            this.previousElementSibling.click()
                            that.$refs.elcascader.dropDownVisible = false
                        }
                    })
                    document
                        .querySelectorAll('.el-cascader-panel .el-radio')
                        .forEach(el => {
                            el.onclick = function () {
                                that.$refs.elcascader.dropDownVisible = false
                            }
                        })
                }, 100)
            },
            handleSizeChange(val) {
                this.listQuery.psize = val
                this.fetchList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.fetchList()
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
                            filename: '质保卡-' + s2
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
            elCascaderCar() {
                let that = this
                setTimeout(function () {
                    document.querySelectorAll('.el-cascader-node__label').forEach(el => {
                        el.onclick = function () {
                            this.previousElementSibling.click()
                            that.$refs.car.dropDownVisible = false
                        }
                    })
                    document
                        .querySelectorAll('.el-cascader-panel .el-radio')
                        .forEach(el => {
                            el.onclick = function () {
                                that.$refs.car.dropDownVisible = false
                            }
                        })
                }, 100)
            },
            handleFilter() {
                this.listQuery.page = 1
                this.fetchList()
            },
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
                    padding: 10px 0;
                    font-size: 7px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    width: 22%;

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