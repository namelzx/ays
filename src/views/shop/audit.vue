<template>
  <div class="app-container">

    <div class="form filter-container">
      <el-form :inline="true" :model="listQuery" class="form-inline">
        <el-form-item>

          <InputForm title="店名">
            <el-input size="mini" v-model="listQuery.shopname" placeholder="请输入内容"></el-input>
          </InputForm>
        </el-form-item>
        <el-form-item>

          <InputForm title="店主">
            <el-input size="mini" v-model="listQuery.shopkeeper" placeholder="请输入内容"></el-input>
          </InputForm>
        </el-form-item>
        <el-form-item>

          <InputForm title="电话">
            <el-input size="mini" v-model="listQuery.tel" placeholder="请输入内容"></el-input>
          </InputForm>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="handleFilter">搜索</el-button>
        </el-form-item>

      </el-form>


    </div>

    <el-tabs v-model="listQuery.status" @tab-click="handleFilter">
      <el-tab-pane label="待处理" name="1">

        <el-table
          :data="list"
          border

          style="width: 100%;"
        >
          <!--<el-table-column type="selection" width="55"/>-->

          <el-table-column label="头像" min-width="100px" align="center">
            <template slot-scope="scope">
          <span v-if=" scope.row.wechat">
            <img class="head-imgs" :src="scope.row.wechat.headimgurl">

          </span>
              <span v-else>用户已注销</span>
            </template>
          </el-table-column>
          <el-table-column label="微信昵称" min-width="100px" align="center">
            <template slot-scope="scope">
              <span v-if=" scope.row.wechat">{{ scope.row.wechat.nickname }}</span>
              <span v-else>用户已注销</span>

            </template>
          </el-table-column>
          <el-table-column label="姓名" min-width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.shopkeeper }}</span>
            </template>
          </el-table-column>
          <el-table-column label="门店名称" min-width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.shopname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="地址" min-width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.cityName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120px" class-name="small-padding">
            <template slot-scope="scope">
              <el-tooltip content="编辑" placement="top">
                <el-button type="primary" size="mini" @click="handleAudit(scope.row)">
                  审核
                </el-button>
              </el-tooltip>

            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>
      <el-tab-pane label="驳回" name="2">
        <el-table
          :data="list"
          border

          style="width: 100%;"
        >
          <!--<el-table-column type="selection" width="55"/>-->

          <el-table-column label="头像" min-width="100px" align="center">
            <template slot-scope="scope">
          <span v-if=" scope.row.wechat">
            <img class="head-imgs" :src="scope.row.wechat.headimgurl">

          </span>
              <span v-else>用户已注销</span>
            </template>
          </el-table-column>
          <el-table-column label="微信昵称" min-width="100px" align="center">
            <template slot-scope="scope">
              <span v-if=" scope.row.wechat">{{ scope.row.wechat.nickname }}</span>
              <span v-else>用户已注销</span>

            </template>
          </el-table-column>
          <el-table-column label="姓名" min-width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.shopkeeper }}</span>
            </template>
          </el-table-column>
          <el-table-column label="门店名称" min-width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.shopname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="地址" min-width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.cityName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120px" class-name="small-padding">
            <template slot-scope="scope">
              <el-tooltip content="编辑" placement="top">
                <el-button type="primary" size="mini" @click="handleAudit(scope.row)">
                  重新审核
                </el-button>
              </el-tooltip>

            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>
    </el-tabs>
    <!-- 表格 -->

    <!-- 分页 -->
    <div class="pageclass">
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.psize" :total="total" background
                     layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"/>
    </div>
    </div>


    <el-dialog
      title="门店审核"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <div class="dialog-main">

        <el-dialog
          width="30%"
          title="驳回原因"
          :visible.sync="innerVisible"
          append-to-body>
          <el-input
            type="textarea"

            :rows="2"
            placeholder="请输入内容"
            v-model="rejectedFrom.desc">
          </el-input>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="handleNewAudit(2)">驳回</el-button>

  </span>


        </el-dialog>

        <div class="n-post">
          <el-dialog
            width="60%"
            title="安装门店选择"
            :visible.sync="ShopVisible"
            append-to-body
            class="n-post"
          >
            <el-form :model="shopQuery" class="form-container" label-width="50px">

              <el-row class="nc">
                <el-col :span="5">
                  <el-form-item size="mini" label="地址:" class="postInfo-container-item">
                    <el-cascader
                      size="mini"
                      clearable
                      :options="cityoptions"
                      v-model="shopQuery.cityCode"
                      ref="elcascader"
                      @visible-change="elCascaderOnlick"
                      @expand-change="elCascaderOnlick"
                      change-on-select
                    >
                    </el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item size="mini" label="门店:" class="postInfo-container-item">
                    <el-input size="mini" v-model="shopQuery.shopname" placeholder="请输入内容"></el-input>

                  </el-form-item>
                </el-col>

                <el-col :span="5">
                  <el-form-item size="mini" label="店主:" class="postInfo-container-item">
                    <el-input size="mini" v-model="shopQuery.shopkeeper" placeholder="请输入内容"></el-input>

                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item size="mini" label="电话:" class="postInfo-container-item">
                    <el-input size="mini" v-model="shopQuery.tel" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="margin-left: 20px">
                  <el-button type="primary" @click="shopList" size="mini">搜索</el-button>
                </el-col>
              </el-row>
              <div style="height: 450px;    overflow-y: scroll;padding: 10px">
                <ShList :list="shoplist" @handelToshop="handelToshop"></ShList>
              </div>
              <div class="pagination-container">
                <el-pagination v-show="shoptotal>0" :current-page="shopQuery.page" :page-sizes="[10,20,30, 50]"
                               :page-size="shopQuery.limit" :total="shoptotal" background
                               layout="total, sizes, prev, pager, next, jumper" @size-change="handleShopSizeChange"
                               @current-change="handleShopSizeChange"/>
              </div>
            </el-form>
          </el-dialog>

          <!--拉黑-->
          <el-dialog
            title="拉黑门店"
            :visible.sync="BlockVisible"
            width="30%"
            :before-close="clickToBlock">
            <el-cascader
              v-model="backvalue"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"></el-cascader>
            <div style="text-align: center;width: 100%;margin-top: 30px" v-if="shop.blacklist===2">
              市场拉黑({{shop.marketday<356?shop.marketday+'天后到期':'永久'}})

            </div>
            <div style="text-align: center;width: 100%;margin-top: 30px" v-if="shop.ecblacklist==3">
              电商拉黑
              <!--{{shop.ecblackday}}-->
              ({{shop.ecmarketday<356?shop.ecmarketday+'天后到期':'永久'}})

            </div>

            <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="BlockVisible = false">取 消</el-button>
    <el-button type="primary" size="mini" @click="handleBack">确 定</el-button>
  </span>
          </el-dialog>

        </div>
        <el-form ref="form" :model="postFrom" label-width="100px">

          <div class="main-tag">
            <el-row :gutter="20">
              <el-form-item>

                <el-checkbox v-model="postFrom.book" label="宝典"></el-checkbox>
                <el-checkbox v-model="postFrom.ec_rec" label="电商推荐"></el-checkbox>
                <el-checkbox v-model="postFrom.mk_rec" label="市场推荐"></el-checkbox>
                <el-checkbox v-model="postFrom.to_hang" label="挂帐"></el-checkbox>

                <!--<el-checkbox v-model="postFrom.blacklist" label="黑名单"></el-checkbox>-->
              </el-form-item>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="类别">


                  <el-select size="mini" v-model="postFrom.shop_type" placeholder="请选择">
                    <el-option
                      v-for="item in op"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="店主">
                  <el-input size="mini" v-model="postFrom.shopkeeper"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="10">
                <el-form-item label="店名">
                  <el-input size="mini" v-model="postFrom.shopname"></el-input>
                </el-form-item>

              </el-col>
              <el-col :span="10">
                <el-form-item label="联系方式">
                  <el-input size="mini" v-model="postFrom.tel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="地区">

                  <el-cascader
                    size="mini"
                    :options="cityoptions"
                    placeholder
                    clearable
                    v-model="postFrom.cityCode"
                  ></el-cascader>
                </el-form-item>

              </el-col>
              <el-col :span="10">
                <el-form-item label="业务员">
                  <el-select size="mini" filterable clearable v-model="postFrom.salesman_id"
                             filterable
                             placeholder="">
                    <el-option
                      v-for="item in salesman"
                      :label="item.realName"
                      :value="item.id"
                      :disabled="listQuery.in_salesman_id===item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="地址">
                  <el-input size="mini" v-model="postFrom.location"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="服务商">
                  <el-input size="mini" v-model="postFrom.service_provider"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="10">
                <el-form-item label="电商拉黑">

                  <el-cascader
                    size="mini"
                    v-model="mcvalue"
                    :options="mctions"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"></el-cascader>

                </el-form-item>
              </el-col>


              <el-col :span="10">

                <el-form-item label="市场拉黑">

                  <el-cascader
                    size="mini"
                    v-model="backvalue"
                    :options="options"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"></el-cascader>
                </el-form-item>
              </el-col>


            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="备注">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="postFrom.desc">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">


              <el-col :span="20">

                <el-form-item label="店内环境">
                  <div class="el-form-list" v-for="(item,index) in postFrom.env">
                    <img :src="item.url" @click="handleImg(item.url)"/>

                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">

                <el-form-item label="门店正面照">
                  <img class="license" :src="postFrom.front" @click="handleImg(postFrom.front)">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="营业执照">
                  <img class="license" :src="postFrom.license" @click="handleImg(postFrom.license)">
                </el-form-item>
              </el-col>
            </el-row>

          </div>
        </el-form>
      </div>
      <div v-if="news_edit">确认与:{{Associated.postFrom.shopname}} 关联</div>
      <span slot="footer" class="dialog-footer">

        <template v-if="!news_edit">
            <el-button type="primary" size="mini" @click="handleNewAudit(3)">建立门店</el-button>
            <el-button type="primary" size="mini" @click="ShopVisible = true">关联</el-button>
            <el-button type="primary" size="mini" @click="innerVisible = true">驳回</el-button>
         </template>

         <template v-else>
            <el-button type="primary" size="mini" @click="handleAssociated">确认关联</el-button>
         </template>
    <el-button @click="handelColse()" size="mini">取 消</el-button>
  </span>
    </el-dialog>

  </div>

