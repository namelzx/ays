<template>
  <div class="info">
    <div class="nav-head">
      <!-- 操作 -->
      <div class="head_button">
        <el-button type="primary" size="mini" @click="headAmend">修改信息</el-button>
        <el-button type="primary" size="mini" @click="headMoney">修改余额</el-button>

        <el-button type="primary" size="mini" @click="handelblack">
          <template v-if="userInfo.is_black===1">
            拉白
          </template>
          <template v-else>
            拉黑
          </template>

        </el-button>
        <!--<el-button type="primary" size="mini">修改绑定</el-button>-->
      </div>

      <div class="head_warp fx1">
        <img :src="userInfo.headimgurl"/>
        <!--<div>{{userInfo.nickname}}</div>-->
      </div>
      <div class="head_warp fx4">
        <div class="fx2-name">
          <span class="fx2-span">{{userInfo.nickname}}</span>
          <!--<div class="unsename">{{userInfo.openid}}</div>-->
        </div>
        <div class="fx2-name">
          <span class="fx2-span">Open ID</span>:
          <div class="unsename">{{userInfo.openid}}</div>
        </div>
      </div>
      <div class="head_warp fx5">
        <div class="fx2-name">
          <span class="fx2-span">姓名</span>:
          <div class="unsename">{{userInfo.realName}}</div>
        </div>
        <div class="fx2-name">
          <span class="fx2-span fx2-span-a">联系方式</span>:
          <div class="unsename">{{userInfo.tel}}</div>
        </div>
      </div>

      <div class="head_warp fx4">
        <div class="fx2-name">
          <span class="fx2-span fx2-span-a">注册时间</span>:
          <div class="unsename">{{userInfo.create_time}}</div>
        </div>
        <div class="fx2-name">
          <span class="fx2-span sapn-addres">地 址</span>:
          <div class="unsename">
            <span>{{userInfo.country}}</span>
            {{userInfo.province}}
            <span></span>
            {{userInfo.city}}
          </div>
        </div>
      </div>


      <div class="head_warp fx6">
        <div class="fx2-name">
          <span class="fx2-span">角色</span>:
          <div class="unsename">
            <el-tag v-if="userInfo.is_shop===1">门店</el-tag>

            <el-tag v-if="userInfo.is_business===1">业务员</el-tag>
            <el-tag v-if="userInfo.is_members===1">会员</el-tag>


          </div>
        </div>
      </div>
      <div class="head_warp fx6">
        <div class="fx2-name">
          <span class="fx2-span">余额</span>:
          <div class="unsename">{{userInfo.balance}}</div>
        </div>

      </div>


    </div>

    <div class="filter-container dn wn">
      <el-form :inline="true" :model="listQuery">
        <el-row>
          <el-col :span="8">
            <el-form-item label="时间:">
              <el-date-picker
                style="width: 250px;"
                size="mini"
                v-model="listQuery.startTime"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']"
              ></el-date-picker>

            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="内容:">
              <el-input
                v-model="listQuery.title"
                size="mini"
                @keyup.enter.native="handleFilter()"
              />
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="类型:">
              <el-select v-model="listQuery.is_blick" size="mini" placeholder="请选择">
                <el-option
                  v-for="item in optionsblick"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <div class="el-button-sou">
        <el-button  type="primary" @click="getlist()" size="mini">搜索</el-button>
      </div>
    </div>

