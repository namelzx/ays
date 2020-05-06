<template>
  <div class="pingjia-container">
    <div class="income-search">
      <div class="search-item">
        <div class="label">星级：</div>
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
        <div class="label">评价日期：</div>
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
        <div class="search-btn" @click="clickToSearch">搜索</div>
      </div>
    </div>
    <div class="rate-content">
      <div class="select-bar">
        <div class="select-item" :class="{'active-item':curIndex === index }" @click="clickToItem(index)"
             v-for="(item,index) of selectBar"
             :key="index"><span>{{item.star}}</span><span>{{total}}</span></div>
      </div>
      <div class="rate-wrap">
        <!--{{rateList}}-->
        <div class="rate-item" v-for="(item,index) of rateList" :key="index">
          <div class="rate-info">
            <div class="rate-text">{{item.content}}</div>
            <div class="rate-img">
              <div class="img-item" v-for="(pic,idx) of item.imgList" :key="idx">
                <img :src="pic" alt="">
              </div>
            </div>
            <div class="rate-time" v-if="item.order">
              <span>{{item.create_time}}</span>
              <span>订单：{{item.order.buy_order_no}}</span>
              <span>{{item.order.create_time}}</span>
            </div>
          </div>
          <div class="rate-score">
            <div class="product">
              <div class="item-label">产品</div>
              <div class="item-rate">
                <el-rate disabled :colors="['#FF0000', '#FF0000', '#FF0000']" v-model="item.product"></el-rate>
              </div>
              <div class="item-name">{{item.product_tilte}}</div>
            </div>

            <div class="product" v-if="item.order">
              <div class="item-label">客服</div>
              <div class="item-rate">
                <el-rate disabled :colors="['#FF0000', '#FF0000', '#FF0000']" v-model="item.service"></el-rate>
              </div>
              <div class="item-name">{{item.order.pre.realName}}</div>
            </div>

            <div class="product" v-if="item.order">
              <div class="item-label">门店</div>
              <div class="item-rate">
                <el-rate disabled :colors="['#FF0000', '#FF0000', '#FF0000']" v-model="item.shop"></el-rate>
              </div>
              <div class="item-name">{{item.order.shop.shopname}}</div>
            </div>
          </div>
          <div class="rate-user" v-if="item.order">
            <div class="user-avatar">
              <img v-if="item.order" :src="item.order.weacht.headimgurl" alt="">
            </div>
            <div class="user-info" v-if="item.order">
              <div class="nick-name">{{item.order.weacht.nickname}}</div>
              <div class="real-name"><span>{{item.order.weacht.nickname}}</span> <span>{{item.order.weacht.tel}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="income-pagination">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.limit" :total="total" background
                     layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
  import { GetEnvByList } from '@/api/shop'

  export default {
    name: 'PingJia',
    props: {
      id: {
        type: String,
        default: '0'
      }
    },
    data() {
      return {
        total:0,
        listQuery: {
          page: 1,
          limit: 10,
          status: undefined
        },
        star: '',
        options: [
          {
            value: '1星',
            label: '1星'
          }, {
            value: '2星',
            label: '2星'
          }, {
            value: '3星',
            label: '3星'
          }, {
            value: '4星',
            label: '4星'
          }, {
            value: '5星',
            label: '5星'
          }
        ],
        date: '',
        selectBar: [
          // { star: '5星', num: '1000' },
          // { star: '4星', num: '1000' },
          // { star: '3星', num: '1000' },
          // { star: '2星', num: '1000' },
          // { star: '1星', num: '1000' },
          { star: '全部', num: '5000' }
        ],
        curIndex: 5,
        rateList: [
          {
            id: 1,
            content: '效果就很明显的，看图片也是可以看出来那切线那光型，还有三年质保，安装的店也很负责！棒棒哒！但我还是希望可以有个价格保护，谁也不想买了不到五天就优惠200的情况出现，这样是很影响客户体验的~客户是不管你是否官不官方优惠的~',
            imgList: [
              {
                url: 'http://img4.imgtn.bdimg.com/it/u=3545292772,3587722738&fm=26&gp=0.jpg'
              },
              {
                url: 'http://img4.imgtn.bdimg.com/it/u=3545292772,3587722738&fm=26&gp=0.jpg'
              },
              {
                url: 'http://img4.imgtn.bdimg.com/it/u=3545292772,3587722738&fm=26&gp=0.jpg'
              }
            ],
            rate: [
              {
                product_title: '产品',
                product: 5,
                product_name: '征服者S'
              },
              {
                product_title: '客服',
                product: 5,
                product_name: '林某某'
              },
              {
                product_title: '门店',
                product: 5,
                product_name: '北京解灯坊 郭建印'
              }
            ],
            create_time: '2019.08.08 12:00:00',
            order_no: 'AS1212121221',
            user: {
              avatar: 'http://img4.imgtn.bdimg.com/it/u=2407084773,706092769&fm=11&gp=0.jpg',
              nick_name: '我是个历史人物',
              phone: '1375555555',
              real_name: '张弛'
            }
          },
          {
            id: 2,
            content: '效果就很明显的，看图片也是可以看出来那切线那光型，还有三年质保，安装的店也很负责！棒棒哒！但我还是希望可以有个价格保护，谁也不想买了不到五天就优惠200的情况出现，这样是很影响客户体验的~客户是不管你是否官不官方优惠的~',
            imgList: [
              {
                url: 'http://img4.imgtn.bdimg.com/it/u=3545292772,3587722738&fm=26&gp=0.jpg'
              },
              {
                url: 'http://img4.imgtn.bdimg.com/it/u=3545292772,3587722738&fm=26&gp=0.jpg'
              },
              {
                url: 'http://img4.imgtn.bdimg.com/it/u=3545292772,3587722738&fm=26&gp=0.jpg'
              }
            ],
            rate: [

              {
                product_title: '门店',
                product: 5,
                product_name: '北京解灯坊 郭建印'
              }
            ],
            create_time: '2019.08.08 12:00:00',
            order_no: 'AS1212121221',
            user: {
              avatar: 'http://img4.imgtn.bdimg.com/it/u=2407084773,706092769&fm=11&gp=0.jpg',
              nick_name: '我是个历史人物',
              phone: '1375555555',
              real_name: '张弛'
            }
          }
        ],
        currentPage: 1
      }
    },
    created() {
      this.fetchList()
    },
    methods: {

      handleFilterClear() {
        this.listQuery.page = 1
        this.fetchList()
      },
      fetchList() {
        this.listQuery.id = this.id
        GetEnvByList(this.listQuery).then(res => {
          var arr = []
          var data = res.data.data
          for (let i = 0; i < res.data.data.length; i++) {
            let imgList = data[i].img.split(',')
            arr.push({
              content: data[i].content,
              service: data[i].service,
              shop: data[i].shop,
              product: data[i].product,
              imgList: imgList,
              order: data[i].order
            })
          }
          this.rateList = arr
          this.total = res.data.total

        })
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
          star: this.star,
          date: this.date
        }
        console.log(temp)
      },
      clickToItem(idx) {
        this.curIndex = idx
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
      width: 20%;
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
    .rate-item {
      display: flex;
      align-items center;
      border-bottom: 1px solid #f5f5f5;
      .rate-info {
        width: 50%;
        padding: 20px 28px;
        .rate-text {
          font-size: 12px;
          color: #000;
          margin-bottom: 16px;
          line-height: 18px;
          font-weight: 500;
        }
        .rate-img {
          display: flex;
          align-items: center;
          .img-item {
            width: 16%;
            img {
              width: 60px;
              height: 60px;
              border-radius: 4px;
            }
          }
        }
        .rate-time {
          color: #666666;
          font-size: 12px;
          margin: 10px 0;
          font-weight: 400;
          span {
            margin-right: 20px;
            &:first-child {
              margin-right: 40px;
            }
          }
        }
      }
      .rate-score {
        width: 30%;
        .product {
          display: flex;
          align-items center;
          margin: 20px 0;
          font-size: 12px;
          padding-left: 30px;
          .item-label {
            margin-right: 10px;
            font-weight: 500;
            color: #000
          }
          .item-name {
            margin-left: 20px;
            font-weight: 500;
            color: #000
          }
        }

      }
      .rate-user {
        width: 20%;
        display: flex;
        justify-content: center;
        .user-avatar {
          width: 20%;
          margin-right 10px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
        .nick-name {
          font-size: 14px;
          color: #000;
          font-weight: 500;
        }
        .real-name {
          color: #666666;
          font-size: 12px;
          font-weight: 500;
          margin-top: 8px;
        }
      }
    }
  }

  .income-pagination {
    text-align center;
    margin: 20px 0;
  }
</style>
