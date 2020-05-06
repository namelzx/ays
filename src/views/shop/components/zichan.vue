<template>
  <div class="zichan-container">
    <!--<div class="income-container">-->
    <!--<div class="income-wrap">-->
    <!--<div class="income-item">-->
    <!--<div class="item-top">-->
    <!--<div class="top-title">总资产</div>-->
    <!--<div><span>¥</span>{{balance}}</div>-->
    <!--</div>-->
    <!--<div class="item-num total">-->
    <!--<span>账户余额</span>-->
    <!--<span class="cash">¥{{balance}}</span>-->
    <!--<span @click="handelbalance"> 修改</span>-->
    <!--</div>-->
    <!--<div class="item-num total">-->
    <!--<span>保证金</span>-->
    <!--<span class="cash">¥{{ensure_price}}</span>-->
    <!--<span @click="handelensure">修改</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="income-wrap">-->
    <!--<div class="income-item">-->
    <!--<div class="item-top">-->
    <!--<div class="top-title">本月收入</div>-->
    <!--<div><span>¥</span>{{y_sum}}</div>-->
    <!--</div>-->
    <!--<div class="item-num">-->
    <!--<span>安装费</span>-->
    <!--<span class="cash">¥{{y_sum}}</span>-->
    <!--</div>-->
    <!--<div class="item-num">-->
    <!--<span>营销订单</span>-->
    <!--<span class="cash">¥0</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="income-wrap">-->
    <!--<div class="income-item">-->
    <!--<div class="item-top">-->
    <!--<div class="top-title">安装</div>-->
    <!--</div>-->
    <!--<div class="item-num">-->
    <!--<span>待入帐金额</span>-->
    <!--<span class="cash">¥{{ins_cost}}</span>-->
    <!--</div>-->
    <!--<div class="item-num">-->
    <!--<span>已入帐金额</span>-->
    <!--<span class="cash">¥{{set_cost}}</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="income-wrap">-->
    <!--<div class="income-item">-->
    <!--<div class="item-top">-->
    <!--<div class="top-title">营销</div>-->
    <!--</div>-->
    <!--<div class="item-num">-->
    <!--<span>待入帐金额</span>-->
    <!--<span class="cash">¥0</span>-->
    <!--</div>-->
    <!--<div class="item-num">-->
    <!--<span>已入帐金额</span>-->
    <!--<span class="cash">¥0</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="income-form">
      <div class="income-search">
        <div class="search-item">
          <div class="label">时间：</div>
          <div class="value">

            <el-date-picker
              v-model="listQuery.create_time"
              type="date"
              clear-icon
              prefix-icon="33"
              size="mini"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
        <div class="search-item">
          <div class="label">内容：</div>
          <div class="value">
            <el-input v-model="listQuery.title" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="search-item">
          <div class="label">收入：</div>
          <div class="value">
            <el-input type="number" v-model="listQuery.income" placeholder="请输入金额"></el-input>
          </div>
        </div>
        <div class="search-item">
          <div class="label">支出：</div>
          <div class="value">
            <el-input type="number" v-model="listQuery.outcome" placeholder="请输入金额"></el-input>
          </div>
        </div>
        <div class="search-item">
          <el-button size="mini" type="primary" @click="handleFilterClear"> 搜索</el-button>
          <!--<div class="search-btn" @click="clickToSearch">搜索</div>-->
        </div>
      </div>
      <div class="income-table">

        <el-table
          :data="tableData"
          stripe
          :header-row-style="headStyle"
          :row-style="rowStyle"
          style="width: 100%">
          <el-table-column

            label="时间"
            min-width="180">
            <template slot-scope="scope">
              {{ scope.row.create_time|sub }}

            </template>
          </el-table-column>
          <el-table-column
            prop="price_type"
            label="类型"
            min-width="180">
            <template slot-scope="scope">
              {{ scope.row.price_type|price_type }}

            </template>
          </el-table-column>

          <el-table-column
            prop="title"
            label="内容"
            min-width="300">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
