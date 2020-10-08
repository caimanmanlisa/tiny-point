<template>
  <div>
    <h3 class="title_cont">文件字段管理</h3>
    <div class="content_toplayout">
      <div class="search_content fl">
        <el-button type="primary" icon="el-icon-search" />
        <input type="text" class="search_content_input fl" placeholder="请输入关键字">
      </div>
      <div class="button fr">
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新建</el-button>
        <el-button type="primary" icon="el-icon-minus">删除</el-button>
        <el-button type="primary">禁用/启用</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="ID" prop="ID">
        <template slot-scope="scope">{{ scope.row.ID }}</template>
      </el-table-column>
      <el-table-column label="类型" prop="fieldType">
        <template slot-scope="scope">{{ scope.row.fieldType }}</template>
      </el-table-column>
      <el-table-column label="数据库字段名" prop="fieldName">
        <template slot-scope="scope">{{ scope.row.fieldName }}</template>
      </el-table-column>
      <el-table-column label="显示名称" prop="displayName">
        <template slot-scope="scope">{{ scope.row.displayName }}</template>
      </el-table-column>
      <el-table-column label="形式" prop="displayForm">
        <template slot-scope="scope">{{ scope.row.displayForm }}</template>
      </el-table-column>
      <el-table-column label="顺序" prop="order">
        <template slot-scope="scope">{{ scope.row.ID }}</template>
      </el-table-column>
      <el-table-column label="是否启用" prop="isactive">
        <template slot-scope="scope">{{ scope.row.isactive }}</template>
      </el-table-column>
      <el-table-column label="显示" prop="fieldDisplay">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.fieldDisplay" disabled />
        </template>
      </el-table-column>
      <el-table-column label="编辑" prop="fieldEdit">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.fieldEdit" disabled />
        </template>
      </el-table-column>
      <el-table-column label="必填" prop="fieldRequired">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.fieldRequired" disabled />
        </template>
      </el-table-column>
    </el-table>

    <!--新建弹窗-->
    <el-dialog title="文件字段管理-新建" :visible.sync="dialogFormVisible">
      <el-row>
        <el-col :span="24" class="text-right">
          <el-button type="primary">保存</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-col>
      </el-row>
      <el-form label-width="120px">
        <el-form-item label="类型" style="margin-top:20px">
          <el-input v-model="tableData.fieldType" autocomplete="off" />
        </el-form-item>
        <el-form-item label="数据库字段名">
          <el-input v-model="tableData.fieldName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="显示名称">
          <el-input v-model="tableData.displayName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="形式">
          <el-select v-model="value" placeholder="请选择" style="width:30%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="顺序">
          <el-input-number v-model="tableData.order" controls-position="right" style="width:30%;" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="tableData.isactive">
            <el-radio label="是" />
            <el-radio label="否" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="页面操作">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="显示" />
            <el-checkbox label="编辑" />
            <el-checkbox label="必填" />

          </el-checkbox-group>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      checkList: [],
      checked: false,
      dialogFormVisible: false,
      tableData: [
        {
          ID: '1',
          fieldType: '系统',
          fieldName: 'xxx',
          displayName: '文件名称',
          displayForm: '多行文本',
          order: '0',
          isactive: '启用',
          fieldDisplay: '',
          fieldEdit: '',
          fieldRequired: ''
        }
      ],
      multipleSelection: []
    }
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>

</style>
