<template>
  <div>
    <h3 class="title_cont">文件创建</h3>

    <div class="set_main">
      <div class="set_main_tree">
        <el-tree
          v-if="loadingTree"
          :props="props"
          :load="loadNode"
          lazy
          @node-click="handleNodeClick"
        />
      </div>
      <div class="set_main_con">
        <el-row>
          <el-col :span="24">
            <el-button type="primary" @click="uploadBtn">
              上传
              <i class="el-icon-upload el-icon--right" />
            </el-button>
    
    
            <el-button type="primary" @click="batchDel">
              删除
              <i class="el-icon-delete el-icon--right"   />
            </el-button>
            <el-button type="primary">
              发布
              <i class="el-icon-s-promotion el-icon--right" />
            </el-button>
          </el-col>

          <el-col :span="24" style="margin-top: 10px">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" />

              <el-table-column prop="fileName" label="文件名" />

              <el-table-column prop="fileStatus" label="状态">
                <template slot-scope="scope">{{scope.row.fileStatus  }}</template>
              </el-table-column>
              <el-table-column prop="fileSize" label="大小" />

              <el-table-column prop="creatorName" label="上传人" />

              <el-table-column prop="modifyDate" label="修改时间" />
              <el-table-column prop="operate" label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="edit(scope.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              :total="dataTotal"
              layout="prev, pager, next"
              :page-size="10"
              :current-page.sync="currentPage"
              @current-change="handleCurrentChange"
            />
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 编辑弹窗 -->
    <el-dialog title="修改文件" :visible.sync="dialogFormVisible">
      <el-row style="padding: 5px 30px 15px 0">
        <el-col :span="24" class="text-right">
          <el-button type="primary"  @click="permissionSave">保存</el-button>
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
    </el-dialog>


<!-- 上传弹窗 -->
<el-dialog title="上传文件" :visible.sync="dialogFormVisible0">
     
 
 上传文件表单

</el-dialog>



  </div>
</template>

<script>
import axios from "axios";
import { docuFolder } from "@/api/flow";
import { typePaging,docDel,fsetTypeUpdata2} from "@/api/file";
export default {
  data() {
    return {
  checkId: -1, 
      
        isEditIndex:1,
       options: [
        {
          // 权限管理类型
          value: "0",
          label: "草稿",
        },
        {
          value: "1",
          label: "正常",
        }
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
      dialogFormVisible0:false,
      tableData: [],
      flowInfo: { //表单信息
        fileName: '',
        fileStatus: '',
      },
  
  
      multipleSelection: [],
    };
  },
  created() {
    this.getTypePaging();
  },
 
   filters:{
    typefilter(val) {
      let fileStatus = "";
      switch (val) {
        case 0:
          fileStatus = "草稿";
          break;
        case 1:
          fileStatus = "正常";
          break;
      }
      return fileStatus;
    }
  
  
  },
  methods: {
    //获取数据
    getTypePaging(data) {
      typePaging(data).then((res) => {
        this.dataTotal = res.total;
        this.tableData = res.list;
      });
    },
       // 编辑
    edit(row) {
      console.log('row: ', row)
      this.flowInfo = row
      this.dialogFormVisible = true
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
     getFsetTypeUpdata() {
            console.log('this.flowInfo', this.flowInfo)
            console.log('this.flowInfo.id', this.flowInfo.id)
            fsetTypeUpdata2(this.flowInfo, this.flowInfo.id).then(res => {
                console.log('res: ', res)
                this.getTypePaging();
            })
        },


 //弹框-取消按钮
      closeQx() {
      this.dialogFormVisible = false;
      this.clearFilePermission();
    },

 // 批量删除
    batchDel() {
      alert('删除')
      console.log('multipleSelection: ', this.multipleSelection)
      const arr = []
      this.multipleSelection.forEach(el => {
        console.log('el: ', el)
        arr.push(el.id)
      })
      docDel(arr).then(res => {
        console.log('删除: ', res)
        this.getTypePaging()
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
      })
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
      console.log("点击时显示当前节点", data);
      console.log("点击时显示当前节点id", data.id);
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
 uploadBtn(){
        this.dialogFormVisible0 = true

    },




    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style>
</style>
