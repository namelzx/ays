<template>
  <div class="classifi">
    <!--分类1-->
    <div class="classifi-list">
      <draggable v-model="codeList" class="md" @update="datadragEnd" :options="{animation:200}">
        <div class="drag-item "
             v-for="(item,i) in codeList"
             :key="i"
             @click="handelClick(item,0)"
             :class="oneindex===item.id?'active':''">
          <div class="field_title" v-if="item.is_edit===1">
            {{item.field_title}}

          </div>
          <div class="field_title" v-else>
            <el-input v-model="item.field_title" size="mini" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <div v-if="oneindex===item.id&&item.is_edit===1">
              <i class="el-icon-edit-outline" @click="handelEdit(item)"></i>
              <i class="el-icon-delete" @click="Delete(item,0)"></i>
            </div>
            <div v-else-if="item.is_edit===1">
              <i class="el-icon-caret-right"></i>
            </div>
            <div v-else>

              <i class="el-icon-check" @click="oneChange(item,0)"></i>
              <i class="el-icon-close" @click="item.is_edit=1"></i>
            </div>
          </div>

        </div>
      </draggable>
      <div class="add-btn" @click="handelAdd('one')">
        <a class="primary">新增分类</a>
      </div>
    </div>
    <!--分类2-->
    <div class="classifi-list">
      <draggable v-model="towlist" class="md" @update="datadragEndtow" :options="{animation:200}">
        <div class="drag-item "
             v-for="(item,i) in towlist"
             :key="i"
             @click="handelClick(item,1)"
             :class="towindex===item.id?'active':''">
          <div class="field_title" v-if="item.is_edit===1">
            {{item.field_title}}
          </div>
          <div class="field_title" v-else>
            <el-input v-model="item.field_title" size="mini" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <div v-if="towindex===item.id&&item.is_edit===1">
              <i class="el-icon-edit-outline" @click="handelEdit(item)"></i>
              <i class="el-icon-delete" @click="Delete(item,1)"></i>
            </div>
            <div v-else-if="item.is_edit===1">
              <!--<i class="el-icon-caret-right"></i>-->
            </div>
            <div v-else>

              <i class="el-icon-check" @click="oneChange(item,1)"></i>
              <i class="el-icon-close" @click="item.is_edit=1"></i>
            </div>
          </div>

        </div>
      </draggable>
      <div class="add-btn" @click="handelAdd('tow')">
        <a class="primary">新增分类</a>
      </div>
    </div>

    <!--分类3-->
    <!--<div class="classifi-list">-->
    <!--<draggable v-model="slist" class="md" @update="datadragEndsan" :options="{animation:200}">-->
    <!--<div class="drag-item "-->
    <!--v-for="(item,i) in slist"-->
    <!--:key="i"-->
    <!--@click="handelClick(item,2)"-->
    <!--:class="sanindex===item.id?'active':''">-->
    <!--<div class="field_title" v-if="item.is_edit===1">-->
    <!--{{item.field_title}}-->

    <!--</div>-->
    <!--<div class="field_title" v-else>-->
    <!--<el-input v-model="item.field_title" size="mini" placeholder="请输入内容"></el-input>-->
    <!--</div>-->
    <!--<div>-->
    <!--<div v-if="sanindex===item.id&&item.is_edit===1">-->
    <!--<i class="el-icon-edit-outline" @click="handelEdit(item)"></i>-->
    <!--<i class="el-icon-delete" @click="Delete(item,2)"></i>-->
    <!--</div>-->
    <!--<div v-else-if="item.is_edit===1">-->
    <!--&lt;!&ndash;<i class="el-icon-caret-right"></i>&ndash;&gt;-->
    <!--</div>-->
    <!--<div v-else>-->

    <!--<i class="el-icon-check" @click="oneChange(item,2)"></i>-->
    <!--<i class="el-icon-close" @click="item.is_edit=1"></i>-->
    <!--</div>-->
    <!--</div>-->

    <!--</div>-->
    <!--</draggable>-->
    <!--<div class="add-btn" @click="handelAdd('san')">-->
    <!--<a class="primary">新增分类</a>-->
    <!--</div>-->
    <!--</div>-->

  </div>

</template>


