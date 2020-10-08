<template>
  <div>
    <el-table ref="subList" :data="subList" stripe style="width: 100%">
      <el-table-column>
        <template slot-scope="scope">
          <el-row :gutter="15">
            <el-col :span="6" :offset="8">
              <el-input v-model="scope.row.subName" placeholder>
                <template slot="append">
                  <el-button type="primary" icon="el-icon-edit" @click="eidtRow" />
                </template>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" icon="el-icon-plus" plain @click="addRow" />
              <el-button
                type="primary"
                icon="el-icon-minus"
                plain
                @click="delRow(scope.$index,subList)"
              />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <subListEites ref="subListEites" />
  </div>
</template>

<script>
import subListEites from './subListEite'
export default {
  components: {
    subListEites
  },
  data() {
    return {
      subList: [
        {
          subName: 'cds_h1',
          multipleSelection: []
        }
      ]
    }
  },
  methods: {
    addRow() {
      var list = {
        subName: this.subName
      }
      this.subList.unshift(list)
    },
    delRow(index, rows) {
      if (rows.length > 1) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            rows.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
      } else {
        this.$message({
          type: 'warning',
          message: '无法删除!'
        })
      }
    },
    eidtRow() {
      this.$refs.subListEites.dialogSubListEiteVisible = true
    }
  }
}
</script>
