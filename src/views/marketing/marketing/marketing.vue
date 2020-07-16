<template>
    <div class="main">
        <!-- 搜索模块 -->
        <!-- 弹出处理 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" width="25%" :before-close="handleClose">

            <el-dialog
                    width="30%"
                    title="补充内容"
                    :visible.sync="innerVisible"
                    append-to-body>
                <el-form :model="postdata">
                    <el-form-item label="标题">
                        <el-input v-model="postdata.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="链接地址" v-if="datafrom.type==='图文'">
                        <el-input v-model="postdata.link_url" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-row>
                        <el-button
                                type="primary"
                                size="mini"
                                @click="downloadZip"
                        >下载
                        </el-button>
                        <el-button size="mini" @click="innerVisible=false">取消</el-button>
                    </el-row>
                </el-form>
            </el-dialog>

            <div class="video" v-for="(item, index) in video" :key="index" v-if="datafrom.type=='视频'">
                <video :src="item.url" style="width: 200px;height: 100px;" controls="controls"></video>
            </div>

            <div class="video" :key="index" v-for="(item,index) in datafrom.imagetext" v-if="datafrom.type=='图文'">
                <el-image :src="item"></el-image>

            </div>
            <div class="vi-bootm">
                <el-row>
                    <el-button
                            type="primary"
                            size="mini"
                            @click="ToheadDownload"
                    >下载
                    </el-button>
                    <el-button size="mini" @click="handleClose">取消</el-button>
                </el-row>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {GetDataBylist, PostStatusByData} from "@/api/marketing";
    import {parseTime} from "@/utils";

    import JSZip from 'jszip'
    import FileSaver from 'file-saver'

    export default {
        name: "instal",
        data() {
            return {
                innerVisible: false,
                postdata: {},
                listQuery: {
                    order_id: null,
                    page: 1,
                    limit: 10,
                    startTime: undefined,
                    sstatus: "all"
                },
                total: 0,
                total1: 0,
                total2: 0,
                total3: 0,
                listLoading: true,
                tableData: [],
                dialogVisible: false,
                video: [],
                title: '',
                is_video_status: undefined, //视频处理状态
                order_id: undefined,
                datafrom: {}
            };
        },
        filters: {
            StrText(str) {
                if (str === 1) {
                    return "已处理";
                } else {
                    return "待处理";
                }
            }
        },
        created() {
        },
        methods: {

            handleClose() {
                this.dialogVisible = false;
            },
            handleEdit(row) {
                this.title = row.order_id + '-' + '推广详情' + row.type + '-' + '处理'
                this.dialogVisible = true;
                this.video = row.video;
                this.datafrom = row;
                this.is_video_status = row.is_video_status;
                this.order_id = row.id;
            },
            open() {
                this.$message({
                    message: "请先选中视频！",
                    type: "warning"
                });
            },
            open2() {
                this.$message({
                    message: "恭喜你，已开始下载！",
                    type: "success"
                });
            },
            open4() {
                this.$message.error("下载视频，请重新下载。");
            },
            ToheadDownload() {
                this.innerVisible=true
            },

            downloadZip() {
                let data = this.datafrom.video;
                let imagetext = this.datafrom.imagetext;

                let arr = [];

                let type = this.datafrom.type
                let ki = 0;

                if (type === '视频') {
                    if(this.postdata.title===undefined||this.postdata.title===''){
                        this.$message.error('标题不能为空');
                        return;
                    }
                    if (data.length === 0) {
                        this.$message.error('无数据下载');
                        return;
                    }
                    data.forEach(item => {
                        ki++
                        var timestamp = Date.parse(new Date())
                        arr.push({fileUrl: item.url, renameFileName: item.order_id + timestamp + ki + '.mp4'})
                    })
                    this.filesToRar(arr, '案例打包')


                    let temp = {
                        id: this.datafrom.id,
                        filed: 'status',
                        status: 1,
                        title: '下载视频案例',
                        totitle:this.postdata.title
                    }

                    PostStatusByData(temp).then(res => {
                        if (res.code === 20000) {
                            this.dialogVisible = false;
                            this.innerVisible=false
                            this.$emit('handleUpdate')

                            this.open2();
                        } else {
                            this.open4();
                        }
                    });


                }
                if (type === '图文') {

                    if(this.postdata.title===undefined||this.postdata.title===''){
                        this.$message.error('标题不能为空');
                        return;
                    }
                    if(this.postdata.link_url===undefined||this.postdata.link_url===''){
                        this.$message.error('链接不能为空');
                        return;
                    }
                    arr = [
                        {
                            fileUrl: imagetext.passing_light_qt,
                            renameFileName: '近光墙图.jpg'
                        },
                        {
                            fileUrl: imagetext.front,
                            renameFileName: '车辆正面.jpg'
                        },
                        {
                            fileUrl: imagetext.distance_light_qt,
                            renameFileName: '远光近墙图.jpg'
                        },
                        {
                            fileUrl: imagetext.product,
                            renameFileName: '产品配置图.jpg'
                        },
                        {
                            fileUrl: imagetext.other_one,
                            renameFileName: '其他1.jpg'
                        },
                        {
                            fileUrl: imagetext.assembly,
                            renameFileName: '总成.jpg'
                        },
                        {
                            fileUrl: imagetext.vehiclebreaking,
                            renameFileName: '拆车后.jpg'
                        },
                        {
                            fileUrl: imagetext.coating,
                            renameFileName: '总成覆膜图.jpg'
                        },
                        {
                            fileUrl: imagetext.open_assembly,
                            renameFileName: '开总成图.jpg'
                        },
                        {
                            fileUrl: imagetext.gelresin,
                            renameFileName: '清胶图.jpg'
                        },

                        {
                            fileUrl: imagetext.lens,
                            renameFileName: '透镜安装.jpg'
                        },
                        {
                            fileUrl: imagetext.situdimming,
                            renameFileName: '原位调光图.jpg'
                        },
                        {
                            fileUrl: imagetext.inject_glue,
                            renameFileName: '注胶过程图.jpg'
                        },
                        {
                            fileUrl: imagetext.truck_loading,
                            renameFileName: '装车图.jpg'
                        },
                        {
                            fileUrl: imagetext.other_tow,
                            renameFileName: '其他2.jpg'
                        },
                        {
                            fileUrl: imagetext.rear_passing_light_qt,
                            renameFileName: '安装后近光墙.jpg'
                        },
                        {
                            fileUrl: imagetext.rear_front,
                            renameFileName: '正面.jpg'
                        },
                        {
                            fileUrl: imagetext.rear_distance_light_qt,
                            renameFileName: '远光后.jpg'
                        },
                        {
                            fileUrl: imagetext.rear_light_feature,
                            renameFileName: '车灯特写.jpg'
                        },
                        {
                            fileUrl: imagetext.rear_passing_light_way,
                            renameFileName: '近光照路.jpg'
                        },
                        {
                            fileUrl: imagetext.rear_distance_light_way,
                            renameFileName: '远光照路.jpg'
                        },
                        {
                            fileUrl: imagetext.other_tow_three,
                            renameFileName: '其他三.jpg'
                        },
                    ]
                    var timestamp = Date.parse(new Date())
                    this.filesToRar(arr, '案例打包' + timestamp)
                    let temp = {
                        id: this.datafrom.id,
                        filed: 'status',
                        status: 1,
                        title: '下载图文案例',
                        totitle:this.postdata.title,
                        link_url:this.postdata.link_url
                    }
                    PostStatusByData(temp).then(res => {
                        if (res.code === 20000) {
                            this.dialogVisible = false;
                            this.innerVisible=false
                            this.$emit('handleUpdate')

                            this.open2();
                        } else {
                            this.open4();
                        }
                    });
                }
            },


            /**文件打包
             * arrImages:文件list:[{fileUrl:文件url,renameFileName:文件名}]
             * filename 压缩包名
             * */
            filesToRar(arrImages, filename) {
                let _this = this;
                let zip = new JSZip();
                let cache = {};
                let promises = [];
                _this.title = '正在加载压缩文件';

                for (let item of arrImages) {
                    const promise = _this.getImgArrayBuffer(item.fileUrl).then(data => {
                        // 下载文件, 并存成ArrayBuffer对象(blob)
                        zip.file(item.renameFileName, data, {binary: true}); // 逐个添加文件
                        cache[item.renameFileName] = data;
                    });
                    promises.push(promise);
                }

                Promise.all(promises).then(() => {
                    zip.generateAsync({type: "blob"}).then(content => {
                        _this.title = '正在压缩';
                        // 生成二进制流
                        FileSaver.saveAs(content, filename); // 利用file-saver保存文件  自定义文件名
                        _this.title = '压缩完成';
                    });
                }).catch(res => {
                    _this.$message.error('文件压缩失败');
                });
            },
            //获取文件blob
            getImgArrayBuffer(url) {
                let _this = this;
                return new Promise((resolve, reject) => {
                    let xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("GET", url, true);
                    xmlhttp.responseType = "blob";
                    xmlhttp.onload = function () {
                        if (this.status == 200) {
                            resolve(this.response);
                        } else {
                            reject(this.status);
                        }
                    }
                    xmlhttp.send();
                });

            },
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .main {
        padding: 20px;

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

        .filter-container {
            margin: 20px 0;
            width: 100%;
            position: relative;
        }

        .filter-search {
            position: absolute;
            right: 37%;
            top: 4px;
        }

        .dn .el-form-item .el-form-item__label {
            width: 26%;
        }

        .dn .el-form-item__label {
            font-size: 11px;
            font-weight: 400;
        }

        .new-table {
            padding-bottom: 30px;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
            "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
            display: flex;
            font-size: 12px;
            flex-direction: column;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

            .tab {
                height: 50px;
                border-bottom: 1px solid #e4e7ed;
                margin-bottom: 10px;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding-left: 27px;
                padding-right: 20px;
                line-height: 1.5;
                font-size: 12px;

                .list-item {
                    display: flex;
                    justify-content: center;
                    width: 10%;
                    font-weight: 500;

                    .price {
                        color: red;
                    }
                }

                .che {
                    width: 3%;
                }

                .selected {
                    position: relative;
                    color: #409eff;
                }

                .selected::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: -9px;
                    width: 100%;
                    height: 2px;
                    background-color: #409eff;
                    z-index: 1;
                }
            }

            .tab_warp {
                .no-data {
                    text-align: center;
                    margin: 30px 0;
                }
            }
        }

        .video {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
        }

        .vi-bootm {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            margin: 20px 0 0;
        }
    }
</style>
