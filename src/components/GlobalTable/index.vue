/* eslint-disable vue/html-self-closing */
/* eslint-disable vue/html-self-closing */
<template>
  <div>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        v-for="(item,i) in tableColumu"
        :key="i"
        :label="item.label"
        :prop="item.field"
        :min-width="item.width"
        show-overflow-tooltip
      />
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
    />
  </div>
</template>

<script>
export default {
  name: 'GlobalTable',
  components: {},
  props: {
    tableData: {
      // 表格数据
      type: Array,
      default() {
        return []
      }
    },
    tableColumu: {
      // 表格列数据
      type: Array,
      default() {
        return []
      }
    },
    tableOption: {
      // 表格属性
      type: Array,
      default: null
    }
  },
  methods: {
    handleSelectionChange() {}
  }
}
</script>

<style>
</style>
