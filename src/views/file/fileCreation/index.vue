<template>
<div>
    <h3 class="title_cont">文件创建{{checkId}}</h3>

    <div class="set_main">
        <div class="set_main_tree">
            <el-tree v-if="loadingTree" :props="props" :load="loadNode" lazy @node-click="handleNodeClick" />
        </div>
        <div class="set_main_con">
            <el-row>
                <el-col :span="24">
                    <el-button type="primary" @click="uploadBtn">
                        上传
                        <i class="el-icon-upload el-icon--right" />
                    </el-button>

                    <el-button type="primary" @click="batchDel" >
                        删除
                        <i class="el-icon-delete el-icon--right" />
                    </el-button>
                    <!-- <el-button type="primary" @click="changeStatus" :disabled="!multipleSelection.length"> -->
                         <el-button type="primary" @click="changeStatus">
                        发布
                        <i class="el-icon-s-promotion el-icon--right" />
                    </el-button>
                </el-col>

                <el-col :span="24" style="margin-top: 10px">
                    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" />

                        <el-table-column prop="fileName" label="文件名">

                            <template slot-scope="scope">
                                <el-link type="primary" @click="showDetails(scope.row)">{{
                    scope.row.fileName
                  }}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="fileStatus" label="状态">
                            <template slot-scope="scope">{{
                  scope.row.fileStatus === "0" ? "草稿" : "正常"
                }}</template>
                        </el-table-column>
                        <el-table-column prop="fileSize" label="大小" />

                        <el-table-column prop="creatorName" label="上传人" />

                        <el-table-column prop="modifyDate" label="修改时间" />
                        <!-- <el-table-column prop="operate" label="操作"> -->
                        <!-- <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="edit(scope.row)"
                  />
                </template> -->
                        <!-- </el-table-column> -->
                    </el-table>
                    <el-pagination background :total="dataTotal" layout="prev, pager, next" :page-size="10" :current-page.sync="currentPage" @current-change="handleCurrentChange" />
                </el-col>
            </el-row>
        </div>
    </div>
    <!--文件详情弹窗 开始-->
    <el-dialog title="文件详情" :visible.sync="dialogdocVisible">
        <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 100%">

            <el-tab-pane label="文件信息" name="first">
                <ul class="docdetails">
                    <li><span>文件标题：</span>{{flowInfo.fileName}}</li>
                    <li><span>文件编码：</span>{{flowInfo.fileCode}}</li>
                    <li><span>所属目录：</span>{{flowInfo.fidName}}</li>
                    <li><span>文件版本：</span>{{flowInfo.versionNumber}}</li>
                </ul>

            </el-tab-pane>
            <el-tab-pane label="内容" name="second">
                <el-row>
                    <el-col :span="24">

                        <el-link> <i class="el-icon-download"></i>{{flowInfo.fileName}}</el-link>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>

    <!--文件详情弹窗 结束-->
    <!-- 编辑弹窗 -->
    <!-- <el-dialog title="修改文件" :visible.sync="dialogFormVisible">
      <el-row style="padding: 5px 30px 15px 0">
        <el-col :span="24" class="text-right">
          <el-button type="primary" @click="permissionSave">保存</el-button>
          <el-button @click="closeQx">取消</el-button>
        </el-col>
      </el-row>
      <el-form label-width="120px" style="padding-right: 30px">
        <el-form-item label="文件名">
          <el-input v-model="flowInfo.fileName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="flowInfo.fileStatus"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog> -->

    <!-- 上传弹窗 -->
    <el-dialog title="上传文件" :visible.sync="dialogFormVisible0">

        <el-form label-width="120px">
            <!-- <el-form-item label="批量上传目录" prop="name">
        <el-input v-model="checkTree.treeName">
          <el-button slot="append" @click="dialogTableVisible = true"
            >选择树形目录</el-button
          >
        </el-input>
      </el-form-item> -->
            <!-- <el-form-item label="类型" prop="name">
        <el-select v-model="checkType" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item> -->
            <el-form-item label="上传文件" prop="name" style="margin: 20px 0">
                <el-upload action="#" ref="upload" :multiple="true" :limit="1" :before-remove="beforeRemove" :on-change="handleChange" :on-remove="handleRemove" :on-exceed="handleExceed" :file-list="fileList" :http-request="uploadFile" :auto-upload="false">
                    <el-button type="primary" @click="chooseUpload">点击上传</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
            </el-form-item>
            <el-form-item prop="name" label>
                <el-button type="success" @click="submitUpload">确认上传</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</div>
</template>

