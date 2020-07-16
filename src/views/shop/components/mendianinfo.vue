<template>
    <div>
        <!--<el-dialog-->
        <!--title="修改基本信息"-->
        <!--:visible.sync="dialogVisible"-->
        <!--width="50%"-->
        <!--class="w-dia"-->
        <!--:before-close="handleClose">-->
        <div class="n-post">
            <div class="dia-content">
                <div class="c-data">
                    <div class="c-content">
                        <div class="ct-item">
                            <span class="label">类别</span>
                            <div class="c-input">
                                <el-select
                                        size="mini"
                                        v-model="postFrom.shop_type"
                                        placeholder="请选择"
                                >
                                    <el-option
                                            v-for="item in op"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">店门</span>
                            <div class="c-input">
                                <el-input
                                        size="mini"
                                        v-model="postFrom.shopname"
                                        placeholder="请输入内容"
                                ></el-input>
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">地区</span>
                            <div class="c-input">
                                <el-cascader
                                        style="width: 100%;"
                                        size="mini"
                                        :options="cityoptions"
                                        v-model="postFrom.cityCode"
                                >
                                </el-cascader>

                                <!--<el-input size="mini" v-model="postFrom.openid" placeholder="请输入内容"></el-input>-->
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">地址</span>
                            <div class="c-input">
                                <el-input
                                        size="mini"
                                        v-model="postFrom.location"
                                        placeholder="请输入内容"
                                ></el-input>
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">业务员</span>
                            <div class="c-input">
                                <el-select
                                        size="mini"
                                        filterable
                                        clearable
                                        v-model="postFrom.salesman_id"
                                        filterable
                                        placeholder=""
                                >
                                    <el-option
                                            v-for="item in salesman"
                                            :label="item.realName"
                                            :value="item.id"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="c-data">
                    <div class="c-content">
                        <div class="ct-item">
                            <span class="label">Open ID</span>
                            <div class="c-input">
                                <el-input
                                        v-if="postFrom.wechat"
                                        size="mini"
                                        disabled
                                        v-model="postFrom.wechat.openid"
                                        placeholder="请输入内容"
                                ></el-input>
                                <el-input
                                        v-else
                                        size="mini"
                                        disabled
                                        v-model="postFrom.openid"
                                        placeholder="未绑定"
                                ></el-input>
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">店主</span>
                            <div class="c-input">
                                <el-input
                                        size="mini"
                                        v-model="postFrom.shopkeeper"
                                        placeholder="请输入内容"
                                ></el-input>
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">联系方式</span>
                            <div class="c-input">
                                <el-input
                                        size="mini"
                                        v-model="postFrom.tel"
                                        placeholder="请输入内容"
                                ></el-input>

                                <!--<el-input size="mini" v-model="postFrom.openid" placeholder="请输入内容"></el-input>-->
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">服务商</span>
                            <div class="c-input">
                                <el-input
                                        size="mini"
                                        v-model="postFrom.service_provider"
                                        placeholder="请输入内容"
                                ></el-input>
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">建档名</span>
                            <div class="c-input">
                                <el-input
                                        size="mini"
                                        v-model="postFrom.buildarc"
                                        placeholder="请输入内容"
                                ></el-input>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="c-data conent">
                    <div class="c-content">
                        <div class="ct-item">
                            <span class="label">备注</span>
                            <div class="textarea">
                                <el-input
                                        type="textarea"
                                        :rows="3"
                                        placeholder="请输入内容"
                                        v-model="postFrom.desc"
                                >
                                </el-input>
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">店铺简介</span>
                            <div class="textarea">
                                <el-input
                                        type="textarea"
                                        :rows="3"
                                        placeholder="请输入内容"
                                        v-model="postFrom.Introduction"
                                >
                                </el-input>
                            </div>
                        </div>

                        <div class="ct-item" v-if="env">
                            <span class="label">店铺环境</span>
                            <div>
                                <uploadList
                                        :list="env"
                                        @HandelRemove="HandelRemove"
                                        @HandelFile="handleEnv"
                                ></uploadList>
                                <oneImage
                                        :imageUrl="postFrom.front"
                                        @HandelFile="handellicense"
                                ></oneImage>
                            </div>
                        </div>
                        <div class="ct-item" v-if="postFrom.license">
                            <span class="label">营业执照</span>
                            <div class="textarea">
                                <oneImage
                                        :imageUrl="postFrom.license"
                                        @HandelFile="handellicense"
                                ></oneImage>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="handelSave"
        >确认修改</el-button
        >

        <el-button size="mini" @click="handleClose">关闭</el-button>
      </span>
        </div>
        <!--</el-dialog>-->
    </div>
</template>

