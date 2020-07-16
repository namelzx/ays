<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
        <el-table
                highlight-current-row
                :data="list"
                stripe
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="排名"
                    width="180">

            </el-table-column>

            <el-table-column
                    v-if="title==='TOP城市'"
                    prop="title"
                    label="城市"
                    width="180">
            </el-table-column>

            <el-table-column
                    v-if="title==='TOP产品'"
                    prop="title"
                    label="产品"
                    width="180">
            </el-table-column>

            <el-table-column
                    v-if="title==='TOP业务员'"
                    prop="title"
                    label="业务员"
                    width="180">
            </el-table-column>

            <el-table-column
                    v-if="title==='TOP省份'"
                    prop="title"
                    label="省份"
                    width="180">
            </el-table-column>



            <el-table-column
                    prop="count"
                    label="数量"
                    width="180">
            </el-table-column>


        </el-table>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">关闭</el-button>
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
            handleView(row, title) {
                this.dialogVisible = true
                this.title=title
                console.log(row)
                this.list = row.data

            }
        }
    }
</script>

<style scoped>

</style>

