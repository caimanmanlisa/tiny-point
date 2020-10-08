<template>
  <div>
    <el-dialog
      title="类型修改"
      :visible.sync="dialogSubListEiteVisible"
      width="80%"
      :before-close="handleCloseSubListEite"
      :append-to-body="true"
    >
      <el-tabs v-model="activeName">
        <!--基本分栏-->
        <el-tab-pane label="基础" name="first">
          <el-form ref="form" label-width="140px" :model="form" status-icon>
            <el-row :gutter="20">
              <el-col :span="23">
                <div class="form_btn">
                  <el-button type="primary">保存</el-button>
                  <el-button>取消</el-button>
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
      </el-tabs>
    </el-dialog>
    <singleAdditions ref="singleAdditions" />
    <BatchAdds ref="BatchAdds" />
  </div>
</template>

<script>
import singleAdditions from './singleAddition'
import BatchAdds from './BatchAdd'
export default {
  components: {
    singleAdditions,
    BatchAdds
  },
  data() {
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
      fyTo: {
        pageNum: 0,
        pageSize: 10,
        pages: 0,
        total: 0,
        page: 1
      },
      pagingSearFormchKey: null,
      fyForm: [],
      getRowKeys(row) {
        // 记录每行的key值
        return row.id
      },
      multipleSelection: [],
      activeName: 'first',
      dialogSubListEiteVisible: false
    }
  },
  methods: {
    addSelect() {
      this.$refs.singleAdditions.dialogVisibleDselect = true
    },
    pladdSelect() {
      this.$refs.BatchAdds.dialogVisiblePl = true
    },
    checkSelectTbale() {
      this.$refs.singleAdditions.dialogVisibleDselect = true
    },
    handleCurrentChangeForm(val) {
      this.fyTo.page = val
      this.getFormData()
      // this.table()
      console.log(this.fyTo.page)
      console.log(`当前页: ${val}`)
    },
    handleSizeChangeForm(val) {
      this.fyTo.pageSize = val
      this.getFormData()
      //  this.table()
      console.log(`每页 ${val} 条`)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
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
    searchFname() {
      this.fyTo.page = 1
      this.getFormData()
    },
    handleCloseSubListEite() {
      this.dialogSubListEiteVisible = false
    }
  }
}
</script>
