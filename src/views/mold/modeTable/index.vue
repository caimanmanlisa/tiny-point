<template>
  <div>
    <h3 class="title_cont">表结构</h3>
    <div class="content_toplayout">
      <!--搜索框的位置-->
      <div class="search_content fl">
        <el-button type="primary" icon="el-icon-search" @click="searchlanID" />
        <input
          v-model.trim="pagingSearchKey"
          type="text"
          class="search_content_input fl"
          placeholder="请输入关键字"
          @keyup.enter="searchlanID"
        >
      </div>
      <!--按钮位置-->
      <div class="button fr">
        <el-button type="primary" icon="el-icon-plus" @click="AddTable">添加</el-button>
        <el-button type="primary" icon="el-icon-minus" @click="delTable">删除</el-button>
        <el-button type="info" icon="el-icon-minus" @click="prohibitTable">禁用</el-button>
      </div>
    </div>
    <!-- 主页面数据展示-->
    <div class="table_box">
      <el-table
        ref="multipleTable"
        :data="typeData"
        :row-key="getRowKeys"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" :reserve-selection="true" />
        <el-table-column label="名称" prop="lanID" />

        <el-table-column prop="mainTypeVal" label="类型" />
        <el-table-column prop="tableName" label="数据库表名" />
        <el-table-column prop="seqNo" label="显示顺序" show-overflow-tooltip />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="checkTbale(scope.row.id)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 主页面分页-->
    <div class="block" style="text-align:center">
      <el-pagination
        background
        :current-page="page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 添加页面的el-dialog-->
    <el-dialog
      title="类型添加"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleCloseAdd"
    >
      <el-form ref="ruleForm" label-width="140px" :model="ruleForm" status-icon :rules="rules">
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="表结构名称" prop="lanID">
              <el-input v-model="ruleForm.lanID" autocomplete="off" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="数据库名称" prop="tableName">
              <el-input v-model="ruleForm.tableName" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="顺序显示" prop="seqNo">
              <el-input v-model="ruleForm.seqNo" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="描述" style="margin-bottom:5px">
              <el-input v-model="ruleForm.remark" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 显示修改的el-dialog-->
    <el-dialog
      title="类型修改"
      :visible.sync="dialogFromVisible"
      width="80%"
      :before-close="handleCloseEdit"
    >
      <el-tabs v-model="activeName">
        <!--基本分栏-->
        <el-tab-pane label="基础" name="first">
          <el-form ref="form" label-width="140px" :model="form" status-icon :rules="rules">
            <el-row :gutter="20">
              <el-col :span="23">
                <div class="form_btn">
                  <el-button type="primary" @click="modifyTable()">保存</el-button>
                  <el-button @click="editCancel()">取消</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="表结构名称" prop="lanID">
                  <el-input v-model="form.lanID" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label="数据库名称">
                  <el-input v-model="form.tableName" readonly />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="显示顺序">
                  <el-input v-model="form.seqNo" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="23">
                <el-form-item label="描述" style="margin-bottom:5px">
                  <el-input v-model="form.remark" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <!--字段列表分栏-->

        <el-tab-pane label="字段列表" name="second">
          <div class="search_content fl">
            <el-button type="primary" icon="el-icon-search" @click="searchFname" />
            <input
              v-model.trim="pagingSearFormchKey"
              type="text"
              class="search_content_input fl"
              placeholder="请输入关键字"
              @keyup.enter="searchFname"
            >
          </div>
          <div class="button fr">
            <el-button type="primary" icon="el-icon-plus" @click="addSelect()">添加</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="pladdSelect()">批量添加</el-button>
            <el-button type="info" icon="el-icon-minus">删除</el-button>
          </div>
          <div class="table_box">
            <el-table
              ref="multipleTable"
              :data="fyForm"
              :row-key="getRowKeys"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" :reserve-selection="true" />
              <el-table-column prop="fname" label="数据库字段名" />
              <el-table-column prop="lanIDVal" label="字段显示名" />
              <el-table-column prop="ftypeVal" label="字段类型" show-overflow-tooltip />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="checkSelectTbale(scope.row.id)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页-->
          <div class="block" style="text-align:center">
            <el-pagination
              :current-page="fyTo.page"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="fyTo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="fyTo.total"
              @size-change="handleSizeChangeForm"
              @current-change="handleCurrentChangeForm"
            />
          </div>
        </el-tab-pane>
        <!--子表分栏-->
        <el-tab-pane label="子表" name="third"><subList /></el-tab-pane>
      </el-tabs>
    </el-dialog>
    <singleAddition ref="singleAddition" />
    <BatchAdd ref="BatchAdd" />
  </div>
