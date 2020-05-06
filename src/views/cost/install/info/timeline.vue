<template>
  <el-timeline :reverse="reverse">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      color="#1d9ffc"
      :timestamp="activity.content ">
      {{activity.create_time}}
    </el-timeline-item>
  </el-timeline>
</template>

<script>
  export default {
    name: 'timeline',
    props:{
      activities:{
        type:Array,
        default:[],
      }
    },
    data(){
      return{
        reverse: true,
      }
    }
  }
</script>

<style scoped>

</style>
