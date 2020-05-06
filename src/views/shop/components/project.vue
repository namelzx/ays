<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>主营业务</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div>
        <el-tag
          :key="tag"
          v-for="tag in main"
          closable
          :disable-transitions="false"
          @close="handleClose(tag,1)">
          {{tag.title}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-if="main.length<10" v-else class="button-new-tag" size="small" @click="showInput(1)">+ 添加新业务
        </el-button>

      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>服务项目</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div>
        <el-tag
          :key="tag"
          v-for="tag in serve"
          closable
          :disable-transitions="false"
          @close="handleClose(tag,2)">
          {{tag.title}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisibleserve"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-if="serve.length<10" v-else class="button-new-tag" size="small" @click="showInput(2)">+ 添加新业务
        </el-button>

      </div>
    </el-card>
  </div>
</template>

<script>
  import { GetProjectByAdd, GetProjectByDel, GetProjectByList } from '@/api/shop'

  export default {
    name: 'project',
    props: {
      id: {
        type: String,
        default: '0'
      }
    },
    data() {
      return {
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputVisibleserve: false,
        inputValue: '',
        main: [],
        serve: [],
        type: 0
      }
    },
    created() {
      GetProjectByList(this.id).then(res => {
        this.main = res.data.main
        this.serve = res.data.serve
      })
    },
    methods: {
      handleClose(tag, type) {
        if (type === 1) {
          this.main.splice(this.main.indexOf(tag), 1)
          GetProjectByDel(tag.id).then(res=>{

          })
        }
        console.log(tag)
        if (type === 2) {
          GetProjectByDel(tag.id).then(res=>{

          })
          this.serve.splice(this.serve.indexOf(tag), 1)
        }
      },

      showInput(type) {
        if (type === 1) {
          this.inputVisible = true
        } else {
          this.inputVisibleserve = true

        }

        this.type = parseInt(type)
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm() {
        let inputValue = this.inputValue
        if (inputValue) {
          console.log(this.type)
          if (this.type === 1) {
            var temp = { shop_id: this.id, title: inputValue, type: this.type }
            GetProjectByAdd(temp).then(res => {
              temp.id = res.data
              this.main.push(temp)

            })
          }
          if (this.type === 2) {
            var temp = { shop_id: this.id, title: inputValue, type: this.type }
            GetProjectByAdd(temp).then(res => {
              temp.id = res.data
              this.serve.push(temp)
            })
          }
        }
        if (this.type === 1) {
          this.inputVisible = false
        }
        if (this.type === 2) {
          this.inputVisibleserve = false
        }
        this.inputValue = ''
      }
    }
  }
</script>

<style scoped>


  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .box-card{
    margin-bottom: 50px;
  }
</style>