<div style="margin-bottom: 100px">
    <el-table
      v-loading="listLoading"
      :data="moneylist"
      stripe
      style="width: 100%">
      <el-table-column
        prop="create_time"
        label="日期"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        align="center"
        width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.price_type===1">
            收入
          </span>
          <span v-else>
            支出
          </span>
        </template>
      </el-table-column>

      <el-table-column
              prop="partner_trade_no"
              label="付款单号"
              align="center"
              min-width="180"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="内容"
        align="center"
       min-width="180"
      >
      </el-table-column>


      <el-table-column
        prop="price"
        align="center"
        label="金额">

        <template slot-scope="scope">
          <span v-if="scope.row.price_type===1">
            +
          </span>
          <span v-else>
            -
          </span>
          {{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column
        prop="balance"
        align="center"
        label="余额">
        <template slot-scope="scope">
            <span v-if="scope.row.balance">
              {{scope.row.balance}}
            </span>
          <span v-else>
            0
          </span>

        </template>
      </el-table-column>
    </el-table>
</div>
    <el-dialog
      title="修改余额"
      :visible.sync="ReturndialogVisible"
      width="30%"
    >
      <div class="return">
        <el-form :model="ReturnData" class="form-container" label-width="70px">
          <el-form-item label="修改原因">
            <el-row :gutter="20">
              <el-col :span="20">
                <el-input size="mini" v-model="ReturnData.title"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-radio-group size="mini" v-model="ReturnData.price_type">
                  <el-radio :label="1">增加金额</el-radio>
                  <el-radio :label="2">减少金额</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="修改金额">
            <el-row :gutter="20">
              <el-col :span="20">
                <el-input size="mini" v-model="ReturnData.price"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="ReturndialogVisible = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="handeReturn">确 定</el-button>
        </span>
    </el-dialog>


    <!-- 用户信息修改 -->
    <send-order
      v-if="dialogVisible"
      :is_disabled="is_disabled"
      :Stitle="Stitle"
      @handleClose="handleClose"
      :postFrom="userInfo"
      :dialogVisible="dialogVisible"
    ></send-order>

    <!-- 订单详情 -->
    <OrderInfo
      :tabtext="tabtext"
      v-if="infodialogVisible"
      @handelInfoDialog="handelInfoDialog"
      :OrderInfo="postFrom"
      :infodialogVisible="infodialogVisible"
    ></OrderInfo>

    <!-- 分页 -->
    <div class="pagination-container pageclass">
      <el-pagination
        v-show="total > 0"
        :current-page="listQuery.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.psize"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>

  import waves from '@/directive/waves'
  import { getArrByKey, pickerOptions } from '@/utils'
  import { mapGetters } from 'vuex'

  import { CarBrand } from '@/api/tools'
  import { GetecshopByList } from '@/api/ecshop'
  import { GetDataByShopAll } from '@/api/shop'

  import { GetProductByTree } from '@/api/product'

  import { GetSaleByAll } from '@/api/salesman'
  import { regionDataPlus } from 'element-china-area-data'
  import { userInfo, GetDataByInstall, PostDataByBlick, GetUserByMoney ,PostDataByAddMoney} from '@/api/wechatuser'

  import sendOrder from './components/sendOrder'
  import OrderInfo from './components/OrderInfo'

  export default {
    directives: {
      waves
    },
    components: {
      sendOrder,
      OrderInfo
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: '禁用',
          1: '正常'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        ReturnData:{
          price:0,
          user_id:0,
          price_type:1,
          title:'',
          cost_title:'',
        },
        ReturndialogVisible:false,
        isIndeterminate: true,
        checkedCities: [], // 已选择
        checkAll: false,
        dialogAudit: false,
        loading: true,
        sumorder: 0,
        productTree: [], // 产品树
        reTitle: '',
        moneylist:[],
        dialogVisible: false, // 打开修改用户信息
        infodialogVisible: false, //打开详情
        reOption: [],

        optionsblick:[],
        postFrom: {},
        permissions: [], // 权限组
        RedialogVisible: false,
        ReturndialogVisible: false,
        ReturnData: {
          type: 1,
          price: undefined,
          courier: undefined,
          courier_order_no: undefined,
          name: undefined
        },
        innerVisible: false,
        dialogVisible: false,
        checked: true,
        tableKey: 0,
        order_id: undefined,

        carl: [],
        list: null,
        total: 0,
        cityoptions: regionDataPlus, // 地址
        selectedRows: null,
        listLoading: true,
        showSearch: false,
        order_id: undefined,
        options: [],
        shop: [],
        listQuery: {
          page: 1,
          limit: 10,
          sstatus: 1
        },
        allsum: 0,
        buttonDisabled: true,
        deleting: false,
        currentIndex: -1,
        regionHiera: [],
        Stitle: '',
        checklist: [],
        userInfo: {}, //用户信息
        usercar: [], //用户车辆
        user_id:0,
      }
    },
    computed: {
      ...mapGetters(['userinfo', , 'group'])
    },
    watch: {},
    created() {
      let user_id = this.$route.params.id
      this.user_id=user_id
      userInfo(user_id).then(res => {
        this.userInfo = res.data
        this.usercar = res.data.usercar
          this.listLoading = false
        this.listQuery.openid = this.userInfo.openid

      })

      this.permissions = this.group.btn.split(',')


      this.getlist()

    },

    methods: {
      handeReturn(){
        this.ReturnData.user_id=this.user_id
        PostDataByAddMoney(this.ReturnData).then(res=>{
          this.ReturndialogVisible=false;
          this.ReturnData={}
          this.getlist()

          userInfo(this.user_id).then(res => {
            this.userInfo = res.data
            this.usercar = res.data.usercar
            this.listQuery.openid = this.userInfo.openid
          this.$message.success('修改成功');
          })
        })
      },
      headMoney(){
        this.ReturndialogVisible=true
      },
      getlist() {
        this.listQuery.user_id=this.user_id
        GetUserByMoney(this.listQuery).then(res => {
          this.moneylist=res.data.data
          this.total=res.data.total
        })
      },
      handelblack() {
        var str = '拉黑成功'
        var temp = {
          id: this.userInfo.id,
          is_black: 1
        }

        if (this.userInfo.is_black === 1) {
          temp.is_black = 2
          str = '拉白成功'
          this.userInfo.is_black = 2
        } else {
          this.userInfo.is_black = 1
        }
        PostDataByBlick(temp).then(res => {
          this.$message.success(str)
        })
      },
      headAmend() {

        this.dialogVisible = true
      },

      rolesbtn(val) {
        var index = this.permissions.indexOf(val)
        if (index > -1) {
          return true
        } else {
          return false
        }
      },

      handelInfoDialog() {
        this.infodialogVisible = !this.infodialogVisible
      },

      handleFilter() {
        this.listQuery.page = 1
      },
      handleFilterClear() {
      },
      handleSizeChange(val) {
        this.listQuery.limie = val
        console.log('操作了')
        this.getlist()
      },

      handleStatusChange(val) {
        this.listQuery.page = 1
        this.listQuery.sstatus = val
        this.getlist()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getlist()

      },
      handleModifyStatus(index, id, status) {
        this.list[index]['status'] = 1 - status
        change(id, 'status', 1 - status).then(response => {
        })
      },
      handleSelectionChange(val) {
        if (val.length > 0) {
          this.buttonDisabled = false
        } else {
          this.buttonDisabled = true
        }
        this.selectedRows = val
      },

      handleClose() {
        this.dialogVisible = !this.dialogVisible
      }
    }
  }
</script>
<style lang="scss" scoped>
  .wn{
    width: 100%;
    position: relative;
    .el-button-sou{
      position: absolute;
      right: 21px;
      bottom: 19px;
    }
  }
  .createPost-main-container{
    .el-form-item__label{
      font-size: 11px;
      font-weight: 500;
    }

  }
  .el-form-item__content{
    .el-button--small{
      padding: 6px 15px;
    }
  }


    .pagination-container {
      position: fixed;
      bottom: 0;
      padding-top: 4px;
      padding-bottom: 9px;
      background: #ffffff !important;
      width: 100%;
      padding-left: 20px;
      z-index: 999;
      /*text-align: c;*/
    }

  .info {
    padding: 20px;
  }

  .nav-head {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    display: flex;
    font-size: 12px;
    flex-direction: row;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    position: relative;
    margin-bottom: 20px;
    .head_button {
      position: absolute;
      right: 20px;
      bottom: 10px;
      display: flex;
      flex-direction: row;
      justify-content: end;
      .el-button--mini:nth-child(1) {
        padding: 7px 32px;
      }
      .el-button--mini:nth-child(2) {
        padding: 7px 32px;
      }
    }


    .fx1 {
      height: 120px;
      width: 10%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      img {
        width: 55px;
        height: 55px;
        border-radius: 10px;
        margin-top: 15px;
        margin-bottom: 10px;
      }
    }
    .fx2 {
      width: 15%;
      .fx2-name {
        display: flex;
        color: #666666;
        margin-top: 15px;
        .fx2-span {
          display: inline-block;
          width: 35%;
          text-align-last: justify;
          color: #666666;
        }
        .unsename {
          color: #333333;
          margin-left: 6px;
          span {
            margin-right: 10px;
          }
        }
      }
    }
    .fx3 {
      width: 25%;
      .fx2-name {
        display: flex;
        color: #666666;
        margin-top: 15px;
        .fx2-span {
          display: block;
          color: #666666;
          width: 13%;
        }
        .sapn-addres {
          width: 16%;
          text-align-last: justify;
        }
        .unsename {
          width: 75%;
          color: #333333;
          margin-left: 6px;
        }
      }
    }
    .fx4 {
      width: 25%;
      .fx2-name {
        display: flex;
        color: #666666;
        margin-top: 15px;
        .fx2-span {
          display: block;
          color: #666666;
          // width: 13%;

        }
        .fx2-span-a{
          width: 60px;
        }
        .sapn-addres {
          // width: 16%;
          /*text-align-last: justify;*/
        }
        .unsename {
          width: 70%;
          color: #333333;
          margin-left: 6px;
        }
      }
    }
    .fx5 {
      width: 16%;
      .fx2-name {
        display: flex;
        color: #666666;
        margin-top: 15px;
        .fx2-span {
          display: block;
          color: #666666;
          // width: 13%;

        }
        .fx2-span-a{
          width: 60px;
        }
        .sapn-addres {
          // width: 16%;
          /*text-align-last: justify;*/
        }
        .unsename {
          width: 60%;
          color: #333333;
          margin-left: 6px;
        }
      }
    }
    .fx6 {
      width: 13%;
      .fx2-name {
        display: flex;
        color: #666666;
        margin-top: 15px;
        .fx2-span {
          display: block;
          color: #666666;
          // width: 13%;

        }
        .fx2-span-a{
          width: 60px;
        }
        .sapn-addres {
          // width: 16%;
          /*text-align-last: justify;*/
        }
        .unsename {
          width: 60%;
          color: #333333;
          margin-left: 6px;
        }
      }
    }
  }

  .new-table {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    display: flex;
    font-size: 12px;
    flex-direction: column;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .tab {
      height: 50px;
      border-bottom: 1px solid #e4e7ed;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 27px;
      padding-right: 20px;
      line-height: 1.5;
      font-size: 12px;
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
      margin-bottom: 10px;
      padding-left: 15px;
      padding-right: 15px;
      .table-title {
        background: #eaf3ff;
        padding: 8px 16px 8px 16px;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;

        display: flex;
        flex-direction: row;
        align-items: center;
        .list-item {
          width: 25%;
        }
        .a-link {
          color: #409eff;
          width: 20%;
          a {
            margin: 0 20px;
          }
        }
        .che {
          width: 2%;
          margin-left: 3px;
        }
      }
      .table-content {
        border-right: 1px solid #f2f2f6;
        border-left: 1px solid #f2f2f6;
        display: flex;
        flex-direction: row;
        padding: 0 0 0 40px;
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
              width: 14%;
              color: #606266;
            }
            div {
              display: flex;
              flex-direction: row;
              width: 80%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
      .table-bottom {
        background: #f2f2f6;
        border-top-right-radius: 0px;
        border-top-left-radius: 0px;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        .list-item {
          width: 15%;
          display: flex;
          span {
            color: #606266;
          }
        }
        .a-link {
          width: 80%;
        }
        .shop-item {
          width: 25%;
        }
        .order-btn {
          width: 50%;
          text-align: center;
          display: flex;
          justify-content: center;
          .is-plain {
            padding-top: 3px;
            padding-bottom: 3px;
            font-size: 2px;
            /*span {*/
            /*color: #FFBA00;*/
            /*}*/
          }
          is-plain:hover {
            background: #fff83c !important;
          }
        }
        .che {
          width: 3%;
        }
      }
    }
    .table2 {
      margin-bottom: 10px;
      // padding-left: 15px;
      padding-right: 15px;
      .table-title {
        background: #eaf3ff;
        padding: 8px 16px 8px 16px;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;

        display: flex;
        flex-direction: row;
        align-items: center;
        .list-item {
          width: 25%;
        }
        .a-link {
          color: #409eff;
          width: 20%;
          a {
            margin: 0 20px;
          }
        }
        .che {
          width: 3%;
        }
      }
      .table-content {
        border-right: 1px solid #f2f2f6;
        border-left: 1px solid #f2f2f6;
        display: flex;
        flex-direction: row;
        // padding: 0 0 0 40px;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 10px 0;
        .table-imgs {
          width: 13%;
          display: flex;
          justify-content: center;
          img {
            width: 55px;
            height: 55px;
            margin: auto;
            border-radius: 15px;
          }
        }
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
              // width: 16%;
              color: #606266;
            }
            div {
              display: flex;
              flex-direction: row;
              width: 80%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .field {
            }
          }
        }
        .ju {
          justify-content: center;
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
      .table-bottom {
        background: #f2f2f6;
        border-top-right-radius: 0px;
        border-top-left-radius: 0px;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        .list-item {
          width: 15%;
          display: flex;
          span {
            color: #606266;
          }
        }
        .a-link {
          width: 80%;
        }
        .shop-item {
          width: 25%;
        }
        .order-btn {
          width: 50%;
          text-align: center;
          display: flex;
          justify-content: center;
          .is-plain {
            padding-top: 3px;
            padding-bottom: 3px;
            font-size: 2px;
            /*span {*/
            /*color: #FFBA00;*/
            /*}*/
          }
          is-plain:hover {
            background: #fff83c !important;
          }
        }
        .che {
          width: 3%;
        }
      }
    }
    .table3 {
      margin-bottom: 10px;
      padding-left: 15px;
      padding-right: 15px;
      .table-content {
        border: 1px solid #f2f2f6;
        border-radius: 15px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        display: flex;
        flex-direction: row;
        padding: 10px 0 10px 40px;
        flex-direction: row;
        flex-wrap: wrap;
        .table-filed {
          display: flex;
          flex-direction: column;
          width: 22%;
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
              white-space: nowrap;
            }
            .field {
              padding-left: 5px;
            }
          }
        }
        .table-filed:nth-child(1) {
          .filed-span {
            span {
              width: 20%;
            }
            div {
              width: 100%;
            }
          }
        }
        .table-filed:nth-child(2) {
          width: 25%;
          .filed-span {
            span {
              width: 22%;
              text-align-last: justify;
            }
            div {
              // width: 100%;
            }
          }
        }
        .table-filed:nth-child(3) {
          width: 25%;
          .filed-span {
            span {
              width: 22%;
              text-align-last: justify;
            }
            div {
              // width: 100%;
            }
          }
        }
        .table-filed:nth-child(4) {
          width: 25%;
          .filed-span {
            span {
              width: 22%;
              text-align-last: justify;
            }
            div {
              // width: 100%;
            }
          }
        }
      }
    }
  }
