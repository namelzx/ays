<template>
  <div class="app-container">

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="门店信息" name="mendian">
        <MenDian v-if="activeName==='mendian'" :id="id"></MenDian>
      </el-tab-pane>
      <el-tab-pane label="资产营收" name="second">

        <ZiChan v-if="activeName==='second'" :id="id"></ZiChan>
      </el-tab-pane>
      <el-tab-pane label="安装订单" name="third">

        <Azhuang v-if="activeName==='third'" :id="id"></Azhuang>

      </el-tab-pane>
      <!--<el-tab-pane label="官派订单" name="fourth">定时任务补偿</el-tab-pane>-->

      <el-tab-pane label="用户评价" name="eva">
        <Pjia v-if="activeName==='eva'" :id="id"></Pjia>

      </el-tab-pane>
      <!--<el-tab-pane label="优惠卷" name="youhuijuan">定时任务补偿</el-tab-pane>-->
      <el-tab-pane label="项目" name="xiangmu">

        <Project v-if="activeName==='xiangmu'" :id="id"></Project>
      </el-tab-pane>
      <!--<el-tab-pane label="卡劵" name="kajuan">定时任务补偿</el-tab-pane>-->
      <!--<el-tab-pane label="产品" name="chanping">定时任务补偿</el-tab-pane>-->
      <!--<el-tab-pane label="动态" name="dongtai">定时任务补偿</el-tab-pane>-->

    </el-tabs>

  </div>

</template>
<script>

  import MenDian from './components/mendian'
  import ZiChan from './components/zichan'
  import Azhuang from './components/anzhuang'
  import Pjia from './components/pingjia'

  import Project from './components/project'


  export default {
    name: 'mendianedit',
    components: { MenDian,ZiChan,Azhuang,Pjia,Project },
    data() {
      return {
        activeName: 'mendian',
        id: 0
      }
    },
    created() {
      this.id = this.$route.params && this.$route.params.id
    },
    methods: {
      handleClick(e) {
        console.log(e)
      }
    }
  }

</script>

<style>

</style>
