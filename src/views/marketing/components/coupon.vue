<template>
  <div class="zichan-container">
    <div class="income-search">
      <div class="search-item">
        <div class="label">状态：</div>
        <div class="value">
          <el-select v-model="listQuery.status" placeholder="请选择">
            <el-option
                    v-for="item in statusop"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
            />
          </el-select>
        </div>
      </div>


      <div class="search-item">
        <div class="search-btn"  @click="handleFilter">搜索</div>
        <div class="search-btn"  @click="clickToNewTicket">新建</div>

      </div>


    </div>
    <div class="income-form">

      <div class="ticket-wrap">
        <div
                v-for="(item,index) of ticketList"
                :key="index"
                class="ticket-item"

        >
          <div  class="ticket-icon">
            <i class="el-icon-zoom-out" @click="clickTicket(item)" />
            <i class="el-icon-delete" @click="clickDelete(item)" />
          </div>

          <div class="ticket-owner">{{ item.owner }}</div>
          <div v-if="item.status === 1" class="ticket-img">
            <!-- 已发送 -->
            <img
                    src="https://kedand.oss-cn-beijing.aliyuncs.com/uploads/icon_%E5%8F%91%E9%80%81%E4%B8%AD%402x.png"
                    alt
            >
          </div>
          <div v-if="item.status === 2" class="ticket-img">
            <!-- 已过期 -->

            <img
                    src="https://kedand.oss-cn-beijing.aliyuncs.com/uploads/icon_%E5%B7%B2%E8%BF%87%E6%9C%9F%402x.png"
                    alt
            >
          </div>
          <div v-if="item.status === 3" class="ticket-img">
            <!-- 已删除 -->
            <img
                    src="https://kedand.oss-cn-beijing.aliyuncs.com/uploads/icon_%E5%B7%B2%E5%88%A0%E9%99%A4%402x.png"
                    alt
            >
          </div>
          <div v-if="item.status === 4" class="ticket-img">
            <!-- 已失效 -->
            <img
                    src="https://kedand.oss-cn-beijing.aliyuncs.com/uploads/icon_%E5%B7%B2%E5%A4%B1%E6%95%88%402x.png"
                    alt
            >
          </div>
          <div class="ticket-top">
            <div class="ticket-num">
              ¥
              <span>{{ item.price }}</span>
            </div>
            <div class="ticket-addition">
              <span>{{ item.title}}</span>
            </div>
          </div>
          <div class="ticket-center">
            <div v class="ticket-comment">说明：{{ item.desc }}</div>
          </div>
          <div class="ticket-bottom">
            <div class="ticket-expir">有效期{{ item.start_time|parseTime('{y}-{m}-{d}') }}-{{ item.end_time|parseTime('{y}-{m}-{d}') }}</div>
          </div>
        </div>
      </div>
      <!--<el-table-->
      <!--v-loading="loading"-->
      <!--:data="ticketList"-->
      <!--stripe-->
      <!--style="width: 100%">-->
      <!--<el-table-column-->
      <!--prop="title"-->
      <!--label="使用条件"-->
      <!--width="180">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="status"-->
      <!--label="使用有效期"-->
      <!--width="180">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->

      <!--label="发送期限">-->
      <!--<template slot-scope="scope">-->

      <!--<span>{{scope.row.start_time|parseTime('{y}-{m}-{d}')}}</span>-->
      <!-- - -->
      <!--<span>{{scope.row.end_time|parseTime('{y}-{m}-{d}')}}</span>-->

      <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column-->

      <!--label="发送卡卷">-->
      <!--<template slot-scope="scope">-->

      <!--<span>{{scope.row.price}}</span>-->

      <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column-->

      <!--label="管理">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button type="text">修改</el-button>-->
      <!--<el-button type="text">删除</el-button>-->

      <!--</template>-->
      <!--</el-table-column>-->
      <!--</el-table>-->
    </div>


    <div v-if="showTicket" class="mask">
      <div class="mask-box">
        <div class="mask-title">
          <span>优惠券详情</span>
          <span @click="clickTicket">
            <i class="el-icon-close"/>
          </span>
        </div>
        <div class="mask-content">
          <div class="mask-detail">
            <div class="detail-text">金额</div>
            <div class="detail-value">{{ curTicket.price }}</div>
          </div>

          <div class="mask-detail">
            <div class="detail-text">使用条件</div>
            <div class="detail-value">{{curTicket.title}}</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">状态</div>
            <div v-if="curTicket.status ===1" class="detail-value">待使用</div>
            <div v-if="curTicket.status ===2" class="detail-value">已使用</div>
            <div v-if="curTicket.status ===3" class="detail-value">已过期</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">有效期</div>
            <div class="detail-value">{{ curTicket.start_time|parseTime('{y}-{m}-{d}') }}-{{ curTicket.end_time|parseTime('{y}-{m}-{d}') }}</div>
          </div>
          <div class="mask-detail special">
            <div class="detail-text">使用说明</div>
            <div class="detail-value">{{curTicket.desc}}</div>
          </div>
        </div>
        <div class="mask-btns">
          <div class="cancel" @click="clickTicket">关闭</div>
        </div>
      </div>
    </div>

    <!-- 新建优惠券 -->


    <div v-if="showCoupon" class="show-discount">
      <div class="discount-warp">
        <!-- 关闭图标 -->
        <div class="close-icon" @click="headColse">
          <i class="el-icon-close"/>
        </div>
        <div class="title">新建优惠券</div>

        <div class="money">
          <div class="money-name">
            <span class="name-span">使用条件</span>
            <span>：</span>
          </div>
          <el-input v-model="postFrom.title" class="input-money" placeholder="请输入使用条件"/>
        </div>
        <div class="money">
          <div class="money-name">
            <span class="name-span">金额</span>
            <span>：</span>
          </div>
          <el-input v-model="postFrom.price" class="input-money" placeholder="请输入金额"/>
        </div>
        <div class="money">
          <div class="money-name">
            <span class="name-span">有效期</span>
            <span>：</span>
          </div>
          <div class="condition">
            <el-date-picker
              v-model="postFrom.period_time"
              size="mini"
              class="data-picker"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </div>

        <div class="money">
          <div class="money-name">
            <span class="name-span">发送对象</span>
            <span>：</span>
          </div>
          <div class="textarea">
            <el-select size="mini" v-model="postFrom.group" multiple placeholder="请选择">
              <el-option
                v-for="item in group"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>


        <div class="money" style="align-items:normal">
          <div class="money-name">
            <span class="name-span">使用说明</span>
            <span>：</span>
          </div>
          <div class="textarea">
            <el-input v-model="postFrom.desc" type="textarea" :rows="6" placeholder="请输入内容"/>
          </div>
        </div>

        <!-- 确定按钮 -->
        <div class="new_botton">
          <el-row>
            <el-button type="primary" size="mini" @click="headNewconfirm">确定新建</el-button>
            <el-button size="mini" @click="headNewcancel">取消</el-button>
          </el-row>
        </div>
      </div>
    </div>

    <div class="pageclass">
      <div class="pagination-container page">
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
    </div>
  </div>