<!--          <el-table-column-->
<!--            label="变动金额">-->
<!--            <template slot-scope="scope">-->
<!--              <span v-if="scope.row.price_type===1">-->
<!--                  +{{ scope.row.price }}-->
<!--              </span>-->
<!--              <span v-else>-->
<!--               -{{ scope.row.price }}-->
<!--            </span>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="balance"-->
<!--            label="账户余额">-->

<!--            <template slot-scope="scope">-->
<!--              <span v-if="scope.row.balance ">-->
<!--                {{ scope.row.balance }}-->
<!--              </span>-->
<!--              <span v-else>-->
<!--                0-->
<!--              </span>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="total"-->
<!--            label="总资产">-->
<!--            <template slot-scope="scope">-->
<!--                 <span v-if="scope.row.balance ">-->
<!--              {{parseFloat(scope.row.balance+shop.ensure_price)}}-->
<!--              </span>-->
<!--              <span v-else>-->
<!--                0-->
<!--              </span>-->

<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
      </div>
    </div>
    <div class="income-pagination">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.limit" :total="total" background
                     layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"/>
    </div>

    <el-dialog
      title="修改余额"
      :visible.sync="BackoffVisible"
      width="30%"
      :before-close="handelbalance">

      <div class="return">
        <el-form class="form-container" label-width="70px">
          <el-form-item label="修改原因">

            <el-row :gutter="20">
              <el-col :span="20">
                <el-input size="mini" v-model="returned.title"></el-input>

              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>

            <el-row :gutter="20">
              <el-col :span="20">
                <el-radio-group size="mini" v-model="returned.type">
                  <el-radio :label="1">增加金额</el-radio>
                  <el-radio :label="2">减少金额</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>

          </el-form-item>

          <el-form-item label="修改金额">

            <el-row :gutter="20">
              <el-col :span="20">
                <el-input size="mini" v-model="returned.ins_cost"></el-input>

              </el-col>
            </el-row>

          </el-form-item>


        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="BackoffVisible = false">关闭</el-button>
            <el-button type="primary" size="mini" @click="handeReturn">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog
      title="修改保证金"
      :visible.sync="ensureVisible"
      width="30%"
      :before-close="handelbalance">

      <div class="return">
        <el-form :model="ensure" class="form-container" label-width="70px">
          <el-form-item label="保证金:">
            <el-row :gutter="20">
              <el-col :span="20">
                <el-input size="mini" v-model="ensure.ensure_price"></el-input>
              </el-col>
            </el-row>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="ensureVisible = false">关闭</el-button>
            <el-button type="primary" size="mini" @click="handelPostensure">确 定</el-button>

    </span>
    </el-dialog>
  </div>

</template>

