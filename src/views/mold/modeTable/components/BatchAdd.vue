<template>
  <div>
    <el-dialog
      title="批量添加"
      :visible.sync="dialogVisiblePl"
      width="80%"
      :before-close="handleCloseSelectpl"
      :append-to-body="true"
    >
      <el-row :gutter="20">
        <el-col :span="23">
          <div class="form_btn">
            <el-button type="primary" class="el-icon-plus">保存</el-button>
            <el-button type="primary" class="el-icon-plus" @click="addRow()">新增</el-button>
            <el-button type="primary" class="el-icon-minus" @click.prevent="delData()">删除</el-button>
            <el-button type="primary">取消</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table
        ref="table"
        :data="tableData"
        tooltip-effect="dark"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChangepl"
      >
        <el-table-column type="selection" align="center" />
        <el-table-column label="数据库名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dbName" />
          </template>
        </el-table-column>
        <el-table-column label="字段显示名" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.address" />
          </template>
        </el-table-column>
        <!--选择下拉-->
        <el-table-column label="显示类型" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.expressionOfValue" placeholder="请选择">
              <el-option
                v-for="item in expressionOfOption"
                :key="item.expressionOfValue"
                :label="item.label"
                :value="item.expressionOfValue"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="类型1" align="center">
          <template slot-scope="scope">
            <!--1-->
            <el-select
              v-if="scope.row.expressionOfValue===1"
              v-model="scope.row.textFieldOfTypeValue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in textField"
                :key="item.textFieldOfTypeValue"
                :label="item.label"
                :value="item.textFieldOfTypeValue"
              />
            </el-select>
            <!--2-->
            <el-input-number
              v-if="scope.row.expressionOfValue===2"
              v-model="linesOfMultilineText"
              size="small"
              controls-position="right"
              :min="0"
              :max="10"
            />
            <!--3暂时为空-->
            <!--4-1-->
            <el-select
              v-if="scope.row.expressionOfValue===4"
              v-model="scope.row.dropdownOfValue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in displayOfDropdown"
                :key="item.dropdownOfValue"
                :label="item.label"
                :value="item.dropdownOfValue"
              />
            </el-select>
            <!--5时间-->
            <el-select
              v-if="scope.row.expressionOfValue===5"
              v-model="scope.row.timeOfValue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in timeOfType"
                :key="item.timeOfValue"
                :label="item.label"
                :value="item.timeOfValue"
              />
            </el-select>
            <!--6系统按钮-->
            <el-input v-if="scope.row.expressionOfValue===6" placeholder="选择按钮" readonly>
              <template slot="prepend">
                <el-button size="small" round style="width:60px;padding:0;font-size:12px" @click="systemButtons">选择</el-button>
              </template>
            </el-input>
            <!--8URL地址-->
            <el-input v-if="scope.row.expressionOfValue===8" placeholder="请输入显示值" clearable />
          </template>
        </el-table-column>

        <el-table-column label="类型2" align="center">
          <template slot-scope="scope">
            <!--1-1-->
            <el-input-number
              v-if="scope.row.expressionOfValue===1&&scope.row.textFieldOfTypeValue===1"
              v-model="textLength"
              size="small"
              controls-position="right"
              :min="0"
              :max="10"
            />
            <!--1-2-->
            <el-select
              v-if="scope.row.expressionOfValue===1&&scope.row.textFieldOfTypeValue===2"
              v-model="scope.row.controlLimitOfValue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in controlLimit"
                :key="item.controlLimitOfValue"
                :label="item.label"
                :value="item.controlLimitOfValue"
              />
            </el-select>
            <!--1-3-->
            <el-select
              v-if="scope.row.expressionOfValue===1&&scope.row.textFieldOfTypeValue===3"
              v-model="scope.row.controlLimitOfValue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in controlLimit"
                :key="item.controlLimitOfValue"
                :label="item.label"
                :value="item.controlLimitOfValue"
              />
            </el-select>
            <!--4-1-->
            <el-select
              v-if="scope.row.expressionOfValue===4"
              v-model="scope.row.Radiovalue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in selectRadio"
                :key="item.Radiovalue"
                :label="item.label"
                :value="item.Radiovalue"
              />
            </el-select>
            <!--6系统按钮-->
            <el-input v-if="scope.row.expressionOfValue===6" placeholder="请输入内容" clearable />
            <!--7无-->
            <!--8URL地址-->
            <el-input v-if="scope.row.expressionOfValue===8" placeholder="请输入链接字段" clearable />
          </template>
        </el-table-column>
        <el-table-column label="类型3" align="center">
          <template slot-scope="scope">
            <!--1-1-->
            <el-input
              v-if="scope.row.expressionOfValue===1&&scope.row.textFieldOfTypeValue===1"
              placeholder="请输入内容"
              clearable
            />
            <!--1-2-->
            <el-input
              v-if="scope.row.expressionOfValue===1&&scope.row.textFieldOfTypeValue===2&&scope.row.controlLimitOfValue!==1"
              placeholder="请输入内容"
              clearable
            />
            <!--1-2判断-->
            <div v-if="scope.row.expressionOfValue===1&&scope.row.textFieldOfTypeValue===2&&scope.row.controlLimitOfValue===1">
              <el-col :span="11">
                <el-input v-model="textMinLnteger" placeholder="最小值" style="width: 100%;" />
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-input v-model="textMaxLnteger" placeholder="最大值" style="width: 100%;" />
              </el-col>
            </div>

            <!--1-3-->
            <el-input-number
              v-if="scope.row.expressionOfValue===1&&scope.row.textFieldOfTypeValue===3&&scope.row.controlLimitOfValue!==1"
              v-model="textDecimalDigit"
              size="small"
              controls-position="right"
              :min="0"
              :max="10"
            />
            <!--1-3判断-->
            <div v-if="scope.row.expressionOfValue===1&&scope.row.textFieldOfTypeValue===3&&scope.row.controlLimitOfValue===1">
              <el-col :span="11">
                <el-input v-model="textMinDecimalDigit" placeholder="最小值" style="width: 100%;" />
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-input v-model="textMaxDecimalDigit" placeholder="最大值" style="width: 100%;" />
              </el-col>
            </div>
            <!--4-1-->
            <el-input v-if="scope.row.expressionOfValue===4" readonly placeholder="选择下拉框">
              <template slot="prepend">
                <el-button size="small" round style="width:60px;padding:0;font-size:12px" @click="dropDownListItems()">选择</el-button>
              </template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="类型4" align="center">
          <template slot-scope="scope">
            <!--1-2-->
            <el-input
              v-if="scope.row.expressionOfValue===1&&scope.row.textFieldOfTypeValue===2&&scope.row.controlLimitOfValue===1"
              placeholder="请输入内容"
              clearable
            />
            <!--1-3-->

            <el-input
              v-if="scope.row.expressionOfValue===1&&scope.row.textFieldOfTypeValue===3&&scope.row.controlLimitOfValue!==1"
              placeholder="请输入内容"
              clearable
            />
            <!--1-3判断-->
            <el-input-number
              v-if="scope.row.expressionOfValue===1&&scope.row.textFieldOfTypeValue===3&&scope.row.controlLimitOfValue===1"
              v-model="textDecimalDigit"
              size="small"
              controls-position="right"
              :min="0"
              :max="10"
            />
            <!--4-1-->
            <el-input v-if="scope.row.expressionOfValue===4" placeholder="请输入内容" clearable />
          </template>
        </el-table-column>
        <el-table-column label="类型5" align="center">
          <template slot-scope="scope">
            <!--1-3-->
            <el-input
              v-if="scope.row.expressionOfValue===1&&scope.row.textFieldOfTypeValue===3&&scope.row.controlLimitOfValue===1"
              placeholder="请输入内容"
              clearable
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <systemButton ref="systemButton" />
    <dropDownListItem ref="dropDownListItem" />
  </div>
