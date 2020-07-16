<template>
    <div>
        <el-dialog
                title="信息修改"
                :visible.sync="dialogVisible"
                width="50%"
                class="w-dia"
                :before-close="handleClose"
        >
            <div class="dia-content">
                <div class="c-data">
                    <!--<div class="c-title">配件信息</div>-->
                    <div class="c-content">
                        <div class="ct-item">
                            <span class="label">近光</span>
                            <div class="c-input">

                                <el-cascader
                                        size="mini"
                                        :options="led"
                                        clearable
                                        v-model="postFrom.dipped_id"
                                        :props="{ checkStrictly: true }"
                                        clearable
                                ></el-cascader>
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">转向辅助</span>
                            <div class="c-input">

                                <el-cascader
                                        size="mini"
                                        :options="led"
                                        clearable
                                        v-model="postFrom.auxiliary_id"
                                        :props="{ checkStrictly: true }"
                                        clearable
                                ></el-cascader>
                            </div>
                        </div>


                        <div class="ct-item">
                            <span class="label">双光透镜</span>
                            <div class="c-input">
                                <el-cascader
                                        size="mini"
                                        :options="led"
                                        clearable
                                        v-model="postFrom.through_id"
                                        :props="{ checkStrictly: true }"
                                        clearable
                                ></el-cascader>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="c-data">
                    <!--<div class="c-title">配件信息</div>-->
                    <div class="c-content">
                        <div class="ct-item">
                            <span class="label">远光</span>
                            <div class="c-input">

                                <el-cascader
                                        size="mini"
                                        :options="led"
                                        clearable
                                        v-model="postFrom.high_id"
                                        :props="{ checkStrictly: true }"
                                        clearable
                                ></el-cascader>
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">雾灯</span>
                            <div class="c-input">
                                <el-cascader
                                        size="mini"
                                        :options="led"
                                        clearable
                                        v-model="postFrom.fog_id"
                                        :props="{ checkStrictly: true }"
                                        clearable
                                ></el-cascader>
                            </div>
                        </div>

                    </div>

                </div>
                <div class=" plan">
                    <span class="label">灯改方案</span>
                    <div class="c-input">
                        <el-input
                                style="width: 100%"
                                type="textarea"
                                :autosize="{ minRows: 6, maxRows: 8}"
                                v-model="postFrom.plan"
                                size="mini"
                                placeholder="请输入内容"
                        />


                    </div>
                </div>
                <div class="c-data">
                    <div class="c-title">配货方案</div>
                    <div class="c-content">
                        <div class="ct-item">
                            <span class="label">支架</span>
                            <div class="c-input">
                                <el-input
                                        size="mini"
                                        v-model="postFrom.holder"
                                />
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">装饰罩</span>
                            <div class="c-input">
                                <el-input
                                        size="mini"
                                        v-model="postFrom.decorate_text"
                                />
                            </div>
                        </div>


                        <div class="ct-item">
                            <span class="label">近光转接线</span>
                            <div class="c-input">
                                <el-input
                                        size="mini"
                                        v-model="postFrom.low_beam"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="c-data">
                    <div class="c-title">&nbsp;</div>
                    <div class="c-content">
                        <div class="ct-item">
                            <span class="label">易改件</span>
                            <div class="c-input">
                                <el-input
                                        size="mini"
                                        v-model="postFrom.ygj"
                                />
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">解码</span>
                            <div class="c-input">
                                <el-input
                                        size="mini"
                                        v-model="postFrom.is_code"
                                />
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">远光转接线</span>
                            <div class="c-input">
                                <el-input
                                        size="mini"
                                        v-model="postFrom.in_the"
                                />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <span slot="footer" class="dialog-footer">


        <el-button
                type="primary"
                size="mini"
                @click="handleSave()"
        >确认修改</el-button
        >
        <el-button size="mini" @click="handleClose">关闭</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    import {PostDataBySave} from "@/api/carlamp";
    import {GetLedByTree} from "@/api/led";


    import {mapGetters} from "vuex";

    const defaultForm = {
        dipped_subname: '',
        high_subname: '',
        fog_subname: '',
        auxiliary_subname: '',
        plan: '',
        holder: '',
        ygj: '',
        is_code: '',
        decorate_text: ''
    };

    export default {
        name: "SendOrder",
        data() {
            return {
                led: [],
                dialogVisible: false,
                postFrom: {},
                ygj: [
                    {
                        label: "无",
                        value: "无"
                    },
                    {
                        label: "随货发",
                        value: "随货发"
                    },
                    {
                        label: "供应商代发",
                        value: "供应商代发"
                    },
                    {
                        label: "支架",
                        value: "支架"
                    }
                ], //易改件

            };
        },
        computed: {
            ...mapGetters(["userinfo", "brand"])
        },
        created() {
            this.getled();
        },
        mounted() {
            console.log(this.userinfo);
        },
        methods: {
            getled() {
                GetLedByTree().then(res => {
                    this.led = res.data
                })
            },
            handleSave() {
                this.postFrom.high_id=this.postFrom.high_id.join(',')
                this.postFrom.dipped_id=this.postFrom.dipped_id.join(',')
                this.postFrom.fog_id=this.postFrom.fog_id.join(',')

                this.postFrom.auxiliary_id=this.postFrom.auxiliary_id.join(',')

                this.postFrom.through_id=this.postFrom.through_id.join(',')

                PostDataBySave(this.postFrom).then(res => {
                    console.log(res)
                    this.$message.success('更新成功')
                    this.dialogVisible = false
                    this.$emit('updateRow', this.postFrom.model_id)
                })
            },
            handleView(row) {
                this.dialogVisible = true;
                this.postFrom = row
                if (row.dipped_id !== null) {
                    if (row.dipped_id.constructor === String) {
                        this.postFrom.dipped_id = this.postFrom.dipped_id.split(',')
                    }
                    let lazada = this.postFrom.dipped_id
                    this.postFrom.dipped_id = []

                    for (let i = 0; i < lazada.length; i++) {
                        this.postFrom.dipped_id.push(parseInt(lazada[i]))
                    }
                }


                if (row.auxiliary_id !== null) {
                    if (row.auxiliary_id.constructor === String) {
                        this.postFrom.auxiliary_id = this.postFrom.auxiliary_id.split(',')
                    }
                    let lazada = this.postFrom.auxiliary_id
                    this.postFrom.auxiliary_id = []

                    for (let i = 0; i < lazada.length; i++) {
                        this.postFrom.auxiliary_id.push(parseInt(lazada[i]))
                    }
                }


                if (row.high_id !== null) {
                    if (row.high_id.constructor === String) {
                        this.postFrom.high_id = this.postFrom.high_id.split(',')
                    }
                    let lazada = this.postFrom.high_id
                    this.postFrom.high_id = []

                    for (let i = 0; i < lazada.length; i++) {
                        this.postFrom.high_id.push(parseInt(lazada[i]))
                    }
                }

                if (row.fog_id !== null) {
                    if (row.fog_id.constructor === String) {
                        this.postFrom.fog_id = this.postFrom.fog_id.split(',')
                    }
                    let lazada = this.postFrom.fog_id
                    this.postFrom.fog_id = []

                    for (let i = 0; i < lazada.length; i++) {
                        this.postFrom.fog_id.push(parseInt(lazada[i]))
                    }
                }


                if (row.through_id !== null) {
                    if (row.through_id.constructor === String) {
                        this.postFrom.through_id = this.postFrom.through_id.split(',')
                    }
                    let lazada = this.postFrom.through_id
                    this.postFrom.through_id = []

                    for (let i = 0; i < lazada.length; i++) {
                        this.postFrom.through_id.push(parseInt(lazada[i]))
                    }
                }

            },
            handleClose() {
                this.dialogVisible = false;
            },

        }
    };
</script>
<style lang="scss" spend>
    .plan {
        display: flex;
        flex-direction: row;
        width: 100%;

        .label {
            width: 50px;
            text-align-last: justify;
            margin-right: 10px;

        }
    }

    .install-btn > .el-button--mini {
        padding: 5px 10px;
    }

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
            margin-bottom: 30px;

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
                text-align-last: justify;
                align-items: center;
                margin-bottom: 3px;

                .d_code {
                    display: flex;
                    flex-direction: row;
                    width: 60%;

                    .el-select {
                        width: 50%;
                    }
                }

                .label {
                    width: 25%;
                    margin-right: 10px;
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

        .el-dialog {
            margin-top: 5vh !important;
        }

        .table {
            margin-bottom: 5px !important;
        }
    }

    .credentials-img {
        width: 150px;
        height: 100px;
        border-radius: 30px;
    }

    .c-input {
        width: 85%;
        margin-right: 10px;
    }
</style>
