<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
        <el-table
                :data="list"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="order_id"
                    label="订单号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    label="车主"
                    width="180">
                <template slot-scope="scope">
                    <span class="link-type">{{scope.row.contact}} {{scope.row.tel}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="日期">
                <template slot-scope="scope">
                    <span class="link-type">{{scope.row.create_time|parseTime()}}</span>
                </template>
            </el-table-column>


        </el-table>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

</template>

<script>
    import {getEnvByList} from '@/api/home'

    import {parseTime}  from '@/utils'
    export default {
        name: "index",
        data() {
            return {
                dialogVisible: false,
                list: [],
                title:'',

            }
        },
        methods: {
            handleClose() {
                this.dialogVisible = false
            },
            handleView(row, type, star) {
                this.dialogVisible = true

                if(type==='shop'){
                    this.title='查看'+row.shopname
                }
                if(type==='order'){
                    this.title='查看'+row.userName
                }
                if(type==='product'){
                    this.title='查看'+row.product_title
                }


                console.log(row)
                var temp = {
                    id: row.id,
                    type,
                    star
                }
                getEnvByList(temp).then(res => {
                    this.list = res.data
                })
            }
        }
    }
</script>

<style scoped>

</style>