<template>
  <div>
    <el-dialog
      :title="Stitle"
      :visible.sync="dialogVisible"
      width="30%"
      class="w-dia"
      :before-close="handleClose"
    >

      <div v-loading="loading" class="dia-content">
        <div class="c-data">
          <div class="c-content c-conwinht">
            <div class="ct-item">
              <span class="label">状态</span>
              <div class="c-input">
                <div class="c-input c-sele">
                  <el-select
                    v-model="postFrom.status"
                    size="mini"

                    disabled=
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
            </div>

            <div class="ct-item">
              <span class="label">平台</span>
              <div class="c-input">
                <el-cascader
                  v-model="postFrom.lazada_list"
                  size="mini"
                  :options="lazada"
                  filterable
                  clearable
                  :disabled="is_load"
                />
              </div>
            </div>
            <div class="ct-item">
              <span class="label">开户行</span>
              <div class="c-input">
                <el-input
                  v-model="postFrom.bank"
                  size="mini"
                  :disabled="is_load"
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
                  :disabled="is_load"
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
                  :disabled="is_load"
                  placeholder="请输入内容"
                />
              </div>
            </div>

            <div class="ct-item">
              <span class="label">金额</span>
              <div class="c-input">
                <el-input
                  v-model="postFrom.no_price"
                  size="mini"
                  :disabled="is_load"
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div class="ct-item">
              <span class="label">类别</span>
              <div class="c-input">
                <el-input
                  v-model="postFrom.retype"
                  size="mini"
                  :disabled="is_load"
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div class="ct-item">
              <span class="label">申请人</span>
              <div class="c-input">
                <el-input
                  v-model="postFrom.proposer"
                  size="mini"
                  disabled
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div class="ct-item">
              <span class="label">申请日期</span>
              <div class="c-input">
                <el-input
                  v-model="postFrom.proposer_time"
                  size="mini"
                  :disabled="true"
                  placeholder
                />
              </div>
            </div>
            <div class="ct-item">
              <span class="label">备注</span>
              <div class="c-input">
                <el-input
                  v-model="postFrom.desc"
                  size="mini"
                  :disabled="is_load"
                  placeholder="请输入内容"
                />
              </div>
            </div>
          </div>
        </div>

        <div style="display: flex;flex-direction: row">
          <UploadList
            :list="imgl"
            type="1"
            title="添加凭证"
            :limit="3"
            @HandelFile="handelFile"
          />
          <UploadList
            :list="vilist"
            type="2"
            title="添加视频"
            :limit="2"
            @HandelFile="handelVideo"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="handelCreate"
          >确认增加</el-button
        >
        <el-button size="mini" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { CarBrand } from "@/api/tools";
import ShList from "@/components/shop/index";

import { Citylist } from "@/api/city";

import { GetSaleByAll } from "@/api/salesman";
import { mapGetters } from "vuex";

import { GetDataByList, GetDataByShopAll } from "@/api/shop";

import {
  change,
  changeAll,
  del,
  delAll,
  GetIdBydetails,
  PostDataByAdd
} from "@/api/costorder";
import { GetecshopByList } from "@/api/ecshop";
import { getArrByKey, pickerOptions } from "@/utils";
import { GetProductByTree } from "@/api/product";

import UploadList from "@/components/Upload/uploadList";


