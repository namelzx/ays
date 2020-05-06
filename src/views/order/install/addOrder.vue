<template>
  <div>
    <el-dialog
      :title="Stitle"
      :visible.sync="dialogVisible"
      width="50%"
      class="w-dia"
      :before-close="handleClose"
    >
      <el-form :model="postFrom" :rules="rules" ref="postFrom" label-width="150px" size="small">
        <div class="dia-content">
          <div class="c-data">
            <div class="c-title">车主信息</div>
            <div class="c-content">
              <div class="ct-item">
                <span class="label">客户OpenID</span>
                <div class="c-input">
                  <el-form-item prop="openid">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.openid"
                      placeholder="请输入客户openid"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">购买账号</span>
                <div class="c-input">
                  <el-form-item prop="buy_account">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.buy_account"
                      placeholder="请输入购买账号"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">购买平台</span>
                <div class="c-input">
                  <el-form-item prop="lazada_list">
                    <el-cascader
                      size="mini"
                      :options="lazada"
                      filterable
                      clearable
                      placeholder="请选择购买平台"
                      :disabled="is_disabled"
                      v-model="postFrom.lazada_list"
                      change-on-select
                    ></el-cascader>
                  </el-form-item>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">购买产品</span>
                <div class="c-input">
                  <el-form-item prop="buy_product_id">
                    <el-cascader
                      size="mini"
                      :options="productTree"
                      filterable
                      clearable
                      placeholder="请选择购买产品"
                      :disabled="is_disabled"
                      v-model="postFrom.buy_product_id"
                      change-on-select
                    ></el-cascader>
                  </el-form-item>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">订单金额</span>
                <div class="c-input">
                  <el-form-item prop="no_price">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.no_price"
                      placeholder="请输入订单金额"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">联系人</span>
                <div class="c-input">
                  <el-form-item prop="contact">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.contact"
                      placeholder="请输入联系人"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">联系电话</span>
                <div class="c-input">
                  <el-form-item prop="tel">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.tel"
                      placeholder="请输入联系电话"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">地址</span>
                <div class="c-input">
                  <el-form-item prop="city_code">
                    <el-cascader
                      style="width: 100%;"
                      size="mini"
                      placeholder="请选择地址"
                      :disabled="is_disabled"
                      :options="cityoptions"
                      v-model="postFrom.city_code"
                    ></el-cascader>
                  </el-form-item>

                  <!--<el-input size="mini" v-model="postFrom.openid" placeholder="请输入内容"></el-input>-->
                </div>
              </div>
              <div class="ct-item">
                <span class="label">详细地址</span>
                <div class="c-input">
                  <el-form-item prop="city_desc">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.city_desc"
                      placeholder="请输入详细地址"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">车牌号</span>
                <div class="c-input">
                  <el-form-item prop="number_plate">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.number_plate"
                      placeholder="请输入车牌内容"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">车型</span>
                <div class="c-input">
                  <el-form-item prop="car_model">
                    <el-cascader
                      size="mini"
                      :props="props"
                      filterable
                      placeholder="请选择车型"
                      clearable
                      :disabled="is_disabled"
                      v-model="postFrom.car_model"
                    ></el-cascader>
                  </el-form-item>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">备注</span>
                <div class="c-input">
                  <el-input
                    size="mini"
                    :disabled="is_disabled"
                    v-model="postFrom.desc"
                    placeholder="请输入备注"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '新增'"
          @click="updateRow"
        >确认添加</el-button>
        <el-button type="primary" size="mini" v-if="postFrom.status === '修改'" @click="updateRow">修改</el-button>
        <el-button type="primary" size="mini" v-if="postFrom.status === '待处理'" @click="updateRow">派单</el-button>
        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '重新派单'"
          @click="updateRow"
        >派单</el-button>

        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '待确认(业务)'"
          @click="updateRow"
        >同意派单</el-button>
        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '待确认(门店)'"
          @click="updateRow"
        >同意接单</el-button>

        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '待安装'"
          @click="updateRow"
        >完成安装</el-button>

        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '已安装'"
          @click="updateRow"
        >确认安装</el-button>
        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '财审1'"
          @click="updateRow"
        >审核通过</el-button>
        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '财审2'"
          @click="updateRow"
        >审核通过</el-button>

        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '待结算'"
          @click="updateRow(1)"
        >微信付</el-button>
        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '待结算'"
          @click="updateRow(2)"
        >挂帐</el-button>

        <el-button size="mini" @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { CarBrand } from "@/api/tools";
