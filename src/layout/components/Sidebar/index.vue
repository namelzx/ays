<template>
  <div class="has-logo">
    <logo :collapse="true"/>

    <div class="bartar">
      <div class="broadside">
        <div :class="['br—item',tar_num===index?'br-active':'']" v-for="(item,index) in tablist" :key="index"
             @click="totimes(index)">
          <div class="item-img"><i class="el-icon-delete"></i></div>
          <div class="item-name">{{item.title}}</div>
        </div>
      </div>
      <div class="brlist" v-for="(item,index) in tablist" :key="index" v-if="index===tar_num">
        <div :class="['brlist-name',tar_num_list===index?'brlist-active':'']" v-for="(list,index) in item.list"
             :key="index">
          <a @click="tobarlist(index)" :href="list.url">{{list.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Logo from './Logo'
  import SidebarItem from './SidebarItem'
  import variables from '@/styles/variables.scss'

  export default {
    components: { SidebarItem, Logo },
    data() {
      return {
        tar_num: 0,
        tar_num_list: 0,
        tablist: [
          {
            title: '概况',
            list: [
              { name: '概况', url: '#/bolg/edit/1' },
              { name: 'TOP排名', url: '#/manage/rules' },
              { name: '评分' }
            ]
          },
          {
            title: '设置',
            list: [
              { name: '账号管理', url: '#/setting/manage' },
              { name: '岗位管理', url: '#/setting/jobs' }
            ]
          },
          {
            title: '订单',
            list: [
              { name: 'TOP排名' },
              { name: '评分' },
              { name: '评分' }
            ]
          },
          {
            title: '费用',
            list: [
              { name: '概况' },
              { name: 'TOP排名' },
              { name: '评分' }
            ]
          },
          {
            title: '改灯',
            list: [
              { name: '概况' },
              { name: 'TOP排名' },
              { name: '评分' }
            ]
          },
          {
            title: '营销',
            list: [
              { name: '概况' },
              { name: 'TOP排名' },
              { name: '评分' }
            ]
          },
          {
            title: '门店',
            list: [
              { name: '概况' },
              { name: 'TOP排名' },
              { name: '评分' }
            ]
          },
          {
            title: '会员',
            list: [
              { name: '概况' },
              { name: 'TOP排名' },
              { name: '评分' }
            ]
          },
          {
            title: '设置',
            list: [
              { name: '账号管理', url: '#/setting/manage' },
              { name: '岗位管理', url: '#/setting/jobs' }
            ]
          },
          {
            title: '门店',
            list: [
              { name: '概况' },
              { name: 'TOP排名' },
              { name: '评分' }
            ]
          }
        ]
      }
    },
    watch: {
      $route: {
        handler: function(val, oldVal) {
          console.log(val)
        },
        // 深度观察监听
        deep: true
      }
    },
    created() {
      var tar_num_list = this.$router
      console.log(tar_num_list)
    },
    methods: {
      totimes(index) {
        this.tar_num = index
      },
      tobarlist(index) {
        this.tar_num_list = index
      }
    },
    computed: {
      ...mapGetters([
        'permission_routes',
        'sidebar'
      ]),
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      showLogo() {
        return this.$store.state.settings.sidebarLogo
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style>
  .bartar {
    overflow-y: auto;
    display: flex;
    height: 100%;
    background: #304156;
    padding-bottom: 100px;
  }

  .broadside {
    width: 100px;
    overflow-y: auto;

    border-right: 1px solid #999999;
  }

  .broadside::-webkit-scrollbar {
    display: none;
  }

  .broadside .br—item {
    height: 85px;
    overflow: hidden;
    color: #999999;
  }

  .broadside .br-active {
    color: #ffffff;
    position: relative;
  }

  .broadside .br-active::before {
    content: '';
    width: 2px;
    height: 12px;
    position: absolute;
    top: 36px;
    right: 5px;
    background: #009CFF;
    cursor: pointer;
  }

  .br—item .item-img {
    text-align: center;

    font-size: 15px;
    margin-top: 20px;
    margin-bottom: 10px;

  }

  .br—item .item-name {
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
  }

  .brlist .brlist-name {
    width: 110px;
    height: 50px;
    line-height: 50px;
    color: #999999;
    font-size: 7px;
    font-weight: bold;
    margin-left: 30px;
    cursor: pointer;
  }

  .brlist .brlist-active {
    color: #ffffff;
    position: relative;
  }

  .brlist .brlist-active::before {
    content: '';
    width: 2px;
    height: 12px;
    position: absolute;
    top: 19px;
    left: -6px;
    background: #009CFF;
  }


</style>
