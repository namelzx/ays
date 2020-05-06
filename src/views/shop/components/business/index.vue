<template>
  <!--<el-dialog-->
  <!--title="修改基本信息"-->
  <!--:visible.sync="dialogVisible"-->
  <!--width="50%"-->
  <!--class="w-dia"-->
  <!--:before-close="handleClose">-->

  <div>
    <div>
      <div class="list-item">
        <div class="label">营业时间</div>
        <div class="inpit">
          <el-select
            v-model="postFrom.business_time"
            size="mini"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="list-item">
        <div class="label">标语</div>
        <div class="input" style="width: 31%">
          <el-input size="mini" v-model="postFrom.slogan"></el-input>
        </div>
      </div>

      <div class="list-item">
        <div class="label">服务保障</div>
        <div class="serve">
          <el-input
            size="mini"
            v-for="(item, index) in serve"
            v-model="item.title"
          ></el-input>
        </div>
      </div>

      <div class="list-item">
        <div class="label">主营项目</div>
        <div class="serve">
          <el-input
            size="mini"
            v-for="(item, index) in main"
            v-model="item.title"
          ></el-input>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="handleSave"
        >确认修改</el-button
      >
      <el-button size="mini" @click="handleClose">关闭</el-button>
    </span>
  </div>
  <!--</el-dialog>-->
</template>

<script>
import { GetProjectBy, PostBussByUpdate } from "@/api/shop";

const defaultForm = {};
export default {
  name: "index",
  props: {
    dialogVisible: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      default: 0
    },
    postFrom: {
      type: Object,
      default: function() {
        return Object.assign({}, defaultForm);
      }
    }
  },
  data() {
    return {
      main: [],
      serve: [],
      options: [
        {
          label: "9:00-22:00",
          value: "9:00-22:00"
        }
      ]
    };
  },
  created() {
    GetProjectBy(this.postFrom.id).then(res => {
      console.log(res);
      this.main = res.data.main;
      this.serve = res.data.serve;
    });
  },
  methods: {
    handleSave() {
      var data = {
        business_time: this.postFrom.business_time,
        slogan: this.postFrom.slogan,
        id: this.postFrom.id
      };
      var temp = {
        data,
        main: this.main,
        serve: this.serve
      };
      PostBussByUpdate(temp).then(res => {
        this.$emit("handleClose");
        this.$message.success("操作成功");
      });

      console.log(temp);
    },
    handleClose() {
      this.$emit("handleClose");
    }
  }
};
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  font-size: 12px;
  .label {
    width: 80px;
    text-align-last: justify;
    margin-right: 10px;
    line-height: 2;
  }
  .serve {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 70%;
    flex-wrap: wrap;
    .el-input {
      width: 45%;
      margin-bottom: 5px;
    }
  }
}

.el-input--suffix {
  width: 90% !important;
}
</style>