</template>
<script>
import systemButton from './systemButton'
import dropDownListItem from './dropDownListItem'
export default {
  components: {
    systemButton,
    dropDownListItem
  },
  data() {
    return {
      dialogVisiblePl: false,

      textLength: 0, // 单行文本-文本-num
      textMinLnteger: 0, // 单行文本-整数-Minnum
      textMaxLnteger: 0, // 单行文本-整数-Minnum
      textDecimalDigit: 0, // 单行文本-小数-num
      textMinDecimalDigit: 0, // 单行文本-小数-Min
      textMaxDecimalDigit: 0, // 单行文本-小数-Max
      linesOfMultilineText: 0, // 多行文本-行数

      expressionOfOption: [
        {
          expressionOfValue: 1,
          label: '单行文本'
        },
        {
          expressionOfValue: 2,
          label: '多行文本'
        },
        {
          expressionOfValue: 3,
          label: '富文本'
        },
        {
          expressionOfValue: 4,
          label: '下拉框'
        },
        {
          expressionOfValue: 5,
          label: '时间和日期'
        },
        {
          expressionOfValue: 6,
          label: '系统按钮'
        },
        {
          expressionOfValue: 7,
          label: '文件上传'
        },
        {
          expressionOfValue: 8,
          label: '存放URL'
        }
      ],
      expressionOfValue: '',

      textField: [
        {
          textFieldOfTypeValue: 1,
          label: '文本'
        },
        {
          textFieldOfTypeValue: 2,
          label: '整数'
        },
        {
          textFieldOfTypeValue: 3,
          label: '小数'
        }
      ],

      controlLimit: [
        {
          controlLimitOfValue: 1,
          label: '是'
        },
        {
          controlLimitOfValue: 2,
          label: '否'
        }
      ],

      displayOfDropdown: [
        {
          dropdownOfValue: 1,
          label: '下拉框'
        },
        {
          dropdownOfValue: 2,
          label: '复选框'
        }],
      selectRadio: [
        {
          Radiovalue: 1,
          label: '单选'
        },
        {
          Radiovalue: 2,
          label: '多选'
        }
      ],

      timeOfType: [
        {
          timeOfValue: 1,
          label: '时间'
        },
        {
          timeOfValue: 2,
          label: '日期'
        },
        {
          timeOfValue: 3,
          label: '时间和日期'
        }
      ],
      tableData: [
        {
          dbName: '',
          address: '',
          name: '',
          weather: '',
          phone: '',
          date: '',
          mdate: '',
          loveer: ''
        }
      ]
    }
  },
  methods: {
    handleCloseSelectpl() {
      this.dialogVisiblePl = false
    },
    handleSelectionChangepl(val) {
      this.multipleSelections = val
    },
    addRow() {
      var list = {
        dbName: '',
        address: this.address,
        name: this.name,
        weather: this.weather,
        phone: this.phone,
        date: this.date,
        mdate: this.mdate
      }
      this.tableData.unshift(list)
    },
    delData() {
      for (let i = 0; i < this.multipleSelections.length; i++) {
        const val = this.multipleSelections
        // 获取选中行的索引的方法
        // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
        // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
        val.forEach((val, index) => {
          this.tableData.forEach((vals, indexs) => {
            if (val === vals) {
              this.tableData.splice(indexs, 1)
            }
          })
        })
      }
      // 删除完数据之后清除勾选框
      this.$refs.table.clearSelection()
    },
    dropDownListItems() {
      this.$refs.dropDownListItem.dialogVisibleDropDownList = true
    },
    systemButtons() {
      this.$refs.systemButton.dialogVisibleSystemBtn = true
    }
  }
}
</script>
<style scoped>
.form_btn {
  text-align: right;
  margin-bottom: 20px;
}
</style>