</template>

<script>
  import {
    GetDataByList
  } from '@/api/shopgroup'
  import {
    GetcouponByList, PostDataByAdd,GetIdByDelete
  } from '@/api/platformcoupon'

  import {
    parseTime
  } from '@/utils'
  import { mapGetters } from "vuex";

  export default {
    name: 'ZiChan',
    data() {
      return {
        postFrom: {},
        group: [],
        date: '',
        date2: '',
        sortOpt: '',
        statusOpt: '',
        expirOpt: '',
        curTicket: '',
        showTicket: false,
        showCoupon: false, // 新建优惠券弹出层
        navbar: ['无金额限制', '最低消费'],
        navindex: 0,
        periodlist: ['固定日期', '领取生效，有效天数'],
        periodid: 0,
        statusop:[
          {
            value: 1,
            label: '发送中'
          },
          {
            value: 3,
            label: '已删除'
          },
          {
            value: 2,
            label: '已过期'
          },
        ],
        sort: [
          {
            value: '通用券',
            label: '通用券'
          },
          {
            value: '阿帕通用',
            label: '阿帕通用'
          },
          {
            value: '非阿帕通用',
            label: '非阿帕通用'
          }
        ],
        options: [
          {
            value: '已过期',
            label: '已过期'
          },
          {
            value: '发送中',
            label: '发送中'
          },
          {
            value: '已删除',
            label: '已删除'
          }
        ],
        expirTime: [
          {
            value: 0,
            label: '全部'
          },
          {
            value: 7,
            label: '7天内'
          },
          {
            value: 30,
            label: '30天内'
          }
        ],
        ticketList: [
          {
            id: 1,
            sub_money: '200',
            condition: '2599',
            owner: '阿帕专享',
            comment: [
              {
                text:
                  '此优惠券不与其他优惠券同时使用 此优惠券不与其他优惠券同时使用'
              },
              {
                text:
                  '此优惠券不与其他优惠券同时使用 此优惠券不与其他优惠券同时使用'
              }
            ],
            start_time: '2019.11.1 00:00',
            end_time: '2019.11.1 23:59',
            status: 1 // 未使用
          },
          {
            id: 2,
            sub_money: '200',
            condition: '2599',
            owner: '非阿帕专享',
            comment: [
              {
                text:
                  '此优惠券不与其他优惠券同时使用 此优惠券不与其他优惠券同时使用'
              }
            ],
            start_time: '2019.11.1 00:00',
            end_time: '2019.11.1 23:59',
            status: 2 // 已使用
          },
          {
            id: 3,
            sub_money: '200',
            condition: '2599',
            owner: '通用券',
            comment: [
              {
                text:
                  '此优惠券不与其他优惠券同时使用 此优惠券不与其他优惠券同时使用'
              },
              {
                text:
                  '此优惠券不与其他优惠券同时使用 此优惠券不与其他优惠券同时使用'
              }
            ],
            start_time: '2019.11.1 00:00',
            end_time: '2019.11.1 23:59',
            status: 3 // 过期
          },
          {
            id: 4,
            sub_money: '200',
            condition: '2599',
            owner: '通用券',
            comment: [
              {
                text:
                  '此优惠券不与其他优惠券同时使用 此优惠券不与其他优惠券同时使用'
              },
              {
                text:
                  '此优惠券不与其他优惠券同时使用 此优惠券不与其他优惠券同时使用'
              }
            ],
            start_time: '2019.11.1 00:00',
            end_time: '2019.11.1 23:59',
            status: 3 // 过期
          }
        ],
        currentPage: 1,
        showTime: false,
        total: 1,

        money: '', // 新建金额
        radio: '全部', // 新建发送对象
        impose: '', // 新建使用条件，最低消费金额
        value1: '', // 新建固定日期 ,
        month: '', // 新建有效天数
        textarea: '', // 新建使用说明
        loading:false,
        listQuery: {
          page: 1,
          limit: 10,
          status: undefined,
          title: '',
          sstatus: 'all'
        }
      }
    },
    computed: {
      ...mapGetters(["userinfo", "brand", "group"])
    },
    created() {
      let temp = {}
      GetDataByList(temp).then(res => {
        this.group = res.data
      })
      this.getlist()
    },
    methods: {
      clickDelete(row){
        this.$confirm('此操作将永久删除该优惠卷, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let index=this.ticketList.indexOf(row);
          // this.ticketList.splice(index,1);

          GetIdByDelete(row.id).then(res=>{
            this.ticketList[index].status=3
            this.$message.success('删除成功');

          })


        }).catch(() => {


        });

      },
      getlist() {
        this.loading=true
        GetcouponByList(this.listQuery).then(res => {
          this.ticketList = res.data.data
          this.total = res.data.total
          this.loading=false
        })
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getlist();
      },

      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getlist();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getlist();
      },

      clickToSearch() {
        const temp = {
          sort: this.sortOpt,
          status: this.statusOpt,
          expir: this.expirOpt
        }
        console.log(temp)
      },
      clickTicket(item) {
        if (item) {
          this.curTicket = item
        }
        this.showTicket = !this.showTicket
      },
      clickToPickTime() {
        this.showTime = !this.showTime
      },
      clickToNewTicket() {
        this.headColse()
      },
      clickToRec() {
        console.log(2)
      },
      clickToDelTicket() {
        console.log(3)
      },
      clickToDelRec() {
        console.log(4)
      },
      cilckNav(index) {
        this.navindex = index
      },
      cilckPeriodid(index) {
        this.periodid = index
      },
      headColse() {
        this.showCoupon = !this.showCoupon
      },
      // 确定新建
      headNewconfirm() {
        this.postFrom.sender_id=this.userinfo.id
        PostDataByAdd(this.postFrom).then(res => {
          console.log(res)
          this.postFrom={}
          this.$message.success('新建完成')
          this.getlist();
        })
        this.headColse()
      },
      headNewcancel() {
        this.headColse()
      }
    }
  }
