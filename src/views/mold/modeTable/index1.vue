<template>
  <div class="app-container">
    <h3 class="title_cont">表结构</h3>
    <div class="content_toplayout">
      <!--搜索框的位置-->
      <div class="search_content fl">
        <el-button type="primary" icon="el-icon-search" @click="searchlanID" />
        <input v-model.trim="pagingSearchKey" type="text" class="search_content_input fl" placeholder="请输入关键字">
      </div>
      <!--按钮位置-->
      <div class="button fr">
        <el-button type="primary" icon="el-icon-plus" @click="AddTable">添加</el-button>
        <el-button type="primary" icon="el-icon-minus" @click="delTable">删除</el-button>
        <el-button type="info" icon="el-icon-minus" @click="prohibitTable">禁用</el-button>
      </div>
    </div>
    <!-- 主页面数据展示-->
    <div class="table_box">
      <el-table
        ref="multipleTable"
        :data="typeData"
        :row-key="getRowKeys"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" :reserve-selection="true" />
        <el-table-column label="名称" prop="lanID" />

        <el-table-column prop="mainTypeVal" label="类型" />
        <el-table-column prop="tableName" label="数据库表名" />
        <el-table-column prop="seqNo" label="显示顺序" show-overflow-tooltip />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="checkTbale(scope.row.id)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 主页面分页-->
    <div class="block" style="text-align:center">
      <el-pagination
        background
        :current-page="page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 添加页面的el-dialog-->
    <el-dialog
      :title="isAdddIndex === -1 ? '类型添加' : '类型添加'"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleCloseAdd"
    >
      <el-form ref="ruleForm" label-width="140px" :model="ruleForm" status-icon :rules="rules">
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="表结构名称" prop="lanID">
              <el-input v-model="ruleForm.lanID" autocomplete="off" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="数据库名称" prop="tableName">
              <el-input v-model="ruleForm.tableName" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="顺序显示" prop="seqNo">
              <el-input v-model="ruleForm.seqNo" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="描述" style="margin-bottom:5px">
              <el-input v-model="ruleForm.remark" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <!--
          <el-row :gutter="20">
            <el-col :span="23">
              <el-form-item label="启用">
                <el-switch />
              </el-form-item>
            </el-col>
        </el-row>-->
      </el-form>
    </el-dialog>

    <!-- 显示修改的el-dialog-->
    <el-dialog
      :title="isAdddIndex === -1 ? '类型添加' : '类型添加'"
      :visible.sync="dialogFromVisible"
      width="80%"
      :before-close="handleCloseEdit"
    >
      <el-tabs v-model="activeName">
        <!--基本分栏-->
        <el-tab-pane label="基础" name="first">
          <el-form ref="form" label-width="140px" :model="form" status-icon :rules="rules">
            <el-row :gutter="20">
              <el-col :span="23">
                <div class="form_btn">
                  <el-button type="primary" @click="modifyTable()">保存</el-button>
                  <el-button @click="editCancel()">取消</el-button>
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
            <input v-model.trim="pagingSearFormchKey" type="text" class="search_content_input fl" placeholder="请输入关键字">
          </div>
          <div class="button fr">
            <el-button type="primary" icon="el-icon-plus" @click="addSelect()">添加</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="pladdSelect()">批量添加</el-button></el-button>
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
        <!--子表分栏-->
        <el-tab-pane label="子表" name="third">子表</el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog title="单添加" :visible.sync="dialogVisibleDselect" width="80%" :before-close="handleCloseSelect">
      <el-form ref="addField" label-width="120px" :model="addField" status-icon :rules="rules">
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary" @click="modifySingle('addField')">保存</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="数据库字段名" prop="fname">
              <el-input v-model="addField.fname" autocomplete="off" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="字段显示名" prop="lanIDVal">
              <el-input v-model="addField.lanIDVal" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="所属表">
              <el-input v-model="addField.tableID" readonly="" autocomplete="off" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="显示顺序">
              <el-input v-model="addField.seqNo" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <!--下拉-->

        <el-row id="lie" :gutter="20">
          <el-col :span="6">
            <el-form-item>
              <el-select v-model="value1" clearable placeholder="请选择">
                <el-option
                  v-for="item in option1"
                  :key="item.value1"
                  :label="item.label"
                  :value="item.value1"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!--单行文本-->
          <el-col :span="2">
            <el-select v-if="value1===1" v-model="value2" placeholder="请选择">
              <el-option
                v-for="item in option2"
                :key="item.value2"
                :label="item.label"
                :value="item.value2"
              />
            </el-select>
          </el-col>

          <el-col v-if="value1===1&&value2===1" :span="15" style="padding:3px">
            <el-col :span="10">
              <el-form-item label="长度" :inline="true">
                <el-input-number
                  v-model="num"
                  size="mini"
                  controls-position="right"
                  :min="1"
                  :max="10"
                />
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="正则" :inline="true">
                <el-input placeholder="请输入内容" clearable />
              </el-form-item>
            </el-col>
          </el-col>

          <el-col v-if="value1===1&&value2===2" :span="15">
            <el-col :span="8">
              <el-form-item label="控制范围" :inline="true">
                <el-select v-model="value3" placeholder="请选择">
                  <el-option
                    v-for="item in option3"
                    :key="item.value3"
                    :label="item.label"
                    :value="item.value3"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-if="value1===1&&value2===2&&value3===1" :span="10">
              <el-input-number
                v-model="num1"
                size="mini"
                controls-position="right"
                :min="1"
                :max="10"
              />

              <span style="padding:5px"> 到  </span>

              <el-input-number
                v-model="num2"
                size="mini"
                controls-position="right"
                :min="1"
                :max="10"
              />
            </el-col>
            <el-col :span="6">
              <el-form-item label="转换" label-width="50px" :inline="true">
                <el-input placeholder="请输入内容" clearable />
              </el-form-item>

            </el-col>
          </el-col>

          <el-col v-if="value1===1&&value2===3" :span="15">
            <el-col :span="6">
              <el-form-item label="控制范围" label-width="75px" :inline="true">
                <el-select v-model="value3" placeholder="请选择">
                  <el-option
                    v-for="item in option3"
                    :key="item.value3"
                    :label="item.label"
                    :value="item.value3"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-if="value1===1&&value2===3&&value3===1" :span="10">
              <el-input-number
                v-model="num1"
                size="mini"
                controls-position="right"
                :min="1"
                :max="10"
              />

              <span style="padding:5px"> 到  </span>

              <el-input-number
                v-model="num2"
                size="mini"
                controls-position="right"
                :min="1"
                :max="10"
              />

            </el-col>
            <el-col :span="4" style="margin-left:-15px">
              <el-form-item label="小数位数" label-width="75px" :inline="true">
                <el-input-number
                  v-model="num"
                  size="mini"
                  controls-position="right"
                  :min="1"
                  :max="10"
                />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="转换" label-width="90px" :inline="true">
                <el-input placeholder="请输入内容" />
              </el-form-item>
            </el-col>
          </el-col>

          <!--多行文本-->
          <el-col v-if="value1===2" :span="3">
            <el-form-item label="默认形式行数" :inline="true">
              <el-input-number
                v-model="num"
                size="mini"
                controls-position="right"
                :min="1"
                :max="10"
              />
            </el-form-item>
          </el-col>
          <!--富文本暂无-->

          <!--下拉框-->
          <el-col v-if="value1===4" :span="14">
            <el-col :span="8">
              <el-form-item label="展示方式" :inline="true">
                <el-select v-model="value3" placeholder="请选择">
                  <el-option
                    v-for="item in selectOption"
                    :key="item.selectvalue"
                    :label="item.label"
                    :value="item.selectvalue"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-radio v-model="radio" label="1">单选</el-radio>
              <el-radio v-model="radio" label="2">多选</el-radio>
              <el-button type="primary" plain>选择提交</el-button>
            </el-col>
            <el-col :span="6">
              <el-input placeholder="请输入内容" readonly />
            </el-col>
          </el-col>
          <!--时间和日期-->
          <el-col v-if="value1===5" :span="3">
            <el-select v-model="value4" placeholder="请选择">
              <el-option
                v-for="item in option4"
                :key="item.value4"
                :label="item.label"
                :value="item.value4"
              />
            </el-select>
          </el-col>

          <!--系统按钮-->
          <el-col v-if="value1===6" :span="10">
            <el-col :span="4">
              <el-button type="primary" plain>选择提交</el-button>
            </el-col>
            <el-col :span="20">
              <el-input placeholder="请输入内容" readonly />
            </el-col>
          </el-col>
          <!--文件上传暂无-->

          <!--存放URL字段-->
          <el-col v-if="value1===8" :span="16">
            <el-col :span="12">
              <el-form-item label="显示值">
                <el-input placeholder="请输入内容" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="链接">
                <el-input placeholder="请输入内容" readonly />
              </el-form-item>
            </el-col>
          </el-col>
          <div v-if="value1===9">
            <el-col :span="23">
              <el-form-item label="HTML文本">
                <el-input v-model="textarea" type="textarea" :rows="2" placeholder="请输入内容" />
              </el-form-item>
            </el-col>

          </div>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog title="批量添加" :visible.sync="dialogVisiblePl" width="80%" :before-close="handleCloseSelectpl">
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
        style="width: 95%"
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
            <el-select v-model="scope.row.value1" placeholder="请选择">
              <el-option
                v-for="item in ploption1"
                :key="item.value1"
                :label="item.label"
                :value="item.value1"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="类型1" align="center">
          <template slot-scope="scope">
            <!--1-->
            <el-select v-if="scope.row.value1===1" v-model="scope.row.value2" placeholder="请选择">
              <el-option
                v-for="item in ploption2"
                :key="item.value2"
                :label="item.label"
                :value="item.value2"
              />
            </el-select>
            <!--2-->
            <el-input-number
              v-if="scope.row.value1===2"
              v-model="num"
              size="mini"
              controls-position="right"
              :min="1"
              :max="10"
            />
            <!--3暂时为空-->
            <!--4-1-->
            <el-select v-if="scope.row.value1===4" v-model="scope.row.selectvalue" placeholder="请选择">
              <el-option
                v-for="item in selectOption1"
                :key="item.selectvalue"
                :label="item.label"
                :value="item.selectvalue"
              />
            </el-select>
            <!--5时间-->
            <el-select v-if="scope.row.value1===5" v-model="scope.row.value4" placeholder="请选择">
              <el-option
                v-for="item in ploption4"
                :key="item.value4"
                :label="item.label"
                :value="item.value4"
              />
            </el-select>
            <!--6系统按钮-->
            <el-input v-if="scope.row.value1===6" readonly="">
              <template slot="prepend"><el-button size="mini" round style="width:60px;padding:0;font-size:12px">选择下拉框</el-button></template>
            </el-input>
            <!--8URL地址-->
            <el-input v-if="scope.row.value1===8" placeholder="请输入显示值" clearable />
          </template>
        </el-table-column>

        <el-table-column label="类型2" align="center">
          <template slot-scope="scope">
            <!--1-1-->
            <el-input-number
              v-if="scope.row.value1===1&&scope.row.value2===1"
              v-model="num"
              size="mini"
              controls-position="right"
              :min="1"
              :max="10"
            />
            <!--1-2-->
            <el-select v-if="scope.row.value1===1&&scope.row.value2===2" v-model="scope.row.value3" placeholder="请选择">
              <el-option
                v-for="item in ploption3"
                :key="item.value3"
                :label="item.label"
                :value="item.value3"
              />
            </el-select>
            <!--1-3-->
            <el-select v-if="scope.row.value1===1&&scope.row.value2===3" v-model="scope.row.value3" placeholder="请选择">
              <el-option
                v-for="item in ploption3"
                :key="item.value3"
                :label="item.label"
                :value="item.value3"
              />
            </el-select>
            <!--4-1-->
            <el-select v-if="scope.row.value1===4" v-model="scope.row.Radiovalue" placeholder="请选择">
              <el-option
                v-for="item in selectRadio"
                :key="item.Radiovalue"
                :label="item.label"
                :value="item.Radiovalue"
              />
            </el-select>
            <!--6系统按钮-->
            <el-input v-if="scope.row.value1===6" placeholder="请输入内容" clearable />
            <!--7无-->
            <!--8URL地址-->
            <el-input v-if="scope.row.value1===8" placeholder="请输入链接字段" clearable />
          </template>
        </el-table-column>
        <el-table-column label="类型3" align="center">
          <template slot-scope="scope">
            <!--1-1-->
            <el-input v-if="scope.row.value1===1&&scope.row.value2===1" placeholder="请输入内容" clearable />
            <!--1-2-->
            <el-input v-if="scope.row.value1===1&&scope.row.value2===2" placeholder="请输入内容" clearable />
            <!--1-3-->
            <el-input-number
              v-if="scope.row.value1===1&&scope.row.value2===3"
              v-model="num"
              size="mini"
              controls-position="right"
              :min="1"
              :max="10"
            />
            <!--4-1-->
            <el-input v-if="scope.row.value1===4" readonly="">
              <template slot="prepend"><el-button size="mini" round style="width:60px;padding:0;font-size:12px">选择下拉框</el-button></template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="类型4" align="center">
          <template slot-scope="scope">
            <!--1-3-->
            <el-input v-if="scope.row.value1===1&&scope.row.value2===3" placeholder="请输入内容" clearable />
            <!--4-1-->
            <el-input v-if="scope.row.value1===4" placeholder="请输入内容" clearable />
          </template>
        </el-table-column>

      </el-table>
    </el-dialog>

  </div>
