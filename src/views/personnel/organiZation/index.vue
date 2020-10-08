<template>
  <div>
    <h3 class="title_cont">组织</h3>
    <div style="float:left ;">
      <el-tree :data="data" :props="defaultProps" style="width:150px;" @node-click="handleNodeClick" />
    </div>
    <div style="float:right;width:  1000px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="组织单元" name="first">
          <el-form ref="form" :model="form" status-icon label-width="110px">
            <el-row :gutter="0">
              <el-col :span="24">
                <div class="form_btn">
                  <el-button type="primary" @click="save('form')">保存</el-button>
                  <el-button type="primary" @click="add()">新建</el-button>
                  <el-button type="primary" @click="close()">关闭</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
                  <el-input v-model.trim="form.name" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="上级组织单元" prop="lastOrg" :label-width="formLabelWidth">
                  <el-input v-model="form.lastOrg" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
                  <el-input v-model="form.type" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="组织单元编号" prop="orgId" :label-width="formLabelWidth">
                  <el-input v-model="form.orgId" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="显示顺序" prop="sortBy" :label-width="formLabelWidth">
                  <el-input v-model="form.sortBy" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="人力资源" name="second">
          <div class="content_toplayout">
            <div class="search_content fl">
              <el-button type="primary" icon="el-icon-search" @click="search()" />
              <input slot="header" v-model.lazy="search" type="text" class="search_content_input fl" placeholder="请输入关键字" @keyup.enter="修改成功">
            </div>
            <div class="button fr">
              <el-button type="primary" icon="el-icon-plus" @click="addPer() ">新建人员</el-button>
            </div>
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="编号" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="logName" label="登录名" />
            <el-table-column prop="sex" label="性别" />
            <el-table-column prop="status" label="状态" />
            <el-table-column prop="leader" label="直接上级" />
            <el-table-column prop="job" label="岗位" />
            <el-table-column prop="save" label="安全级别" />
            <el-table-column prop="desc" label="显示顺序" />
            <el-table-column prop="opreate" label="操作">
              <template slot-scope="scope"><span style="display:block;width:100%;" @click="getPer(scope.row)">{{ scope.row.opreate }}</span></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

      </el-tabs>
    </div>
    <el-dialog title="新建组织单元" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="newOrg" :model="form" status-icon label-width="110px">
        <el-row :gutter="0">
          <el-col :span="24">
            <div class="form_btn">
              <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
              <el-input v-model.trim="newOrg.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级组织单元" prop="lastOrg" :label-width="formLabelWidth">
              <el-select v-model="newOrg.lastOrg" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="sortBy" :label-width="formLabelWidth">
              <el-input v-model="newOrg.sortBy" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织单元编号" prop="orgId" :label-width="formLabelWidth">
              <el-input v-model="newOrg.orgId" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
              <el-select v-model="newOrg.type" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog title="新建人员" :visible.sync="dialogFormVisible2" width="80%">
      <el-form ref="newPer" :model="form" status-icon label-width="110px">
        <el-row :gutter="0">
          <el-col :span="24">
            <div class="form_btn">
              <el-button type="primary" @click="dialogFormVisible2 = false">保 存</el-button>
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
              <el-input v-model.trim="newPer.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工号" prop="id" :label-width="formLabelWidth">
              <el-input v-model.trim="newPer.id" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
              <el-select v-model="newPer.sex" placeholder="请选择">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织单元" prop="orgUnit" :label-width="formLabelWidth">
              <el-input v-model="newPer.orgUnit" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="直接上级" prop="leader" :label-width="formLabelWidth">
              <el-select v-model="newPer.leader" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
              <el-select v-model="newPer.type" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="照片" prop="photo" :label-width="formLabelWidth">
              <el-upload
                ref="upload"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >

                <el-input slot="trigger" size="small" type="primary" placeholder="上传文件">
                  <el-button slot="prepend" icon="el-icon-camera-solid" size="small" type="primary" />
                </el-input>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="移动电话" prop="mobiePhone" :label-width="formLabelWidth">
              <el-input v-model.trim="newPer.mobiePhone" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="办公电话" prop="phone" :label-width="formLabelWidth">
              <el-input v-model.trim="newPer.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮件" prop="email" :label-width="formLabelWidth">
              <el-input v-model.trim="newPer.email" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="排序" prop="desc" :label-width="formLabelWidth">
              <el-input v-model.trim="newPer.desc" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog title="人员信息" :visible.sync="perVisible" width="80%">
      <el-form ref="perInfo" :model="perInfo" status-icon label-width="110px">
        <el-row :gutter="0">
          <el-col :span="24">
            <div class="form_btn">
              <el-button type="primary" @click="perVisible = false">保 存</el-button>
              <el-button @click="perVisible = false">取 消</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="登录名" prop="logName" :label-width="formLabelWidth">
              <el-input v-model.trim="perInfo.logName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
              <el-input v-model="perInfo.password" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="确认密码" prop="ckPass" :label-width="formLabelWidth">
              <el-input v-model="perInfo.ckPass" />
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
    return {
      fileList: [],
      tableData: [{ id: '48', name: '张玉', logName: 'zy', sex: '女', status: '正常', leader: 'brj123123', job: '项目工程师', save: '1', desc: '', opreate: '账户信息' }],
      options: [{}],
      options2: [{ }],
      options3: [{ value: '0', label: '女' },
        { value: '1', label: '男' }],
      activeName: 'first',
      form: {
        name: '',
        lastOrg: '',
        type: '',
        orgId: '',
        sortBy: ''
      },
      newOrg: {
        name: '',
        lastOrg: '',
        type: '',
        orgId: '',
        sortBy: ''
      },
      newPer: {
        name: '',
        id: '',
        sex: '',
        orgUnit: '',
        desc: '',
        leader: '',
        status: '',
        photo: '',
        mobiePhone: '',
        phone: '',
        email: '',
        desc: ''
      },
      perInfo: {
        logName: '',
        password: '',
        ckPass: ''
      },
      dialogFormVisible2: false,
      dialogFormVisible: false,
      perVisible: false,
      formLabelWidth: '120px',
      data: [{
        tableData: [],
        label: '上海XX公司',
        children: [{
          label: '人事部',
          children: [{
            label: '人事一部'
          }, {
            label: '人事二部'
          }, {
            label: '人事三部'
          }]
        }, {
          label: '开发部',
          children: [{
            label: '前端开发'
          }, {
            label: '后端开发'
          }, {
            label: '测试开发'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      search: ''
    }
  },
  created() {

  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    getPer(row) {
      this.perVisible = true
      console.log(row)
      this.perInfo.logName = row.logName
      // this.perInfo.password = row.password
    },
    handleNodeClick(data) {
      console.log(data)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    save() {

    },
    add() {
      this.dialogFormVisible = true
    },
    close() {

    },
    addPer() {
      this.dialogFormVisible2 = true
    }

  }
}
</script>
