<template>
  <div class="app-container">
    <!-- 搜索 -->

    <!--{{regionHiera}}-->

    <div class="filter-container dn">
      <el-form :inline="true" :model="listQuery">
        <el-row>
          <el-col :span="4">
            <el-form-item label="支付单号:">
              <el-input v-model="listQuery.id" size="mini" @keyup.enter.native="handleFilter()" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="订单状态:">
              <el-select
                v-model="listQuery.status"
                size="mini"
                filterable
                clearable
                placeholder
                @change="handleFilter()"
              >
                <el-option v-for="item in orderStatus" :label="item.lable" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="申请人:">
              <el-input
                v-model="listQuery.proposer"
                size="mini"
                @keyup.enter.native="handleFilter()"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="4">
            <el-form-item label="微信昵称:">
              <el-input
                size="mini"
                @keyup.enter.native="handleFilter()"
                v-model="listQuery.nickname"
              ></el-input>
            </el-form-item>
          </el-col>-->

          <el-col :span="8">
            <el-form-item label="日期:">
              <el-date-picker
                v-model="listQuery.startTime"
                style="width: 250px;"
                size="mini"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']"
              />
              <!--<el-input size="mini" v-model="listQuery.shopname" placeholder="请输入内容"></el-input>-->
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="申请客服:">
              <el-cascader
                v-model="listQuery.buy_product_id"
                size="mini"
                :options="productTree"
                filterable
                clearable
                placeholder
                change-on-select
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row />
      </el-form>
    </div>

    <!-- 操作 -->
    <el-row style="margin-bottom: 10px;    text-align: right;    margin-right: 45px;">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-tooltip content="搜索" placement="top">
          <el-button
            v-if="rolesbtn('o-97-1')"
            v-waves
            type="primary"
            size="mini"
            @click="handleFilter()"
          >搜索</el-button>
        </el-tooltip>
        <!--<el-tooltip content="导出" placement="top">-->
          <!--<el-button-->
            <!--v-if="rolesbtn('o-97-4')"-->
            <!--v-waves-->
            <!--type="primary"-->
            <!--size="mini"-->
            <!--@click="handleDownload"-->
          <!--&gt;导出</el-button>-->
        <!--</el-tooltip>-->
        <el-tooltip content="新增" placement="top">
          <el-button
            v-if="rolesbtn('o-97-3')"
            v-waves
            type="primary"
            size="mini"
            @click="handleCreate()"
          >新增</el-button>
        </el-tooltip>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <div v-loading="listLoading" class="new-table">
      <div class="tab">
        <div
          class="list-item"
          :class="listQuery.sstatus===1?'selected':''"
          style="width: 15%"
          @click="handleStatusChange(1)"
        >
          <span>待初审</span>
          <span class="price">{{ countdata[1]['total'] }}</span>
        </div>
        <div
          class="list-item"
          :class="listQuery.sstatus===2?'selected':''"
          style="width: 15%"
          @click="handleStatusChange(2)"
        >
          <span>待财审1</span>
          <span class="price">{{ countdata[2]['total'] }}</span>
        </div>
        <div
          class="list-item"
          :class="listQuery.sstatus===3?'selected':''"
          @click="handleStatusChange(3)"
        >
          <span>待财审2</span>
          <span class="price">{{ countdata[3]['total'] }}</span>
        </div>
        <div
          class="list-item"
          :class="listQuery.sstatus===4?'selected':''"
          @click="handleStatusChange(4)"
        >
          <span>待结算</span>
          <span class="price">{{ countdata[4]['total'] }}</span>
        </div>
        <div
          class="list-item"
          :class="listQuery.sstatus===5?'selected':''"
          @click="handleStatusChange(5)"
        >
          <span>已结算</span>
          <span class="price">{{ countdata[5]['total'] }}</span>
        </div>
        <div
          class="list-item"
          :class="listQuery.sstatus==='all'?'selected':''"
          @click="handleStatusChange('all')"
        >
          <span>全部</span>
          <span class="price">{{ allsum }}</span>
        </div>
        <div
          class="list-item"
          :class="listQuery.sstatus===9?'selected':''"
          @click="handleStatusChange(6)"
        >
          <span>驳回</span>
          <span class="price">{{ countdata[6]['total'] }}</span>
        </div>
      </div>
      <div v-for="(item,index) in list" v-if="total>0" class="table">
        <div class="table-title">
          <div class="list-item">
            <span>申请单号:</span>
            <span>{{ item.id }}</span>
          </div>
          <div class="list-item">
            <span>申请人:</span>
            <span>{{ item.proposer }}</span>
          </div>

          <div class="list-item">
            <span>申请日期:</span>
            <span>{{ item.create_time }}</span>
          </div>

          <div class="list-item a-link">
            <a @click="handelInfo(item)">详情</a>
            <a v-if="rolesbtn('o-67-5')" @click="handleEdit(item)">修改</a>
          </div>
        </div>
        <div class="table-content">
          <div class="table-filed">
            <div class="filed-span">
              <span>平台:</span>
              <div>
                <div class="field">{{ item.lazada_title }}</div>
              </div>
            </div>
            <div class="filed-span">
              <span>类别:</span>
              <div>
                <div class="field">{{ item.retype }}</div>
              </div>
            </div>
          </div>

          <div class="table-filed jp">
            <div class="filed-span">
              <span>开户行</span>
              <div>
                :
                <div class="field">{{ item.bank }}</div>
              </div>
            </div>
            <div class="filed-span">
              <span>账号</span>
              <div class="kc">
                :
                <div class="field">{{ item.bank_account }}</div>
              </div>
            </div>

            <div class="filed-span">
              <span>姓名</span>
              <div>
                :
                <div class="field">{{ item.bank_name }}</div>
              </div>
            </div>
          </div>

          <div class="table-filed jp">
            <div class="filed-span">
              <span>备注：</span>
              <div>
                :
                <div class="field">{{ item.desc }}</div>
              </div>
            </div>
          </div>

          <div class="table-filed jl">
            <div class="filed-price">¥ {{ item.no_price }}</div>
          </div>

          <div class="table-filed jl" style="justify-content: center">
            <div class="filed-price">
              <el-button
                v-if="item.status==='待初审'&&rolesbtn('o-97-h-1')"
                size="mini"
                type="primary"
                @click="handleUpdate(item)"
              >初审通过</el-button>

              <el-button
                v-if="item.status==='待财审1'&&rolesbtn('o-97-h-2')"
                size="mini"
                type="primary"
                @click="handleUpdate(item)"
              >财审1通过</el-button>

              <el-button
                v-if="item.status==='待财审2'&&rolesbtn('o-97-h-3')"
                size="mini"
                type="primary"
                @click="handleUpdate(item)"
              >财审2通过</el-button>

              <el-button
                v-if="item.status==='待结算'&&rolesbtn('o-97-h-5')"
                size="mini"
                type="primary"
                @click="handleUpdate(item)"
              >确认结算</el-button>

              <el-button
                v-if="item.status==='驳回'"
                size="mini"
                type="primary"
                @click="handleUpdate(item)"
              >重新派单</el-button>
            </div>
          </div>
        </div>
        <div class="table-title table-bottom">
          <div class="list-item che" />
          <div class="list-item">
            <span>状态:</span>
            <a v-if="item.status==='驳回'" class="a-link">待处理 {{ item.rejected }}{{ item.status }}</a>
            <a v-else class="a-link">{{ item.status }}</a>
          </div>

          <div class="list-item order-btn">
            <template v-if="item.status==='待初审'||item.status==='待财审1'||item.status==='待财审2'">
              <el-button
                v-if="rolesbtn('o-96-h-1')||rolesbtn('o-96-h-2')||rolesbtn('o-96-h-3')||rolesbtn('o-96-h-4')"
                size="mini"
                type="warning"
                plain
                @click="handelRejected(item)"
              >驳回</el-button>
            </template>

            <el-button

              size="mini"
              type="warning"
              plain
              @click="handleDelete(index,item.id)"
            >删除</el-button>
          </div>
        </div>
      </div>

      <div v-if="total<1" class="no-data">当前暂无数据</div>
    </div>
    <!-- 分页 -->
    <div class="pagination-container">
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

    <sendOper
      v-if="dialogVisible"
      :stitle="Stitle"
      :post-from="postFrom"
      :dialog-visible="dialogVisible"
      @handleClose="handleClose"
    />

    <Audit
      v-if="dialogAudit"
      :stitle="Stitle"
      :post-from="postFrom"
      :dialog-visible="dialogAudit"
      @handleClose="handleCloseAudit"
    />

    <!--驳回数据-->
    <el-dialog
      :title="reTitle"
      :visible.sync="RedialogVisible"
      width="30%"
      :before-close="handleRe"
    >
      <el-form :model="shopQuery" class="form-container" label-width="70px">
        <el-form-item size="mini" label="驳回原因:" class="postInfo-container-item">
          <el-input
            v-model="reFrom.content"
            size="mini"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="RedialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="handelPostRe">确 定</el-button>
      </span>
    </el-dialog>
    <!--退货-->

    <!--详情数据-->

    <OrderInfocost
      v-if="infodialogVisible"
      :postFrom="postFrom"
      :infodialog-visible="infodialogVisible"
      @handelInfoDialog="handelInfoDialog"
    />
  </div>
