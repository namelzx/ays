<template>
  <div>
    <el-dialog
      :title="Stitle"
      :visible.sync="dialogVisible"
      width="50%"
      class="w-dia"
      :before-close="handleClose"
    >
      <div v-loading="loading" class="dia-content">
        <div class="c-data">
          <!--<div class="c-title">配件信息</div>-->
          <div class="c-content">
            <div class="ct-item">
              <span class="label">状态</span>
              <div class="c-input">
                <el-input
                  v-model="postFrom.status"
                  size="mini"
                  disabled
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div class="ct-item">
              <span class="label">支付单号</span>
              <div class="c-input">
                <el-input
                  v-model="postFrom.id"
                  size="mini"
                  disabled
                  placeholder="请输入内容"
                />
              </div>
            </div>

            <div class="ct-item">
              <span class="label">购买平台</span>
              <div class="c-input">
                <el-input
                  v-model="postFrom.lazada_title"
                  size="mini"
                  disabled
                  placeholder="请输入内容"
                />
              </div>
            </div>

            <div class="ct-item">
              <span class="label">客服</span>
              <div class="c-input">
                <el-input
                  v-if="postFrom.pre"
                  v-model="postFrom.pre.realName"
                  size="mini"
                  disabled
                  placeholder="请输入内容"
                />
                <el-input
                  v-else
                  v-model="userinfo.realName"
                  size="mini"
                  disabled
                  placeholder="请输入内容"
                />
              </div>
            </div>

            <div class="ct-item">
              <span class="label">备注</span>
              <div class="c-input">
                <el-input
                  v-model="postFrom.desc"
                  size="mini"
                  disabled
                  placeholder="请输入内容"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="c-data">
          <!--<div class="c-title">配件信息</div>-->
          <div class="c-content">
            <div class="ct-item">
              <span class="label">类别</span>
              <div class="c-input">
                <el-select
                  v-model="postFrom.retype"
                  size="mini"
                  disabled
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in retype"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="ct-item">
              <span class="label">费用</span>
              <div class="c-input">
                <el-input
                  v-model="postFrom.no_price"
                  size="mini"
                  disabled
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div class="ct-item">
              <span class="label">开户行</span>
              <div class="c-input">
                <el-input
                  v-model="postFrom.bank"
                  size="mini"
                  disabled
                  placeholder="请输入内容"
                />
              </div>
            </div>

            <div class="ct-item">
              <span class="label">账号</span>
              <div class="c-input">
                <el-input
                  v-model="postFrom.bank_account"
                  size="mini"
                  disabled
                  placeholder="请输入内容"
                />
              </div>
            </div>

            <div class="ct-item">
              <span class="label">姓名</span>
              <div class="c-input">
                <el-input
                  v-model="postFrom.bank_name"
                  size="mini"
                  disabled
                  placeholder="请输入内容"
                />
              </div>
            </div>

            <div class="ct-item">
              <span class="label">申请时间</span>
              <div class="c-input">
                <el-input
                  v-model="postFrom.create_time"
                  size="mini"
                  disabled
                  placeholder="请输入内容"
                />
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex;flex-direction: row">
          <div v-if="imglist.length > 0">
            <img
              v-for="item in imglist"
              style="width: 80px;height: 80px;"
              :src="item"
              @click="handleImg(item)"
            />
          </div>

          <div
            style="display: flex;flex-direction: row"
            v-if="videolist.length > 0"
          >
            <video
              v-for="item in videolist"
              controls
              v-if="item"
              style="width: 80px;height: 80px;"
              :src="item"
            />
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-if="postFrom.status === '待初审'"
          type="primary"
          size="mini"
          @click="updateRow"
          >确认通过</el-button
        >

        <el-button
          v-if="postFrom.status === '待财审1'"
          type="primary"
          size="mini"
          @click="updateRow"
          >{{ postFrom.status }}通过</el-button
        >
        <el-button
          v-if="postFrom.status === '待财审2'"
          type="primary"
          size="mini"
          @click="updateRow"
          >{{ postFrom.status }}通过</el-button
        >

        <el-button
          v-if="postFrom.status === '待结算'"
          type="primary"
          size="mini"
          @click="updateRow"
          >确认结算</el-button
        >
        <el-button size="mini" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { CarBrand } from "@/api/tools";
import ShList from "@/components/shop/index";

import { GetSaleByAll } from "@/api/salesman";
import { regionDataPlus } from "element-china-area-data";
import { mapGetters } from "vuex";

import { GetDataByList, GetDataByShopAll } from "@/api/shop";

