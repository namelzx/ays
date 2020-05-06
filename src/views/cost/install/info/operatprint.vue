<template>
    <div>
        <div class="dia-content" v-if="print">
            <div class="c-data">
                <!--<div class="c-title">配件信息</div>-->
                <div class="c-content">
                    <div class="ct-item">
                        <span class="label">状态</span>
                        <div class="c-input">
                            <el-input  v-model="postFrom.status" size="mini" disabled placeholder="请输入内容"/>
                        </div>
                    </div>
                    <div class="ct-item">
                        <span class="label">开户行</span>
                        <div class="c-input">
                            <el-input v-model="postFrom.bank" size="mini" disabled placeholder="请输入内容"/>
                        </div>
                    </div>


                    <div class="ct-item">
                        <span class="label">账号</span>
                        <div class="c-input">
                            <el-input v-model="postFrom.bank_account" size="mini" disabled placeholder="请输入内容"/>
                        </div>
                    </div>

                    <div class="ct-item">
                        <span class="label">姓名</span>
                        <div class="c-input">
                            <el-input v-model="postFrom.bank_name" size="mini" disabled placeholder="请输入内容"/>
                        </div>
                    </div>

                    <div class="ct-item">
                        <span class="label">备注</span>
                        <div class="c-input">
                            <el-input v-model="postFrom.desc" size="mini" disabled placeholder="请输入内容"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="c-data">
                <!--<div class="c-title">配件信息</div>-->
                <div class="ct-item">
                    <span class="label">平台</span>
                    <div class="c-input">
                        <el-input v-model="postFrom.lazada_title" size="mini" disabled placeholder="请输入内容"/>
                    </div>
                </div>
                <div class="c-content">
                    <div class="ct-item">
                        <span class="label">类别</span>
                        <div class="c-input">
                            <el-select
                                    v-model="postFrom.retype"
                                    size="mini"
                                    disabled
                                    filterable
                                    placeholder="请选择"
                            >
                                <el-option v-for="item in retype" :label="item.label" :value="item.value"/>
                            </el-select>
                        </div>
                    </div>




                </div>
                <div class="ct-item">
                    <span class="label">金额</span>
                    <div class="c-input">
                        <el-input v-model="postFrom.no_price" size="mini" disabled placeholder="请输入内容"/>
                    </div>
                </div>
                <div class="ct-item">
                    <span class="label">客服</span>
                    <div class="c-input">
                        <el-input v-model="postFrom.proposer" size="mini" disabled placeholder="请输入内容"/>
                    </div>
                </div>

                <div class="ct-item">
                    <span class="label">下单日期</span>
                    <div class="c-input">
                        <el-input v-model="postFrom.create_time" size="mini" disabled placeholder="请输入内容"/>
                    </div>
                </div>

            </div>

            <div style="display: flex;flex-direction: row">
                <div class="imglist" v-if="imglist.length>0">
                    <img v-for="item in imglist" style="width: 80px;height: 80px;" v-if="item" :src="item"
                         @click="handleImg(item)">
                </div>

                <div class="videolist" style="display: flex;flex-direction: row" v-if="videolist.length>0">
                    <video
                            v-for="item in videolist"
                            controls
                            v-if="item"
                            style="width: 80px;height: 80px;"
                            :src="item"
                    />
                </div>
            </div>
        </div>


    </div>
</template>