<script>
    import {Citylist} from "@/api/city";

    // import { regionDataPlus } from 'element-china-area-data'
    import {GetSaleByAll} from "@/api/salesman";
    import {PostDataByUpdate} from "@/api/shop";

    import oneImage from "@/components/Upload/oneImage";
    import uploadList from "@/components/Upload/uploadList";

    const defaultForm = {};
    export default {
        name: "sendOrder",
        data() {
            return {
                env: [],
                cityoptions: [],
                salesman: [],
                op: [
                    {
                        label: "普通",
                        value: 1
                    },
                    {
                        label: "阿帕认证",
                        value: 2
                    },
                    {
                        label: "阿帕三星",
                        value: 3
                    },
                    {
                        label: "阿帕四星",
                        value: 4
                    },
                    {
                        label: "阿帕五星",
                        value: 5
                    }
                ]
            };
        },
        components: {oneImage, uploadList},
        computed: {},
        props: {
            postFrom: {
                type: Object,
                default: function () {
                    return Object.assign({}, defaultForm);
                }
            },
            dialogVisible: {
                type: Boolean,
                default: false
            }
        },
        created() {
            let data = this.postFrom.cityCode;
            Citylist().then(res => {
                this.cityoptions = res.data;
                for (let i = 0; i < data.length; i++) {
                    data[i] = parseInt(data[i]);
                }
                this.postFrom.cityCode = data;
            });
            if (!this.postFrom.wechat) {
                // if (!this.postFrom.wechat.openid) {
                //     this.$message.error("请选绑定openid");
                // }
            }
            GetSaleByAll().then(res => {
                this.salesman = res.data;
                console.log(1, 3, 4)
            });
        },
        methods: {
            handelSave() {
                this.postFrom.cityCode = this.postFrom.cityCode.join(",");

                var arr = [];
                for (let i = 0; i < this.env.length; i++) {
                    arr.push({url: this.env[i].url, shop_id: this.env[i].shop_id});
                }
                var temp = {
                    post: this.postFrom,
                    env: arr
                };
                PostDataByUpdate(temp).then(res => {
                    this.$emit("handleClose");

                    this.$message.success("操作成功");
                });
            },
            handleEnv(e) {
                this.env.push({url: e.file.data, shop_id: this.postFrom.id});
            },

            HandelRemove(e) {
                this.env = e;
            },
            handellicense(e) {
                this.postFrom.license = e.file.response.data;
            },
            handleClose() {
                this.$emit("handleClose");
            }
        },
        mounted() {
            if (this.dialogVisible) {
                let arr = [];
                for (let i = 0; i < this.postFrom.env.length; i++) {
                    arr.push({url: this.postFrom.env[i]});
                }
                this.env = arr;
            }
            if (this.postFrom.shop_type === "普通") {
                this.postFrom.shop_type = 1;
            }
            this.env = this.postFrom.env;
            if (this.postFrom.shop_type === "阿帕认证") {
                this.postFrom.shop_type = 2;
            }
            if (this.postFrom.shop_type === "阿帕3星") {
                this.postFrom.shop_type = 3;
            }
            if (this.postFrom.shop_type === "阿帕4星") {
                this.postFrom.shop_type = 4;
            }
            if (this.postFrom.shop_type === "阿帕5星") {
                this.postFrom.shop_type = 5;
            }
        }
    };
</script>

<style lang="scss">
    .w-dia {
        .el-dialog__body {
            padding: 1px 20px;
            padding-left: 35px;
        }

        .el-dialog__title {
            font-size: 14px;
        }
    }

    .dia-content {
        display: flex;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-size: 12px;
        flex-direction: row;
        flex-wrap: wrap;

        .c-data {
            width: 50%;
            margin-bottom: 10px;

            .c-title {
                font-weight: 800;
                margin-bottom: 10px;
            }

            .el-select--mini {
                width: 100%;
            }

            .el-cascader--mini {
                width: 100%;

                .el-input__suffix {
                    right: -6px;
                }
            }

            .ct-item {
                display: flex;
                flex-direction: row;

                align-items: center;
                margin-bottom: 10px;

                .d_code {
                    display: flex;
                    flex-direction: row;
                    width: 60%;

                    .el-select {
                        width: 50%;
                    }
                }

                .label {
                    width: 23%;
                    margin-right: 10px;
                    /*text-align-last: justify;*/
                    width: 80px;
                }
            }
        }

        .conent {
            width: 100% !important;

            .ct-item {
                .label {
                    width: 70px !important;
                }

                .textarea {
                    width: 80%;
                }
            }
        }
    }

    .n-post {
        .el-dialog__body {
            padding: 10px 10px;

            .el-form-item__label {
                font-weight: 400;
                font-size: 12px;
            }
        }
    }

    .credentials-img {
        width: 150px;
        height: 100px;
        border-radius: 30px;
    }

    .dialog-footer {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding-bottom: 20px;
    }

    .el-upload--picture-card i {
        margin-left: 19px;
    }

    textarea {
        text-align-last: auto;
    }

    .c-input {
        width: 70%;
    }
</style>
