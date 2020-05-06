<template>
  <div>


    <el-dialog
      :title="Stitle"
      :visible.sync="dialogVisible"
      width="50%"
      class="w-dia"
      :before-close="handleClose">
      <div class="n-post">
        <el-dialog
          width="60%"
          title="安装门店选择"
          :visible.sync="innerVisible"
          append-to-body
          class="n-post"
        >
          <el-form :model="shopQuery" class="form-container" label-width="50px">

            <el-row>
              <el-col :span="8">
                <el-form-item size="mini" label="地址:" class="postInfo-container-item">
                  <el-cascader
                    :disabled="is_disabled"
                    size="mini"
                    :options="cityoptions"
                    v-model="shopQuery.cityCode"
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item size="mini" label="姓名:" class="postInfo-container-item">
                  <el-input size="mini" v-model="shopQuery.shopname" placeholder="请输入内容"></el-input>

                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item size="mini" label="电话:" class="postInfo-container-item">
                  <el-input size="mini" v-model="shopQuery.tel" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="margin-left: 20px">
                <el-button type="primary" size="mini">搜索</el-button>
              </el-col>
            </el-row>
          </el-form>

        </el-dialog>
      </div>
      <div class="dia-content">
        <div class="c-data">
          <div class="c-title">车主信息</div>
          <div class="c-content">
            <div class="ct-item">
              <span class="label">客户OpenID</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.openid" placeholder="请输入内容"></el-input>
              </div>
            </div>

            <div class="ct-item">
              <span class="label">购买账号</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.buy_account"
                          placeholder="请输入内容"></el-input>
              </div>
            </div>


            <div class="ct-item">
              <span class="label"> 购买平台</span>
              <div>

                <el-cascader size="mini" :options="lazada"
                             filterable
                             clearable
                             :disabled="is_disabled"
                             v-model="postFrom.lazada_list"
                             change-on-select></el-cascader>
              </div>
            </div>


            <div class="ct-item">
              <span class="label">购买产品</span>
              <div>

                <el-cascader size="mini" :options="productTree"
                             filterable
                             clearable
                             :disabled="is_disabled"
                             v-model="postFrom.buy_product_id"
                             change-on-select></el-cascader>
              </div>
            </div>

            <div class="ct-item">
              <span class="label">订单金额</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.no_price"
                          placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="ct-item">
              <span class="label">联系人</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.contact" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="ct-item">
              <span class="label">联系电话</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.tel" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="ct-item">
              <span class="label">地址</span>
              <div>
                <el-cascader
                  style="width: 100%;"
                  size="mini"
                  :disabled="is_disabled"
                  :options="cityoptions"
                  v-model="postFrom.city_code"
                >
                </el-cascader>

                <!--<el-input size="mini" v-model="postFrom.openid" placeholder="请输入内容"></el-input>-->
              </div>
            </div>
            <div class="ct-item">
              <span class="label">详细地址</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.city_desc"
                          placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="ct-item">
              <span class="label">车牌号</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.number_plate"
                          placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="ct-item">
              <span class="label">车型</span>
              <div>
                <el-cascader size="mini" :options="regionHiera"
                             filterable
                             clearable
                             :disabled="is_disabled"
                             v-model="postFrom.car_model"
                             change-on-select></el-cascader>
              </div>
            </div>
            <div class="ct-item">
              <span class="label">备注</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.desc" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="ct-item">
              <span class="label">提交时间</span>
              <div>
                <el-input size="mini" disabled v-model="postFrom.create_time" placeholder="请输入内容"></el-input>
              </div>
            </div>

          </div>
        </div>
        <div class="c-data">
          <div class="c-title">派单信息</div>
          <div class="c-content">
            <div class="ct-item">
              <span class="label">购买单号</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.buy_order_no"
                          placeholder="请输入内容"></el-input>
              </div>
            </div>

            <div class="ct-item">
              <span class="label">门店名称</span>
              <div>

                <el-select size="mini" :disabled="is_disabled" @change="handleShop" v-model="postFrom.shop_id"
                           filterable placeholder="请选择">
                  <el-option
                    v-for="item in shop"
                    :label="item.shopname"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>


            <div class="ct-item">
              <span class="label">门店地址</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.shop_location"
                          placeholder="请输入内容"></el-input>
              </div>
            </div>


            <div class="ct-item">
              <span class="label">门店电话</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.shop_tel"
                          placeholder="请输入内容"></el-input>
              </div>
            </div>


            <div class="ct-item">
              <span class="label">主业务员</span>
              <div>
                <el-select size="mini" :disabled="is_disabled" v-model="postFrom.salesman_id" filterable
                           placeholder="请选择">
                  <el-option
                    v-for="item in salesman"
                    :label="item.realName"
                    :value="item.id"
                    :disabled="postFrom.in_salesman_id===item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="ct-item">
              <span class="label">次业务员</span>
              <div>
                <el-select size="mini" :disabled="is_disabled" v-model="postFrom.in_salesman_id" filterable
                           placeholder="请选择">
                  <el-option
                    v-for="item in salesman"
                    :label="item.realName"
                    :value="item.id"
                    :disabled="postFrom.salesman_id===item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="ct-item">
              <span class="label">安装费用</span>
              <div>
                <el-input :disabled="is_disabled" size="mini" v-model="postFrom.ins_cost"
                          placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="ct-item">
              <span class="label">客服</span>
              <div>

                <el-input size="mini" :disabled="is_disabled" disabled="true" v-if="postFrom.pre"
                          v-model="postFrom.pre.realName" placeholder="请输入内容"></el-input>
                <el-input size="mini" :disabled="is_disabled" disabled="true" v-else
                          v-model="userinfo.realName" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="ct-item">
              <span class="label">客服备注</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.service_desc"
                          placeholder="请输入内容"></el-input>
              </div>
            </div>

          </div>
        </div>
        <!--配件信息-->
        <div class="c-data">
          <div class="c-title">配件信息</div>
          <div class="c-content">
            <div class="ct-item">
              <span class="label">支架</span>
              <div>
                <el-select size="mini" :disabled="is_disabled" v-model="postFrom.holder" filterable placeholder="请选择">
                  <el-option
                    v-for="item in holder"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="ct-item">
              <span class="label">易改件</span>
              <div>
                <el-select size="mini" :disabled="is_disabled" v-model="postFrom.ygj" filterable placeholder="请选择">
                  <el-option
                    v-for="item in ygj"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>


            <div class="ct-item">
              <span class="label">装饰罩</span>
              <div>
                <el-select size="mini" :disabled="is_disabled" v-model="postFrom.decorate" filterable placeholder="请选择">
                  <el-option
                    v-for="item in ygj"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>


            <div class="ct-item">
              <span class="label">解码</span>
              <div class="d_code">
                <el-select size="mini" :disabled="is_disabled" v-model="postFrom.is_code" filterable placeholder="请选择">
                  <el-option
                    v-for="item in holder"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input size="mini" :disabled="is_disabled" v-if="postFrom.is_code>1" v-model="postFrom.code"
                          placeholder="请输入内容"></el-input>
              </div>
            </div>

          </div>
        </div>
        <!--配货方案-->


        <div class="c-data" v-if="
          postFrom.status==='重新派单'
        ||postFrom.status==='待处理'
        ||postFrom.status==='待确认(业务)'
        ||postFrom.status===' 待确认(门店)'
        ||postFrom.status==='待确认(门店)'
         ||postFrom.status===' 待安装'
  ||postFrom.status===1
        ||postFrom.status===2
        ||postFrom.status===3
        ||postFrom.status===4
         ||postFrom.status===5">
          <div class="c-title">配货方案</div>
          <div class="c-content">
            <div class="ct-item">
              <span class="label">支架</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.holder_text"
                          placeholder="请输入内容"></el-input>
              </div>
            </div>

            <div class="ct-item">
              <span class="label">易改件</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.ygj_text"
                          placeholder="请输入内容"></el-input>
              </div>
            </div>


            <div class="ct-item">
              <span class="label">装饰罩</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.decorate_text"
                          placeholder="请输入内容"></el-input>
              </div>
            </div>


            <div class="ct-item">
              <span class="label">解码</span>
              <div>
                <el-input size="mini" :disabled="is_disabled" v-model="postFrom.code_text"
                          placeholder="请输入内容"></el-input>
              </div>
            </div>

          </div>
        </div>
        <!--安装凭证-->
        <div class="c-data" v-else v-if="postFrom.credentials">
          <div class="c-title">安装凭证</div>
          <div class="c-content">
            <img class="credentials-img" :src="postFrom.credentials"/>

          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">


             <el-button size="mini" @click="handleClose">关闭</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import { CarBrand } from '@/api/tools'

  import { GetSaleByAll } from '@/api/salesman'
  import { regionDataPlus } from 'element-china-area-data'
  import { mapGetters } from 'vuex'
  import { GetDataByShopAll } from '@/api/shop'

  import { change, changeAll, del, delAll, GetDataByList, PostDataByAdd } from '@/api/order'

  import { GetecshopByList } from '@/api/ecshop'
  import { getArrByKey, pickerOptions } from '@/utils'
  import { GetProductByTree } from '@/api/product'

  const defaultForm = {
    logcontent: '',
    openid: 'oQJN40ldFZYLvqoIZm3NGwFu8oKA',
    lazada_id: '',
    lazada_list: '',
    lazada_index: '',
    buy_order_no: '12123',
    buy_account: '199',
    buy_product_id: '',
    no_price: '199',
    contact: '梁泽祥',
    tel: '18677947067',
    city_code: undefined,
    city_desc: '',
    number_plate: 'A871237',
    car_model: undefined,
    car_index: '',
    car_model_id: ''
  }

  export default {
    name: 'sendOrder',
    data() {
      return {
        shopQuery: {
          cityCode: undefined,
          shopname: undefined,
          tel: undefined
        },
        innerVisible: false,
        // dialogVisible: false,
        checked: true,
        tableKey: 0,
        CarModellist: [],//车型数据
        lazada: [],//所有平台
        salesman: [],//所有业务员
        holder: [
          {
            label: '无',
            value: 1
          },
          {
            label: '解码器',
            value: 2
          },
          {
            label: '解码线组',
            value: 3
          },
          {
            label: '宝典到店',
            value: 4
          }

        ],//支架
        ygj: [
          {
            label: '无',
            value: 1
          },
          {
            label: '随机发',
            value: 2
          },
          {
            label: '供应商代发',
            value: 3
          }
        ],//易改件
        device: [],//装置罩
        carl: [],
        list: null,
        total: null,

        // postFrom: Object.assign({}, defaultForm),
        cityoptions: regionDataPlus,//地址
        selectedRows: null,
        listLoading: true,
        showSearch: false,
        options: [],
        shop: [],
        listQuery: {
          page: 1,
          limit: 10,
          status: '-1',
          title: ''
        },
        buttonDisabled: true,
        deleting: false,
        pickerOptions: pickerOptions,
        currentIndex: -1,
        productTree: [],
        regionHiera: []
      }
    },
    computed: {
      ...mapGetters([
        'userinfo',
        'brand'
      ])
    },
    props: {
      postFrom: {
        type: Object,
        default: function() {
          return Object.assign({}, defaultForm)
        }
      },
      Stitle: {
        type: String,
        default: ''
      },
      is_disabled: {
        type: Boolean,
        default: true

      },
      dialogVisible: {
        type: Boolean,
        default: false
      }

    },
    created() {
      if (this.brand === undefined) {
        CarBrand().then(res => {
          this.regionHiera = res.data
        })
      } else {
        this.regionHiera = this.brand
      }
      GetProductByTree().then(res => {
        this.productTree = res.data
      })
      GetecshopByList().then(res => {
        this.lazada = res.data
      })
      GetDataByShopAll().then(res => {
        this.shop = res.data
      })

      GetSaleByAll().then(res => {
        this.salesman = res.data
      })
    },
    methods: {

      //所选门店
      handleShop(e) {

        this.postFrom.shop_id = e
        for (let i = 0; i < this.shop.length; i++) {
          if (e === this.shop[i].id) {
            this.postFrom.shop_location = this.shop[i].cityName + ' ' + this.shop[i].location
            this.postFrom.shop_tel = this.shop[i].tel
            return
          }
        }
      },
      handleClose() {
        this.$emit('handleInfoClose')
      },
      updateRow(type) {
        this.postFrom.city_code = this.postFrom.city_code.join(',')
        this.postFrom.car_model = this.postFrom.car_model.join(',')
        this.postFrom.lazada_list = this.postFrom.lazada_list.join(',')
        this.postFrom.buy_product_id = this.postFrom.buy_product_id.join(',')
        if (this.postFrom.status === '待处理') {
          this.postFrom.status = 1
          this.postFrom.pre_sales = this.userinfo.id
          console.log(this.postFrom)
          this.postFrom.logcontent = '待确认(业务员)' + ' ' + this.userinfo.realName + '派单 ' + ' ' + '已通知'
        }
        if (this.postFrom.status === '重新派单') {
          this.postFrom.status = 1
          this.postFrom.logcontent = '待确认(业务员)' + ' ' + this.userinfo.realName + '重新派单 ' + ' ' + '已通知'
        }
        if (this.postFrom.status === '待确认(业务)') {
          this.postFrom.status = 2
          this.postFrom.logcontent = '待确认(门店)' + ' ' + this.userinfo.realName + '同意派单,'
        }

        if (this.postFrom.status === '待确认(门店)') {
          this.postFrom.status = 3
          this.postFrom.logcontent = '待安装' + ' ' + this.userinfo.realName + '已接单,'
        }
        if (this.postFrom.status === '待安装') {
          this.postFrom.status = 4

          this.postFrom.logcontent = '已安装' + ' ' + this.userinfo.realName + '安装完成,'

        }
        if (this.postFrom.status === '已安装') {
          this.postFrom.status = 5
          this.postFrom.after_sale = this.userinfo.id
          this.postFrom.logcontent = '财审1' + ' ' + this.userinfo.realName + '确认安装,'

        }
        if (this.postFrom.status === '财审1') {
          this.postFrom.status = 6
          this.postFrom.logcontent = '财审2' + ' ' + this.userinfo.realName + '审核通过,'

        }
        if (this.postFrom.status === '财审2') {
          this.postFrom.status = 7
          this.postFrom.logcontent = '待结算' + ' ' + this.userinfo.realName + '结算通过,'
        }
        if (this.postFrom.status === '待结算') {
          this.postFrom.status = 8
          this.postFrom.is_pay = type
          if (type === 1) {
            this.postFrom.logcontent = '已结算' + ' ' + this.userinfo.realName + '结算微信支付,'
          }
          if (type === 2) {
            this.postFrom.logcontent = '已结算' + ' ' + this.userinfo.realName + '结算挂帐,'
          }

        }

        PostDataByAdd(this.postFrom).then(res => {
          this.$emit('handleClose')

          this.postFrom = Object.assign({}, defaultForm)
          this.postFrom.city_code = this.postFrom.city_code.splice(',')
          this.postFrom.car_model = this.postFrom.car_model.splice(',')
        })
      }
    },
    mounted() {
      console.log(this.userinfo)
    }
  }
</script>

<style lang="scss">

  .w-dia {
    .el-dialog__body {
      padding: 1px 20px;
      padding-left: 35px;
    }
    .el-dialog__title {
      font-size: 14px;
    }
  }

  .dia-content {
    display: flex;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 12px;
    flex-direction: row;
    flex-wrap: wrap;
    .c-data {
      width: 50%;
      margin-bottom: 30px;
      .c-title {
        font-weight: 800;
        margin-bottom: 10px;

      }
      .el-select--mini {
        width: 100%;
      }
      .el-cascader--mini {
        width: 100%;
        .el-input__suffix {
          right: -6px;
        }
      }
      .ct-item {
        display: flex;
        flex-direction: row;
        text-align-last: justify;
        align-items: center;
        margin-bottom: 3px;

        .d_code {
          display: flex;
          flex-direction: row;
          width: 60%;
          .el-select {
            width: 50%;
          }
        }
        .label {
          width: 23%;
          margin-right: 10px;

        }

      }
    }
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

  .credentials-img {
    width: 150px;
    height: 100px;
    border-radius: 30px;
  }

</style>