<script>

    import {getBrand, getSeries, getModel} from '@/api/tools'

    import {GetSaleByAll} from '@/api/salesman'
    import {regionDataPlus} from 'element-china-area-data'
    import {mapGetters} from 'vuex'
    import {GetDataByShopAll} from '@/api/shop'

    import {change, changeAll, del, delAll, GetDataByList, PostDataByAdd, GetIdBypayOrderLog} from '@/api/order'

    import {GetecshopByList} from '@/api/ecshop'
    import {getArrByKey, parseTime, pickerOptions} from '@/utils'
    import openWindow from '@/utils/openWindow'

    const defaultForm = {
        logcontent: '',
        openid: 'oQJN40ldFZYLvqoIZm3NGwFu8oKA',
        lazada_id: '',
        lazada_list: '',
        lazada_index: '',
        buy_order_no: '12123',
        buy_account: '199',
        buy_product_id: '',
        no_price: '199',
        contact: '梁泽祥',
        tel: '18677947067',
        city_code: undefined,
        city_desc: '',
        number_plate: 'A871237',
        car_model: undefined,
        car_index: '',
        car_model_id: ''
    }

    export default {
        name: 'sendOrder',
        data() {
            return {
                img: [],
                colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
                imglist: [],
                videolist: [],
                value2: 5,
                shopQuery: {
                    cityCode: undefined,
                    shopname: undefined,
                    tel: undefined
                },
                retype: [
                    {
                        label: '售后退款',
                        value: '售后退款'
                    },
                    {
                        label: '返现奖励',
                        value: '返现奖励'
                    },
                    {
                        label: '其他',
                        value: '其他'
                    }

                ],//
                innerVisible: false,
                // dialogVisible: false,
                checked: true,
                tableKey: 0,
                CarModellist: [],//车型数据
                lazada: [],//所有平台
                salesman: [],//所有业务员
                holder: [
                    {
                        label: '有',
                        value: 1
                    },
                    {
                        label: '无',
                        value: 2
                    }
                ],//支架
                ygj: [
                    {
                        label: '有',
                        value: 1
                    },
                    {
                        label: '随机发',
                        value: 2
                    },
                    {
                        label: '供应商代发',
                        value: 3
                    }
                ],//易改件
                device: [],//装置罩
                carl: [],
                list: null,
                total: null,

                // postFrom: Object.assign({}, defaultForm),
                cityoptions: regionDataPlus,//地址
                selectedRows: null,
                listLoading: true,
                showSearch: false,
                options: [],
                shop: [],
                listQuery: {
                    page: 1,
                    limit: 10,
                    status: '-1',
                    title: ''
                },
                props: {
                    lazy: true,
                    lazyLoad(node, resolve) {
                        const {level} = node

                        if (level === 0) {
                            getBrand().then(res => {

                                var data = res.data

                                let nodes = []
                                for (let i = 0; i < data.length; i++) {
                                    nodes.push({label: data[i].name, value: data[i].brandid})
                                }
                                resolve(nodes)

                            })

                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                        }
                        if (level === 1) {
                            getSeries(node.data.value).then(res => {
                                var data = res.data
                                let nodes = []
                                for (let i = 0; i < data.length; i++) {
                                    nodes.push({
                                        label: data[i].factory_name + ' ' + data[i].series_name,
                                        value: data[i].series_id
                                    })
                                }
                                resolve(nodes)

                            })

                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                        }

                        if (level === 2) {
                            getModel(node.data.value).then(res => {
                                var data = res.data
                                let nodes = []
                                for (let i = 0; i < data.length; i++) {
                                    nodes.push({label: data[i].label, value: data[i].value, leaf: level >= 2})
                                }
                                resolve(nodes)

                            })

                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                        }
                        if (level === 3) {
                            let nodes = []
                            resolve(nodes)
                        }
                    }
                },
                buttonDisabled: true,
                deleting: false,
                pickerOptions: pickerOptions,
                currentIndex: -1,

                regionHiera: []
            }
        },
        computed: {
            ...mapGetters([
                'userinfo',
                'brand'
            ])
        },
        props: {
            print:{
                type:Boolean,
                default:true
            },
            postFrom: {
                type: Object,
                default: function () {
                    return Object.assign({}, defaultForm)
                }
            },
            Stitle: {
                type: String,
                default: ''
            },

            is_disabled: {
                type: Boolean,
                default: true

            },
            dialogVisible: {
                type: Boolean,
                default: false
            }

        },
        created() {
            if (this.postFrom.eva) {

                if (this.postFrom.eva.img.constructor === String) {
                    this.img = this.postFrom.eva.img.split(',')
                } else {
                    this.img = this.postFrom.eva.img
                }

            }

            console.log(this.postFrom.imglist)
            if (this.postFrom.imglist) {
                (this.imglist = this.postFrom.imglist.split(','))

            }
            if (this.postFrom.videolist) {
                (this.videolist = this.postFrom.videolist.split(','))
            }

            GetecshopByList().then(res => {
                this.lazada = res.data
            })
            GetDataByShopAll().then(res => {
                this.shop = res.data
            })

            GetSaleByAll().then(res => {
                this.salesman = res.data
            })
        },
        methods: {
            handleImg(img) {
                openWindow(img, '图片预览', '500', '400')
            },

            //所选门店
            handleShop(e) {

                this.postFrom.shop_id = e
                for (let i = 0; i < this.shop.length; i++) {
                    if (e === this.shop[i].id) {
                        this.postFrom.shop_location = this.shop[i].cityName + ' ' + this.shop[i].location
                        this.postFrom.shop_tel = this.shop[i].tel
                        return
                    }
                }
            },
            handleClose() {
                this.$emit('handleClose')

            },
            updateRow() {
                this.postFrom.city_code = this.postFrom.city_code.join(',')
                this.postFrom.car_model = this.postFrom.car_model.join(',')
                if (this.postFrom.status === '待处理') {
                    this.postFrom.status = 1
                    this.postFrom.logcontent = '待确认(业务员)' + ' ' + this.userinfo.realName + '派单 ' + ' ' + '已通知'

                }
                if (this.postFrom.status === '待确认(业务)') {
                    this.postFrom.status = 2
                    this.postFrom.logcontent = '待确认(门店)' + ' ' + this.userinfo.realName + '同意派单,'
                }

                if (this.postFrom.status === '待确认(门店)') {
                    this.postFrom.status = 3
                    this.postFrom.logcontent = '待安装' + ' ' + this.userinfo.realName + '已接单,'
                }
                if (this.postFrom.status === '待安装') {
                    this.postFrom.status = 4

                    this.postFrom.logcontent = '已安装' + ' ' + this.userinfo.realName + '安装完成,'

                }
                if (this.postFrom.status === '已安装') {
                    this.postFrom.status = 5
                    this.postFrom.logcontent = '财审1' + ' ' + this.userinfo.realName + '确认安装,'

                }
                if (this.postFrom.status === '财审1') {
                    this.postFrom.status = 6
                    this.postFrom.logcontent = '财审2' + ' ' + this.userinfo.realName + '审核通过,'

                }
                if (this.postFrom.status === '财审2') {
                    this.postFrom.status = 7
                    this.postFrom.logcontent = '待结算' + ' ' + this.userinfo.realName + '结算通过,'

                }

                PostDataByAdd(this.postFrom).then(res => {
                    this.$emit('handleClose')
                    this.postFrom = Object.assign({}, defaultForm)
                    this.postFrom.city_code = this.postFrom.city_code.splice(',')
                    this.postFrom.car_model = this.postFrom.car_model.splice(',')
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .i-desc {
        width: 100%;
        margin-bottom: 10px;

        .ct-item {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            .label {
                width: 10%;
                text-align-last: justify;
                margin-right: 2%;
            }

            .c-input {
                width: 85%;
            }
        }
    }

    .eva {
        width: 100%;

        .eva-title {
            font-weight: 800;
            margin-bottom: 10px;
        }

        .rate-score {
            display: flex;
            flex-direction: row;

            .product {
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: 12px;
                line-height: 1.5;
                font-weight: 500;

                .item-label {
                    margin-right: 5px;
                }
            }
        }

        .ev-content {
            font-weight: 800;
            line-height: 1.5;
            margin-top: 10px;
            margin-bottom: 10px;

            span {
                font-weight: 800;
                margin-right: 10px;
            }
        }

        .rate-img {
            display: flex;
            align-items: center;

            .img-item {
                width: 16%;

                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 4px;
                }
            }
        }
    }

    .w-dia {
        border: none;

        .el-dialog__body {
            padding: 1px 20px;
            padding-left: 35px;
        }

        .el-dialog__title {
            font-size: 14px;
        }

        border: 1px solid #DCDFE6;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 30px;
    }

    .dia-content {
        display: flex;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-size: 12px;
        flex-direction: row;
        flex-wrap: wrap;

        .c-data {
            width: 45%;
            margin-bottom: 15px;

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
                    width: 28%;
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

    }

    .is_link {
        .el-input__inner {
            color: #4646ff !important;
        }
    }

</style>


<style lang="scss" scoped>

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
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-size: 12px;
        flex-direction: row;
        flex-wrap: wrap;

        .c-data {
            width: 45%;
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

                .c-input {
                    width: 60%;
                }

                .d_code {
                    display: flex;
                    flex-direction: row;
                    width: 69%;

                    .el-select {
                        width: 50%;
                    }
                }

                .label {
                    width: 30%;
                    margin-right: 10px;

                }

            }
        }
    }

    .el-select-dropdown {
        /*z-index: 2099 !important;*/

    }

    .n-post {
        z-index: 9999;

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
        border-radius: 5px;
    }

    .imglist {
        img {
            border-radius: 10px;
            margin-right: 30px;
        }

    }

    .videolist {
        video {
            border-radius: 10px;
            margin-right: 20px;
        }
    }
</style>
