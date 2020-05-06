<template>
  <div class="createPost-container">
    <el-form
      ref="postForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
      label-width="100px"
    >
      <div class="createPost-main-container">
        <el-row>
          <div class="postInfo-container">
            <el-row>
              <el-col :span="24">
                <el-form-item
                  size="mini"
                  label="openid:"
                  class="postInfo-container-item"
                >
                  <el-input
                    placeholder="请输入内容"
                    v-model="postForm.openid"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item
                  size="mini"
                  label="购买平台:"
                  class="postInfo-container-item"
                >
                  <el-cascader
                    :options="ecshop"
                    filterable
                    clearable
                    @change="handleEcshopChange"
                    change-on-select
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item
                  size="mini"
                  label="购买账号:"
                  class="postInfo-container-item"
                >
                  <el-input
                    placeholder="购买账号"
                    v-model="postForm.buy_account"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  size="mini"
                  label="购买产品:"
                  class="postInfo-container-item"
                >
                  <el-cascader
                    size="mini"
                    :options="productTree"
                    filterable
                    clearable
                    v-model="postForm.buy_product_id"
                    change-on-select
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item
                  size="mini"
                  label="购买金额:"
                  class="postInfo-container-item"
                >
                  <el-input
                    placeholder="购买金额"
                    v-model="postForm.no_price"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  size="mini"
                  label="联系人:"
                  class="postInfo-container-item"
                >
                  <el-input
                    placeholder="输入联系人"
                    v-model="postForm.contact"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  size="mini"
                  label="联系电话:"
                  class="postInfo-container-item"
                >
                  <el-input
                    placeholder="联系电话"
                    v-model="postForm.tel"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  size="mini"
                  label="地址:"
                  class="postInfo-container-item"
                >
                  <el-cascader
                    size="mini"
                    clearable
                    :options="cityoptions"
                    v-model="postForm.city_code"
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item size="mini" label class="postInfo-container-item">
                  <el-input
                    placeholder="输入详细地址"
                    v-model="postForm.city_desc"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item
                  size="mini"
                  label="车牌"
                  class="postInfo-container-item"
                >
                  <el-input
                    placeholder="填写车牌号"
                    v-model="postForm.number_plate"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item
                  size="mini"
                  label="车型"
                  class="postInfo-container-item"
                >
                  <el-cascader
                    :options="regionHiera"
                    filterable
                    clearable
                    v-model="postForm.car_model"
                    change-on-select
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item size="mini" label="备注">
                  <el-input
                    type="textarea"
                    placeholder="备注'"
                    v-model="postForm.desc"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </div>

      <el-form-item style="text-align: center">
        <el-button type="primary" size="mini" @click="submitForm"
          >确认添加</el-button
        >
        <el-button size="mini">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GetProductByTree } from "@/api/product";

import { validURL } from "@/utils/validate";
import { fetchArticle } from "@/api/article";
import { GetProductByAll, GetDataProductByList } from "@/api/product";

import { CarBrand } from "@/api/tools";

import { GetDataByList } from "@/api/ecshop";

import { PostDataByAdd } from "@/api/order";

import { GetBrandByList, GetModelByList, GetSeriesByList } from "@/api/car";
import { regionDataPlus } from "element-china-area-data";

import { searchUser } from "@/api/remote-search";

const defaultForm = {
  openid: "",
  lazada_id: "",
  lazada_list: "",
  lazada_index: "",
  buy_order_no: "",
  buy_account: "",
  buy_product_id: "",
  no_price: "",
  contact: "",
  tel: "",
  city_code: [],
  city_desc: "",
  number_plate: "",
  car_model: "",
  car_index: "",
  car_model_id: "",
  car_model_id: ""
};

