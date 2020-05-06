<template>
  <div class="userlist">
    <div class="filter-container dn">
      <el-form :inline="true" :model="listQuery">
        <el-row>
          <el-col :span="8">
            <el-form-item label="发送日期:">

              <el-date-picker
                style="width: 150px"
                v-model="listQuery.create_time"
                type="date"
                size="mini"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="发送门店:">
              <el-select size="mini" filterable clearable v-model="listQuery.shop_id" placeholder>
                <el-option
                  v-for="item in shop"
                  :label="item.shopname"
                  :value="item.id"
                  @keyup.enter.native="handleFilter()"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="核销码:">
              <el-input
                v-model="listQuery.code"
                size="mini"
                @keyup.enter.native="handleFilter()"
              />
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
    </div>
    <el-row style="margin-bottom: 10px;    text-align: right;    margin-right: 45px;">
      <div>
        <el-tag type="success">
          发送数量
          {{total}}
        </el-tag>
        <el-tag type="warning">
          发送金额
          {{sumprice}}
        </el-tag>


      </div>
    </el-row>


    <!-- 操作 -->
    <el-row style="margin-bottom: 10px;    text-align: right;    margin-right: 45px;">
      <el-col :xs="24" :sm="24" :lg="24">


        <el-tooltip content="搜索" placement="top">
          <el-button v-waves type="primary" size="mini" @click="handleFilter()">搜索</el-button>
        </el-tooltip>
      </el-col>
    </el-row>

    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        label="发送日期"
        width="180">
        <template slot-scope="{row}">
          {{row.create_time}}
        </template>
      </el-table-column>
      <el-table-column
        label="优惠卷"
        width="180">
        <template slot-scope="{row}">
          <span v-if="row.plarform">  {{row.plarform.title}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="核销码"
        width="180">
        <template slot-scope="{row}">
          {{row.code}}
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        width="180">
        <template slot-scope="{row}">
          成功
        </template>
      </el-table-column>

      <el-table-column
        label="发送者"
        width="180">
        <template slot-scope="{row}" v-if="row.plarform">
           <span v-if="row.plarform.admin" >
             {{row.plarform.admin.realName}}

           </span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pageclass">
      <div class="pagination-container page">
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
  </div>
</template>
<script>

  import { GetSenlogByList } from '@/api/platformcoupon'
  import { Citylist } from '@/api/city'
  import waves from '@/directive/waves'
  import { GetDataByShopAll } from "@/api/shop";

  export default {
    directives: {
      waves
    },
    data() {
      return {
        shop:[],
        listQuery: {
          page: 1,
          limit: 10,
          status: 'all',
          title: '',
          sstatus: 'all',
          nickname: '',
          contact: '',
          cityCode: ''
        },
        sumprice:0,
        list: null,
        total: 1,
        checked: true,
        listLoading: true,
        cityoptions: [] // 地址
      }
    },

    created() {
      GetDataByShopAll().then(res => {
        this.shop = res.data;
      })
      this.fetchList()
    },
    methods: {
      fetchList() {
        this.listLoading = true
        GetSenlogByList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.sumprice=response.data.sumprice
          this.listLoading = false

        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.fetchList()
      },
      handleSizeChange(val) {
        this.listQuery.psize = val
        this.fetchList()
      },


      handleCurrentChange(val) {
        this.listQuery.page = 1
        this.listQuery.sstatus = val
        this.fetchList()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .userlist {
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
    .no-data {
      height: 100px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .filter-container .el-form-item__label {
      width: 64px;
    }
    .new-table {
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      display: flex;
      font-size: 12px;
      flex-direction: column;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      .table-warp {
        margin: 0 30px;
        height: 100px;
        border-bottom: 1px solid #dcdcdc;
        display: flex;
        align-items: center;
        .warp_imgs {
          width: 55px;
          height: 55px;
          border-radius: 10px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .warp_bao {
          margin-left: 3%;
          width: 55%;
          .warp_content {
            display: flex;
            font-size: 12px;
            height: 30px;
            line-height: 30px;
            .warp_content_1 {
              display: flex;
              width: 40%;
              span {
                display: block;
              }
              .wa_title {
                display: block;
                width: 21%;
                color: #666666;
                text-align-last: justify;
              }
              .wa_colon {
                color: #666666;
              }
            }
            .warp_content_2 {
              width: 20%;
              display: flex;
              span {
                display: block;
              }
              .wa_title {
                display: block;
                color: #666666;
                text-align-last: justify;
              }
              .wa_colon {
                color: #666666;
              }
              .wa_name {
                color: #009cff;
              }
            }
            .warp_content_3 {
              display: flex;
              width: 50%;
              span {
                display: block;
              }
              .wa_title {
                display: block;
                width: 12%;
                color: #666666;
                text-align-last: justify;
              }
              .wa_colon {
                color: #666666;
              }
            }
          }
        }
      }
      .table-warp:nth-last-child(1) {
        border: 0;
      }
    }
  }
</style>
