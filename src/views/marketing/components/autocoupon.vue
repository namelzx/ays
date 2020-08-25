<template>
    <div class="userlist">
        <div class="filter-container dn">
            <el-form :inline="true" :model="listQuery">
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="标题:">
                            <el-input size="mini" v-model="listQuery.title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="发送日期:">
                            <el-date-picker
                                    v-model="listQuery.create_time"
                                    type="datetimerange"
                                    :picker-options="pickerOptions"

                                    size="mini"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>


                    <el-col :span="4">
                        <el-form-item label="状态:">
                            <el-select size="mini" filterable clearable v-model="listQuery.status" placeholder>
                                <el-option
                                        v-for="item in statusOp"
                                        :label="item.label"
                                        :value="item.value"
                                        @keyup.enter.native="handleFilter()"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="4">

                        <div style="margin-top: 5px;margin-left: 10px">
                            <el-tooltip content="搜索" placement="top">
                                <el-button v-waves type="primary" size="mini" @click="handleFilter()">搜索</el-button>
                            </el-tooltip>
                        </div>


                    </el-col>

                    <el-col :span="4">


                        <div style="margin-top: 5px;margin-left: 10px">
                            <el-tooltip content="新建" placement="top">
                                <el-button v-waves type="primary" size="mini" @click="headOpen()">新建</el-button>
                            </el-tooltip>
                        </div>



                    </el-col>


                </el-row>
            </el-form>
        </div>
        <!-- 操作 -->
        <el-table
                v-loading="listLoading"
                :data="list"
                stripe
                style="width: 100%">
            <el-table-column
                    label="标题"
                    min-width="100">
                <template slot-scope="{row}">
                    {{row.title}}
                </template>
            </el-table-column>


            <el-table-column
                    label="状态"
                    width="80">
                <template slot-scope="{row}">
                    {{row.status|statusfilet}}
                </template>
            </el-table-column>

            <el-table-column
                    label="发送期限"
                    min-width="130">
                <template slot-scope="{row}">
                    <div class="detail-value">{{ row.start_time|parseTime('{y}-{m}-{d}') }}到{{
                        row.end_time|parseTime('{y}-{m}-{d}') }}
                    </div>

                </template>
            </el-table-column>

            <el-table-column
                    label="发送卡卷"
                    width="180">
                <template slot-scope="{row}">
                    <span v-if="row.coupon">
                                            {{row.coupon.title}}

                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="180px" class-name="small-padding">
                <template slot-scope="scope">
<!--                    <el-button-->
<!--                            v-waves-->
<!--                            type="text"-->
<!--                            @click="handleUpdate(scope.$index,scope.row.id)"-->
<!--                    >编辑-->
<!--                    </el-button>-->
                    <el-button
                            v-waves
                            type="text"
                            @click="handleDelete(scope.$index,scope.row.id)"
                    >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

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



        <div v-if="showCoupon" class="show-discount">
            <div class="discount-warp">
                <!-- 关闭图标 -->
                <div class="close-icon" @click="headColse">
                    <i class="el-icon-close"/>
                </div>
                <div class="title">新建自动优惠券</div>

                <div class="money">
                    <div class="money-name">
                        <span class="name-span">标题</span>
                        <span>：</span>
                    </div>
                    <el-input v-model="postFrom.title" class="input-money" placeholder="标题"/>
                </div>
                <div class="money">
                    <div class="money-name">
                        <span class="name-span">发送期限</span>
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

                <div class="money">
                    <div class="money-name">
                        <span class="name-span">背景图</span>
                        <span>：</span>
                    </div>
                    <div class="textarea">
                        <oneImage :imageUrl="images_url" @HandelFile="handellicense"></oneImage>

                    </div>
                </div>


                <div class="money">
                    <div class="money-name">
                        <span class="name-span">发送卡卷</span>
                        <span>：</span>
                    </div>
                    <div class="textarea">
                        <el-select size="mini" v-model="postFrom.coupon_id" placeholder="请选择">
                            <el-option
                                    v-for="item in coupon"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.id">
                            </el-option>
                        </el-select>
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

    </div>
