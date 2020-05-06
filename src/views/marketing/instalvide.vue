<template>
  <div class="main">
    <!-- 搜索模块 -->
    <div class="filter-container dn">
      <el-form :inline="true" :model="listQuery">
        <el-row>
          <el-col :span="5">
            <el-form-item label="安装单号:">
              <el-input
                @keyup.enter.native="handleFilter()"
                size="mini"
                v-model="listQuery.order_id"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期:">
              <el-date-picker
                style="width: 350px;"
                size="mini"
                v-model="listQuery.startTime"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']"
              ></el-date-picker>
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
          :class="listQuery.sstatus === 2 ? 'selected' : ''"
          style="width: 15%"
          @click="handleStatusChange(2)"
        >
          <span>待处理</span>
          <span class="price">{{ total2 }}</span>
        </div>
        <div
          class="list-item"
          :class="listQuery.sstatus === 1 ? 'selected' : ''"
          style="width: 15%"
          @click="handleStatusChange(1)"
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
            <el-table-column label="安装单" width="180" header-align="center" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="日期" width="220" header-align="center" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.video_create_time | parseTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="300"
              prop="address"
              label="门店"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.shop">{{ scope.row.shop.shopname }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="video_count" label="视频数量" header-align="center" align="center"></el-table-column>
            <el-table-column label="操作" header-align="center" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                >{{ scope.row.is_video_status | StrText }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="total3 < 0" class="no-data">当前暂无数据</div>
      </div>
    </div>

    <!-- 弹出处理 -->
    <el-dialog title="视频处理" :visible.sync="dialogVisible" width="25%" :before-close="handleClose">
      <div class="video" v-for="(item, index) in video" :key="index">
        <el-checkbox v-if="is_video_status === 2" v-model="item.status"></el-checkbox>
        <video :src="item.url" style="width: 200px;height: 100px;" controls="controls"></video>
      </div>
      <div class="vi-bootm">
        <el-row>
          <el-button
            type="primary"
            size="mini"
            v-if="is_video_status === 2"
            @click="headDownload"
          >下载</el-button>
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
import { GetDataBylist, PostDataByUpdate } from "@/api/marketing";
import { parseTime } from "@/utils";
export default {
  name: "instal",
  data() {
    return {
      listQuery: {
        order_id: null,
        page: 1,
        limit: 10,
        startTime: undefined,
        sstatus: "all"
      },
      total: 0,
      total1: 0,
      total2: 0,
      total3: 0,
      listLoading: true,
      tableData: [],
      dialogVisible: false,
      video: [],
      is_video_status: undefined, //视频处理状态
      order_id: undefined
    };
  },
  filters: {
    StrText(str) {
      if (str === 1) {
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
    fetchList() {
      this.listLoading = true;
      GetDataBylist(this.listQuery).then(res => {
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
      this.video = row.video;

      this.is_video_status = row.is_video_status;
      console.log(row.is_video_status);
      this.order_id = row.id;
    },
    open() {
      this.$message({
        message: "请先选中视频！",
        type: "warning"
      });
    },
    open2() {
      this.$message({
        message: "恭喜你，已开始下载！",
        type: "success"
      });
    },
    open4() {
      this.$message.error("下载视频，请重新下载。");
    },
    //下载视频
    headDownload() {
      let id = this.order_id;
      let idslist = [];
      let chenum = this.video.length;
      let che = 0;
      for (let i = 0; i < this.video.length; i++) {
        if (this.video[i].status === true) {
          che++;
          idslist.push(this.video[i].id);
        } else {
          console.log("还没选择");
        }
      }
      let temp = {
        ids: [],
        id: ""
      };
      temp.ids = idslist.join(",");
      temp.id = this.order_id;
      if (chenum === che) {
        PostDataByUpdate(temp).then(res => {
          console.log(res);
          if (res.code === 20000) {
            for (let i = 0; i < this.video.length; i++) {
              window.location.href = this.video[i].url;
            }
            this.dialogVisible = false;

            this.open2();
            this.fetchList();
          } else {
            this.open4();
          }
        });
      } else {
        this.open();
      }
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
    right: 37%;
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
  .video {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  .vi-bootm {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 20px 0 0;
  }
}
</style>
