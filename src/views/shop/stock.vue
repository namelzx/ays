<template>
  <div class="app-container">

    <div class="form filter-container">
      <el-form :inline="true" :model="listQuery" class="form-inline">

        <el-form-item>

          <InputForm title="门店id">
            <el-input size="mini" v-model="listQuery.id" placeholder="请输入内容"></el-input>
          </InputForm>
        </el-form-item>
        <el-form-item>

          <InputForm title="名称">
            <el-input size="mini" v-model="listQuery.shopname" placeholder="请输入内容"></el-input>
          </InputForm>
        </el-form-item>

        <el-form-item>

          <InputForm title="日期">
            <el-date-picker
              size="mini"
              v-model="listQuery.date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </InputForm>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="handleFilter">搜索</el-button>
          <el-button type="primary" icon="el-icon-upload2" size="small" @click="handelDig">导入</el-button>
        </el-form-item>

      </el-form>


    </div>

    <el-dialog
      title="导入进货单"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>


    <el-table
      :data="list"
      border

      style="width: 100%;"
    >
      <!--<el-table-column type="selection" width="55"/>-->

      <el-table-column label="门店id" min-width="50px" align="center">
        <template slot-scope="scope">
          <span>
           {{scope.row.shop_id}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="门店名称" min-width="130px" align="center">
        <template slot-scope="scope">
          <span v-if=" scope.row.shop">{{ scope.row.shop.shopname }}</span>
          <span v-else>无关联门店</span>


        </template>
      </el-table-column>
      <el-table-column label="日期" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.date|parseTime('{y}/{m}/{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="进货量" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.amount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="120px" class-name="small-padding">
        <template slot-scope="scope">
          <el-tag type="warning" @click="handelDelete(scope.row)">删除</el-tag>

        </template>
      </el-table-column>
    </el-table>

    <!-- 表格 -->

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.psize" :total="total" background
                     layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"/>
    </div>


  </div>

</template>

<script>
  // import InputForm from '@components/FormInput/index'
  import InputForm from '@/components/FormInput/index'
  import waves from '@/directive/waves'
  import { getArrByKey, pickerOptions } from '@/utils'
  import { PostDataByAdd,GetDataByList ,GetIdByDetele} from '@/api/stock'


  import openWindow from '@/utils/openWindow'
  import UploadExcelComponent from '@/components/UploadExcel/index.vue'

  export default {
    name: 'audit',
    data() {
      return {
        Associated: {},
        news_edit: false,//未启用关联
        cityoptions: [],//地址
        ShopVisible: false,
        form: {},
        salesman: [],
        input: '',
        tableKey: 0,
        rejectedFrom: {
          shop_id: undefined,
          desc: undefined
        },
        postFrom: {},
        shoplist: [],
        listLoading: true,
        total: 0,
        checkList: [],
        dialogVisible: false,
        innerVisible: false,
        listQuery: {
          page: 1,
          limit: 10,
          status: '1',
          title: ''

        },
        BlockVisible: false,
        shoptotal: 0,
        backvalue: [],
        mcvalue: [],
        backtemp: {
          blacklist: undefined,
          blackday: undefined,
          id: undefined
        },
        day: 0,
        shop: {
          id: '',
          type: 1,
          type_star: 1,
          ec_recom: 1,
          mt_recom: 1,
          book: 1,
          update_star: 1,
          score: 1
        },
        list: [],
        adminll:[],
        shopQuery: {
          cityCode: undefined,
          shopname: undefined,
          page: 1,
          limit: 10,
          tel: undefined
        }

      }
    },
    components: {
      InputForm,
      waves,
      UploadExcelComponent
    },
    created() {

      this.fetchList()

    },
    methods: {

      handelDig(){
        this.dialogVisible=true;
      },

      beforeUpload(file) {
        const isLt1M = file.size / 1024 / 1024 < 1

        if (isLt1M) {
          return true
        }

        this.$message({
          message: 'Please do not upload files larger than 1m in size.',
          type: 'warning'
        })
        return false
      },
      handleSuccess({ results, header }) {
        console.log(results)

        PostDataByAdd(results).then(res => {
          this.$message.success('导入成功');
          this.fetchList()
        })
        // this.tableHeader = header
      },

      handleImg(img) {
        openWindow(img, '图片预览', '500', '400')
      },

      handelDelete(row){
        let index=this.list.indexOf(row);
        this.list.splice(index,1)
        GetIdByDetele(row.id).then(res=>{
          this.$message.success('删除成功');

        })
      },
      elCascaderOnlick() {
        let that = this
        setTimeout(function() {
          document.querySelectorAll('.el-cascader-node__label').forEach(el => {
            el.onclick = function() {
              this.previousElementSibling.click()
              that.$refs.elcascader.dropDownVisible = false
            }
          })
          document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function() {
                that.$refs.elcascader.dropDownVisible = false
              }
            })
        }, 100)
      },

      elCascaderOnlick() {
        let that = this
        setTimeout(function() {
          document.querySelectorAll('.el-cascader-node__label').forEach(el => {
            el.onclick = function() {
              this.previousElementSibling.click()
              that.$refs.elcascader.dropDownVisible = false
            }
          })
          document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function() {
                that.$refs.elcascader.dropDownVisible = false
              }
            })
        }, 100)
      },
      handelColse() {
        this.dialogVisible = false
      },

      fetchList() {
        this.listLoading = true
        GetDataByList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.fetchList()
      },
      handleFilterClear() {
        this.listQuery = {
          page: 1,
          limit: 10,
          status: '1',
          title: ''
        }
        this.fetchList()
      },
      //关闭
      handleClose() {
    this.dialogVisible=false
      },



      handleSizeChange(val) {
        this.listQuery.psize = val
        this.fetchList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchList()
      },



    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>


  .form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

  }

  .el-form-item {
    margin-bottom: 0px;
  }

  .dialog-main {
    label {
      font-weight: 500;
    }

    .el-form-list {
      float: left;
      margin-right: 20px;

      img {
        width: 100px;
        height: 100px;
        border-radius: 10%;
      }

    }

    .license {
      width: 100px;
      height: 100px;
      border-radius: 10%;
    }
  }

</style>