export default {
  name: "SendOrder",
  data() {
    return {
      is_load: false,
      vilist:[],
      shopQuery: {
        cityCode: undefined,
        shopname: undefined,
        page: 1,
        limit: 10,
        tel: undefined
      },
      imgl:[],
      imglist: [],
      videolist: [],
      is_disabled: false,
      loading: false,
      innerVisible: false,
      checked: true,
      tableKey: 0,
      CarModellist: [], // 车型数据
      lazada: [], // 所有平台
      salesman: [], // 所有业务员
      retype: [
        {
          label: "待初审",
          value: 1
        },
        {
          label: "待财审1",
          value: 2
        },
        {
          label: "待财审2",
          value: 3
        },
        {
          label: "待结算",
          value: 4
        },
        {
          label: "已结算",
          value: 5
        },
        {
          label: "驳回",
          value: 6
        }
      ], //

      carl: [],
      list: null,
      total: null,

      cityoptions: [], // 地址
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
    stitle: {
      type: String,
      default: ""
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  created() {
    GetecshopByList().then(res => {
      this.lazada = res.data;
    });
    this.postFrom.proposer=this.userinfo.realName
    this.postFrom.status=1;
  },
  mounted() {
    console.log(this.userinfo);
  },
  methods: {
    handelToshop(row) {
      this.postFrom.shop_id = row.id;
      this.postFrom.shop_location = row.cityName + " " + row.location;
      this.postFrom.shop_tel = row.tel;
      this.innerVisible = !this.innerVisible;
    },

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
    handelCreate() {
      console.log(this.postFrom.lazada_list)
      if(this.postFrom.lazada_list ==undefined ||this.postFrom.lazada_list.length<1){
        this.$message.error('平台必须选');
        return;
      }
      if(this.postFrom.bank ==undefined){
        this.$message.error('银行必填');
        return;
      }


      const img = [];
      for (let i = 0; i < this.imglist.length; i++) {
        img.push(this.imglist[i].url);
        this.imgl.push(this.imglist[i].url)
      }
      const video = [];
      for (let i = 0; i < this.videolist.length; i++) {
        video.push(this.videolist[i].url);
                this.vilist.push(this.videolist[i].url);
      }
      this.postFrom.logcontent = this.userinfo.realName + "创建订单";
      this.postFrom.imglist = img.join(",");
      this.postFrom.videolist = video.join(",");
      // this.postFrom.city_code = this.postFrom.city_code.join(",");
      // this.postFrom.car_model = this.postFrom.car_model.join(",");

      this.postFrom.lazada_list = this.postFrom.lazada_list.join(",");
      // this.postFrom.buy_product_id = this.postFrom.buy_product_id.join(",");
      PostDataByAdd(this.postFrom).then(res => {
        this.$emit("handleClose");
        this.$message.success("操作成功");
      });
    },

    handelFile(e) {
      this.imglist.push({ url: e.file.data });
    },
    // handelFile2(e) {
    //   this.imglist2.push({ url: e.file.data });
    // },
    // handelFile3(e) {
    //   this.imglist3.push({ url: e.file.data });
    // },
    handelVideo(e) {
      this.videolist.push({ url: e.file.data });
    },
    // handelVideo2(e) {
    //   this.videolist2.push({ url: e.file.data });
    // },
    loadData() {
      this.loading = !this.loading;
      GetIdBydetails(this.postFrom.order_id).then(res => {
        if (res.data === 404) {
          this.$message.error("该订单不存在");
          this.loading = !this.loading;
          return true;
        }
        this.is_load = true; // 如果使用订单载人那么用户不可修改数据
        const postFrom = res.data;
        if (postFrom.city_code.constructor === String) {
          postFrom.city_code = postFrom.city_code.split(",");
        }
        if (postFrom.car_model.constructor === String) {
          postFrom.car_model = postFrom.car_model.split(",");
        }

        if (postFrom.buy_product_id.constructor === String) {
          postFrom.buy_product_id = postFrom.buy_product_id.split(",");
        }
        const buy_product_id = postFrom.buy_product_id;

        postFrom.buy_product_id = [];
        for (let i = 0; i < buy_product_id.length; i++) {
          postFrom.buy_product_id.push(parseInt(buy_product_id[i]));
        }

        if (postFrom.lazada_list.constructor === String) {
          postFrom.lazada_list = postFrom.lazada_list.split(",");
        }
        const lazada = postFrom.lazada_list;
        postFrom.lazada_list = [];

        for (let i = 0; i < lazada.length; i++) {
          postFrom.lazada_list.push(parseInt(lazada[i]));
        }
        this.postFrom = postFrom;
        this.postFrom.order_id = postFrom.id;
        this.loading = !this.loading;
      });
    },
    // 所选门店
    handleShop(e) {
      this.postFrom.shop_id = e;
      for (let i = 0; i < this.shop.length; i++) {
        if (e === this.shop[i].id) {
          this.postFrom.shop_location =
            this.shop[i].cityName + " " + this.shop[i].location;
          this.postFrom.shop_tel = this.shop[i].tel;
          return;
        }
      }
    },
    handleClose() {
      this.$emit("handleClose");
    },
    updateRow(type) {
      this.postFrom.logcontent = this.userinfo.realName + "创建订单";
    }
  }
};
</script>

<style lang="scss" scoped>
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
.upload-container {
  margin-right: 2%;
}
.dia-content {
  // display: flex;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 12px;
  // flex-direction: row;
  // flex-wrap: wrap;
  display: flex;
  flex-direction: column;
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
    .c-conwinht .ct-item {
      width: 150%;
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
.el-dialog__footer {
  padding-top: 20px;
}
.c-sele {
  width: 100%;
}
</style>