</template>

<script>
var app0

import {
  change,
  changeAll,
  del,
  delAll,
  GetDataByList,
  GetQueryBydownload,
  PostDataByAdd,
  PostNoteByAdd,
  PostReturnedByAdd
} from '@/api/costorder'
import waves from '@/directive/waves'
import { getArrByKey, pickerOptions } from '@/utils'
import { mapGetters } from 'vuex'

// import sendOrder from "./install/sendOrder";
import sendOper from './install/sendOper'

// import OrderInfo from "./install/OrderInfo";
import OrderInfocost from './install/OrderInfocost'

import Audit from './install/costaudit'

import { CarBrand } from '@/api/tools'
import { GetecshopByList } from '@/api/ecshop'
import { GetDataByShopAll } from '@/api/shop'


import { GetSaleByAll } from '@/api/salesman'
import { regionDataPlus } from 'element-china-area-data'

export default {
  name: 'Operate',
  // components: { rolesForm },
  directives: {
    waves
  },
  components: {
    sendOper,
    OrderInfocost,
    Audit
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
      isIndeterminate: true,
      checkedCities: [], // 已选择
      checkAll: false,
      dialogAudit: false,
      loading: true,
      sumorder: 0,
      productTree: [], // 产品树
      reTitle: '',
      reFrom: {
        role: 2,
        type: 1
      },
      after: [
        {
          lable: '已售后',
          value: 1
        },
        {
          lable: '未售后',
          value: 2
        }
      ],

      orderStatus: [
        {
          lable: '全部',
          value: 'all'
        },
        {
          lable: '待初审',
          value: 1
        },
        {
          lable: '待财审1',
          value: 2
        },
        {
          lable: '待财审2',
          value: 3
        },
        {
          lable: '待结算',
          value: 4
        },
        {
          lable: '已结算',
          value: 5
        },
        {
          lable: '驳回',
          value: 6,
          total:0,
        }
      ],
      visit: [
        {
          lable: '已回访',
          value: 1
        },
        {
          lable: '未回访',
          value: 2
        }
      ],
      infodialogVisible: false, // 打开详情
      reOption: [],
      is_disabled: false,
      shopQuery: {
        cityCode: undefined,
        shopname: undefined,
        tel: undefined
      },
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
      CarModellist: [], // 车型数据
      lazada: [], // 所有平台
      salesman: [], // 所有业务员
      device: [], // 装置罩
      carl: [],
      list: null,
      total: 0,

      // postFrom: Object.assign({}, defaultForm),
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
        status: 'all',
        title: '',
        sstatus: 'all'
      },
      allsum: 0,
      countdata: [
        {
          total: 1,
          status: 1
        },
        {
          total: 1,
          status: 1
        },
        {
          total: 1,
          status: 1
        },
        {
          total: 1,
          status: 1
        },
        {
          total: 1,
          status: 1
        },
        {
          total: 1,
          status: 1
        },
        {
          total: 1,
          status: 1
        }
      ],
      buttonDisabled: true,
      deleting: false,
      pickerOptions: pickerOptions,
      currentIndex: -1,
      regionHiera: [],
      Stitle: '',
      checklist: []
    }
  },
  computed: {
    ...mapGetters(['userinfo', 'brand', 'group'])
  },
  watch: {},
  created() {
    this.permissions = this.group.btn.split(',')
    this.fetchList()
    if (this.brand === undefined) {
      CarBrand().then(res => {
        this.regionHiera = res.data
      })
    } else {
      this.regionHiera = this.brand
    }
    GetecshopByList().then(res => {
      this.lazada = res.data
    })

    console.log(this.userinfo)
    // 产品树

    GetDataByShopAll().then(res => {
      this.shop = res.data
    })

    GetSaleByAll().then(res => {
      this.salesman = res.data
    })
  },

  methods: {
    handelcheck(e) {
      var index = this.checklist.indexOf(e)
      console.log(index)
      if (index === -1) {
        this.checklist.push(e)
      } else {
        this.checklist.splice(index, 1)
      }
      if (this.checklist.length === this.list.length) {
        this.isIndeterminate = true
        this.checkAll = true
      }
    },
    handleCheckAllChange(val) {
      this.checkedCities = this.list.length ? this.checklist.length : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length
    },
    handleCloseAudit() {
      this.dialogAudit = false
      this.fetchList()
    },
    handeReturn() {
      // this.$message('暂未编写退货逻辑')
      this.ReturnData.order_id = this.order_id
      PostReturnedByAdd(this.ReturnData).then(res => {
        this.ReturndialogVisible = !this.ReturndialogVisible
        this.fetchList()
      })
    },
    // 导出数据
    handleDownload() {
      // this.downloadLoading = true
      GetQueryBydownload(this.listQuery).then(res => {
        import('@/vendor/Export2Excel').then(excel => {
          console.log(excel)
          const tHeader = [
            '安装单号',
            '订单状态',
            '购买平台',
            '购买单号',
            '购买账号',
            '购买产品',
            '订单金额',
            '联系人',
            '联系电话',
            '省',
            '市',
            '区',
            '详细地址',
            '车牌号',
            '车型',
            '备注',
            '提交时间',
            '门店类别',
            '门店状态',
            '有无宝典',
            '门店名称',
            '门店地址',
            '门店电话',
            '安装费用',
            '主业务员',
            '次业务员',
            '客服',
            '客服备注',
            '派单时间',
            '业务确认时间',
            '门店确认时间',
            '安装完成时间',
            '结算时间',
            '结算方式',
            '是否驳回',
            '驳回原因',
            '回访',
            '售后'
          ]
          const filterVal = [
            'id',
            'status',
            'lazada_title',
            'buy_order_no',
            'buy_account',
            'product_titile',
            'no_price',
            'contact',
            'tel',
            'city_province',
            'city_city',
            'city_carea',
            'city_desc',
            'number_plate',
            'model_title',
            'desc',
            'create_time',
            'shop_type',
            'shop_status',
            'is_book',
            'shop_name',
            'shop_city',
            'shop_tel',
            'ins_cost',
            'sales_name',
            'insales_name',
            'pre_name',
            'service_desc',
            'send_time',
            'business_time',
            'stores_time',
            'install_time',
            'settlement_time',
            'settlement_type',
            'is_rejected',
            'rejected_txt',
            'return',
            'after_sales'
          ]
          const data = this.formatJson(res.data.data, filterVal)

          var day2 = new Date()
          day2.setTime(day2.getTime())
          var s2 =
            day2.getFullYear() +
            '-' +
            (day2.getMonth() + 1) +
            '-' +
            day2.getDate()
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: s2
          })
          this.downloadLoading = false
        })
      })
    },
    formatJson(data, filterVal) {
      return data.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    handleReturn(row) {
      this.ReturndialogVisible = !this.ReturndialogVisible
      this.reTitle = row.id + ' ' + '退货操作'
      this.order_id = row.id
    },
    handleRe() {
      this.RedialogVisible = !this.RedialogVisible
    },
    rolesbtn(val) {
      var index = this.permissions.indexOf(val)
      if (index > -1) {
        return true
      } else {
        return false
      }
    },
    handeldownload() {
      this.$message('暂无导出')
    },
    handelInfoDialog() {
      this.infodialogVisible = !this.infodialogVisible
    },
    // 打开详情
    handelInfo(row) {
      this.postFrom = row
      // if (row.city_code.constructor === String) {
      //   this.postFrom.city_code = this.postFrom.city_code.split(",");
      // }
      // if (row.car_model.constructor === String) {
      //   this.postFrom.car_model = this.postFrom.car_model.split(",");
      // }
      // if (row.lazada_list.constructor === String) {
      //   this.postFrom.lazada_list = this.postFrom.lazada_list.split(",");
      // }
      // let lazada = this.postFrom.lazada_list;
      // this.postFrom.lazada_list = [];

      // for (let i = 0; i < lazada.length; i++) {
      //   this.postFrom.lazada_list.push(parseInt(lazada[i]));
      // }
      this.infodialogVisible = !this.infodialogVisible
    },
    handelPostRe() {
      this.reFrom.admin_id = this.userinfo.id

      this.reFrom.tocontent =
        '订单驳回' +
        '  ' +
        this.userinfo.realName +
        '-' +
        this.userinfo.group.title +
        ' 驳回订单,' +
        ' ' +
        this.reFrom.content
      PostNoteByAdd(this.reFrom).then(res => {
        this.fetchList()
        this.RedialogVisible = !this.RedialogVisible
      })
    },
    // 驳回
    handelRejected(row) {
      var type = row.status
      this.RedialogVisible = !this.RedialogVisible
      this.reFrom.order_id = row.id
      this.reFrom.model_title = row.model_title
      this.reFrom.product_titile = row.product_titile
      this.reFrom.shopname = row.shop.shopname
      this.reFrom.admin_name = this.userinfo.realName
      this.reFrom.openid = row.openid
      this.reFrom.rejected = row.status
      this.reFrom.salesman_id = row.salesman_id
      this.reTitle = row.id + '-' + row.status + ' ' + '驳回原因'
      var option = []

      this.reOption = option
    },
    // 所选门店
    fetchList() {
      this.listLoading = true
      GetDataByList(this.listQuery).then(response => {
        this.list = response.data.data
        console.log(response.data.data, 'shuju')
        this.total = response.data.total
        const countdata = response.data.countdata
        console.log(countdata)

        var temp = []
        var allsum = 0
        for (let i = 0; i < 13; i++) {
          temp.push({ total: 0, status: i })
        }
        for (let i = 0; i < countdata.length; i++) {
          allsum = allsum + countdata[i].total
          temp[countdata[i].status].total = countdata[i].total
          if (countdata[i].status === 9) {
            if (temp[0].total === 0) {
              temp[0].total = countdata[i].total
            } else {
              temp[0].total = temp[0].total + countdata[i].total
            }
          }
        }

        this.listLoading = !this.listLoading
        this.allsum = allsum
        this.countdata = temp
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchList()
    },
    handleFilterClear() {
      this.listQuery = {
        page: 1,
        psize: 10,
        status: '-1',
        title: ''
      }
      this.fetchList()
    },
    handleSizeChange(val) {
      this.listQuery.psize = val
      this.fetchList()
    },

    handleStatusChange(val) {
      this.listQuery.page = 1
      this.listQuery.sstatus = val
      this.fetchList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.fetchList()
    },
    handleModifyStatus(index, id, status) {
      this.list[index]['status'] = 1 - status
      change(id, 'status', 1 - status).then(response => {})
    },
    handleSelectionChange(val) {
      if (val.length > 0) {
        this.buttonDisabled = false
      } else {
        this.buttonDisabled = true
      }
      this.selectedRows = val
    },

    handleCreate() {
      this.postFrom = {}
      this.is_disabled = false
      this.Stitle = '新增支付单'
      this.postFrom.status = '待初审'

      this.dialogVisible = !this.dialogVisible
    },
    handleUpdate(row) {
      this.postFrom = {}
      this.postFrom = row


      this.is_disabled = false

      if (this.postFrom.status === '驳回') {
        this.postFrom.status = '重新派单'
      }

      this.Stitle = this.postFrom.id + '-' + this.postFrom.status + '操作'

      this.dialogAudit = !this.dialogAudit
    },

    handleEdit(row) {
      this.postFrom = {}
      this.postFrom = row
      if (row.city_code.constructor === String) {
        this.postFrom.city_code = this.postFrom.city_code.split(',')
      }

      if (row.car_model !== null) {
        if (row.car_model.constructor === String) {
          this.postFrom.car_model = this.postFrom.car_model.split(',')
        }
      }
      if (row.buy_product_id !== null) {
        if (row.buy_product_id.constructor === String) {
          const arr = []
          const temp = this.postFrom.buy_product_id.split(',')
          for (let i = 0; i < temp.length; i++) {
            arr.push(parseInt(temp[i]))
          }

          this.postFrom.buy_product_id = arr
        }
      }

      if (row.lazada_list !== null) {
        if (row.lazada_list.constructor === String) {
          this.postFrom.lazada_list = this.postFrom.lazada_list.split(',')
        }

        const lazada = this.postFrom.lazada_list
        this.postFrom.lazada_list = []
        for (let i = 0; i < lazada.length; i++) {
          this.postFrom.lazada_list.push(parseInt(lazada[i]))
        }
      }

      this.is_disabled = false

      if (this.postFrom.status === '驳回') {
        this.postFrom.status = '重新派单'
      }

      this.postFrom.status = '修改'

      this.Stitle = '修改操作'

      this.dialogVisible = !this.dialogVisible
    },
    handleClose() {
      this.dialogVisible = !this.dialogVisible
      this.fetchList()
    },

    handleDelete(index, id) {
      const _this = this
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          _this.$set(_this.list[index], 'delete', true)
          del(id)
            .then(response => {
              if (response.status === 1) {
                _this.list.splice(index, 1)
                _this.total = _this.total - 1
                _this.$notify.success(response.msg)
                this.fetchList()
              } else {
                _this.$notify.error('删除成功')
              }
              _this.$notify.error('删除成功')
              _this.$set(_this.list[index], 'delete', false)
            })
            .catch(error => {
              _this.$set(_this.list[index], 'delete', false)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleDeleteAll() {
      const _this = this
      if (this.selectedRows.length > 0) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            _this.deleting = true
            const ids = getArrByKey(_this.selectedRows, 'id')
            const idstr = ids.join(',')
            delAll({ ids: idstr })
              .then(response => {
                if (response.status === 1) {
                  const delindex = []
                  _this.list.forEach(function(item, index, input) {
                    if (ids.indexOf(item.id) > -1) {
                      delindex.push(index)
                    }
                  })
                  for (let i = delindex.length - 1; i >= 0; i--) {
                    _this.list.splice(delindex[i], 1)
                  }
                  _this.total = _this.total - delindex.length
                  _this.$message.success(response.msg)
                } else {
                  _this.$message.error(response.msg)
                }
                _this.deleting = false
              })
              .catch(error => {
                _this.deleting = false
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      } else {
        _this.$message.error('请选择要删除的数据')
      }
    },
    handleCommand(command) {
      const _this = this
      if (this.selectedRows.length > 0) {
        const ids = getArrByKey(this.selectedRows, 'id')
        const idstr = ids.join(',')
        changeAll({ val: idstr, field: 'status', value: command })
          .then(response => {
            if (response.status === 1) {
              _this.list.forEach(function(item, index, input) {
                if (ids.indexOf(item.id) > -1) {
                  _this.list[index]['status'] = command
                }
              })
              _this.$message.success(response.msg)
            } else {
              _this.$message.error(response.msg)
            }
          })
          .catch(error => {})
      } else {
        _this.$message.error('请选择要操作的数据')
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.return {
  .el-form-item--medium {
    margin-bottom: 0px !important;
  }
}

.tish {
  color: red;
  font-size: 12px;
}

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
      // justify-content: space-between;
      align-items: center;
      width: 100%;
      .list-item {
        width: 20%;
      }
      .list-item span:nth-child(1) {
        margin-left: 10%;
      }
      .list-item:nth-child(2) {
        margin-left: 10px;
      }
      .list-item:nth-child(4) {
        text-align: right;
      }
      .a-link {
        color: #409eff;
        width: 20%;
      }
      .a-link a {
        margin: 0 10px;
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
        width: 50%;
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
        justify-content: flex-end;
        margin-right: 10%;
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
}

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
