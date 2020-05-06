<template>
  <div>
    <el-dialog
      :title="Stitle"
      :visible.sync="dialogVisible"
      width="50%"
      class="w-dia"
      :before-close="handleClose"
    >
      <div class="n-post bc">
        <el-dialog
          width="60%"
          title="安装门店选择"
          :visible.sync="innerVisible"
          append-to-body
          class="n-post"
        >
          <el-form :model="shopQuery" class="form-container" label-width="50px">
            <el-row class="nc">
              <el-col :span="5">
                <el-form-item
                  size="mini"
                  label="地址:"
                  class="postInfo-container-item"
                >
                  <el-cascader
                    size="mini"
                    clearable
                    :options="cityoptions"
                    v-model="shopQuery.cityCode"
                    ref="elcascader"
                    @visible-change="elCascaderOnlick"
                    @expand-change="elCascaderOnlick"
                    change-on-select
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  size="mini"
                  label="门店:"
                  class="postInfo-container-item"
                >
                  <el-input
                    size="mini"
                    @keyup.enter.native="shopList()"
                    v-model="shopQuery.shopname"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item size="mini" label="店主:" class="postInfo-container-item">
                  <el-input size="mini" v-model="shopQuery.shopkeeper" placeholder="请输入内容"></el-input>

                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  size="mini"
                  label="电话:"
                  class="postInfo-container-item"
                >
                  <el-input
                    size="mini "
                    @keyup.enter.native="shopList()"
                    v-model="shopQuery.tel"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="margin-left: 20px">
                <el-button type="primary" @click="shopList" size="mini"
                  >搜索</el-button
                >
              </el-col>
            </el-row>
            <div style="height: 450px;    overflow-y: scroll;padding: 10px">
              <ShList :list="shoplist" is_order="是" @handelToshop="handelToshop"></ShList>
            </div>
            <div class="pagination-container" style="margin-top: 0px">
              <el-pagination
                v-show="shoptotal > 0"
                :current-page="shopQuery.page"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="shopQuery.limit"
                :total="shoptotal"
                background
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-form>
        </el-dialog>
      </div>

      <el-form
        :model="postFrom"
        :rules="rules"
        ref="postFrom"
        label-width="150px"
        size="small"
      >
        <div class="dia-content">
          <div class="c-data">
            <div class="c-title">车主信息</div>
            <div class="c-content">
              <div class="ct-item">
                <span class="label">客户OpenID</span>
                <div class="c-input">
                  <el-form-item prop="openid">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.openid"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">购买账号</span>
                <div class="c-input">
                  <el-form-item prop="buy_account">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.buy_account"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">购买平台</span>
                <div class="c-input">
                  <el-form-item prop="lazada_list">
                    <el-cascader
                      size="mini"
                      :options="lazada"
                      filterable
                      clearable
                      :disabled="is_disabled"
                      v-model="postFrom.lazada_list"
                    ></el-cascader>
                  </el-form-item>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">购买产品</span>
                <div class="c-input">
                  <el-form-item prop="buy_product_id">
                    <el-cascader
                      size="mini"
                      :options="productTree"
                      filterable
                      clearable
                      :disabled="is_disabled"
                      v-model="postFrom.buy_product_id"
                    ></el-cascader>
                  </el-form-item>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">订单金额</span>
                <div class="c-input">
                  <el-form-item prop="no_price">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.no_price"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">联系人</span>
                <div class="c-input">
                  <el-form-item prop="contact">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.contact"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">联系电话</span>
                <div class="c-input">
                  <el-form-item prop="tel">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.tel"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">地址</span>
                <div class="c-input">
                  <el-form-item prop="city_code">
                    <el-cascader
                      style="width: 100%;"
                      size="mini"
                      :disabled="is_disabled"
                      :options="cityoptions"
                      v-model="postFrom.city_code"
                    ></el-cascader>
                  </el-form-item>

                  <!--<el-input size="mini" v-model="postFrom.openid" placeholder="请输入内容"></el-input>-->
                </div>
              </div>
              <div class="ct-item">
                <span class="label">详细地址</span>
                <div class="c-input">
                  <el-form-item prop="city_desc">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.city_desc"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">车牌号</span>
                <div class="c-input">
                  <el-form-item prop="number_plate">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.number_plate"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">车型</span>
                <div class="c-input">
                  <el-form-item prop="car_model">
                    <el-cascader
                      size="mini"
                      :props="props"
                      filterable
                      clearable
                      :disabled="is_disabled"
                      v-model="postFrom.car_model"
                    ></el-cascader>
                  </el-form-item>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">备注</span>
                <div class="c-input">
                  <el-input
                    v-if="postFrom.status === '修改'"
                    size="mini"
                    v-model="postFrom.desc"
                    placeholder="请输入内容"
                  ></el-input>
                  <el-input
                    v-else
                    size="mini"
                    disabled
                    v-model="postFrom.desc"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">提交时间</span>
                <div class="c-input">
                  <el-input
                    size="mini"
                    disabled
                    v-model="postFrom.create_time"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="c-data">
            <div class="c-title">派单信息</div>
            <div class="c-content">
              <div class="ct-item">
                <span class="label">购买单号</span>
                <div class="c-input">
                  <el-form-item prop="buy_order_no">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.buy_order_no"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div
                class="ct-item nc"
                v-if="postFrom.shop_id === null && postFrom.is_rejected === 1"
              >
                <span class="label">旧门店</span>
                <div class="c-input">
                  <el-form-item prop="shop_id">
                    <el-select
                      size="mini"
                      disabled
                      @focus="handelInn"
                      v-model="postFrom.last_shop"
                      filterable
                      placeholder="请选择"
                    ></el-select>
                  </el-form-item>
                </div>
              </div>

              <div class="ct-item nc" v-if="!innerVisible">
                <span class="label">门店名称</span>
                <div class="c-input">
                  <el-form-item prop="shop_id">
                    <el-select
                      size="mini"
                      :disabled="is_disabled"
                      @focus="handelInn"
                      v-model="postFrom.shop_id"
                      filterable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in shop"
                        :label="item.shopname"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">门店地址</span>
                <div class="c-input">
                  <el-form-item prop="shop_location">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.shop_location"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">门店电话</span>
                <div class="c-input">
                  <el-form-item prop="shop_tel">
                    <el-input
                      size="mini"
                      :disabled="is_disabled"
                      v-model="postFrom.shop_tel"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">建档名</span>
                <div class="c-input">
                  <el-form-item>
                    <el-input
                      size="mini"
                      disabled
                      v-model="postFrom.buildarc"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div
                class="ct-item nc"
                v-if="
                  postFrom.salesman_id === null &&
                    postFrom.is_rejected === 1 &&
                    !postFrom.is_sale
                "
              >
                <span class="label">旧业务员</span>
                <div class="c-input">
                  <el-form-item prop="shop_id">
                    <el-select
                      size="mini"
                      disabled
                      v-model="postFrom.last_salesman"
                      filterable
                      placeholder="请选择"
                    ></el-select>
                  </el-form-item>
                </div>
              </div>

              <div class="ct-item" v-if="!postFrom.is_sale">
                <span class="label">主业务员</span>
                <div class="c-input">
                  <el-select
                    size="mini"
                    clearable
                    :disabled="is_disabled"
                    v-model="postFrom.salesman_id"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in salesman"
                      :label="item.realName"
                      :value="item.id"
                      :disabled="postFrom.in_salesman_id === item.id"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="ct-item" v-if="!postFrom.is_sale">
                <span class="label">次业务员</span>
                <div class="c-input">
                  <el-select
                    size="mini"
                    clearable
                    :disabled="is_disabled"
                    v-model="postFrom.in_salesman_id"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in salesman"
                      :label="item.realName"
                      :value="item.id"
                      :disabled="postFrom.salesman_id === item.id"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">安装费用</span>
                <div class="c-input">
                  <el-form-item prop="ins_cost">
                    <el-input
                      :disabled="is_disabled"
                      size="mini"
                      v-model="postFrom.ins_cost"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">客服</span>
                <div class="c-input">
                  <div class="c-input">
                    <el-select
                      size="mini"
                      clearable
                      v-if="postFrom.status === '修改'"
                      v-model="postFrom.pre_sales"
                      filterable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in adminll"
                        :label="item.realName"
                        :value="item.id"
                      ></el-option>
                    </el-select>

                    <el-select
                      size="mini"
                      clearable
                      v-else
                      v-model="postFrom.pre_sales"
                      filterable
                      disabled
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in adminll"
                        :label="item.realName"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">客服备注</span>
                <div class="c-input">
                  <el-input
                    size="mini"
                    :disabled="is_disabled"
                    v-model="postFrom.service_desc"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </div>

              <div class="ct-item" v-if="postFrom.status !== '待处理'">
                <span class="label">派单时间</span>
                <div class="c-input">
                  <el-input
                    size="mini"
                    disabled
                    :value="
                      postFrom.send_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')
                    "
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </div>

              <div
                class="ct-item"
                v-if="
                  postFrom.status === '已安装' ||
                    postFrom.status === '待安装' ||
                    postFrom.status === '已结算' ||
                    postFrom.status === '待结算' ||
                    postFrom.status === '财审1' ||
                    postFrom.status === '财审2'
                "
              >
                <span class="label">核销码</span>
                <div class="c-input">
                  <el-input
                    size="mini"
                    disabled
                    v-model="postFrom.verification_code"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
          <!--配件信息-->
          <div class="c-data">
            <div class="c-title">配件信息</div>
            <div class="c-content">
              <div class="ct-item">
                <span class="label">支架</span>
                <div class="c-input">
                  <el-select
                    size="mini"
                    :disabled="is_disabled"
                    v-model="postFrom.holder"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in ygj"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">易改件</span>
                <div class="c-input">
                  <el-select
                    size="mini"
                    :disabled="is_disabled"
                    v-model="postFrom.ygj"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in ygj"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>

              <div class="ct-item" v-if="postFrom.status !== '待安装'">
                <span class="label">装饰罩</span>
                <div class="c-input">
                  <el-select
                    size="mini"
                    :disabled="is_disabled"
                    v-model="postFrom.decorate"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in ygj"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="ct-item" v-if="postFrom.status !== '待安装'">
                <span class="label">解码</span>
                <div class="d_code">
                  <el-select
                    size="mini"
                    :disabled="is_disabled"
                    v-model="postFrom.is_code"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in holder"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-input
                    size="mini"
                    :disabled="is_disabled"
                    v-if="postFrom.is_code !== '无'"
                    v-model="postFrom.code"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">近光转接线</span>
                <div class="c-input">
                  <el-select
                    size="mini"
                    :disabled="is_disabled"
                    v-model="postFrom.low_beam"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in ygj"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">远光转接线</span>
                <div class="c-input">
                  <el-select
                    size="mini"
                    :disabled="is_disabled"
                    v-model="postFrom.in_the"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in ygj"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <div class="c-data" v-if="postFrom.status === '待安装'">
            <div class="c-title">&nbsp;</div>
            <div class="c-content">
              <div class="ct-item">
                <span class="label">装饰罩</span>
                <div class="c-input">
                  <el-select
                    size="mini"
                    :disabled="is_disabled"
                    v-model="postFrom.decorate"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in ygj"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="ct-item">
                <span class="label">解码</span>
                <div class="d_code">
                  <el-select
                    size="mini"
                    :disabled="is_disabled"
                    v-model="postFrom.is_code"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in holder"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-input
                    size="mini"
                    :disabled="is_disabled"
                    v-if="postFrom.is_code !== '无'"
                    v-model="postFrom.code"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">近光转接线</span>
                <div class="c-input">
                  <el-input
                    size="mini"
                    :disabled="is_disabled"
                    v-model="postFrom.low_beam_text"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">远光转接线</span>
                <div class="c-input">
                  <el-input
                    size="mini"
                    :disabled="is_disabled"
                    v-model="postFrom.in_the_text"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
          <!--配货方案-->

          <div
            class="c-data"
            v-if="
              postFrom.status === '重新派单' ||
                postFrom.status === '待处理' ||
                postFrom.status === '待确认(业务)' ||
                postFrom.status === ' 待确认(门店)' ||
                postFrom.status === '待确认(门店)' ||
                postFrom.status === ' 待安装' ||
                postFrom.status === 1 ||
                postFrom.status === 2 ||
                postFrom.status === 3 ||
                postFrom.status === 4 ||
                postFrom.status === 5
            "
          >
            <div class="c-title">配货方案</div>
            <div class="c-content">
              <div class="ct-item">
                <span class="label">支架</span>
                <div class="c-input">
                  <el-input
                    size="mini"
                    disabled
                    v-model="postFrom.holder_text"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </div>

              <div class="ct-item">
                <span class="label">易改件</span>
                <div class="c-input">
                  <el-input
                    size="mini"
                    disabled
                    v-model="postFrom.ygj_text"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </div>

              <div class="ct-item" v-if="postFrom.status !== '待安装'">
                <span class="label">装饰罩</span>
                <div class="c-input">
                  <el-input
                    size="mini"
                    disabled
                    v-model="postFrom.decorate_text"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </div>

              <div class="ct-item" v-if="postFrom.status !== '待安装'">
                <span class="label">解码</span>
                <div class="c-input">
                  <el-input
                    size="mini"
                    disabled
                    v-model="postFrom.code_text"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </div>
              <div class="ct-item" v-if="postFrom.status !== '待安装'">
                <span class="label">近光转接线</span>
                <div class="c-input">
                  <el-input
                    size="mini"
                    disabled
                    v-model="postFrom.low_beam_text"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </div>
              <div class="ct-item" v-if="postFrom.status !== '待安装'">
                <span class="label">远光转接线</span>
                <div class="c-input">
                  <el-input
                    size="mini"
                    disabled
                    v-model="postFrom.in_the_text"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
          <!--安装凭证-->
          <div
            class="c-data"
            v-else
            v-if="
              postFrom.status === '已安装' ||
                postFrom.status === '财审1' ||
                postFrom.status === '财审2' ||
                postFrom.status === '待结算'
            "
          >
            <div class="c-title">安装凭证</div>
            <div class="c-content" v-if="postFrom.credentials">
              <img class="credentials-img" @click="handleImg(postFrom.credentials)" :src="postFrom.credentials" />
            </div>
            <div
              v-else
              style="width: 120px;display: flex;flex-direction: row;align-items: center;justify-content: center; height: 80px;border: 1px solid #9999;border-radius: 5px"
            >
              暂无
            </div>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '新增'"
          @click="updateRow"
          >确认添加</el-button
        >
        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '修改'"
          @click="updateRow"
          >修改</el-button
        >
        <template
          v-if="postFrom.status === '待处理' || postFrom.status === '重新派单'"
        >
          <el-checkbox @change="handelSale" v-model="postFrom.is_sale"
            >跳过业务员</el-checkbox
          >

          <el-button type="primary" size="mini" @click="updateRow"
            >派单</el-button
          >
        </template>

        <!--<el-button type="primary" size="mini" v-if="postFrom.status==='重新派单'"-->
        <!--@click="updateRow">派单</el-button>-->

        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '待确认(业务)'"
          @click="updateRow"
          >同意派单</el-button
        >
        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '待确认(门店)'"
          @click="updateRow"
          >接单</el-button
        >

        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '待安装'"
          @click="updateRow"
          >完成安装</el-button
        >

        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '已安装'"
          @click="updateRow"
          >确认安装</el-button
        >
        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '财审1'"
          @click="updateRow"
          >审核通过</el-button
        >
        <el-button
          type="primary"
          size="mini"
          v-if="postFrom.status === '财审2'"
          @click="updateRow"
          >审核通过</el-button
        >

        <el-button
          type="primary"
          size="mini"
          v-if="
            postFrom.status === '待结算' && postFrom.to_hang === parseInt(0)
          "
          @click="updateRow(1)"
          >加余额</el-button
        >
        <el-button
          type="primary"
          size="mini"
          v-if="
            postFrom.status === '待结算' && postFrom.to_hang === parseInt(1)
          "
          @click="updateRow(2)"
          >挂帐</el-button
        >

        <el-button size="mini" @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { CarBrand } from "@/api/tools";

