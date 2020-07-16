<template>
    <div class="mb">
        <el-dialog
                title="推广营销详情"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="推广素材" name="payinstall">
                    <div class="video" v-if="formdata.type==='视频'" v-for="(item, index) in formdata.video" :key="index">
                        <video :src="item.url" style="width: 200px;height: 100px;" controls="controls"></video>
                    </div>

                    <div class="video" :key="index" v-for="(item,index) in formdata.imagetext" v-if="formdata.type=='图文'">
                        <el-image style="width: 10rem;height: 5rem" :src="item" ></el-image>

                    </div>
                    <!--                    <DetailsInfo :postFrom="OrderInfo"></DetailsInfo>-->
                </el-tab-pane>
                <el-tab-pane label="日志" name="paylog">

                    <el-timeline-item
                            v-for="(activity, index) in formdata.marketinglog"
                            :key="index"
                            color="#1d9ffc"
                            :timestamp="activity.title ">
                        {{activity.create_time}}
                    </el-timeline-item>
                    <!--                    <Timeline :activities="loglist"></Timeline>-->
                </el-tab-pane>

            </el-tabs>

            <span slot="footer" class="dialog-footer">
                    <el-button
                            type="primary"
                            size="mini"
                            @click="downloadZip"
                    >下载
                    </el-button>
    <el-button @click="dialogVisible = false">关闭</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import {GetDataBylist, PostDataByUpdate, PostStatusByData} from "@/api/marketing";

    import JSZip from 'jszip'
    import FileSaver from 'file-saver'

    export default {
        name: "form",
        data() {
            return {
                is_video_status: undefined,
                activeName: 'payinstall',
                dialogVisible: false,
                formdata: {}
            }
        },
        methods: {
            handleView(row) {
                console.log(row)
                this.dialogVisible = true
                this.formdata = row

            },

            downloadZip() {
                console.log(this.datafrom)
                let data = this.formdata.video;
                let imagetext = this.formdata.imagetext;

                let arr = [];

                let type = this.formdata.type
                if (type === '视频') {
                    if (data.length === 0) {
                        this.$message.error('无数据下载');
                        return;
                    }
                    data.forEach(item => {
                        arr.push({fileUrl: item.url, renameFileName: item.order_id + '.mp4'})
                    })
                    this.filesToRar(arr, '案例打包')


                }
                if (type === '图文') {

                    arr=[
                        {
                            fileUrl:imagetext.passing_light_qt,
                            renameFileName:'近光墙图.jpg'
                        },
                        {
                            fileUrl:imagetext.front,
                            renameFileName:'车辆正面.jpg'
                        },
                        {
                            fileUrl:imagetext.distance_light_qt,
                            renameFileName:'远光近墙图.jpg'
                        },
                        {
                            fileUrl:imagetext.product,
                            renameFileName:'产品配置图.jpg'
                        },
                        {
                            fileUrl:imagetext.other_one,
                            renameFileName:'其他1.jpg'
                        },
                        {
                            fileUrl:imagetext.assembly,
                            renameFileName:'总成.jpg'
                        },
                        {
                            fileUrl:imagetext.vehiclebreaking,
                            renameFileName:'拆车后.jpg'
                        },
                        {
                            fileUrl:imagetext.coating,
                            renameFileName:'总成覆膜图.jpg'
                        },
                        {
                            fileUrl:imagetext.open_assembly,
                            renameFileName:'开总成图.jpg'
                        },
                        {
                            fileUrl:imagetext.gelresin,
                            renameFileName:'清胶图.jpg'
                        },

                        {
                            fileUrl:imagetext.lens,
                            renameFileName:'透镜安装.jpg'
                        },
                        {
                            fileUrl:imagetext.situdimming,
                            renameFileName:'原位调光图.jpg'
                        },
                        {
                            fileUrl:imagetext.inject_glue,
                            renameFileName:'注胶过程图.jpg'
                        },
                        {
                            fileUrl:imagetext.truck_loading,
                            renameFileName:'装车图.jpg'
                        },
                        {
                            fileUrl:imagetext.other_tow,
                            renameFileName:'其他2.jpg'
                        },
                        {
                            fileUrl:imagetext.rear_passing_light_qt,
                            renameFileName:'安装后近光墙.jpg'
                        },
                        {
                            fileUrl:imagetext.rear_front,
                            renameFileName:'正面.jpg'
                        },
                        {
                            fileUrl:imagetext.rear_distance_light_qt,
                            renameFileName:'远光后.jpg'
                        },
                        {
                            fileUrl:imagetext.rear_light_feature,
                            renameFileName:'车灯特写.jpg'
                        },
                        {
                            fileUrl:imagetext.rear_passing_light_way,
                            renameFileName:'近光照路.jpg'
                        },
                        {
                            fileUrl:imagetext.rear_distance_light_way,
                            renameFileName:'远光照路.jpg'
                        },
                        {
                            fileUrl:imagetext.other_tow_three,
                            renameFileName:'其他三.jpg'
                        },
                    ]
                    this.filesToRar(arr, '案例打包'+new Date())
                    let  temp = {
                        id: this.datafrom.id,
                        filed: 'status',
                        status: 1,
                        title:'下载图文案例'
                    }
                    PostStatusByData(temp).then(res => {
                        console.log(res);
                        if (res.code === 20000) {
                            for (let i = 0; i < this.video.length; i++) {
                                window.location.href = this.video[i].url;
                            }
                            this.dialogVisible = false;

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
            handleClose() {
                this.dialogVisible = false
            },
            handleClick(tab, event) {
                //
                if (tab.paneName === 'paylog') {
                    this.loglist = []
                    // GetIdByOrderLog(this.OrderInfo.id).then(res => {
                    //     this.loglist = res.data
                    // })
                }

                if (tab.paneName === 'instalog') {
                    this.loglist = []
                    GetIdByinstaOrderLog(this.OrderInfo.order_id).then(res => {
                        this.loglist = res.data
                    })
                }


                if (tab.paneName === 'return') {
                    this.getsale()
                }
                console.log('售后服务')

                if (tab.paneName === 'sales') {
                    this.getsale()
                }
            },
            headDownload() {
                let id = this.formdata.order_id;
                let idslist = [];
                let chenum = this.formdata.video.length;
                let che = 0;
                for (let i = 0; i < this.formdata.video.length; i++) {
                    if (this.formdata.video[i].status === true) {
                        che++;
                        idslist.push(this.formdata.video[i].id);
                    } else {
                        console.log("还没选择");
                    }
                }
                let temp = {
                    ids: [],
                    id: ""
                };
                temp.ids = idslist.join(",");
                temp.id = this.formdata.order_id;
                if (chenum === che) {
                    PostDataByUpdate(temp).then(res => {
                        console.log(res);
                        if (res.code === 20000) {
                            for (let i = 0; i < this.formdata.video.length; i++) {
                                window.location.href = this.formdata.video[i].url;
                            }
                            this.dialogVisible = false;
                            this.$message({
                                message: "恭喜你，已开始下载！",
                                type: "success"
                            });
                        } else {
                            this.$message.error("下载视频，请重新下载。");

                        }
                    });
                } else {
                    this.$message.error("请选择下载的视频。");
                }
            }


        },
    }
</script>

<style lang="scss" scoped>
    .mb >>>   .el-dialog__body{
        padding-top: 0 !important;
    }
</style>