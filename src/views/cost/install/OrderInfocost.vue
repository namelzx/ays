<template>
    <el-dialog :title="Stitle" :visible.sync="infodialogVisible" width="50%" :before-close="handleClose">
        <div id="print">
            <DetailsInfo :postFrom="postFrom"/>
            <div style="margin-top: 30px">
                <Timeline :activities="loglist"/>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
       <el-button size="mini" @click="handelPirintin">打印</el-button>
      <el-button size="mini" @click="handleClose">关闭</el-button>
    </span>
    </el-dialog>
</template>

<script>
    import DetailsInfo from './info/operationinfo'
    import DetailsPrint from './info/operatprint'
    // import InstallInfo from "./info/install";

    import Timeline from './info/timeline'
    import returnVisit from './info/returnVisit'

    import {
        GetIdByOrderLog,
        GetTypeBySale,
        PostDataBySale,
        GetIdByinstaOrderLog
    } from '@/api/costorder'

    import Upload from '@/components/Upload/uploadList'

    import config from '@/config'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Info',

        computed: {
            ...mapGetters(['userinfo', 'brand', 'group'])
        },
        components: {
            DetailsInfo,
            Timeline,
            DetailsPrint,
            returnVisit,
            Upload
        },
        props: {
            postFrom: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            infodialogVisible: {
                type: Boolean,
                default: false
            },
            Stitle: {
                type: String,
                default: '费用单详情'
            }
        },
        data() {
            return {
                activeName: "payinstall",
                permissions: [], // 权限组

                reTitle: '',
                sale: [],

                returninnerVisible: false,
                content: '',
                img: [],
                activeName: 'install',
                loglist: [],
                config: {
                    fileName: 'file',
                    limit: 5,
                    multiple: false,
                    accept: 'image/*',
                    action: config.uploadUrl.img,
                    drag: false
                },
                imglist: [],
                videolist: []
            }
        },
        created() {
            this.permissions = this.group.btn.split(',')

            if (this.postFrom.imglist) {
                this.imglist = this.postFrom.imglist.split(',')
            }
            if (this.postFrom.videolist) {
                this.videolist = this.postFrom.videolist.split(',')
            }
            GetIdByOrderLog(this.postFrom.id).then(res => {
                this.loglist = res.data
            })
        },
        methods: {
            handelPirintin() {
                let subOutputRankPrint = document.getElementById('print');
                console.log(subOutputRankPrint.innerHTML)
                let newContent = subOutputRankPrint.innerHTML
                let oldContent = document.body.innerHTML
                let bdhtml = window.document.body.innerHTML;
                let sprnstr = "<!--startprint-->";
                let eprnstr = "<!--endprint-->";
                let prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17);
                prnhtml = prnhtml.substr(0, prnhtml.indexOf(eprnstr));
                window.document.body.innerHTML = prnhtml;
                document.body.innerHTML = newContent
                window.print();
                window.location.reload();
                document.body.innerHTML = oldContent;
                return false;
            },
            handelRuimg() {
            },

            rolesbtn(val) {
                var index = this.permissions.indexOf(val)
                if (index > -1) {
                    return true
                } else {
                    return false
                }
            },
            // 添加售后数据
            handelContent() {
                var data = {
                    content: this.content,
                    img: this.img.join('|'),
                    type: this.activeName,
                    order_id: this.postFrom.id
                }
                PostDataBySale(data).then(res => {
                    console.log(res)
                    this.getsale()
                    this.returninnerVisible = !this.returninnerVisible
                })
            },

            getsale() {
                var temp = {
                    order_id: this.postFrom.id,
                    type: this.activeName
                }
                GetTypeBySale(temp).then(res => {
                    // this.sale=res.data
                    var arr = []
                    for (let i = 0; i < res.data.length; i++) {
                        arr[i] = res.data[i]
                        arr[i].img = res.data[i].img.split('|')
                    }
                    this.sale = arr
                })
            },
            // 组件图片上传
            handelRuimg(row) {
                this.img = row
                console.log(row)
            },
            handleClose() {
                this.$emit('handelInfoDialog', !this.infodialogVisible)
            },
            handleClick(tab, event) {
                //


                if (tab.paneName === 'instalog') {
                    this.loglist = []
                    GetIdByinstaOrderLog(this.postFrom.order_id).then(res => {
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
            }
        }
    }
</script>

<style lang="scss">
    .returnform {
        .el-form-item__label {
            line-height: 12px !important;
        }
    }

    .returnform {
        .el-upload {
            width: 100px !important;
            height: 100px !important;
        }

        .image-uploader .el-upload-list__item {
            width: 100px !important;
            height: 100px !important;
        }

        .el-upload--picture-card {
            line-height: 106px !important;
        }
    }
</style>