</style>



<!--v-loading="listLoading"-->
<!-- 表格 -->
<!--<div v-loading="listLoading" class="new-table">-->
<!--<div class="tab">-->
<!--<div-->
<!--class="list-item"-->
<!--:class="listQuery.sstatus === 1 ? 'selected' : ''"-->
<!--style="width: 15%"-->
<!--@click="handleStatusChange(1)"-->
<!--&gt;-->
<!--<span>安装单</span>-->
<!--<span class="price">{{ total }}</span>-->
<!--</div>-->
<!--&lt;!&ndash; <div-->
<!--class="list-item"-->
<!--:class="listQuery.sstatus === 2 ? 'selected' : ''"-->
<!--style="width: 15%"-->
<!--@click="handleStatusChange(2)"-->
<!--&gt;-->
<!--<span>营销单</span>-->
<!--<span class="price">{{ countdata[2]["total"] }}</span>-->
<!--</div>&ndash;&gt;-->
<!--&lt;!&ndash;<div&ndash;&gt;-->
<!--&lt;!&ndash;class="list-item"&ndash;&gt;-->
<!--&lt;!&ndash;:class="listQuery.sstatus === 3 ? 'selected' : ''"&ndash;&gt;-->
<!--&lt;!&ndash;@click="handleStatusChange(3)"&ndash;&gt;-->
<!--&lt;!&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;<span>质保卡</span>&ndash;&gt;-->
<!--&lt;!&ndash;<span class="price">{{ countdata[3]["total"] }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;</div>&ndash;&gt;-->
<!--</div>-->
<!--&lt;!&ndash; 安装单 &ndash;&gt;-->
<!--<div v-for="(item, index) in list" v-if="total > 0" class="table">-->
<!--<div class="table-title">-->
<!--<div class="list-item che" />-->
<!--<div class="list-item">-->
<!--<span>安装单号:</span>-->
<!--<span>{{ item.id }}</span>-->
<!--</div>-->
<!--<div class="list-item">-->
<!--<span>购买单号:</span>-->
<!--<span>{{ item.buy_order_no }}</span>-->
<!--</div>-->
<!--<div class="list-item">-->
<!--<span>创建日期:</span>-->
<!--<span>{{ item.create_time }}</span>-->
<!--</div>-->

<!--<div class="list-item a-link">-->
<!--<a>未回访</a>-->
<!--<a v-if="rolesbtn('o-67-5')">未安装</a>-->
<!--</div>-->

<!--<div class="list-item a-link">-->
<!--<a @click="handelInfo(item, 'sales')" v-if="rolesbtn('o-67-7')">售后</a>-->
<!--<a v-if="rolesbtn('o-67-5')" @click="handelInfo(item,type)">详情</a>-->
<!--</div>-->
<!--</div>-->
<!--<div class="table-content">-->
<!--<div class="table-filed">-->
<!--<div class="filed-span">-->
<!--<span>产品:</span>-->
<!--<div>-->
<!--<div class="field">{{ item.product_titile }}</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="filed-span">-->
<!--<span>平台:</span>-->
<!--<div>-->
<!--<div class="field">{{ item.lazada_title }}</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="filed-span">-->
<!--<span>车型:</span>-->
<!--<div>-->
<!--<div class="field">{{ item.model_title }}</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="table-filed jp">-->
<!--<div class="filed-span">-->
<!--<span>微信昵称:</span>-->
<!--<div>-->
<!--<div v-if="item.weacht" class="field">{{ item.weacht.nickname }}</div>-->

<!--<div v-else class="field">会员尚未注册</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="filed-span">-->
<!--<span>联系人</span>-->
<!--<div>-->
<!--:-->
<!--<div class="field">{{ item.contact }}{{ item.tel }}</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="filed-span">-->
<!--<span>备注</span>-->
<!--<div>-->
<!--:-->
<!--<div class="field">{{ item.desc }}</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="table-filed jp">-->
<!--<div class="filed-span">-->
<!--<span>业务员</span>-->
<!--<div>-->
<!--:-->
<!--<div class="field" v-if="item.sales">{{ item.sales.realName }}</div>-->
<!--<div class="field" v-else-if="item.status === '待处理'">尚未派单</div>-->
<!--<div class="field" v-else>未分配</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="filed-span">-->
<!--<span>次业务员</span>-->
<!--<div class="kc">-->
<!--:-->
<!--<div class="field" v-if="item.insales">{{ item.insales.realName }}</div>-->

<!--<div class="field" v-else-if="item.status === '待处理'">尚未派单</div>-->
<!--<div class="field" v-else>未分配</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->

<!--<div class="table-filed jl">-->
<!--<div class="filed-price">¥ {{ item.ins_cost }}</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="table-title table-bottom">-->
<!--<div class="list-item che" />-->
<!--<div class="list-item">-->
<!--<span>状态:</span>-->

<!--<a class="a-link" v-if="item.status === '驳回'">待处理 {{ item.rejected }}{{ item.status }}</a>-->
<!--<a-->
<!--class="a-link"-->
<!--@click="handelEva(item)"-->
<!--v-else-if="item.is_eva === 1"-->
<!--&gt;{{ item.status }} (已评价)</a>-->
<!--<a class="a-link" v-else>-->
<!--{{ item.status }}-->
<!--<span v-if="item.is_rejected === 1">{{ item.rejected }}驳回</span>-->
<!--</a>-->
<!--</div>-->

<!--<div class="list-item">-->
<!--<span>售前客服:</span>-->
<!--<div v-if="item.pre">{{ item.pre.realName }}</div>-->
<!--<div v-else>暂无</div>-->
<!--</div>-->

<!--<div class="list-item">-->
<!--<span>售后客服:</span>-->
<!--<div v-if="item.pre">{{ item.pre.realName }}</div>-->
<!--<div v-else>暂无</div>-->
<!--</div>-->

<!--<div class="list-item shop-item">-->
<!--<span>安装门店:</span>-->
<!--<span v-if="item.shop">{{ item.shop.shopname }} {{ item.shop.shopkeeper }}</span>-->
<!--<div class="field" v-else-if="item.status === '待处理'">尚未派单</div>-->
<!--<div class="field" v-else>门店未选择</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->

<!--&lt;!&ndash; 营销单 &ndash;&gt;-->
<!--<div v-for="(item, index) in list" v-if="total > 0 && listQuery.sstatus === 2" class="table2">-->
<!--<div class="table-title">-->
<!--<div class="list-item che" />-->
<!--<div class="list-item">-->
<!--<span>营销单号:</span>-->
<!--<span>{{ item.id }}</span>-->
<!--</div>-->
<!--<div class="list-item">-->
<!--<span>微信订单号:</span>-->
<!--<span>{{ item.buy_order_no }}</span>-->
<!--</div>-->
<!--<div class="list-item">-->
<!--<span>下单日期:</span>-->
<!--<span>{{ item.create_time }}</span>-->
<!--</div>-->

<!--<div class="list-item a-link">-->
<!--<a>日志</a>-->
<!--<a v-if="rolesbtn('o-67-5')">详情</a>-->
<!--</div>-->
<!--</div>-->
<!--<div class="table-content">-->
<!--<div class="table-imgs">-->
<!--<img-->
<!--src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1278087135,228623584&fm=26&gp=0.jpg"-->
<!--/>-->
<!--</div>-->
<!--<div class="table-filed ju">-->
<!--<div class="filed-span">-->
<!--<div class="field">200元抵400元，到店还有精美礼品1分</div>-->
<!--</div>-->
<!--<div class="filed-span">-->
<!--<span>券份数:</span>-->
<!--<div>-->
<!--<div class="field">1</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="table-filed jp ju">-->
<!--<div class="filed-span">-->
<!--<span>微信昵称:</span>-->
<!--<div>-->
<!--<div v-if="item.weacht" class="field">{{ item.weacht.nickname }}</div>-->

<!--<div v-else class="field">会员尚未注册</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="filed-span">-->
<!--<span>姓名电话</span>-->
<!--<div>-->
<!--:-->
<!--<div class="field">{{ item.contact }}{{ item.tel }}</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="table-filed">-->
<!--<div class="filed-span">-->
<!--<span>车型</span>-->
<!--<div>-->
<!--:-->
<!--<div class="field">{{ item.bank }}</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->

<!--<div class="table-filed jl">-->
<!--<div class="filed-price">¥ {{ item.ins_cost }}</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="table-title table-bottom">-->
<!--<div class="list-item che" />-->
<!--<div class="list-item">-->
<!--<span>状态:</span>-->
<!--<a v-if="item.status === '驳回'" class="a-link">待核销 {{ item.rejected }}{{ item.status }}</a>-->
<!--<a v-else class="a-link">{{ item.status }}</a>-->
<!--</div>-->
<!--<div class="list-item">-->
<!--<span>业务员:</span>-->
<!--<div v-if="item.pre">{{ item.pre.realName }}</div>-->
<!--<div v-else>暂无</div>-->
<!--</div>-->

<!--<div class="list-item">-->
<!--<span>核销码:</span>-->
<!--<div v-if="item.pre">{{ item.pre.realName }}</div>-->
<!--<div v-else>暂无</div>-->
<!--</div>-->

<!--<div class="list-item">-->
<!--<span>安装门店:</span>-->
<!--<div>{{ item.order_id }}</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->

<!--&lt;!&ndash; 质保卡 &ndash;&gt;-->
<!--<div v-for="(item, index) in list" v-if="total > 0 && listQuery.sstatus === 3" class="table3">-->
<!--<div class="table-content">-->
<!--<div class="table-filed">-->
<!--<div class="filed-span">-->
<!--<span>产品:</span>-->
<!--<div>-->
<!--<div class="field">征服者S</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="filed-span">-->
<!--<span>车型:</span>-->
<!--<div>-->
<!--<div class="field">宝骏7302014款舒适版</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="filed-span">-->
<!--<span>车牌:</span>-->
<!--<div>-->
<!--<div class="field">粤A·12345</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="table-filed">-->
<!--<div class="filed-span">-->
<!--<span>车主姓名:</span>-->
<!--<div>-->
<!--<div class="field">周某某</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="filed-span">-->
<!--<span>车主电话:</span>-->
<!--<div>-->
<!--<div class="field">13777777777</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="filed-span">-->
<!--<span>车主地址:</span>-->
<!--<div>-->
<!--<div class="field">广东省广州市白云区</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="table-filed">-->
<!--<div class="filed-span">-->
<!--<span>安装门店:</span>-->
<!--<div>-->
<!--<div class="field">欧大师车灯升级 欧阳云海</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="filed-span">-->
<!--<span>门店电话:</span>-->
<!--<div>-->
<!--<div class="field">{{ item.lazada_title }}</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="filed-span">-->
<!--<span>门店地区:</span>-->
<!--<div>-->
<!--<div class="field">广东省广州市白云区</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="table-filed">-->
<!--<div class="filed-span">-->
<!--<span>有效期:</span>-->
<!--<div>-->
<!--<div class="field">2019.12.29 12:12:00-2020.08.08 12:00:00</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="filed-span">-->
<!--<span>购买日期:</span>-->
<!--<div>-->
<!--<div class="field">2019.12.28 12:00:00</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="filed-span">-->
<!--<span>质保码:</span>-->
<!--<div>-->
<!--<div class="field">123456</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->

<!--<div v-if="total < 1" class="no-data">当前暂无数据</div>-->
<!--</div>-->