export default {
  name: "ArticleDetail",
  // props: {
  //   isEdit: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error"
        });
        callback(new Error(rule.field + "为必传项"));
      } else {
        callback();
      }
    };
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback();
        } else {
          this.$message({
            message: "外链url填写不正确",
            type: "error"
          });
          callback(new Error("外链url填写不正确"));
        }
      } else {
        callback();
      }
    };
    return {
      brandid: "", //品牌id
      series_id: "", //车系id
      model_id: undefined, //车型id
      ecshop: [], //平台商家
      productTree: [], //产品树
      cityoptions: regionDataPlus,
      cityselectedOptions: [],
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      vmindex: "",
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: "blur" }]
      },
      tempRoute: {},
      product: [],
      selectedRegion: [], //选中的车型下标
      selectedShop: [], //选中的平台下标
      regionHiera: [],
      listechsop: {
        pid: undefined
      }
    };
  },
  computed: {
    ...mapGetters(["carList", "userinfo"]),
    contentShortLength() {
      return this.postForm.content_short.length;
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return +new Date(this.postForm.display_time);
      },
      set(val) {
        this.postForm.display_time = new Date(val);
      }
    }
  },
  created() {
    CarBrand().then(res => {
      this.regionHiera = res.data;
    });

    GetProductByTree().then(res => {
      this.productTree = res.data;
    });
    this.getecshop();
    this.getProduct();
    this.tempRoute = Object.assign({}, this.$route);
  },
  methods: {
    getProduct(pid = 0) {
      var temp = {
        pid
      };
      GetProductByAll(temp).then(res => {
        this.product = res.data;
      });
      if (this.isEdit) {
        const id = this.$route.params && this.$route.params.id;
        this.fetchData(id);
      }
    },
    getecshop(type = 0, val = []) {
      GetDataByList(this.listechsop).then(res => {
        if (type === 0) {
          let arr = [];
          for (let i = 0; i < res.data.length; i++) {
            arr.push({
              label: res.data[i].field_title,
              id: res.data[i].id,
              value: i,
              children: []
            });
          }
          this.ecshop = arr;
        }
        if (type === 1) {
          let arr = [];
          for (let i = 0; i < res.data.length; i++) {
            arr.push({
              label: res.data[i].field_title,
              id: res.data[i].id,
              value: i
            });
          }
          if (res.data.length === 0) {
            this.ecshop[val[0]].children = undefined;
          } else {
            this.ecshop[val[0]].children = arr;
          }
        }
      });
    },
    handelNodes(e) {
      console.log(e);
    },

    handleEcshopChange(val) {
      this.listechsop.pid = this.ecshop[val[0]].id;
      this.getecshop(1, val);
      this.selectedShop = val;
    },

    fetchData(id) {
      fetchArticle(id)
        .then(response => {
          this.postForm = response.data;

          // just for test
          this.postForm.title += `   Article Id:${this.postForm.id}`;
          this.postForm.content_short += `   Article Id:${this.postForm.id}`;

          // set tagsview title
          this.setTagsViewTitle();

          // set page title
          this.setPageTitle();
        })
        .catch(err => {
          console.log(err);
        });
    },
    setTagsViewTitle() {
      const title = "Edit Article";
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.postForm.id}`
      });
      this.$store.dispatch("tagsView/updateVisitedView", route);
    },
    setPageTitle() {
      const title = "Edit Article";
      document.title = `${title} - ${this.postForm.id}`;
    },
    submitForm() {
      if (this.selectedShop.length < 1) {
        this.$message.error("购买平台必选");
        return;
      }
      this.postForm.car_model_id = this.selectedRegion[
        this.selectedRegion.length - 1
      ];
      this.postForm.lazada_index = this.selectedShop.join(","); //下标 最多两个

      //处理购买平台数据
      // this.postForm.lazada_list = ''
      this.postForm.lazada_list = this.ecshop[this.selectedShop[0]].id;
      this.postForm.lazada_id = this.ecshop[this.selectedShop[0]].id;
      this.postForm.lazada_index = this.selectedShop.join(",");
      if (this.ecshop[this.selectedShop[0]].children !== undefined) {
        this.postForm.lazada_list =
          this.postForm.lazada_list +
          "," +
          this.ecshop[this.selectedShop[0]].children[this.selectedShop[1]].id;
        this.postForm.lazada_id = this.ecshop[this.selectedShop[0]].children[
          this.selectedShop[1]
        ].id;
      }
      this.postForm.car_model = this.postForm.car_model.join(",");
      this.postForm.city_code = this.postForm.city_code.join(",");
      //
      this.postForm.buy_product_id = this.postForm.buy_product_id.join(",");
      this.postForm.logcontent =
        "待处理" + " " + this.userinfo.realName + "提交订单";
      PostDataByAdd(this.postForm).then(res => {
        this.postForm.car_model = this.postForm.car_model.split(",");

        this.$router.go(-1); //返回上一层
        this.$message.success("操作成功");
      });
    },
    draftForm() {
      if (
        this.postForm.content.length === 0 ||
        this.postForm.title.length === 0
      ) {
        this.$message({
          message: "请填写必要的标题和内容",
          type: "warning"
        });
        return;
      }
      this.$message({
        message: "保存成功",
        type: "success",
        showClose: true,
        duration: 1000
      });
      this.postForm.status = "draft";
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return;
        this.userListOptions = response.data.items.map(v => v.name);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
        margin-bottom: 10px;
        width: 350px;
        .el-cascader--mini {
          width: 250px;
        }
      }
    }
  }

  /*select*/

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
.filter-container {
  .el-input__inner {
    width: 100px;
  }
  .el-form-item__label {
    font-size: 11px;
    font-weight: 400;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
