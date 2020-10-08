<template>
  <div class="app-container">
    <h3 class="title_cont">角色</h3>
    <div class="content_toplayout">
      <div class="search_content fl">
        <el-button type="primary" icon="el-icon-search" @click="searchlanID" />
        <input v-model.trim="pagingSearchKey" type="text" class="search_content_input fl" placeholder="请输入关键字" @keyup.enter="searchlanID">
      </div>
      <div class="button fr">
        <el-button type="primary" icon="el-icon-plus" @click="addInfo">添加</el-button>
        <el-button type="primary" icon="el-icon-minus" @click="batchDel">删除</el-button>
      </div>
    </div>

    <div class="table_box">
      <el-table
        ref="multipleTable"
        :row-key="getRowKeys"
        :data="typeData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        @selection-change="handleSelectionChange"
        @row-click="openDetails"
      >
        <el-table-column type="selection" width="55" :reserve-selection="true" />
        <el-table-column prop="roleCode" label="角色组编码">
          <template slot-scope="scope">{{ scope.row.roleCode }}</template>
        </el-table-column>
        <el-table-column prop="lanVal" label="名称" />
        <el-table-column prop="remark	" label="备注">
          <template slot-scope="scope">{{ scope.row.remark }}</template>
        </el-table-column>
        <el-table-column prop="isActive" label="启用">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isActive" true-label="0" false-label="1" disabled />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="text-align:center">
      <el-pagination
        background
        :current-page.sync="page"
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="Datatotal"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog title="类型编辑" :visible.sync="dialogVisibleEdit" width="80%" :before-close="handleCloseEdit">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="hrmRoleGroup">
          <el-form ref="tableDatas" label-width="140px" :model="tableDatas" status-icon :rules="rules">
            <el-row :gutter="20">
              <el-col :span="23">
                <div class="form_btn">
                  <el-button type="primary" @click="editType()">保存</el-button>
                  <el-button @click="cancelEdit">取消</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="角色组编码" prop="roleCode">
                  <el-input v-model="tableDatas.roleCode" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="名称" prop="lanVal">
                  <el-input v-model="tableDatas.lanVal" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="备注">
                  <el-input v-model="tableDatas.remark" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="是否启用">
                  <el-switch v-model="tableDatas.isActive" active-value="0" inactive-value="1" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form></el-tab-pane>
        <el-tab-pane label="成员列表" name="roleEmpDTO">
          <div class="button fr">
            <el-button type="primary" icon="el-icon-plus" @click="addPer() ">新增</el-button>
          </div>
          <div class="table_box">
            <el-table
              ref="multipleTable"
              :data="perList"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column label="编号" prop="id">
                <template slot-scope="scope"><span style="display:block;width:100%;">{{ scope.row.id }}</span></template>
              </el-table-column>
              <el-table-column label="姓名" prop="name">
                <template slot-scope="scope"><span style="display:block;width:100%;" @click="getTT(scope.row)">{{ scope.row.name }}</span></template>
              </el-table-column>
              <el-table-column label="手机" prop="mobile">
                <template slot-scope="scope"><span style="display:block;width:100%;">{{ scope.row.mobile }}</span></template>
              </el-table-column>
            </el-table>
            <br><br>
            <el-pagination
              background
              :current-page.sync="page"
              layout="prev,pager,next"
              :page-size="pageSize"
              :total="perListTatol"
              @current-change="handleCurrentPerChange"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-dialog title="添加成员列表" :visible.sync="dialogTableVisible" append-to-body width="90%">
        <div class="button fr">
          <el-button type="primary" icon="el-icon-plus" @click="addPerList() ">新增</el-button>
        </div>
        <el-table :data="addPerData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" :reserve-selection="true" />
          <el-table-column property="id" label="工号" />
          <el-table-column property="department" label="部门" />
          <el-table-column property="name" label="姓名" />
          <el-table-column property="job" label="岗位" />
        </el-table>
        <br><br>
        <el-pagination
          background
          :current-page.sync="page"
          layout="prev,pager,next"
          :page-size="pageSize"
          :total="perAddTatol"
          @current-change="handleCurrentSelChange"
        />
      </el-dialog>
    </el-dialog>

    <el-dialog
      title="类型添加"
      :visible="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <el-form ref="tableDatas" label-width="140px" :model="tableDatas" status-icon :rules="rules">
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary" @click="addSelect('tableDatas')">保存</el-button>
              <el-button @click="cancelAdd">取消</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="角色组编码" prop="roleCode">
              <el-input v-model="tableDatas.roleCode" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="名称" prop="lanVal">
              <el-input v-model="tableDatas.lanVal" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="备注">
              <el-input v-model="tableDatas.remark" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否启用">
              <el-switch v-model="tableDatas.isActive" active-value="0" inactive-value="1" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { RolePage, RoleUpdate, RoleDel, RoleAdd, perPage, perAll, withempAdd, ckCode, RoleSearch } from '@/api/personnel'