</script>

<style lang="scss" scoped>
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

  .show-discount {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9;
    .discount-warp {
      width: 400px;

      background: #ffffff;
      margin: 100px auto 0;
      padding: 20px;
      border-radius: 5px;
      position: relative;
      .close-icon {
        position: absolute;
        right: 20px;
        top: 10px;
        cursor: pointer;
        i {
          font-size: 13px;
        }
      }
      .title {
        font-size: 12px;
      }
      .money {
        display: flex;
        font-size: 12px;
        align-items: center;
        margin-top: 15px;
        .money-name {
          display: flex;
          span {
            display: block;
          }
          .name-span {
            width: 50px;
            display: block;
            text-align-last: justify;
          }
        }

        .input-money {
          width: 70%;
          margin-left: 10px;
        }
        /deep/ .el-input--medium .el-input__inner {
          height: 30px !important;
          line-height: 30px;
          font-size: 12px;
        }
        .radio {
          margin-left: 10px;
          width: 70%;
          /deep/ .el-radio {
            margin-right: 10px;
          }
          /deep/ .el-radio__label {
            font-size: 12px;
          }
        }
        .condition {
          display: flex;
          height: 30px;
          line-height: 30px;
          margin-left: 10px;
          cursor: pointer;
          .condition-navbar {
            padding: 0 12px;
            border: 1px solid #dcdcdc;
          }
          .condition-navbar-active {
            padding: 0 12px;
            border: 1px solid #2489fe;
            color: #2489fe;
          }
        }

        .impose {
          display: flex;
          height: 30px;
          line-height: 30px;
          margin-left: 10px;
          .input-money {
            width: 25%;
            margin-left: 10px;
            margin-right: 10px;
          }
          /deep/ .el-input--medium .el-input__inner {
            height: 30px !important;
            line-height: 30px;
          }
        }
        .yx {
          margin-left: 25px;
        }

        .cuo {
          margin-left: 22px;
          .data-picker {
            width: 90%;
            height: 30px;
            line-height: 30px;
          }
          /deep/ .el-range-editor--medium .el-range__icon {
            line-height: 22px;
          }
          /deep/ .el-range-editor--medium .el-range-separator {
            line-height: 22px;
          }

          /deep/ .el-range-editor--medium .el-range-input {
            font-size: 12px;
          }
        }
        .textarea {
          width: 70%;
          margin-left: 10px;
          /deep/ .el-input--medium {
            font-size: 12px;
          }
        }
      }
      .new_botton {
        margin-top: 30px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
    }
  }

  .el-date-editor {
    width: 88%;
    font-size: 12px;
    color: #666;
    font-weight: 500;
  }

  .income-wrap > > > .el-date-editor input.el-input__inner {
    padding: 0;
    color: #666;
    font-size: 12px;
    height: 20px;
    text-align: center;
    border: none;
  }

  .income-wrap > > > .el-date-editor .el-input__prefix {
    display: none;
  }

  .income-wrap > > > .el-date-editor .el-input__suffix {
    display: none;
  }

  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9;

    .mask-box {
      background: #fff;
      margin: 10% auto;
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
        color: #333;
        font-size: 12px;

        .mask-detail {
          display: flex;
          margin: 10px 0;
          align-items: center;

          .detail-text {
            width: 24%;
          }

          .detail-value {
            width: 76%;
            background: #eeeeee;
            padding: 5px 0 5px 10px;
          }
        }

        .special {
          .detail-value {
            height: 50px;
          }
        }
      }

      .mask-btns {
        display: flex;
        margin-left: 70%;
        width: 26%;
        padding: 14px 0;
        font-size: 12px;

        .confirm {
          border: 1px solid #2589ff;
          background: #2589ff;
          color: #fff;
          padding: 4px 12px;
          border-radius: 4px;

          &:hover {
            cursor: pointer;
          }
        }

        .cancel {
          border: 1px solid #999999;
          background: #fff;
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

  .zichan-container {
    padding: 30px 0;

    .income-container {
      display: flex;
      justify-content: space-between;
      .income-wrap {
        background: #fff;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        margin: 5px;
        width: 24%;

        .income-item {
          overflow: hidden;
          padding-bottom: 10px;

          .item-top {
            overflow: hidden;
            text-align: center;
            color: #666;
            font-size: 12px;
            margin-bottom: 5px;
            min-height: 57px;
            font-weight: 500;

            span {
              font-size: 12px;
              margin-left: 5px;
            }

            .top-title {
              color: #333;
              font-size: 14px;
              margin: 14px 0 4px;
              font-size: 12px;
            }
          }

          .new-ticket {
            background: #009bff;
            width: 30%;
            margin: 30px auto 0 !important;
            padding: 5px 0;
            border-radius: 4px;
            font-size: 12px;
            color: #fff !important;

            &:hover {
              cursor: pointer;
            }
          }

          .item-num {
            margin: 5px 0;
            display: flex;
            padding: 0 4px 0 20px;
            font-size: 12px;
            align-items: center;

            span {
              display: inline-block;
              width: 50%;

              span {
                margin-left: 5px;
              }

              &:nth-child(2) {
                text-align: right;
                padding-right: 10px;
                color: #cc0000;
                font-size: 14px;
                /*font-family: fantasy;*/
              }
            }
          }

          .records {
            text-align: center;
            justify-content: center;
            padding: 0;
            color: #009bff;
            margin-top: 20px;

            &:hover {
              cursor: pointer;
            }
          }

          .total {
            span {
              &:nth-child(2) {
                width: 60%;
                font-size: 18px;
                font-weight: 500;
              }

              &:nth-child(3) {
                width: 25%;
                text-align: center;
                color: #009cff;

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
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
      padding: 14px 20px;
      border-radius: 4px;

      .income-search {
        display: flex;

        .search-item > > > .el-input__inner {
          height: 26px;
          font-size: 12px;
          padding: 0 10px;
        }

        .search-item {
          display: flex;
          align-items: center;
          // margin-right: 15px;
          width: 23%;
          .label {
            font-size: 12px;
            padding-right: 4px;
            color: #333;
            font-weight: 400;
          }
          .search-btn {
            width: 30%;
            background: #009cff;
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
        .search-item:nth-child(1) {
          margin-left: 3%;
        }
        .search-item:nth-child(4) {
          width: 20%;
        }

        .search-item > > > .el-input__icon {
          line-height: 26px;
        }

        .search-item > > > .el-input__prefix {
          display: none;
        }
      }

      .income-table {
        margin: 20px 0;
      }
    }

    .income-search {
      display: flex;

      .search-item > > > .el-input__inner {
        height: 26px;
        font-size: 12px;
        padding: 0 10px;
      }

      .search-item {
        display: flex;
        align-items: center;
        // margin-right: 15px;
        width: 23%;
        .label {
          font-size: 12px;
          padding-right: 4px;
          color: #333;
          font-weight: 400;
        }
        .search-btn {
          width: 30%;
          background: #009cff;
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
      .search-item:nth-child(1) {
        margin-left: 3%;
      }
      .search-item:nth-child(4) {
        width: 20%;
      }

      .search-item > > > .el-input__icon {
        line-height: 26px;
      }

      .search-item > > > .el-input__prefix {
        display: none;
      }
    }

    .ticket-wrap {
      padding: 20px 28px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .ticket-item {
        width: 47%;
        border: 1px solid #ffebe2;
        margin: 15px 4px 0;
        background: #ffebe2;
        border-radius: 15px;
        position: relative;

        &:hover {
          cursor: pointer;
        }

        .ticket-owner {
          position: absolute;
          top: 15px;
          right: 30px;
          font-size: 11px;
          color: #ea3756;
        }

        .ticket-icon {
          position: absolute;
          right: 40%;
          bottom: 5px;
          i {
            font-size: 12px;
            margin-right: 10px;
          }
        }

        .ticket-img {
          position: absolute;
          bottom: 8px;
          right: 25px;
          font-size: 12px;
          color: #ea3756;
          width: 55px;

          img {
            width: 100%;
          }
        }

        .ticket-top {
          display: flex;
          padding: 8px 20px 5px;
          font-size: 11px;
          color: #ea3756;
          align-items: baseline;

          .ticket-num {
            margin-right: 20px;

            span {
              font-size: 25px;
              font-weight: 500;
              margin-left: 4px;
              color: #ea3756;
              /*font-family: fantasy;*/
            }
          }

          .ticket-addition {
            font-weight: 500;
            color: #ea3756;
          }
        }

        .ticket-center {
          font-size: 10px;
          padding: 0 20px 20px;
          color: #333;
          font-weight: 400;
          overflow: hidden;
          width: 80%;

          .ticket-comment {
            margin: 4px 0;
            line-height: 15px;
          }
        }

        .ticket-bottom {
          position: absolute;
          bottom: 0px;
          .ticket-expir {
            font-size: 10px;
            padding: 0 20px 6px;
            margin: 5px 0;
            color: #666666;
          }
        }
      }
    }

    .income-pagination {
      text-align: center;
      margin: 20px 0;
    }
  }
</style>


<!--<div v-if="showCoupon" class="show-discount">-->
<!--<div class="discount-warp">-->
<!--&lt;!&ndash; 关闭图标 &ndash;&gt;-->
<!--<div class="close-icon" @click="headColse">-->
<!--<i class="el-icon-close" />-->
<!--</div>-->
<!--<div class="title">新建优惠券</div>-->
<!--<div class="money">-->
<!--<div class="money-name">-->
<!--<span class="name-span">金额</span>-->
<!--<span>：</span>-->
<!--</div>-->
<!--<el-input v-model="money" class="input-money" placeholder="请输入金额" />-->
<!--</div>-->

<!--<div class="money">-->
<!--<div class="money-name">-->
<!--<span class="name-span">发送对象</span>-->
<!--<span>：</span>-->
<!--</div>-->
<!--<div class="radio">-->
<!--<el-radio v-model="radio" label="全部">全部</el-radio>-->
<!--<el-radio v-model="radio" label="阿帕店">阿帕店</el-radio>-->
<!--<el-radio v-model="radio" label="非阿帕店">非阿帕店</el-radio>-->
<!--</div>-->
<!--</div>-->

<!--<div class="money">-->
<!--<div class="money-name">-->
<!--<span class="name-span">使用条件</span>-->
<!--<span>：</span>-->
<!--</div>-->
<!--<div class="condition">-->
<!--<div-->
<!--v-for="(item,index) in navbar"-->
<!--:key="index"-->
<!--:class="['condition-navbar',index===navindex?'condition-navbar-active':'']"-->
<!--@click="cilckNav(index)"-->
<!--&gt;{{ item }}</div>-->
<!--</div>-->
<!--</div>-->

<!--<div v-if="navindex===1" class="money">-->
<!--<div class="money-name">-->
<!--<span class="name-span" />-->
<!--<span />-->
<!--</div>-->
<!--<div class="impose yx">-->
<!--用户消费满-->
<!--<el-input v-model="impose" class="input-money" />元有效-->
<!--</div>-->
<!--</div>-->

<!--<div class="money">-->
<!--<div class="money-name">-->
<!--<span class="name-span">有效期</span>-->
<!--<span>：</span>-->
<!--</div>-->
<!--<div class="condition">-->
<!--<div-->
<!--v-for="(item,index) in periodlist"-->
<!--:key="index"-->
<!--:class="['condition-navbar',index===periodid?'condition-navbar-active':'']"-->
<!--@click="cilckPeriodid(index)"-->
<!--&gt;{{ item }}</div>-->
<!--</div>-->
<!--</div>-->

<!--<div v-if="periodid===1" class="money">-->
<!--<div class="money-name">-->
<!--<span class="name-span" />-->
<!--<span />-->
<!--</div>-->
<!--<div class="impose yx">-->
<!--自领取之日起-->
<!--<el-input v-model="month" class="input-money" />天有效-->
<!--</div>-->
<!--</div>-->
<!--<div v-else class="money">-->
<!--<div class="money-name">-->
<!--<span class="name-span" />-->
<!--<span />-->
<!--</div>-->
<!--<div class="impose cuo">-->
<!--<el-date-picker-->
<!--v-model="value1"-->
<!--class="data-picker"-->
<!--type="daterange"-->
<!--range-separator="-"-->
<!--start-placeholder="开始日期"-->
<!--end-placeholder="结束日期"-->
<!--/>-->
<!--</div>-->
<!--</div>-->

<!--<div class="money" style="align-items:normal">-->
<!--<div class="money-name">-->
<!--<span class="name-span">使用说明</span>-->
<!--<span>：</span>-->
<!--</div>-->
<!--<div class="textarea">-->
<!--<el-input v-model="textarea" type="textarea" :rows="6" placeholder="请输入内容" />-->
<!--</div>-->
<!--</div>-->

<!--&lt;!&ndash; 确定按钮 &ndash;&gt;-->
<!--<div class="new_botton">-->
<!--<el-row>-->
<!--<el-button type="primary" size="mini" @click="headNewconfirm">确定新建</el-button>-->
<!--<el-button size="mini" @click="headNewcancel">取消</el-button>-->
<!--</el-row>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
