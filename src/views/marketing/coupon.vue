<template>
    <div class="app-container pageclass">
        <div>
            <el-divider content-position="right">

                <el-button size="mini" @click="headOpen">发卷</el-button>
                <el-button size="mini" @click="handcanopen">核销</el-button>

            </el-divider>

        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="优惠卷" name="coupon">

                <Coupon></Coupon>
            </el-tab-pane>
            <el-tab-pane label="门店卷组" name="second">

                <shop></shop>

            </el-tab-pane>
            <el-tab-pane label="自动发送" name="third">
                <autocoupon></autocoupon>
            </el-tab-pane>
            <el-tab-pane label="发送记录" name="fourth">
                <senlog v-if="activeName==='fourth'"></senlog>
            </el-tab-pane>

            <el-tab-pane label="核销记录" name="hexiao">
                <hexiao v-if="activeName==='hexiao'"></hexiao>
            </el-tab-pane>


        </el-tabs>


        <div v-if="showCoupon" class="show-discount">
            <div class="discount-warp">
                <!-- 关闭图标 -->
                <div class="close-icon" @click="headColse">
                    <i class="el-icon-close"/>
                </div>
                <div class="title">新建优惠券</div>

                <div class="money">
                    <div class="money-name">
                        <span class="name-span">使用条件</span>
                        <span>：</span>
                    </div>
                    <el-input v-model="postFrom.title" class="input-money" placeholder="请输入使用条件"/>
                </div>
                <div class="money">
                    <div class="money-name">
                        <span class="name-span">金额</span>
                        <span>：</span>
                    </div>
                    <el-input v-model="postFrom.price" class="input-money" placeholder="请输入金额"/>
                </div>
                <div class="money">
                    <div class="money-name">
                        <span class="name-span">有效期</span>
                        <span>：</span>
                    </div>
                    <div class="condition">
                        <el-date-picker
                                v-model="postFrom.period_time"
                                size="mini"
                                class="data-picker"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                        />
                    </div>
                </div>
                <div class="money">
                    <div class="money-name">
                        <span class="name-span">发送对象</span>
                        <span>：</span>
                    </div>
                    <div class="textarea">
                        <el-select size="mini" v-model="postFrom.group" multiple placeholder="请选择">
                            <el-option
                                    v-for="item in group"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="money" style="align-items:normal">
                    <div class="money-name">
                        <span class="name-span">使用说明</span>
                        <span>：</span>
                    </div>
                    <div class="textarea">
                        <el-input v-model="postFrom.desc" type="textarea" :rows="6" placeholder="请输入内容"/>
                    </div>
                </div>

                <!-- 确定按钮 -->
                <div class="new_botton">
                    <el-row>
                        <el-button type="primary" size="mini" @click="headNewconfirm">确定新建</el-button>
                        <el-button size="mini" @click="headNewcancel">取消</el-button>
                    </el-row>
                </div>
            </div>
        </div>


        <div v-if="showCanclCoupon" class="show-discount">
            <div class="discount-warp">
                <!-- 关闭图标 -->
                <div class="close-icon" @click="headColsecan">
                    <i class="el-icon-close"/>
                </div>
                <div class="title">核销优惠卷</div>

                <div class="money">
                    <div class="money-name">
                        <span class="name-span">核销码</span>
                        <span>：</span>
                    </div>
                    <el-input v-model="cancelFrom.code" class="input-money" placeholder="输入核销码"/>
                    <el-button size="mini" @click="headCancelNewconfirmsearch">搜索</el-button>
                </div>

                <div v-if="hexiaopost">
                    <div class="money">
                        <div class="money-name">
                            <span class="name-span">核销码</span>
                            <span>：</span>
                        </div>
                        <span>{{hexiaopost.code}}</span>
                    </div>

                    <div class="money">
                        <div class="money-name">
                            <span class="name-span">门店</span>
                            <span>：</span>
                        </div>
                        <span>{{hexiaopost.shop.shopname}}</span>
                    </div>

                    <div class="money">
                        <div class="money-name">
                            <span class="name-span">金额</span>
                            <span>：</span>
                        </div>
                        <span>{{hexiaopost.price}}</span>
                    </div>

                    <div class="money">
                        <div class="money-name">
                            <span class="name-span">使用说明</span>
                            <span>：</span>
                        </div>
                        <span>{{hexiaopost.desc}}</span>
                    </div>
                    <div class="money">
                        <div class="money-name">
                            <span class="name-span">有效期</span>
                            <span>：</span>
                        </div>
                        <span>{{hexiaopost.start_time|parseTime('{y}-{m}-{d}') }}到{{hexiaopost.end_time|parseTime('{y}-{m}-{d}') }}</span>
                    </div>

                </div>
                <div class="new_botton">
                    <el-row>
                        <el-button type="primary" :disabled="is_post" size="mini" @click="headCancelNewconfirm">确定核销</el-button>
                        <el-button size="mini" @click="headColsecan">取消</el-button>
                    </el-row>
                </div>
            </div>
            <!-- 确定按钮 -->

        </div>
    </div>
</template>

<script>
    import Coupon from './components/coupon'
    import oneImage from '@/components/Upload/oneImage'

    import {
        GetDataByList
    } from '@/api/shopgroup'
    import shop from './components/shop'
    import autocoupon from './components/autocoupon'
