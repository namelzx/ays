<template>
  <div>
    <el-dialog
      title="修改绑定"
      :visible.sync="dialogVisible"
      width="30%"
      class="w-dia"
      :before-close="handleClose"
    >
      <el-dialog
        width="30%"
        title="修改信息"
        :visible.sync="innerVisible"
        append-to-body
      >
        <div>确定修改{{ postFrom.realName }}信息吗?</div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="handelSave"
          >确认修改</el-button
          >
          <el-button size="mini" @click="innerVisible = false">取消</el-button>
        </span>
      </el-dialog>

      <div class="main">
        <div class="label">输入微信openid</div>
        <div class="content">
          <el-input v-model="postFrom.openid" size="mini"></el-input>
        </div>
        <div class="btn">
          <el-button type="primary" @click="handelsearch" size="mini"
          >查找
          </el-button
          >
        </div>
      </div>
      <div class="img" v-if="is_search">
        <img :src="shop.headimgurl" style="width: 80px;height: 80px;"/>
        <span>{{ shop.nickname }}</span>
      </div>

      <div class="main">
        <div class="label">姓名</div>
        <div class="content">
          <el-input v-model="postFrom.realName" size="mini"></el-input>
        </div>
      </div>

      <div class="main">
        <div class="label">联系方式</div>
        <div class="content">
          <el-input v-model="postFrom.tel" size="mini"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="handelconfirm"
        >确认修改</el-button
        >

        <el-button size="mini" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { GetOpenidByFind ,PostDataByUpdate} from '@/api/wechatuser'

  import { mapGetters } from 'vuex'

  export default {
    name: 'index',
    props: {
      postFrom: {
        type: Object
      },
      dialogVisible: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters(['userinfo'])
    },
    data() {
      return {
        shop: {},
        innerVisible: false,
        closeBind: true,
        againBind: true,
        openid: '',
        is_search: false,
        form: {}
      }
    },
    methods: {
      handleClose() {
        this.$emit('handleClose')
      },
      handelSave() {
        var temp = {
          id: this.postFrom.id,
          tel: this.postFrom.tel,
          openid: this.postFrom.openid,
          realName: this.postFrom.realName
        }
        PostDataByUpdate(temp).then(res => {
          this.$emit('handleClose')
        })
      },
      handelconfirm() {
        this.innerVisible = true
      },
      handelsearch() {
        GetOpenidByFind(this.postFrom.openid).then(res => {
          if (res.data === 404) {
            this.$message({
              message: '没有找到相关数据',
              type: 'warning'
            })
            this.is_search = false
            return
          }
          this.shop = res.data
          this.is_search = true
          this.$message.success('操作成功')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
  }

  .label {
    width: 30%;
    font-size: 12px;
  }

  .content {
    width: 50%;
  }

  .btn {
    padding-left: 10px;
    width: 15%;
  }

  .tis {
    font-size: 12px;
    text-align: center;
    margin-top: 5px;
    color: #909399;
  }

  .img {
    margin-top: 10px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      margin-right: 10px;
    }

  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
  }

  .nickname {
    text-align: center;
    font-size: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  .dialog-footer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-bottom: 0px;
  }
</style>
