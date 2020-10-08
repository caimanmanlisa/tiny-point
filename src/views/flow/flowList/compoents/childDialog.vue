<template>
  <el-dialog
    title="选择表结构"
    :visible.sync="childDialogVisible"
    width="60%"
    :before-close="handleClose"
  >
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="ID" prop="id">
        <template slot-scope="scope"><span style="display:block;width:100%;" @click="getTT(scope.row.lanVal)">{{ scope.row.id }}</span></template>
      </el-table-column>

      <el-table-column label="类型" prop="lanVal">
        <template slot-scope="scope"><span style="display:block;width:100%;" @click="getTT(scope.row.lanVal)">{{ scope.row.lanVal }}</span></template>
      </el-table-column>

      <el-table-column prop="sort" label="排序">
        <template slot-scope="scope"><span style="display:block;width:100%;" @click="getTT(scope.row.lanVal)">{{ scope.row.seqNo }}</span></template>
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
  </el-dialog>
</template>

<script>
import { typePaging } from '@/api/flow'
export default {
  data() {
    return {
      dataTotal: 0,
      currentPage: 1,
      tableData: [],
      childDialogVisible: false,
      query: {
        key: '',
        page: 1,
        rows: 10,
        sortBy: 'seqNo',
        desc: false
      }
    }
  },

  created() {
    this.getTypePaging()
  },
  methods: {
    getTT(sss) {
      this.childDialogVisible = false
      console.log('sssssss', sss)

      this.$emit('setType', sss)
    },
    handleClose() {
      this.childDialogVisible = false
    },

    // 获取类型数据
    getTypePaging() {
      typePaging(this.query).then(res => {
        console.log('res: ', res)
        console.log('res.total: ', res.total)
        this.dataTotal = res.total
        this.tableData = res.list
      })
    },
    // 翻页
    handleCurrentChange(i) {
      console.log('i: ', i)
      this.query.page = i
      this.getTypePaging()
    }
    // handleSelectionChange() {}
  }
}
</script>

<style>
</style>
