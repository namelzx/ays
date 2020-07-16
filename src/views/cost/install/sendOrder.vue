<template>
    <div>
        <el-dialog
                :title="Stitle"
                :visible.sync="dialogVisible"
                width="50%"
                class="w-dia"
                :before-close="handleClose"
        >
            <div class="n-post">
                <el-dialog
                        width="60%"
                        title="安装门店选择"
                        :visible.sync="innerVisible"
                        append-to-body
                        class="n-post"
                >
                    <el-form :model="shopQuery" class="form-container" label-width="50px">
                        <el-row class="nc">
                            <el-col :span="8">
                                <el-form-item
                                        size="mini"
                                        label="地址:"
                                        class="postInfo-container-item"
                                        @keyup.enter.native="getshopList()"
                                >
                                    {{shopQuery.cityCode}}
                                    <el-cascader
                                            v-model="shopQuery.cityCode"
                                            size="mini"
                                            clearable
                                            :options="cityoptions"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item
                                        size="mini"
                                        label="门店名称:"
                                        class="postInfo-container-item"
                                >
                                    <el-input
                                            v-model="shopQuery.shopname"
                                            size="mini"
                                            placeholder="请输入内容"
                                            @keyup.enter.native="getshopList()"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item
                                        size="mini"
                                        label="电话:"
                                        class="postInfo-container-item"
                                >
                                    <el-input
                                            v-model="shopQuery.tel"
                                            size="mini"
                                            placeholder="请输入内容"
                                            @keyup.enter.native="getshopList()"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="2" style="margin-left: 20px">
                                <el-button type="primary" size="mini" @click="getshopList"
                                >搜索
                                </el-button
                                >
                            </el-col>
                        </el-row>
                        <div style="height: 450px;    overflow-y: scroll;padding: 10px">
                            <ShList :list="shoplist" @handelToshop="handelToshop"/>
                        </div>
                        <div class="pagination-container" style="margin-top: 0px">
                            <el-pagination
                                    v-show="shoptotal > 0"
                                    :current-page="shopQuery.page"
                                    :page-sizes="[10, 20, 30, 50]"
                                    :page-size="shopQuery.limit"
                                    :total="shoptotal"
                                    background
                                    layout="total, sizes, prev, pager, next, jumper"
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                            />
                        </div>
                    </el-form>
                </el-dialog>
            </div>
            <div v-loading="loading" class="dia-content">
                <div class="c-data">
                    <!--<div class="c-title">车主信息</div>-->
                    <div class="c-content">
                        <div class="ct-item">
                            <span class="label">安装单号</span>
                            <div style="width: 40%">
                                <el-input
                                        v-model="postFrom.order_id"
                                        size="mini"
                                        placeholder="请输入内容"
                                />
                            </div>
                            <div class="install-btn">
                                <el-button size="mini" type="primary" @click="loadData"
                                >载入详情
                                </el-button
                                >
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">购买平台</span>
                            <div class="c-input">
                                <el-cascader
                                        v-model="postFrom.lazada_list"
                                        size="mini"
                                        :options="lazada"
                                        filterable
                                        clearable
                                        :disabled="is_load"
                                />
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">购买产品</span>
                            <div class="c-input">
                                <el-cascader
                                        v-model="postFrom.buy_product_id"
                                        size="mini"
                                        :options="productTree"
                                        filterable
                                        clearable
                                        :disabled="is_load"
                                />
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">订单金额</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.no_price"
                                        size="mini"
                                        :disabled="is_load"
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">联系人</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.contact"
                                        size="mini"
                                        :disabled="is_load"
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">联系电话</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.tel"
                                        size="mini"
                                        :disabled="is_load"
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">地址</span>

                            <div class="c-input">
                                <el-cascader
                                        v-model="postFrom.city_code"
                                        style="width: 100%;"
                                        size="mini"
                                        :disabled="is_load"
                                        :options="cityoptions"
                                />
                                <!--<el-input size="mini" v-model="postFrom.openid" placeholder="请输入内容"></el-input>-->
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">详细地址</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.city_desc"
                                        size="mini"
                                        :disabled="is_load"
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">车牌号</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.number_plate"
                                        size="mini"
                                        :disabled="is_load"
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">车型</span>
                            <div class="c-input">
                                <el-cascader
                                        v-model="postFrom.car_model"
                                        size="mini"
                                        :options="regionHiera"
                                        filterable
                                        clearable
                                        :disabled="is_load"
                                />
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">备注</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.desc"
                                        size="mini"
                                        disabled
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">提交时间</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.create_time"
                                        size="mini"
                                        disabled
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="c-data">
                    <!--<div class="c-title">派单信息</div>-->
                    <div class="c-content">
                        <div class="ct-item">
                            <span class="label">购买单号</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.buy_order_no"
                                        size="mini"
                                        :disabled="is_load"
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">门店名称</span>
                            <div class="c-input">
                                <el-select
                                        v-if="!innerVisible"
                                        v-model="postFrom.shop_id"
                                        size="mini"
                                        :disabled="is_load"
                                        filterable
                                        placeholder="请选择"
                                        @focus="handelInn"
                                >
                                    <el-option
                                            v-for="item in shop"
                                            :label="item.shopname"
                                            :value="item.id"
                                    />
                                </el-select>
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">门店地址</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.shop_location"
                                        size="mini"
                                        :disabled="is_load"
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">门店电话</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.shop_tel"
                                        size="mini"
                                        :disabled="is_load"
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">主业务员</span>
                            <div class="c-input">
                                <el-select
                                        v-model="postFrom.salesman_id"
                                        :disabled="is_load"
                                        size="mini"
                                        clearable
                                        filterable
                                        placeholder="请选择"
                                >
                                    <el-option
                                            v-for="item in salesman"
                                            :label="item.realName"
                                            :value="item.id"
                                            :disabled="postFrom.in_salesman_id === item.id"
                                    />
                                </el-select>
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">次业务员</span>
                            <div class="c-input">
                                <el-select
                                        v-model="postFrom.in_salesman_id"
                                        size="mini"
                                        :disabled="is_load"
                                        clearable
                                        filterable
                                        placeholder="请选择"
                                >
                                    <el-option
                                            v-for="item in salesman"
                                            :label="item.realName"
                                            :value="item.id"
                                            :disabled="postFrom.salesman_id === item.id"
                                    />
                                </el-select>
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">安装费用</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.ins_cost"
                                        :disabled="is_load"
                                        size="mini"
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">客服</span>
                            <div class="c-input">
                                <el-input
                                        v-if="postFrom.pre"
                                        v-model="postFrom.pre.realName"
                                        size="mini"
                                        disabled
                                        placeholder="请输入内容"
                                />
                                <el-input
                                        v-else
                                        v-model="userinfo.realName"
                                        size="mini"
                                        disabled
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">客服备注</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.service_desc"
                                        size="mini"
                                        :disabled="is_load"
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">派单时间</span>
                            <div class="c-input">
                                <el-input
                                        size="mini"
                                        disabled
                                        :value="
                    postFrom.send_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')
                  "
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">核销码</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.verification_code"
                                        size="mini"
                                        disabled
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="c-data">
                    <!--<div class="c-title">配件信息</div>-->
                    <div class="c-content">
                        <div class="ct-item">
                            <span class="label">类别</span>
                            <div class="c-input">
                                <el-select
                                        v-model="postFrom.retype"
                                        size="mini"
                                        :disabled="is_disabled"
                                        filterable
                                        placeholder="请选择"
                                >
                                    <el-option
                                            v-for="item in retype"
                                            :label="item.label"
                                            :value="item.value"
                                    />
                                </el-select>
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">费用</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.cost"
                                        size="mini"
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>
                        <div class="ct-item">
                            <span class="label">开户行</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.bank"
                                        size="mini"
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">账号</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.bank_account"
                                        size="mini"
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>

                        <div class="ct-item">
                            <span class="label">姓名</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.bank_name"
                                        size="mini"
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="c-data">
                    <!--<div class="c-title">配件信息</div>-->
                    <div class="c-content">
                        <div class="ct-item">
                            <span class="label">备注</span>
                            <div class="c-input">
                                <el-input
                                        v-model="postFrom.note"
                                        size="mini"
                                        type="textarea"
                                        :rows="5"
                                        placeholder="请输入内容"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div style="display: flex;flex-direction: row">
                    <UploadList
                            :list="imgl"
                            type="1"
                            title="添加相片"
                            :limit="3"
                            @HandelFile="handelFile"
                    />
                    <UploadList
                            :list="videol"
                            type="2"
                            title="添加视频"
                            :limit="2"
                            @HandelFile="handelVideo"
                    />
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="handelCreate"
        >确认增加</el-button
        >
        <el-button size="mini" @click="handleClose">关闭</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    import {CarBrand} from "@/api/tools";
    import ShList from "@/components/shop/index";

    import {Citylist} from "@/api/city";

    import {GetSaleByAll} from "@/api/salesman";
    import {mapGetters} from "vuex";

    import {GetDataByList, GetDataByShopAll} from "@/api/shop";

    import {
        change,
        changeAll,
        del,
        delAll,
        GetIdBydetails,
        PostDataByAdd
    } from "@/api/payorder";
    import {GetecshopByList} from "@/api/ecshop";
    import {getArrByKey, pickerOptions} from "@/utils";
    import {GetProductByTree} from "@/api/product";

    import UploadList from "@/components/Upload/uploadList";

    const defaultForm = {
        logcontent: "",
        openid: "",
        lazada_id: "",
        lazada_list: "",
        lazada_index: "",
        buy_order_no: "12123",
        buy_account: "199",
        buy_product_id: "",
        no_price: "199",
        contact: "",
        tel: "",
        city_code: undefined,
        city_desc: "",
        number_plate: "A871237",
        car_model: undefined,
        car_index: "",
        car_model_id: ""
    };

    export default {
        name: "SendOrder",
        data() {
            return {
                is_load: false,
                shopQuery: {
                    cityCode: undefined,
                    shopname: undefined,
                    page: 1,
                    limit: 10,
                    tel: undefined
                },
                imglist: [],
                imgl:[],
                videolist: [],
                videol:[],
                is_disabled: false,
                loading: false,
                innerVisible: false,
                // dialogVisible: false,
                checked: true,
                tableKey: 0,
                CarModellist: [], // 车型数据
                lazada: [], // 所有平台
                salesman: [], // 所有业务员
                retype: [
                    {
                        label: "售后退款",
                        value: "售后退款"
                    },
                    {
                        label: "返现奖励",
                        value: "返现奖励"
                    },
                    {
                        label: "支架",
                        value: "支架"
                    },
                    {
                        label: "其他",
                        value: "其他"
                    }
                ], //

                carl: [],
                list: null,
                total: null,

                // postFrom: Object.assign({}, defaultForm),
                cityoptions: [], // 地址
                selectedRows: null,
                listLoading: true,
                showSearch: false,
                options: [],
                shop: [],
                shoptotal: 0,
                listQuery: {
                    page: 1,
                    limit: 10,
                    status: "-1",
                    title: ""
                },
                postFrom: {},
                buttonDisabled: true,
                deleting: false,
                pickerOptions: pickerOptions,
                currentIndex: -1,
                productTree: [],
                regionHiera: [],
                shop: [],
                shoplist: [],
                innerVisible: false
            };
        },
        computed: {
            ...mapGetters(["userinfo", "brand"])
        },
        components: {
            UploadList,
            ShList
        },
        props: {
            Stitle: String,
            dialogVisible: {
                type: Boolean,
                default: false
            }
        },
        created() {
            Citylist().then(res => {
                this.cityoptions = res.data;
            });
            this.getshopList();

            if (this.brand === undefined) {
                CarBrand().then(res => {
                    this.regionHiera = res.data;
                });
            } else {
                this.regionHiera = this.brand;
            }
            GetProductByTree().then(res => {
                this.productTree = res.data;
            });
            GetecshopByList().then(res => {
                this.lazada = res.data;
            });
            GetDataByShopAll().then(res => {
                this.shop = res.data;
            });

            GetSaleByAll().then(res => {
                this.salesman = res.data;
            });
        },
        mounted() {
            console.log(this.userinfo);
        },
        methods: {
            handelToshop(row) {
                this.postFrom.shop_id = row.id;
                this.postFrom.shop_location = row.cityName + " " + row.location;
                this.postFrom.shop_tel = row.tel;
                this.innerVisible = !this.innerVisible;
            },

            handleSizeChange(val) {
                this.shopQuery.limit = val;
                this.getshopList();
            },

            handleStatusChange(val) {
                this.shopQuery.page = 1;

                this.getshopList();
            },
            handleCurrentChange(val) {
                this.shopQuery.page = val;
                this.getshopList();
            },
            getshopList() {
                GetDataByList(this.shopQuery).then(response => {
                    this.shoplist = response.data.data;
                    this.shoptotal = response.data.total;
                });
            },
            handelInn() {
                this.shop = [];
                this.innerVisible = !this.innerVisible;
            },
            handelCreate() {
                const img = [];
                for (let i = 0; i < this.imglist.length; i++) {
                    img.push(this.imglist[i].url);
                    this.imgl.push(this.imglist[i].url);
                }
                const video = [];
                for (let i = 0; i < this.videolist.length; i++) {
                    video.push(this.videolist[i].url);
                    this.videol.push(this.videolist[i].url);
                }
                this.postFrom.logcontent = this.userinfo.realName + "创建订单";
                this.postFrom.imglist = img.join(",");
                this.postFrom.videolsit = video.join(",");

                if (this.postFrom.buy_product_id === undefined) {
                    this.$message.error("请选择产品");
                    return;
                } else {
                    if (this.postFrom.buy_product_id.constructor === Array) {
                        this.postFrom.buy_product_id = this.postFrom.buy_product_id.join(",");
                    } else {
                        this.postFrom.buy_product_id = this.postFrom.buy_product_id;
                    }
                }

                if (this.postFrom.lazada_list === undefined) {
                    this.$message.error("请选择平台");
                    return;
                } else {
                    if (this.postFrom.lazada_list.constructor === Array) {
                        this.postFrom.lazada_list = this.postFrom.lazada_list.join(",");
                    } else {
                        this.postFrom.lazada_list = this.postFrom.lazada_list;
                    }
                }

                if (this.postFrom.city_code === undefined) {
                    this.$message.error("请选择地址");
                    return;
                } else {
                    if (this.postFrom.city_code.constructor === Array) {
                        this.postFrom.city_code = this.postFrom.city_code.join(",");

                    } else {
                        this.postFrom.city_code = this.postFrom.city_code;
                    }

                }
                if (this.postFrom.car_model === undefined) {
                    this.$message.error("请选择车型");
                    return;
                } else {
                    if (this.postFrom.car_model.constructor === Array) {
                        this.postFrom.car_model = this.postFrom.car_model.join(",");
                    } else {
                        this.postFrom.car_model = this.postFrom.car_model;
                    }
                }
                PostDataByAdd(this.postFrom).then(res => {
                    this.$emit("handleClose");
                    this.$message.success("操作成功");
                });
            },

            handelFile(e) {
                this.imglist.push({url: e.file.data});
            },
            handelVideo(e) {
                this.videolist.push({url: e.file.data});
            },
            loadData() {
                this.loading = !this.loading;
                GetIdBydetails(this.postFrom.order_id).then(res => {
                    if (res.data === 404) {
                        this.$message.error("该订单不存在");
                        this.loading = !this.loading;
                        return true;
                    }
                    this.is_load = true; // 如果使用订单载人那么用户不可修改数据
                    const postFrom = res.data;
                    if (postFrom.city_code.constructor === String) {
                        postFrom.city_code = postFrom.city_code.split(",");
                        for (let i = 0; i < postFrom.city_code.length; i++) {
                            postFrom.city_code[i]=parseInt( postFrom.city_code[i]);
                        }
                    }
                    if (postFrom.car_model.constructor === String) {
                        postFrom.car_model = postFrom.car_model.split(",");
                    }

                    if (postFrom.buy_product_id.constructor === String) {
                        postFrom.buy_product_id = postFrom.buy_product_id.split(",");
                    }
                    const buy_product_id = postFrom.buy_product_id;

                    postFrom.buy_product_id = [];
                    for (let i = 0; i < buy_product_id.length; i++) {
                        postFrom.buy_product_id.push(parseInt(buy_product_id[i]));
                    }

                    if (postFrom.lazada_list.constructor === String) {
                        postFrom.lazada_list = postFrom.lazada_list.split(",");
                    }
                    const lazada = postFrom.lazada_list;
                    postFrom.lazada_list = [];

                    for (let i = 0; i < lazada.length; i++) {
                        postFrom.lazada_list.push(parseInt(lazada[i]));
                    }
                    this.postFrom = postFrom;
                    this.postFrom.order_id = postFrom.id;
                    this.loading = !this.loading;
                });
            },
            // 所选门店
            handleShop(e) {
                this.postFrom.shop_id = e;
                for (let i = 0; i < this.shop.length; i++) {
                    if (e === this.shop[i].id) {
                        this.postFrom.shop_location =
                            this.shop[i].cityName + " " + this.shop[i].location;
                        this.postFrom.shop_tel = this.shop[i].tel;
                        return;
                    }
                }
            },
            handleClose() {
                this.$emit("handleClose");
            },
            updateRow(type) {
                this.postFrom.logcontent = this.userinfo.realName + "创建订单";
                // this.postFrom.city_code = this.postFrom.city_code.join(',')
                // this.postFrom.car_model = this.postFrom.car_model.join(',')
                // this.postFrom.lazada_list = this.postFrom.lazada_list.join(',')
                // this.postFrom.buy_product_id = this.postFrom.buy_product_id.join(',')
                //
                // this.postFrom.logcontent =  this.userinfo.realName + '创建订单,'
                // if(this.Stitle==='新增支付单'){
                //   this.postFrom.status = 0
                //   this.postFrom.pre_sales = this.userinfo.id
                //   this.postFrom.logcontent =  this.userinfo.realName + '创建订单,'
                // }
                // console.log(  this.postFrom.logcontent,1)
                //
                // PostDataByAdd(this.postFrom).then(res => {
                //   this.$emit('handleClose')
                //
                //   this.postFrom = Object.assign({}, defaultForm)
                //   this.postFrom.city_code = this.postFrom.city_code.splice(',')
                //   this.postFrom.car_model = this.postFrom.car_model.splice(',')
                // })
            }
        }
    };
</script>

<style lang="scss" scoped>
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
                    width: 23%;
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
        width: 70%;
    }
</style>
