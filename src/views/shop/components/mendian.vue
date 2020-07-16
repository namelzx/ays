<template>
    <div class="mendian-container">
        <div class="admin-introduce">
            <div class="ad-id"><span>ID:</span>{{id}}</div>
            <div class="ad-type"><span>类别:</span>

                <span class="special">{{shop.shop_type}}</span>

            </div>
            <div class="ad-update"><span>{{shop.shopname}}:</span>
                <el-rate
                        v-model="shop.star"
                        disabled
                        :colors="['#E9375B','#E9375B','#E9375B']"
                        disabled-void-color="#fff"
                        text-color="#E9375B"
                >
                </el-rate>
                {{shop.star}}星
            </div>
            <div class="ad-score"><span>店铺评分:</span>{{shop.score}}分</div>
            <div class="ad-recom">


                <el-checkbox size="mini" @change="handelMmended" v-model="shop.ec_rec">电商推荐</el-checkbox>
                <el-checkbox size="mini" @change="handelmk_rec" v-model="shop.mk_rec">市场推荐</el-checkbox>
                <el-checkbox size="mini" @change="handelbook" v-model="shop.book">宝典</el-checkbox>
                <el-checkbox size="mini" @change="handelhang" v-model="shop.to_hang">挂帐</el-checkbox>

            </div>
        </div>
        <div class="shop-info">
            <div class="info-wrap">
                <div class="info-img">
                    <img v-if="shop.wechat" :src="shop.wechat.headimgurl" alt="">
                </div>
                <div class="info-item-wrap">
                    <div class="info-item nick-name">
                        <span class="item-left">店主昵称：</span>
                        <span class="item-right" v-if="shop.wechat">{{shop.wechat.nickname}}</span>
                    </div>
                    <div class="info-item contact">
                        <span class="item-left">联系方式：</span>
                        <span class="item-right">{{shop.tel}}</span>
                    </div>
                    <div class="info-item waiter">
                        <span class="item-left">业务员：</span>
                        <span class="item-right" v-if="shop.salesman">{{shop.salesman.realName}}</span>
                    </div>
                    <div class="info-item create-time">
                        <span class="item-left">入驻时间：</span>
                        <span class="item-right">{{shop.create_time}}</span>
                    </div>
                    <div class="info-item owner">
                        <span class="item-left">店主姓名：</span>
                        <span class="item-right">{{shop.shopkeeper}}</span>
                    </div>
                    <div class="info-item address">
                        <span class="item-left">地 址：</span>
                        <span class="item-right">{{shop.cityName}}{{shop.location}}</span>
                    </div>
                    <div class="info-item server">
                        <span class="item-left">服务商：</span>
                        <span class="item-right">{{shop.service_provider}}</span>
                    </div>
                    <div class="info-item open-id">
                        <span class="item-left">Openid：</span>
                        <span class="item-right" v-if="shop.wechat">{{shop.wechat.openid}}</span>
                    </div>
                    <div class="info-item notes">
                        <span class="item-left">备 注：</span>
                        <span class="item-right">{{shop.desc}}
                        </span>
                    </div>

                    <div class="info-item ">
                        <span class="item-left">建档名：</span>
                        <span class="item-right">{{shop.buildarc}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="btn-wrap">
                <el-button size="mini" type="primary" @click="handelDelete()">删除门店</el-button>

                <el-button size="mini" type="primary" v-if="shop.withdrawal===1" @click="handelwithdrawal(2)">关闭提现
                </el-button>
                <el-button size="mini" type="primary" v-if="shop.withdrawal===2" @click="handelwithdrawal(1)">打开提现
                </el-button>
                <el-button size="mini" type="primary" @click="clickToBlock">拉黑</el-button>
                <el-button size="mini" type="primary" @click="whiteVisible=true">拉白</el-button>
                <el-button size="mini" type="primary" @click="clickToEdInfo">修改信息</el-button>
                <el-button size="mini" type="primary" @click="clickToEdBind">修改绑定</el-button>
            </div>
        </div>
        <div class="shop-detail">
            <div class="detail-text-wrap">
                <div class="lt-detail">
                    <div class="lt-item"><span class="left-lt">营业时间：</span><span>{{shop.business_time}}</span></div>
                    <div class="lt-item"><span class="left-lt">标语：</span><span>{{shop.slogan}}</span></div>
                    <div class="lt-item"><span class="left-lt">服务保障：</span><span>{{serve|serv}} </span></div>
                    <div class="lt-item"><span
                            class="left-lt">主营项目：</span><span>{{main|serv}}</span>
                    </div>
                </div>
                <div class="bg-detail">
                    <div class="bg-detail-title">店铺简介</div>
                    <div class="bg-detail-content">
                        {{shop.Introduction}}
                    </div>
                </div>
            </div>
            <div class="detail-img-wrap">
                <div class="shop-img-wrap">
                    <div class="img-wrap-title">店铺环境</div>
                    <div class="img-wrap">
                        <div class="img-item">
                            <img :src="shop.front"
                                 alt="" @click="handleImg(shop.front)">
                        </div>
                        <div class="img-item" v-for="(item,index) of shop.env" :key="index">
                            <img :src="item.url" @click="handleImg(item.url)" alt="">
                        </div>
                    </div>
                </div>

                <div class="shop-img-wrap">
                    <div class="img-wrap-title">营业执照</div>
                    <div class="img-wrap">
                        <div class="img-item">
                            <img :src="shop.license"
                                 alt="" @click="handleImg(shop.license)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<Info v-if="dialogVisible" :postFrom="postFrom" @handleClose="handleClose" :dialogVisible="dialogVisible"></Info>-->
        <!--<Bussiness v-if="dialogBuss" @handleClose='handleCloseBuss' :dialogVisible="dialogBuss" :postFrom="postFrom"></Bussiness>-->

        <Bind v-if="dialogBind" @handleClose='handleCloseBind' :dialogVisible="dialogBind" :postFrom="postFrom"></Bind>
        <div class="info">

            <!--拉黑-->
            <el-dialog
                    title="拉黑门店"
                    :visible.sync="BlockVisible"
                    width="30%"
                    :before-close="clickToBlock">
                <el-cascader
                        v-model="backvalue"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        @change="handleChange"></el-cascader>
                <div style="text-align: center;width: 100%;margin-top: 30px" v-if="shop.blacklist===2">
                    市场拉黑({{shop.marketday<356?shop.marketday+'天后到期':'永久'}})

                </div>
                <div style="text-align: center;width: 100%;margin-top: 30px" v-if="shop.ecblacklist==3">
                    电商拉黑
                    <!--{{shop.ecblackday}}-->
                    ({{shop.ecmarketday<356?shop.ecmarketday+'天后到期':'永久'}})

                </div>

                <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="BlockVisible = false">取 消</el-button>
    <el-button type="primary" size="mini" @click="handleBack">确 定</el-button>
  </span>
            </el-dialog>

            <el-dialog
                    title="门店拉白"
                    :visible.sync="whiteVisible"
                    width="30%"
                    :before-close="clickToWhite">

                <div style="text-align: center;width: 100%;margin-top: 30px" v-if="shop.blacklist===2">
                    <el-button type="primary" @click="handelWhite('ma')">
                        市场拉白({{shop.marketday<356?shop.marketday+'天后到期':'永久'}})
                    </el-button>
                </div>
                <div style="text-align: center;width: 100%;margin-top: 30px" v-if="shop.ecblacklist===3">
                    <el-button type="primary" @click="handelWhite('ec')">
                        电商拉白
                        ({{shop.ecmarketday<356?shop.ecmarketday+'天后到期':'永久'}})
                    </el-button>
                </div>
                <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="whiteVisible = false">关闭</el-button>
  </span>
            </el-dialog>

            <el-dialog
                    title="修改信息"
                    :visible.sync="dialogEdInfo"
                    width="50%"
                    :before-close="handleCloseInfo">

                <el-tabs v-model="activeName">
                    <el-tab-pane label="修改基本信息" name="info">

                        <Info :postFrom="postFrom" @handleClose="handleCloseInfo"></Info>

                    </el-tab-pane>
                    <el-tab-pane label="修改营业信息" name="second">
                        <Bussiness @handleClose='handleCloseInfo' :dialogVisible="dialogBuss"
                                   :postFrom="postFrom"></Bussiness>


                    </el-tab-pane>
                </el-tabs>


            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {
        GetIDByDetails,
        PostBlackByUpdate,
        PostWhiteByUpdate,
        PostDataByRecommended,
        GetIdBydelete
    } from '@/api/shop'
    import Info from './mendianinfo'
    import Bind from './bind'

    import Bussiness from './business'

    import {GetProjectBy, PostBussByUpdate} from '@/api/shop'

    import openWindow from '@/utils/openWindow'

    export default {
        name: 'MenDian',
        props: {
            // shop: {
            //   type: Object
            // }
            id: {
                type: String,
                default: 0
            }
        },
        data() {
            return {
                whiteVisible: false,
                BlockVisible: false,
                activeName: 'info',
                dialogEdInfo: false,
                dialogVisible: false,
                dialogBind: false,
                dialogBuss: false,
                backvalue: '',
                backtemp: {
                    blacklist: undefined,
                    blackday: undefined,
                    id: undefined
                },
                options: [{
                    value: 2,
                    label: '市场',
                    children: [{
                        value: 100000,
                        label: '永久'
                    }, {
                        value: 7,
                        label: '七天'
                    }, {
                        value: 30,
                        label: '一个月'
                    }, {
                        value: 90,
                        label: '三个月'
                    }, {
                        value: 365,
                        label: '1年'
                    }
                    ]
                }, {
                    value: 3,
                    label: '电商',
                    children: [{
                        value: 100000,
                        label: '永久'
                    }, {
                        value: 7,
                        label: '七天'
                    }, {
                        value: 30,
                        label: '一个月'
                    }, {
                        value: 90,
                        label: '三个月'
                    }, {
                        value: 365,
                        label: '1年'
                    }
                    ]
                }],
                day: 0,
                shop: {
                    id: '',
                    type: 1,
                    type_star: 1,
                    ec_recom: 1,
                    mt_recom: 1,
                    book: 1,
                    update_star: 1,
                    score: 1
                },
                main: [],
                serve: []
            }
        },
        components:
            {
                Info,
                Bind,
                Bussiness
            }
        ,
        filters: {
            serv(arr) {
                var str = ''
                for (let i = 0; i < arr.length; i++) {
                    str = str + arr[i].title + ','
                }
                return str
            }
        }
        ,
        created() {
            this.getinfo()
            GetProjectBy(this.id).then(res => {
                console.log(res)
                this.main = res.data.main
                this.serve = res.data.serve
            })
        }
        ,
        methods: {
            handelDelete() {
                this.$confirm('此操作将该门店 永久删除(不可恢复)', '是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    GetIdBydelete(this.shop.id).then(res => {
                        this.$message.success('删除成功')
                        this.$router.go(-1)
                    })
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },

            handleImg(img) {
                openWindow(img, '图片预览', '500', '400')
            },

            handelMmended(e) {
                var temp = {
                    filed: 'ec_rec',
                    id: this.shop.id
                }
                let str = ''
                if (e) {
                    temp.value = 1
                    str = '电商推荐已开启';

                } else {
                    temp.value = 0
                    str = '电商推荐已关闭';
                }
                PostDataByRecommended(temp).then(res => {
                    this.$message.success(str);
                })
            },

            handelwithdrawal(e) {
                var temp = {
                    filed: 'withdrawal',
                    id: this.shop.id,
                    value: e
                }
                let str = ''
                if (e === 1) {
                    str = '提现已开启';
                } else {
                    str = '提现已关闭';
                }
                this.shop.withdrawal = e
                PostDataByRecommended(temp).then(res => {
                    this.$message.success(str);
                })
            },

            handelmk_rec(e) {
                var temp = {
                    filed: 'mk_rec',
                    id: this.shop.id
                }
                if (e) {
                    temp.value = 1
                } else {
                    temp.value = 0
                }
                let str = '';
                if (e) {
                    str = '市场推荐已开启';

                } else {
                    str = '市场推荐已关闭';
                }
                PostDataByRecommended(temp).then(res => {
                    this.$message.success(str);

                })
            },

            handelbook(e) {
                var temp = {
                    filed: 'book',
                    id: this.shop.id
                }
                if (e) {
                    temp.value = 1
                } else {
                    temp.value = 0
                }
                let str = '';
                if (e) {
                    str = '宝典已开启';

                } else {
                    str = '宝典已关闭';
                }
                PostDataByRecommended(temp).then(res => {
                    this.$message.success(str);
                })
            },

            handelhang(e) {
                var temp = {
                    filed: 'to_hang',
                    id: this.shop.id
                }
                if (e) {
                    temp.value = 1
                } else {
                    temp.value = 0
                }
                let str = '';
                if (e) {
                    str = '挂帐已开启';

                } else {
                    str = '挂帐已关闭';
                }
                PostDataByRecommended(temp).then(res => {
                    this.$message.success(str);
                })
            },
            handelWhite(type) {
                //市场拉白
                var tmep = {}
                if (type === 'ma') {
                    var temp = {
                        id: this.shop.id,
                        blacklist: 1,
                        blackday: 0,
                        blackend: 0
                    }
                }
                if (type === 'ec') {
                    var temp = {
                        id: this.shop.id,
                        ecblacklist: 1,
                        ecblackday: 0,
                        ecblackend: 0
                    }
                }
                PostWhiteByUpdate(temp).then(res => {
                    this.$message.success('拉白成功')
                    this.getinfo()
                    this.whiteVisible = false
                })

            },
            clickToWhite() {
                this.whiteVisible = false
            },
            handleChange(value) {
                this.day = value[1]
                console.log(value[0])
                if (value[0] === 2) {
                    this.backtemp.blacklist = value[0]
                    this.backtemp.blackday = value[1]
                    this.backtemp.id = this.id
                    this.backtemp.ecblacklist = undefined
                    this.backtemp.ecblackday = undefined
                }
                if (value[0] === 3) {
                    this.backtemp.ecblacklist = value[0]
                    this.backtemp.ecblackday = value[1]
                    this.backtemp.blacklist = undefined
                    this.backtemp.blackday = undefined
                    this.backtemp.id = this.id
                }

            },
            //拉黑
            handleBack() {
                const _this = this
                var day = this.day
                if (day === 100000) {
                    day = '永久'
                } else {
                    day = day + '天'
                }
                this.$confirm('此操作将该门店 ' + day + ' 拉黑, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    PostBlackByUpdate(this.backtemp).then(res => {
                        console.log(res)
                        _this.BlockVisible = !this.BlockVisible
                        this.$message.success('拉黑成功')
                        this.getinfo()
                    })
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            getinfo() {
                GetIDByDetails(this.id).then(res => {
                    this.shop = res.data
                    // if(this.shop)
                    if (this.shop.book === 1) {
                        this.shop.book = true
                    }
                    if (this.shop.ec_rec === 1) {
                        this.shop.ec_rec = true
                    }
                    if (this.shop.to_hang === 1) {
                        this.shop.to_hang = true
                    }
                    if (this.shop.mk_rec === 1) {
                        this.shop.mk_rec = true
                    }
                    if (this.shop.blacklist === 1) {
                        this.shop.blacklist = true
                    }
                })
            }
            ,
            clickToEdInfo() {
                this.postFrom = this.shop

                if (this.postFrom.cityCode) {
                    if (this.postFrom.cityCode.constructor === String) {
                        let li = this.postFrom.cityCode.split(',')

                        let arr = []
                        for (let i = 0; i < li.length; i++) {
                            arr.push(li[i])
                        }
                        this.postFrom.cityCode = arr

                    }
                }
                this.dialogEdInfo = !this.dialogEdInfo
            }
            ,
            handleCloseInfo() {
                this.getinfo()
                this.dialogEdInfo = !this.dialogEdInfo
            }
            ,
            handleCloseBuss() {
                this.getinfo()
                this.dialogBuss = !this.dialogBuss
            }
            ,
            handleCloseBind() {
                this.getinfo()
                this.dialogBind = !this.dialogBind
            }
            ,
            handleClose() {
                this.getinfo()
                this.dialogVisible = !this.dialogVisible
            }
            ,
            clickToDeSync() {
                console.log('解封同步')
            }
            ,
            clickToBlock() {
                this.BlockVisible = !this.BlockVisible
            }
            ,
            clickToDeBlock() {
                console.log('拉白')
            }
            ,
            clickToEdBase() {

                this.postFrom = this.shop

                if (this.postFrom.cityCode.constructor === String) {
                    let li = this.postFrom.cityCode.split(',')

                    let arr = []
                    for (let i = 0; i < li.length; i++) {
                        arr.push(li[i])
                    }
                    this.postFrom.cityCode = arr

                }

                this.dialogVisible = !this.dialogVisible

                console.log('改基本信息')
            }
            ,
            clickToEdBuss() {
                this.postFrom = this.shop
                this.dialogBuss = !this.dialogBuss
            }
            ,
            clickToEdBind() {
                this.postFrom = this.shop
                this.dialogBind = !this.dialogBind
                console.log('修改绑定')
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .el-cascader {
        width 100%
    }

    .dialog-footer {
        justify-content: center;
    }

    .admin-introduce {
        display: flex;
        margin: 25px 0 20px;
        padding: 8px 24px;
        font-size: 12px;
        align-items: center;
        background #fff;
        box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
        border-radius: 4px;

        .ad-id {
            width: 12%;

            span {
                padding-right: 10px;
                color: #666666;
            }
        }

        .ad-type {
            width: 18%;

            span {
                padding-right: 10px;
                color: #666;
            }

            .special {
                color: #0000ff;
                font-weight: 500;
            }
        }

        .ad-update {
            display: flex;
            align-items center;
            width: 25%;

            span {
                padding-right: 10px;
            }
        }

        .ad-score {
            width: 13%;

            span {
                padding-right: 10px;
            }
        }

        .ad-recom >>> .el-checkbox__label {
            font-size: 12px;
        }
    }

    .shop-info {
        padding: 20px 38px;
        box-shadow: 0 0 10px 0 rgba(153, 153, 153, 0.1);
        border-radius: 6px;

        .info-wrap {
            display: flex;
            flex-wrap: wrap;

            .info-img {
                width: 6%;

                img {
                    width: 100%;
                    border-radius: 4px;
                }
            }

            .info-item-wrap {
                width: 88%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                padding: 0 30px;
                font-size: 12px;

                .info-item {
                    margin-bottom: 14px;

                    .item-left {
                        color: #666;
                        font-weight: 400;
                    }

                    .item-right {
                        color: #333;
                        font-weight: 400;
                    }
                }

                .nick-name, .owner {
                    width: 20%;
                }

                .contact, .address {
                    width: 30%;
                }

                .waiter, .server {
                    width: 20%;
                }

                .create-time, .open-id {
                    width: 30%;
                }

                .notes {
                    width: 100%
                    display: flex;

                    span.item-right {
                        width: 40%;
                        line-height: 16px;
                    }
                }
            }
        }

        .btn-wrap {
            display: flex;
            width: 55%;
            margin-left: 40%;
            justify-content: flex-end;

            .btns {
                background: #009cff;
                color: #fff;
                margin-right: 20px;
                width: 16.6%;
                font-size: 12px;
                text-align: center;
                padding: 5px 0;
                border-radius: 4px;

                &:hover {
                    cursor: pointer;
                }

            }
        }
    }

    .shop-detail {
        display: flex;
        margin: 20px 0;
        padding: 20px 38px;
        box-shadow: 0 0 10px 0 rgba(153, 153, 153, .1);

        .detail-text-wrap {
            width: 50%;
            padding: 0 35px 0 0;

            .lt-detail {
                font-size: 12px;
                color: #333;

                .lt-item {
                    margin: 16px 0;
                    display: flex;

                    .left-lt {
                        min-width: 16%;
                    }
                }
            }

            .bg-detail {
                .bg-detail-title {
                    font-size: 14px;
                    color: #333;
                    margin: 10px 0;
                }

                .bg-detail-content {
                    font-size: 12px;
                    color: #333;
                    line-height: 18px;
                }
            }

        }

        .detail-img-wrap {
            width: 50%;

            .img-wrap {
                display: flex;
                flex-wrap: wrap;
                margin: 14px 0;

                .img-item {
                    width: 15%;
                    margin-right: 30px;

                    img {
                        width: 83px;
                        height: 83px;
                        border-radius: 6px;
                    }
                }
            }

            .img-wrap-title {
                font-size: 14px;
                color: #333;
            }

        }
    }

    .info >>> .el-dialog__body {
        padding-top: 5px;
    }

    .c-input {
        width 70%;
    }

    .ad-recom >>> .el-checkbox {
        margin-right: 15px !important;
    }
</style>
