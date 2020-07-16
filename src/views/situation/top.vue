<template>
    <div class="app-container top">
        <!--开发中-->
        <div class="filter-container ">
            <el-form :inline="true" :model="listQuery">
                <el-date-picker
                        size="mini"
                        v-model="listQuery.time"
                        type="datetimerange"
                        :picker-options="pickerOptions"

                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>

                <el-tooltip content="搜索" placement="top">
                    <el-button
                            type="primary"
                            size="mini"
                            @click="handleFilter()"
                    >搜索
                    </el-button>
                </el-tooltip>

                <el-tooltip content="导出" placement="top">
                    <el-button
                            type="primary"
                            size="mini"
                            @click="handleDerive()"
                    >导出
                    </el-button>
                </el-tooltip>

            </el-form>
        </div>

        <div class="statistical bc">
            <div class="item-st">
                <div class="title">总订单</div>
                <div class="sj">{{ordersum}}</div>
            </div>
            <div class="item-st" style="background: #8cc8ff">
                <div class="title">时间段内</div>
                <div class="sj">{{timesum}}</div>
            </div>
        </div>

        <el-card class="box-card" style="margin-bottom: 30px">
            <div slot="header" class="clearfix">
                <span>TOP门店</span>
                <el-button type="primary" size="mini" @click="handelShow">更多</el-button>
            </div>
            <div>
                <el-table
                        :data="shop"
                        stripe
                        size="mini"
                        style="width: 100%">
                    <el-table-column
                            prop="sort"
                            label="排名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="shopname"
                            label="门店"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="类别">
                        <template slot-scope="scope">
                            <span v-if="scope.row.shop_type=='普通'">普通</span>
                            <span v-else class="link-type">{{ scope.row.shop_type }}</span>
                        </template>
                    </el-table-column>


                    <el-table-column

                            label="状态">
                        <template slot-scope="scope">
                            <div style="color: red" class="color: red" v-if="scope.row.blacklist===2">
                                市场拉黑({{scope.row.blackday<356?scope.row.blackday+'天后到期':'永久'}})
                            </div>
                            <div style="color: red" v-if="scope.row.ecblacklist==3">
                                电商拉黑
                                ({{scope.row.ecblackday<356?scope.row.ecblackday+'天后到期':'永久'}})
                            </div>
                            <div class="link-type" v-if="scope.row.ec_rec==1||scope.row.mk_rec==1">
                                推荐
                            </div>

                        </template>
                    </el-table-column>
                    <el-table-column

                            label="宝典">
                        <template slot-scope="scope">
          <span
                  class="link-type"
          >{{ scope.row.book|book }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="count"
                            label="单量">
                    </el-table-column>
                    <el-table-column
                            prop="stock"
                            label="进货量">
                    </el-table-column>
                    <el-table-column label="管理" fixed="right" align="center" min-width="300px"
                                     class-name="small-padding">
                        <template slot-scope="scope">

                            <el-popover
                                    placement="right"
                                    width="100"
                                    trigger="click">
                                <div>
                                    <div>
                                        <el-link :type="scope.row.ec_rec===1?'primary':''">电商推荐</el-link>
                                        <el-link @click="handelSet(scope.row,'ec_rec')" type="warning">
                                            {{scope.row.ec_rec===1?'取消推荐':'推荐'}}
                                        </el-link>

                                    </div>
                                    <div>
                                        <el-link :type="scope.row.mk_rec===1?'primary':''">市场推荐</el-link>
                                        <el-link @click="handelSet(scope.row,'mk_rec')" type="warning">
                                            {{scope.row.mk_rec===1?'取消推荐':'推荐'}}
                                        </el-link>

                                    </div>
                                </div>
                                <el-button size="mini" slot="reference">推荐</el-button>
                            </el-popover>
                            <el-tooltip content="拉黑" placement="top">
                                <el-button
                                        type="primary"
                                        @click="toShop(scope.row)"
                                        size="mini">拉黑
                                </el-button>
                            </el-tooltip>

                            <el-tooltip content="编辑" placement="top">
                                <el-button
                                        @click="clickToWhite(scope.row)"
                                        size="mini">拉白
                                </el-button>
                            </el-tooltip>


                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination
                    v-show="topshow"
                    :current-page="listQ.page"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="listQ.psize"
                    :total="total"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            />
        </el-card>

        <div class="echarts" v-if="city.title.length>0">
            <div style="width: 45%">
                <div>TOP城市排行
                    <el-button
                            type="primary"
                            size="mini"
                            @click="handleTop(city,'TOP城市')"
                    >更多
                    </el-button>
                </div>
                <Test v-if="city.title.length>0" :provinces="city" title="">
                </Test>
            </div>

            <div style="width: 45%" v-if="provinces.title.length>0">
                <div>TOP省份订单数
                    <el-button
                            type="primary"
                            size="mini"
                            @click="handleTop(provinces,'TOP省份')"
                    >更多
                    </el-button>
                </div>
                <Test v-if="provinces.title.length>0" :provinces="provinces" title=""></Test>
            </div>
            <div style="width: 45%" v-if="salesman.title.length>0">
                <div>TOP业务员订单数
                    <el-button
                            type="primary"
                            size="mini"
                            @click="handleTop(salesman,'TOP业务员')"
                    >更多
                    </el-button>
                </div>
                <Test v-if="salesman.title.length>0" :provinces="salesman" title=""></Test>
            </div>
            <div style="width: 45%" v-if="product.title.length>0">
                <div>TOP产品订单数
                    <el-button
                            type="primary"
                            size="mini"
                            @click="handleTop(product,'TOP产品')"
                    >更多
                    </el-button>
                </div>
                <Test v-if="product.title.length>0" :provinces="product" title=""></Test>
            </div>
        </div>


        <!--拉黑-->
        <el-dialog
                title="拉黑门店"
                :visible.sync="BlockVisible"
                width="30%"
                :before-close="clickToBlock">
            <el-cascader
                    v-model="backvalue"
                    :options="options"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"></el-cascader>
            <div style="text-align: center;width: 100%;margin-top: 30px" v-if="shop.blacklist===2">
                市场拉黑({{shop.marketday<356?shop.marketday+'天后到期':'永久'}})

            </div>
            <div style="text-align: center;width: 100%;margin-top: 30px" v-if="shop.ecblacklist==3">
                电商拉黑
                <!--{{shop.ecblackday}}-->
                ({{shop.ecmarketday<356?shop.ecmarketday+'天后到期':'永久'}})
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="BlockVisible = false">取 消</el-button>
    <el-button type="primary" size="mini" @click="handleBack">确 定</el-button>
  </span>
        </el-dialog>

        <el-dialog
                title="门店拉白"
                :visible.sync="whiteVisible"
                width="30%"
                :before-close="clickToWhite">
            <div style="text-align: center;width: 100%;margin-top: 30px" v-if="shop.blacklist===2">
                <el-button type="primary" @click="handelWhite('ma')">
                    市场拉白({{shop.marketday<356?shop.marketday+'天后到期':'永久'}})
                </el-button>
            </div>
            <div style="text-align: center;width: 100%;margin-top: 30px" v-if="shop.ecblacklist===3">
                <el-button type="primary" @click="handelWhite('ec')">
                    电商拉白
                    ({{shop.ecmarketday<356?shop.ecmarketday+'天后到期':'永久'}})
                </el-button>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="whiteVisible = false">关闭</el-button>
  </span>
        </el-dialog>

        <TableTopView ref="tableTopview"></TableTopView>
        <Show ref="ShowAdmin"></Show>
    </div>


</template>

<script>
    import {GetHomeByData, GetTop, GetShopByList} from '@/api/home'
    import Test from './top/test'

    import {PostRecomBySet} from '@/api/shop'

    import TableView from './table/index'

    import {
        PostBlackByUpdate,
        PostWhiteByUpdate,


    } from '@/api/shop'
    import TableTopView from './table/toptable'

    import Show from './top/show'

    export default {
        name: 'Index',
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                topshow: false,
                listQuery: {
                    time: [],
                },
                total: 0,
                listQ: {
                    time: [],
                    page: 1,
                    limit: 10,
                },
                ordersum: 0,
                timesum: 0,
                provinces: {},
                product: {},
                salesman: {},
                activeName: '-1',
                shop: [],
                statistical: {
                    order: 0,
                    Demand: 0
                },
                city: {},
                order: [],
                backvalue: undefined,
                whiteVisible: false,
                BlockVisible: false,
                backtemp: {},
                options: [
                    {
                        value: 2,
                        label: '市场',
                        children: [{
                            value: 100000,
                            label: '永久'
                        }, {
                            value: 7,
                            label: '七天'
                        }, {
                            value: 30,
                            label: '一个月'
                        }, {
                            value: 90,
                            label: '三个月'
                        }, {
                            value: 365,
                            label: '1年'
                        }
                        ]
                    }, {
                        value: 3,
                        label: '电商',
                        children: [{
                            value: 100000,
                            label: '永久'
                        }, {
                            value: 7,
                            label: '七天'
                        }, {
                            value: 30,
                            label: '一个月'
                        }, {
                            value: 90,
                            label: '三个月'
                        }, {
                            value: 365,
                            label: '1年'
                        }
                        ]
                    }]
            }

        },

        components: {
            Test,
            TableView,
            TableTopView,
            Show
        },
        provinces: [],
        filters: {
            book(str) {
                if (str === 1) {
                    return '宝典'
                } else {
                    return ''
                }
            },
        },
        created() {
            this.getdata()
            this.handelShop()
        },
        methods: {
            handleDerive() {
                this.$refs.ShowAdmin.handleShow()
            },
            handelShow() {
                this.$router.push('/situation/evenshop')
                // this.topshow = true
            },
            handelShop() {
                this.listQ.time = this.listQuery.time
                GetShopByList(this.listQ).then(res => {
                    this.total = res.data.total
                    this.shop = res.data.shop
                })

            },
            handleTop(data, title) {
                this.$refs.tableTopview.handleView(data, title)
            },
            handleSizeChange(val) {
                this.listQ.limit = val
                this.handelShop()
            },
            handleCurrentChange(val) {
                this.listQ.page = val
                this.handelShop()
            },
            handelSet(row, type) {
                console.log(row)
                var temp = {
                    id: row.id,
                    val: 0,
                }
                if (type === 'mk_rec') {
                    temp.field = 'mk_rec'
                    console.log(row.mk_rec, 3)
                    if (row.mk_rec === 2) {
                        temp.val = 1
                    } else {
                        temp.val = 2
                    }

                }
                if (type === 'ec_rec') {
                    temp.field = 'ec_rec'
                    console.log(row.mk_rec, 2)
                    if (row.ec_rec === 2) {
                        temp.val = 1
                    } else {
                        temp.val = 2
                    }
                }
                PostRecomBySet(temp).then(res => {
                    this.getdata()
                })
            },
            handleChange(value) {
                this.day = value[1]
                console.log(value[0])
                if (value[0] === 2) {
                    this.backtemp.blacklist = value[0]
                    this.backtemp.blackday = value[1]
                    this.backtemp.id = this.shop.id
                    this.backtemp.ecblacklist = undefined
                    this.backtemp.ecblackday = undefined
                }
                if (value[0] === 3) {
                    this.backtemp.ecblacklist = value[0]
                    this.backtemp.ecblackday = value[1]
                    this.backtemp.blacklist = undefined
                    this.backtemp.blackday = undefined
                    this.backtemp.id = this.shop.id
                }

            },
            toShop(item) {
                this.BlockVisible = true;
                this.shop = item;
            },
            handelWhite(type) {
                //市场拉白
                var tmep = {}
                if (type === 'ma') {
                    var temp = {
                        id: this.shop.id,
                        blacklist: 1,
                        blackday: 0,
                        blackend: 0
                    }
                }
                if (type === 'ec') {
                    var temp = {
                        id: this.shop.id,
                        ecblacklist: 1,
                        ecblackday: 0,
                        ecblackend: 0
                    }
                }
                PostWhiteByUpdate(temp).then(res => {
                    this.$message.success('拉白成功')
                    this.getdata()
                    this.whiteVisible = false
                })

            },
            handleBack() {
                const _this = this
                var day = this.day
                if (day === 100000) {
                    day = '永久'
                } else {
                    day = day + '天'
                }
                this.$confirm('此操作将该门店 ' + day + ' 拉黑, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    PostBlackByUpdate(this.backtemp).then(res => {
                        console.log(res)
                        _this.BlockVisible = !this.BlockVisible
                        this.$message.success('拉黑成功')
                        this.getdata()
                    })
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            clickToWhite(item) {
                this.shop = item
                this.whiteVisible = !this.whiteVisible
            },
            clickToBlock() {
                this.BlockVisible = false
            },
            handleFilter() {
                this.getdata()
                this.handelShop()
            },
            handleDownload() {

            },
            handleClick(e) {
                this.getdata();
            },
            getdata() {

                GetTop(this.listQuery).then(res => {
                    this.provinces = res.data.provinces
                    this.salesman = res.data.salesman
                    this.product = res.data.product
                    this.city = res.data.city
                    this.ordersum = res.data.ordersum
                    this.timesum = res.data.timesum
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .statistical {
        display: flex;
        flex-direction: row;
        color: #fff;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        margin-left: 20%;

        .item-st {
            background: hsla(234, 80%, 74%, 1);
            height: 80px;
            width: 268px;
            box-shadow: 0px 0px 5px 0px rgba(51, 51, 51, 0.28);
            border-radius: 10px;
            margin-right: 30px;

            .title {
                padding: 10px;
                padding-left: 20px;
            }

            .sj {
                width: 100%;
                text-align: center;
                font-size: 30px;
                font-weight: bold;
            }

        }

    }

    .echarts {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .filter-container {
        padding: 50px;
        padding-top: 10px;
    }

    .bc {
        margin-bottom: 50px;
    }

    .filter-container {
        text-align: center;
    }

    .top > > > .el-tabs__content {
        height: 0px !important;
    }
</style>
