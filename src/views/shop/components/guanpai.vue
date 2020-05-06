<template>

  <div class="anzhuang-container">
    <div class="mask" v-if="showOrder">
      <div class="mask-box">
        <div class="mask-title"><span>订单详情</span><span @click="clickToDetail"><i
          class="el-icon-close"></i></span>
        </div>
        <div class="mask-content">
          <div class="mask-detail">
            <div class="detail-text">状态</div>
            <div class="detail-value">已核销（已评价）</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">门店名称</div>
            <div class="detail-value">旋风灯改服务店</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">微信昵称</div>
            <div class="detail-value">As士大夫</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">门店地址</div>
            <div class="detail-value">浙江省 宁波市 慈溪市 明洲路677号</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">联系人</div>
            <div class="detail-value">张丽an</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">门店电话</div>
            <div class="detail-value">13566666666</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">联系手机</div>
            <div class="detail-value">13636326323</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">业 务 员</div>
            <div class="detail-value">黄某某 13566666666</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">车型</div>
            <div class="detail-value">本田 飞度 2015款1.5L天窗版</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">微信单号</div>
            <div class="detail-value">12121212122212121212</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">金额</div>
            <div class="detail-value">200</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">核 销 码</div>
            <div class="detail-value">1212121212</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">下单日期</div>
            <div class="detail-value">2019.08.08 12:00</div>
          </div>
        </div>

        <div class="mask-btns">
          <div class="cancel" @click="clickToDetail">关闭</div>
        </div>
      </div>
    </div>
    <div class="income-search">
      <div class="search-item">
        <div class="label">单号：</div>
        <div class="value">
          <el-input v-model="order_num" placeholder="请输入单号"></el-input>
        </div>
      </div>
      <div class="search-item">
        <div class="label">状态：</div>
        <div class="value">
          <el-select v-model="status" placeholder="请选择">
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
            v-model="date"
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
          <el-input v-model="rate" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="search-item">
        <div class="search-btn" @click="clickToSearch">搜索</div>
      </div>
    </div>
    <div class="income-form">
      <div class="income-table">
        <div class="table-summary">
          <div class="order-sum"><span>订单数：</span><span>108</span></div>
          <div class="order-money"><span>金额：</span><span>100000</span></div>
        </div>
        <el-table
          :data="tableData"
          stripe
          :header-row-style="headStyle"
          :row-style="rowStyle"
          style="width: 100%">
          <el-table-column
            prop="order_num"
            label="单号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="fee"
            label="费用"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
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
                @click.native.prevent="clickToDetail(scope.$index, tableData)"
                type="text"
                size="small">
                详情
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div class="income-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Anzhuang",
    data() {
      return {
        order_num: '',
        status: '',
        date: '',
        rate: '',
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
        options: [
          {
            value: '待核销',
            label: '待核销'
          }, {
            value: '已核销',
            label: '已核销'
          }, {
            value: '已核销（已评价）',
            label: '已核销（已评价）'
          }
        ],
        tableData: [
          {
            order_num: 'as123456',
            fee: '800',
            date: '2019.11.21  12:00:08',
            status: '待核销',
            action: '详情'
          }, {
            order_num: 'as123456',
            fee: '800',
            date: '2019.11.21  12:00:08',
            status: '待核销',
            action: '详情'
          }, {
            order_num: 'as123456',
            fee: '800',
            date: '2019.11.21  12:00:08',
            status: '已核销',
            action: '详情'
          }, {
            order_num: 'as123456',
            fee: '800',
            date: '2019.11.21  12:00:08',
            status: '已核销',
            action: '详情'
          },
          {
            order_num: 'as123456',
            fee: '800',
            date: '2019.11.21  12:00:08',
            status: '已核销（已评价）',
            action: '详情'
          },

        ],
        currentPage: 1,
        showOrder: false,
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      clickToSearch() {
        let temp = {
          order_num: this.order_num,
          status: this.status,
          date: this.date,
          rate: this.rate,
        }
        console.log(temp);
      },
      clickToDetail() {
        this.showOrder = !this.showOrder
      },
      deleteRow(index, rows) {
        console.log(index, rows);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .84);
    z-index: 9;
    .mask-box {
      background: #fff;
      margin: 10% auto;
      width: 40%;
      border-radius: 8px;
      .mask-title {
        display: flex;
        padding: 14px 10px;
        font-size: 14px;
        color: #333;
        span {
          width: 50%;
          &:nth-child(2) {
            text-align: right;
            padding-right: 10px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
      .mask-content {
        padding: 17px;
        color: #333;
        font-size: 12px;
        display: flex;
        flex-wrap: wrap;
        .mask-detail {
          display: flex;
          margin: 4px 10px;
          align-items center;
          width: 44%;

          .detail-text {
            width: 30%;
            color:#333333;
          }
          .detail-value {
            width: 70%;
            background: #EEEEEE;
            padding: 5px 0 5px 10px;
          }
        }

      }
      .mask-btns {
        display: flex;
        margin-left: 80%;
        width: 26%;
        padding: 14px 0;
        font-size: 12px;
        .confirm {
          border: 1px solid #2589FF;
          background #2589FF;
          color: #fff;
          padding: 4px 12px;
          border-radius: 4px;
          &:hover {
            cursor: pointer;
          }
        }
        .cancel {
          border: 1px solid #999999;
          background #fff;
          color: #999999;
          padding: 4px 12px;
          border-radius: 4px;
          margin-left: 20px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }

  }

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