</template>
<script>

    import {GetItemByList} from '@/api/autocoupon'
    import {Citylist} from '@/api/city'
    import waves from '@/directive/waves'
    import {GetDataByShopAll} from "@/api/shop";

    import {PostAutoDataByAdd} from "@/api/autocoupon";

    import oneImage from '@/components/Upload/oneImage'

    import {PostShopCouponByData, GetCouponByAll} from "@/api/platformcoupon";

    import {mapGetters} from "vuex";

    import {
        GetDataByList
    } from '@/api/shopgroup'
    export default {
        directives: {
            waves
        },
        components:{
            oneImage
        },
        computed: {
            ...mapGetters(["userinfo", "brand", "group"])
        },
        filters: {
            statusfilet(val) {
                if (val === 1) {
                    return '完成'
                }
                if (val === 2) {
                    return '发送中'
                }
            }
        },
        data() {
            return {
                images_url:'',
                group:[],
                postFrom: {},
                shop: [],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                listQuery: {
                    page: 1,
                    limit: 10,
                    status: undefined,
                    title: '',
                    sstatus: 'all',
                    nickname: '',
                    contact: '',
                    cityCode: ''
                },
                showCoupon:false,
                statusOp: [
                    {
                        label: '已使用',
                        value: 1
                    },
                    {
                        label: '待使用',
                        value: 2
                    },
                ],
                sumprice: 0,
                list: null,
                total: 1,
                checked: true,
                listLoading: true,
                coupon:[],
                cityoptions: [] // 地址
            }
        },

        created() {
            let query = {}
            GetCouponByAll(query).then(res => {
                this.coupon = res.data

            })
            GetDataByShopAll().then(res => {
                this.shop = res.data;
            })
            let temp={}
            GetDataByList(temp).then(res => {
                this.group = res.data
            })
            this.fetchList()
        },
        methods: {
            handcanopen() {
                this.showCanclCoupon = true
            },

            handellicense(e) {
                this.images_url = e.file.response.data
            },

            headOpen() {
                console.log(1)
                this.showCoupon = true
            },
            headNewcancel(){
                this.showCoupon = false
            },
            headColse(){
                this.showCoupon = false
            },
            handleDelete() {

            },
            handleUpdate() {

            },
            fetchList() {
                this.listLoading = true
                GetItemByList(this.listQuery).then(response => {
                    this.list = response.data.data
                    this.total = response.data.total
                    this.listLoading = false

                })
            },
            headNewconfirm() {
                this.postFrom.sender_id = this.userinfo.id
                this.postFrom.images_url=this.images_url
                PostAutoDataByAdd(this.postFrom).then(res => {
                    this.postFrom = {}
                    this.$message.success('新建完成')
                    this.getlist();
                })
                this.headColse()
            },
            handleFilter() {
                this.listQuery.page = 1
                this.fetchList()
            },
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.fetchList()
            },


            handleCurrentChange(val) {
                this.listQuery.page = val
                this.fetchList()
            }
        }
    }
</script>
<style lang="scss" scoped>
    .userlist {
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

        .no-data {
            height: 100px;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }

        .filter-container .el-form-item__label {
            width: 64px;
        }

        .new-table {
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
            "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
            display: flex;
            font-size: 12px;
            flex-direction: column;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

            .table-warp {
                margin: 0 30px;
                height: 100px;
                border-bottom: 1px solid #dcdcdc;
                display: flex;
                align-items: center;

                .warp_imgs {
                    width: 55px;
                    height: 55px;
                    border-radius: 10px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .warp_bao {
                    margin-left: 3%;
                    width: 55%;

                    .warp_content {
                        display: flex;
                        font-size: 12px;
                        height: 30px;
                        line-height: 30px;

                        .warp_content_1 {
                            display: flex;
                            width: 40%;

                            span {
                                display: block;
                            }

                            .wa_title {
                                display: block;
                                width: 21%;
                                color: #666666;
                                text-align-last: justify;
                            }

                            .wa_colon {
                                color: #666666;
                            }
                        }

                        .warp_content_2 {
                            width: 20%;
                            display: flex;

                            span {
                                display: block;
                            }

                            .wa_title {
                                display: block;
                                color: #666666;
                                text-align-last: justify;
                            }

                            .wa_colon {
                                color: #666666;
                            }

                            .wa_name {
                                color: #009cff;
                            }
                        }

                        .warp_content_3 {
                            display: flex;
                            width: 50%;

                            span {
                                display: block;
                            }

                            .wa_title {
                                display: block;
                                width: 12%;
                                color: #666666;
                                text-align-last: justify;
                            }

                            .wa_colon {
                                color: #666666;
                            }
                        }
                    }
                }
            }

            .table-warp:nth-last-child(1) {
                border: 0;
            }
        }
    }


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
