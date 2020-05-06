<template>
  <div class="app-container">
    <!-- 搜索模块 -->

    <div class="filter-container dn">
      <el-form :inline="true" :model="listQuery">
        <el-row>
          <el-col :span="4">
            <el-form-item label="类别:">
              <el-select size="mini" v-model="listQuery.type" placeholder="请选择">
                <el-option
                  v-for="item in op"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="地址:">
              <el-cascader
                size="mini"
                :options="cityoptions"
                placeholder
                clearable
                v-model="listQuery.cityCode"
                ref="elcascader"
                change-on-select
                @visible-change="elCascaderOnlick"
                @expand-change="elCascaderOnlick"
              ></el-cascader>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="店主:">
              <el-input
                size="mini"
                @keyup.enter.native="handleFilter()"
                v-model="listQuery.shopkeeper"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="店名:">
              <el-input
                size="mini"
                @keyup.enter.native="handleFilter()"
                v-model="listQuery.shopname"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="业务员:">
              <el-select
                size="mini"
                clearable
                filterable
                v-model="listQuery.salesman_id"
                placeholder
              >
                <el-option v-for="item in salesman" :label="item.realName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="评分:">
              <el-input
                size="mini"
                @keyup.enter.native="handleFilter()"
                v-model="listQuery.buy_order_no"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4">
            <el-form-item label="电商推荐">
              <el-select v-model="listQuery.ec_rec" clearable size="mini" placeholder="请选择">
                <el-option
                  v-for="item in optionsrec"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="市场推荐">
              <el-select v-model="listQuery.mk_rec" clearable size="mini" placeholder="请选择">
                <el-option
                  v-for="item in optionsmk"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="电话:">
              <el-input size="mini" @keyup.enter.native="handleFilter()" v-model="listQuery.tel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="余额:">
              <el-input
                size="mini"
                @keyup.enter.native="handleFilter()"
                v-model="listQuery.balance"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="服务商:">
              <el-input
                size="mini"
                @keyup.enter.native="handleFilter()"
                v-model="listQuery.service_provider"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="备注:">
              <el-input size="mini" @keyup.enter.native="handleFilter()" v-model="listQuery.desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 操作 -->
    <el-row style="margin-bottom: 10px;    text-align: right;    margin-right: 45px;">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-tooltip content="搜索" placement="top">
          <el-button v-waves type="primary" size="mini" @click="handleFilter()">搜索</el-button>
        </el-tooltip>
        <el-tooltip content="导出" placement="top">
          <el-button v-waves type="primary" @click="handleDownload()" size="mini">导出</el-button>
        </el-tooltip>
        <el-tooltip content="新增" placement="top">
          <router-link to="create">
            <el-button v-waves type="primary" size="mini" @click="showSearch = !showSearch">新增</el-button>
          </router-link>
        </el-tooltip>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <!--<div class="new-table" v-loading="listLoading">-->
    <div class="table" v-loading="listLoading" v-if="total>0" v-for="(item,index) in list">
      <div class="biaoti">
        <div class="b-list">
          <span>类别</span>

          <span v-if="item.shop_type==='普通'">{{item.shop_type}}</span>
          <span style="color: #2ea2fc" v-else>{{item.shop_type}}</span>
        </div>

        <div class="b-list">
          <a type="primary" v-if="item.ec_rec===1">电商推荐</a>
        </div>
        <div class="b-list">
          <a type="primary" v-if="item.mk_rec===1">市场推荐</a>
        </div>
      </div>
      <div class="identification" v-if="item.blacklist===2||item.ecblacklist||item.book===1">
        <div
          v-if="item.blacklist===2||item.ecblacklist===3"
          style="  background: url(https://kedand.oss-cn-beijing.aliyuncs.com/images/black.png); background-repeat:no-repeat;
          background-size: auto 100%; width: 30px;height: 30px;"
        ></div>
        <div
          v-if="item.book===1"
          style="  background: url(https://kedand.oss-cn-beijing.aliyuncs.com/images/book.png); background-repeat:no-repeat;
          background-size: auto 100%; width: 30px;height: 30px;"
        ></div>
      </div>

      <div class="table-content">
        <div class="table-filed" style="width: 30%">
          <div class="filed-span">
            <span>门店名称:</span>
            <div>
              <div class="field">{{item.shopname}}</div>
            </div>
          </div>
          <div class="filed-span">
            <span>地址:</span>
            <div>
              <div class="field">{{item.cityName}}{{item.location}}</div>
            </div>
          </div>
        </div>
        <div class="table-filed jp" style="width: 15%">
          <div class="filed-span">
            <span>店主:</span>
            <div>

              <div class="field" style="color: #409EFF"  v-if="item.user_id">{{item.shopkeeper}}</div>
              <div class="field" v-else>{{item.shopkeeper}}</div>
            </div>
          </div>
          <div class="filed-span">
            <span>电话</span>
            <div>
              :
              <div class="field">{{item.tel}}</div>
            </div>
          </div>
        </div>
        <div class="table-filed jp" style="width: 20%">
          <div class="filed-span">
            <span>服务商:</span>
            <div>
              <div class="field">{{item.service_provider}}</div>
            </div>
          </div>
          <div class="filed-span">
            <span>业务员</span>
            <div>
              :
              <div class="field" v-if="item.salesman">{{item.salesman.realName}}</div>

              <div class="field" v-else>暂无分配</div>
            </div>
          </div>
        </div>

        <div class="table-filed">
          <div class="filed-span">
            <span>备注</span>
            <div>
              :
              <div class="field">{{item.desc}}</div>
            </div>
          </div>
        </div>

        <div class="table-filed jl" style="justify-content: center">
          <div class="filed-price">
            <router-link :to="'/shop/test/'+item.id">
              <el-button size="mini" type="primary">店铺管理</el-button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="data-bottom">
        <!--<div class="title-list">-->
        <!--<span>余额:</span>-->
        <!--<div class="red">¥{{item.balance}}</div>-->
        <!--</div>-->

        <div class="title-list">
          <span>近30天:</span>
          <div>{{item.ordermonth}}</div>
        </div>

        <div class="title-list">
          <span>总:</span>
          <div>{{item.ordersum}}</div>
        </div>

        <div class="title-list">
          <span>店铺评分:</span>
          <div class="red">10</div>
        </div>

        <div class="title-list">
          <span>ID</span>
          <div>{{item.id}}</div>
        </div>
      </div>
    </div>
    <div v-if="total<1" class="no-data">当前暂无数据</div>
    <!--</div>-->
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
  </div>
