<template>
  <div class="Dongtai-container">
    <div class="mask" v-if="showPop">
      <div class="mask-box">
        <div class="mask-title"><span>删除动态</span><span @click="clickToDel"><i class="el-icon-close"></i></span>
        </div>
        <div class="mask-content">确定删除动态？</div>
        <div class="mask-btns">
          <div class="confirm"  @click="confirmDel">确定</div>
          <div class="cancel" @click="clickToDel">取消</div>
        </div>
      </div>
    </div>
    <div class="income-search">
      <div class="search-item">
        <div class="label">日期：</div>
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
        <div class="label">文字：</div>
        <div class="value">
          <el-input v-model="text" placeholder="请输入文字"></el-input>
        </div>
      </div>
      <div class="search-item">
        <div class="search-btn" @click="clickToSearch">搜索</div>
      </div>
    </div>
    <div class="dt-wrap">
      <div class="dt-wrap-bar">
        <div class="bar-date">日期</div>
        <div class="bar-content">内容</div>
        <div class="bar-action">操作</div>
      </div>
      <div class="dt-wrap-content">
        <div class="content-item" v-for="(item,index) of dtList" :key="index">
          <div class="date-item">{{item.create_time}}</div>
          <div class="text-item">
            <div class="item-text">{{item.content}}</div>
            <div class="item-img-wrap">
              <div class="img-item" v-for="(pic,idx) of item.imgList" :key="idx">
                <img :src="pic.url" alt="">
              </div>
            </div>
          </div>
          <div class="action-item">
            <div class="action-btn" @click="clickToDel(item.id)">删除</div>
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
    name: "DongTai",
    data() {
      return {
        date: '',
        text: '',
        dtList: [
          {
            id: 1,
            content: '效果就很明显的，看图片也是可以看出来那切线那光型，还有三年质保，安装的店也很负责！棒棒哒！但我还是希望可以有个价格保护，谁也不想买了不到五天就优惠200的情况出现，这样是很影响客户体验的~客户是不管你是否官不官方优惠的~\n',
            imgList: [],
            create_time: '2019.08.08 12:00:00'
          },
          {
            id: 2,
            content: '效果就很明显的，看图片也是可以看出来那切线那光型，还有三年质保，安装的店也很负责！棒棒哒！但我还是希望可以有个价格保护，谁也不想买了不到五天就优惠200的情况出现，这样是很影响客户体验的~客户是不管你是否官不官方优惠的~\n',
            imgList: [
              {url: 'http://img4.imgtn.bdimg.com/it/u=3545292772,3587722738&fm=26&gp=0.jpg'},
              {url: 'http://img4.imgtn.bdimg.com/it/u=3545292772,3587722738&fm=26&gp=0.jpg'},
              {url: 'http://img4.imgtn.bdimg.com/it/u=3545292772,3587722738&fm=26&gp=0.jpg'},
              {url: 'http://img4.imgtn.bdimg.com/it/u=3545292772,3587722738&fm=26&gp=0.jpg'},
              {url: 'http://img4.imgtn.bdimg.com/it/u=3545292772,3587722738&fm=26&gp=0.jpg'},
            ],
            create_time: '2019.08.08 12:00:00'
          },
          {
            id: 3,
            content: '效果就很明显的，看图片也是可以看出来那切线那光型，还有三年质保，安装的店也很负责！棒棒哒！但我还是希望可以有个价格保护，谁也不想买了不到五天就优惠200的情况出现，这样是很影响客户体验的~客户是不管你是否官不官方优惠的~\n',
            imgList: [
              {url: 'http://img4.imgtn.bdimg.com/it/u=3545292772,3587722738&fm=26&gp=0.jpg'},
              {url: 'http://img4.imgtn.bdimg.com/it/u=3545292772,3587722738&fm=26&gp=0.jpg'},
              {url: 'http://img4.imgtn.bdimg.com/it/u=3545292772,3587722738&fm=26&gp=0.jpg'}
            ],
            create_time: '2019.08.08 12:00:00'
          }
        ],
        curIndex: 0,
        showPop: false,
        currentPage: 1
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
          date: this.date,
          text: this.text,
        }
        console.log(temp);
      },
      clickToItem(idx) {
        this.curIndex = idx
      },
      clickToDel(id) {
        console.log(id);
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

  }

  .dt-wrap {
    margin: 20px 5px;
    border: 1px solid #f5f5f5;
    box-shadow: 0 0 6px 0 rgba(53, 53, 53, .28);

    .dt-wrap-bar {
      padding: 12px 20px;
      font-size: 14px;
      display: flex;
      border-bottom: 1px solid #f5f5f5;

      .bar-date {
        width: 20%;
      }
      .bar-content {
        width: 60%;
      }
      .bar-action {
        width: 20%;
      }
    }
    .dt-wrap-content {
      padding: 0 20px;
      font-size: 14px;
      .content-item {
        display flex;
        align-items: center;
        padding: 14px 0;
        border-bottom: 1px solid #f5f5f5;

        .date-item {
          width: 20%;
          font-size: 12px;
        }
        .text-item {
          width: 60%;
          color: #000;
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          .item-text {
            width: 80%;
          }
          .item-img-wrap {
            display flex;
            .img-item {
              margin-right: 10px;

              img {
                width: 50px;
                height: 50px;
                border-radius: 4px;
              }

            }
          }

        }
        .action-item {
          width: 20%;
          .action-btn {
            background: #FDF6EC;
            color: #E6A23C;
            width: 20%;
            padding: 8px 4px;
            text-align: center;
            font-size: 12px;
            border-radius: 4px;
            &:hover {
              cursor: pointer;
            }
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