</template>
<script>
import singleAddition from './components/singleAddition'
import BatchAdd from './components/BatchAdd'
import subList from './components/subList'
export default {
  components: {
    singleAddition,
    BatchAdd,
    subList
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入表结构名称'))
      } else {
        callback()
      }
    }
    var validatedbName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入数据库名称'))
      } else {
        callback()
      }
    }
    var validateorderBy = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入顺序显示'))
      } else {
        callback()
      }
    }
    var validateorderlanID = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入表结构名称'))
      } else {
        callback()
      }
    }
    var validateorderDadd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入表结构名称'))
      } else {
        callback()
      }
    }
    var validateorderDaddlanIDVal = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入表结构名称'))
      } else {
        callback()
      }
    }
    var validateorderDaddfname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入表结构名称'))
      } else {
        callback()
      }
    }
    var validateorderDaddvalue1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入表结构名称'))
      } else {
        callback()
      }
    }
    return {
      form: {
        id: 0,
        lanID: '',
        mainType: '',
        mainTypeVal: '',
        remark: '',
        seqNo: 0,
        supID: 0,
        tableName: '',
        tableId: ''
      },
      // 新增变量

      // 验证v-model 变量
      ruleForm: {
        lanID: '',
        mainTypeVal: '',
        seqNo: '',
        remark: '',
        mainType: '0',
        tableName: ''
      },
      // 错误提示
      rules: {
        lanID: [{ validator: validateName, trigger: 'blur' }],
        tableName: [{ validator: validatedbName, trigger: 'blur' }],
        seqNo: [{ validator: validateorderBy, trigger: 'blur' }],
        lanID: [{ validator: validateorderlanID, trigger: 'blur' }],
        lanIDVal: [{ validator: validateorderDaddlanIDVal, trigger: 'blur' }],
        fname: [{ validator: validateorderDaddfname, trigger: 'blur' }],
        value1: [{ validator: validateorderDaddvalue1, trigger: 'change' }]
      },
      activeName: 'first',
      dialogVisible: false, // 添加弹框的显示
      dialogFromVisible: false, // 点击名称
      dialogVisibleDselect: false, // 添加页面
      selectTableid: 0, // 点击列时候产生的这行id
      pageSize: 10, // 一页几条数据
      pages: 0, // 每页总页数
      page: 1, //	当前页数
      total: 0, // 总条数
      typeData: [], // 数据
      multipleSelection: [], // 复选框
      getRowKeys(row) {
        // 记录每行的key值
        return row.id
      },
      pagingSearchKey: null, // 查询的值的字符串
      pagingSearFormchKey: null, // 子页面的查询的值的字符串
      selFieldByPage: {
        fname: '',
        lanIDVal: '',
        ftypeVal: ''
      },
      fyForm: [],
      fyTo: {
        pageNum: 0,
        pageSize: 10,
        pages: 0,
        total: 0,
        page: 1
      },

      multipleSelections: [],

      tableData: [
        {
          dbName: '',
          address: '',
          name: '',
          weather: '',
          phone: '',
          date: '',
          mdate: '',
          loveer: ''
        }
      ],
      addField: {
        flength: 0,
        fname: '',
        fpower: '',
        fremark: '',
        fsysSelect: 0,
        ftype: 0,
        ftypeDt: '',
        ftypeDt1: '',
        isActive: '',
        isRange: '',
        lanIDVal: '',
        maxFName: '',
        maxNumber: 0,
        minFName: '',
        minNumber: 0,
        seqNo: '',
        tableID: 0,
        value1: ''
      }
    }
  },
  created() {
    this.getData() // 显示分页
  },
  methods: {
    getData: async function() {
      this.$axios({
        method: 'get',
        url: 'http://sksigmar.com:81/mode/table/selTableByPage',
        params: {
          page: this.page, // 当前页数
          rows: this.pageSize, //	下拉框每页条数
          sortBy: 'seqNo', //	排序字段
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
    searchFname() {
      this.fyTo.page = 1
      this.getFormData()
    },
    // 复选框改变事件
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionChangepl(val) {
      this.multipleSelections = val
    },
    // pageSize变化时时间
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
      //  this.table()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.page = val
      this.getData()
      // this.table()
      console.log(this.page)
      console.log(`当前页: ${val}`)
    },
    handleSizeChangeForm(val) {
      this.fyTo.pageSize = val
      this.getFormData()
      //  this.table()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChangeForm(val) {
      this.fyTo.page = val
      this.getFormData()
      // this.table()
      console.log(this.fyTo.page)
      console.log(`当前页: ${val}`)
    },
    // 查询1事件
    searchlanID() {
      this.page = 1
      this.getData()
      // this.table()
    },
    // 删除事件
    delTable: async function() {
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
                const id = this.multipleSelection[index].id
                this.$axios({
                  method: 'POST',
                  url: `http://sksigmar.com:81/mode/table/delTable/${id}`
                })
              }
              this.page = 1
              this.getData()
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
    // 禁止事件
    prohibitTable: async function() {
      const selectionLength = this.multipleSelection.length
      if (selectionLength > 0) {
        for (let index = 0; index < selectionLength; index++) {
          const id = this.multipleSelection[index].id
          this.$axios({
            method: 'POST',
            url: `http://sksigmar.com:81/mode/table/disableTable/${id}`
          })
        }
        this.getData()
      }
    },
    // 二级模态框的添加事件
    AddTable() {
      this.dialogVisible = true
    },
    // 关闭X事件
    handleCloseAdd() {
      this.$refs['ruleForm'].resetFields()
      this.dialogVisible = false
    },
    // 编辑x事件
    handleCloseEdit() {
      this.$refs['form'].resetFields()
      this.dialogFromVisible = false
    },
    // 批量x事件
    handleCloseSelect() {
      this.$refs['addField'].resetFields()
      this.dialogVisibleDselect = false

      this.clearFormMod()
    },
    handleCloseSelectpl() {
      this.dialogVisiblePl = false
    },
    // 添加保存的点击事件进行验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'POST',
            url: 'http://sksigmar.com:81/mode/table/addTable',
            data: this.ruleForm
          })
          this.handleSizeChange()
          // this.page = 1

          this.clearFormMod()
          this.dialogVisible = false

          this.$message({
            message: '恭喜你，添加成功！',
            type: 'success'
          })
        } else {
          this.$message.error('对不起，数据异常，请重新输入')
          console.log('error submit!!')
          return false
        }
      })
    },
    // 单添加保存
    modifySingle(addField) {
      this.$refs['addField'].validate((valid) => {
        if (valid) {
          this.$message({
            message: '恭喜你，保存成功！',
            type: 'success'
          })
          this.dialogVisibleDselect = false
          this.clearFormMod()
        } else {
          this.$message.error('对不起，数据异常，请重新输入')
          console.log('error submit!!')
          return false
        }
      })
    },
    // 添加取消按钮的点击事件 (取消了验证)
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
    },
    // 编辑取消按钮的点击事件(取消了验证)
    editCancel() {
      this.$refs['form'].resetFields()
      this.dialogFromVisible = false
    },
    // 查看每行数据
    checkTbale(id) {
      this.selectTableid = id
      this.dialogFromVisible = true
      this.$axios({
        method: 'POST',
        url: `http://sksigmar.com:81/mode/table/selTableByID/${id}`
      })
        .then((res) => {
          this.form = res.data
          console.log(this.form)
        })
        .catch((e) => {
          console.log(e)
        })
      this.getFormData(id)
    },
    // 修改数据
    modifyTable() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const id = this.selectTableid
          this.$axios({
            method: 'POST',
            url: `http://sksigmar.com:81/mode/table/modifyTable/${id}`,
            data: this.form
          })
          this.page = 1
          this.getData()
          this.dialogFromVisible = false
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
    // 2级分页
    getFormData() {
      this.$axios({
        method: 'get',
        url: 'http://sksigmar.com:81/mode/field/selFieldByPage',
        params: {
          tableID: this.selectTableid, // 根据 id来获取查询
          page: this.fyTo.page, // 当前页数
          rows: this.fyTo.pageSize, //	下拉框 每页条数
          sortBy: 'seqNo', //	排序字段
          key: this.pagingSearFormchKey, //	查询输入框字段
          desc: false //	正逆序
        }
      })
        .then((res) => {
          if (res.data.list.length > 0) {
            this.fyForm = res.data.list // 获取 每页对象并且赋值给fyForm
            this.fyTo.total = res.data.total // 获取 总条数
            this.fyTo.pages = res.data.pages // 获取 总页数
            this.fyTo.pageSize = res.data.pageSize // 获取 每页几条
          }
        })
        .catch((e) => {
          console.log(e)
          this.fyForm = []
          this.serverItemsLength = 0
          this.pages = 1
        })
    },

    addSelect() {
      this.$refs.singleAddition.dialogVisibleDselect = true
    },
    pladdSelect() {
      this.$refs.BatchAdd.dialogVisiblePl = true
    },
    checkSelectTbale() {
      this.$refs.singleAddition.dialogVisibleDselect = true
    },
    // 清空数据源
    clearFormMod() {
      this.ruleForm = {
        lanID: '',
        mainTypeVal: '',
        seqNo: '',
        remark: '',
        mainType: '0',
        tableName: ''
      }
      this.form = {
        id: 0,
        lanID: '',
        mainType: '',
        mainTypeVal: '',
        remark: '',
        seqNo: 0,
        supID: 0,
        tableName: '',
        tableId: ''
      }
      this.addField = {
        flength: 0,
        fname: '',
        fpower: '',
        fremark: '',
        fsysSelect: 0,
        ftype: 0,
        ftypeDt: '',
        ftypeDt1: '',
        isActive: '',
        isRange: '',
        lanIDVal: '',
        maxFName: '',
        maxNumber: 0,
        minFName: '',
        minNumber: 0,
        seqNo: '',
        tableID: 0
      }
    }
  }
}
</script>
