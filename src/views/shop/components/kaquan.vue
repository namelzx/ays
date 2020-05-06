<template>
  <div class="kaquan-container">
    <div class="mask" v-if="showPop">
      <div class="mask-box">
        <div class="mask-title"><span>删除卡券</span><span @click="clickToDelete"><i class="el-icon-close"></i></span>
        </div>
        <div class="mask-content">确定删除卡券？</div>
        <div class="mask-btns">
          <div class="confirm"  @click="confirmDel">确定</div>
          <div class="cancel" @click="clickToDelete">取消</div>
        </div>
      </div>
    </div>
    <div class="income-search">
      <div class="search-item">
        <div class="label">卡券类型：</div>
        <div class="value">
          <el-select v-model="star" placeholder="请选择">
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
        <div class="label">卡券名称：</div>
        <div class="value">
          <el-input v-model="name" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="search-item special">
        <div class="label">有效期：</div>
        <div class="value">
          <el-date-picker
            v-model="start_date"
            type="date"
            prefix-icon=""
            style="width: 100%;"
            placeholder="选择日期">
          </el-date-picker>
          <span style="font-size: 12px; margin: 0 10px;">至</span>
          <el-date-picker
            v-model="end_date"
            type="date"
            prefix-icon=""
            style="width: 100%;"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="search-item">
        <div class="search-btn" @click="clickToSearch">搜索</div>
      </div>
    </div>
    <div class="rate-content">
      <div class="select-bar">
        <div class="select-item" :class="{'active-item':curIndex === index }" @click="clickToItem(index)"
             v-for="(item,index) of selectBar"
             :key="index"><span>{{item.star}}</span><span>{{item.num}}</span></div>
      </div>
      <div class="kq-table">
        <el-table
          :data="tableData"
          stripe
          :header-row-style="headStyle"
          :row-style="rowStyle"
          style="width: 100%">
          <el-table-column
            prop="t_id"
            label="卡券ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="t_name"
            label="卡券名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="t_date"
            label="有效日期"
            width="300">
          </el-table-column>
          <el-table-column
            prop="t_status"
            label="卡券状态">
          </el-table-column>
          <el-table-column
            prop="t_type"
            label="卡券类型">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="clickToDetail(scope.$index, tableData)"
                type="text"
                style="color: #009CFF;"
                size="small">
                详情
              </el-button>
              <el-button
                @click.native.prevent="clickToDelete(scope.$index, tableData)"
                type="text"
                style="color:#E6A23C"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
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
</template>

<script>
  export default {
    name: "KaQuan",
    data() {
      return {
        star: '',
        name: '',
        start_date: '',
        end_date: '',
        options: [
          {
            value: '代金券',
            label: '代金券'
          }, {
            value: '抵扣券',
            label: '抵扣券'
          }, {
            value: '通用券',
            label: '通用券'
          }
        ],
        selectBar: [
          {star: '全部', num: '5000'},
          {star: '展示中', num: '1000'},
          {star: '已过期', num: '1000'},
          {star: '已删除', num: '1000'},

        ],
        curIndex: 0,
        rowStyle: {
          fontSize: '12px',
          fontWeight: '400',
          color: '#333',
          textAlign: 'center'
        },
        headStyle: {
          fontSize: '12px',
          fontWeight: '500',
          color: '#000',
          textAlign: 'center'
        },
        tableData: [
          {
            t_id: '123456',
            t_name: '满400减800代金券',
            t_date: '自领取之日50天有效',
            t_status: '展示中',
            t_type: '代金券'
          }, {
            t_id: '123456',
            t_name: '500代金券',
            t_date: '2019.11.11-2019.12.12',
            t_status: '展示中',
            t_type: '代金券'
          }, {
            t_id: '123456',
            t_name: '300抵600抵扣券',
            t_date: '2019.11.11-2019.12.12',
            t_status: '展示中',
            t_type: '抵扣券'
          }, {
            t_id: '123456',
            t_name: '灯光免费检测券',
            t_date: '自领取之日50天有效',
            t_status: '展示中',
            t_type: '灯光免费检测券'
          },
          {
            t_id: '123456',
            t_name: '满400减800代金券',
            t_date: '自领取之日50天有效',
            t_status: '展示中',
            t_type: '代金券'
          }
        ],
        currentPage: 1,
        showPop: false
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
          star: this.star,
          date: this.date,
        }
        console.log(temp);
      },
      clickToItem(idx) {
        this.curIndex = idx
      },
      clickToDelete() {
        this.showPop = !this.showPop
      },
      confirmDel() {
        this.$message.success('删除成功')
        this.showPop= !this.showPop
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
      margin: 16% auto;
      width: 24%;
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
        text-align: center;
        color: #333;
        font-size: 14px;
      }
      .mask-btns {
        display: flex;
        margin-left: 50%;
        width: 50%;
        padding: 14px 0;
        font-size:12px;
        .confirm {
          border:1px solid #2589FF;
          background #2589FF;
          color: #fff;
          padding: 4px 12px;
          border-radius: 4px;
          &:hover {
            cursor: pointer;
          }
        }
        .cancel {
          border:1px solid #999999;
          background #fff;
          color: #999999;
          padding: 4px 12px;
          border-radius: 4px;
          margin-left:20px;
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
      width: 20%;
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
    .special {
      width 34%;
      .value {
        display: flex;
        align-items center;
      }
    }

  }

  .rate-content {
    margin: 20px 5px;
    border: 1px solid #f5f5f5;
    box-shadow: 0 0 5px 0 rgba(53, 53, 53, .28);
    .select-bar {
      display: flex;
      padding: 0 20px;

      border-bottom: 1px solid #f5f5f5;
      .select-item {
        margin-right: 20px;
        font-size: 12px;
        color: #333;
        font-weight: 500;
        padding: 12px 0;
        border-bottom: 2px solid transparent;
        transition all .6s;
        &:hover {
          cursor: pointer;
        }
        span {
          &:nth-child(2) {
            color: #CC0000;
            margin-left: 4px;
          }
        }

      }
      .active-item {
        border-bottom: 2px solid #009CFF;
        color: #009CFF;
        span {
          color: #009CFF !important;
        }
      }
    }
    .kq-table {
      padding: 0 12px;
    }
  }
  .income-pagination {
    text-align center;
    margin: 20px 0;
  }
</style>