<script>
  import { GetDataByList, GetIdByDelete, PostDataByAdd, PostDataByUpSort } from '@/api/serviceclass'
  import draggable from 'vuedraggable'

  export default {
    name: 'index',
    components: { draggable },
    data() {
      return {
        oneindex: undefined,
        towindex: undefined,
        sanindex: undefined,
        pid: 0,
        spid: undefined,
        codeList: [],//分类1
        towlist: [],//分类2
        slist: []//分类3
      }
    },
    created() {
      this.getlist()
    },
    methods: {
      //修改数据
      handelEdit(row) {
        row.is_edit = 2
        // const  index=this.codeList.indexOf(row);
        // this.codeList[index].is_edit=2
      },
      getlist(type = 0) {
        var temp = {
          pid: this.pid
        }
        if (type == 0) {
          temp.pid = 0
        }
        var that = this
        GetDataByList(temp).then(res => {
          if (type === 0) {
            that.codeList = res.data
          }
          if (type === 1) {
            that.towlist = res.data
          }
          if (type === 2) {
            that.slist = res.data
          }
        })
      },
      Delete(row, type) {
        this.$confirm('确认删除此分类?删除后子分类也将被同时删除，分类下的单品将默认为未分类', '分类删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          GetIdByDelete(row).then(res => {
            if (type === 0) {
              const index = this.codeList.indexOf(row)
              this.codeList.splice(index, 1)
              this.towlist=[];
              this.slist=[];
            }
            if (type === 1) {
              const index = this.towlist.indexOf(row)
              this.towlist.splice(index, 1)
              this.slist=[]
            }

            if (type === 2) {
              const index = this.slist.indexOf(row)
              this.slist.splice(index, 1)
            }

            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })

      },
      oneChange(row, type) {
        var that = this
        row.is_edit = 1
        if (type === 0) {
          that.pid = 0
        }

        if (type === 1) {
          that.pid = row.pid
        }
        PostDataByAdd(row).then(res => {
          row.id = res.data.id
          setTimeout(function({}) {
            this.getlist(type)
          }, 1000)

        })

      },
      //添加分类
      handelAdd(type) {
        if (type === 'one') {
          this.codeList.push({ field_title: '', is_edit: 2, sort_order: this.codeList.length + 1 })
        }
        if (type === 'tow') {

          if (this.oneindex === undefined) {
            this.$message({
              message: '上级分类没有被选中,麻烦再点击一次',
              type: 'warning'
            });
            return
          }
          this.towlist.push({ field_title: '', is_edit: 2, pid: this.oneindex, sort_order: this.towlist.length + 1 })
        }

        if (type === 'san') {

          if (this.towindex === undefined) {
            this.$message({
              message: '上级分类没有被选中,麻烦再点击一次',
              type: 'warning'
            });
            return
          }
          this.slist.push({ field_title: '', is_edit: 2, pid: this.towindex, sort_order: this.slist.length + 1 })
        }

      },
      handelClick(row, type = 0) {

        if (type === 0) {
          this.oneindex = row.id
          this.towindex = undefined
          this.pid = row.id
          this.slist = []
          if (row.id !== undefined) {

            this.getlist(1)
          }
        }
        if (type == 1) {
          this.towindex = row.id
          this.pid = row.id
          this.spid = row.id
          if (row.id !== undefined) {
            this.getlist(2)
          }
        }

        if (type == 2) {
          this.sanindex = row.id

        }
      },
      async datadragEnd(evt) {
        evt.preventDefault()
        // console.log('拖动前的索引 :' + evt.oldIndex)
        // console.log('拖动后的索引 :' + evt.newIndex)
        // 遍历数组,将索引值赋值到对应的sort_order上面,完成排序
        let arr = this.codeList
        let newArr = await arr.map((item, i) => {
          return {
            sort_order: i,
            id: item.id
          }
        })
        PostDataByUpSort(newArr).then(res => {
          this.getlist()
        })

        // console.log(res)
        // const { error, message } = res.data
        // if (error == 0) {
        //   this.$message.success(message)
        // }
      },
      async datadragEndtow(evt) {
        evt.preventDefault()
        // console.log('拖动前的索引 :' + evt.oldIndex)
        // console.log('拖动后的索引 :' + evt.newIndex)
        // 遍历数组,将索引值赋值到对应的sort_order上面,完成排序
        let arr = this.towlist
        let newArr = await arr.map((item, i) => {
          return {
            sort_order: i,
            id: item.id
          }
        })
        PostDataByUpSort(newArr).then(res => {
          // this.getlist()
        })

      },
      async datadragEndsan(evt) {
        evt.preventDefault()
        // console.log('拖动前的索引 :' + evt.oldIndex)
        // console.log('拖动后的索引 :' + evt.newIndex)
        // 遍历数组,将索引值赋值到对应的sort_order上面,完成排序
        let arr = this.slist
        let newArr = await arr.map((item, i) => {
          return {
            sort_order: i,
            id: item.id
          }
        })
        PostDataByUpSort(newArr).then(res => {
          // this.getlist()
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  .classifi {

    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 20px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .classifi-list {
      border: 1px solid #DCDFE6;
      width: 20%;
      min-height: 400px;
      position: relative;
      margin-right: 30px;

      .md {
        font-size: 14px;
        .active {
          background: #C0C4CC;

        }
        .field_title {
          width: 70%;
        }
        .drag-item {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 10px;
          align-items: center;
        }
      }

      .add-btn {
        width: 100%;
        position: absolute;
        bottom: 20px;
        text-align: center;
        .primary {
          color: #409EFF;
          border: 1px solid #409EFF;
          font-size: 10px;
          padding: 5px;
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }
  }

</style>
