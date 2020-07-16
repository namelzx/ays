<template>
    <div style="position: absolute;width: 100%;">
        <div class="head">
            <el-row :gutter="20">
                <el-cascader
                        style="width: 40%;"
                        size="mini"
                        :props="props"
                        filterable
                        clearable

                        ref="car"
                        @visible-change="elCascaderCar"
                        @expand-change="elCascaderCar"
                        change-on-select
                        @change="handleModel"
                        v-model="postFrom.car_model"
                ></el-cascader>
                <el-button type="primary" size="mini" @click="importCarLamp()">批量导入</el-button>
                <el-button type="primary" size="mini" @click="importDow">下载模板</el-button>

            </el-row>
        </div>
        <div class="table">
            <div class="list" v-for="(item,index) in list" @click="handleView(item)">
                <div class="title" v-if="item.carmodel">{{item.carmodel.carseries.series_name}}
                    {{item.carmodel.model_name}}
                </div>
                <div class="light">
                    <div>近光:<span>{{item.dipped_title?item.dipped_title:'无'}}</span></div>
                    <div>远光:<span>{{item.high_title?item.high_title:'无'}}</span></div>
                    <div>雾灯:<span>{{item.fog_title?item.fog_title:'无'}}</span></div>
                    <div>转向辅助:<span>{{item.auxiliary_title?item.auxiliary_title:'无'}}</span></div>
                </div>
                <div class="plan">
                    <div class="title">灯改方案:</div>
                    <div class="desc">
                        <span>{{item.plan?item.plan:'无'}}</span>
                    </div>
                </div>
                <div class="plan">
                    <div class="title">配货方案:</div>
                    <div class="p-plan">

                        <div class="light" style="margin-top: 0">
                            <div>支架:<span>{{item.holder?item.holder:'无'}}</span></div>
                            <div>易改件:<span>{{item.ygj?item.ygj:'无'}}</span></div>
                            <div>解码:<span>{{item.is_code?item.is_code:'无'}}</span></div>
                            <div>装饰罩:<span>{{item.decorate_text?item.decorate_text:'无'}}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <InfoDta ref="infodata" @updateRow="updateRow"></InfoDta>
        <el-dialog
                title="批量导入方案"
                :visible.sync="importVisible"
                width="70%"
                class="w-dia"
                :before-close="handleClose"
        >
            <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
        </el-dialog>

        <div class="pageclass">
            <div class="pagination-container page">
                <el-pagination
                        v-show="total > 0"
                        :current-page="listQuery.page"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="listQuery.limit"
                        :total="total"
                        background
                        layout="total, sizes, prev, pager, next, jumper"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import {getBrand, getSeries, getModel} from "@/api/tools";
    import {GetModelIdByInfo, importCarLamp} from "@/api/carlamp";
    import UploadExcelComponent from '@/components/UploadExcel/index.vue'

    import InfoDta from "./light/form";
    import {PostDataByCityAll} from "@/api/shop";

    let sel = this;
    export default {
        name: 'index',
        data() {
            return {
                total: 0,
                car: '',
                importVisible: false,
                list: [],
                postFrom: {},
                regionHiera: [],
                listQuery: {
                    limit: 10,
                    page: 1,
                },
                props: {
                    lazy: true,
                    lazyLoad(node, resolve) {
                        const {level, label} = node;
                        console.log(node)
                        if (level === 0) {
                            getBrand().then(res => {
                                var data = res.data;

                                let nodes = [];
                                for (let i = 0; i < data.length; i++) {
                                    nodes.push({label: data[i].name, value: data[i].brandid});
                                }
                                resolve(nodes);
                            });

                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                        }
                        if (level === 1) {
                            getSeries(node.data.value).then(res => {
                                var data = res.data;
                                let nodes = [];
                                for (let i = 0; i < data.length; i++) {
                                    nodes.push({
                                        label: data[i].factory_name + " " + data[i].series_name,
                                        value: data[i].series_id
                                    });
                                }
                                resolve(nodes);
                            });

                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                        }

                        if (level === 2) {
                            getModel(node.data.value).then(res => {
                                var data = res.data;
                                let nodes = [];
                                for (let i = 0; i < data.length; i++) {
                                    nodes.push({
                                        label: data[i].label,
                                        value: data[i].value,
                                        leaf: level >= 2
                                    });
                                }
                                resolve(nodes);
                            });

                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                        }
                        if (level === 3) {
                            let nodes = [];
                            resolve(nodes);
                        }
                    }
                },
            }
        },
        created() {
            getBrand().then(res => {
                this.regionHiera = res.data;
            });
        },
        components: {
            InfoDta,
            UploadExcelComponent
        },
        methods: {
            importDow() {
                let url = 'https://pdpt.oss-cn-beijing.aliyuncs.com/%E6%94%B9%E7%81%AF%E6%96%B9%E6%A1%88%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx';
                window.location.href = url;
            },
            handleClose() {
                this.importVisible = false

            },
            importCarLamp() {
                this.importVisible = true
            },
            beforeUpload(file) {
                const isLt1M = file.size / 1024 / 1024 < 1

                if (isLt1M) {
                    return true
                }

                this.$message({
                    message: 'Please do not upload files larger than 1m in size.',
                    type: 'warning'
                })
                return false
            },
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.fetchList()
            },

            handleCurrentChange(val) {
                this.listQuery.page = 1
                this.fetchList()
            },
            handleSuccess({results, header}) {
                this.tableData = results
                console.log(results)
                importCarLamp(results).then(res => {
                    this.importVisible = false;
                    this.$message.success(res.data.msg);
                })

                this.tableHeader = header
            },

            updateRow(model_id) {

                this.fetchList();
            },

            handleView(item) {
                this.$refs.infodata.handleView(item);
            },
            elCascaderCar() {
                let that = this
                setTimeout(function () {
                    document.querySelectorAll('.el-cascader-node__label').forEach(el => {
                        el.onclick = function () {
                            this.previousElementSibling.click()
                            that.$refs.car.dropDownVisible = false
                        }
                    })
                    document
                        .querySelectorAll('.el-cascader-panel .el-radio')
                        .forEach(el => {
                            el.onclick = function () {
                                that.$refs.car.dropDownVisible = false
                            }
                        })
                }, 100)
            },
            handleModel(e) {
                let model_id = e;
                if (model_id !== undefined) {
                    this.listQuery.model_id = model_id
                    this.fetchList();
                } else {
                    this.list = [];
                }
            },

            fetchList() {

                GetModelIdByInfo(this.listQuery).then(res => {
                    this.list = res.data.data
                    this.total = res.data.total
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pageclass {
        .pagination-container {
            position: fixed;
            bottom: 0;
            padding-top: 4px;
            padding-bottom: 9px;
            background: #ffffff;
            width: 100%;
            padding-left: 20px;
            /*text-align: c;*/
        }
    }

    .table {

        height: 400px;
        /*background: coral;*/
        /*overflow-x: hidden;*/
        margin-bottom: 100rem;
        margin-top: 150px;
        overflow-y: scroll;
    }

    .head {
        width: 85%;
        text-align: center;
        height: 100px;
        line-height: 100px;
        position: fixed;
        background: #fff;
        /*border-bottom: 1px solid;*/
        box-shadow:0 2px 12px 0 rgba(0, 0, 0, .12);
    }

    .list {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        width: 80%;
        margin: auto;
        padding: 30px;
        font-size: 13px;
        line-height: 1.5;
        margin-bottom: 10px;
        margin-top: 15px;

        .plan {
            display: flex;
            flex-direction: row;
            margin-top: 10px;

            .title {
                width: 80px;
                color: #666666;
            }

            .desc {
                span {
                    font-size: 13px;
                }
            }

        }

        .light {
            display: flex;
            flex-direction: row;
            margin-top: 10px;

            div {
                margin-right: 30px;
                color: #666666;

                span {
                    color: black;
                    margin-left: 10px;

                }
            }
        }
    }
</style>
