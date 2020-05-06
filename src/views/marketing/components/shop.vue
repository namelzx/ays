<template>
  <div class="main">
    <div class="hj">
      <div class="el-transfer-panel">
        <p class="el-transfer-panel__header"><label
          class="el-checkbox">
          门店组
        </label>
        </p>
        <div class="el-transfer-panel__body">
          <div
            class=" el-transfer-panel__list itemlist">
            <label v-for="(item,index) in list" class="el-checkbox ">
              <div class="el-checkbox__label">
                <span v-if="item.is_edit===1" @click="handelClick(item)">
                  {{item.name}}
                </span>

                <div class="field_title" v-else>
                  <el-input v-model="item.name" size="mini" placeholder="请输入内容"></el-input>
                </div>
                <div v-if="oneindex===item.id&&item.is_edit===1">
                  <i class="el-icon-edit-outline" @click="handelEdit(item)"></i>
                  <i class="el-icon-delete" @click="Delete(item,1)"></i>
                </div>
                <div v-else-if="item.is_edit===1">
                  <i class="el-icon-caret-right"></i>
                </div>
                <div v-else>

                  <i class="el-icon-check" @click="oneChange(item)"></i>
                  <i class="el-icon-close" @click="Delete(item)"></i>
                </div>
              </div>

            </label>
          </div>
        </div>

        <p class="el-transfer-panel__footer add-btn" @click="handelAdd()">
          <span>新增组</span>
        </p>
      </div>


      <div class="el-transfer-panel">
        <p class="el-transfer-panel__header"><label
          class="el-checkbox">
          下属门店
        </label>
        </p>
        <div class="el-transfer-panel__body">
          <div
            class=" el-transfer-panel__list itemlist" v-if="shop.length>0">


            <label v-for="(item,index) in shop"  class="el-checkbox ">
              <div class="el-checkbox__label">
                <span @click="handelshop(item)">
                  {{item.shopname}}
                </span>
                <!--<div v-if="oneindex===item.id&&item.is_edit===1">-->
                <!--<i class="el-icon-edit-outline" @click="handelEdit(item)"></i>-->
                <!--<i class="el-icon-delete" @click="Delete(item,1)"></i>-->
                <!--</div>-->
                <!--<div v-else-if="item.is_edit===1">-->
                <!--<i class="el-icon-caret-right"></i>-->
                <!--</div>-->
                <div v-if="item.id===shop_id">

                  <i class="el-icon-close" @click="DeleteShop(item)"></i>
                </div>
              </div>

            </label>

          </div>

          <div v-else class="on-404">
            暂无数据
          </div>
        </div>
        <p v-if="group_id" class="el-transfer-panel__footer add-btn" @click="show=true">
          <span>新增门店</span>

        </p>
      </div>

    </div>


    <el-dialog
      title="提示"
      :visible.sync="show"
      width="50%"
      :before-close="handleClose">

      <CrmRelativeTable @handleCloseShop="handleCloseShop" v-if="show" :group_id="group_id"
                        :val="val"></CrmRelativeTable>

    </el-dialog>


  </div>
</template>

<script>
  import {
    GetDataByList,
    GetIdByDelete,
    PostDataByAdd,
    PostDataByUpSort,
    GetGroupByList,
    PostDataByAddShop
  } from '@/api/shopgroup'

  import CrmRelativeTable from './components/CrmRelativeTable'

  export default {
    name: 'shop',
    data() {
      return {
        shop_id: undefined,
        show: false,
        oneindex: 0,
        list: [],
        val: '',
        shop: [],
        group_id: undefined
      }
    },
    components: {
      CrmRelativeTable
    },
    created() {
      this.getgroup()
    },
    methods: {
      handelshop(item) {
        this.shop_id = item.id
      },

      oneChange(row) {
        row.is_edit = 1
        PostDataByAdd(row).then(res => {
          row.id = res.data.id
          setTimeout(function({}) {
            this.getgroup()
          }, 1000)

        })

      },
      getgroup() {
        var temp = {}
        GetDataByList(temp).then(res => {
          console.log(res)
          this.list = res.data
        })
      },
      handleClose() {
        this.show = false
        this.shop = []
        this.getgroup()
      },
      handleCloseShop(val) {
        this.$message.success('添加成功')
        GetGroupByList(val).then(res => {
          this.shop = res.data
          this.show = false
          this.getgroup()
          console.log(this.shop)
        })
      },
      handelAdd() {
        console.log(1)
        this.list.push({ name: '12', is_edit: 2 })
      },

      handelClick(row) {
        row.is_edit = 1
        this.group_id = row.id
        this.val = row.val
        if (this.val) {
          GetGroupByList(row.val).then(res => {
            this.shop = res.data
          })
        }else{
          this.shop=[];
        }
        this.oneindex = row.id
      },
      Delete(row) {
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)

        if (row.id) {
          GetIdByDelete(row).then(res => {
            this.shop=[];
            this.group_id=undefined;
            this.val=undefined
          })
        }
      },
      DeleteShop(row) {
        const index = this.shop.indexOf(row)
        this.shop.splice(index, 1)
        let shop_id = ''
        for (let i = 0; i < this.shop.length; i++) {
          if (i > 0) {
            shop_id = shop_id + ',' + this.shop[i].id
          } else {
            shop_id = this.shop[i].id
          }
        }
        var temp = {
          id: this.group_id,
          val: shop_id
        }
        PostDataByAddShop(temp).then(res => {
          this.getgroup()
        })

      },
      handelEdit(row) {
        row.is_edit = 2
      }

    }
  }
</script>

<style lang="scss" scoped>
  .itemlist {
    display: flex;
    flex-direction: column;
    .el-checkbox {
      margin-right: 15px;
      height: 30px;
      line-height: 30px;
    }
  }

  .el-checkbox__label {
    display: flex;
    justify-content: space-between;
    height: 30px;
    align-items: center;
    span {
      width: 80%;
    }
    /*width: 100%;*/
    /*flex-direction: column;*/

  }

  .hj {

    .el-transfer-panel {

      .add-btn {

      }
      .el-transfer-panel__list {
      }
      .el-transfer-panel__body {
        position: relative;
        height: 400px;
        .add-btn {
          position: absolute;
          bottom: 0;
        }
      }
    }
  }

  .add-btn {
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
  .on-404{
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-size: 15px;
  }


</style>