import {
  change,
  changeAll,
  del,
  delAll,
  GetIdBydetails,
  PostDataByAdd,
  AddPayOrderLog
} from "@/api/costorder";
import { GetecshopByList } from "@/api/ecshop";
import { getArrByKey, pickerOptions } from "@/utils";
import { GetProductByTree } from "@/api/product";

import UploadList from "@/components/Upload/uploadList";
import openWindow from '@/utils/openWindow'


const defaultForm = {
  logcontent: "",
  openid: "",
  lazada_id: "",
  lazada_list: "",
  lazada_index: "",
  buy_order_no: "12123",
  buy_account: "199",
  buy_product_id: "",
  no_price: "199",
  contact: "",
  tel: "",
  city_code: undefined,
  city_desc: "",
  number_plate: "A871237",
  car_model: undefined,
  car_index: "",
  car_model_id: ""
};

export default {
  name: "SendOrder",
  data() {
    return {
      shopQuery: {
        cityCode: undefined,
        shopname: undefined,
        page: 1,
        limit: 10,
        tel: undefined
      },
      imglist: [],
      videolist: [],
      is_disabled: false,
      loading: false,
      innerVisible: false,
      // dialogVisible: false,
      checked: true,
      tableKey: 0,
      CarModellist: [], // 车型数据
      lazada: [], // 所有平台
      salesman: [], // 所有业务员
      retype: [
        {
          label: "售后退款",
          value: "售后退款"
        },
        {
          label: "返现奖励",
          value: "返现奖励"
        },
        {
          label: "其他",
          value: "其他"
        }
      ], //

      carl: [],
      list: null,
      total: null,

      // postFrom: Object.assign({}, defaultForm),
      cityoptions: regionDataPlus, // 地址
      selectedRows: null,
      listLoading: true,
      showSearch: false,
      options: [],
      shop: [],
      listQuery: {
        page: 1,
        limit: 10,
        status: "-1",
        title: ""
      },
      postFrom: {},
      buttonDisabled: true,
      deleting: false,
      pickerOptions: pickerOptions,
      currentIndex: -1,
      productTree: [],
      regionHiera: [],
      shop: [],
      imglist: [],
      videolist: [],
      innerVisible: false
    };
  },
  computed: {
    ...mapGetters(["userinfo", "brand"])
  },
  components: {
    UploadList,
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

    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.shopList();
    this.imglist = this.postFrom.imglist.split(",");
    console.log(this.postFrom.videolist);
    if (this.postFrom.videolist) {
      this.videolist = this.postFrom.videolist.split(",");
    }
    GetProductByTree().then(res => {
      this.productTree = res.data;
    });
    GetecshopByList().then(res => {
      this.lazada = res.data;
    });
    GetDataByShopAll().then(res => {
      this.shop = res.data;
    });

    GetSaleByAll().then(res => {
      this.salesman = res.data;
    });
  },
  mounted() {
    console.log(this.userinfo);
  },
  methods: {
    handleImg(img) {
      openWindow(img, '图片预览', '500', '400')
    },
    shopList() {
      GetDataByList(this.shopQuery).then(response => {
        this.shoplist = response.data.data;
        this.shoptotal = response.data.total;
      });
    },

    handleClose() {
      this.$emit("handleClose");
    },
    updateRow(type) {
      if (this.postFrom.status === "待初审") {
        this.postFrom.status = 2;
        this.postFrom.logcontent =
          "财审1" + " " + this.userinfo.realName + "审核通过,";
      }
      if (this.postFrom.status === "待财审1") {
        this.postFrom.status = 3;
        this.postFrom.logcontent =
          "财审2" + " " + this.userinfo.realName + "审核通过,";
      }
      if (this.postFrom.status === "待财审2") {
        this.postFrom.status = 4;
        this.postFrom.logcontent =
          "待结算" + " " + this.userinfo.realName + "审核通过,";
      }
      if (this.postFrom.status === "待结算") {
        this.postFrom.status = 5;
        this.postFrom.logcontent =
          "已结算" + " " + this.userinfo.realName + "结算,";
      }
      AddPayOrderLog(this.postFrom).then(res => {
        this.$emit("handleClose");
        this.$message.success("操作成功");
      });
    }
  }
};
</script>

<style lang="scss" spend>
.install-btn > .el-button--mini {
  padding: 5px 10px;
}

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
  .el-dialog {
    margin-top: 5vh !important;
  }
  .table {
    margin-bottom: 5px !important;
  }
}

.credentials-img {
  width: 150px;
  height: 100px;
  border-radius: 30px;
}

.c-input {
  width: 70%;
}
</style>
