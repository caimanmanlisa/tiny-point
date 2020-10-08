<template>
  <div>
    <div class="app-container">
      <h3 class="title_cont">人员展示</h3>
      <div class="content_toplayout">
        <div class="search_content fl">
          <el-button type="primary" icon="el-icon-search" @click="search()" />
          <input slot="header" v-model="search" type="text" class="search_content_input fl" placeholder="请输入关键字">
        </div>
        <div class="button fr">
          <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加</el-button>
          <el-button type="primary" icon="el-icon-minus" @click="del(scope.$index, scope.row)">删除</el-button>
        </div>
      </div>
      <div class="table_box">
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column label="编码" prop="ID" width="60px" />
          <el-table-column label="姓名" prop="name" />
          <el-table-column label="登录名" prop="loginName" />
          <el-table-column label="性别" prop="sex" />
          <el-table-column label="状态" prop="status" />
          <el-table-column label="直接上级" prop="leader" />
          <el-table-column label="岗位" prop="job" />
          <el-table-column label="安全级别" prop="level" />
          <el-table-column label="显示顺序" prop="sort" />
          <el-table-column label="操作" prop="opreate">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="update(scope.$index, scope.row)" />
              <el-button type="primary" icon="el-icon-delete" circle @click="del(scope.$index, scope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog :title="isEditIndex === -1 ? '组织-人员展示-添加' : '组织-人员展示-更新'" :visible.sync="dialogFormVisible" width="95%">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="basicInfo">
            <el-form ref="form" :model="basicInfo" status-icon label-width="110px">
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="form_btn" align="right">
                    <el-button type="primary" @click="save('form')">保存</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item label="姓名" prop="namw">
                    <el-input v-model="basicInfo.name" />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="性别" prop="postRight">
                    <el-input v-model="basicInfo.sex" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item label="组织单元" prop="orgUnit">
                    <el-input v-model="basicInfo.orgUnit" />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="岗位" prop="job">
                    <el-input v-model="basicInfo.job" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item label="状态" prop="status">
                    <el-input v-model="basicInfo.status" />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="移动电话" prop="phone">
                    <el-input v-model="basicInfo.phone" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item label="办公电话" prop="telephone">
                    <el-input v-model="basicInfo.telephone" />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="电子邮件" prop="email">
                    <el-input v-model="basicInfo.email" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item label="排序" prop="sort">
                    <el-input v-model="basicInfo.sort" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="权限组设置" name="second">
            <el-form ref="form" :model="form" :rules="rules" status-icon label-width="110px">
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="form_btn">
                    <el-button type="primary" @click="save('form')">保存</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="人员属性" prop="perPro">
                    <el-input v-model="form.fieldName" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="岗位权利" prop="postRight">
                    <el-input v-model="form.lanVal" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        ID: '46',
        name: 'hjq',
        loginName: 'admin',
        sex: '男',
        status: '正常',
        leader: '',
        job: 'java工程师',
        level: '1',
        sort: '1'
      }, {
        ID: '47',
        name: 'brj123123',
        loginName: 'hiq',
        sex: '男',
        status: '正常',
        leader: '',
        job: 'java工程师',
        level: '1',
        sort: '10.2'
      }],
      form: {
        perPro: '',
        postRight: ''
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
      },
      search: '',
      activeName: 'second',
      dialogFormVisible: false

    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    save() {
      false
    }
  }
}
</script>