</template>


<script>
import { Citylist } from "@/api/city";

import { GetSaleByAll } from "@/api/salesman";

import { GetDataByList,GetDataBydownload } from "@/api/shop";
import waves from "@/directive/waves";
import { getArrByKey, pickerOptions } from "@/utils";

import { regionDataPlus } from "element-china-area-data";

const defaultForm = {
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
  name: "Roles",
  // components: { rolesForm },
  directives: {
    waves
  },
  components: {},
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "禁用",
        1: "正常"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      loading: true,
      sumorder: 0,
      productTree: [], //产品树
      reTitle: "",
      reFrom: {
        role: 2,
        type: 1
      },

      op: [
        {
          value: 1,
          label: "普通"
        },
        {
          value: 2,
          label: "阿帕认证"
        },
        {
          value: 3,
          label: "阿帕三星"
        },
        {
          value: 4,
          label: "阿帕四星"
        },
        {
          value: 5,
          label: "阿帕五星"
        }
      ],

      list: null,
      total: null,

      postFrom: Object.assign({}, defaultForm),
      cityoptions: [], //地址
      selectedRows: null,
      listLoading: true,
      showSearch: false,
      optionsrec: [
        {
          value: 1,
          label: "电商推荐"
        }
      ],
      optionsmk: [
        {
          value: 1,
          label: "市场推荐"
        }
      ],

      options: [],
      shop: [],
      listQuery: {
        page: 1,
        limit: 10,
        // status: 'all',
        title: ""
      },
      salesman: [], //业务员

      buttonDisabled: true,
      deleting: false,
      pickerOptions: pickerOptions,
      currentIndex: -1,
      regionHiera: [],
      Stitle: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.fetchList();

    GetSaleByAll().then(res => {
      this.salesman = res.data;
    });

    Citylist().then(res => {
      this.cityoptions = res.data;
    });
  },

  methods: {

    elCascaderOnlick() {
      let that = this;
      setTimeout(function() {
        document.querySelectorAll(".el-cascader-node__label").forEach(el => {
          el.onclick = function() {
            this.previousElementSibling.click();
            that.$refs.elcascader.dropDownVisible = false;
          };
        });
        document
          .querySelectorAll(".el-cascader-panel .el-radio")
          .forEach(el => {
            el.onclick = function() {
              that.$refs.elcascader.dropDownVisible = false;
            };
          });
      }, 100);
    },

    //所选门店
    fetchList() {
      this.listLoading = true;
      GetDataByList(this.listQuery).then(response => {
        this.list = response.data.data;
        this.total = response.data.total;
        this.listLoading = !this.listLoading;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.fetchList();
    },
    handleFilterClear() {
      this.listQuery = {
        page: 1,
        psize: 10,
        status: "-1",
        title: ""
      };
      this.fetchList();
    },
    handleSizeChange(val) {
      this.listQuery.psize = val;
      this.fetchList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.fetchList();
    },
    handleModifyStatus(index, id, status) {
      this.list[index]["status"] = 1 - status;
      change(id, "status", 1 - status).then(response => {});
    },
    handleSelectionChange(val) {
      if (val.length > 0) {
        this.buttonDisabled = false;
      } else {
        this.buttonDisabled = true;
      }
      this.selectedRows = val;
    },
    handleCreate() {
      this.$refs.fromRoles.handleCreate();
    },
    handleUpdate(row) {
      this.postFrom = {};
      this.postFrom = row;
      if (row.city_code.constructor === String) {
        this.postFrom.city_code = this.postFrom.city_code.split(",");
      }

      if (row.car_model !== null) {
        if (row.car_model.constructor === String) {
          this.postFrom.car_model = this.postFrom.car_model.split(",");
        }
      }
      if (row.buy_product_id !== null) {
        if (row.buy_product_id.constructor === String) {
          let arr = [];
          let temp = this.postFrom.buy_product_id.split(",");
          for (let i = 0; i < temp.length; i++) {
            arr.push(parseInt(temp[i]));
          }

          this.postFrom.buy_product_id = arr;
        }
      }

      if (row.lazada_list !== null) {
        if (row.lazada_list.constructor === String) {
          this.postFrom.lazada_list = this.postFrom.lazada_list.split(",");
        }

        let lazada = this.postFrom.lazada_list;
        this.postFrom.lazada_list = [];
        for (let i = 0; i < lazada.length; i++) {
          this.postFrom.lazada_list.push(parseInt(lazada[i]));
        }
      }

      this.is_disabled = false;

      if (this.postFrom.status === "驳回") {
        this.postFrom.status = "重新派单";
      }
      console.log(this.userinfo);

      this.Stitle =
        this.userinfo.realName +
        "-" +
        this.userinfo.group.title +
        this.postFrom.status +
        "操作";

      this.dialogVisible = !this.dialogVisible;
    },
    handleClose() {
      this.dialogVisible = !this.dialogVisible;
      this.fetchList();
    },

    handleDelete(index, id) {
      const _this = this;
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.$set(_this.list[index], "delete", true);
          del(id)
            .then(response => {
              if (response.status === 1) {
                _this.list.splice(index, 1);
                _this.total = _this.total - 1;
                _this.$notify.success(response.msg);
                this.fetchList();
              } else {
                _this.$notify.error(response.msg);
              }
              _this.$set(_this.list[index], "delete", false);
            })
            .catch(error => {
              _this.$set(_this.list[index], "delete", false);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDeleteAll() {
      const _this = this;
      if (this.selectedRows.length > 0) {
        this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            _this.deleting = true;
            const ids = getArrByKey(_this.selectedRows, "id");
            const idstr = ids.join(",");
            delAll({ ids: idstr })
              .then(response => {
                if (response.status === 1) {
                  const delindex = [];
                  _this.list.forEach(function(item, index, input) {
                    if (ids.indexOf(item.id) > -1) {
                      delindex.push(index);
                    }
                  });
                  for (let i = delindex.length - 1; i >= 0; i--) {
                    _this.list.splice(delindex[i], 1);
                  }
                  _this.total = _this.total - delindex.length;
                  _this.$message.success(response.msg);
                } else {
                  _this.$message.error(response.msg);
                }
                _this.deleting = false;
              })
              .catch(error => {
                _this.deleting = false;
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        _this.$message.error("请选择要删除的数据");
      }
    },

    //导出数据
    handleDownload() {
      this.listLoading = true
      GetDataBydownload(this.listQuery).then(res => {
        import('@/vendor/Export2Excel').then(excel => {
          console.log(excel)
          const tHeader =res.data.tHeader
          const filterVal =res.data.filterVal
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
          this.listLoading = false
          this.$message.success('下载成功')
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
    handleCommand(command) {
      const _this = this;
      if (this.selectedRows.length > 0) {
        const ids = getArrByKey(this.selectedRows, "id");
        const idstr = ids.join(",");
        changeAll({ val: idstr, field: "status", value: command })
          .then(response => {
            if (response.status === 1) {
              _this.list.forEach(function(item, index, input) {
                if (ids.indexOf(item.id) > -1) {
                  _this.list[index]["status"] = command;
                }
              });
              _this.$message.success(response.msg);
            } else {
              _this.$message.error(response.msg);
            }
          })
          .catch(error => {});
      } else {
        _this.$message.error("请选择要操作的数据");
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
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
    left: 6px;
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
    .b-list {
      padding-right: 30px;
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
          width: 19%;
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