<script>
  import {
    GetShopByRunning,
    GetIDByDetails,
    PostDataBybalance,
    PostbalanceByUpdate,
    PostensureByUpdate
  } from '@/api/shop'

  export default {
    name: 'ZiChan',
    props: {
      id: {
        type: String,
        default: '0'
      }
    },
    data() {
      return {
        ensureVisible: false,
        ensure: {},
        BackoffVisible: false,
        shop: {},
        total: 0,
        listQuery: {
          page: 1,
          limit: 10,
          status: 'all',
          title: ''
        },
        returned: {
          ins_cost: 0,
          type: 1
        },
        balance: 0,
        y_sum: 0,
        ins_cost: 0,
        set_cost: 0,

        time: '',
        content: '',
        income: '',
        outcome: '',
        rowStyle: {
          fontSize: '12px',
          fontWeight: '400',
          color: '#333'
        },
        headStyle: {
          fontSize: '12px',
          fontWeight: '500',
          color: '#000'
        },
        tableData: [],
        currentPage: 1
      }
    },
    filters: {
      sub(str) {
        str = str.slice(0, 10)
        return str
      },
      price_type(str) {
        if (str === 1) {
          str = '收入'
        } else {
          str = '支出'
        }
        return str
      }
    },
    created() {
      this.listQuery.id = this.id

      this.getinfo()
      this.fetchList()
    },
    methods: {
      handelensure() {
        this.ensureVisible = !this.ensureVisible
      },
      handelPostensure() {
        this.ensure.shop_id = this.id

        PostensureByUpdate(this.ensure).then(res => {
          this.fetchList()
          this.handelensure()

        })
      },
      handeReturn() {
        this.returned.shop_id = this.id

        PostbalanceByUpdate(this.returned).then(res => {
          this.fetchList()
          this.handelbalance()
          this.returned.ins_cost = 0
          this.retainedRange.title = ''
        })
      },
      handelbalance() {
        this.BackoffVisible = !this.BackoffVisible
        console.log('修改余额')
      },
      getinfo() {
        GetIDByDetails(this.id).then(res => {
          this.shop = res.data
        })
      },
      handleFilterClear() {
        this.listQuery.page = 1
        this.fetchList()
      },
      fetchList() {
        console.log('执行')

        GetShopByRunning(this.listQuery).then(res => {
          this.tableData = res.data.data
          this.total = res.data.total
          this.ensure_price = res.data.ensure_price
          this.balance = res.data.balance
          this.y_sum = res.data.y_sum
          this.ins_cost = res.data.ins_cost
          this.set_cost = res.data.set_cost
        })
      },

      handleSizeChange(val) {
        this.listQuery.limit = val
        this.fetchList()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchList()
        console.log(`当前页: ${val}`)
      },
      clickToSearch() {
        let temp = {
          time: this.time,
          content: this.content,
          income: this.income,
          outcome: this.outcome
        }
        console.log(temp)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .zichan-container {
    padding: 30px 0;
    .income-container {
      display: flex;
      .income-wrap {
        background: #fff;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, .1);
        border-radius: 4px;
        margin: 5px;
        width: 25%;
        .income-item {
          overflow: hidden;
          padding-bottom: 10px;
          .item-top {
            overflow: hidden;
            text-align center;
            color: #CC0000;
            font-size: 18px;
            margin-bottom: 20px;
            min-height: 57px;
            font-weight: 500;
            span {
              font-size: 12px;
            }
            .top-title {
              color: #333;
              font-size: 14px;
              margin: 14px 0 10px;
              font-size: 12px;
            }
          }
          .item-num {
            margin: 8px 0;
            display: flex;
            padding: 0 4px 0 20px;
            font-size: 12px;
            align-items center;
            span {
              display: inline-block;
              width: 50%;
              &:nth-child(2) {
                text-align: right;
                padding-right: 10px;
                color: #CC0000;
                font-size: 14px;
              }
            }
          }
          .total {
            span {
              &:nth-child(2) {
                width: 60%;
              }
              &:nth-child(3) {
                width: 25%;
                text-align center;
                color: #009CFF;
                &:hover {
                  cursor: pointer;
                }

              }
            }
          }
        }
      }
    }
    .income-form {
      margin: 20px 5px;
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, .1);
      padding: 14px 20px;
      border-radius: 4px;
      .income-search {
        display: flex;
        .search-item >>> .el-input__inner {
          height 26px;
          font-size: 12px;
          padding: 0 10px;
        }
        .search-item {
          display: flex;
          align-items center;
          margin-right: 26px;
          /*width: 18%;*/
          .label {
            font-size: 12px;
            padding-right: 4px;
            color: #333;
            font-weight: 400;
            width 30%;
          }
          .value {
            width 80%;
          }
          .search-btn {
            width: 30%;
            background: #009CFF;
            border: 1px solid #f5f5f5;
            text-align: center;
            border-radius: 4px;
            font-size: 12px;
            padding: 5px 1px;
            color: #fff;
            &:hover {
              cursor: pointer;
            }
          }
        }

      }
      .income-table {
        margin: 20px 0;
      }
    }
    .income-pagination {
      text-align center;
      margin: 20px 0;
    }
    .el-date-editor {
      width 180px !important;
      .el-input__inner {
        padding: 0 30px !important;
      }
    }
  }
</style>
