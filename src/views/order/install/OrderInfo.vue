<template>

  <el-dialog
    :visible.sync="infodialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-dialog
      width="40%"
      :title="OrderInfo.status"
      :visible.sync="returninnerVisible"
      class="returnform"
      append-to-body>
      <el-form label-position="top" label-width="80px">
        <el-form-item label="请填写回访内容">
          <el-input type="textarea" row="5" v-model="content"></el-input>
        </el-form-item>

        <el-form-item label="上传图片">

          <Upload @handelFile="handelRuimg" :config="config" :value="img"></Upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
              <el-button type="primary" size="mini" @click="handelContent">添加</el-button>

    <el-button size="mini" @click="returninnerVisible=false">取消</el-button>
    </span>
    </el-dialog>
    <el-tabs v-model="activeName" @tab-click="handleClick">

      <el-tab-pane label="安装单" name="install">
        <DetailsInfo :postFrom="OrderInfo"></DetailsInfo>
      </el-tab-pane>
      <el-tab-pane label="安装日志" name="instalog">
        <div style="height: 300px;    overflow-y: scroll;">
          <Timeline :activities="loglist"></Timeline>
        </div>
      </el-tab-pane>


      <el-tab-pane label="支付单" name="pay">
        <template v-for="(item,index) in paylist">
        <PayInfo v-if="is_payorder" :postFrom="item"></PayInfo>
        </template>
      </el-tab-pane>

      <el-tab-pane label="支付单日志" name="paylog">
        <div style="height: 300px;    overflow-y: scroll;">
          <Timeline :activities="payloglist"></Timeline>
        </div>
      </el-tab-pane>
      <el-tab-pane label="分销" name="distribution">
        <div class="disd">
          <span>分销1 金额 {{distribution.one?distribution.one:0}}</span>
        </div>
        <div class="disd">
          <span>分销2 金额 {{distribution.tow?distribution.tow:0}}</span>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="rolesbtn('o-67-6')" label="回访" name="return">
        <returnVisit :activities="sale"></returnVisit>
      </el-tab-pane>
      <el-tab-pane v-if="rolesbtn('o-67-8')" label="售后" name="sales">

        <returnVisit :activities="sale"></returnVisit>
      </el-tab-pane>
    </el-tabs>

    <span slot="footer" class="dialog-footer">
              <el-button type="primary" v-if="rolesbtn('o-67-7')&&activeName==='return'" size="mini"
                         @click="returninnerVisible=true">添加</el-button>
          <el-button type="primary" v-if="rolesbtn('o-67-9')&&activeName==='sales'" size="mini"
                     @click="returninnerVisible=true">添加</el-button>
    <el-button size="mini" @click="handleClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import DetailsInfo from './info/details'
  import PayInfo from './info/pay'



  import Timeline from './info/timeline'
  import returnVisit from './info/returnVisit'

  import { GetIdByOrderLog, GetTypeBySale, PostDataBySale, GetIdBypaydetails,GetIdBypayOrderLog } from '@/api/order'

  import {GetInfoById } from '@/api/product'

  import Upload from '@/components/Upload/eva'

  import config from '@/config'
  import { mapGetters } from 'vuex'

  export default {
    name: 'OrderInfo',

    computed: {
      ...mapGetters([
        'userinfo',
        'brand',
        'group'
      ])

    },
    components: {
      DetailsInfo,
      Timeline,
      returnVisit,
      Upload,
      PayInfo
    },
    props: {
      OrderInfo: {
        type: Object,
        default: function() {
          return {}
        }
      },
      tabtext:{
        type:String,
        default:'install',
      },
      infodialogVisible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        distribution:{},
        payinfo:[],
        paylist:[],
        payloglist:[],
        is_payorder:false,
        permissions: [],//权限组

        reTitle: '',
        sale: [],

        returninnerVisible: false,
        content: '',
        img: [],
        activeName: 'install',
        loglist: [],
        config: {
          fileName: 'file',
          limit: 5,
          multiple: false,
          accept: 'image/*',
          action: config.uploadUrl.img,
          drag: false
        }
      }
    },
    created() {
      this.permissions = this.group.btn.split(',')
      this.activeName=this.tabtext
      let id=this.OrderInfo.product_id?this.OrderInfo.product_id:0
      GetInfoById(id).then(res=>{
        this.distribution=res.data
      })

    },
    methods: {

      rolesbtn(val) {
        var index = this.permissions.indexOf(val)
        if (index > -1) {
          return true
        } else {
          return false
        }
      },
      //添加售后数据
      handelContent() {

        var img='';
        for (let i=0;i<this.img.length;i++){
          img=img+this.img[i]['url']+'|'
        }
        var data = {
          content: this.content,
          img: img,
          type: this.activeName,
          order_id: this.OrderInfo.id
        }
        PostDataBySale(data).then(res => {
          console.log(res)
          this.getsale()
          this.returninnerVisible = !this.returninnerVisible
        })

      },

      getsale() {
        var temp = {
          order_id: this.OrderInfo.id,
          type: this.activeName
        }
        GetTypeBySale(temp).then(res => {
          // this.sale=res.data
          var arr = []
          for (let i = 0; i < res.data.length; i++) {
            arr[i] = res.data[i]
            arr[i].img = res.data[i].img.split('|')
          }
          this.sale = arr
        })

      },
      //组件图片上传
      handelRuimg(row) {
        this.img.push({
          url:row.data
        })
      },
      handleClose() {
        this.$emit('handelInfoDialog', !this.infodialogVisible)
      },
      handleClick(tab, event) {
        //
        if (tab.paneName === 'instalog') {
          GetIdByOrderLog(this.OrderInfo.id).then(res => {
            this.loglist = res.data
          })
        }
        if (tab.paneName === 'paylog') {

          GetIdBypayOrderLog(this.OrderInfo.id).then(res => {
            this.payloglist = res.data
          })
        }


        //如果是支付单
        if (tab.paneName === 'pay') {
          GetIdBypaydetails(this.OrderInfo.id).then(res => {
            console.log(res)
            if (res.data === 404) {
              this.is_payorder = false
              this.$message.error('尚未添加支付单')
            }else{
              let row=res.data
              var paylist=res.data  ;

              this.paylist=paylist
              this.is_payorder=true;
            }
          })
        }

        if (tab.paneName === 'return') {
          this.getsale()
        }

        if (tab.paneName === 'sales') {
          this.getsale()
        }
      }
    },
    watch:{
      'activeName':function (e) {


        if (e=== 'return') {
          this.getsale()
        }
        console.log('售后服务')

        if (e === 'sales') {
          this.getsale()
        }
      }
    },
  }
</script>

<style lang="scss">
  .returnform {
    .el-form-item__label {
      line-height: 12px !important;
    }
  }

  .returnform {
    .el-upload {
      width: 70px !important;
      height: 70px !important;

    }
    .image-uploader .el-upload-list__item {
      width: 70px !important;
      height: 70px !important;
    }
    .el-upload--picture-card {
      line-height: 70px !important;
    }

  }

  .el-tabs__content{
    height: 400px;
    overflow: auto;
  }
  .disd{
    font-weight: 400;
    color: #1f2f3d;
    line-height: 1.5;
  }
</style>

