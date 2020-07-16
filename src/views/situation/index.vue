<template>
    <div class="app-container top">
        <!--开发中-->
        <div class="statistical">
            <div class="item-st">
                <div class="title">待处理安装单</div>
                <div class="sj">{{statistical.order}}</div>
            </div>
            <div class="item-st" style="background: #8cc8ff">
                <div class="title">待处理门店需求</div>
                <div class="sj">{{statistical.Demand}}</div>
            </div>
        </div>

        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="昨天" name="-1"></el-tab-pane>
            <el-tab-pane label="近一周" name="-7"></el-tab-pane>
            <el-tab-pane label="近一个月" name="-30"></el-tab-pane>
            <el-tab-pane label="近三个月" name="-90"></el-tab-pane>
            <el-tab-pane label="近一年" name="-360"></el-tab-pane>
        </el-tabs>
        <el-table
                :data="order"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="userName"
                    label="客服"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="total"
                    label="整体评分"
                    width="180">
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
        <table-view ref="tableview"></table-view>

    </div>
</template>

<script>
    import {GetHomeByData, GetOrderByservice} from '@/api/home'
    import TableView from './table/index'

    export default {
        name: 'Index',
        data() {
            return {
                activeName: '-30',

                statistical: {
                    order: 0,
                    Demand: 0
                },
                order: [],
            }
        },
        components:{
            TableView
        },
        created() {
            this.getdata()
        },
        methods: {
            handleClick(e) {
                this.getdata();
            },
            handleView(row, star) {
                this.$refs.tableview.handleView(row, 'order', star);
            },
            getdata() {
                GetHomeByData(this.activeName).then(res => {
                    this.statistical = res.data.statistical
                    this.order = res.data.order
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .el-tabs__content {
        height: 0;
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
  .top>>>  .el-tabs__content{
        height: 0px !important;
    }

</style>
