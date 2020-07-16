<template>
  <div class="w-dia">
    <div class="dia-content">
      <div class="c-data">
        <div class="c-title">车主信息</div>
        <div class="c-content">
          <div class="ct-item">
            <span class="label">客户OpenID</span>
            <div class="c-input">
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.openid" placeholder="尚未填写"></el-input>
            </div>
          </div>

          <div class="ct-item">
            <span class="label">购买账号</span>
            <div class="c-input">
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.buy_account"
                        placeholder="尚未填写"></el-input>
            </div>
          </div>


          <div class="ct-item">
            <span class="label"> 购买平台</span>
            <div class="c-input">

              <el-cascader size="mini" :options="lazada"
                           filterable
                           clearable
                           :disabled="is_disabled"
                           v-model="postFrom.lazada_list"
                           change-on-select></el-cascader>
            </div>
          </div>


          <div class="ct-item">
            <span class="label">购买产品</span>
            <div class="c-input">
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.product_titile"
                        placeholder="尚未填写"></el-input>
            </div>
          </div>

          <div class="ct-item">
            <span class="label">订单金额</span>
            <div class="c-input">
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.no_price"
                        placeholder="尚未填写"></el-input>
            </div>
          </div>
          <div class="ct-item">
            <span class="label">联系人</span>
            <div class="c-input">
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.contact" placeholder="尚未填写"></el-input>
            </div>
          </div>
          <div class="ct-item">
            <span class="label">联系电话</span>
            <div class="c-input">
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.tel" placeholder="尚未填写"></el-input>
            </div>
          </div>
          <div class="ct-item">
            <span class="label">地址</span>
            <div class="c-input">
              <el-cascader
                style="width: 100%;"
                size="mini"
                :disabled="is_disabled"
                :options="cityoptions"
                v-model="postFrom.city_code"
              >
              </el-cascader>

              <!--<el-input size="mini" v-model="postFrom.openid" placeholder="请输入内容"></el-input>-->
            </div>
          </div>
          <div class="ct-item">
            <span class="label">详细地址</span>
            <div class="c-input">
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.city_desc"
                        placeholder="尚未填写"></el-input>
            </div>
          </div>
          <div class="ct-item">
            <span class="label">车牌号</span>
            <div class="c-input">
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.number_plate"
                        placeholder="尚未填写"></el-input>
            </div>
          </div>
          <div class="ct-item">
            <span class="label">车型</span>
            <div class="c-input">
              <el-cascader placeholder="未选择" size="mini"
                           filterable
                           clearable
                           :props="props"
                           :disabled="is_disabled"
                           v-model="postFrom.car_model"
                           change-on-select></el-cascader>
            </div>
          </div>
          <div class="ct-item">
            <span class="label">备注</span>
            <div class="c-input">
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.desc" placeholder="尚未填写"></el-input>
            </div>
          </div>
          <div class="ct-item">
            <span class="label">提交时间</span>
            <div class="c-input">
              <el-input size="mini" disabled v-model="postFrom.create_time" placeholder="尚未填写"></el-input>
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
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.buy_order_no"
                        placeholder="尚未填写"></el-input>
            </div>
          </div>

          <div class="ct-item">
            <span class="label">门店名称</span>
            <div class="c-input">

              <el-select size="mini" :disabled="is_disabled" @change="handleShop" v-model="postFrom.shop_id"
                         filterable placeholder="请选择">
                <el-option
                  v-for="item in shop"
                  :label="item.shopname"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>


          <div class="ct-item">
            <span class="label">门店地址</span>
            <div class="c-input">
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.shop_location"
                        placeholder="尚未填写"></el-input>
            </div>
          </div>


          <div class="ct-item">
            <span class="label">门店电话</span>
            <div class="c-input">
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.shop_tel"
                        placeholder="尚未填写"></el-input>
            </div>
          </div>

          <div class="ct-item">
            <span class="label">建档名</span>
            <div class="c-input">
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.buildarc"
                        placeholder="尚未填写"></el-input>
            </div>
          </div>

          <div class="ct-item">
            <span class="label">结算方式</span>
            <div class="c-input">
              <el-select
                      size="mini"
                      clearable
                      disabled
                      v-model="postFrom.to_hang"
                      filterable
                      placeholder="请选择"
              >
                <el-option
                        v-for="item in hang"
                        :label="item.lable"
                        :value="item.value"

                ></el-option>
              </el-select>
            </div>
          </div>


          <div class="ct-item">
            <span class="label">主业务员</span>
            <div class="c-input">
              <el-select size="mini" :disabled="is_disabled" v-model="postFrom.salesman_id" filterable
                         placeholder="尚未选择">
                <el-option
                  v-for="item in salesman"
                  :label="item.realName"
                  :value="item.id"
                  :disabled="postFrom.in_salesman_id===item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="ct-item">
            <span class="label">次业务员</span>
            <div class="c-input">
              <el-select size="mini" :disabled="is_disabled" v-model="postFrom.in_salesman_id" filterable
                         placeholder="尚未选择">
                <el-option
                  v-for="item in salesman"
                  :label="item.realName"
                  :value="item.id"
                  :disabled="postFrom.salesman_id===item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="ct-item">
            <span class="label">安装费用</span>
            <div class="c-input">
              <el-input :disabled="is_disabled" size="mini" v-model="postFrom.ins_cost"
                        placeholder="尚未填写"></el-input>
            </div>
          </div>
          <div class="ct-item">
            <span class="label">客服</span>
            <div class="c-input">
              <!--{{postFrom}}-->
              <el-input size="mini" :disabled="is_disabled" v-if="postFrom.pre"  v-model="postFrom.pre.realName" placeholder="尚未填写"></el-input>
              <el-input size="mini" :disabled="is_disabled" v-else placeholder="尚未填写"></el-input>
            </div>
          </div>
          <div class="ct-item">
            <span class="label">客服备注</span>
            <div class="c-input">
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.service_desc"
                        placeholder="尚未填写"></el-input>
            </div>

          </div>
          <div class="ct-item">
            <span class="label">派单时间</span>
            <div class="c-input">
              <el-input size="mini" disabled :value="postFrom.send_time |parseTime('{y}-{m}-{d} {h}:{i}:{s}')"
                        placeholder="尚未填写"></el-input>
            </div>
          </div>

          <div class="ct-item">
            <span class="label">核销码</span>
            <div class="c-input">
              <el-input size="mini" disabled v-model="postFrom.verification_code" placeholder="尚未填写"></el-input>
            </div>
          </div>

          <div class="ct-item">
            <span class="label">订单状态</span>
            <div class="c-input">
              <el-input class="is_link" size="mini" disabled :value="postFrom.status" placeholder="尚未填写">

              </el-input>
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
              <el-select size="mini" :disabled="is_disabled" v-model="postFrom.holder" filterable placeholder="尚未选择">
                <el-option
                  v-for="item in holder"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="ct-item">
            <span class="label">易改件</span>
            <div class="c-input">
              <el-select size="mini" :disabled="is_disabled" v-model="postFrom.ygj" filterable placeholder="尚未选择">
                <el-option
                  v-for="item in ygj"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>


          <div class="ct-item">
            <span class="label">装饰罩</span>
            <div class="c-input">
              <el-select size="mini" :disabled="is_disabled" v-model="postFrom.decorate" filterable placeholder="尚未选择">
                <el-option
                  v-for="item in ygj"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>


          <div class="ct-item">
            <span class="label">解码</span>
            <div class="d_code">
              <el-select size="mini" :disabled="is_disabled" v-model="postFrom.is_code" filterable placeholder="请选择">
                <el-option
                  v-for="item in holder"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input size="mini" :disabled="is_disabled" v-if="postFrom.is_code!=='无'" v-model="postFrom.code"
                        placeholder="尚未填写"></el-input>
            </div>
          </div>


          <div class="ct-item">
            <span class="label">近光转接线</span>
            <div class="c-input">
              <el-select size="mini" :disabled="is_disabled" v-model="postFrom.low_beam" filterable placeholder="请选择">
                <el-option
                  v-for="item in ygj"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="ct-item">
            <span class="label">远光转接线</span>
            <div class="c-input">
              <el-select size="mini" :disabled="is_disabled" v-model="postFrom.in_the" filterable placeholder="请选择">
                <el-option
                  v-for="item in ygj"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>


        </div>
      </div>
      <!--配货方案-->

      <div class="c-data">
        <div class="c-title">配货方案</div>
        <div class="c-content">
          <div class="ct-item">
            <span class="label">支架</span>
            <div>
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.holder_text"
                        placeholder="尚未填写"></el-input>
            </div>
          </div>

          <div class="ct-item">
            <span class="label">易改件</span>
            <div>
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.ygj_text" placeholder="尚未填写"></el-input>
            </div>
          </div>


          <div class="ct-item">
            <span class="label">装饰罩</span>
            <div>
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.decorate_text"
                        placeholder="尚未填写"></el-input>
            </div>
          </div>


          <div class="ct-item">
            <span class="label">解码</span>
            <div>
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.code_text" placeholder="尚未填写"></el-input>
            </div>
          </div>


          <div class="ct-item">
            <span class="label">近光转接线</span>
            <div class="c-input">
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.in_the_text"
                        placeholder="请输入内容"></el-input>
            </div>
          </div>


          <div class="ct-item">
            <span class="label">远光转接线</span>
            <div class="c-input">
              <el-input size="mini" :disabled="is_disabled" v-model="postFrom.low_beam_text"
                        placeholder="请输入内容"></el-input>
            </div>
          </div>

        </div>
      </div>


      <!--安装凭证-->
      <div class="c-data" v-if="postFrom.credentials">
        <div class="c-title">安装凭证</div>
        <div class="c-content" v-if="postFrom.credentials">
          <img class="credentials-img" :src="postFrom.credentials" @click="handleImg(postFrom.credentials)"/>

        </div>
      </div>
      <div class="eva" v-if="postFrom.eva">
        <div class=" eva-title">用户评价</div>
        <div class="rate-score">
          <div class="product">
            <div class="item-label">产品:</div>
            <div class="item-rate">
              <el-rate disabled :colors="['#FF0000', '#FF0000', '#FF0000']" v-model="postFrom.eva.product"></el-rate>
            </div>
          </div>

          <div class="product">
            <div class="item-label">客服:</div>
            <div class="item-rate">
              <el-rate disabled :colors="['#FF0000', '#FF0000', '#FF0000']" v-model="postFrom.eva.service"></el-rate>
            </div>

          </div>

          <div class="product" >
            <div class="item-label">门店:</div>
            <div class="item-rate">
              <el-rate disabled :colors="['#FF0000', '#FF0000', '#FF0000']" v-model="postFrom.eva.shop"></el-rate>
            </div>

          </div>
        </div>
        <div class="ev-content"><span>评论:</span>{{postFrom.eva.content}}</div>

        <div class="rate-img">
          <div class="img-item" v-for="(pic,idx) of img" :key="idx">
            <img :src="pic" alt="" @click="handleImg(pic)">
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  // import { CarBrand } from '@/api/tools'
  import { getBrand, getSeries ,getModel} from '@/api/tools'

  import { GetSaleByAll } from '@/api/salesman'
  import { Citylist } from '@/api/city'
  import { mapGetters } from 'vuex'
  import { GetDataByShopAll } from '@/api/shop'

  import { change, changeAll, del, delAll, GetDataByList, PostDataByAdd } from '@/api/order'

  import { GetecshopByList } from '@/api/ecshop'
  import { getArrByKey, parseTime, pickerOptions } from '@/utils'
  import openWindow from '@/utils/openWindow'

  const defaultForm = {
    logcontent: '',
    openid: 'oQJN40ldFZYLvqoIZm3NGwFu8oKA',
    lazada_id: '',
    lazada_list: '',
    lazada_index: '',
    buy_order_no: '12123',
    buy_account: '199',
    buy_product_id: '',
    no_price: '199',
    contact: '梁泽祥',
    tel: '18677947067',
    city_code: undefined,
    city_desc: '',
    number_plate: 'A871237',
    car_model: undefined,
    car_index: '',
    car_model_id: ''
  }

  export default {
    name: 'sendOrder',
    data() {
      return {
        hang:[
          {
            lable:'加余额',
            value:0
          },  {
            lable:'挂帐',
            value:1
          }
        ],
        img:[],
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }

        value2:5,
        shopQuery: {
          cityCode: undefined,
          shopname: undefined,
          tel: undefined
        },
        innerVisible: false,
        // dialogVisible: false,
        checked: true,
        tableKey: 0,
        CarModellist: [],//车型数据
        lazada: [],//所有平台
        salesman: [],//所有业务员
        holder: [
          {
            label: '有',
            value: 1
          },
          {
            label: '无',
            value: 2
          }
        ],//支架
        ygj: [
          {
            label: '有',
            value: 1
          },
          {
            label: '随机发',
            value: 2
          },
          {
            label: '供应商代发',
            value: 3
          }
        ],//易改件
        device: [],//装置罩
        carl: [],
        list: null,
        total: null,
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
                  nodes.push({ label: data[i].factory_name+' '+data[i].series_name, value: data[i].series_id })
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
                  nodes.push({ label: data[i].label, value: data[i].value ,leaf: level >= 2})
                }
                resolve(nodes)

              })

              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            }
            if(level===3){
              let nodes=[];
              resolve(nodes)
            }
          }
        },

        // postFrom: Object.assign({}, defaultForm),
        cityoptions: [],//地址
        selectedRows: null,
        listLoading: true,
        showSearch: false,
        options: [],
        shop: [],
        listQuery: {
          page: 1,
          limit: 10,
          status: '-1',
          title: ''
        },
        buttonDisabled: true,
        deleting: false,
        pickerOptions: pickerOptions,
        currentIndex: -1,

        regionHiera: []
      }
    },
    computed: {
      ...mapGetters([
        'userinfo',
        'brand'
      ])
    },
    props: {
      postFrom: {
        type: Object,
        default: function() {
          return Object.assign({}, defaultForm)
        }
      },
      Stitle: {
        type: String,
        default: ''
      },
      is_disabled: {
        type: Boolean,
        default: true

      },
      dialogVisible: {
        type: Boolean,
        default: false
      }

    },
    created() {
      Citylist().then(res=>{
        this.cityoptions=res.data
        console.log(this.cityoptions)
      })
      if(this.postFrom.eva){

        if (this.postFrom.eva.img.constructor === String) {
          this.img = this.postFrom.eva.img.split(',')
        }else{
          this.img = this.postFrom.eva.img
        }
      }


      GetecshopByList().then(res => {
        this.lazada = res.data
      })
      GetDataByShopAll().then(res => {
        this.shop = res.data
      })

      GetSaleByAll().then(res => {
        this.salesman = res.data
      })

      console.log(this.postFrom.city_code)
      let city_code=this.postFrom.city_code;
      console.log(city_code)
      for(let i=0;i<city_code.length;i++){
        city_code[i]=parseInt( city_code[i]);
      }
      this.postFrom.city_code=city_code

    },
    methods: {



      handleImg(img) {
        openWindow(img, '图片预览', '500', '400')
      },
      //所选门店
      handleShop(e) {

        this.postFrom.shop_id = e
        for (let i = 0; i < this.shop.length; i++) {
          if (e === this.shop[i].id) {
            this.postFrom.shop_location = this.shop[i].cityName + ' ' + this.shop[i].location
            this.postFrom.shop_tel = this.shop[i].tel
            return
          }
        }
      },
      handleClose() {
        this.$emit('handleClose')

      },
      updateRow() {
        this.postFrom.city_code = this.postFrom.city_code.join(',')
        this.postFrom.car_model = this.postFrom.car_model.join(',')
        if (this.postFrom.status === '待处理') {
          this.postFrom.status = 1
          this.postFrom.logcontent = '待确认(业务员)' + ' ' + this.userinfo.realName + '派单 ' + ' ' + '已通知'

        }
        if (this.postFrom.status === '待确认(业务)') {
          this.postFrom.status = 2
          this.postFrom.logcontent = '待确认(门店)' + ' ' + this.userinfo.realName + '同意派单,'
        }

        if (this.postFrom.status === '待确认(门店)') {
          this.postFrom.status = 3
          this.postFrom.logcontent = '待安装' + ' ' + this.userinfo.realName + '已接单,'
        }
        if (this.postFrom.status === '待安装') {
          this.postFrom.status = 4

          this.postFrom.logcontent = '已安装' + ' ' + this.userinfo.realName + '安装完成,'

        }
        if (this.postFrom.status === '已安装') {
          this.postFrom.status = 5
          this.postFrom.logcontent = '财审1' + ' ' + this.userinfo.realName + '确认安装,'

        }
        if (this.postFrom.status === '财审1') {
          this.postFrom.status = 6
          this.postFrom.logcontent = '财审2' + ' ' + this.userinfo.realName + '审核通过,'

        }
        if (this.postFrom.status === '财审2') {
          this.postFrom.status = 7
          this.postFrom.logcontent = '待结算' + ' ' + this.userinfo.realName + '结算通过,'

        }

        PostDataByAdd(this.postFrom).then(res => {
          this.$emit('handleClose')
          this.postFrom = Object.assign({}, defaultForm)
          this.postFrom.city_code = this.postFrom.city_code.splice(',')
          this.postFrom.car_model = this.postFrom.car_model.splice(',')
        })
      }
    }
  }
