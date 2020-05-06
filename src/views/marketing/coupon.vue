<template>
  <div class="app-container pageclass">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="优惠卷" name="coupon">

        <Coupon></Coupon>
      </el-tab-pane>
      <el-tab-pane label="门店卷组" name="second">

        <shop></shop>

      </el-tab-pane>
      <!--<el-tab-pane label="自动发送" name="third">组件配置中</el-tab-pane>-->
      <el-tab-pane label="发送记录" name="fourth">
        <senlog v-if="activeName==='fourth'"></senlog>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import Coupon from './components/coupon'

  import shop from './components/shop'
  import senlog from './components/senlog'

  export default {
    name: 'coupon',
    data() {
      return {
        activeName: 'coupon'
      }
    },
    components: {
      Coupon,
      shop,
      senlog
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>

<style scoped>

</style>
