<template>
  <div>
    <h1>类型flowType</h1>
    <div class="head">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="userInfo.name" placeholder="请输入姓名" />
        </el-col>
        <el-col :span="6">
          <el-input v-model="userInfo.gender" placeholder="请输入性别" />
        </el-col>
        <el-col :span="6">
          <el-input v-model="userInfo.phoneNum" placeholder="请输入电话号码" />
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="userInfo.birthday"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-col>
      </el-row>
      <el-button type="primary" class="add-btn" @click="addUser">添加信息</el-button>
    </div>
    <div class="body">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="序号" width="180">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="phoneNum" label="电话号码" />
        <el-table-column prop="birthday" label="生日" />
        <el-table-column prop="birthday" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editUser(scope.row,scope.$index)"
            />
            <el-button type="danger" icon="el-icon-delete" circle @click="delUser(scope.$index)" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="编辑用户信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="editObj" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="editObj.name" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="editObj.gender" />
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="editObj.phoneNum" />
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="editObj.birthday"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 添加用户信息
      userInfo: {
        name: '',
        gender: '',
        phoneNum: '',
        birthday: ''
      },
      tableData: [
        {
          name: '王小虎',
          gender: '男',
          phoneNum: '13112345678',
          birthday: '2010-12-09'
        }
      ],
      dialogVisible: false, // 弹框的显示
      editObj: {
        name: '',
        gender: '',
        phoneNum: '',
        birthday: ''
      },
      userIndex: 0
    }
  },
  methods: {
    // 添加用户信息
    addUser() {
      if (!this.userInfo.name) {
        this.$message({
          message: '请输入姓名！',
          type: 'warning'
        })
        return
      }
      if (!this.userInfo.gender) {
        this.$message({
          message: '请输入性别！',
          type: 'warning'
        })
        return
      }
      if (!this.userInfo.phoneNum) {
        this.$message({
          message: '请输入电话号码！',
          type: 'warning'
        })
        return
      }
      if (!/^1[3456789]\d{9}$/.test(this.userInfo.phoneNum)) {
        this.$message({
          message: '请输入正确的电话号码！',
          type: 'warning'
        })
        return
      }
      if (!this.userInfo.birthday) {
        this.$message({
          message: '请输入生日！',
          type: 'warning'
        })
        return
      }
      this.tableData.push(this.userInfo)
      this.userInfo = {
        name: '',
        gender: '',
        phoneNum: '',
        birthday: ''
      }
      this.$message({
        message: '添加成功！',
        type: 'success'
      })
    },
    // 删除一组数据
    delUser(idx) {
      // console.log(idx);
      this.$confirm('确认删除？')
        .then((_) => {
          this.tableData.splice(idx, 1)
        })
        .catch((_) => {})
    },
    // 编辑一组数据
    editUser(item, idx) {
      console.log(item)
      this.userIndex = idx
      this.editObj = {
        name: item.name,
        gender: item.gender,
        phoneNum: item.phoneNum,
        birthday: item.birthday
      }
      this.dialogVisible = true
    },

    confirm() {
      // 编辑修改
      // Vue.set(this.tableData,this.userIndex,this.editObj);
      // this.tableData[this.userIndex] = this.editObj;
      this.$set(this.tableData, this.userIndex, this.editObj)
      this.dialogVisible = false
      this.$message({
        message: '数据修改成功!',
        type: 'success'
      })
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>

.add-btn {
  margin-top: 20px;
  width: 100%;
}
.body {
  margin-top: 20px;
}
</style>