</template>
<script>
// import  {getData} from '@/api/mold'
export default {
  // 验证输出错误
  data() {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入表结构名称'))
      } else {
        callback()
      }
    }
    var validatedbName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入数据库名称'))
      } else {
        callback()
      }
    }
    var validateorderBy = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入顺序显示'))
      } else {
        callback()
      }
    }
    var validateorderlanID = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入表结构名称'))
      } else {
        callback()
      }
    }
    var validateorderDadd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入表结构名称'))
      } else {
        callback()
      }
    }
    var validateorderDaddlanIDVal = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入表结构名称'))
      } else {
        callback()
      }
    }
    var validateorderDaddfname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入表结构名称'))
      } else {
        callback()
      }
    }
    var validateorderDaddvalue1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入表结构名称'))
      } else {
        callback()
      }
    }
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
      // 新增变量

      // 验证v-model 变量
      ruleForm: {
        lanID: '',
        mainTypeVal: '',
        seqNo: '',
        remark: '',
        mainType: '0',
        tableName: ''
      },
      // 错误提示
      rules: {
        lanID: [{ validator: validateName, trigger: 'blur' }],
        tableName: [{ validator: validatedbName, trigger: 'blur' }],
        seqNo: [{ validator: validateorderBy, trigger: 'blur' }],
        lanID: [{ validator: validateorderlanID, trigger: 'blur' }],
        lanIDVal: [{ validator: validateorderDaddlanIDVal, trigger: 'blur' }],
        fname: [{ validator: validateorderDaddfname, trigger: 'blur' }],
        value1: [{ validator: validateorderDaddvalue1, trigger: 'change' }]
      },
      activeName: 'first',
      isAdddIndex: -1, // 判断是不是add的页面
      dialogVisible: false, // 添加弹框的显示
      dialogFromVisible: false, // 点击名称
      dialogVisibleDselect: false, // 添加页面
      selectTableid: 0, // 点击列时候产生的这行id
      pageSize: 10, // 一页几条数据
      pages: 0, // 每页总页数
      page: 1, //	当前页数
      total: 0, // 总条数
      typeData: [], // 数据
      multipleSelection: [], // 复选框
      getRowKeys(row) {
        // 记录每行的key值
        return row.id
      },
      pagingSearchKey: null, // 查询的值的字符串
      pagingSearFormchKey: null, // 子页面的查询的值的字符串
      selFieldByPage: {
        fname: '',
        lanIDVal: '',
        ftypeVal: ''
      },
      fyForm: [],
      fyTo: {
        pageNum: 0,
        pageSize: 10,
        pages: 0,
        total: 0,
        page: 1
      },

      option1: [
        {
          value1: 1,
          label: '单行文本'
        },
        {
          value1: 2,
          label: '多行文本'
        },
        {
          value1: 3,
          label: '富文本'
        },
        {
          value1: 4,
          label: '下拉框'
        },
        {
          value1: 5,
          label: '时间和日期'
        },
        {
          value1: 6,
          label: '系统按钮'
        },
        {
          value1: 7,
          label: '文件上传'
        },
        {
          value1: 8,
          label: '存放URL'
        },
        {
          value1: 9,
          label: '固定HTML文本'
        }
      ],
      value1: '',

      option2: [
        {
          value2: 1,
          label: '文本'
        },
        {
          value2: 2,
          label: '整数'
        },
        {
          value2: 3,
          label: '小数'
        }
      ],
      value2: '',
      num: 1,
      num1: 1,
      num2: 2,

      option3: [
        {
          value3: 1,
          label: '是'
        },
        {
          value3: 2,
          label: '否'
        }
      ],
      value3: '',

      option4: [
        {
          value3: 1,
          label: '时间'
        },
        {
          value4: 2,
          label: '日期'
        },
        {
          value4: 3,
          label: '时间和日期'
        }
      ],
      value4: '',

      selectOption: [{
        label: '下拉框',
        selectvalue: 1
      }, {
        label: '复选框',
        selectvalue: 2
      }],
      radio: '1',
      textarea: '',

      multipleSelections: [],
      dialogVisiblePl: false,
      ploption1: [
        {
          value1: 1,
          label: '单行文本'
        },
        {
          value1: 2,
          label: '多行文本'
        },
        {
          value1: 3,
          label: '富文本'
        },
        {
          value1: 4,
          label: '下拉框'
        },
        {
          value1: 5,
          label: '时间和日期'
        },
        {
          value1: 6,
          label: '系统按钮'
        },
        {
          value1: 7,
          label: '文件上传'
        },
        {
          value1: 8,
          label: '存放URL'
        }
      ],

      ploption2: [
        {
          value2: 1,
          label: '文本'
        },
        {
          value2: 2,
          label: '整数'
        },
        {
          value2: 3,
          label: '小数'
        }
      ],

      num: 1,

      ploption3: [
        {
          value3: 1,
          label: '是'
        },
        {
          value3: 2,
          label: '否'
        }
      ],

      ploption4: [
        {
          value4: 1,
          label: '时间'
        },
        {
          value4: 2,
          label: '日期'
        },
        {
          value4: 3,
          label: '时间和日期'
        }
      ],

      selectOption1: [
        {
          selectvalue: 1,
          label: '下拉框'
        },
        {
          selectvalue: 2,
          label: '复选框'
        }
      ],
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
      ],
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
        tableID: 0,
        value1: ''
      }
    }
  },
  created() {
    this.getData() // 显示分页
    // this.table()
  },

  methods: {
    // 得到数据
    getData: async function() {
      this.$axios({
        method: 'get',
        url: 'http://sksigmar.com:81/mode/table/selTableByPage',
        params: {
          page: this.page, // 当前页数
          rows: this.pageSize, //	下拉框每页条数
          sortBy: 'seqNo', //	排序字段
          key: this.pagingSearchKey, //	查询
          desc: false //	正逆序
        }
      })
        .then((res) => {
          if (res.data.list.length > 0) {
            this.typeData = res.data.list // 获取 每页对象
            this.total = res.data.total // 获取 总条数
            this.pages = res.data.pages // 获取 总页数
            this.pageSize = res.data.pageSize // 获取 每页几条
          }
        })
        .catch((e) => {
          console.log(e)
          this.typeData = []
          this.serverItemsLength = 0
          this.pages = 1
        })
    },
    // 2级分页
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
    // 清空数据源
    clearFormMod() {
      this.ruleForm = {
        lanID: '',
        mainTypeVal: '',
        seqNo: '',
        remark: '',
        mainType: '0',
        tableName: ''
      }
      //  this.tableData={
      //     dbName:'' ,
      //     address: "",
      //     name: "",
      //     weather: "",
      //     phone: "",
      //     date: "",
      //     mdate: "",
      //     loveer: "",
      //   }
      this.form = {
        id: 0,
        lanID: '',
        mainType: '',
        mainTypeVal: '',
        remark: '',
        seqNo: 0,
        supID: 0,
        tableName: '',
        tableId: ''
      }
      this.addField = {
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
      }
      // this.option1.value1.splice(0,this.option1.length)
      // this.option1=this.option1
      // console.log( '1111'+this.option1.length);
    },
    searchFname() {
      this.fyTo.page = 1
      this.getFormData()
    },
    // 复选框改变事件
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionChangepl(val) {
      this.multipleSelections = val
    },
    // pageSize变化时时间
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
      //  this.table()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.page = val
      this.getData()
      // this.table()
      console.log(this.page)
      console.log(`当前页: ${val}`)
    },
    handleSizeChangeForm(val) {
      this.fyTo.pageSize = val
      this.getFormData()
      //  this.table()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChangeForm(val) {
      this.fyTo.page = val
      this.getFormData()
      // this.table()
      console.log(this.fyTo.page)
      console.log(`当前页: ${val}`)
    },
    // 查询1事件
    searchlanID() {
      this.page = 1
      this.getData()
      // this.table()
    },
    // 删除事件
    delTable: async function() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const selectionLength = this.multipleSelection.length
          if (selectionLength > 0) {
            for (let index = 0; index < selectionLength; index++) {
              const id = this.multipleSelection[index].id
              this.$axios({
                method: 'POST',
                url: `http://sksigmar.com:81/mode/table/delTable/${id}`
              })
            }
            this.page = 1
            this.getData()
            // 删除完数据之后清除勾选框
            this.$refs.multipleTable.clearSelection()
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          message: '警告哦，你还没有选择要删除的数据',
          type: 'warning'
        })
      }
    },
    // 禁止事件
    prohibitTable: async function() {
      const selectionLength = this.multipleSelection.length
      if (selectionLength > 0) {
        for (let index = 0; index < selectionLength; index++) {
          const id = this.multipleSelection[index].id
          this.$axios({
            method: 'POST',
            url: `http://sksigmar.com:81/mode/table/disableTable/${id}`
          })
        }
        this.getData()
      }
    },
    // 二级模态框的添加事件
    AddTable() {
      this.dialogVisible = true
    },
    // 关闭X事件
    handleCloseAdd() {
      this.$refs['ruleForm'].resetFields()
      this.dialogVisible = false
    },
    // 编辑x事件
    handleCloseEdit() {
      this.$refs['form'].resetFields()
      this.dialogFromVisible = false
    },
    // 批量x事件
    handleCloseSelect() {
      this.$refs['addField'].resetFields()
      this.dialogVisibleDselect = false

      this.clearFormMod()
    },
    handleCloseSelectpl() {
      this.dialogVisiblePl = false
    },
    // 添加保存的点击事件进行验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'POST',
            url: 'http://sksigmar.com:81/mode/table/addTable',
            data: this.ruleForm
          })
          this.handleSizeChange()
          // this.page = 1

          this.clearFormMod()
          this.dialogVisible = false

          this.$message({
            message: '恭喜你，添加成功！',
            type: 'success'
          })
        } else {
          this.$message.error('对不起，数据异常，请重新输入')
          console.log('error submit!!')
          return false
        }
      })
    },
    // 单添加保存
    modifySingle(addField) {
      this.$refs['addField'].validate((valid) => {
        if (valid) {
          this.$message({
            message: '恭喜你，保存成功！',
            type: 'success'
          })
          this.dialogVisibleDselect = false
          this.clearFormMod()
        } else {
          this.$message.error('对不起，数据异常，请重新输入')
          console.log('error submit!!')
          return false
        }
      })
    },
    // 添加取消按钮的点击事件 (取消了验证)
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
    },
    // 编辑取消按钮的点击事件(取消了验证)
    editCancel() {
      this.$refs['form'].resetFields()
      this.dialogFromVisible = false
    },
    // 查看每行数据
    checkTbale(id) {
      this.selectTableid = id
      this.dialogFromVisible = true
      this.$axios({
        method: 'POST',
        url: `http://sksigmar.com:81/mode/table/selTableByID/${id}`
      })
        .then((res) => {
          this.form = res.data
          console.log(this.form)
        })
        .catch((e) => {
          console.log(e)
        })
      this.getFormData(id)
    },
    // 修改数据
    modifyTable() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const id = this.selectTableid
          this.$axios({
            method: 'POST',
            url: `http://sksigmar.com:81/mode/table/modifyTable/${id}`,
            data: this.form
          })
          this.page = 1
          this.getData()
          this.dialogFromVisible = false
          this.$message({
            message: '恭喜你，修改成功！',
            type: 'success'
          })
        } else {
          this.$message.error('对不起，修改异常，请重新尝试')
          console.log('error submit!!')
          return false
        }
      })
    },
    // selectOptions1(){
    //   this.addField.value1=this.option1.value1
    // },
    // 单条添加
    addSelect() {
      this.dialogVisibleDselect = true
    }, // 批量添加
    pladdSelect() {
      this.dialogVisiblePl = true
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

    // 删除方法
    // 删除选中行
    delData() {
      alert(this.multipleSelections.length)
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
    }

  }
}
</script>

<style scoped>

.table_box {
  padding: 20px 0;
}
/*修改提示文字的颜色*/

input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #aaa !important;
}
input::-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #aaa !important;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #aaa !important;
}
input::-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #aaa !important;
}
.el-row {
  margin-bottom: 0px;
}
.form_btn {
  text-align: right;
  margin-bottom: 20px;
}

.el-dialog__ti wtle {
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #fff;
  font-size: 24px;
}
</style>
