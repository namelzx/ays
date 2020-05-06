<template>
  <div class="anzhuang-container">
    <div class="income-search">
      <div class="search-item">
        <div class="label">单号：</div>
        <div class="value">
          <el-input v-model="listQuery.buy_order_no" placeholder="请输入单号"></el-input>
        </div>
      </div>
      <div class="search-item">
        <div class="label">状态：</div>
        <div class="value">
          <el-select v-model="listQuery.status" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="search-item">
        <div class="label">时间：</div>
        <div class="value">
          <el-date-picker
            clearable
            v-model="listQuery.create_time"
            type="date"
            prefix-icon=""
            style="width: 100%;"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="search-item">
        <div class="label">评价：</div>
        <div class="value">
          <el-input clearable v-model="rate" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="search-item">
        <el-button size="mini" type="primary" @click="handleFilterClear"> 搜索</el-button>

        <!--<div class="search-btn" @click="clickToSearch">搜索</div>-->
      </div>
    </div>
    <div class="income-form">

      <div class="income-table">
        <div class="table-summary">
          <div class="order-sum"><span>订单数：</span><span>{{total}}</span></div>
          <div class="order-money"><span>金额：</span><span>{{sumcost}}</span></div>
        </div>
        <el-table
          :data="tableData"
          stripe
          :header-row-style="headStyle"
          :row-style="rowStyle"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="单号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ins_cost"
            label="费用"
            width="180">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建日期"
            width="300">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="handelInfo(scope.row)"
                type="text"
                size="small">
                详情
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div class="income-pagination">
        <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]"
                       :page-size="listQuery.limit" :total="total" background
                       layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"/>
      </div>

      <OrderInfo v-if="infodialogVisible"  @handleInfoClose="handelInfoDialog" :postFrom="postFrom"
                 :dialogVisible="infodialogVisible"></OrderInfo>
    </div>
  </div>
</template>

<script>
  import { GetInstallByList } from '@/api/shop'
  import OrderInfo from './order/OrderInfo'

  export default {
    name: 'Anzhuang',
    props: {
      id: {
        type: String,
        default: 0
      }
    },
    components:{
      OrderInfo
    },
    data() {
      return {
        postFrom:{},
        infodialogVisible:false,
        order_num: '',
        status: '',
        date: '',
        rate: '',
        rowStyle: {
          fontSize: '12px',
          fontWeight: '400',
          color: '#333'
        },
        total: 0,
        sumcost: 0,
        listQuery: {
          page: 1,
          limit: 10,
          status: undefined,
          title: ''
        },
        headStyle: {
          fontSize: '12px',
          fontWeight: '500',
          color: '#000'
        },
        options: [
          {
            value: '2',
            label: '待确认（门店）'
          }, {
            value: '3',
            label: '待安装'
          }, {
            value: '4',
            label: '已安装'
          }, {
            value: '5',
            label: '财审1'
          }, {
            value: '6',
            label: '财审2'
          },
          {
            value: '7',
            label: '待结算'
          },
          {
            value: '8',
            label: '已结算'
          }
        ],
        tableData: [],
        currentPage: 1
      }
    },
    created() {
      this.fetchList()
    },
    methods: {

      handelInfoDialog() {
        this.infodialogVisible = !this.infodialogVisible
      },
      fetchList() {
        this.listQuery.id = this.id

        GetInstallByList(this.listQuery).then(res => {
          this.tableData = res.data.data
          this.total = res.data.total
          this.sumcost = res.data.sumcost
        })
      },
      handleFilterClear() {
        this.listQuery.page=1
        this.fetchList()
      },

      //打开详情
      handelInfo(row) {

        console.log(row)
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
        let lazada = this.postFrom.lazada_list
        this.postFrom.lazada_list = []

        for (let i = 0; i < lazada.length; i++) {
          this.postFrom.lazada_list.push(parseInt(lazada[i]))
        }
        this.infodialogVisible = !this.infodialogVisible

      },

      handleSizeChange(val) {
        this.listQuery.limit = val
        this.fetchList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchList()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },

      clickToSearch() {
        let temp = {
          order_num: this.order_num,
          status: this.status,
          date: this.date,
          rate: this.rate
        }
        console.log(temp)
      },
      deleteRow(index, rows) {
        console.log(index, rows)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .el-select-dropdown__item {
    color: #000;
    font-size: 12px;
  }

  .income-search {
    display: flex;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, .1);
    padding: 8px 20px;
    margin: 10px 5px;
    border-radius: 4px;
    .search-item >>> .el-input__inner {
      height 26px;
      font-size: 12px;
      padding: 0 10px;
    }
    .search-item {
      display: flex;
      align-items center;
      margin-right: 26px;
      width: 18%;
      .label {
        font-size: 12px;
        padding-right: 4px;
        color: #333;
        font-weight: 400;
        width 40%;
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

    .search-item >>> .el-input__icon {
      line-height 26px;
    }
    .search-item >>> .el-input__prefix {
      display none;
    }

  }

  .income-form {
    margin: 20px 5px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, .1);
    padding: 14px 20px;
    border-radius: 4px;

    .income-table {
      margin: 0 0 20px;
    }
    .table-summary {
      display: flex;
      margin: auto;
      padding: 20px 32%;
      border-bottom: 1px solid #F5F5F5;
      .order-sum, .order-money {
        width: 50%;
        text-align center;
        span {
          &:first-child {
            font-size: 12px;
            color: #333;
          }
          &:last-child {
            font-weight: 500;
            color: #CC0000;
          }
        }
      }
    }
  }

  .income-pagination {
    text-align center;
    margin: 20px 0;
  }
</style>
