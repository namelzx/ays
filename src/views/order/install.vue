<template>
  <div>
    <div class="app-container pageclass">
      <!-- 搜索 -->

      <!--{{regionHiera}}-->

      <div class="filter-container dn">
        <el-form :inline="true" :model="listQuery">
          <el-row>
            <el-col :span="4">
              <el-form-item label="安装单号:">
                <el-input @keyup.enter.native="handleFilter()" size="mini" v-model="listQuery.id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="购买平台:">
                <el-cascader
                  size="mini"
                  :options="lazada"
                  clearable
                  v-model="listQuery.lazada_list"
                  placeholder

                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="微信昵称:">
                <el-input
                  @keyup.enter.native="handleFilter()"
                  size="mini"
                  v-model="listQuery.nickname"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="改装店:">
                <el-input
                  @keyup.enter.native="handleFilter()"
                  size="mini"
                  v-model="listQuery.shopname"
                ></el-input>
                <!--<el-select size="mini" filterable clearable v-model="listQuery.shop_id" placeholder>-->
                  <!--<el-option-->
                    <!--v-for="item in shop"-->
                    <!--:label="item.shopname"-->
                    <!--:value="item.id"-->
                    <!--:disabled="listQuery.salesman_id === item.id"-->
                  <!--&gt;</el-option>-->
                <!--</el-select>-->
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="日期:">
                <el-date-picker
                  style="width: 250px;"
                  size="mini"
                  v-model="listQuery.startTime"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00']"
                ></el-date-picker>
                <!--<el-input size="mini" v-model="listQuery.shopname" placeholder="请输入内容"></el-input>-->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4">
              <el-form-item label="车型:">
                <el-cascader
                  :props="props"
                  clearable
                  filterable
                  placeholder
                  size="mini"
                  v-model="listQuery.car_model"

                  ref="car"
                  @visible-change="elCascaderCar"
                  @expand-change="elCascaderCar"
                  change-on-select

                ></el-cascader>
                <!--<el-input size="mini" v-model="listQuery.order_no" placeholder="请输入内容"></el-input>-->
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="购买单号:">
                <el-input
                  @keyup.enter.native="handleFilter()"
                  size="mini"
                  v-model="listQuery.buy_order_no"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="联系人:">
                <el-input
                  @keyup.enter.native="handleFilter()"
                  size="mini"
                  v-model="listQuery.contact"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="业务员:">
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="listQuery.salesman_id"
                  placeholder
                >
                  <el-option
                    v-for="item in salesman"
                    :label="item.realName"
                    :value="item.id"
                    :disabled="listQuery.in_salesman_id === item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label="回访:">
                <el-select
                  size="mini"
                  clearable
                  v-model="listQuery.is_visit"
                  filterable
                  placeholder
                >
                  <el-option v-for="item in visit" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="售后:">
                <el-select
                  size="mini"
                  clearable
                  v-model="listQuery.is_after"
                  filterable
                  placeholder
                >
                  <el-option v-for="item in after" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4">
              <el-form-item label="地址:">
                <el-cascader
                  size="mini"
                  :options="cityoptions"
                  placeholder
                  clearable
                  ref="elcascader"
                  @visible-change="elCascaderOnlick"
                  @expand-change="elCascaderOnlick"
                  v-model="listQuery.cityCode"
                  change-on-select

                ></el-cascader>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label="购买产品:">
                <el-cascader
                  size="mini"
                  :options="productTree"
                  filterable
                  clearable
                  placeholder
                  v-model="listQuery.buy_product_id"
                  ref="product"
                  @visible-change="elCascaderproduct"
                  @expand-change="elCascaderproduct"
                  change-on-select
                ></el-cascader>
                <!--<el-input size="mini" v-model="listQuery.order_no" placeholder="请输入内容"></el-input>-->
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label="订单状态:">
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="listQuery.status"
                  @change="handleFilter()"
                  placeholder
                >
                  <el-option v-for="item in orderStatus" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="次业务员:">
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="listQuery.in_salesman_id"
                  placeholder
                >
                  <el-option
                    v-for="item in salesman"
                    :label="item.realName"
                    :value="item.id"
                    :disabled="listQuery.salesman_id === item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label="客服:">
                <!--<el-input-->
                <!--@keyup.enter.native="handleFilter()"-->
                <!--size="mini"-->
                <!--v-model="listQuery.service"-->
                <!--&gt;</el-input>-->
                <el-select
                  size="mini"
                  clearable
                  v-model="listQuery.pre_sales"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in adminll"
                    :label="item.realName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label="评价:">
                <el-select size="mini" clearable v-model="listQuery.is_eva" filterable placeholder>
                  <el-option v-for="item in eva" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 操作 -->
      <el-row style="margin-bottom: 10px;    text-align: right;    margin-right: 45px;">
        <el-col :xs="24" :sm="24" :lg="24">
          <el-tooltip content="搜索" placement="top">
            <el-button
              v-if="rolesbtn('o-67-1')"
              v-waves
              type="primary"
              size="mini"
              @click="handleFilter()"
            >搜索
            </el-button>
          </el-tooltip>
          <el-tooltip content="导出" placement="top">
            <el-button
              v-if="rolesbtn('o-67-4')"
              v-waves
              type="primary"
              size="mini"
              @click="handleDownload"
            >导出
            </el-button>
          </el-tooltip>
          <el-tooltip content="新增" placement="top">
            <!--<router-link to="create">-->
            <el-button
              @click="handleCreate"
              v-if="rolesbtn('o-67-3')"
              v-waves
              type="primary"
              size="mini"
            >新增
            </el-button>
            <!--</router-link>-->
          </el-tooltip>
          <el-tooltip content="批量" placement="top">
            <el-button v-waves type="primary" size="mini" @click="showSearch = !showSearch">批量</el-button>
          </el-tooltip>

        </el-col>
      </el-row>

      <!-- 表格 -->
      <div class="new-table" v-loading="listLoading">
        <div class="tab">
          <!-- 全选 -->
          <div class="list-item che">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            ></el-checkbox>
          </div>
          <div
            class="list-item"
            @click="handleStatusChange(0)"
            :class="listQuery.sstatus === 0 ? 'selected' : ''"
          >
            <span>待处理</span>
            <span class="price">{{ countdata[0]['total'] }}</span>
          </div>
          <div
            class="list-item"
            @click="handleStatusChange(1)"
            :class="listQuery.sstatus === 1 ? 'selected' : ''"
            style="width: 15%"
          >
            <span>待确认(业务)</span>
            <span class="price">{{ countdata[1]['total'] }}</span>
          </div>
          <div
            class="list-item"
            @click="handleStatusChange(2)"
            :class="listQuery.sstatus === 2 ? 'selected' : ''"
            style="width: 15%"
          >
            <span>待确认(门店)</span>
            <span class="price">{{ countdata[2]['total'] }}</span>
          </div>
          <div
            class="list-item"
            @click="handleStatusChange(3)"
            :class="listQuery.sstatus === 3 ? 'selected' : ''"
          >
            <span>待安装</span>
            <span class="price">{{ countdata[3]['total'] }}</span>
          </div>
          <div
            class="list-item"
            @click="handleStatusChange(4)"
            :class="listQuery.sstatus === 4 ? 'selected' : ''"
          >
            <span>已安装</span>
            <span class="price">{{ countdata[4]['total'] }}</span>
          </div>
          <div
            class="list-item"
            @click="handleStatusChange(5)"
            :class="listQuery.sstatus === 5 ? 'selected' : ''"
          >
            <span>财审1</span>
            <span class="price">{{ countdata[5]['total'] }}</span>
          </div>
          <div
            class="list-item"
            @click="handleStatusChange(6)"
            :class="listQuery.sstatus === 6 ? 'selected' : ''"
          >
            <span>财审2</span>
            <span class="price">{{ countdata[6]['total'] }}</span>
          </div>
          <div
            class="list-item"
            @click="handleStatusChange(7)"
            :class="listQuery.sstatus === 7 ? 'selected' : ''"
          >
            <span>待结算</span>
            <span class="price">{{ countdata[7]['total'] }}</span>
          </div>
          <div
            class="list-item"
            @click="handleStatusChange(8)"
            :class="listQuery.sstatus === 8 ? 'selected' : ''"
          >
            <span>已结算</span>
            <span class="price">{{ countdata[8]['total'] }}</span>
          </div>
          <div
            class="list-item"
            @click="handleStatusChange('all')"
            :class="listQuery.sstatus === 'all' ? 'selected' : ''"
          >
            <span>全部</span>
            <span class="price">{{ allsum }}</span>
          </div>
          <div
            class="list-item"
            @click="handleStatusChange(9)"
            :class="listQuery.sstatus === 9 ? 'selected' : ''"
          >
            <span>驳回</span>
            <span class="price">{{ countdata[9]['total'] }}</span>
          </div>
          <div
            class="list-item"
            @click="handleStatusChange(10)"
            :class="listQuery.sstatus === 10 ? 'selected' : ''"
          >
            <span>退货</span>
            <span class="price">{{ countdata[10]['total'] }}</span>
          </div>
          <div
            class="list-item"
            @click="handleStatusChange(11)"
            :class="listQuery.sstatus === 11 ? 'selected' : ''"
          >
            <span>回收箱</span>
            <span class="price">{{ countdata[11]['total'] }}</span>
          </div>
        </div>
        <div class="table" v-if="total > 0" v-for="(item, index) in list">
          <div class="table-title">
            <div class="list-item che">
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox :label="item.id"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="list-item">
              <span>安装单号:</span>
              <span>{{ item.id }}</span>
            </div>
            <div class="list-item">
              <span>购买单号:</span>
              <span>{{ item.buy_order_no }}</span>
            </div>
            <div class="list-item">
              <span>创建日期:</span>
              <span>{{ item.create_time }}</span>
            </div>

            <div class="list-item a-link">
              <a v-if="item.access_count < 1">未回访</a>
              <a v-else>已回访</a>
              <a v-if="item.status !== '退货'">
                <span v-if="item.credentials">已安装</span>
                <span v-else>未安装</span>
              </a>
            </div>

            <div class="list-item a-link">
              <a @click="handelInfo(item, 'sales')" v-if="rolesbtn('o-67-7')">售后</a>
              <a @click="handelInfo(item, 'install')">详情</a>
              <a v-if="rolesbtn('o-67-5')" @click="handleEdit(item)">修改</a>
              <a v-if="item.status === '退货'" @click="handleBackoff(item)">
                <span>退货理由</span>
              </a>
            </div>
          </div>
          <div class="table-content">
            <div class="table-filed">
              <div class="filed-span">
                <span>产品:</span>
                <div>
                  <div class="field">{{ item.product_titile }}</div>
                </div>
              </div>
              <div class="filed-span">
                <span>平台:</span>
                <div>
                  <div class="field">{{ item.lazada_title }}</div>
                </div>
              </div>
              <div class="filed-span">
                <span>车型:</span>
                <div>
                  <div class="field">{{ item.model_title }}</div>
                </div>
              </div>
            </div>
            <div class="table-filed jp">
              <div class="filed-span">
                <span>微信昵称:</span>
                <div>
                  <div class="field" v-if="item.weacht">{{ item.weacht.nickname }}</div>

                  <div class="field" v-else>会员尚未注册</div>
                </div>
              </div>
              <div class="filed-span">
                <span>联系人</span>
                <div>
                  :
                  <div class="field">{{ item.contact }}{{ item.tel }}</div>
                </div>
              </div>
              <div class="filed-span">
                <span>备注</span>
                <div>
                  :
                  <div class="field">{{ item.desc }}</div>
                </div>
              </div>
            </div>
            <div class="table-filed jp">
              <div class="filed-span">
                <span>业务员:</span>
                <div>
                  <div class="field" v-if="item.sales">{{ item.sales.realName }}</div>
                  <div class="field" v-else-if="item.status === '待处理'">尚未派单</div>
                  <div class="field" v-else>未分配</div>
                </div>
              </div>
              <div class="filed-span">
                <span>次业务员</span>
                <div>
                  :
                  <div class="field" v-if="item.insales">{{ item.insales.realName }}</div>

                  <div class="field" v-else-if="item.status === '待处理'">尚未派单</div>
                  <div class="field" v-else>未分配</div>
                </div>
              </div>
            </div>

            <div class="table-filed jl">
              <div class="filed-price">¥ {{ item.ins_cost | nFormatter }}</div>
            </div>

            <div class="table-filed jl" style="justify-content: center">
              <div class="filed-price">
                <el-button
                  v-if="item.status === '待处理' && rolesbtn('o-h-1')"
                  size="mini"
                  type="primary"
                  @click="handleUpdate(item)"
                >派单
                </el-button>

                <el-button
                  v-if="item.status === '待确认(业务)' && rolesbtn('o-h-2')"
                  size="mini"
                  type="primary"
                  @click="handleSend(item, 2)"
                >同意派单
                </el-button>
                <el-button
                  v-if="item.status === '待确认(门店)' && rolesbtn('o-h-3')"
                  size="mini"
                  type="primary"
                  @click="handleSend(item, 3)"
                >同意接单
                </el-button>
                <el-button
                  v-if="item.status === '待安装' && rolesbtn('o-h-4')"
                  size="mini"
                  type="primary"
                  @click="handleSend(item, 4)"
                >安装完成
                </el-button>
                <el-button
                  v-if="item.status === '已安装' && rolesbtn('o-h-5')"
                  size="mini"
                  type="primary"
                  @click="handleSend(item, 5)"
                >客服确认
                </el-button>
                <el-button
                  v-if="item.status === '财审1' && rolesbtn('o-h-6')"
                  size="mini"
                  type="primary"
                  @click="handleSend(item, 6)"
                >财审1
                </el-button>
                <el-button
                  v-if="item.status === '财审2' && rolesbtn('o-h-7')"
                  size="mini"
                  type="primary"
                  @click="handleSend(item, 7)"
                >财审2
                </el-button>
                <el-button
                  v-if="item.status === '待结算' && rolesbtn('o-h-8')"
                  size="mini"
                  type="primary"
                  @click="handleSend(item, 8)"
                >结算
                </el-button>

                <el-button
                  v-if="item.status === '驳回' && rolesbtn('o-h-1')"
                  size="mini"
                  type="primary"
                  @click="handleUpdate(item)"
                >派单
                </el-button>
              </div>
            </div>
          </div>
          <div class="table-title table-bottom">
            <div class="list-item che">
              <!--<el-checkbox v-model="checked"></el-checkbox>-->
            </div>
            <div class="list-item">
              <span>状态:</span>

              <a class="a-link" v-if="item.status === '驳回'">待处理 {{ item.rejected }}{{ item.status }}</a>
              <a
                class="a-link"
                @click="handelEva(item)"
                v-else-if="item.is_eva === 1"
              >{{ item.status }} (已评价)</a>
              <a class="a-link" v-else>
                {{ item.status }}
                <span v-if="item.is_rejected === 1">{{ item.rejected }}驳回</span>
              </a>
            </div>
            <div class="list-item">
              <span>售前客服:</span>
              <div v-if="item.pre">{{ item.pre.realName }}</div>
              <div v-else>暂无</div>
            </div>

            <div class="list-item">
              <span>售后客服:</span>
              <div v-if="item.after">{{ item.after.realName }}</div>
              <div v-else>暂无</div>
            </div>
            <div class="list-item shop-item">
              <span>安装门店:</span>
              <span v-if="item.shop">{{ item.shop.shopname }} {{ item.shop.shopkeeper }}</span>
              <div class="field" v-else-if="item.status === '待处理'">尚未派单</div>
              <div class="field" v-else>门店未选择</div>
            </div>
            <div class="list-item order-btn">
              <template
                v-if="
                  item.status === '待处理' ||
                    item.status === '待确认(业务)' ||
                    item.status === '待确认(门店)' ||
                    item.status === '待安装' ||
                    item.status === '已安装'
                "
              >
                <el-button
                  size="mini"
                  v-if="rolesbtn('o-h-1') && item.status === '待处理'"
                  @click="handleReturn(item)"
                  type="warning"
                  plain
                >退货
                </el-button>

                <el-button
                  size="mini"
                  v-if="rolesbtn('o-h-2') && item.status === '待确认(业务)'"
                  @click="handleReturn(item)"
                  type="warning"
                  plain
                >退货
                </el-button>
                <el-button
                  size="mini"
                  v-if="rolesbtn('o-h-3') && item.status === '待确认(门店)'"
                  @click="handleReturn(item)"
                  type="warning"
                  plain
                >退货
                </el-button>
                <el-button
                  size="mini"
                  v-if="rolesbtn('o-h-4') && item.status === '待安装'"
                  @click="handleReturn(item)"
                  type="warning"
                  plain
                >退货
                </el-button>
                <el-button
                  size="mini"
                  v-if="rolesbtn('o-h-5') && item.status === '已安装'"
                  @click="handleReturn(item)"
                  type="warning"
                  plain
                >退货
                </el-button>
              </template>

              <el-button
                size="mini"
                v-if="rolesbtn('o-h-2') && item.status === '待确认(业务)'"
                @click="handelRejected(item)"
                type="warning"
                plain
              >驳回
              </el-button>
              <el-button
                size="mini"
                v-if="rolesbtn('o-h-3') && item.status === '待确认(门店)'"
                @click="handelRejected(item)"
                type="warning"
                plain
              >驳回
              </el-button>
              <el-button
                size="mini"
                v-if="rolesbtn('o-h-4') && item.status === '待安装'"
                @click="handelRejected(item)"
                type="warning"
                plain
              >驳回
              </el-button>

              <el-button
                size="mini"
                v-if="rolesbtn('o-h-5') && item.status === '已安装'"
                @click="handelRejected(item)"
                type="warning"
                plain
              >驳回
              </el-button>

              <el-button
                size="mini"
                v-if="rolesbtn('o-h-6') && item.status === '财审1'"
                @click="handelRejected(item)"
                type="warning"
                plain
              >驳回
              </el-button>
              <el-button
                size="mini"
                v-if="rolesbtn('o-h-7') && item.status === '财审2'"
                @click="handelRejected(item)"
                type="warning"
                plain
              >驳回
              </el-button>
              <el-button
                size="mini"
                v-if="rolesbtn('o-h-8') && item.status === '待结算'"
                @click="handelRejected(item)"
                type="warning"
                plain
              >驳回
              </el-button>

              <el-button
                size="mini"
                v-if="rolesbtn('o-h-11') && item.status === '退货'"
                @click="handelRejected(item)"
                type="warning"
                plain
              >驳回
              </el-button>
              <el-button
                size="mini"
                v-if="rolesbtn('o-67-2')"
                @click="handleDelete(index, item.id)"
                type="warning"
                plain
              >删除
              </el-button>
            </div>
          </div>
        </div>
        <div v-if="total < 1" class="no-data">当前暂无数据</div>
      </div>
      <!-- 分页 -->

      <!--驳回数据-->
      <el-dialog
        :title="reTitle"
        :visible.sync="RedialogVisible"
        width="30%"
        :before-close="handleRe"
      >
        <el-form :model="shopQuery" class="form-container" label-width="70px">
          <el-form-item size="mini" label="驳回原因:" class="postInfo-container-item">
            <el-select v-if="reFrom.status !== '退货'" v-model="reFrom.content" placeholder="请选择">
              <el-option
                v-for="item in reOption"
                :key="item.lable"
                :label="item.lable"
                :value="item.lable"
              ></el-option>
            </el-select>
            <el-input v-else size="mini" v-model="reFrom.content"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="RedialogVisible = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="handelPostRe">确 定</el-button>
        </span>
      </el-dialog>
      <!--退货-->
      <el-dialog
        :title="reTitle"
        :visible.sync="ReturndialogVisible"
        width="30%"
        :before-close="handleReturn"
      >
        <div class="return">
          <el-form :model="ReturnData" class="form-container" label-width="70px">
            <el-form-item label="退货理由">
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-input size="mini" v-model="ReturnData.name"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-radio-group size="mini" v-model="ReturnData.type">
                    <el-radio :label="1">仅退款</el-radio>
                    <el-radio :label="2">退款退货</el-radio>
                  </el-radio-group>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="退款金额">
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-input size="mini" v-model="ReturnData.price"></el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item v-if="ReturnData.type === 2">
              <span class="tish">*重要！请确认客户已寄回产品,并验收产品完整</span>
            </el-form-item>

            <el-form-item label="快递公司" v-if="ReturnData.type === 2">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-input size="mini" v-model="ReturnData.courier"></el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="快递单号" v-if="ReturnData.type === 2">
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-input size="mini" v-model="ReturnData.courier_order_no"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="ReturndialogVisible = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="handeReturn">确 定</el-button>
        </span>
      </el-dialog>
      <!--退货理由-->
      <el-dialog
        title="退货内容"
        :visible.sync="BackoffVisible"
        width="30%"
        :before-close="handleBackoff"
      >
        <div class="return">
          <el-form :model="ReturnData" class="form-container" label-width="70px">
            <el-form-item label="退货理由">
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-input size="mini" disabled v-model="returned.name"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-radio-group disabled size="mini" v-model="returned.type">
                    <el-radio :label="1">仅退款</el-radio>
                    <el-radio :label="2">退款退货</el-radio>
                  </el-radio-group>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="退款金额">
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-input size="mini" disabled v-model="returned.price"></el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item v-if="returned.type === 2">
              <span class="tish">*重要！请确认客户已寄回产品,并验收产品完整</span>
            </el-form-item>

            <el-form-item label="快递公司" v-if="returned.type === 2">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-input size="mini" disabled v-model="returned.courier"></el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="快递单号" v-if="returned.type === 2">
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-input size="mini" disabled v-model="returned.courier_order_no"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="BackoffVisible = false">关闭</el-button>
        </span>
      </el-dialog>
      <!--评价-->
      <el-dialog
        :title="reTitle"
        :visible.sync="eavVisible"
        width="30%"
        :before-close="handlecancel"
      >
        <div class="eva">
          <!--{{evainfo}}-->

          <el-row :gutter="20">
            <div class="spna">产品</div>
            <div>
              <el-rate
                disabled
                :colors="['#FF0000', '#FF0000', '#FF0000']"
                v-model="evainfo.product"
              ></el-rate>
            </div>
          </el-row>

          <el-row :gutter="20">
            <div class="spna">客服</div>
            <div>
              <el-rate
                disabled
                :colors="['#FF0000', '#FF0000', '#FF0000']"
                v-model="evainfo.product"
              ></el-rate>
            </div>
          </el-row>
          <el-row :gutter="20">
            <div class="spna">门店</div>
            <div>
              <el-rate
                disabled
                :colors="['#FF0000', '#FF0000', '#FF0000']"
                v-model="evainfo.product"
              ></el-rate>
            </div>
          </el-row>

          <el-row :gutter="20">
            <div class="eva-conent">{{ evainfo.content }}</div>
          </el-row>

          <el-row :gutter="20">
            <div class="rate-img">
              <div class="img-item" v-for="(pic, idx) of evainfo.img" :key="idx">
                <img :src="pic" alt/>
              </div>
            </div>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="eavVisible = false">关闭</el-button>
        </span>
      </el-dialog>

      <send-order
        v-if="dialogVisible"
        :is_disabled="is_disabled"
        :Stitle="Stitle"
        @handleClose="handleClose"
        :postFrom="postFrom"
        :dialogVisible="dialogVisible"
      ></send-order>

      <!--派单数据-->
      <addOrder
        v-if="addVisible"
        :is_disabled="is_disabled"
        :Stitle="Stitle"
        @handleClose="handleClose"
        :postFrom="postFrom"
        :dialogVisible="addVisible"
      ></addOrder>
      <!--详情数据-->

      <OrderInfo
        :tabtext="tabtext"
        v-if="infodialogVisible"
        @handelInfoDialog="handelInfoDialog"
        :OrderInfo="postFrom"
        :infodialogVisible="infodialogVisible"
      ></OrderInfo>
    </div>

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
  var app0

  import {
    change,
    changeAll,
    del,
    delAll,
    GetDataByList,
    GetQueryBydownload,
    PostDataByAdd,
    PostNoteByAdd,
    PostReturnedByAdd
  } from '@/api/order'
  import waves from '@/directive/waves'
  import { getArrByKey, pickerOptions } from '@/utils'
  import { mapGetters } from 'vuex'
  import sendOrder from './install/sendOrder'
  import addOrder from './install/addOrder'
  import OrderInfo from './install/OrderInfo'
  import { Citylist } from '@/api/city'

  import { getBrand, getSeries, getModel } from '@/api/tools'

  import { GetecshopByList } from '@/api/ecshop'
  import { GetDataByShopAll } from '@/api/shop'

  import { GetProductByTree } from '@/api/product'

  import { GetSaleByAll } from '@/api/salesman'

  import { adminall } from '@/api/admin'

  export default {
    name: 'Roles',
    // components: { rolesForm },
    directives: {
      waves
    },
    components: {
      sendOrder,
      OrderInfo,
      addOrder
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: '禁用',
          1: '正常'
        }
        return statusMap[status]
      },
      nFormatter(num, digits = 2) {
        const si = [
          { value: 1, symbol: '' },
          // { value: 1e3, symbol: "K" },
          { value: 1e6, symbol: 'M' },
          { value: 1e9, symbol: 'G' },
          { value: 1e12, symbol: 'T' },
          { value: 1e15, symbol: 'P' },
          { value: 1e18, symbol: 'E' }
        ]
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
        let i
        for (i = si.length - 1; i > 0; i--) {
          if (num >= si[i].value) {
            break
          }
        }
        return (
          (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
        )
      }
    },
    data() {
      return {
        props: {
          lazy: true,
          lazyLoad(node, resolve) {
            const { level } = node

            if (level === 0) {
              getBrand().then(res => {

                var data = res.data

                let nodes = []
                for (let i = 0; i < data.length; i++) {
                  nodes.push({ label: data[i].name, value: data[i].brandid })
                }
                resolve(nodes)

              })

              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            }
            if (level === 1) {
              getSeries(node.data.value).then(res => {
                var data = res.data
                let nodes = []
                for (let i = 0; i < data.length; i++) {
                  nodes.push({ label: data[i].factory_name + ' ' + data[i].series_name, value: data[i].series_id })
                }
                resolve(nodes)

              })

              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            }

            if (level === 2) {
              getModel(node.data.value).then(res => {
                var data = res.data
                let nodes = []
                for (let i = 0; i < data.length; i++) {
                  nodes.push({ label: data[i].label, value: data[i].value, leaf: level >= 2 })
                }
                resolve(nodes)

              })

              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            }
            if (level === 3) {
              let nodes = []
              resolve(nodes)
            }
          }
        },
        isIndeterminate: false,
        checkAll: false, //全选
        checkedCities: [],
        multipleSelection: [],
        checkedGameId: [], //
        returned: {},
        evainfo: {},
        eavVisible: false,
        loading: true,
        sumorder: 0,
        productTree: [], //产品树
        reTitle: '',
        reFrom: {
          role: 2,
          type: 1
        },
        after: [
          {
            lable: '已售后',
            value: 1
          },
          {
            lable: '未售后',
            value: 2
          }
        ],

        eva: [
          {
            lable: '已评价',
            value: 1
          },
          {
            lable: '未评价',
            value: 2
          }
        ],

        orderStatus: [
          {
            lable: '全部',
            value: 'all'
          },
          {
            lable: '待处理',
            value: 0
          },
          {
            lable: '待确认(业务)',
            value: 1
          },
          {
            lable: '待确认(门店)',
            value: 2
          },
          {
            lable: '待安装',
            value: 3
          },
          {
            lable: '已安装',
            value: 4
          },
          {
            lable: '财审1',
            value: 5
          },
          {
            lable: '财审2',
            value: 6
          },
          {
            lable: '待结算',
            value: 7
          },
          {
            lable: '已结算',
            value: 8
          },
          {
            lable: '退货',
            value: 10
          },
          {
            lable: '删除',
            value: 11
          }
        ],
        visit: [
          {
            lable: '已回访',
            value: 1
          },
          {
            lable: '未回访',
            value: 2
          }
        ],
        infodialogVisible: false, //打开详情
        reOption: [
          {
            lable: '客户临时取消安装'
          },
          {
            lable: '客户不在该城市了'
          },
          {
            lable: '距离原因客户要求更换门店'
          },
          {
            lable: '其他原因'
          }
        ],
        is_disabled: false,
        shopQuery: {
          cityCode: undefined,
          shopname: undefined,
          tel: undefined
        },
        postFrom: {},
        permissions: [], //权限组
        RedialogVisible: false,
        ReturndialogVisible: false,
        ReturnData: {
          type: 1,
          price: undefined,
          courier: undefined,
          courier_order_no: undefined,
          name: undefined
        },
        addVisible: false,
        innerVisible: false,
        dialogVisible: false,

        tableKey: 0,
        order_id: undefined,
        CarModellist: [], //车型数据
        lazada: [], //所有平台
        salesman: [], //所有业务员
        device: [], //装置罩
        carl: [],
        list: null,
        total: null,
        // postFrom: Object.assign({}, defaultForm),
        cityoptions: [], //地址
        selectedRows: null,
        listLoading: true,
        showSearch: false,
        BackoffVisible: false,
        options: [],
        shop: [],
        listQuery: {
          page: 1,
          limit: 10,
          status: 'all',
          title: '',
          sstatus: 'all'
        },
        allsum: 0,
        countdata: [
          {
            total: 1,
            status: 1
          },
          {
            total: 1,
            status: 1
          },
          {
            total: 1,
            status: 1
          },
          {
            total: 1,
            status: 1
          },
          {
            total: 1,
            status: 1
          },
          {
            total: 1,
            status: 1
          },
          {
            total: 1,
            status: 1
          },
          {
            total: 1,
            status: 1
          },
          {
            total: 1,
            status: 1
          },
          {
            total: 1,
            status: 1
          },
          {
            total: 1,
            status: 1
          },
          {
            total: 1,
            status: 1
          }
        ],

        tabtext: 'install',
        buttonDisabled: true,
        deleting: false,
        pickerOptions: pickerOptions,
        currentIndex: -1,
        regionHiera: [],
        Stitle: '',
        adminll: []
      }
    },
    computed: {
      ...mapGetters(['userinfo', 'brand', 'group'])
    },
    watch: {},
    created() {
      adminall().then(res => {
        this.adminll = res.data
      })
      this.permissions = this.group.btn.split(',')
      this.fetchList()

      Citylist().then(res => {
        this.cityoptions = res.data
      })
      GetecshopByList().then(res => {
        this.lazada = res.data
      })

      console.log(this.userinfo)
      //产品树
      GetProductByTree().then(res => {
        this.productTree = res.data
      })
      // GetDataByShopAll().then(res => {
      //   this.shop = res.data
      // })

      GetSaleByAll().then(res => {
        this.salesman = res.data
      })
    },

    methods: {
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

      elCascaderproduct() {
        let that = this
        setTimeout(function() {
          document.querySelectorAll('.el-cascader-node__label').forEach(el => {
            el.onclick = function() {
              this.previousElementSibling.click()
              that.$refs.product.dropDownVisible = false
            }
          })
          document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function() {
                that.$refs.product.dropDownVisible = false
              }
            })
        }, 100)
      },
      elCascaderCar() {
        let that = this
        setTimeout(function() {
          document.querySelectorAll('.el-cascader-node__label').forEach(el => {
            el.onclick = function() {
              this.previousElementSibling.click()
              that.$refs.car.dropDownVisible = false
            }
          })
          document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function() {
                that.$refs.car.dropDownVisible = false
              }
            })
        }, 100)
      },
      headGain() {
        console.log(this.checkedCities, '获取id')
      },
      //监听全选
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.checkedGameId : []
        this.isIndeterminate = false
        if (this.checkAll) {
          console.log('全选')
        } else {
          console.log('未全选')
        }
      },
      //监听单选
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.checkedGameId.length
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.checkedGameId.length
      },
      handleBackoff(item) {
        this.returned = item.returned
        this.BackoffVisible = !this.BackoffVisible
      },

      handlecancel() {
        this.eavVisible = false
      },
      handelEva(row) {
        this.evainfo = {}
        this.evainfo = row.eva

        if (row.eva.img.constructor === String) {
          this.evainfo.img = row.eva.img.split(',')
        }
        this.eavVisible = true
        this.reTitle = row.id + '-' + '车主评价'
      },
      handeReturn() {
        // this.$message('暂未编写退货逻辑')
        this.ReturnData.order_id = this.order_id
        this.ReturnData.tocontent = this.userinfo.realName + ' 退货订单'
        PostReturnedByAdd(this.ReturnData).then(res => {
          this.$message.success('退货成功')
          this.ReturndialogVisible = !this.ReturndialogVisible
          this.fetchList()
        })
      },
      //导出数据
      handleDownload() {
        this.listLoading = true
        GetQueryBydownload(this.listQuery).then(res => {
          import('@/vendor/Export2Excel').then(excel => {
            console.log(excel)
            const tHeader = res.data.tHeader
            const filterVal = res.data.filterVal
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
              filename: '安装单-' + s2
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
      handleReturn(row) {
        this.ReturndialogVisible = !this.ReturndialogVisible
        this.reFrom.rejected=row.status
        this.reTitle = row.id + ' ' + '退货操作'
        this.order_id = row.id
      },
      handleRe() {
        this.RedialogVisible = !this.RedialogVisible
      },
      rolesbtn(val) {
        var index = this.permissions.indexOf(val)
        if (index > -1) {
          return true
        } else {
          return false
        }
      },
      handeldownload() {
        this.$message('暂无导出')
      },
      handelInfoDialog() {
        this.infodialogVisible = !this.infodialogVisible
      },
      //打开详情
      handelInfo(row, type) {
        this.tabtext = type
        console.log(type)
        this.postFrom = row
        if (row.city_code !== null) {
          if (row.city_code.constructor === String) {
            this.postFrom.city_code = this.postFrom.city_code.split(',')
          }
        }

        if (row.car_model !== null) {
          if (row.car_model.constructor === String) {
            this.postFrom.car_model = this.postFrom.car_model.split(',')
          }
        }
        if (row.lazada_list !== null) {
          if (row.lazada_list.constructor === String) {
            this.postFrom.lazada_list = this.postFrom.lazada_list.split(',')
          }
          let lazada = this.postFrom.lazada_list
          this.postFrom.lazada_list = []

          for (let i = 0; i < lazada.length; i++) {
            this.postFrom.lazada_list.push(parseInt(lazada[i]))
          }
        }

        this.infodialogVisible = !this.infodialogVisible
      },
      handelPostRe() {
        this.reFrom.admin_id = this.userinfo.id


        this.reFrom.tocontent =
          '  ' +
          this.userinfo.realName +
          '驳回订单,' +
          '原因' +
          this.reFrom.content
        PostNoteByAdd(this.reFrom).then(res => {
          this.fetchList()
          this.$message.success('驳回成功')
          this.RedialogVisible = !this.RedialogVisible
        })
      },
      //驳回
      handelRejected(row) {
        console.log(row)
        var type = row.status
        this.reTitle = '驳回原因'
        this.RedialogVisible = !this.RedialogVisible
        this.reFrom.order_id = row.id
        this.reFrom.status = row.status
        this.reFrom.model_title = row.model_title
        this.reFrom.product_titile = row.product_titile
        this.reFrom.rejected = row.status

        if (row.shop) {
          this.reFrom.shopname = row.shop.shopname
        }
        this.reFrom.admin_name = this.userinfo.realName
        this.reFrom.openid = row.openid
        this.reFrom.salesman_id = row.salesman_id
        this.reFrom.pre_sales = row.pre_sales
        this.reTitle = row.id + '-' + row.status + ' ' + '驳回原因'
        var option = []
        if (type === '待确认(业务)') {
          option = [
            {
              lable: '安装费错误'
            },
            {
              lable: '选错业务员'
            },
            {
              lable: '客户原因导致驳回'
            },
            {
              lable: '选错门店'
            }
          ]
        }
        if (type === '待确认(门店)') {
          option = [
            {
              lable: '客户临时取消安装'
            },
            {
              lable: '客户不在该城市了'
            },
            {
              lable: '距离原因客户要求更换门店'
            },
            {
              lable: '其他原因'
            }
          ]
        }

        if (type === '待安装') {
          option = [
            {
              lable: '客户临时取消安装'
            },
            {
              lable: '客户不在该城市了'
            },
            {
              lable: '距离原因客户要求更换门店'
            },
            {
              lable: '其他原因'
            }
          ]
        }
        if (type === '已安装') {
          option = [
            {
              lable: '未安装'
            },
            {
              lable: '其他原因'
            }
          ]
        }
        if (type === '财审1' || type === '财审2' || type === '待结算') {
          option = [
            {
              lable: '查无此单'
            },
            {
              lable: '其他原因'
            }
          ]
        }
        this.reOption = option
      },
      //所选门店
      fetchList() {
        this.listLoading = true
        GetDataByList(this.listQuery).then(response => {
          this.list = response.data.data
          for (let i = 0; i < this.list.length; i++) {
            this.checkedGameId.push(this.list[i].id)
            this.multipleSelection = this.checkedGameId
          }
          this.total = response.data.total
          let countdata = response.data.countdata

          var temp = []
          var allsum = 0
          for (let i = 0; i < 13; i++) {
            temp.push({ total: 0, status: i })
          }
          for (let i = 0; i < countdata.length; i++) {
            allsum = allsum + countdata[i].total
            temp[countdata[i].status].total = countdata[i].total
            if (countdata[i].status === 9) {
              if (temp[0].total === 0) {
                temp[0].total = countdata[i].total
              } else {
                temp[0].total = temp[0].total + countdata[i].total
              }
            }
          }

          this.listLoading = !this.listLoading
          this.allsum = allsum
          this.countdata = temp
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
          status: '-1',
          title: ''
        }
        this.fetchList()
      },
      handleSizeChange(val) {
        this.listQuery.psize = val
        this.fetchList()
      },

      handleStatusChange(val) {
        this.listQuery.page = 1
        this.listQuery.sstatus = val
        this.fetchList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchList()
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
        this.postFrom = {}
        this.postFrom.status = '新增'
        this.Stitle = '新增' + '操作'
        this.is_disabled = false
        this.addVisible = true
      },
      handleUpdate(row) {
        this.postFrom = {}
        this.postFrom = row
        if (row.city_code.constructor === String) {
          this.postFrom.city_code = this.postFrom.city_code.split(',')
        }

        if (row.car_model !== null) {
          if (row.car_model.constructor === String) {
            this.postFrom.car_model = this.postFrom.car_model.split(',')
          }
        }
        if (row.buy_product_id !== null) {
          if (row.buy_product_id.constructor === String) {
            let arr = []
            let temp = this.postFrom.buy_product_id.split(',')
            for (let i = 0; i < temp.length; i++) {
              arr.push(parseInt(temp[i]))
            }
            this.postFrom.buy_product_id = arr
          }
        }

        if (row.lazada_list !== null) {
          if (row.lazada_list.constructor === String) {
            this.postFrom.lazada_list = this.postFrom.lazada_list.split(',')
          }

          let lazada = this.postFrom.lazada_list
          this.postFrom.lazada_list = []
          for (let i = 0; i < lazada.length; i++) {
            this.postFrom.lazada_list.push(parseInt(lazada[i]))
          }
        }

        this.is_disabled = false

        if (this.postFrom.status === '驳回') {
          this.postFrom.status = '重新派单'
        }

        this.Stitle = this.postFrom.id + '-' + this.postFrom.status + '操作'

        this.dialogVisible = true
      },

      handleEdit(row) {
        this.postFrom = {}
        this.postFrom = row
        if (row.city_code.constructor === String) {
          this.postFrom.city_code = this.postFrom.city_code.split(',')
        }

        if (row.car_model !== null) {
          if (row.car_model.constructor === String) {
            this.postFrom.car_model = this.postFrom.car_model.split(',')
          }
        }
        if (row.buy_product_id !== null) {
          if (row.buy_product_id.constructor === String) {
            let arr = []
            let temp = this.postFrom.buy_product_id.split(',')
            for (let i = 0; i < temp.length; i++) {
              arr.push(parseInt(temp[i]))
            }

            this.postFrom.buy_product_id = arr
          }
        }

        if (row.lazada_list !== null) {
          if (row.lazada_list.constructor === String) {
            this.postFrom.lazada_list = this.postFrom.lazada_list.split(',')
          }

          let lazada = this.postFrom.lazada_list
          this.postFrom.lazada_list = []
          for (let i = 0; i < lazada.length; i++) {
            this.postFrom.lazada_list.push(parseInt(lazada[i]))
          }
        }

        this.is_disabled = false

        if (this.postFrom.status === '驳回') {
          this.postFrom.status = '重新派单'
        }

        this.postFrom.status = '修改'

        this.Stitle = '修改操作'

        this.dialogVisible = !this.dialogVisible
      },
      handleClose() {
        this.dialogVisible = false
        this.addVisible = false
        this.fetchList()
      },
      handleSend(row, status) {
        this.postFrom = row

        if (row.city_code !== null) {
          if (row.city_code.constructor === String) {
            this.postFrom.city_code = this.postFrom.city_code.split(',')
          }
        }
        if (row.city_code.constructor === String) {
          this.postFrom.city_code = this.postFrom.city_code.split(',')
        }

        if (row.buy_product_id.constructor === String) {
          let arr = []
          let temp = this.postFrom.buy_product_id.split(',')
          for (let i = 0; i < temp.length; i++) {
            arr.push(parseInt(temp[i]))
          }
          this.postFrom.buy_product_id = arr
        }

        if (row.car_model.constructor === String) {
          this.postFrom.car_model = this.postFrom.car_model.split(',')
        }

        console.log(row.lazada_list)
        if (row.lazada_list.constructor === String) {
          this.postFrom.lazada_list = this.postFrom.lazada_list.split(',')
        }
        let lazada = this.postFrom.lazada_list
        this.postFrom.lazada_list = []

        for (let i = 0; i < lazada.length; i++) {
          this.postFrom.lazada_list.push(parseInt(lazada[i]))
        }

        this.dialogVisible = !this.dialogVisible
        this.Stitle = this.postFrom.id + ' '
        if (status === 2) {
          this.Stitle = this.Stitle + '同意派单操作'
        }
        if (status === 3) {
          this.Stitle = this.Stitle + '同意接单操作'
        }
        if (status === 4) {
          this.Stitle = this.Stitle + '完成安装操作'
        }
        if (status === 5) {
          this.Stitle = this.Stitle + '确认完成操作'
        }
        if (status === 6) {
          this.Stitle = this.Stitle + '财审1审核通过操作'
        }
        if (status === 7) {
          this.Stitle = this.Stitle + '财审审核通过操作'
        }
        if (status === 8) {
          this.Stitle = this.Stitle + '-' + '结算操作'
        }
        this.is_disabled = true
      },
      updateRow() {
        this.postFrom.city_code = this.postFrom.city_code.join(',')
        this.postFrom.car_model = this.postFrom.car_model.join(',')
        PostDataByAdd(this.postFrom).then(res => {
          this.postFrom = Object.assign({}, defaultForm)
          this.dialogVisible = !this.dialogVisible
        })
      },
      handleDelete(index, id) {
        const _this = this
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            _this.$set(_this.list[index], 'delete', true)

            var temp = {
              tocontent: this.userinfo.realName + '删除订单',
              id
            }

            del(temp)
              .then(response => {
                if (response.status === 1) {
                  _this.list.splice(index, 1)
                  _this.total = _this.total - 1
                  _this.$notify.success(response.msg)
                  this.fetchList()
                } else {
                  _this.$notify.error(response.msg)
                }
                this.$message.success('删除成功')
                _this.$set(_this.list[index], 'delete', false)
              })
              .catch(error => {
                _this.$set(_this.list[index], 'delete', false)
              })
          })
          .catch(() => {
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
          })
            .then(() => {
              _this.deleting = true
              const ids = getArrByKey(_this.selectedRows, 'id')
              const idstr = ids.join(',')
              delAll({ ids: idstr })
                .then(response => {
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
                })
                .catch(error => {
                  _this.deleting = false
                })
            })
            .catch(() => {
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
          changeAll({ val: idstr, field: 'status', value: command })
            .then(response => {
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
            })
            .catch(error => {
            })
        } else {
          _this.$message.error('请选择要操作的数据')
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
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

  .return {
    .el-form-item--medium {
      margin-bottom: 0px !important;
    }
  }

  .eva {
    .el-row {
      display: flex;
      flex-direction: row;
      line-height: 1.5;
      margin-bottom: 5px;
      .spna {
        font-weight: 400;
        margin-right: 10px;
        font-size: 14px;
      }
      .eva-conent {
        width: 100%;
        min-height: 50px;
        border-radius: 5px;
        padding: 5px;
        font-size: 12px;
        color: #000;
        border: 1px solid #dcdfe6;
      }
      .rate-img {
        display: flex;
        align-items: center;
        .img-item {
          width: 16%;
          img {
            width: 60px;
            height: 60px;
            border-radius: 4px;
          }
        }
      }
    }
  }

  .tish {
    color: red;
    font-size: 12px;
  }

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
      margin-bottom: 10px;
      padding-left: 15px;
      padding-right: 15px;
      .table-title {
        background: #eaf3ff;
        padding: 8px 16px 8px 16px;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;

        display: flex;
        flex-direction: row;
        align-items: center;
        /deep/ .el-checkbox__label {
          display: none;
        }
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
        border-right: 1px solid #f2f2f6;
        border-left: 1px solid #f2f2f6;
        display: flex;
        flex-direction: row;
        padding: 0 0 0 40px;
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
              width: 14%;
              color: #606266;
            }
            div {
              display: flex;
              flex-direction: row;
              width: 80%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
      .table-bottom {
        background: #f2f2f6;
        border-top-right-radius: 0px;
        border-top-left-radius: 0px;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        .list-item {
          width: 15%;
          display: flex;
          span {
            color: #606266;
          }
        }
        .a-link {
          width: 80%;
        }
        .shop-item {
          width: 25%;
        }
        .order-btn {
          width: 25%;
          text-align: center;
          display: flex;
          justify-content: center;
          .is-plain {
            padding-top: 3px;
            padding-bottom: 3px;
            font-size: 12px;

            /*span {*/
            /*color: #FFBA00;*/
            /*}*/
          }
          is-plain:hover {
            background: #fff83c !important;
          }
        }
        .che {
          width: 3%;
        }
      }
    }
  }

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
    .el-dialog {
      margin-top: 5vh !important;
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