import { Citylist } from "@/api/city";

import { getBrand, getSeries ,getModel} from '@/api/tools'

import { GetSaleByAll } from "@/api/salesman";
import ShList from "@/components/shop/index";
import { mapGetters } from "vuex";
import { GetDataByList, GetDataByShopAll } from "@/api/shop";

import { change, changeAll, del, delAll, PostDataByAdd } from "@/api/order";

import { GetecshopByList } from "@/api/ecshop";
import { getArrByKey, pickerOptions } from "@/utils";
import { GetProductByTree } from "@/api/product";

const defaultForm = {
  logcontent: "",
  openid: "oQJN40ldFZYLvqoIZm3NGwFu8oKA",
  lazada_id: "",
  lazada_list: "",
  lazada_index: "",
  buy_order_no: "12123",
  buy_account: "199",
  buy_product_id: "",
  no_price: "199",
  contact: "梁泽祥",
  tel: "18677947067",
  city_code: undefined,
  city_desc: "",
  number_plate: "A871237",
  car_model: undefined,
  car_index: "",
  car_model_id: ""
};

export default {
  name: "sendOrder",
  data() {
    return {
      shopname: "",
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node

          if (level === 0) {
            getBrand().then(res => {

              var data = res.data

              let nodes = []
              for (let i = 0; i < data.length; i++) {
                nodes.push({ label: data[i].name, value: data[i].brandid })
              }
              resolve(nodes)

            })

            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          }
          if (level === 1) {
            getSeries(node.data.value).then(res => {
              var data = res.data
              let nodes = []
              for (let i = 0; i < data.length; i++) {
                nodes.push({ label: data[i].factory_name+' '+data[i].series_name, value: data[i].series_id })
              }
              resolve(nodes)

            })

            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          }


          if (level === 2) {
            getModel(node.data.value).then(res => {
              var data = res.data
              let nodes = []
              for (let i = 0; i < data.length; i++) {
                nodes.push({ label: data[i].label, value: data[i].value ,leaf: level >= 2})
              }
              resolve(nodes)

            })

            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          }
          if(level===3){
            let nodes=[];
            resolve(nodes)
          }
        }
      },
      shopQuery: {
        cityCode: undefined,
        shopname: undefined,
        page: 1,
        limit: 10,
        tel: undefined
      },
      innerVisible: false,
      // dialogVisible: false,
      checked: true,
      tableKey: 0,
      CarModellist: [], //车型数据
      lazada: [], //所有平台
      salesman: [], //所有业务员
      holder: [
        {
          label: "无",
          value: "无"
        },
        {
          label: "解码器",
          value: "解码器"
        },
        {
          label: "解码线组",
          value: "解码线组"
        },
        {
          label: "宝典到店",
          value: "宝典到店"
        }
      ], //支架
      ygj: [
        {
          label: "无",
          value: "无"
        },
        {
          label: "随机发",
          value: "随机发"
        },
        {
          label: "供应商代发",
          value: "供应商代发"
        }
      ], //易改件
      device: [], //装置罩
      carl: [],
      list: null,
      total: null,

      // postFrom: Object.assign({}, defaultForm),
      cityoptions: [], //地址
      selectedRows: null,
      listLoading: true,
      showSearch: false,
      options: [],
      shop: [],
      shoplist: [],
      shoptotal: 0,
      listQuery: {
        page: 1,
        limit: 10,
        status: "-1",
        title: ""
      },
      buttonDisabled: true,
      deleting: false,
      pickerOptions: pickerOptions,
      currentIndex: -1,
      productTree: [],
      regionHiera: [],
      rules: {
        car_model: [{ required: true, message: "请选择车型", trigger: "blur" }],
        openid: [
          { required: true, message: "请输入openid", trigger: "blur" }
          // {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        buy_account: [
          { required: true, message: "请输入购买账号", trigger: "blur" }
        ],
        lazada_list: [
          { required: true, message: "请选择购买平台", trigger: "blur" }
        ],
        buy_product_id: [
          { required: true, message: "请选择购买产品", trigger: "blur" }
        ],
        no_price: [
          { required: true, message: "请输入订单金额", trigger: "blur" }
        ],
        contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        tel: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        city_code: [{ required: true, message: "请选择地址", trigger: "blur" }],
        city_desc: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        number_plate: [
          { required: true, message: "请输入车牌号", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["userinfo", "brand"])
  },
  components: {
    ShList
  },
  props: {
    postFrom: {
      type: Object,
      default: function() {
        return Object.assign({}, defaultForm);
      }
    },
    Stitle: {
      type: String,
      default: ""
    },
    is_disabled: {
      type: Boolean,
      default: false
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.shopList();
    Citylist().then(res => {
      this.cityoptions = res.data;
    });
    GetProductByTree().then(res => {
      this.productTree = res.data;
    });
    GetecshopByList().then(res => {
      this.lazada = res.data;
    });

    GetSaleByAll().then(res => {
      this.salesman = res.data;
    });
  },
  methods: {
    handleSizeChange(val) {
      this.shopQuery.limit = val;
      this.shopList();
    },

    handleStatusChange(val) {
      this.shopQuery.page = 1;

      this.shopList();
    },
    handleCurrentChange(val) {
      this.shopQuery.page = val;
      this.shopList();
    },
    handelToshop(row) {
      this.postFrom.shop_id = row.id;
      this.postFrom.shop_location = row.cityName + " " + row.location;
      this.postFrom.shop_tel = row.tel;
      this.innerVisible = !this.innerVisible;
    },
    shopList() {
      GetDataByList(this.shopQuery).then(response => {
        this.shoplist = response.data.data;
        this.shoptotal = response.data.total;
      });
    },

    handelInn() {
      this.shop = [];
      this.innerVisible = !this.innerVisible;
    },
    //所选门店

    handleClose() {
      this.$emit("handleClose");
    },
    updateRow(type) {
      var arr = this.postFrom;
      this.$refs["postFrom"].validate(valid => {
        if (valid) {

          this.postFrom.brand_id=this.postFrom.car_model[0]
          this.postFrom.series_id=this.postFrom.car_model[1]
          this.postFrom.model_id=this.postFrom.car_model[2]


          this.postFrom.suit_id=this.postFrom.buy_product_id[0]

          this.postFrom.product_id=this.postFrom.buy_product_id[1]

          this.postFrom.city_code = this.postFrom.city_code.join(",");
          this.postFrom.car_model = this.postFrom.car_model.join(",");
          this.postFrom.lazada_list = this.postFrom.lazada_list.join(",");
          this.postFrom.buy_product_id = this.postFrom.buy_product_id.join(",");

          PostDataByAdd(this.postFrom).then(res => {
            this.$emit("handleClose");
            this.postFrom = Object.assign({}, defaultForm);
            this.postFrom = arr;
          });
        } else {
          this.$message.error("请检测必填写项是否填写");
        }
      });
    }
  },
  mounted() {
    console.log(this.userinfo);
  }
};
</script>

<style lang="scss" scoped>
.w-dia {
  .el-dialog__body {
    padding: 1px 20px;
    padding-left: 35px;
  }
  .el-dialog__title {
    font-size: 14px;
  }
}

.c-input >>> .el-form-item {
  margin-bottom: 0;
}
.c-input >>> .el-form-item__content {
  margin-left: 0px !important;
}
.el-form-item /deep/ .el-form-item__content {
  margin-left: 0px !important;
}
.dia-content {
  display: flex;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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
      .c-input {
        width: 70%;
      }

      .d_code {
        display: flex;
        flex-direction: row;
        width: 69%;
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

.el-select-dropdown {
  /*z-index: 2099 !important;*/
}

.n-post {
  z-index: 9999;
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
  border-radius: 5px;
}
</style>