export default {
  data() {
    var validateRoleCode = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback(new Error('不能为空'))
      } else {
        this.getckCode(callback)
        callback()
      }
    }
    var validateLanVal = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('不能为空'))
      } else {
        callback()
      }
    }
    return {
      dialogTableVisible: false,
      addPerData: [],
      perList: [],
      activeName: 'hrmRoleGroup',
      dialogVisible: false, // 添加弹框的显示
      dialogVisibleEdit: false, // 编辑弹框的显示

      pagingSearchKey: null, // 查询的值的字符串
      pageSize: 10, // 一页几条数据
      pages: 0, // 每页总页数
      page: 1, //	当前页数
      Datatotal: 0, // 总条数
      typeData: [],
      perListTatol: 0,
      perAddTatol: 0,
      search: '',
      params: {
        page: 1, // 当前页数
        rows: 10, //	下拉框每页条数
        sortBy: 'roleCode', //	排序字段
        key: this.pagingSearchKey, //	查询
        desc: false //	正逆序
      },
      //  数据源
      tableDatas: {
        roleCode: '',
        lanVal: '',
        remark: '',
        isActive: '0'
      },

      getRowKeys(row) {
        return row.id
        console.log(id)
      },
      //  复选框
      multipleSelection: [],
      //  验证
      rules: {
        roleCode: [{ required: true, validator: validateRoleCode, trigger: 'blur' }],
        lanVal: [{ required: true, validator: validateLanVal, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getRolePage()
  },

  methods: {
    getckCode() {
      console.log(this.tableDatas.roleCode)
      ckCode(this.tableDatas.roleCode).then(res => {
        console.log(!res.exist)
        if (!res.exist) {
          this.$message.error('角色组编码不能重复')
        }
      }).catch(err => { // 报错进这个
        console.log('校验失败')
      })
    },
    getperAll() {
      let a = this.tableDatas.id
      a = -1
      perAll(a).then(res => {
        console.log(res)
        this.addPerData = res.list
        this.perAddTatol = res.total
        this.pages = res.pages // 获取 总页数
        this.pageSize = res.pageSize // 获取 每页几条
      })
    },
    getperPage() {
      perPage(this.tableDatas.id).then(res => {
        console.log(res)
        this.perList = res.list
        this.perListTatol = res.total // 获取 总条数
        this.pages = res.pages // 获取 总页数
        this.pageSize = res.pageSize // 获取 每页几条
      }).catch((e) => {
        console.log(e)
      })
    },
    addPerList() {
      const selectionLength = this.multipleSelection.length
      if (selectionLength > 0) {
        for (let i = 0; i < selectionLength; i++) {
          const id = this.multipleSelection[i].id
          console.log(id)
          //   withempAdd().then(res=>{
          //   console.log(res)
          // }).catch((e)=>{
          //   console.log('添加人员列表失败')
          // })
          this.$axios({
            method: 'POST',
            url: `http://sksigmar.com:81/hrm/role/with-emp`,
            data: {
              empId: id,
              roleId: this.tableDatas.id
            }
          })
          this.getperPage()
          this.dialogTableVisible = false
        }
        // // 删除完数据之后清除勾选框
        // this.$refs.multipleTable.clearSelection();
      }
    },
    addPer() {
      this.dialogTableVisible = true
      this.getperAll()
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // getRolePage: async function () {
    // this.$axios({
    //   method: "get",
    //   url: "http://sksigmar.com:81/hrm/role/page",
    //   params: {
    //     page: this.page, // 当前页数
    //     rows: this.pageSize, //	下拉框每页条数
    //     sortBy: "seqNo", //	排序字段
    //     key: this.pagingSearchKey, //	查询
    //     desc: false, //	正逆序
    //   },
    // })
    //   .then((res) => {
    //     if (res.data.list.length > 0) {
    //       this.typeData = res.data.list; // 获取 每页对象
    //       this.total = res.data.total; // 获取 总条数
    //       this.pages = res.data.pages; // 获取 总页数
    //       this.pageSize = res.data.pageSize; // 获取 每页几条
    //     }
    //   })
    // },
    getRolePage() {
      RolePage(this.params).then(res => {
        this.typeData = res.list // 获取 每页对象
        this.Datatotal = res.total // 获取 总条数
        this.pages = res.pages // 获取 总页数
        this.pageSize = res.pageSize // 获取 每页几条
      }).catch((e) => {
        console.log(e)
      })
    },
    // 编辑
    openDetails(row) {
      console.log('row clicked')
      console.log(row)
      this.tableDatas = { ...row } // SE6语法
      this.dialogVisibleEdit = true
      this.getperPage()
      // this.$axios({
      //   method: "POST",
      //   url: `http://sksigmar.com:81//hrm/role/id/${id}`,
      // })
      //   .then((res) => {
      //     this.tableDatas = res.data;
      //     console.log(this.tableDatas);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    },
    // tableData: async function () {
    //   this.$axios({
    //     method: "get",
    //     url: "http://sksigmar.com:81//hrm/role/page",
    //     params: {
    //       // list: [], //每页的对象
    //       // pageNum: 0, //当前页
    //       // pageSize: 0,  //每页几条
    //       // pages: 0, //总页数
    //       // total: 0, //总条数
    //       page: this.page, // 当前页数
    //       rows: this.pageSize, //	下拉框每页条数
    //       sortBy: "co	", //	排序字段
    //       key: this.pagingSearchKey, //	查询
    //       desc: false, //	正逆序
    //     },
    //   })
    //     .then((res) => {
    //       if (res.data.list.length > 0) {
    //         this.typeData = res.data.list; // 获取 每页对象
    //         this.Datatotal = res.data.total; // 获取 总条数
    //         this.pages = res.data.pages; // 获取 总页数
    //         this.pageSize = res.data.pageSize; // 获取 每页几条
    //       }
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //       this.typeData = [];
    //       this.serverItemsLength = 0;
    //       this.pages = 1;
    //     });
    // },

    // 批量删除
    batchDel() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          const arr = []
          this.multipleSelection.forEach(el => {
            console.log('el: ', el)
            arr.push(el.id)
          })
          RoleDel(arr).then(res => {
          // 删除完数据之后清除勾选框
            this.$refs.multipleTable.clearSelection()
            this.page = 1
            this.getRolePage()
          }).catch(err => { // 报错进这个
            console.log('删除失败')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          message: '警告哦，你还没有选择要删除的数据',
          type: 'warning'
        })
      }
      // if (this.multipleSelection.length > 0) {
      //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning",
      //   })
      //     .then(() => {
      //       let selectionLength = this.multipleSelection.length;
      //       if (selectionLength > 0) {
      //         for (let i = 0; i < selectionLength; i++) {
      //           let roleCode = this.multipleSelection[i].roleCode;
      //         //   this.$axios({
      //         //     method: "POST",
      //         //     url: `http://sksigmar.com:81/mode/type/delType/${roleCode}`,
      //         //   });
      //          }

      //         this.page = 1;
      //         this.tableData();
      //         // 删除完数据之后清除勾选框
      //         this.$refs.multipleTable.clearSelection();
      //       }
      //       this.$message({
      //         type: "success",
      //         message: "删除成功!",
      //       });
      //     })
      //     .catch(() => {
      //       this.$message({
      //         type: "info",
      //         message: "已取消删除",
      //       });
      //     });
      // } else {
      //   this.$message({
      //     message: "警告哦，你还没有选择要删除的数据",
      //     type: "warning",
      //   });
      // }
    },
    searchlanID() {
      // alert(this.pagingSearchKey)
      console.log(this.params.page)
      this.params.page = 1
      this.getRolePage()
    },
    handleSelectionChange(val) {
      // 表头复选框按钮
      this.multipleSelection = val
    },
    clearFrom() {
      this.tableDatas = {
        roleCode: '',
        lanVal: '',
        remark: '',
        isActive: '0'
      }
    },
    //  添加的关闭x事件
    handleClose() {
      // this.$refs["tableDatas"].resetFields();
      this.dialogVisible = false
      this.clearFrom()
    },
    //  编辑的关闭x事件
    handleCloseEdit() {
      // this.$refs["tableDatas"].resetFields();
      this.dialogVisibleEdit = false
      this.clearFrom()
    },
    //  添加类型
    addSelect(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          RoleAdd(this.tableDatas).then(res => {
            console.log(res)
            this.getRolePage()
          }).catch(err => { // 报错进这个
            console.log('新增失败')
          })
          this.dialogVisible = false
          this.$message({
            message: '添加成功！',
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          this.clearFrom()
          return false
        }
      })
      if (!this.tableDatas.remark) {
        this.$message({
          message: '描述不能为空',
          type: 'warning'
        })
        return
      }
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$axios({
      //       method: "POST",
      //       url: "http://sksigmar.com:81/mode/type/addType",
      //       data: {
      //         lanVal: this.tableDatas.lanVal,
      //         remark	: this.tableDatas.remark	,
      //         remark: this.tableDatas.remark,
      //         creater: 1,
      //         supID: 0,
      //       },
      //     });
      //     this.page = 1;
      //     this.tableData();

      //     this.$message({
      //       message: "添加成功！",
      //       type: "success",
      //     });
      //     this.tableDatas = {
      //     createDate: "",
      //     createTime: "",
      //     creater: 0,
      //     id: 0,
      //     isActive: '',
      //     isDel: '',
      //     lanID: 0,
      //     lanVal: "",
      //     remark: "",
      //     remark	: '',
      //     supID: 0,
      //     };
      //     this.dialogVisible = false;
      //   } else {
      //     this.$message({
      //       message: "类型不能为空",
      //       type: "warning",
      //     });
      //     return false;
      //   }
      // });
    },
    //  编辑类型
    editType() {
      RoleUpdate(this.tableDatas, this.tableDatas.id).then(res => {
        console.log(res)
        this.getRolePage()
      }).catch(err => { // 报错进这个
        console.log('修改失败')
      })
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      this.clearFrom()
      this.dialogVisibleEdit = false
      //   this.$refs.tableDatas.validate((valid) => {
      //   if (valid) {
      //   //  let id = this.selectTableid
      //     this.$axios({
      //       method: 'POST',
      //       url: `http://sksigmar.com:81/mode/type/modifyType/${id}`,
      //       data:this.tableDatas
      //     })
      //     this.page = 1
      //     this.tableData()
      //     this.tableDatas = {

      //   roleCode: '',
      //   lanVal: "",
      //   remark: "",
      //   isActive: '0',
      //     };

      //     this.dialogVisibleEdit = false;
      //     this.$message({
      //     message: '恭喜你，修改成功！',
      //     type: 'success'
      //   })

      //   } else {
      //     this.$message.error('对不起，修改异常，请重新尝试');
      //     console.log('error submit!!')
      //     return false
      //    }
      // })
    },

    //  添加取消
    cancelAdd() {
      this.handleClose()
      // this.$refs["tableDatas"].resetFields();
      // this.tableDatas = {
      //   roleCode: '',
      //   lanVal: "",
      //   remark: "",
      //   isActive: '0',
      // };
      // this.dialogVisible = false;
    },
    //  编辑取消
    cancelEdit() {
      // this.$refs["tableDatas"].resetFields();
      this.clearFrom()
      this.dialogVisibleEdit = false
    },
    //  添加页面
    addInfo() {
      this.dialogVisible = true
    },
    handleCurrentChange(val) {
      console.log(val)
      this.params.page = val
      this.getRolePage()
    },
    handleCurrentSelChange(val) {
      this.page = val
    },
    handleCurrentPerChange(val) {
      this.page = val
    }
  }
}
</script>

<style>

</style>