import { getBrand, getSeries, getModel } from "@/api/tools";

import { GetSaleByAll } from "@/api/salesman";
import { adminall } from "@/api/admin";

import ShList from "@/components/shop/index";

import { regionDataPlus } from "element-china-area-data";
import { mapGetters } from "vuex";
import { GetDataByList, GetDataByShopAll } from "@/api/shop";
import { Citylist } from "@/api/city";

import { change, changeAll, del, delAll, PostDataByAdd } from "@/api/order";

import { GetecshopByList } from "@/api/ecshop";
import { getArrByKey, pickerOptions } from "@/utils";
import { GetProductByTree } from "@/api/product";
import openWindow from '@/utils/openWindow'

const defaultForm = {
  logcontent: "",
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
  name: "sendOrder",
  data() {
    return {
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
        console.log(node)
          if (level === 0) {
            getBrand().then(res => {
              var data = res.data;

              let nodes = [];
              for (let i = 0; i < data.length; i++) {
                nodes.push({ label: data[i].name, value: data[i].brandid });
              }
              resolve(nodes);
            });

            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          }
          if (level === 1) {
            getSeries(node.data.value).then(res => {
              var data = res.data;
              let nodes = [];
              for (let i = 0; i < data.length; i++) {
                nodes.push({
                  label: data[i].factory_name + " " + data[i].series_name,
                  value: data[i].series_id
                });
              }
              resolve(nodes);
            });

            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          }

          if (level === 2) {
            getModel(node.data.value).then(res => {
              var data = res.data;
              let nodes = [];
              for (let i = 0; i < data.length; i++) {
                nodes.push({
                  label: data[i].label,
                  value: data[i].value,
                  leaf: level >= 2
                });
              }
              resolve(nodes);
            });

            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          }
          if (level === 3) {
            let nodes = [];
            resolve(nodes);
          }
        }
      },
      adminll: [],
      shopname: "",
      shopQuery: {
        cityCode: undefined,
        shopname: undefined,
        page: 1,
        limit: 10,
        tel: undefined
      },
      innerVisible: false,
      // dialogVisible: false,
      checked: true,
      tableKey: 0,
      CarModellist: [], //车型数据
      lazada: [], //所有平台
      salesman: [], //所有业务员
      holder: [
        {
          label: "无",
          value: "无"
        },
        {
          label: "解码器",
          value: "解码器"
        },
        {
          label: "解码线组",
          value: "解码线组"
        },
        {
          label: "宝典到店",
          value: "宝典到店"
        }
      ], //支架
      ygj: [
        {
          label: "无",
          value: "无"
        },
        {
          label: "随货发",
          value: "随货发"
        },
        {
          label: "供应商代发",
          value: "供应商代发"
        },
        {
          label: "支架",
          value: "支架"
        }
      ], //易改件
      device: [], //装置罩
      carl: [],
      list: null,
      total: null,

      // postFrom: Object.assign({}, defaultForm),
      cityoptions: [], //地址
      selectedRows: null,
      listLoading: true,
      showSearch: false,
      options: [],
      shop: [],
      shoplist: [],
      shoptotal: 0,
      listQuery: {
        page: 1,
        limit: 10,
        status: "-1",
        title: ""
      },
      buttonDisabled: true,
      deleting: false,
      pickerOptions: pickerOptions,
      currentIndex: -1,
      productTree: [],
      regionHiera: [],
      rules: {
        openid: [
          { required: true, trigger: "blur" }
          // {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        buy_account: [{ required: true, trigger: "blur" }],
        lazada_list: [{ required: true, trigger: "blur" }],
        buy_product_id: [{ required: true, trigger: "blur" }],
        no_price: [{ required: true, trigger: "blur" }],
        contact: [{ required: true, trigger: "blur" }],
        tel: [{ required: true, trigger: "blur" }],
        city_code: [{ required: true, trigger: "blur" }],
        city_desc: [{ required: true, trigger: "blur" }],
        number_plate: [{ required: true, trigger: "blur" }],
        car_model: [{ required: true, trigger: "blur" }],
        buy_order_no: [{ required: true, trigger: "blur" }],
        shop_id: [{ required: true, trigger: "blur" }],
        shop_tel: [{ required: true, trigger: "blur" }],
        ins_cost: [{ required: true, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["userinfo", "brand"])
  },
  components: {
    ShList
  },
  props: {
    postFrom: {
      type: Object,
      default: function() {
        return Object.assign({}, defaultForm);
      }
    },
    Stitle: {
      type: String,
      default: ""
    },
    is_disabled: {
      type: Boolean,
      default: false
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  created() {
    adminall().then(res => {
      this.adminll = res.data;
    });
    Citylist().then(res => {
      this.cityoptions = res.data;
    });
    this.shopList();

    GetProductByTree().then(res => {
      this.productTree = res.data;
    });
    GetecshopByList().then(res => {
      this.lazada = res.data;
    });

    GetSaleByAll().then(res => {
      this.salesman = res.data;
    });
    let city_code = this.postFrom.city_code;
    for (let i = 0; i < city_code.length; i++) {
      city_code[i] = parseInt(city_code[i]);
    }
    this.postFrom.city_code = city_code;
    if (this.postFrom.status === "待处理") {
      this.postFrom.pre_sales = this.userinfo.id;
    }
  },
  methods: {

    handleImg(img) {
      openWindow(img, '图片预览', '500', '400')
    },
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
    handelSale(e) {
      if (e) {
        this.postFrom.salesman_id = undefined;
      }
    },
    handleSizeChange(val) {
      this.shopQuery.limit = val;
      this.shopList();
    },

    handleStatusChange(val) {
      this.shopQuery.page = 1;

      this.shopList();
    },
    handleCurrentChange(val) {
      this.shopQuery.page = val;
      this.shopList();
    },
    shopList() {
      GetDataByList(this.shopQuery).then(response => {
        this.shoplist = response.data.data;
        this.shoptotal = response.data.total;
      });
    },
    handelToshop(row) {
      this.postFrom.shop_id = parseInt(row.id);
      var temp = {
        shop_id: row.id
      };
      GetDataByShopAll(temp).then(res => {
        this.shop = res.data;
      });
      this.postFrom.shop_location = row.cityName + " " + row.location;
      this.postFrom.shop_tel = row.tel;
      this.postFrom.buildarc = row.buildarc;
      this.postFrom.to_hang = row.to_hang;

      this.innerVisible = !this.innerVisible;
    },

    handelInn() {
      this.shop = [];
      this.innerVisible = !this.innerVisible;
      this.shopQuery.cityCode = this.postFrom.city_code;
    },
    //所选门店

    handleClose() {
      this.$emit("handleClose");
    },
    updateRow(type = 0) {
      this.$refs["postFrom"].validate(valid => {
        console.log(valid);
        if (!valid) {
          this.$message.error("请检查必填项");
          return true;
        }
      });
      var arr = this.postFrom;
      if (this.postFrom.car_model.length === 0) {
        this.$message.error("车型未选");
        return true;
      }


      if (this.postFrom.city_code.length === 0) {
        this.$message.error("地址未选");
        return true;
      }

      if (this.postFrom.lazada_list.length === 0) {
        this.$message.error("平台未选");
        return true;
      }

      if (this.postFrom.buy_product_id.length === 0) {
        this.$message.error("产品未选");
        return true;
      }

      if (this.postFrom.buy_product_id.length === 0) {
        this.$message.error("产品未选");
        return true;
      }
      if (!this.postFrom.is_sale) {
        if (
          this.postFrom.salesman_id === 0 ||
          this.postFrom.salesman_id.length === 0
        ) {
          this.$message.error("请先选择业务员");
          return true;
        }
      }
      this.postFrom.brand_id=this.postFrom.car_model[0]
      this.postFrom.series_id=this.postFrom.car_model[1]
      this.postFrom.model_id=this.postFrom.car_model[2]


      this.postFrom.suit_id=this.postFrom.buy_product_id[0]

      this.postFrom.product_id=this.postFrom.buy_product_id[1]


      this.postFrom.city_code = this.postFrom.city_code.join(",");
      this.postFrom.car_model = this.postFrom.car_model.join(",");
      this.postFrom.lazada_list = this.postFrom.lazada_list.join(",");
      this.postFrom.buy_product_id = this.postFrom.buy_product_id.join(",");
      if (this.postFrom.status === "待处理") {
        this.postFrom.status = 1;
        this.postFrom.pre_sales = this.userinfo.id;
        this.postFrom.logcontent =
          "待确认(业务员)" +
          " " +
          this.userinfo.realName +
          "派单 ," +
          " " +
          "已通知";
      }
      if (this.postFrom.status === "重新派单") {
        this.postFrom.status = 1;
        this.postFrom.logcontent =
          "待确认(业务员)" +
          " " +
          this.userinfo.realName +
          "派单, " +
          " " +
          "已通知";
      }
      if (this.postFrom.status === "待确认(业务)") {
        this.postFrom.status = 2;
        this.postFrom.logcontent =
          "待确认(门店)" + " " + this.userinfo.realName + "同意派单,";
      }

      if (this.postFrom.status === "待确认(门店)") {
        this.postFrom.status = 3;
        this.postFrom.logcontent =
          "待安装" + " " + this.userinfo.realName + "接单,";
      }
      if (this.postFrom.status === "待安装") {
        this.postFrom.status = 4;

        this.postFrom.logcontent =
          "已安装" + " " + this.userinfo.realName + "安装完成,";
      }
      if (this.postFrom.status === "已安装") {
        this.postFrom.status = 5;
        this.postFrom.after_sale = this.userinfo.id;
        this.postFrom.logcontent =
          "财审1" + " " + this.userinfo.realName + "确认安装,";
      }
      if (this.postFrom.status === "财审1") {
        this.postFrom.status = 6;
        this.postFrom.logcontent =
          "财审2" + " " + this.userinfo.realName + "审核通过,";
      }
      if (this.postFrom.status === "财审2") {
        this.postFrom.status = 7;
        this.postFrom.logcontent =
          "待结算" + " " + this.userinfo.realName + "结算通过,";
      }
      if (this.postFrom.status === "待结算") {
        this.postFrom.status = 8;
        this.postFrom.is_pay = type;
        if (type === 1) {
          this.postFrom.logcontent =
            "已结算" + " " + this.userinfo.realName + "加余额,";
        }
        if (type === 2) {
          this.postFrom.logcontent =
            "已结算" + " " + this.userinfo.realName + "抵欠款,";
        }
      }

      if (this.postFrom.status === "修改") {
        this.postFrom.is_di = 1;
        this.postFrom.logcontent = this.userinfo.realName + "进行了订单修改,";
      }

      if (this.postFrom.is_sale && this.postFrom.status === 1) {
        this.postFrom.status = 2;
        this.postFrom.logcontent =
          "待确认(门店)" + " " + this.userinfo.realName + "同意派单,";
      }

      PostDataByAdd(this.postFrom).then(res => {
        this.$emit("handleClose");

        this.postFrom = Object.assign({}, defaultForm);
        this.postFrom = arr;
        this.$message.success("操作完成");
      });
    }
  },
  mounted() {
    if (this.postFrom.is_sale === 1) {
      this.postFrom.is_sale = true;
    } else {
      this.postFrom.is_sale = false;
    }
    var temp = {
      shop_id: this.postFrom.shop_id
    };
    GetDataByShopAll(temp).then(res => {
      this.shop = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.bc {
}

.w-dia > .el-dialog__body {
  height: 400px;
  overflow: auto;
}

.w-dia {
  .el-dialog__body {
    padding: 1px 20px;
    padding-left: 35px;
    height: 400px;
    overflow: auto;
  }
  .el-dialog__title {
    font-size: 14px;
  }
}

.dia-content {
  display: flex;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 12px;
  flex-direction: row;
  flex-wrap: wrap;
  .c-data {
    width: 50%;
    margin-bottom: 30px;
    .c-title {
      font-weight: 800;
      margin-bottom: 10px;
    }
    .el-select--mini {
      width: 100%;
    }
    .el-cascader--mini {
      width: 100%;
      .el-input__suffix {
        right: -6px;
      }
    }
    .ct-item {
      display: flex;
      flex-direction: row;
      text-align-last: justify;
      align-items: center;
      margin-bottom: 3px;
      .c-input {
        width: 70%;
      }

      .d_code {
        display: flex;
        flex-direction: row;
        width: 69%;
        .el-select {
          width: 50%;
        }
      }
      .label {
        width: 23%;
        margin-right: 10px;
      }
    }
  }
}

.el-select-dropdown {
  /*z-index: 2099 !important;*/
}

.n-post {
  z-index: 9999;
  .pagination-container {
    border-top: 1px solid #e4e7ed;
  }
  .nc {
    border-bottom: 1px solid #e4e7ed;
    margin-bottom: 10px;
  }
  .el-form-item--mini.el-form-item {
    margin-bottom: 3px;
  }
  .table {
    margin-bottom: 10px;
  }
  .el-dialog__header {
    padding: 20px;
    padding-bottom: 5px;
    padding-top: 5px;
  }
  .el-dialog__body {
    padding: 10px 10px;
    .el-form-item__label {
      font-weight: 400;
      font-size: 12px;
    }
    .filed-span {
      height: 20px;
      line-height: 20px;
    }
  }
  .el-dialog {
    margin-top: 5vh !important;
  }
}

.credentials-img {
  width: 150px;
  height: 100px;
  border-radius: 5px;
}

.c-input > .el-form-item {
  margin-bottom: 0;
}

.c-input /deep/ .el-form-item__content {
  margin-left: 0px !important;
}
</style>
