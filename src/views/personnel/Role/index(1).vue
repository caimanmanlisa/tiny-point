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
        @row-click="openDetails()"
      >
        <el-table-column type="selection" width="55" :reserve-selection="true" />
        <el-table-column prop="roleCode" label="角色组编码">
          <template @click="dialogVisibleEdit=true" />
        </el-table-column>
        <el-table-column prop="lanVal" label="名称" />
        <el-table-column prop="remark	" label="备注" />
        <el-table-column prop="isActive" label="启用">
          <template>
            <el-checkbox true-label="0" false-label="1" />
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.roleCode)" type="primary" icon="el-icon-edit" circle></el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="block" style="text-align:center">
      <el-pagination
        background
        :current-page="page"
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog title="类型添加" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">

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
      </el-form>
    </el-dialog>

    <el-dialog
      title="编辑类型"
      :visible="dialogVisibleEdit"
      width="80%"
      :before-close="handleCloseEdit"
    >
      <el-form
        ref="modeTypeInfos"
        label-width="140px"
        :model="tableDatas"
        status-icon
        :rules="rules"
      >
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
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { RolePage, RoleUpdate, RoleDel, RoleAdd } from '@/api/personnel'
export default {
  data() {
    var validateaddtype = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入类型'))
      } else {
        callback()
      }
    }
    var validateedittype = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入类型'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false, // 添加弹框的显示
      dialogVisibleEdit: false, // 编辑弹框的显示

      pagingSearchKey: null, // 查询的值的字符串
      pageSize: 10, // 一页几条数据
      pages: 0, // 每页总页数
      page: 1, //	当前页数
      total: 0, // 总条数
      typeData: [],
      selectTableid: '',
      //  数据源
      tableDatas:
        { roleCode: 0, lanVal: '', remark: '',
          createDate: '',
          createTime: '',
          creater: 0,
          isActive: '0',
          isDel: '',
          lanID: 0,
          supID: 0
        },

      getRowKeys(row) {
        // 记录每行的key值
        return row.roleCode
      },
      // fyTo: {
      //   pageNum: 0,
      //   pageSize: 10,
      //   pages: 0,
      //   total: 0,
      //   page: 1,
      // },
      //  复选框
      multipleSelection: [],
      //  验证
      rules: {
        lanVal: [{ validator: validateaddtype, trigger: 'blur' }],
        lanVal: [{ validator: validateedittype, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getRolePage()
    this.tableData() // 显示分页
    // this.table()
  },

  methods: {
    getRolePage() {
      RolePage().then(res => {

      }).catch((e) => {
        console.log(e)
        this.typeData = []
        this.serverItemsLength = 0
        this.pages = 1
      })
    },
    tableData: async function() {
      this.$axios({
        method: 'get',
        url: 'http://sksigmar.com:81//hrm/role/page',
        params: {
          page: this.page, // 当前页数
          rows: this.pageSize, //	下拉框每页条数
          sortBy: 'remark	', //	排序字段
          key: this.pagingSearchKey, //	查询
          desc: false //	正逆序
        }
      })
        .then((res) => {
          if (res.data.list.length > 0) {
            this.typeData = res.data.list // 获取 每页对象
            this.total = res.data.total // 获取 总条数
            this.pages = res.data.pages // 获取 总页数
            this.pageSize = res.data.pageSize // 获取 每页几条
          }
        })
        .catch((e) => {
          console.log(e)
          this.typeData = []
          this.serverItemsLength = 0
          this.pages = 1
        })
    },

    // 批量删除
    batchDel() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const selectionLength = this.multipleSelection.length
            if (selectionLength > 0) {
              for (let index = 0; index < selectionLength; index++) {
                const roleCode = this.multipleSelection[index].roleCode
                this.$axios({
                  method: 'POST',
                  url: `http://sksigmar.com:81/mode/type/delType/${roleCode}`
                })
              }
              this.page = 1
              this.tableData()
              // 删除完数据之后清除勾选框
              this.$refs.multipleTable.clearSelection()
            }
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(() => {
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
    },
    // 编辑
    openDetails(row, event, column) {
      console.log(row, event, column)
      // this.selectTableid = id;
      this.dialogVisibleEdit = true
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
    handleSelectionChange(val) {
      // 表头复选框按钮
      this.multipleSelection = val
    },
    //  添加的关闭x事件
    handleClose() {
      this.$refs['tableDatas'].resetFields()
      this.dialogVisible = false
      this.tableDatas = {
        createDate: '',
        createTime: '',
        creater: 0,
        roleCode: 0,
        isActive: '',
        isDel: '',
        lanID: 0,
        lanVal: '',
        remark: '',
        remark: '',
        supID: 0
      }
    },
    //  编辑的关闭x事件
    handleCloseEdit() {
      this.$refs['modeTypeInfos'].resetFields()
      this.dialogVisibleEdit = false
      this.tableDatas = {
        createDate: '',
        createTime: '',
        creater: 0,
        id: 0,
        isActive: '',
        isDel: '',
        lanID: 0,
        lanVal: '',
        remark: '',
        remark: '',
        supID: 0
      }
    },
    //  添加类型
    addSelect(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'POST',
            url: 'http://sksigmar.com:81/mode/type/addType',
            data: {
              lanVal: this.tableDatas.lanVal,
              remark: this.tableDatas.remark,
              remark: this.tableDatas.remark,
              creater: 1,
              supID: 0
            }
          })
          this.page = 1
          this.tableData()

          this.$message({
            message: '添加成功！',
            type: 'success'
          })
          this.tableDatas = {
            createDate: '',
            createTime: '',
            creater: 0,
            id: 0,
            isActive: '',
            isDel: '',
            lanID: 0,
            lanVal: '',
            remark: '',
            remark: '',
            supID: 0
          }
          this.dialogVisible = false
        } else {
          this.$message({
            message: '类型不能为空',
            type: 'warning'
          })
          return false
        }
      })
    },
    //  编辑类型
    editType() {
      this.$refs.modeTypeInfos.validate((valid) => {
        if (valid) {
          const id = this.selectTableid
          this.$axios({
            method: 'POST',
            url: `http://sksigmar.com:81/mode/type/modifyType/${id}`,
            data: this.tableDatas
          })
          this.page = 1
          this.tableData()
          this.tableDatas = {
            createDate: '',
            createTime: '',
            creater: 0,
            id: 0,
            isActive: '',
            isDel: '',
            lanID: 0,
            lanVal: '',
            remark: '',
            remark: '',
            supID: 0
          }

          this.dialogVisibleEdit = false
          this.$message({
            message: '恭喜你，修改成功！',
            type: 'success'
          })
        } else {
          this.$message.error('对不起，修改异常，请重新尝试')
          console.log('error submit!!')
          return false
        }
      })
    },

    //  添加取消
    cancelAdd() {
      this.$refs['tableDatas'].resetFields()
      this.tableDatas = {
        createDate: '',
        createTime: '',
        creater: 0,
        id: 0,
        isActive: '',
        isDel: '',
        lanID: 0,
        lanVal: '',
        remark: '',
        remark: '',
        supID: 0
      }
      this.dialogVisible = false
    },
    //  编辑取消
    cancelEdit() {
      this.$refs['modeTypeInfos'].resetFields()
      this.tableDatas = {
        createDate: '',
        createTime: '',
        creater: 0,
        id: 0,
        isActive: '',
        isDel: '',
        lanID: 0,
        lanVal: '',
        remark: '',
        remark: '',
        supID: 0
      }
      this.dialogVisibleEdit = false
    },
    //  添加页面
    addInfo() {
      this.dialogVisible = true
    },
    searchlanID() {
      this.page = 1
      this.tableData()
    },
    //  分页事件改编页码
    handleSizeChange(val) {
      this.pageSize = val
      this.tableData()
    },
    handleCurrentChange(val) {
      this.page = val
      this.tableData()
    }
  }
}
</script>

<style>

</style>
