<template>
  <div class="app-container">
    <h3 class="title_cont">下拉维护</h3>

    <div class="content_toplayout">
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
      <div class="button fr">
        <el-button type="primary" icon="el-icon-plus" @click="addInfo">添加</el-button>
        <el-button type="primary" icon="el-icon-minus" @click="batchDel">删除</el-button>
      </div>
    </div>
    <!-- 主页面 -->
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
      >
        <el-table-column type="selection" :reserve-selection="true" />
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="lanIDVal" label="名称" />
        <el-table-column prop="seqNo" label="排序" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row.id)" />
          </template>
        </el-table-column>
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

    <!-- 下拉框添加 -->
    <el-dialog
      title="下拉框信息维护"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form
        ref="modeSelectInfoAdd"
        label-width="140px"
        :model="modeSelectInfo"
        status-icon
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary" @click="selectAdd">保存</el-button>
              <el-button @click="cancelAdd">取消</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="22">
          <el-col :span="22">
            <el-form-item label="名称" prop="lanIDVal">
              <el-input v-model="modeSelectInfo.lanIDVal" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="显示顺序 ">
              <el-input-number
                v-model="modeSelectInfo.seqNo"
                controls-position="right"
                style="width:100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog
      title="下拉框信息维护"
      :visible.sync="dialogVisibleselect"
      width="80%"
      :before-close="handleCloseEdit"
      :close-on-click-modal="false"
    >
      <!-- 下拉框修改 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本" name="first">
          <el-form
            ref="modeSelectInfoEdit"
            label-width="140px"
            :model="modeSelectInfo"
            status-icon
            :rules="rules"
          >
            <el-row :gutter="20">
              <el-col :span="23">
                <div class="form_btn">
                  <el-button type="primary" @click="selectEdit">保存</el-button>
                  <el-button @click="cancelEdit">取消</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="22">
              <el-col :span="22">
                <el-form-item label="名称" prop="lanIDVal">
                  <el-input v-model="modeSelectInfo.lanIDVal" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="22">
                <el-form-item label="显示顺序 ">
                  <el-input-number
                    v-model="modeSelectInfo.seqNo"
                    controls-position="right"
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>

        <!-- 明细显示 -->
        <el-tab-pane label="下拉框维护" name="second">
          <div class="button fr">
            <el-button type="primary" icon="el-icon-plus" @click="addSelected">添加</el-button>
            <el-button type="primary" icon="el-icon-minus" @click="delSelected">删除</el-button>
          </div>
          <div class="table_box">
            <el-table
              ref="multipleTable"
              :data.sync="typeDatas"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" />
              <el-table-column prop="id" label="序号" />
              <el-table-column prop="lanIDVal" label="名称" />
              <el-table-column prop="selectKey" label="下拉框值" />
              <el-table-column prop="seqNo" label="排序" />

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="editofmodify(scope.row.id)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 明细添加 -->
    <el-dialog
      title="下拉维护添加"
      :visible.sync="dialogVisibleMaintain"
      width="80%"
      :before-close="dialogBeforeCloseMaintain"
      :close-on-click-modal="false"
    >
      <el-form
        ref="modeSelectInfoAdds"
        label-width="140px"
        :model="modeSelectforAdd"
        status-icon
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary" @click="selectofAdd">保存</el-button>
              <el-button @click="cancelofAdd">取消</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="22">
          <el-col :span="22">
            <el-form-item label="名称" prop="lanIDVal">
              <el-input v-model="modeSelectforAdd.lanIDVal" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="下拉框值" prop="selectKey">
              <el-input v-model="modeSelectforAdd.selectKey" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="显示顺序 ">
              <el-input-number
                v-model="modeSelectforAdd.seqNo"
                controls-position="right"
                style="width:100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 明细修改 -->
    <el-dialog
      title="下拉维护修改"
      :visible.sync="dialogVisibleofmodify"
      width="80%"
      :before-close="dialogBeforeCloseofmodify"
      :close-on-click-modal="false"
    >
      <el-form
        ref="modeSelectofModify"
        label-width="140px"
        :model="modeSelectforAdd"
        status-icon
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary" @click="selectofModify">保存</el-button>
              <el-button @click="cancelofModify">取消</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="22">
          <el-col :span="22">
            <el-form-item label="名称" prop="lanIDVal">
              <el-input v-model="modeSelectforAdd.lanIDVal" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="下拉框值">
              <el-input v-model="modeSelectforAdd.selectKey" readonly="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="显示顺序 ">
              <el-input-number
                v-model="modeSelectforAdd.seqNo"
                controls-position="right"
                style="width:100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var validateaddselectadd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入名称'))
      } else {
        callback()
      }
    }
    var validateaddselectedit = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入名称'))
      } else {
        callback()
      }
    }
    var validateaddselectofadd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入名称'))
      } else {
        callback()
      }
    }
    var validateaddselectofadds = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入下拉框值'))
      } else if (this.pdselect === 1) {
        callback(new Error('下拉框又重复值哦！'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false, // 弹框的显示
      dialogVisibleselect: false, // 修改的显示
      dialogVisibleMaintain: false, // 明细添加
      dialogVisibleofmodify: false, // 下拉框修改

      selectTableid: '', //
      selectTableforid: '', //
      pagingSearchKey: null, // 查询的值的字符串
      pageSize: 10, // 一页几条数据
      pages: 0, // 每页总页数
      page: 1, //	当前页数
      total: 0, // 总条数
      typeData: [],
      typeDatas: [],
      selectform: {
        id: 0,
        isActive: '',
        lanIDVal: '',
        mainID: 0,
        selectKey: '',
        seqNo: 0
      },
      getRowKeys(row) {
        // 记录每行的key值
        return row.id
      },
      modeSelectInfo: {
        lanIDVal: '',
        seqNo: 0,
        selectKey: ''
      },
      modeSelectforAdd: {
        lanIDVal: '',
        seqNo: 0,
        selectKey: ''
      },
      multipleSelection: [],
      activeName: 'first',
      rules: {
        lanIDVal: [{ validator: validateaddselectadd, trigger: 'blur' }],
        lanIDVal: [{ validator: validateaddselectedit, trigger: 'blur' }],
        lanIDVal: [{ validator: validateaddselectofadd, trigger: 'blur' }],
        selectKey: [{ validator: validateaddselectofadds, trigger: 'blur' }]
      },
      pdselect: 0
    }
  },
  watch: {
    'modeSelectforAdd.selectKey'() {
      this.$axios({
        method: 'get',
        url: 'http://sksigmar.com:81/mode/select/selDetailByMainIdAndSelectKey',
        params: {
          mainId: this.selectTableid,
          selectKey: this.modeSelectforAdd.selectKey
        }
      }).then((res) => {
        if (res.data.id === null) {
          this.pdselect = 0
        } else {
          this.pdselect = 1
        }
      })
    }
  },
  created() {
    this.tableData() // 显示展示主页面
  },
  created() {
    this.tableData() // 显示展示主页面
  },
  methods: {
    // 的带主页面的显示
    tableData: async function() {
      this.$axios({
        method: 'get',
        url: 'http://sksigmar.com:81/mode/select/selSelectByPage',
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

    // 得到明细的显示事件
    getFormData: async function() {
      this.$axios({
        method: 'get',
        url: 'http://sksigmar.com:81/mode/select/selDetailByMainID',
        params: {
          mainID: this.selectTableid
        }
      })
        .then((res) => {
          // 这里=0时， 没更新
          if (res.data.length >= 0) {
            this.typeDatas = res.data // 获取 每页对象并且赋值给fyForm
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 主页面的查询
    searchlanID() {
      this.page = 1
      this.tableData()
    },
    // 分页事件
    handleSizeChange(val) {
      this.pageSize = val
      this.tableData()
    },
    // 分页事件
    handleCurrentChange(val) {
      this.page = val
      this.tableData()
    },
    // 主页面批量删除
    batchDel() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const selectionLength = this.multipleSelection.length
            let json = ''
            if (selectionLength > 0) {
              for (let index = 0; index < selectionLength; index++) {
                const id = this.multipleSelection[index].id
                if (index < selectionLength - 1) {
                  json += id + ','
                } else {
                  json += id
                }
              }
              this.$axios({
                method: 'POST',
                url: `http://sksigmar.com:81/mode/select/delSelect/${json}`
              }).then(() => {
                this.page = 1
                this.tableData()
                // 删除完数据之后清除勾选框
                this.$refs.multipleTable.clearSelection()
              })
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
    // 主页面打开编辑的事件
    edit(id) {
      this.typeDatas = []
      this.selectTableid = id
      this.dialogVisibleselect = true
      this.$axios({
        method: 'POST',
        url: `http://sksigmar.com:81/mode/select/selSelectById/${id}`
      })
        .then((res) => {
          this.modeSelectInfo = res.data
          console.log(this.modeSelectInfo)
        })
        .catch((e) => {
          console.log(e)
        })
      this.getFormData()
    },
    handleSelectionChange(val) {
      // 表头复选框按钮
      this.multipleSelection = val
    },
    // 下拉框添加的x事件
    handleClose() {
      this.$refs.modeSelectInfoAdd.resetFields()
      this.dialogVisible = false
      this.modeSelectInfo = {
        lanIDVal: '',
        seqNo: 0
      }
    },
    // 修改和明细大的X事件
    handleCloseEdit() {
      this.$refs.modeSelectInfoEdit.resetFields()
      this.dialogVisibleselect = false
      this.modeSelectInfo = {
        lanIDVal: '',
        seqNo: 0
      }
    },
    // 下拉框的添加的保存事件
    selectAdd() {
      this.$refs.modeSelectInfoAdd.validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'POST',
            url: 'http://sksigmar.com:81/mode/select/addSelect',
            data: {
              lanIDVal: this.modeSelectInfo.lanIDVal,
              seqNo: this.modeSelectInfo.seqNo
            }
          }).then(() => {
            this.tableData()
          })
          this.$message({
            message: '添加成功！',
            type: 'success'
          })
          this.modeSelectforAdd = {
            lanIDVal: '',
            seqNo: 0,
            selectKey: ''
          }
          this.dialogVisible = false
        } else {
          this.$message({
            message: '对不起，数据错误，请重新尝试',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 下拉框的修改保存事件
    selectEdit(id) {
      this.$refs.modeSelectInfoEdit.validate((valid) => {
        if (valid) {
          const id = this.selectTableid
          this.$axios({
            method: 'POST',
            url: `http://sksigmar.com:81/mode/select/modifySelect/${id}`,
            data: this.modeSelectInfo
          }).then(() => {
            this.tableData()
          })
          this.$message({
            message: '恭喜你，修改成功！',
            type: 'success'
          })
          this.modeSelectInfo = {
            lanIDVal: '',
            seqNo: 0
          }
          this.dialogVisibleselect = false
        } else {
          this.$message.error('对不起，修改异常，请重新尝试')
          console.log('error submit!!')
          return false
        }
      })
    },
    // 下拉框的添加取消事件
    cancelAdd() {
      this.$refs.modeSelectInfoAdd.resetFields()
      this.modeSelectInfo = {
        lanIDVal: '',
        seqNo: 0
      }
      this.dialogVisible = false
    },
    // 下拉框的修改取消事件
    cancelEdit() {
      this.$refs.modeSelectInfoEdit.resetFields()
      this.modeSelectInfo = {
        lanIDVal: '',
        seqNo: 0
      }
      this.dialogVisibleselect = false
    },
    // 打开添加下拉框事件
    addInfo() {
      this.dialogVisible = true
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 打开明细添加
    addSelected() {
      this.dialogVisibleMaintain = true
    },
    // 删除明细
    delSelected() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const selectionLength = this.multipleSelection.length
            let json = ''
            if (selectionLength > 0) {
              for (let index = 0; index < selectionLength; index++) {
                const id = this.multipleSelection[index].id
                if (index < selectionLength - 1) {
                  json += id + ','
                } else {
                  json += id
                }
              }
              console.log(json)
              this.$axios({
                method: 'POST',
                url: `http://sksigmar.com:81/mode/select/delDetail/${json}`
              }).then(() => {
                this.getFormData()
                // 删除完数据之后清除勾选框
                this.$refs.multipleTable.clearSelection()
              })
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
    // 明细添加x关闭
    dialogBeforeCloseMaintain() {
      this.$refs.modeSelectInfoAdds.resetFields()
      this.dialogVisibleMaintain = false
    },
    // 明细的添加的保存事件
    selectofAdd() {
      this.$refs.modeSelectInfoAdds.validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'POST',
            url: 'http://sksigmar.com:81/mode/select/addDetail',
            data: {
              lanIDVal: this.modeSelectforAdd.lanIDVal,
              seqNo: this.modeSelectforAdd.seqNo,
              selectKey: this.modeSelectforAdd.selectKey,
              mainID: this.selectTableid
            }
          }).then(() => {
            this.getFormData()
          })
          this.$message({
            message: '添加成功！',
            type: 'success'
          })
          console.log(this.modeSelectforAdd)
          this.modeSelectforAdd = {
            lanIDVal: '',
            seqNo: '',
            selectKey: ''
          }
          this.dialogVisibleMaintain = false
        } else {
          this.$message({
            message: '对不起，数据错误，请重新尝试',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 明细添加的取消事件
    cancelofAdd(formName) {
      this.$refs.modeSelectInfoAdds.resetFields()
      this.dialogVisibleMaintain = false
    },
    // 打开明细的详情
    editofmodify(id) {
      this.selectTableforid = id
      this.$axios({
        method: 'POST',
        url: `http://sksigmar.com:81/mode/select/selDetailById/${id}`
      })
        .then((res) => {
          this.modeSelectforAdd = res.data
          // console.log(this.modeSelectInfo);
        })
        .catch((e) => {
          console.log(e)
        })
      this.dialogVisibleofmodify = true
    },

    // 关闭明细详情的x事件
    dialogBeforeCloseofmodify() {
      this.$refs.modeSelectofModify.resetFields()
      this.modeSelectforAdd = {
        lanIDVal: '',
        seqNo: 0,
        selectKey: ''
      }
      this.dialogVisibleofmodify = false
    },
    // 明细详情修改的确定事件
    selectofModify() {
      const id = this.selectTableforid
      this.$refs.modeSelectofModify.validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'POST',
            url: `http://sksigmar.com:81/mode/select/modifyDetail/${id}`,
            data: {
              lanIDVal: this.modeSelectforAdd.lanIDVal,
              seqNo: this.modeSelectforAdd.seqNo,
              selectKey: this.modeSelectforAdd.selectKey,
              mainID: this.selectTableforid
            }
          }).then(() => {
            this.getFormData()
          })
          this.modeSelectforAdd = {
            lanIDVal: '',
            seqNo: 0,
            selectKey: ''
          }
          this.dialogVisibleofmodify = false
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
    // 明细详情的取消事件
    cancelofModify(formName) {
      this.$refs.modeSelectofModify.resetFields()
      this.modeSelectforAdd = {
        lanIDVal: '',
        seqNo: 0,
        selectKey: ''
      }
      this.dialogVisibleofmodify = false
    }
  }
}
</script>

