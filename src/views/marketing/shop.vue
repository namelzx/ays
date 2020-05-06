<template>
  <div class="main">
    <!-- 搜索模块 -->
    <div class="filter-container dn">
      <el-form :inline="true" :model="listQuery">
        <el-row style="display: flex;justify-content: center;">
          <el-col :span="7">
            <el-form-item label="需求搜索">
              <el-input
                @keyup.enter.native="handleFilter()"
                size="mini"
                v-model="listQuery.content"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button class="filter-search" @click="headSearch" type="primary" size="mini">搜索</el-button>
    </div>
    <!-- 表格 -->
    <div class="new-table" v-loading="listLoading">
      <!-- 标题栏 -->
      <div class="tab">
        <div
          class="list-item"
          :class="listQuery.sstatus === 1 ? 'selected' : ''"
          style="width: 15%"
          @click="handleStatusChange(1)"
        >
          <span>待处理</span>
          <span class="price">{{ total2 }}</span>
        </div>
        <div
          class="list-item"
          :class="listQuery.sstatus === 2 ? 'selected' : ''"
          style="width: 15%"
          @click="handleStatusChange(2)"
        >
          <span>已处理</span>
          <span class="price">{{ total3 }}</span>
        </div>
        <div
          class="list-item"
          :class="listQuery.sstatus === 'all' ? 'selected' : ''"
          @click="handleStatusChange('all')"
        >
          <span>全部</span>
          <span class="price">{{ total1 }}</span>
        </div>
      </div>
      <!-- 内容 -->

      <div class="tab_warp">
        <div class="warp_list">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column label="工单编号" width="180" header-align="center" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="提交人" width="180" header-align="center" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.user.nickname }}</span>
              </template>
            </el-table-column>
            <el-table-column label="问题描述" header-align="center" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.content }}</span>
              </template>
            </el-table-column>
            <el-table-column label="提交日期" width="220" header-align="center" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.create_time | parseTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" header-align="center" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="total3 < 0" class="no-data">当前暂无数据</div>
      </div>
    </div>

    <!-- 弹出处理 -->
    <el-dialog
      :title="detitle"
      :visible.sync="dialogVisible"
      width="25%"
      :before-close="handleClose"
    >
      <div class="details">
        <div class="details-name">
          <span class="name-span">状态</span>：
          <span class="name-status">{{details.status | StrText}}</span>
        </div>
        <div class="details-name">
          <span class="name-span">业务员</span>：
          <span class="name-status" v-if="details.user">{{details.user.nickname}}</span>
        </div>
        <div class="details-name">
          <span class="name-span">日期</span>：
          <span class="name-status">{{details.create_time | parseTime}}</span>
        </div>
        <div class="details-desc">{{details.content}}</div>
        <div class="details-img">
          <div class="imgs" v-for="(item,index) in details.demanimg" :key="index">
            <img :src="item.url" @click="handleImg(item.url)" />
          </div>
        </div>
      </div>
      <div class="hint" v-if="details.status===2">
        <div v-if="details.user">{{details.user.nickname}}</div>
        <div>{{details.create_time | parseTime}}</div>
        <div>已处理</div>
      </div>
      <div class="vi-bootm">
        <el-row>
          <el-button type="primary" size="mini" @click="headDownload" v-if="details.status===1">确认处理</el-button>
          <el-button size="mini" @click="handleClose">取消</el-button>
        </el-row>
      </div>
    </el-dialog>

    <!-- 分页 -->
    <div class="pageclass">
      <div class="pagination-container page">
        <el-pagination
          v-show="total > 0"
          :current-page="listQuery.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="listQuery.limit"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  GetDataByShopDemanList,
  PostDataByShopDemanUpdate
} from "@/api/marketing";
import { parseTime } from "@/utils";

import openWindow from '@/utils/openWindow'

export default {
  name: "shop",
  data() {
    return {
      listQuery: {
        content: null,
        page: 1,
        limit: 10,
        sstatus: "all"
      },
      total: 0,
      total1: 0,
      total2: 0,
      total3: 0,
      listLoading: true,
      tableData: [],
      dialogVisible: false,
      details: {},
      id: undefined,
      detitle: ""
    };
  },
  filters: {
    StrText(str) {
      if (str === 2) {
        return "已处理";
      } else {
        return "待处理";
      }
    }
  },
  created() {
    this.fetchList();
  },
  methods: {

    handleImg(img) {
      openWindow(img, '图片预览', '500', '400')
    },
    fetchList() {
      this.listLoading = true;
      GetDataByShopDemanList(this.listQuery).then(res => {
        this.listLoading = false;
        this.tableData = res.data.data.data;
        this.total = res.data.data.total;
        this.total1 = res.data.total1;
        this.total2 = res.data.total2;
        this.total3 = res.data.total3;

        console.log(res, "0909");
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.fetchList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.fetchList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.fetchList();
    },
    handleStatusChange(val) {
      this.listQuery.page = 1;
      this.listQuery.sstatus = val;
      this.fetchList();
    },
    headSearch() {
      this.listQuery.page = 1;
      this.fetchList();
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.id = row.id;
      this.details = row;
      if (row.status === 1) {
        this.detitle = row.id + "-" + "详情" + "-" + "待处理";
      } else {
        this.detitle = row.id + "-" + "详情" + "-" + "已处理";
      }
    },

    //确认处理
    headDownload() {
      let id = this.id;
      PostDataByShopDemanUpdate(id).then(res => {
        console.log(res);
        if (res.code === 20000) {
          this.dialogVisible = false;
          this.fetchList();
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main {
  padding: 20px;
  .pageclass {
    .pagination-container {
      position: fixed;
      bottom: 0;
      padding-top: 4px;
      padding-bottom: 9px;
      background: #ffffff;
      width: 100%;
      padding-left: 20px;
      /*text-align: c;*/
    }
  }
  .filter-container {
    margin: 20px 0;
    width: 100%;
    position: relative;
  }
  .filter-search {
    position: absolute;
    right: 30%;
    top: 4px;
  }
  .dn .el-form-item .el-form-item__label {
    width: 26%;
  }
  .dn .el-form-item__label {
    font-size: 11px;
    font-weight: 400;
  }
  .new-table {
    padding-bottom: 30px;
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
    .tab_warp {
      .no-data {
        text-align: center;
        margin: 30px 0;
      }
    }
  }
  .details {
    .details-name {
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      color: #010101;
      .name-span {
        width: 50px;
        text-align-last: justify;
        color: #666666;
      }
      .name-status {
        margin-left: 10px;
      }
      span {
        display: block;
      }
    }
    .details-desc {
      width: 100%;
      min-height: 100px;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #dcdcdc;
    }
    .details-img {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      .imgs {
        margin-right: 5px;
        width: 60px;
        height: 60px;
        overflow: hidden;
        border-radius: 10%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .hint {
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    color: #010101;
    div {
      margin-right: 5px;
    }
  }
  .vi-bootm {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 20px 0 0;
  }
}
</style>