import hexiao from './components/hexiao'
    import senlog from './components/senlog'
    import {PostShopCouponByData, GetCouponByAll} from "@/api/platformcoupon";

    import {PostAutoDataByAdd} from "@/api/autocoupon";
    import {
        GetcouponByList, PostDataByAdd,GetIdByDelete
    } from '@/api/platformcoupon'

    import {GetCancelCodeByData, PostDataByCancel} from "@/api/Cancelcoupon";


    import {mapGetters} from "vuex";
    import Autocoupon from "@/views/marketing/components/autocoupon";

    export default {
        name: 'coupon',
        computed: {
            ...mapGetters(["userinfo", "brand", "group"])
        },
        data() {
            return {
                activeName: 'coupon',
                showCoupon: false,
                showCanclCoupon: false,
                postFrom: {},
                cancelFrom: {},
                group: [],
                coupon: [],
                is_post: false,
                hexiaopost: undefined,
            }
        },
        components: {
            Autocoupon,
            oneImage,
            Coupon,
            shop,
            hexiao,
            senlog
        },
        created() {
            let temp = {}
            GetDataByList(temp).then(res => {
                this.group = res.data
            })
            let query = {}
            GetCouponByAll(query).then(res => {
                this.coupon = res.data

            })
        },
        methods: {
            headCancelNewconfirmsearch() {
                GetCancelCodeByData(this.cancelFrom).then(res => {
                    console.log(res)
                    if (res.code === 20000) {
                        this.hexiaopost = res.data
                        this.is_post=false
                    } else {
                        this.is_post=true
                        this.hexiaopost = undefined
                    }
                })
            },
            headCancelNewconfirm() {
                this.hexiaopost.cancenl_id = this.userinfo.id
                if (this.is_post===true) {
                    return
                }
                this.is_post=true
                PostDataByCancel(this.hexiaopost).then(res => {
                    if(res.code===20000){
                        this.$message.success(res.msg)
                    }
                    this.is_post=false
                })
            },
            headColsecan() {
                this.showCanclCoupon = false

            },
            handcanopen() {
                this.showCanclCoupon = true
            },

            handellicense(e) {
                this.postFrom.images_url = e.file.response.data
            },

            // 确定新建
            headNewconfirm() {
                this.postFrom.sender_id=this.userinfo.id
                this.postFrom.type=1
                PostDataByAdd(this.postFrom).then(res => {
                    console.log(res)
                    this.postFrom={}
                    this.$message.success('新建完成')
                    this.headColse();
                })
            },
            headColse() {
                this.showCoupon = false
            },
            headOpen() {
                this.showCoupon = true
            },
            handleClick(tab, event) {
                console.log(tab, event)
            },
            headNewcancel() {
                this.showCoupon = false
            }
        }
    }
</script>

<style lang="scss" scoped>


    .show-discount {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 9;

        .discount-warp {
            width: 460px;

            background: #ffffff;
            margin: 100px auto 0;
            padding: 20px;
            border-radius: 5px;
            position: relative;

            .close-icon {
                position: absolute;
                right: 20px;
                top: 10px;
                cursor: pointer;

                i {
                    font-size: 13px;
                }
            }

            .title {
                font-size: 12px;
            }

            .money {
                display: flex;
                font-size: 12px;
                align-items: center;
                margin-top: 15px;

                .money-name {
                    display: flex;

                    span {
                        display: block;
                    }

                    .name-span {
                        width: 50px;
                        display: block;
                        text-align-last: justify;
                    }
                }

                .input-money {
                    width: 70%;
                    margin-left: 10px;
                }

                /deep/ .el-input--medium .el-input__inner {
                    height: 30px !important;
                    line-height: 30px;
                    font-size: 12px;
                }

                .radio {
                    margin-left: 10px;
                    width: 70%;

                    /deep/ .el-radio {
                        margin-right: 10px;
                    }

                    /deep/ .el-radio__label {
                        font-size: 12px;
                    }
                }

                .condition {
                    display: flex;
                    height: 30px;
                    line-height: 30px;
                    margin-left: 10px;
                    cursor: pointer;

                    .condition-navbar {
                        padding: 0 12px;
                        border: 1px solid #dcdcdc;
                    }

                    .condition-navbar-active {
                        padding: 0 12px;
                        border: 1px solid #2489fe;
                        color: #2489fe;
                    }
                }

                .impose {
                    display: flex;
                    height: 30px;
                    line-height: 30px;
                    margin-left: 10px;

                    .input-money {
                        width: 25%;
                        margin-left: 10px;
                        margin-right: 10px;
                    }

                    /deep/ .el-input--medium .el-input__inner {
                        height: 30px !important;
                        line-height: 30px;
                    }
                }

                .yx {
                    margin-left: 25px;
                }

                .cuo {
                    margin-left: 22px;

                    .data-picker {
                        width: 90%;
                        height: 30px;
                        line-height: 30px;
                    }

                    /deep/ .el-range-editor--medium .el-range__icon {
                        line-height: 22px;
                    }

                    /deep/ .el-range-editor--medium .el-range-separator {
                        line-height: 22px;
                    }

                    /deep/ .el-range-editor--medium .el-range-input {
                        font-size: 12px;
                    }
                }

                .textarea {
                    width: 70%;
                    margin-left: 10px;

                    /deep/ .el-input--medium {
                        font-size: 12px;
                    }
                }
            }

            .new_botton {
                margin-top: 30px;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
            }
        }
    }

</style>
