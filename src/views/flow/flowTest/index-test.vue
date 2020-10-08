<template>
  <div class="app-container">
    <div class="tabbox">
      <h3>选择表结构table</h3>
      <div class="content_toplayout">
        <div class="search_content fl">
          <el-button type="primary" icon="el-icon-search" />
          <input type="text" class="search_content_input fl" placeholder="请输入关键字">
        </div>
      </div>
      <div class="table_box">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="flowname" label="名称">
            <template slot-scope="scope">{{ scope.row.flowname }}</template>
          </el-table-column>
          <el-table-column prop="flowtype" label="类型">
            <template slot-scope="scope">{{ scope.row.flowtype }}</template>
          </el-table-column>
          <el-table-column prop="flowperson" label="数据库表名">
            <template slot-scope="scope">{{ scope.row.flowperson }}</template>
          </el-table-column>
          <el-table-column prop="flowdate" label="显示顺序">
            <template slot-scope="scope">{{ scope.row.flowdate }}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="tabbox">
      <h3>节点设置</h3>
      <el-row>
        <el-col :span="24">
          <div class="form_btn">
            <el-button type="primary">保存</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="form_btn">
            <el-button type="primary">新增</el-button>
            <el-button type="primary">删除</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table
        ref="multipleTable"
        :data="tableDataNodes"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="nodesName" label="名称">
          <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>

        </el-table-column>
        <el-table-column prop="nodesType" label="类型">
          <template>
            <el-input v-model="flowInfo.sort" />
          </template>
        </el-table-column>
        <el-table-column prop="nodesSet" label="表单设置">
          <template>
            <el-button type="primary">设置</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="nodesHandler" label="处理者">
          <template>
            <el-button type="primary">设置</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="nodesForward" label="前动作">
          <template>
            <el-button type="primary">设置</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="nodesAfter" label="后动作">
          <template>
            <el-button type="primary">设置</el-button>
          </template>
        </el-table-column>
      </el-table>

      <h4>处理者-设置按钮</h4>
      <el-form label-width="140px">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="form_btn">
              <el-button type="primary">保存</el-button>
              <el-button type="primary">取消</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="名称">
              <el-input v-model="flowInfo.type" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序">
              <el-input v-model="flowInfo.sort" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态">
              <el-input v-model="flowInfo.type" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-row :gutter="20">
        <el-col :span="24">
          <div class="form_btn">
            <el-button type="primary">添加</el-button>
            <el-button type="primary">删除</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableDataNodes"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="date" label="序号">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column prop="nodesType" label="类型" />
        <el-table-column prop="nodesType" label="内容" />
        <el-table-column prop="nodesType" label="批次" />
      </el-table>

      <h4>处理者-设置按钮-添加弹窗</h4>
      <el-form label-width="140px">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="form_btn">
              <el-button type="primary">保存</el-button>
              <el-button type="primary">取消</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="审批类型">
              <template>
                <el-select v-model="value" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理者类型">
              <template>
                <el-select v-model="value" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="批次">
              <el-input v-model="flowInfo.type" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内容">
              <el-button type="primary" plain style="width:15%;padding: 10px 0;">选择人员</el-button>
              <el-input v-model="flowInfolist.formStructure" style="width:85%;" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <h4>前动作-设置按钮</h4>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="form_btn">
            <el-button type="primary">保存</el-button>
            <el-button type="primary">取消</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="form_btn">
            <el-button type="primary">添加</el-button>
            <el-button type="primary">删除</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table
        ref="multipleTable"
        :data="tableDataNodes"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="date" label="字段">
          <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="nodesType" label="类型">
          <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="nodesType" label="规则/内容">
          <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="nodesType" label="描述">
          <template>
            <el-input v-model="flowInfo.sort" />
          </template>
        </el-table-column>
      </el-table>

      <h5>动作设置</h5>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="form_btn">
            <el-button type="primary">添加</el-button>
            <el-button type="primary">删除</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table
        ref="multipleTable"
        :data="tableDataNodes"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="date" label="类型">
          <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="nodesType" label="动作设置">
          <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="nodesType" label="执行次序">

          <template>
            <el-input v-model="flowInfo.sort" />
          </template>

        </el-table-column>
        <el-table-column prop="nodesType" label="描述">
          <template>
            <el-input v-model="flowInfo.sort" />
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div>
      <h3>流转条件设置</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '', // 下拉框赋值
      flowInfo: {
        // 流转类型信息
        type: '',
        sort: '',
        dsec: '',
        enable: false
      },
      flowInfolist: {
        // 流转列表信息
        flowname: '',
        flowperson: '',
        flowdate: '',
        flowtype: '',
        formSource: '',
        formStructure: '',
        source: '',
        remark: '',
        edition: '',
        enable: false
      },
      handleSelectionChange(val) {
        // 表头复选框按钮
        this.multipleSelection = val
      },
      tableDataNodes: [
        // 节点设置数据
        {
          nodesName: '流转测试',
          nodesType: '111',
          nodesSet: 'asdfasdf',
          nodesHandler: '2010-12-09',
          nodesForward: 'value1value1value1value1',
          nodesAfter: '21111'
        }
      ],
      options: [
        // 节点设置下拉框数据
        {
          value: '选项1',
          label: '外部系统'
        },
        {
          value: '选项2',
          label: '本系统'
        }
      ],

      tableData: [
        {
          flowname: '流转测试',
          flowtype: 1,
          flowperson: 'asdfasdf',
          flowdate: '2010-12-09',
          value1: 'value1value1value1value1',
          enable: false
        }
      ]
    }
  }
}
</script>

<style>
.tabbox {
  border: 1px solid #000;
  margin: 10px;
}

</style>