<script>
import axios from "axios";
import {
    docuFolder
} from "@/api/flow";
import {
    typePaging,
    docDel,
    editUpdata,
    publishDoc
} from "@/api/file";
export default {
    data() {
        return {
            checkId: -1, // 选中的id -1没有选中    // checkId是书目录选中的id
            /*文件详情全局定义*/
            dialogdocVisible: false,
            activeName: "first",
            flowInfo: {
                fileName: "",
                fileCode: "",
                fidName: "",
                versionNumber: ""
            },
            /*上传文件 定义数据start*/
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

            /*上传文件 定义数据end*/

            options: [{
                    // 权限管理类型
                    value: "0",
                    label: "草稿",
                },
                {
                    value: "1",
                    label: "正常",
                },
            ],
            props: {
                label: "lanVal",
            },
            dataTotal: 0,
            currentPage: 1,
            query: {
                desc: false,
                key: "",
                page: 1,
                rows: 10,
                sortBy: "createDate",
            },

            loadingTree: true,
            dialogFormVisible: false,
            dialogFormVisible0: false,
            tableData: [],
            checkData: [],

            multipleSelection: [],
        };
    },
    //文件上传 初始化
    mounted() {
        this.fileData = new FormData();
    },

    created() {
        this.getTypePaging();
    },

    methods: {
        /*点击文件名称弹出弹窗*/
        showDetails(row) {
            this.flowInfo = row;
            this.dialogdocVisible = true;
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },

        // // 编辑
        //   edit(row) {
        //     console.log("row: ", row);
        //     this.flowInfo = row;
        //     this.dialogFormVisible = true;
        //   },

        // /*上传文件方法 start*/
        // beforeAvatarUpload(file) {
        //   if (!this.checkTree.id || !this.checkType) {
        //     alert("有选项未选");
        //     return;
        //   }
        //   console.log("file: ", file);
        // },
        handleAvatarSuccess(res, file) {
            console.log("res: ", res);
            console.log("file: ", file);
        },

        // getCheckedNodes() {
        //   console.log(this.$refs.tree.getCheckedNodes());
        // },
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
        chooseUpload() {},
        // 上传文件
        uploadFile(file) {
            this.fileData.append("files", file.file); // append增加数据
        },
        // 上传到服务器
        async submitUpload() {
            
            this.$refs.upload.submit();
            this.fileData.append("isUpdate", this.checkType === 1);
            this.fileData.append("isSingle", true);
            let result = await this.upload(
                `http://sksigmar.com:81/docu/file/fid/${this.checkId}`,
                this.fileData
            );
            console.log(result);
            //console.log('cmmwww',result.data.errors[0].desc)
            if (result) {
                if (result.data.errorNo === 0) {
                    this.$message({
                        message: `${this.checkType === 1 ? "修改" : "创建"}您成功上传了${result.data.successNo}个文件`,
                        type: "success",
                    });
                  
                // } else if (result.data.errorNo !== 0 && result.data.successNo !== 0) {
                //     this.$message({
                //         message: `${result.data.errorNo}个失败`,
                //         type: "error",
                //     });
                } else {
                    this.$message({
                        // message: `${result.data.errors}上传失败`,
                         message: `上传失败`,
                        type: "error",
                    });
                }
            } else {
                this.$message({
                  
                    // message: `${result.data.errors}上传失败`,
                         message: `上传失败`,
                    type: "error",
                });
            }
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
                `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
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
        /*上传文件方法 end*/

        //获取数据
        getTypePaging(data) {
            typePaging(data).then((res) => {
                this.dataTotal = res.total;
                this.tableData = res.list;
            });
        },
        // 编辑
        edit(row) {
            console.log("row: ", row);
            this.flowInfo = row;
            this.dialogFormVisible = true;
        },

        //弹框-保存按钮
        permissionSave() {
            // alert("getDefaultPermission-保存");

            this.getFsetTypeUpdata();
            this.dialogFormVisible = false;
            this.$message({
                message: "修改成功！",
                type: "success",
            });
        },

        // 修改
        getFsetTypeUpdata() {
            console.log("this.flowInfo", this.flowInfo);
            console.log("this.flowInfo.id", this.flowInfo.id);
            editUpdata(this.flowInfo, this.flowInfo.id).then((res) => {
                console.log("res: ", res);
                this.getTypePaging();
            });
        },

        //弹框-取消按钮
        closeQx() {
            this.dialogFormVisible = false;
            this.clearFilePermission();
        },

        // 批量删除
        batchDel() {
            //alert("删除");
            if(this.multipleSelection.length<1){
                  this.$message({
                    message: "你还没有选择要删除的数据",
                    type: "warning",
                });
              
                return

            }
            console.log("multipleSelection: ", this.multipleSelection);
            const arr = [];
            this.multipleSelection.forEach((el) => {
                console.log("el: ", el);
                arr.push(el.id);
            });
            docDel(arr).then((res) => {
                console.log("删除: ", res);
                this.getTypePaging();
                this.$message({
                    message: "删除成功！",
                    type: "success",
                });
            });
        },

        //发布
        changeStatus() {
              if(this.multipleSelection.length<1){
                  this.$message({
                    message: "你还没有选择要发布的数据",
                    type: "warning",
                });
              
                return

            }

            console.log("multipleSelection: ", this.multipleSelection);

            const arr = [];
            this.multipleSelection.forEach((el) => {
                console.log("el: ", el);
                arr.push(el.id);
            });
            publishDoc(arr).then((res) => {
                console.log("发布: ", res);
                if (this.flowInfo.fileStatus === "0") {
                    this.flowInfo.fileStatus === "1"

                }
                // this.flowInfo.fileStatus = !this.flowInfo.fileStatus;
              
                this.$message({
                    message: "发布成功！",
                    type: "success",
                });
                  this.getTypePaging();
            });
            

        },

        // 翻页
        handleCurrentChange(i) {
            console.log("i: ", i);
            this.query.page = i;
            this.getTypePaging(this.query);
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
        },

        handleNodeClick(data) {
            console.log("handleNodeClick - data: ", data);
            this.checkId = data.id; //吧树节点选中的id付给checkId
            // checkId是书目录选中的id
            this.query = {
                desc: false,
                fid: data.id,
                key: "",
                page: 1,
                rows: 10,
                sortBy: "createDate",
            };
            // 选择树的id
            this.getTypePaging(this.query);
        },

        //上传弹窗
        uploadBtn() {
            if(this.checkId===-1){
                 this.$message({
                    message: "你还没有选中树节点",
                    type: "warning",
                });
                return 

            }
            this.dialogFormVisible0 = true;
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
    },
    watch: {
        checkType(newValue, oldValue) {},
    },
};
</script>

<style>
</style>
