<template>
  <div>

    <!--{{list}}-->
    <div class="table" v-for="(item, index) in list" @click="handelToshop(item)">
      <div class="biaoti" style="display: flex;justify-content: space-between">
        <div class="b-item">
          <div class="b-list">
            <span>类别:</span>
            <span :class="[item.shop_type == '阿帕认证' ? 'color-bule' : '']">
              {{
              item.shop_type
              }}
            </span>
          </div>
          <div class="b-list">
            <span>30天</span>
            <span>{{ item.ordermonth }}</span>
          </div>
          <div class="b-list">
            <span>总</span>
            <span>{{ item.ordersum }}</span>
          </div>
        </div>
        <div class="b-item">
          <div class="b-list">
            <a type="primary" v-if="item.ec_rec === 1">电商推荐</a>
          </div>
          <div class="b-list">
            <a type="primary" v-if="item.mk_rec === 1">市场推荐</a>
          </div>
        </div>
      </div>
      <div
        class="identification"
        v-if="item.blacklist === 2 || item.ecblacklist || item.book === 1"
      >
        <div
          v-if="item.blacklist === 2 || item.ecblacklist === 3"
          style="  background: url(https://kedand.oss-cn-beijing.aliyuncs.com/images/black.png); background-repeat:no-repeat;
          background-size: auto 100%; width: 22px;height: 30px;    background-size: 100%;"
        ></div>
        <div
          v-if="item.book === 1"
          style="  background: url(https://kedand.oss-cn-beijing.aliyuncs.com/images/book.png); background-repeat:no-repeat;
          background-size: auto 100%; width: 22px;height: 30px;    background-size: 100%;"
        ></div>
      </div>

      <div class="table-content">
        <div class="table-filed" style="width: 45%">
          <div class="filed-span">
            <span>门店名称:</span>
            <div>
              <div class="field">{{ item.shopname }}</div>
            </div>
          </div>
          <div class="filed-span">
            <span>地址:</span>
            <div>
              <div class="field">{{ item.cityName }}{{ item.location }}</div>
            </div>
          </div>
        </div>
        <div class="table-filed jp" style="width: 20%">
          <div class="filed-span">
            <span>店主:</span>
            <div>
              <!-- <div class="field">{{ item.shopkeeper }}</div> -->
              <div class="field" style="color: #409EFF" v-if="item.user_id">{{item.shopkeeper}}</div>
              <div class="field" v-else>{{item.shopkeeper}}</div>
            </div>
          </div>
          <div class="filed-span">
            <span>电话</span>
            <div>
              :
              <div class="field">{{ item.tel }}</div>
            </div>
          </div>
        </div>
        <div class="table-filed jp" style="width: 30%">
          <div class="filed-span">
            <span>服务商</span>
            <div>
              <div class="field">{{ item.service_provider }}</div>
            </div>
          </div>
          <div class="filed-span" style="width: 100%">
            <span>业务员</span>
            <div>
              :
              <div class="field" v-if="item.salesman">{{ item.salesman.realName }}</div>

              <div class="field" v-else>暂无分配</div>
            </div>
          </div>
        </div>
      </div>
      <div class="data-bottom">
        <div class="title-list" style="width: 100%">
          <span>备注:</span>
          <div v-if="item.desc">{{ item.desc }}</div>
          <div v-else>暂无备注</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'list',
    props: {
      list: Array,
      is_order: {
        type: String,
        default: '否'
      }
    },
    methods: {
      handelToshop(item) {
        if (this.is_order === '是') {
          if (item.ecblacklist === 3) {
            this.$message.error('黑名单门店不可选择')
            return
          }
          if (item.blacklist === 2) {
            this.$message.error('黑名单门店不可选择')
            return
          }
        }
        this.$emit('handelToshop', item)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-dialog__body {
    padding: 1px 20px;
    padding-left: 35px;
    .el-form-item__label {
      font-weight: 400;
      font-size: 12px;
    }
  }

  .el-dialog__title {
    font-size: 14px;
  }

  /*.new-table {*/
  /*font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;*/
  /*display: flex;*/
  /*font-size: 12px;*/
  /*flex-direction: column;*/
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
  .tab {
    height: 30px;
    border-bottom: 1px solid #e4e7ed;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 27px;
    padding-right: 20px;
    .list-item {
      display: flex;
      justify-content: center;
      width: 10%;
      font-weight: 500;
      .price {
        color: red;
      }
    }
    .che {
      width: 3%;
    }
    .selected {
      /*background: yellow;*/
      position: relative;
      color: #409eff;
    }
    .selected::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -9px;
      width: 100%;
      height: 2px;
      background-color: #409eff;
      z-index: 1;
    }
  }

  .table {
    position: relative;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    display: flex;
    font-size: 12px;
    flex-direction: column;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    margin-bottom: 20px;
    padding-left: 15px;
    padding-right: 15px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    padding-top: 4px;
    .identification {
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      text-align: center;
      /*background: #1aa2e6;*/
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    .black {
      background: #000;
    }
    .biaoti {
      width: 80%;
      padding-left: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 25px;
      .b-item {
        display: flex;
        flex-direction: row;
      }
      .b-list {
        padding-right: 30px;
        display: flex;
        .color-bule {
          color: #2ea2fc;
        }

        a {
          color: #2ea2fc;
        }
      }
    }
    .table-title {
      background: #eaf3ff;
      display: flex;
      flex-direction: row;
      align-items: center;
      .list-item {
        width: 25%;
      }
      .a-link {
        color: #409eff;
        width: 20%;
      }
      .che {
        width: 3%;
      }
    }
    .table-content {
      /*border-right: 1px solid #f2f2f6;*/
      /*border-left: 1px solid #f2f2f6;*/
      display: flex;
      flex-direction: row;
      padding: 0 0 10px 40px;
      flex-direction: row;
      flex-wrap: wrap;

      .table-filed {
        display: flex;
        flex-direction: column;
        width: 21%;
        .filed-span {
          display: flex;
          flex-direction: row;
          height: 22px;
          line-height: 22px;
          span {
            width: 20%;
            color: #606266;
          }
          div {
            display: flex;
            flex-direction: row;
            width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            /*white-space: nowrap;*/
            -webkit-line-clamp: 3;
            overflow: hidden;
            /*height: 45px;*/
          }
          .field {
            padding-left: 5px;
          }
        }
      }
      .jp {
        width: 25%;
        .filed-span {
          span {
            text-align-last: justify;
            width: 23%;
          }
        }
      }
      .jl {
        width: 10%;
        display: flex;
        flex-direction: row;
        align-items: center;
        .filed-price {
          font-weight: 800;
          color: red;
          font-size: 20px;
        }
      }
    }
    .data-bottom {
      display: flex;
      flex-direction: row;
      padding-left: 40px;
      padding-bottom: 10px;
      .title-list {
        padding-right: 50px;
        color: #606266;
        display: flex;
        flex-direction: row;
        span {
          padding-right: 5px;
        }
        div {
          color: #000;
        }
      }
      .red {
        color: red;
      }
      /*padding-left: 35px;*/
    }
  }

  /*}*/
  /*33*/
  .text-red {
    color: red;
    cursor: pointer;
  }

  .text-green {
    color: green;
    cursor: pointer;
  }

  .n-post {
    .el-dialog__body {
      padding: 10px 10px;
      .el-form-item__label {
        font-weight: 400;
        font-size: 12px;
      }
    }
  }

  .filter-container .el-form-item__label {
    width: 64px;
  }

  .no-data {
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>
