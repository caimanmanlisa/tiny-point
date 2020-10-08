<template>
<div>
    <h3 class="title_cont">文件批量上传</h3>
    <el-form :model="form" label-width="120px" style="width:60%; margin-top:30px">
        <el-form-item label="批量上传目录" prop="name">
            <el-input v-model="checkTree.treeName">
                <el-button slot="append" @click="dialogTableVisible = true">选择树形目录</el-button>
            </el-input>
        </el-form-item>
        <el-form-item label="上传文件" prop="name">
            <el-upload class="upload-demo" action="#" :on-preview="handlePreview" multiple :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                </div>
            </el-upload>
        </el-form-item>
        <el-form-item label="类型" prop="name">
            <el-select v-model="form.region" placeholder="请选择" style="width:100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item prop="name" label>
            <el-button type="primary">确认上传</el-button>
        </el-form-item>
    </el-form>

    <el-dialog title="树形目录" :visible.sync="dialogTableVisible">
        <el-tree :props="props" :load="loadNode" lazy @node-click="handleNodeClick" />
    </el-dialog>
</div>
</template>

<script>
import {
    docuFolder
} from "@/api/flow";

export default {
    data() {
        return {
            checkTree: {
                id: '',
                treeName: ''
            },
            props: {
                label: "lanVal"
            },
            fileList: [],
            data: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                                id: 9,
                                label: '三级 1-1-1'
                            },
                            {
                                id: 10,
                                label: '三级 1-1-2'
                            }
                        ]
                    }]
                },
                {
                    id: 2,
                    label: '一级 2',
                    children: [{
                            id: 5,
                            label: '二级 2-1'
                        },
                        {
                            id: 6,
                            label: '二级 2-2'
                        }
                    ]
                },
                {
                    id: 3,
                    label: '一级 3',
                    children: [{
                            id: 7,
                            label: '二级 3-1'
                        },
                        {
                            id: 8,
                            label: '二级 3-2'
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            options: [
                // 类型下拉框
                {
                    value: '1',
                    label: '创建'
                },
                {
                    value: '2',
                    label: '更新'
                }
            ],
            value: '1',

            dialogTableVisible: false,
            form: {
                name: '',
                region: ''
            }
        }
    },
    methods: {
        handlePreview(file, fileList) {
            console.log('file: ', file)
            console.log('fileList: ', fileList)
        },
        /* 树形接口方法*/

        getDocuFolder(id) {
            return docuFolder(id);
        },
        async loadNode(node, resolve) {
            if (node) {
                if (node.level === 0) {
                    const res = await this.getDocuFolder(0);
                    return resolve(res);
                } else if (node.level > 0) {
                    const resChild = await this.getDocuFolder(node.data.id);
                    resolve(resChild);
                }
            }
            // if (node.level > 1) {
            //   const resChild = await this.getDocuFolder(node.data.id)
            //   return resolve(resChild)
            // };
        },
        handleNodeClick(data) { //对象 属性名 
            this.$set(this.checkTree, "treeName", data.lanVal);
            console.log(data);
        },

        getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes())
        },
        getCheckedKeys() {
            console.log(this.$refs.tree.getCheckedKeys())
        },
        setCheckedNodes() {
            this.$refs.tree.setCheckedNodes([{
                    id: 5,
                    label: '二级 2-1'
                },
                {
                    id: 9,
                    label: '三级 1-1-1'
                }
            ])
        },
        setCheckedKeys() {
            this.$refs.tree.setCheckedKeys([3])
        },
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        handlePreview(file) {
            console.log(file)
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`)
        }
    }
}
</script>

<style>
.form_btn {
    text-align: right;
    margin-bottom: 20px;
    padding-right: 4%;
}
</style>
