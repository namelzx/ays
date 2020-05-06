<template>
  <el-timeline :reverse="reverse">
    <!--{{activities.img}}-->
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      color="#1d9ffc"
      :timestamp="activity.create_time "
      placement="top">

        <div class="content">{{activity.content}}</div>
      <div class="img">
        <div v-for="(item,index) in activity.img " class="list" >
          <img v-if="item" :src="item"/>
        </div>
      </div>
    </el-timeline-item>
  </el-timeline>
</template>

<script>
  export default {
    name: 'timeline',
    props: {
      activities: {
        type: Array,
        default: []
      }
    },
    filters: {
      imgjoin(str) {
        return str.split('|')
      }
    },
    data() {
      return {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        reverse: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .img {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .list{
      width: 15%;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 4px;

    }
  }
  .content{
    padding-bottom: 10px;
    padding-top: 10px;
  }

</style>
