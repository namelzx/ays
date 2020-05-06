<template>
  <div class="app-container">
    <!--开发中-->
    开发中
    <div class="statistical">
      <div class="item-st">
        <div class="title">待处理安装单</div>
        <div class="sj">{{statistical.order}}</div>
      </div>
      <div class="item-st" style="background: #8cc8ff">
        <div class="title">待处理门店需求</div>
        <div class="sj">{{statistical.Demand}}</div>
      </div>

    </div>


    <el-table
      :data="order"
      stripe
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="客服"
        width="180">
      </el-table-column>
      <el-table-column
        prop="total"
        label="整体评分"
        width="180">
      </el-table-column>
      <el-table-column
        prop="one"
        label="1星">
      </el-table-column>
      <el-table-column
        prop="tow"
        label="2星">
      </el-table-column>
      <el-table-column
        prop="three"
        label="3星">
      </el-table-column>
      <el-table-column
        prop="four"
        label="4星">
      </el-table-column>
      <el-table-column
        prop="five"
        label="5星">
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
  import { GetHomeByData } from '@/api/home'

  export default {
    name: 'Index',
    data() {
      return {
        statistical: {
          order: 0,
          Demand: 0
        },
        order:[],
      }
    },
    created() {
      this.getdata()
    },
    methods: {
      getdata() {
        GetHomeByData().then(res => {
          this.statistical = res.data.statistical
          this.order = res.data.order
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .statistical {
    display: flex;
    flex-direction: row;
    color: #fff;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    margin-left: 20%;
    .item-st {
      background: hsla(234, 80%, 74%, 1);
      height: 80px;
      width: 268px;
      box-shadow: 0px 0px 5px 0px rgba(51, 51, 51, 0.28);
      border-radius: 10px;
      margin-right: 30px;
      .title {
        padding: 10px;
        padding-left: 20px;
      }
      .sj {
        width: 100%;
        text-align: center;
        font-size: 30px;
        font-weight: bold;
      }

    }

  }

</style>
