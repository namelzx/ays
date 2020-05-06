<template>
  <div class="youhui-container">
    <div class="mask" v-if="showTicket">
      <div class="mask-box">
        <div class="mask-title"><span>优惠券详情</span><span @click="clickTicket"><i
          class="el-icon-close"></i></span>
        </div>
        <div class="mask-content">
          <div class="mask-detail">
            <div class="detail-text">金额</div>
            <div class="detail-value">{{curTicket.sub_money}}</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">发送对象</div>
            <div class="detail-value">{{curTicket.owner}}</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">使用条件</div>
            <div class="detail-value">满{{curTicket.condition}}使用</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">状态</div>
            <div class="detail-value" v-if="curTicket.status ===1">待使用</div>
            <div class="detail-value" v-if="curTicket.status ===2">已使用</div>
            <div class="detail-value" v-if="curTicket.status ===3">已过期</div>
          </div>
          <div class="mask-detail">
            <div class="detail-text">有效期</div>
            <div class="detail-value">{{curTicket.start_time}}-{{curTicket.end_time}}</div>
          </div>
          <div class="mask-detail special">
            <div class="detail-text">使用说明</div>
            <div class="detail-value">此优惠券不与其他优惠券同时使用 此优惠券不与其他优惠券同时使用</div>
          </div>
        </div>
        <div class="mask-btns">
          <div class="cancel" @click="clickTicket">关闭</div>
        </div>
      </div>
    </div>
    <div class="rate-content">
      <div class="select-bar">
        <div class="select-item" :class="{'active-item':curIndex === index }" @click="clickToItem(index)"
             v-for="(item,index) of selectBar"
             :key="index"><span>{{item.star}}</span><span>{{item.num}}</span></div>
      </div>
      <div class="ticket-wrap">
        <div class="ticket-item" v-for="(item,index) of ticketList" :key="index" @click="clickTicket(item)">
          <div class="ticket-owner">{{item.owner}}</div>
          <div class="ticket-img" v-if="item.status === 2">
            <!--<img src="@/assets/image/used.png" alt="">-->
          </div>
          <div class="ticket-img" v-if="item.status === 3">
            <!--<img src="@/assets/image/expir.png" alt="">-->
          </div>
          <div class="ticket-top">
            <div class="ticket-num">¥<span>{{item.sub_money}}</span></div>
            <div class="ticket-addition"><span>满{{item.condition}}减{{item.sub_money}}</span></div>
          </div>
          <div class="ticket-center">
            <div class="ticket-comment" v-for="(it,idx) of item.comment" :key="idx">
              说明：{{it.text}}
            </div>
          </div>
          <div class="ticket-bottom">
            <div class="ticket-expir">有效期{{item.start_time}}-{{item.end_time}}</div>
          </div>
        </div>
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
    name: "YouHui",
    data() {
      return {
        selectBar: [
          {star: '待使用', num: '1000'},
          {star: '已使用', num: '1000'},
          {star: '已过期', num: '1000'},
          {star: '全部', num: '3000'},
        ],
        ticketList: [
          {
            id: 1,
            sub_money: '200',
            condition: '2599',
            owner: '阿帕专享',
            comment: [
              {
                text: '此优惠券不与其他优惠券同时使用 此优惠券不与其他优惠券同时使用',
              },
              {
                text: '此优惠券不与其他优惠券同时使用 此优惠券不与其他优惠券同时使用',
              }
            ],
            start_time: '2019.11.1 00:00',
            end_time: '2019.11.1 23:59',
            status: 1 //未使用
          },
          {
            id: 2,
            sub_money: '200',
            condition: '2599',
            owner: '非阿帕专享',
            comment: [
              {
                text: '此优惠券不与其他优惠券同时使用 此优惠券不与其他优惠券同时使用',
              }
            ],
            start_time: '2019.11.1 00:00',
            end_time: '2019.11.1 23:59',
            status: 2 //已使用
          },
          {
            id: 3,
            sub_money: '200',
            condition: '2599',
            owner: '通用券',
            comment: [
              {
                text: '此优惠券不与其他优惠券同时使用 此优惠券不与其他优惠券同时使用',
              },
              {
                text: '此优惠券不与其他优惠券同时使用 此优惠券不与其他优惠券同时使用',
              }
            ],
            start_time: '2019.11.1 00:00',
            end_time: '2019.11.1 23:59',
            status: 3 //过期
          },
          {
            id: 4,
            sub_money: '200',
            condition: '2599',
            owner: '通用券',
            comment: [
              {
                text: '此优惠券不与其他优惠券同时使用 此优惠券不与其他优惠券同时使用',
              },
              {
                text: '此优惠券不与其他优惠券同时使用 此优惠券不与其他优惠券同时使用',
              }
            ],
            start_time: '2019.11.1 00:00',
            end_time: '2019.11.1 23:59',
            status: 3 //过期
          }
        ],
        curIndex: 3,
        currentPage: 1,
        showTicket: false,
        curTicket: {}
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
      clickTicket(item) {
        console.log(item);
        if (item){
          this.curTicket = item
        }
        this.showTicket = !this.showTicket
      },

      confirmDel() {
        this.$message.success('删除成功')
        this.showPop = !this.showPop
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
          align-items center;
          .detail-text {
            width: 24%;
          }
          .detail-value {
            width: 76%;
            background: #EEEEEE;
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
        padding: 8px 0;
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
    .ticket-wrap {
      padding: 20px 28px;
      display: flex;
      flex-wrap: wrap;
      justify-content space-between;
      .ticket-item {
        width: 47%;
        border: 1px solid #FFEBE2;
        margin: 20px 4px;
        background: #FFEBE2;
        border-radius: 20px;
        position: relative;
        &:hover {
          cursor: pointer;
        }
        .ticket-owner {
          position: absolute;
          top: 20px;
          right: 30px;
          font-size: 12px;
          color: #EA3756;
        }
        .ticket-img {
          position: absolute;
          bottom: 8px;
          right: 25px;
          font-size: 12px;
          color: #EA3756;
          width: 60px;
          img {
            width: 100%;
          }
        }
        .ticket-top {
          display: flex;
          padding: 20px 20px 10px;
          font-size: 12px;
          color: #EA3756;
          align-items: baseline;

          .ticket-num {
            margin-right: 20px;
            span {
              font-size: 25px;
              font-weight: 500;
              margin-left: 4px;
              color: #EA3756;
            }
          }
          .ticket-addition {
            font-weight: 500;
            color: #EA3756;
          }
        }
        .ticket-center {
          font-size: 12px;
          padding: 0 20px;
          color: #333;
          font-weight: 400;
          overflow: hidden;
          .ticket-comment {
            margin: 4px 0;
          }
        }
        .ticket-bottom {
          .ticket-expir {
            font-size: 12px;
            padding: 0 20px 8px;
            margin: 10px 0;
            color: #666666;
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
