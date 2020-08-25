<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
        <el-table
                :data="list"
                border

                style="width: 100%;"
        >
            <el-table-column v-for="(item,index) in filelist" :label="item.label" align="center" :min-width="item.width"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row[item.field] }}</span>
                </template>
            </el-table-column>
        </el-table>
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
                    @current-change="handleChange"
            />
        </div>

        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">关闭</el-button>
  </span>
    </el-dialog>

</template>

<script>
    import {getEnvByList, GetSalesmanByData, GetProductOrderSortByData,GetCityOrderSortByData,GetOrderprovincesByData} from '@/api/home'
    import {parseTime} from '@/utils'

    export default {
        name: "index",
        data() {
            return {
                total: 0,
                filelist: [],//字段
                dialogVisible: false,
                list: [],
                listQuery: {
                    page: 1,
                    limit: 20,
                },
                title: '',
                //字段
                salList: [
                    {label: '业务员', field: 'realName', width: 150},
                    {label: '订单数量', field: 'order_count', width: 100},
                ],

                prList: [
                    {label: '产品名', field: 'title', width: 150},
                    {label: '订单数量', field: 'order_count', width: 100},
                ],
                cityrList: [
                    {label: '城市', field: 'cityname', width: 150},
                    {label: '订单数量', field: 'order_count', width: 100},
                ],
                provincesList: [
                    {label: '省份', field: 'cityname', width: 150},
                    {label: '订单数量', field: 'provincesorder_count', width: 100},
                ],


            }
        },
        methods: {

            handleSizeChange(val) {
                this.listQuery.limit = val
                this.fetchList()
            },

            handleChange(val) {
                this.listQuery.page = val
                this.fetchList()
            },
            handleClose() {
                this.dialogVisible = false
            },
            handleView(row, title) {
                this.dialogVisible = true
                this.title = title
                this.total = 0;
                this.filelist = [];
                this.list = []
                console.log(this.title)

                this.fetchList()


            },
            fetchList() {
                if (this.title == 'TOP业务员') {
                    this.filelist = this.salList
                    this.getsallist()
                }
                if (this.title == 'TOP省份') {
                    this.filelist = this.provincesList
                    this.getproveinlist()
                }

                if (this.title == 'TOP产品') {
                    this.filelist = this.prList
                    this.getprllist()
                }

                if (this.title == 'TOP城市') {
                    this.filelist = this.cityrList
                    this.getcityllist()
                }


            },
            getsallist() {
                GetSalesmanByData(this.listQuery).then(res => {
                    this.list = res.data.data
                    this.total = res.data.total
                    console.log(this.list)

                })
            },
            getprllist() {
                GetProductOrderSortByData(this.listQuery).then(res => {
                    this.list = res.data.data
                    this.total = res.data.total

                })
            },

            getcityllist() {
                GetCityOrderSortByData(this.listQuery).then(res => {
                    this.list = res.data.data
                    this.total = res.data.total

                })
            },
            getproveinlist(){
                GetOrderprovincesByData(this.listQuery).then(res => {
                    this.list = res.data.data
                    this.total = res.data.total
                })
            }



        }
    }
</script>

<style scoped>

</style>