</script>

<style lang="scss">
.eva{
  width: 100%;
  .eva-title{
    font-weight: 800;
    margin-bottom: 10px;
  }
  .rate-score{
    display: flex;
    flex-direction: row;
    .product{
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 12px;
      line-height: 1.5;
      font-weight: 500;
     .item-label{
       margin-right: 5px;
     }
    }
  }
  .ev-content{
    font-weight: 800;
    line-height: 1.5;
    margin-top: 10px;
    margin-bottom: 10px;
    span{
      font-weight: 800;
      margin-right: 10px;
    }
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
  .w-dia {
    .el-dialog__body {
      padding: 1px 20px;
      padding-left: 35px;
    }
    .el-dialog__title {
      font-size: 14px;
    }
  }

  .dia-content {
    display: flex;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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

        .d_code {
          display: flex;
          flex-direction: row;
          width: 60%;
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

  .n-post {
    .el-dialog__body {
      padding: 10px 10px;
      .el-form-item__label {
        font-weight: 400;
        font-size: 12px;
      }
    }

  }

  .is_link {
    .el-input__inner {
      color: #4646ff !important;
    }
  }

</style>


<style lang="scss" scoped>

  .w-dia {
    .el-dialog__body {
      padding: 1px 20px;
      padding-left: 35px;
    }
    .el-dialog__title {
      font-size: 14px;
    }
  }

  .dia-content {
    display: flex;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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
    .el-dialog__body {
      padding: 10px 10px;
      .el-form-item__label {
        font-weight: 400;
        font-size: 12px;
      }
    }

  }

  .credentials-img {
    width: 150px;
    height: 100px;
    border-radius: 5px;
  }

</style>
