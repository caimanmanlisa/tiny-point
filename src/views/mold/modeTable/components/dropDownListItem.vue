<template>
  <div>
    <el-dialog
      title="系统按钮"
      :visible.sync="dialogVisibleDropDownList"
      width="80%"
      :before-close="handleCloseDropDownList"
      :append-to-body="true"
    >
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
      <div class="table_box">
        <el-table
          ref="list"
          :data="list"
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
        >
          <el-table-column prop="lanID" label="名称" />
          <el-table-column prop="id" label="唯一标识" />
          <el-table-column prop="type" label="系统类型" />
        </el-table>
      </div>
      <!-- 分页-->
      <div class="block" style="text-align:center">
        <el-pagination
          background
          :current-page="page"
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @size-change="handleSizeChangeForm"
          @current-change="handleCurrentChangeForm"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisibleDropDownList: false,
      pagingSearFormchKey: null, // 子页面的查询的值的字符串
      pageSize: 10,
      pages: 0,
      total: 0,
      page: 1,
      list: [{
        lanID: '',
        id: '',
        type: 0
      }]
    }
  },
  methods: {
    searchFname() {
      this.page = 1
      // this.getFormData(); //得到数据
    },
    handleSizeChangeForm(val) {
      this.pageSize = val
      // /this.getFormData(); //分页数据
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChangeForm(val) {
      this.page = val
      this.getFormData() // 分页数据
      console.log(this.page)
      console.log(`当前页: ${val}`)
    },
    handleCloseDropDownList() {
      this.dialogVisibleDropDownList = false
    }
  }
}
</script>
