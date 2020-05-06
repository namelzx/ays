<template>
  <div class="app-container">

    <div class="form filter-container">
      <el-form :inline="true" :model="listQuery" class="form-inline">
        <el-form-item label="产品分类:">
          <el-select size="mini" v-model="listQuery.class_id" placeholder="请选择" @change="handleFilter">
            <el-option
              v-for="item in classlist"
              :key="item.id"
              :label="item.field_title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="handleCreate">新增</el-button>
        </el-form-item>
      </el-form>


    </div>

    <el-table
      :data="list"
      border

      style="width: 100%;"
    >
      <!--<el-table-column type="selection" width="55"/>-->

      <el-table-column label="产品名称" min-width="100px" align="center">
        <template slot-scope="scope">
          <span >{{ scope.row.title}}</span>

        </template>
      </el-table-column>
      <el-table-column label="产品分类" min-width="100px" align="center">
        <template slot-scope="scope">
          <span v-if=" scope.row.classif">{{ scope.row.classif.field_title}}</span>
          <span v-else>未分类</span>
        </template>
      </el-table-column>
      <el-table-column label="质保时间" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.quality_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="一级" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.one }}</span>
        </template>
      </el-table-column>
      <el-table-column label="二级" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tow }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="150px" class-name="small-padding">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">
              编辑
            </el-button>


          </el-tooltip>
          <el-tooltip content="删除" placement="top">


            <el-button type="warning" size="mini" plain @click="handleDelete(scope.row)">删除</el-button>

          </el-tooltip>

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


    <el-dialog
      :title="postStatusText[StatusText]"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="dialog-main">

        <el-form ref="form" :model="postFrom" label-width="100px">

          <div class="main-tag">

            <el-row :gutter="20">
              <el-col>
                <el-form-item label="产品名称">
                  <el-input size="mini" v-model="postFrom.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="产品分类">

                  <el-select size="mini" v-model="postFrom.class_id" placeholder="请选择" @change="handleFilter">
                    <el-option
                      v-for="item in classlist"
                      :key="item.id"
                      :label="item.field_title"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="质保时间">
                  <el-input size="mini" v-model="postFrom.quality_time"></el-input>
                </el-form-item>

              </el-col>
              <el-col>
                <el-form-item label="一级">
                  <el-input size="mini" v-model="postFrom.one"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="二级">
                  <el-input size="mini" v-model="postFrom.tow"></el-input>
                </el-form-item>

              </el-col>
            </el-row>

          </div>
        </el-form>


      </div>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini"
                       @click="StatusText==='create'?createData():updateData()">保存</el-button>

    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
  </span>
    </el-dialog>

  </div>

</template>

<script>
  // import InputForm from '@components/FormInput/index'
  import InputForm from '@/components/FormInput/index'
  import {  del, getList, PostDataPByAdd ,GetDataByAll} from '@/api/product'

  import waves from '@/directive/waves'
  import { getArrByKey, pickerOptions } from '@/utils'

  export default {
    name: 'audit',
    data() {
      return {
        form: {},
        input: '',
        tableKey: 0,
        rejectedFrom: {
          shop_id: undefined,
          desc: undefined
        },
        postStatusText: {
          create: '产品新增',
          edit: '产品修改'
        },
        StatusText: 'create',
        postFrom: {},
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
        classlist:[],
        list: []

      }
    },
    components: {
      InputForm,
      waves
    },
    created() {
      this.fetchList()
      this.getclass()
    },
    methods: {
      getclass(pid=0){

          var temp={
            pid
          }
        GetDataByAll(temp).then(res=>{
      this.classlist=res.data
        })
      },
      fetchList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
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
          psize: 10,
          status: '1',
          title: ''
        }
        this.fetchList()
      },
      //关闭
      handleClose() {
    this.dialogVisible=!this.dialogVisible
      },

      handleSizeChange(val) {
        this.listQuery.psize = val
        this.fetchList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchList()
      },

      handleCreate() {
        this.postFrom={
          title:'',
          class_id:'',
          quality_time:'',
          one:'',
          tow:''
        }
        this.dialogVisible = !this.dialogVisible
        this.StatusText = 'create'
      },
      createData() {
        PostDataPByAdd(this.postFrom).then(res => {
          this.dialogVisible = !this.dialogVisible
          this.fetchList()

        })
      },
      handleUpdate(row) {
        console.log(row)
        this.StatusText = 'edit'
        this.dialogVisible = !this.dialogVisible
        this.postFrom=row

      },
      updateData() {
        PostDataPByAdd(this.postFrom).then(res => {
          this.dialogVisible = !this.dialogVisible

        })

      },
      handleDelete(row) {
        const _this = this
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         const index= _this.list.indexOf(row)
          del(row.id).then(response => {
            if (response.status === 1) {
              _this.list.splice(index, 1)
              _this.total = _this.total - 1
              _this.$notify.success(response.msg)
            } else {
              _this.$notify.error(response.msg)
            }
          }).catch((error) => {
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }

    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>


    .cel-input__inner{
    width: 200px !important;
    }
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
