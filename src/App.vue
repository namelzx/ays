<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .n-post >>> .pagination-container{
    margin-top: 0px !important;
  }
  .app-container{
    margin-bottom: 30px;
  }
  .pagination-container{
  width: 81% !important;
    text-align: center;
  }
  .head-imgs{
    width: 40px;
    height: 40px;
  }
  .dn{
    .el-form-item{
    width: 100%;
    .el-form-item__label{
      width: 40%;
    }
    .el-form-item__content{
      width: 60%;
      .el-input__inner{
        width: 100%;
      }
    }
    }
    .el-input__inner{
      width: 90px
    }
    .el-form-item__label{
      font-size: 11px;
      font-weight: 400;
    }
    .el-form-item{
      margin-bottom: 0px;
    }
  }
  .createPost-main-container{
    .el-form-item__label{
      font-size: 11px;
      font-weight: 500;
    }

  }
  .el-form-item__content{
    .el-button--small{
      padding: 6px 15px;
    }
  }

  /*表单距离*/
  .postInfo-container{
  .el-form-item--mini{
    .el-form-item{
      margin-bottom: 10px;
    }
  }
  }
</style>

