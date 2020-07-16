<template>
    <div>
        <el-dialog
                title="导出内容"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose">
            <el-checkbox-group v-model="checkList">
                <el-checkbox label="门店"></el-checkbox>
                <el-checkbox label="城市"></el-checkbox>
                <el-checkbox label="省份"></el-checkbox>
                <el-checkbox label="产品"></el-checkbox>
                <el-checkbox label="平台"></el-checkbox>
                <el-checkbox label="业务员"></el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">

        <el-button
                type="primary"
                size="mini"
                @click="handleDerive"
        >导出</el-button>



        <el-button size="mini" @click="handleClose">取 消</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    import {GetDataByDownload} from '@/api/home'
    import {GetQueryBydownload} from "@/api/order";

    export default {
        name: "show",
        data() {
            return {
                checkList: [],
                dialogVisible: false,
            }
        },
        methods: {
            //数据导出
            handleDerive() {
                this.checkList.forEach(item => {
                    console.log(item)
                    let temp = {
                        type: item
                    }
                    GetDataByDownload(temp).then(res => {
                        import('@/vendor/Export2Excel').then(excel => {
                            console.log(excel)
                            const tHeader = res.data.tHeader
                            const filterVal = res.data.filterVal
                            const data = this.formatJson(res.data.data, filterVal)

                            var day2 = new Date()
                            day2.setTime(day2.getTime())
                            var s2 =
                                day2.getFullYear() +
                                '-' +
                                (day2.getMonth() + 1) +
                                '-' +
                                day2.getDate()
                            excel.export_json_to_excel({
                                header: tHeader,
                                data,
                                filename: 'Top' + item+'' + s2
                            })
                            this.listLoading = false
                            this.$message.success('下载成功')
                        })
                    })
                })
            },


            formatJson(data, filterVal) {
                return data.map(v =>
                    filterVal.map(j => {
                        if (j === 'timestamp') {
                            return parseTime(v[j])
                        } else {
                            return v[j]
                        }
                    })
                )
            },
            handleShow() {
                this.dialogVisible = true
            },
            handleClose() {
                this.checkList = []
                this.dialogVisible = false
            },
        }
    }
</script>

<style scoped>

</style>