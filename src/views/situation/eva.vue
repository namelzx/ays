<template>
    <div class="app-container tp">
        <div class="filter-container ">
            <el-form :inline="true" :model="listQuery">
                <el-date-picker
                        v-model="listQuery.time"
                        type="datetimerange"
                        size="mini"
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
            </el-form>
        </div>
        <el-tabs v-model="tabactiveName" @tab-click="handleTab">
            <el-tab-pane label="客服" name="order">
                <el-table
                        :data="order"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            v-if="tabactiveName==='order'"
                            prop="userName"
                            label="客服"
                            width="180">
                    </el-table-column>

                    <el-table-column
                            v-if="tabactiveName==='shop'"
                            prop="shopname"
                            label="店铺"
                            width="180">
                    </el-table-column>


                    <el-table-column
                            v-if="tabactiveName==='product'"
                            prop="product_title"
                            label="产品"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="整体评分"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            class="link-type"

                            label="1星">
                        <template slot-scope="scope">
                            <el-link class="link-type" @click="handleView(scope.row,1)">{{scope.row.one}}</el-link>

                        </template>
                    </el-table-column>
                    <el-table-column
                            class="link-type"

                            prop="two"
                            label="2星">
                        <template slot-scope="scope">
                            <el-link class="link-type" @click="handleView(scope.row,2)">{{scope.row.two}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            class="link-type"

                            prop="three"
                            label="3星">
                        <template slot-scope="scope">
                            <el-link class="link-type" @click="handleView(scope.row,3)">{{scope.row.three}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            class="link-type"

                            prop="four"
                            label="4星">
                        <template slot-scope="scope">
                            <el-link class="link-type" @click="handleView(scope.row,4)">{{scope.row.four}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            class="link-type"

                            prop="five"
                            label="5星">
                        <template slot-scope="scope">
                            <el-link class="link-type" @click="handleView(scope.row,5)">{{scope.row.five}}</el-link>
                        </template>

                    </el-table-column>

                </el-table>
            </el-tab-pane>
            <el-tab-pane label="门店" name="shop">
                <el-table
                        :data="order"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            v-if="tabactiveName==='order'"
                            prop="userName"
                            label="客服"
                            width="180">
                    </el-table-column>

                    <el-table-column
                            v-if="tabactiveName==='shop'"
                            prop="shopname"
                            label="店铺"
                            width="180">
                    </el-table-column>


                    <el-table-column
                            v-if="tabactiveName==='product'"
                            prop="product_title"
                            label="产品"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="整体评分"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            class="link-type"

                            label="1星">
                        <template slot-scope="scope">
                            <el-link class="link-type" @click="handleView(scope.row,1)">{{scope.row.one}}</el-link>

                        </template>
                    </el-table-column>
                    <el-table-column
                            class="link-type"

                            prop="two"
                            label="2星">
                        <template slot-scope="scope">
                            <el-link class="link-type" @click="handleView(scope.row,2)">{{scope.row.two}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            class="link-type"

                            prop="three"
                            label="3星">
                        <template slot-scope="scope">
                            <el-link class="link-type" @click="handleView(scope.row,3)">{{scope.row.three}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            class="link-type"

                            prop="four"
                            label="4星">
                        <template slot-scope="scope">
                            <el-link class="link-type" @click="handleView(scope.row,4)">{{scope.row.four}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            class="link-type"

                            prop="five"
                            label="5星">
                        <template slot-scope="scope">
                            <el-link class="link-type" @click="handleView(scope.row,5)">{{scope.row.five}}</el-link>
                        </template>

                    </el-table-column>

                </el-table>
            </el-tab-pane>
            <el-tab-pane label="产品" name="product">
                <el-table
                        :data="order"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            v-if="tabactiveName==='order'"
                            prop="userName"
                            label="客服"
                            width="180">
                    </el-table-column>

                    <el-table-column
                            v-if="tabactiveName==='shop'"
                            prop="shopname"
                            label="店铺"
                            width="180">
                    </el-table-column>


                    <el-table-column
                            v-if="tabactiveName==='product'"
                            prop="product_title"
                            label="产品"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="整体评分"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            class="link-type"

                            label="1星">
                        <template slot-scope="scope">
                            <el-link class="link-type" @click="handleView(scope.row,1)">{{scope.row.one}}</el-link>

                        </template>
                    </el-table-column>
                    <el-table-column
                            class="link-type"

                            prop="two"
                            label="2星">
                        <template slot-scope="scope">
                            <el-link class="link-type" @click="handleView(scope.row,2)">{{scope.row.two}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            class="link-type"

                            prop="three"
                            label="3星">
                        <template slot-scope="scope">
                            <el-link class="link-type" @click="handleView(scope.row,3)">{{scope.row.three}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            class="link-type"

                            prop="four"
                            label="4星">
                        <template slot-scope="scope">
                            <el-link class="link-type" @click="handleView(scope.row,4)">{{scope.row.four}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            class="link-type"

                            prop="five"
                            label="5星">
                        <template slot-scope="scope">
                            <el-link class="link-type" @click="handleView(scope.row,5)">{{scope.row.five}}</el-link>
                        </template>

                    </el-table-column>

                </el-table>
            </el-tab-pane>
        </el-tabs>

        <table-view ref="tableview"></table-view>


        <div class="pageclass">
            <div class="pagination-container page">
                <el-pagination
                        :current-page="listQuery.page"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="listQuery.limit"
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
    import {GetHomeByData, GetOrderByservice, GetOrderByShop, GetOrderByServer} from '@/api/home'
    import TableView from './table/index'

    export default {
        name: 'Index',
        data() {
            return {

                ordersum: 0,
                timesum: 0,
                tabactiveName: 'shop',
                activeName: 'shop',
                datalist: [],
                total: 0,
                listQuery: {
                    limit: 20,
                    page: 1
                },
                statistical: {
                    order: 0,
                    Demand: 0
                },
                order: [],
            }
        },
        created() {
            this.getdata()
        },
        components: {
            TableView
        },
        methods: {
            handleFilter() {
                let that = this;
                if (this.activeName === 'shop') {
                    that.order = []
                    GetOrderByShop(this.listQuery).then(res => {
                        that.order = res.data.data
                        that.ordersum = res.data.star
                        that.timesum = res.data.starstar
                    })
                }
                if (this.activeName === 'product') {
                    that.order = []
                    GetOrderByservice(this.listQuery).then(res => {
                        that.order = res.data
                    })
                }
                if (this.activeName === 'order') {
                    that.order = []
                    GetOrderByServer(this.listQuery).then(res => {
                        that.order = res.data
                    })
                }
            },
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.handelShop()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.handelShop()
            },

            handleView(row, star) {
                this.$refs.tableview.handleView(row, this.tabactiveName, star);
            },
            handleTab(e) {
                let that = this;
                this.activeName = e.name
                that.order = []
                that.total = 0;
                if (e.name === 'shop') {

                    GetOrderByShop(this.listQuery).then(res => {
                        that.order = res.data.data.data
                        that.total = res.data.data.total
                        that.ordersum = res.data.star
                        that.timesum = res.data.starstar
                    })
                }
                if (e.name === 'product') {
                    that.order = []
                    GetOrderByservice(this.listQuery).then(res => {
                        that.order = res.data.data;
                        that.total = res.data.total
                    })
                }
                if (e.name === 'order') {
                    that.order = []
                    GetOrderByServer(this.listQuery).then(res => {
                        that.order = res.data.data
                        that.total = res.data.total
                    })
                }
            },
            handleClick(e) {
                this.getdata();
            },
            getdata() {
                let that = this;
                GetOrderByShop(this.listQuery).then(res => {
                    console.log(res)
                    that.order = res.data.data.data
                    that.total = res.data.data.total
                    that.ordersum = res.data.star
                    that.timesum = res.data.starstar
                })

            }
        }
    }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
    .tp .el-tabs__content {
        height: 0px !important;
    }

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

    .link-type {
        color: #1482f0 !important;
    }

    .filter-container {
        text-align: center;
    }

    .top > > > .el-tabs__content {
        height: 0px !important;
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
