<template> 
    <el-card class="form-container" shadow="never">
        <el-form :model="homeAdvertise"
                 :rules="rules"
                 ref="homeAdvertiseFrom"
                 label-width="150px"
                 size="small">
            <el-form-item label="标题：" prop="name">
                <el-input v-model="homeAdvertise.title" class="input-width"></el-input>
            </el-form-item>

            <el-form-item label="帮助种类：">
                <el-radio-group v-model="homeAdvertise.type">
                    <el-radio :label="1">图文</el-radio>
                    <el-radio :label="2">链接</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="主图：">
                <oneImage :imageUrl="homeAdvertise.img_url" @HandelFile="handellicense"></oneImage>
            </el-form-item>
            <el-form-item label="排序：">
                <el-input v-model="homeAdvertise.sort" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="广告链接：" v-show="homeAdvertise.type===2">
                <el-input v-model="homeAdvertise.url" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="详情：" v-show="homeAdvertise.type===1">
                <div id="wangeditor">
                    <Tinymce v-model="homeAdvertise.content"></Tinymce>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
                <el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
    import Tinymce from '@/components/Tinymce'

    import {PostDataByAdd,updateStatus,deleteHomeAdvertise,getBanner} from '@/api/help';

    import oneImage from '@/components/Upload/oneImage'
    // import {createHomeAdvertise, getHomeAdvertise, updateHomeAdvertise} from '@/api/homeAdvertise'
    const defaultTypeOptions = [
        {
            label: 'PC首页轮播',
            value: 0
        },
        {
            label: 'APP首页轮播',
            value: 1
        }
    ];
    const defaultHomeAdvertise = {
        name: null,
        type: 1,
        images_url: null,
        is_recomm: null,
        content: null,
        status: 2,
        url: null,
        sort: 0,
    };
    export default {
        name: 'HomeAdvertiseDetail',
        components:{oneImage,Tinymce},
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                homeAdvertise: null,
                rules: {
                    title: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: '请输入广告链接', trigger: 'blur'}
                    ],
                },
                typeOptions: Object.assign({}, defaultTypeOptions)
            }
        },
        created(){
            console.log(this.$route)
            var isedit=this.$route.name
            if (isedit==='editid') {
                getBanner(this.$route.params.id).then(response => {
                    this.homeAdvertise = response.data;
                });
            }else{
                this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
            }


        },
        methods: {
            handellicense(e) {
                this.homeAdvertise.img_url = e.file.response.data
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否提交数据', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            if (this.isEdit) {
                                updateHomeAdvertise(this.$route.query.id, this.homeAdvertise).then(response => {
                                    this.$refs[formName].resetFields();
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success',
                                        duration:1000
                                    });
                                    this.$router.back();
                                });
                            } else {
                                PostDataByAdd(this.homeAdvertise).then(response => {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success',
                                        duration:1000
                                    });
                                });
                            }
                        });

                    } else {
                        this.$message({
                            message: '验证失败',
                            type: 'error',
                            duration:1000
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
            },
            catchData(e){
                // this.homeAdvertise.confirmButtonText=
            }
        },
        mounted() {


        }
    }
</script>
<style scoped>
    .input-width {
        width: 70%;
    }
</style>