</template>

<script>
  // import InputForm from '@components/FormInput/index'
  import InputForm from '@/components/FormInput/index'
  import { change, changeAll, del, delAll, getList, PostDataByAudit, PostBlackByUpdate } from '@/api/shop'
  import waves from '@/directive/waves'
  import { getArrByKey, pickerOptions } from '@/utils'

  import { GetDataByList, GetDataByShopAll } from '@/api/shop'

  import { Citylist } from '@/api/city'

  import ShList from '@/components/shop/index'

  import { GetSaleByAll } from '@/api/salesman'
  import openWindow from '@/utils/openWindow'

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
        op: [{
          label: '普通',
          value: 1
        },
          {
            label: '阿帕认证',
            value: 2
          }, {
            label: '阿帕三星',
            value: 3
          }, {
            label: '阿帕四星',
            value: 4
          }, {
            label: '阿帕五星',
            value: 5
          }],
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

        options: [{
          value: 2,
          label: '市场',
          children: [{
            value: 100000,
            label: '永久'
          }, {
            value: 7,
            label: '七天'
          }, {
            value: 30,
            label: '一个月'
          }, {
            value: 90,
            label: '三个月'
          }, {
            value: 365,
            label: '1年'
          }
          ]

        }],

        mctions: [{
          value: 3,
          label: '电商',
          children: [{
            value: 100000,
            label: '永久'
          }, {
            value: 7,
            label: '七天'
          }, {
            value: 30,
            label: '一个月'
          }, {
            value: 90,
            label: '三个月'
          }, {
            value: 365,
            label: '1年'
          }]

        }],
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
      ShList
    },
    created() {
      Citylist().then(res => {
        this.cityoptions = res.data
      })
      this.shopList()
      this.fetchList()
      GetSaleByAll().then(res => {
        this.salesman = res.data
      })
      adminall().then(res => {
        this.adminll = res.data;
      });
    },
    methods: {

      handleImg(img) {
        openWindow(img, '图片预览', '500', '400')
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
        this.news_edit = false
        this.dialogVisible = false
      },
      clickToBlock() {
        this.BlockVisible = !this.BlockVisible
      },
      handleAssociated() {
        PostDataByAudit(this.Associated).then(res => {
          this.dialogVisible = false
          this.ShopVisible = false
          this.fetchList()
          this.postFrom={}
          this.news_edit = false

        })
      },
      handelToshop(e) {
        console.log(e)
        var data = this.postFrom
        this.postFrom.book = e.book
        this.postFrom.ec_rec = e.ec_rec
        this.postFrom.mk_rec = e.mk_rec
        this.postFrom.desc = e.desc
        this.postFrom.to_hang = e.to_hang

        this.postFrom.blacklist = e.blacklist
        this.postFrom.blackday = e.blackday
        this.postFrom.blackend = e.blackend
        console.log(e.salesman_id)
        this.postFrom.salesman_id=e.salesman_id

        this.postFrom.ecblacklist = e.ecblacklist
        this.postFrom.ecblackday = e.ecblackday

        this.postFrom.ecblackend = e.ecblackend

        this.postFrom.shop_type = e.shop_type

        let citycode = e.cityCode.split(',')

        if (e.cityCode) {
          for (let i = 0; i < citycode.length; i++) {
            citycode[i] = parseInt(citycode[i])
            if (i === 0) {
              this.postFrom.city_id = citycode[i]
            }
            if (i === 1) {
              this.postFrom.provinces_id = citycode[i]
            }
            if (i === 2) {
              this.postFrom.county_id = citycode[i]
            }
          }
          console.log(citycode)
        }
        this.postFrom.cityCode = citycode

        if (this.postFrom.book === 1) {
          this.postFrom.book = true
        }
        if (this.postFrom.ec_rec === 1) {
          this.postFrom.ec_rec = true
        }
        if (this.postFrom.mk_rec === 1) {
          this.postFrom.mk_rec = true
        }
        if (this.postFrom.to_hang === 1) {
          this.postFrom.to_hang = true
        }

        this.backvalue = [this.postFrom.blacklist, this.postFrom.blackday]
        this.mcvalue = [this.postFrom.ecblacklist, this.postFrom.ecblackday]
        var temp = {
          nwe_id: this.postFrom.id,
          postFrom: {
            id: e.id,
            shopkeeper: data.shopkeeper,
            shopname: data.shopname,
            tel: data.tel,
            cityCode: data.cityCode,
            location: data.location,
            front: data.front,
            license: data.license,
            user_id: data.user_id
          }
        }

        this.Associated = temp

        this.news_edit = true
        this.ShopVisible = false
        // PostDataByAudit(temp).then(res=>{
        //   console.log('更新成功')
        //   this.dialogVisible=false;
        //   this.ShopVisible=false;
        //   this.fetchList()
        //
        // })
      },

      handleChange(value) {
        this.day = value[1]
        console.log(value[0])
        if (value[0] === 2) {
          this.postFrom.blacklist = value[0]
          this.postFrom.blackday = value[1]
          this.backvalue = [value[0], value[1]]
        }
        if (value[0] === 3) {
          this.postFrom.ecblacklist = value[0]
          this.postFrom.ecblackday = value[1]
          this.mcvalue = [value[0], value[1]]
        }
        console.log(value[0])

      },
      handleSizeShopChange(val) {
        this.shopQuery.limit = val
        this.shopList()
      },

      handleCurrentShopChange(val) {
        this.shopQuery.page = val
        this.shopList()
      },
      shopList() {
        GetDataByList(this.shopQuery).then(response => {
          this.shoplist = response.data.data
          console.log(this.shoplist)
          this.shoptotal = response.data.total
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
          limit: 10,
          status: '1',
          title: ''
        }
        this.fetchList()
      },
      //关闭
      handleClose() {

      },
      // 1 新建门店  2 关联门店
      handleNewAudit(type) {

        //通过
        this.postFrom.status = type
        this.rejectedFrom.shop_id = this.postFrom.id
        var post = {
          postFrom: this.postFrom,
          rejectedFrom: this.rejectedFrom
        }
        PostDataByAudit(post).then(res => {
          // console.log(res)
          this.dialogVisible = !this.dialogVisible
          this.innerVisible = false
          this.postFrom={}
          this.handleFilterClear()
          this.handleFilter()
        })

      },
      handleBack() {
        const _this = this
        var day = this.day
        if (day === 100000) {
          day = '永久'
        }
        else {
          day = day + '天'
        }
        this.$confirm('此操作将该门店 ' + day + ' 拉黑, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.backtemp.id = this.postFrom.id
          PostBlackByUpdate(this.backtemp).then(res => {
            console.log(res)
            _this.BlockVisible = !this.BlockVisible
            this.$message.success('拉黑成功')
            this.getinfo()
          })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //审核弹出
      handleAudit(row) {
        this.postFrom = row
        if (this.postFrom.book === 1) {
          this.postFrom.book = true
        }
        if (this.postFrom.ec_rec === 1) {
          this.postFrom.ec_rec = true
        }
        if (this.postFrom.mk_rec === 1) {
          this.postFrom.mk_rec = true
        }
        if (this.postFrom.blacklist === 1) {
          this.postFrom.blacklist = true
        }
        let citycode =[]
        if( row.cityCode.constructor==Array){
          citycode=row.cityCode
        }else{
          citycode= row.cityCode.split(',')
        }


        if (row.cityCode) {
          for (let i = 0; i < citycode.length; i++) {
            citycode[i] = parseInt(citycode[i])
            if (i === 0) {
              this.postFrom.city_id = citycode[i]
            }
            if (i === 1) {
              this.postFrom.provinces_id = citycode[i]
            }
            if (i === 2) {
              this.postFrom.county_id = citycode[i]
            }
          }
        }
        this.postFrom.cityCode=citycode


        this.dialogVisible = !this.dialogVisible
      },

      handleSizeChange(val) {
        this.listQuery.psize = val
        this.fetchList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchList()
      },

      handleShopSizeChange(val) {
        this.shopQuery.page = val
        this.shopList()
      },
      handleShopCurrentChange(val) {
        this.shopQuery.page = val
        this.shopList()
      },
      handleModifyStatus(index, id, status) {
        this.list[index]['status'] = 1 - status
        change(id, 'status', 1 - status).then(response => {
        })
      },
      handleSelectionChange(val) {
        if (val.length > 0) {
          this.buttonDisabled = false
        } else {
          this.buttonDisabled = true
        }
        this.selectedRows = val
      },
      handleCreate() {
        this.$refs.fromRoles.handleCreate()
      },
      handleUpdate(index, id) {
        this.currentIndex = index
        this.$refs.fromRoles.handleUpdate(id)
      },
      updateRow(temp) {
        if (this.currentIndex >= 0 && temp.id > 0) {
          this.list.splice(this.currentIndex, 1, temp)
        } else {
          if (this.list.length >= 10) {
            this.list.pop()
          }
          this.list.push(temp)
          this.total = this.total + 1
        }
        this.currentIndex = -1
      },
      handleDelete(index, id) {
        const _this = this
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$set(_this.list[index], 'delete', true)
          del(id).then(response => {
            if (response.status === 1) {
              _this.list.splice(index, 1)
              _this.total = _this.total - 1
              _this.$notify.success(response.msg)
            } else {
              _this.$notify.error(response.msg)
            }
            _this.$set(_this.list[index], 'delete', false)
          }).catch((error) => {
            _this.$set(_this.list[index], 'delete', false)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleDeleteAll() {
        const _this = this
        if (this.selectedRows.length > 0) {
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.deleting = true
            const ids = getArrByKey(_this.selectedRows, 'id')
            const idstr = ids.join(',')
            delAll({ ids: idstr }).then(response => {
              if (response.status === 1) {
                const delindex = []
                _this.list.forEach(function(item, index, input) {
                  if (ids.indexOf(item.id) > -1) {
                    delindex.push(index)
                  }
                })
                for (let i = delindex.length - 1; i >= 0; i--) {
                  _this.list.splice(delindex[i], 1)
                }
                _this.total = _this.total - delindex.length
                _this.$message.success(response.msg)
              } else {
                _this.$message.error(response.msg)
              }
              _this.deleting = false
            }).catch((error) => {
              _this.deleting = false
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          _this.$message.error('请选择要删除的数据')
        }
      },
      handleCommand(command) {
        const _this = this
        if (this.selectedRows.length > 0) {
          const ids = getArrByKey(this.selectedRows, 'id')
          const idstr = ids.join(',')
          changeAll({ val: idstr, field: 'status', value: command }).then(response => {
            if (response.status === 1) {
              _this.list.forEach(function(item, index, input) {
                if (ids.indexOf(item.id) > -1) {
                  _this.list[index]['status'] = command
                }
              })
              _this.$message.success(response.msg)
            } else {
              _this.$message.error(response.msg)
            }
          }).catch((error) => {
          })
        } else {
          _this.$message.error('请选择要操作的数据')
        }
      }
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

</style>
