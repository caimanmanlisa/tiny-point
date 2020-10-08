<template>
  <div class="app-container">

    <h3 class="title_cont">流转-类型</h3>

    <div class="content_toplayout">
      <div class="search_content fl">
        <el-button type="primary" icon="el-icon-search" @click="getTypePaging" />
        <input v-model="query.key" type="text" class="search_content_input fl" placeholder="请输入关键字">
      </div>
      <div class="button fr">
        <el-button type="primary" icon="el-icon-plus" @click="addInfo">添加</el-button>
        <el-button type="primary" icon="el-icon-minus" @click="batchDel">删除</el-button>
      </div>
    </div>

    <div class="table_box">

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="ID"
          prop="id"
        />
        <el-table-column label="类型" prop="lanVal" />
        <el-table-column
          prop="sort"
          label="排序"
        >
          <template slot-scope="scope">
            {{ scope.row.seqNo }}
          </template>
        </el-table-column>
        <el-table-column
          label="启用"
        >
          <template slot-scope="scope">
            {{ scope.row.isActive === '1' ? "启用" : "禁用" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row)" />
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

    </div>

    <el-dialog
      :title="isEditIndex === -1 ? '添加流转类型' : '修改流转类型'"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >

      <el-form label-width="140px" :rules="rules">

        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary" @click="comfirm">保存</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="类型" prop="lanVal">
              <el-input v-model="flowInfo.lanVal" />
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="排序" prop="seqNo">
              <el-input v-model="flowInfo.seqNo" type="number" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="描述" style="margin-bottom:5px" prop="seqNo">
              <el-input v-model="flowInfo.remark" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="启用">
              <el-switch v-model="flowInfo.isActive" />
            </el-form-item>
          </el-col>
        </el-row>  -->

      </el-form>

    </el-dialog>

  </div>

</template>

<script>
import { typePaging, fsetType, fsetTypeUpdata, fsetTypeDelete } from '@/api/flow'
export default {
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      dataTotal: 0,
      currentPage: 1,
      query: {
        key: '',
        page: 1,
        rows: 10,
        sortBy: 'seqNo',
        desc: false
      },
      isEditIndex: -1,
      dialogVisible: false, // 弹框的显示
      value1: true,
      flowInfo: { // 流转类型信息
        lanVal: '',
        remark: '',
        seqNo: 10
      },

      tableData: [],
      multipleSelection: []
    }
  },
  created() {
    this.getTypePaging()
  },
  methods: {
    // 修改
    getFsetTypeUpdata() {
      console.log('getFsetTypeUpdata')
      console.log('isEditIndex: ', this.isEditIndex)
      console.log('this.flowInfo: ', this.flowInfo)
      fsetTypeUpdata(this.flowInfo, this.isEditIndex).then(res => {
        console.log('res: ', res)
      })
    },
    // 新增
    getFsetType() {
      fsetType(this.flowInfo).then(res => {
        console.log('res: ', res)
        this.getTypePaging()
      })
    },
    // 翻页
    handleCurrentChange(i) {
      console.log('i: ', i)
      this.query.page = i
      this.getTypePaging()
    },
    // 获取类型数据
    getTypePaging() {
      typePaging(this.query).then(res => {
        console.log('res: ', res)
        console.log('res.total: ', res.total)
        this.dataTotal = res.total
        this.tableData = res.list
        console.log('sss', res.list)
      })
    },
    // 批量删除
    batchDel() {
      alert('dddd')
      console.log('multipleSelection: ', this.multipleSelection)
      const arr = []
      this.multipleSelection.forEach(el => {
        console.log('el: ', el)
        arr.push(el.id)
      })
      fsetTypeDelete(arr).then(res => {
        console.log('res: ', res)
        this.getTypePaging()
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
      })
    },






    
    // 编辑
    edit(row) {
      console.log('row: ', row)
      this.flowInfo = row
      this.isEditIndex = row.id
      this.dialogVisible = true
    },
    handleSelectionChange(val) { // 表头复选框按钮
      this.multipleSelection = val
    },
    // 清空flowinfo数据
    clearFlowInfo() {
      this.flowInfo = { // 流转类型信息
        lanVal: '',
        remark: '',
        seqNo: 10
      }
    },
    handleClose() {
      this.dialogVisible = false
      // console.log(this.isEditIndex)
      if (this.isEditIndex !== -1) {
        this.clearFlowInfo()
      }
      this.isEditIndex = -1
    },
    comfirm() {
      // 修改
      if (this.isEditIndex !== -1) {
        this.getFsetTypeUpdata()
        this.clearFlowInfo()
        this.dialogVisible = false
        this.$message({
          message: '修改成功！',
          type: 'success'
        })
        this.isEditIndex = -1
        return
      } else {
        if (!this.flowInfo.lanVal) {
          this.$message({
            message: '类型不能为空',
            type: 'warning'
          })
          return
        }
        if (!this.flowInfo.seqNo) {
          this.$message({
            message: '排序不能为空',
            type: 'warning'
          })
          return
        }
        if (!this.flowInfo.remark) {
          this.$message({
            message: '描述不能为空',
            type: 'warning'
          })
          return
        }
        this.getFsetType()
        this.clearFlowInfo()
        this.dialogVisible = false
        this.$message({
          message: '添加成功！',
          type: 'success'
        })
      }
    },
    addInfo() { // 添加流转类型信息
      this.dialogVisible = true
    }
  }
}
</script>

