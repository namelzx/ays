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
          <Upload @input="handelRuimg" :config="config" :value="img"></Upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
              <el-button type="primary"  size="mini" @click="handelContent">添加</el-button>

    <el-button size="mini" @click="returninnerVisible=false">取消</el-button>
    </span>
    </el-dialog>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="支付单" name="payinstall">
        <DetailsInfo :postFrom="OrderInfo"></DetailsInfo>
      </el-tab-pane>
      <el-tab-pane label="日志" name="paylog">
        <Timeline :activities="loglist"></Timeline>
      </el-tab-pane>

      <el-tab-pane label="安装单" name="install">
        <InstallInfo :postFrom="OrderInfo"></InstallInfo>
      </el-tab-pane>
      <el-tab-pane label="安装单日志" name="instalog">
        <Timeline :activities="loglist"></Timeline>
      </el-tab-pane>
    </el-tabs>

    <span slot="footer" class="dialog-footer">

    <el-button size="mini" @click="handleClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import DetailsInfo from './info/details'

  import InstallInfo from './info/install'

  import Timeline from './info/timeline'
  import returnVisit from './info/returnVisit'

  import { GetIdByOrderLog, GetTypeBySale, PostDataBySale ,GetIdByinstaOrderLog} from '@/api/payorder'

  import Upload from '@/components/Upload/uploadList'

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
      InstallInfo
    },
    props: {
      OrderInfo: {
        type: Object,
        default: function() {
          return {}
        }
      },
      infodialogVisible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        permissions: [],//权限组

        reTitle: '',
        sale:[],

        returninnerVisible: false,
        content: '',
        img: [],
        activeName: 'payinstall',
        loglist: [],
        config: {
          fileName: 'file',
          limit: 5,
          multiple: false,
          accept: 'image/*',
          action: config.uploadUrl.img,
          drag: false
        },
        imglist:[],
        videolist:[],
      }
    },
created(){
  this.permissions = this.group.btn.split(',')
  this.imglist=this.postFrom.imglist.split(','),
    this.videolist=this.postFrom.videolist.split(',')
},
    methods: {
      handelRuimg(){

      },

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
        var data = {
          content: this.content,
          img: this.img.join('|'),
          type: this.activeName,
          order_id: this.OrderInfo.id
        }
        PostDataBySale(data).then(res => {
          console.log(res)
          this.getsale();
          this.returninnerVisible=!this.returninnerVisible
        })

      },

      getsale() {
        var temp = {
          order_id: this.OrderInfo.id,
          type: this.activeName
        }
        GetTypeBySale(temp).then(res => {
          // this.sale=res.data
          var arr=[]
          for (let i=0;i<res.data.length;i++){
            arr[i]=res.data[i]
            arr[i].img=res.data[i].img.split('|')
          }
          this.sale=arr
        })

      },
      //组件图片上传
      handelRuimg(row) {
        this.img = row
        console.log(row)
      },
      handleClose() {
        this.$emit('handelInfoDialog', !this.infodialogVisible)
      },
      handleClick(tab, event) {
        //
        if (tab.paneName === 'paylog') {
          this.loglist=[]
          GetIdByOrderLog(this.OrderInfo.id).then(res => {
            this.loglist = res.data
          })
        }

        if (tab.paneName === 'instalog') {
          this.loglist=[]
          GetIdByinstaOrderLog(this.OrderInfo.order_id).then(res => {
            this.loglist = res.data
          })
        }



        if (tab.paneName === 'return') {
          this.getsale()
        }
        console.log('售后服务')

        if (tab.paneName === 'sales') {
          this.getsale()
        }
      }
    }
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
      width: 100px !important;
      height: 100px !important;

    }
    .image-uploader .el-upload-list__item {
      width: 100px !important;
      height: 100px !important;
    }
    .el-upload--picture-card {
      line-height: 106px !important;
    }

  }

</style>
