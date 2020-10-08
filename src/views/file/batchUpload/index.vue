<template>
<div>
    <h3 class="title_cont">文件批量上传{{ checkType }} - {{ checkTree.id }}</h3>
    <el-form label-width="120px" style="width: 60%; margin-top: 30px">
        <el-form-item label="批量上传目录" prop="name">
            <el-input v-model="checkTree.treeName">
                <el-button slot="append" @click="dialogTableVisible = true">选择树形目录</el-button>
            </el-input>
        </el-form-item>
        <el-form-item label="类型" prop="name">
            <el-select v-model="checkType" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="上传文件" prop="name">
            <el-upload action="#" ref="upload" :multiple="true" :limit="5" :before-remove="beforeRemove" :on-change="handleChange" :on-remove="handleRemove" :on-exceed="handleExceed" :file-list="fileList" :http-request="uploadFile" :auto-upload="false">
                <el-button type="primary" @click="chooseUpload">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
        </el-form-item>
        <el-form-item prop="name" label>
            <el-button type="success" @click="submitUpload">确认上传</el-button>
        </el-form-item>
    </el-form>

    <el-dialog title="树形目录" :visible.sync="dialogTableVisible">
        <el-tree :props="props" :load="loadNode" lazy @node-click="handleNodeClick" />
    </el-dialog>
</div>
</template>

<script>
import axios from "axios";
import {
    docuFolder
} from "@/api/flow";

export default {
    data() {
        return {
         
            checkTree: {
                id: "",
                treeName: "",
            },
            props: {
                label: "lanVal",
            },
            fileData: "", // 文件上传数据（多文件合一）
            fileList: [], // upload多文件数组
            uploadData: {
                fieldData: {
                    id: "10", // 机构id,
                },
            },
            defaultProps: {
                children: "children",
                label: "label",
            },
            options: [
                // 类型下拉框
                {
                    value: "1",
                    label: "创建",
                },
                {
                    value: "2",
                    label: "更新",
                },
            ],
            value: "1",

            dialogTableVisible: false,
            checkType: "",
        };
    },
    mounted() {
        this.fileData = new FormData();
    },
    methods: {
        clearTreeinfo(){
            this.checkTree={
                treeName:""
            }

        },

        beforeAvatarUpload(file) {
            if (!this.checkTree.id || !this.checkType) {
                alert("有选项未选");
                return;
            }
            console.log("file: ", file);
        },
        handleAvatarSuccess(res, file) {
            console.log("res: ", res);
            console.log("file: ", file);
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

        handleNodeClick(data) {
            //对象 属性名
            this.$set(this.checkTree, "treeName", data.lanVal);
            this.$set(this.checkTree, "id", data.id);
            this.dialogTableVisible = false;
            console.log(data);
        },

        getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes());
        },
        getCheckedKeys() {
            console.log(this.$refs.tree.getCheckedKeys());
        },
        setCheckedNodes() {
            this.$refs.tree.setCheckedNodes([{
                    id: 5,
                    label: "二级 2-1",
                },
                {
                    id: 9,
                    label: "三级 1-1-1",
                },
            ]);
        },
        setCheckedKeys() {
            this.$refs.tree.setCheckedKeys([3]);
        },

        //选择上传按钮
        chooseUpload() {
            if (!this.checkTree.treeName) {
                this.$message({
                    message: "目录名称不能为空",
                    type: "warning",
                });
                return;
            }
        },
        // 上传文件
        uploadFile(file) {
            this.fileData.append("files", file.file); // append增加数据
        },

        // 上传到服务器
        async submitUpload() {
            if (!this.checkTree.treeName) {
                this.$message({
                    message: "目录名称不能为空",
                    type: "warning",
                });
                return;
            }
            this.$refs.upload.submit();
            this.fileData.append("isUpdate", this.checkType === 1);
            this.fileData.append("isSingle", false);
            let result = await this.upload(
                `http://sksigmar.com:81/docu/file/fid/${this.checkTree.id}`,
                this.fileData
            );
            console.log(result);
            if (result) {
                if (result.data.errorNo === 0) {
                    this.$message({
                        message: `${this.checkType === 1 ? "修改" : "创建"}成功,您成功上传了${result.data.successNo}个文件`,
                        type: "success",
                    });
                } else if (result.data.errorNo !== 0 && result.data.successNo !== 0) {
                    let err = ""
                    result.data.errors.forEach(item => {
                        err += item.desc + " "
                    })
                    this.$message({
                        message: `${result.data.errorNo}个失败,错误信息：${err}.${result.data.successNo}个文件成功`,
                        type: "error",
                    });
                } else if (result.data.desc) {
                    this.$message({
                        message: `错误信息：${result.data.desc}`,
                        type: "error",
                    });
                }else {
                    let err = ""
                    result.data.errors.forEach(item => {
                        err += item.desc
                    })
                    this.$message({
                        message: `上传失败${err}`,
                        type: "error",
                    });
                }
            } else {
                this.$message({
                    message: `上传失败`,
                    type: "error",
                });
            }
            this.fileList = []
            this.fileData = new FormData();
        },
        //移除
        handleRemove(file, fileList) {
            this.fileList = fileList;
            // return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // 选取文件超过数量提示
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //监控上传文件列表
        handleChange(file, fileList) {
            let existFile = fileList
                .slice(0, fileList.length - 1)
                .find((f) => f.name === file.name);
            if (existFile) {
                this.$message.error("当前文件已经存在!");
                fileList.pop();
            }
            this.fileList = fileList;
        },

        upload: async function (url, formData) {
            try {
                let service = axios.create({
                    timeout: 5000
                });
                let result = await service({
                    method: "post",
                    url,
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                return result;
            } catch (err) {
                console.log(err);
            }
        },

    },

    watch: {
        checkType(newValue, oldValue) {},
    },
};
</script>

<style>
.form_btn {
    text-align: right;
    margin-bottom: 20px;
    padding-right: 4%;
}
</style>
