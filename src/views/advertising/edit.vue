<template> 
    <el-card class="form-container" shadow="never">
        <el-form :model="homeAdvertise"
                 :rules="rules"
                 ref="homeAdvertiseFrom"
                 label-width="150px"
                 size="small">
            <el-form-item label="标题：" prop="name">
                <el-input v-model="homeAdvertise.name" class="input-width"></el-input>
            </el-form-item>

            <el-form-item label="广告种类：">
                <el-radio-group v-model="homeAdvertise.type">
                    <el-radio :label="1">图文</el-radio>
                    <el-radio :label="2">链接</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="广告主图：">
                <oneImage :imageUrl="homeAdvertise.images_url" @HandelFile="handellicense"></oneImage>
            </el-form-item>
            <el-form-item label="排序：">
                <el-input v-model="homeAdvertise.sort" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="广告链接：" v-show="homeAdvertise.type===2">
                <el-input v-model="homeAdvertise.url" class="input-width"></el-input>
            </el-form-item>

            <el-form-item label="广告位置：">
                <el-select v-model="homeAdvertise.location" placeholder="全部" clearable class="input-width">
                    <el-option v-for="item in typeOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
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

    import {PostDataByAdd, updateStatus, deleteHomeAdvertise, getBanner} from '@/api/banner';

    import oneImage from '@/components/Upload/oneImage'
    // import {createHomeAdvertise, getHomeAdvertise, updateHomeAdvertise} from '@/api/homeAdvertise'
    const defaultTypeOptions = [
        {
            label: '门店广告位',
            value: 1
        },
        {
            label: '用户订单填写广告',
            value: 2
        },
        {
            label: '营销推广广告',
            value: 3
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
        components: {oneImage, Tinymce},
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
                    name: [
                        {required: true, message: '请输入广告名称', trigger: 'blur'},
                        {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: '请输入广告链接', trigger: 'blur'}
                    ],
                    startTime: [
                        {required: true, message: '请选择开始时间', trigger: 'blur'}
                    ],
                    endTime: [
                        {required: true, message: '请选择到期时间', trigger: 'blur'}
                    ],
                    pic: [
                        {required: true, message: '请选择广告图片', trigger: 'blur'}
                    ]
                },
                typeOptions: Object.assign({}, defaultTypeOptions)
            }
        },
        created() {
            console.log(this.$route)
            var isedit = this.$route.name
            if (isedit === 'advertising/edit') {
                getBanner(this.$route.params.id).then(response => {
                    this.homeAdvertise = response.data;
                });
            } else {
                this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
            }


        },
        methods: {
            handellicense(e) {
                this.homeAdvertise.images_url = e.file.response.data
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
                                        duration: 1000
                                    });
                                    this.$router.back();
                                });
                            } else {
                                PostDataByAdd(this.homeAdvertise).then(response => {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success',
                                        duration: 1000
                                    });
                                });
                            }
                        });

                    } else {
                        this.$message({
                            message: '验证失败',
                            type: 'error',
                            duration: 1000
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
            },
            catchData(e) {
                // this.homeAdvertise.confirmButtonText=
            }
        },
        mounted() {
            this.editor = new E(this.$refs.editorElem);
            // 编辑器的事件，每次改变会获取其html内容
            this.editor.customConfig.onchange = html => {
                this.editorContent = html;
                this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
            };
            this.editor.customConfig.menus = [
                // 菜单配置
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                'image', // 插入图片
                'table', // 表格
                'code', // 插入代码
                'undo', // 撤销
                'redo' // 重复
            ];
            this.editor.create(); // 创建富文本实例
        }
    }
</script>
<style scoped>
    .input-width {
        width: 70%;
    }
</style>


