<template>
  <div>
    <h3 class="title_cont">权限</h3>
    <div class="form_btn" align="right">
      <el-button type="primary" @click="save()">保存</el-button>
      <el-button type="primary" @click="cancel()">取消</el-button>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">

      <el-tab-pane label="基本信息" name="basicInfo">
        <el-table
          :data="basicInfo.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column
            label="匹配类型"
            prop="matchType"
          />
          <el-table-column
            label="匹配类型值"
            prop="matchTypeVal"
          />
          <el-table-column
            label="被匹配类型"
            prop="matchedType"
          />
          <el-table-column
            label="被匹配类型值"
            prop="matchedTypeVal"
          />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="权限组设置" name="rootSet">
        <el-form :model="rootSet" label-width="110px">
          <el-row :gutter="20">
            <el-col :span="24" />
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="权限组名称" prop="name">
                <el-input v-model="rootSet.name" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="排序" prop="sort">
                <el-input v-model="rootSet.sort" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="rootSet.orgUnit" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'basicInfo',
      basicInfo: [
        //   {
        //   matchType: '',
        //   matchTypeVal: '',
        //   matchedType: '',
        //   matchedTypeVal: ''
        // }
      ],
      rootSet: {
        name: '',
        sort: '',
        remark: ''
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    save() {

    },
    cancel() {

    }
  }
}
</script>

<style>

</style>
