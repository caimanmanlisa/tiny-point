<template>
  <div>
    <el-dialog
      title="单添加"
      :visible.sync="dialogVisibleDselect"
      width="80%"
      :before-close="handleCloseSelect"
      :append-to-body="true"
    >
      <el-form ref="addField" label-width="120px" :model="addField" status-icon>
        <el-row :gutter="20">
          <el-col :lg="23">
            <div class="form_btn">
              <el-button type="primary" @click="addsingleAdd">保存</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :lg="10">
            <el-form-item label="数据库字段名">
              <el-input v-model="addField.fname" autocomplete="off" />
            </el-form-item>
          </el-col>

          <el-col :lg="13">
            <el-form-item label="字段显示名">
              <el-input v-model="addField.lanIDVal" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="10">
            <el-form-item label="所属表">
              <el-input v-model="addField.tableID" readonly autocomplete="off" />
            </el-form-item>
          </el-col>

          <el-col :lg="13">
            <el-form-item label="显示顺序">
              <el-input v-model="addField.seqNo" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <!--下拉-->

        <el-row :gutter="22">
          <el-col :lg="6">
            <el-form-item label-width="120px" label="表现形式" :inline="true">
              <el-select v-model="expressionOfValue" clearable placeholder="请选择">
                <el-option
                  v-for="item in expressionOfOption"
                  :key="item.expressionOfValue"
                  :label="item.label"
                  :value="item.expressionOfValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!--单行文本-->
          <el-col :lg="4" style="padding 0px;">
            <el-select v-if="expressionOfValue===1" v-model="textFieldOfTypeValue" placeholder="请选择">
              <el-option
                v-for="item in textField"
                :key="item.textFieldOfTypeValue"
                :label="item.label"
                :value="item.textFieldOfTypeValue"
              />
            </el-select>
          </el-col>

          <el-col v-if="expressionOfValue===1&&textFieldOfTypeValue===1" :lg="13" style="padding:3px">
            <el-col :lg="10">
              <el-form-item label-width="115px" label="长度" :inline="true">
                <el-input-number
                  v-model="textLength"
                  size="small"
                  controls-position="right"
                  :min="0"
                  :max="10"
                />
              </el-form-item>
            </el-col>

            <el-col :lg="14">
              <el-form-item label-width="80px" label="正则" :inline="true">
                <el-input placeholder="请输入内容" clearable />
              </el-form-item>
            </el-col>
          </el-col>

          <el-col v-if="expressionOfValue===1&&textFieldOfTypeValue===2" :lg="14">
            <el-col :lg="8">
              <el-form-item label-width="110px" label="控制范围" :inline="true">
                <el-select v-model="controlLimitOfValue" placeholder="请选择">
                  <el-option
                    v-for="item in controlLimit"
                    :key="item.controlLimitOfValue"
                    :label="item.label"
                    :value="item.controlLimitOfValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col
              v-if="expressionOfValue===1&&textFieldOfTypeValue===2&&controlLimitOfValue===1"
              :lg="14"
              :offset="1"
            >
              <el-input-number
                v-model="textMinLnteger"
                size="small"
                controls-position="right"
                :min="0"
                :max="10"
              />

              <span style="padding:5px">到</span>

              <el-input-number
                v-model="textMaxLnteger"
                size="small"
                controls-position="right"
                :min="0"
                :max="10"
              />
            </el-col>

            <el-col v-if="controlLimitOfValue===1" :lg="22">
              <el-form-item label="转换" label-width="110px" :inline="true">
                <el-input placeholder="请输入内容" clearable />
              </el-form-item>
            </el-col>

            <el-col v-if="controlLimitOfValue===2" :lg="14">
              <el-form-item label="转换" label-width="50px" :inline="true">
                <el-input placeholder="请输入内容" clearable />
              </el-form-item>
            </el-col>
          </el-col>

          <el-col v-if="expressionOfValue===1&&textFieldOfTypeValue===3" :lg="14">
            <el-col :lg="8">
              <el-form-item label="控制范围" label-width="110px" :inline="true">
                <el-select v-model="controlLimitOfValue" placeholder="请选择">
                  <el-option
                    v-for="item in controlLimit"
                    :key="item.controlLimitOfValue"
                    :label="item.label"
                    :value="item.controlLimitOfValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              v-if="expressionOfValue===1&&textFieldOfTypeValue===3&&controlLimitOfValue===1"
              :lg="16"
            >
              <el-input-number
                v-model="textMinDecimalDigit"
                size="small"
                controls-position="right"
                :min="0"
                :max="10"
              />
              <span style="padding:5px">到</span>
              <el-input-number
                v-model="textMaxDecimalDigit"
                size="small"
                controls-position="right"
                :min="0"
                :max="10"
              />
            </el-col>

            <el-col v-if="controlLimitOfValue===1" :lg="17">
              <el-form-item label="小数位数" label-width="110px" :inline="true">
                <el-input-number
                  v-model="textDecimalDigit"
                  size="small"
                  controls-position="right"
                  :min="0"
                  :max="10"
                  style="width:100%"
                />
              </el-form-item>
            </el-col>

            <el-col v-else-if="controlLimitOfValue===2" :lg="10">
              <el-form-item label="小数位数" label-width="98px" :inline="true">
                <el-input-number
                  v-model="textDecimalDigit"
                  size="small"
                  controls-position="right"
                  :min="0"
                  :max="10"
                />
              </el-form-item>
            </el-col>

            <el-col :lg="17">
              <el-form-item label-width="110px" label="转换" :inline="true">
                <el-input placeholder="请输入内容" />
              </el-form-item>
            </el-col>
          </el-col>

          <!--多行文本-->
          <el-col v-if="expressionOfValue===2" :lg="3">
            <el-form-item label-width="120px" label="默认形式行数" :inline="true">
              <el-input-number
                v-model="linesOfMultilineText"
                size="small"
                controls-position="right"
                :min="0"
                :max="10"
              />
            </el-form-item>
          </el-col>
          <!--富文本暂无-->

          <!--下拉框-->
          <el-col v-if="expressionOfValue===4" :lg="17">
            <el-col :lg="7">
              <el-form-item label-width="75px" label="展示方式" :inline="true">
                <el-select v-model="dropdownOfValue" placeholder="请选择">
                  <el-option
                    v-for="item in displayOfDropdown"
                    :key="item.dropdownOfValue"
                    :label="item.label"
                    :value="item.dropdownOfValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :lg="5">
              <el-radio-group v-model="radio" style="height:35px;line-height:40px">
                <el-radio :label="1">单选</el-radio>
                <el-radio :label="2">多选</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :lg="12" style="padding:0px">
              <el-input placeholder="请输入内容">
                <el-button slot="prepend" @click="dropDownListItems()">选择下拉框</el-button>
              </el-input>
            </el-col>
          </el-col>
          <!--时间和日期-->
          <el-col v-if="expressionOfValue===5" :lg="4">
            <el-select v-model="timeOfValue" placeholder="请选择">
              <el-option
                v-for="item in timeOfType"
                :key="item.timeOfValue"
                :label="item.label"
                :value="item.timeOfValue"
              />
            </el-select>
          </el-col>

          <!--系统按钮-->
          <el-col v-if="expressionOfValue===6" :lg="10">
            <el-input placeholder="请输入内容">
              <el-button slot="prepend" @click="systemButtons()">选择提交</el-button>
            </el-input>
          </el-col>
          <!--文件上传暂无-->

          <!--存放URL字段-->
          <el-col v-if="expressionOfValue===8" :lg="17">
            <el-col :lg="12">
              <el-form-item label-width="75px" label="显示值">
                <el-input placeholder="请输入内容" readonly />
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label-width="50px" label="链接">
                <el-input placeholder="请输入内容" readonly />
              </el-form-item>
            </el-col>
          </el-col>
          <div v-if="expressionOfValue===9">
            <el-col :lg="23">
              <el-form-item label-width="120px" label="HTML文本">
                <el-input v-model="textarea" type="textarea" :rows="2" placeholder="请输入内容" />
              </el-form-item>
            </el-col>
          </div>
        </el-row>
      </el-form>
    </el-dialog>
    <dropDownListItem ref="dropDownListItem" />
    <systemButton ref="systemButton" />
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
      dialogVisibleDselect: false,

      addField: {
        flength: 0,
        fname: '',
        fpower: '',
        fremark: '',
        fsysSelect: 0,
        ftype: 0,
        ftypeDt: '',
        ftypeDt1: '',
        isActive: '',
        isRange: '',
        lanIDVal: '',
        maxFName: '',
        maxNumber: 0,
        minFName: '',
        minNumber: 0,
        seqNo: '',
        tableID: 0
      },
      textLength: 0, // 单行文本-文本-num
      textMinLnteger: 0, // 单行文本-整数-Minnum
      textMaxLnteger: 0, // 单行文本-整数-Minnum
      textDecimalDigit: 0, // 单行文本-小数-num
      textMinDecimalDigit: 0, // 单行文本-小数-Min
      textMaxDecimalDigit: 0, // 单行文本-小数-Max
      linesOfMultilineText: 0, // 多行文本-行数
      textarea: '', // HTML文本内容
      radio: 1,
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
        },
        {
          expressionOfValue: 9,
          label: '固定HTML文本'
        }
      ],
      expressionOfValue: '',

      formOfExpression: {},

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
      textFieldOfTypeValue: '',
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
      controlLimitOfValue: '',

      displayOfDropdown: [
        {
          dropdownOfValue: 1,
          label: '下拉框'
        },
        {
          dropdownOfValue: 2,
          label: '复选框'
        }
      ],
      dropdownOfValue: '',

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
      timeOfValue: ''
    }
  },

  methods: {
    handleCloseSelect() {
      this.dialogVisibleDselect = false
    },

    dropDownListItems() {
      this.$refs.dropDownListItem.dialogVisibleDropDownList = true
    },
    systemButtons() {
      this.$refs.systemButton.dialogVisibleSystemBtn = true
    },
    addsingleAdd() {

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
