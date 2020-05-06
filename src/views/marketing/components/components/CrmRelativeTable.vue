<template>
  <div>
    <div class="content-header">
      <el-input
        v-model="listQuery.shopname"
        class="search-container">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click.native="handleStatusChange"/>
      </el-input>
      <el-button
        class="create-button"
        type="primary"
        @click="handelCreate">选中
      </el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="slist"
      v-loading="loading"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        v-for="(item, index) in fieldList"
        :key="index"
        :prop="item.field"
        :label="item.name"
        :width="150"
        show-overflow-tooltip/>
      <el-table-column/>
    </el-table>
    <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[5,10,20, 30]"
                   :page-size="listQuery.limit" :total="total" background
                   layout="total, sizes, prev, pager, next" @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"/>
    <div style="margin-top: 20px">
      <!--<el-button @click="toggleSelection([slist[1], slist[2]])">切换第二、第三行的选中状态</el-button>-->
      <!--<el-button @click="toggleSelection([])">取消选择</el-button>-->
    </div>
  </div>
</template>

<script>
  import { GetDataByList, GetDataByShopAll } from '@/api/shop'

  import { PostDataByAddShop, GetShopByVal, GetDataShopByList } from '@/api/shopgroup'

  export default {
    props: {
      group_id: Number,
      val: String
    },
    data() {
      return {
        vadata: [],
        listQuery: {
          page: 1,
          limit: 5,
          title: ''
        },
        loading: false,
        total: 0,
        slist: [],
        fieldList: [
          { name: '门店名称', field: 'shopname' },
          { name: '店主', field: 'shopkeeper' },
          { name: '所在城市', field: 'cityName' }
        ],

        multipleSelection: []
      }
    },
    created() {

      this.toggleSelection([])
      console.log('11')
      this.shopList()

    },
    methods: {
      handelCreate() {
        let shop_id = ''
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (i > 0) {
            shop_id = shop_id + ',' + this.multipleSelection[i].id
          } else {
            shop_id = this.multipleSelection[i].id
          }
        }
        var temp = {
          id: this.group_id,
          val: this.val + ',' + shop_id
        }
        PostDataByAddShop(temp).then(res => {
          this.$emit('handleCloseShop', temp.val)
        })
      },

      handleSizeChange(val) {
        this.listQuery.limit = val
        this.shopList()

      },
      //某航选中事件
      handleRowClick(row, column, event) {
      },
      handleStatusChange(val) {
        this.listQuery.page = 1

        this.shopList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.shopList()
      },
      shopList() {
        var that = this
        this.loading = true
        this.listQuery.val = this.val
        //获得全部店铺

        GetDataShopByList(this.listQuery).then(response => {
          this.slist = response.data.data
          this.total = response.data.total
          this.loading = false
          //获取已选店铺
          if (this.val) {
            GetShopByVal(this.val).then(res => {
              this.vadata = res.data.data

              var arr = []
              for (let k = 0; k < this.vadata.length; k++) {

                for (let i = 0; i < this.slist.length; i++) {

                  if (this.slist[i].id === this.vadata[k].id) {
                    console.log(i)
                    console.log(this.slist[i].id, this.vadata[k].id)
                    arr.push(this.slist[i])
                  }
                }
              }
              this.toggleSelection(arr)
            })
          }
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val

      },
      checkItemsWithSelectedData() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  $xr-border-line-color: '#e6e6e6';

  .cr-body-content {
    position: relative;
    background-color: white;
    border-bottom: 1px solid $xr-border-line-color;
  }

  .content-header {
    position: relative;
    padding: 10px 20px;
    .search-container {
      margin: 0 20px;
      width: 200px;
    }
    .create-button {
      position: absolute;
      right: 10px;
      top: 15px;
    }
  }

  //表尾 上一页按钮
  .table-footer {
    padding: 8px 20px;
  }

  .el-table /deep/ thead th {
    font-weight: 400;
    font-size: 12px;
  }

  .el-table /deep/ tbody tr td {
    font-size: 12px;
  }

  .el-table /deep/ thead .el-checkbox {
    display: none;
  }

  body .el-table th.gutter {
    display: table-cell !important;
  }

  .el-table /deep/ .el-table__body-wrapper {
    height: calc(100% - 48px) !important;
  }
</style>
