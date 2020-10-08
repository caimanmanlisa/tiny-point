<template>
  <div>
    <h3 class="title_cont">组织展示</h3>
    <div class="button fr">
      <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加</el-button>
      <el-button type="primary" icon="el-icon-minus" @click="del(scope.$index, scope.row)">删除</el-button>
    </div>
    <div class="table_box">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="fieldName" label="角色组编码">
          <template slot-scope="scope">{{ scope.row.fieldName }}</template>
        </el-table-column>
        <el-table-column prop="lanVal" label="姓名">
          <template slot-scope="scope">{{ scope.row.lanVal }}</template>
        </el-table-column>
        <el-table-column prop="fieldType" label="类型" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.fieldType }}</template>
        </el-table-column>
        <el-table-column prop="fieldType" label="父级组织" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.fieldType }}</template>
        </el-table-column>
        <el-table-column prop="isActive" label="是否激活" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isActive" disabled true-label="0" false-label="1" /> </template>
        </el-table-column>
        <el-table-column prop="fieldType" label="排序" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.fieldType }}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog :title="isEditIndex === -1 ? '组织-组织展示-添加' : '组织-组织展示-更新'" :visible.sync="dialogFormVisible" width="95%">
      <div class="form_btn">
        <el-button type="primary" @click="save('form')">保存</el-button>
        <el-button type="primary" @click="(dialogFormVisible = false)">取消</el-button>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="basicInfo">
          <el-form ref="form" :model="basicInfo" status-icon label-width="110px">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="basicInfo.name" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="上级组织单元" prop="orgUnit">
                  <el-input v-model="basicInfo.orgUnit" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="类型" prop="postRight">
                  <el-input v-model="basicInfo.sex" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="组织单元编号" prop="job">
                  <el-input v-model="basicInfo.job" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="显示顺序" prop="sort">
                  <el-input v-model="basicInfo.sort" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="自定义信息" name="second">
          <el-form ref="form" :model="form" status-icon label-width="110px">
            <el-row :gutter="20">
              <el-col :span="24" />
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="组织信息" prop="perPro">
                  <el-input v-model="form.fieldName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="aaa" prop="postRight">
                  <el-input v-model="form.lanVal" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="bbb" prop="bbb">
                  <el-input v-model="form.fieldName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="组织名" prop="orgName">
                  <el-input v-model="form.lanVal" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input v-model="form.lanVal" />
              </el-form-item>
            </el-col>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>

</template>

<script>

export default {
  data() {
    return {
      multipleSelection: [],
      currentPage3: 5,
      search: '',
      isEditIndex: -1,
      currentPage: 1,
      tableData: [],
      activeName: 'basicInfo',
      dialogFormVisible: false,
      form: {
        perPro: '',
        postRight: '',
        bbb: '',
        orgName: '',
        name: ''
      },
      basicInfo: {
        name: '',
        sex: '',
        orgUnit: '',
        job: '',
        status: '',
        phone: '',
        telephone: '',
        email: '',
        sort: ''
      }
    }
  },
  created() {

  },
  methods: {
    del(index, row) {
      console.log(row)
      alert(row.id)
    },
    // 清空flowinfo数据
    clearForm() {
      this.form = { // 组织字段信息
      }
    },
    handleClose() {
      this.dialogFormVisible = false
    },
    update(index, row) {
      console.log(index, row)
      this.dialogFormVisible = true
      this.form = row
      row.isActive = this.form.isActive
      this.isEditIndex = 1
    },
    handleNodeClick(data) {
      console.log(data)
    },
    save() {
      this.dialogFormVisible = false
      console.log(this.form.id)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style>

</style>

