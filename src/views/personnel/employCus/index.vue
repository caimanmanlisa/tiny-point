<template>
  <div>
    <div class="app-container">
      <h3 class="title_cont">人员字段定义</h3>
      <div class="content_toplayout">
        <div class="search_content fl">
          <el-button type="primary" icon="el-icon-search" @click="search()" />
          <input slot="header" v-model.lazy="search" type="text" class="search_content_input fl" placeholder="请输入关键字" @keyup.enter="修改成功">
        </div>
        <div class="button fr">
          <el-button type="primary" icon="el-icon-plus" @click="add() ">添加</el-button>
        </div>
      </div>

      <div class="table_box">
        <el-table
          ref="multipleTable"
          :data="tableData.filter(data => !search || data.fieldName.toLowerCase().includes(search.toLowerCase()) || data.lanVal.toLowerCase().includes(search.toLowerCase()))"
          tooltip-effect="dark"
          style="width: 100%"
        >

          <el-table-column prop="fieldName" label="数据库字段名称" width="130">
            <template slot-scope="scope">{{ scope.row.fieldName }}</template>
          </el-table-column>
          <el-table-column prop="lanVal" label="字段显示名">
            <template slot-scope="scope">{{ scope.row.lanVal }}</template>
          </el-table-column>
          <el-table-column prop="fieldType" label="字段类型" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.fieldType | capitalize }}</template>

          </el-table-column>

          <el-table-column prop="fieldLength" label="长度" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.fieldLength }}</template>
          </el-table-column>
          <el-table-column prop="fieldLengthx" label="小数位数" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.fieldLengthx }}</template>
          </el-table-column>
          <el-table-column prop="isActive" label="启用" width="50" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.isActive" disabled true-label="0" false-label="1" />
            </template>
          </el-table-column>
          <el-table-column prop="isRead" label="只读" width="50" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.isRead" disabled true-label="0" false-label="1" />
            </template>
          </el-table-column>
          <el-table-column prop="isMust" label="必填" width="50" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.isMust" disabled true-label="0" false-label="1" />
            </template>
          </el-table-column>
          <el-table-column prop="isEdit" label="编辑" width="50" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.isEdit" disabled true-label="0" false-label="1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="update(scope.$index, scope.row)" />
              <el-button type="primary" icon="el-icon-delete" circle @click="del(scope.$index, scope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="isEditIndex === -1 ? '人员-人员字段定义-添加' : '人员-人员字段定义-更新'" :before-close="handleClose" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="95%">
      <el-dialog width="85%" title="下拉框" :visible.sync="selectVisible" :close-on-click-modal="false" append-to-body center>
        <div class="table_box">
          <el-table
            ref="multipleTable"
            :data="selectData"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column label="序号" prop="id">
              <template slot-scope="scope"><span style="display:block;width:100%;">{{ scope.row.id }}</span></template>
            </el-table-column>
            <el-table-column label="名称" prop="lanIDVal">
              <template slot-scope="scope"><span style="display:block;width:100%;" @click="getTT(scope.row)">{{ scope.row.lanIDVal }}</span></template>
            </el-table-column>
            <el-table-column label="排序" prop="seqNo">
              <template slot-scope="scope"><span style="display:block;width:100%;">{{ scope.row.seqNo }}</span></template>
            </el-table-column>
          </el-table>
          <br><br>
          <el-pagination
            background
            :current-page.sync="page"
            layout="prev,pager,next"
            :page-size="pageSize"
            :total="selectTatol"
            @current-change="handleCurrentSelChange"
          />
        </div>
      </el-dialog>
      <el-dialog width="70%" title="系统按钮" :visible.sync="sysVisible" :close-on-click-modal="false" append-to-body center>
        <div class="table_box">
          <el-table
            ref="multipleTable"
            :data="sysData"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column label="名称" prop="lanIDVal">
              <template slot-scope="scope"><span style="display:block;width:100%;" @click="getST(scope.row)">{{ scope.row.lanIDVal }}</span></template>
            </el-table-column>
            <el-table-column label="唯一标识名" prop="fkey">
              <template slot-scope="scope"><span style="display:block;width:100%;">{{ scope.row.fkey }}</span></template>
            </el-table-column>
            <el-table-column label="按钮类型" prop="isSysVal">
              <template slot-scope="scope"><span style="display:block;width:100%;">{{ scope.row.isSysVal }}</span></template>
            </el-table-column>
          </el-table>
          <br><br>
          <el-pagination
            background
            :current-page.sync="page"
            layout="prev,pager,next"
            :page-size="pageSize"
            :total="sysTatol"
            @current-change="handleCurrentSysChange"
          />
        </div>
      </el-dialog>

      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="110px">
        <el-row :gutter="0">
          <el-col :span="24">
            <div class="form_btn">
              <el-button type="primary" @click="save('form')">保存</el-button>
              <el-button type="primary" @click="cancel()">取消</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="数据库字段名" prop="fieldName" :label-width="formLabelWidth">
              <el-input v-model.trim="form.fieldName" :disabled="disabled" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字段显示名" prop="lanVal" :label-width="formLabelWidth">
              <el-input v-model="form.lanVal" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">
            <el-form-item label="字段类型" prop="fieldType" :label-width="formLabelWidth">
              <el-select v-model="form.fieldType" style="width: 120px" :disabled="disabled" placeholder="请选择" clearable>
                <el-option
                  v-for="item in fieldType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value "
                  @change="select(item,index)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 单行文本下拉框 -->
          <el-col :span="3">
            <el-form-item v-if="form.fieldType === '1' " prop="ftypeDt">
              <el-select v-model="form.ftypeDt" style="width:90px" :disabled="disabled" placeholder="请选择" clearable>
                <el-option
                  v-for="item in text"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  @change="select(item,index)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item v-if="form.fieldType === '1' && form.ftypeDt === '1' || form.fieldType === '1' && form.ftypeDt === '2' " label="控制范围" prop="isRange">
              <el-select v-model="form.isRange" style="width:90px" :disabled="disabled" placeholder="请选择" clearable>
                <el-option
                  v-for="item in isRange"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  @change="select(item,index)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="form.fieldType === '4' " :span="5">
            <el-form-item label="展示方式" prop="ftypeDt" label-width="160px">
              <el-select v-model="form.ftypeDt" style="width:100%" :disabled="disabled" placeholder="请选择" clearable>
                <el-option
                  v-for="item in showWay"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  @change="select(item,index)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item v-if="form.fieldType === '4' " prop="ftypeDt1">
              <el-radio-group v-model="form.ftypeDt1">
                <el-radio label="1">单选</el-radio>
                <el-radio label="2">多选</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item v-if="form.fieldType === '1' && form.ftypeDt === '0' " label="长度" prop="fieldLength" :label-width="formLabelWidth">
              <el-input v-model="form.fieldLength" :disabled="disabled" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item v-if="form.fieldType === '1' && form.ftypeDt === '0' " label="正则" prop="fpower" label-width="100px">
              <el-input v-model="form.fpower" :disabled="disabled" style="width: 200px" />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item v-if=" form.fieldType === '1' && form.ftypeDt === '1' && form.isRange === '1' || form.fieldType === '1' && form.ftypeDt === '2' && form.isRange === '1'" prop="minuNmber">
              <el-input v-model="form.minNumber" type="number" :disabled="disabled" style="width: 80px" placeholder="最小" />
            </el-form-item>
          </el-col>
          <el-col v-if=" form.fieldType === '1' && form.ftypeDt === '1' && form.isRange === '1' || form.fieldType === '1' && form.ftypeDt === '2' && form.isRange === '1'" :span="1" style="padding:11px 0px 0px 144px">~</el-col>
          <el-col :span="1">
            <el-form-item v-if="form.fieldType === '1' && form.ftypeDt === '1' && form.isRange === '1' || form.fieldType === '1' && form.ftypeDt === '2' && form.isRange === '1'" prop="maxNumber" label-width="20px">
              <el-input v-model="form.maxNumber" type="number" :disabled="disabled" style="width: 80px;" placeholder="最大" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item v-if="form.fieldType === '1' && form.ftypeDt === '2'" label="小数位数" prop="fieldLengthx" label-width="110px">
              <el-input v-model="form.fieldLengthx" :disabled="disabled" type="number" style="width: 80px" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item v-if="form.fieldType === '1' && form.ftypeDt === '1' || form.fieldType === '1' && form.ftypeDt === '2'" label="转换" prop="fpower" :label-width="formLabelWidth">
              <el-input v-model="form.fpower" :disabled="disabled" style="width: 200px" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item v-if="form.fieldType === '2'" label="默认形式行数" prop="fieldLength" label-width="180px">
              <el-input v-model="form.fieldLength" :disabled="disabled" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item v-if="form.fieldType === '4' " label="选择下拉框" prop="sysID" :label-width="formLabelWidth">
              <el-input v-model="form.sysIDVal" style="width:100%;" disabled>
                <el-button slot="prepend" :disabled="disabled" type="primary" @click="chooseSelect()">选择下拉框</el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <!-- 时间和日期 -->
          <el-col :span="6">
            <el-form-item v-if="form.fieldType === '5' " prop="ftypeDt">
              <el-select v-model="form.ftypeDt" :disabled="disabled" style="width:100%" placeholder="请选择">
                <el-option
                  v-for="item in date"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  @change="select(item,index)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item v-if="form.fieldType === '6' " label="选择系统按钮" prop="sysID" label-width="170px">
              <el-input v-model="form.sysIDVal" style="width:100%;" disabled>
                <el-button slot="prepend" :disabled="disabled" @click="chooseSys()">系统按钮</el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item v-if="form.fieldType === '8' " label="显示值" prop="fpower" label-width="160px">
              <el-input v-model="form.fpower" :disabled="disabled" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item v-if="form.fieldType === '8' " label="链接" prop="fremark" :label-width="formLabelWidth">
              <el-input v-model="form.fremark" :disabled="disabled" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.fieldType === '9' ">
          <el-col :span="24">
            <el-form-item label="HTML文本" prop="fremark" :label-width="formLabelWidth">
              <el-input v-model="form.fremark" type="textarea" :rows="2" placeholder="请输入内容" :disabled="disabled" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="页面属性" :label-width="formLabelWidth">
              <el-radio-group v-model="radioGroup">
                <el-radio label="1">只读</el-radio>
                <el-radio label="2">必填</el-radio>
                <el-radio label="3">编辑</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否启用" :label-width="formLabelWidth">
              <el-switch v-model="form.isActive" active-value="0" inactive-value="1" style="width:100%" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { empCusAll, empCusAdd, empCusDel, empCusUpdate, selectAll, sysAll, empFieldName } from '@/api/personnel'
export default {
  // 字段类型过滤器
  filters: {
    capitalize: function(value) {
      let typeName = null
      switch (value) {
        case 1 :
          typeName = '单行文本'
          break
        case 2 :
          typeName = '多行文本'
          break
        case 3 :
          typeName = '富文本'
          break
        case 4 :
          typeName = '下拉框'
          break
        case 5 :
          typeName = '时间日期'
          break
        case 6 :
          typeName = '系统按钮'
          break
        case 7 :
          typeName = '附件上传'
          break
        case 8 :
          typeName = '存放URL字段'
          break
        case 9 :
          typeName = '固定HTML文本'
          break
      }
      return typeName
    }
  },
  data() {
    // 不能纯数字或者数字开头
    var checkFieldName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('不能为空!'))
      } else {
        var reg2 = /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/
        console.log(reg2.test(value))
        if (!reg2.test(value)) {
          alert('您输入的【数据库字段名】：“' + value + '”格式不正确；提示：【首位可以是字母以及下划线。首位之后可以是字母，数字以及下划线。下划线后不能接下划线】')
        } else if (this.isEditIndex !== -1) { } else {
          this.getempFieldName(callback)
        } callback()
        //
      }
    }
    var checkLanVal = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('不能为空!'))
      } else {
        callback()
      }
    }
    var checkFieldType = (rule, value, callback) => {
      if (!value) {
        callback(new Error('不能为空!'))
      } else {
        callback()
      }
    }
    var checkftypeDt1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空!'))
      } else {
        callback()
      }
    }
    var validateFieldLength = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback(new Error('不能为空!'))
      } else {
        callback()
      }
    }
    var validateisRange = (rule, value, callback) => {
      if (!value) {
        callback(new Error('不能为空!'))
      } else {
        callback()
      }
    }
    var checkmaxNumber = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('不能为空!'))
      } else {
        callback()
      }
    }
    var checkminNumber = (rule, value, callback) => {
      if (value === '' || value === null) {
        this.$message({
          message: '最大最小值不能为空',
          type: 'warning'
        }); return
        callback(new Error('不能为空!'))
      } else {
        callback()
      }
    }
    var checkFieldLengthx = (rule, value, callback) => {
      if (value === '' || value === null) {
        this.$message({
          message: '小数位数不能为空',
          type: 'warning'
        }); return
        callback(new Error('不能为空!'))
      } else {
        callback()
      }
    }
    var checkftypeDt = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空!'))
      } else {
        callback()
      }
    }
    // var cksysIDVal = (rule, value, callback) => {
    //   if (value === '' || value === null) {
    //     callback(new Error('不能为空!'))
    //   } else {
    //     callback()
    //   }
    // }
    var cksysID = (rule, value, callback) => {
      if (!value) {
        this.$message({
          message: '下拉框或系统按钮值不能为空',
          type: 'warning'
        })
        callback(new Error('不能为空!'))
      } else {
        callback()
      }
    }
    var ckfremark = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('不能为空!'))
      } else {
        callback()
      }
    }

    return {
      type: '',
      pageSize: 10, // 一页几条数据
      pages: 0, // 每页总页数
      page: 1, //	当前页数
      selectTatol: 0,
      sysTatol: 0,
      // currentPage: 1,
      disabled: false,
      search: '',
      isEditIndex: -1,

      tableData: [],
      selectData: [],
      sysData: [],
      params: {
        page: 1,
        rows: 5
      },
      query: {
        page: 1, // 当前页数
        rows: 10, //	下拉框每页条数
        sortBy: 'seqNo', //	排序字段
        desc: false//	正逆序
      },
      form: {
        fieldLength: null,
        fieldLengthx: null,
        fieldName: '',
        fieldType: '',
        fpower: '',
        fremark: '',
        ftypeDt: '',
        ftypeDt1: '1',
        isActive: '0',
        isEdit: null,
        isMust: null,
        isRange: null,
        isRead: null,
        lanVal: '',
        maxNumber: null,
        minNumber: null,
        sysID: null,
        sysIDVal: null
      }, radioGroup: '3',
      fieldType: [
        { value: '1', label: '单行文本' },
        { value: '2', label: '多行文本' },
        { value: '3', label: '富文本' },
        { value: '4', label: '下拉框' },
        { value: '5', label: '时间和日期' },
        { value: '6', label: '系统按钮' },
        { value: '7', label: '文件上传' },
        { value: '8', label: '存放URL字段' },
        { value: '9', label: '固定HTML文本' }
      ],
      text: [
        { value: '0', label: '文本' },
        { value: '1', label: '整数' },
        { value: '2', label: '小数' }
      ],
      isRange: [
        { value: '1', label: '是' },
        { value: '0', label: '否' }
      ],
      date: [
        { value: '0', label: '时间' },
        { value: '1', label: '日期' },
        { value: '2', label: '时间和日期' }
      ],
      showWay: [
        { value: '0', label: '下拉框' },
        { value: '1', label: '复选框' }
      ],

      dialogFormVisible: false,
      selectVisible: false,
      sysVisible: false,
      formLabelWidth: '110px',
      rules: {
        isRange: [
          { validator: validateisRange, trigger: 'blur' }
        ],
        fieldLength: [
          { validator: validateFieldLength, trigger: 'blur' }
        ],
        ftypeDt1: [
          { validator: checkftypeDt1, trigger: 'blur' }
        ],
        fieldName: [
          { validator: checkFieldName, trigger: 'blur' }
        ],
        lanVal: [
          { validator: checkLanVal, trigger: 'blur' }
        ],
        fieldType: [
          { validator: checkFieldType, trigger: 'blur' }
        ],
        minNumber: [
          { validator: checkminNumber, trigger: 'blur' }
        ],
        maxNumber: [
          { validator: checkmaxNumber, trigger: 'blur' }
        ],
        fieldLengthx: [
          { validator: checkFieldLengthx, trigger: 'blur' }
        ],
        ftypeDt: [
          { validator: checkftypeDt, trigger: 'blur' }
        ],
        // sysIDVal: [
        //   { validator: cksysIDVal, trigger: 'blur' }
        // ],
        sysID: [
          { validator: cksysID, trigger: 'blur' }
        ],
        fremark: [
          { validator: ckfremark, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    getValue() {
      const form = {}
      if (this.radioGroup === '1') {
        form.isRead = '0'
        form.isMust = '1'
        form.isEdit = '1'
      }
      if (this.radioGroup === '2') {
        form.isRead = '1'
        form.isMust = '0'
        form.isEdit = '1'
      }
      if (this.radioGroup === '3') {
        form.isRead = '1'
        form.isMust = '1'
        form.isEdit = '0'
      }
      return form
    }
  },

  // watch: {
  //   'radioGroup': {
  //     handler(val) {
  //       if (val === '1') {
  //         this.form.isRead = '0'
  //         this.form.isMust = '1'
  //         this.form.isEdit = '1'
  //       }
  //       if (val === '2') {
  //         this.form.isRead = '1'
  //         this.form.isMust = '0'
  //         this.form.isEdit = '1'
  //       }
  //       if (val === '3') {
  //         this.form.isRead = '1'
  //         this.form.isMust = '1'
  //         this.form.isEdit = '0'
  //       }
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  //
  //   // 'fieldName': {
  //
  //   // }
  // },
  created() {
    this.getorgCusAll()
  },

  methods: {
    getempFieldName() {
      empFieldName(this.form.fieldName).then(res => {
        if (!res.exist) {
          this.$message.error('数据库字段名不能重复')
        }
        // eslint-disable-next-line handle-callback-err
      }).catch(err => { // 报错进这个
        console.log('校验失败')
      })
    },
    searchEnterFun: function(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode === 13) {
        this.getorgCusAll()
        //  this.$router.push({path:'/Share?keywords='+this.input});
      }
      this.getorgCusAll()
    },
    chooseSelect() {
      this.selectVisible = true
      this.getselectAll()
    },
    chooseSys() {
      this.sysVisible = true
      this.getsysAll()
    },
    getselectAll() {
      selectAll(this.query).then(res => {
        this.selectData = res.list// 获取 每页对象
        this.selectTatol = res.total// 获取 总条数
        this.pageSize = res.pageSize// 获取 每页几条
        this.pages = res.pages// 获取 总页数
        // eslint-disable-next-line handle-callback-err
      }).catch(err => { // 报错进这个
        console.log('下拉框表获取失败')
      })
    },
    getsysAll() {
      sysAll(this.params).then(res => {
        this.sysData = res.list
        this.sysTatol = res.total
        this.pageSize = res.pageSize// 获取 每页几条
        this.pages = res.pages// 获取 总页数
        // eslint-disable-next-line handle-callback-err
      }).catch(err => { // 报错进这个
        console.log('系统按钮表获取失败')
      })
    },
    // 翻页
    // handleCurrentChange(i) {
    //   console.log('i: ', i)
    //   this.query.page = i
    //   this.getselectAll()
    // },
    // handleSizeChange(val) {
    //   this.pageSize = val
    //   this.getselectAll()
    //   //  this.table()
    //   console.log(`每页 ${val} 条`)
    // },
    handleCurrentSelChange(val) {
      console.log(this.query)
      this.query.page = val
      this.getselectAll()
    },
    handleCurrentSysChange(val) {
      this.params.page = val
      this.getsysAll()
      // this.table()
    },
    getTT(row) {
      this.selectVisible = false
      this.form.sysIDVal = row.lanIDVal
      this.form.sysID = row.id
    },
    getST(row) {
      this.sysVisible = false
      console.log(row)
      this.form.sysIDVal = row.lanIDVal
      this.form.sysID = row.id
    },

    // 新增
    getorgCusAdd() {
      empCusAdd({ ...this.form, ...this.getValue }).then(res => {
        this.getorgCusAll()
        // eslint-disable-next-line handle-callback-err
      }).catch(err => { // 报错进这个
        console.log('新增失败')
      })
    },
    // 更新
    getorgCusUpdate() {
      console.log('getorgCusUpdate')
      console.log('isEditIndex: ', this.isEditIndex)
      console.log('this.form: ', this.form)
      empCusUpdate({ ...this.form, ...this.getValue }, this.isEditIndex).then(res => {
        console.log('res: ', res)
        this.getorgCusAll()
        // eslint-disable-next-line handle-callback-err
      }).catch(err => { // 报错进这个
        console.log('更新失败')
      })
    },
    // 删除
    del(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        empCusDel(row.id).then(res => {
          this.getorgCusAll()
          // eslint-disable-next-line handle-callback-err
        }).catch(err => { // 报错进这个
          console.log('删除失败')
        })
        //   this.$http.delete(`http://sksigmar.com:81/hrm/unitCus/id/${row.id}`).then(result=>{
        //  this.getorgCusAll()
        // }).catch(err=>{ //报错进这个
        //   console.log('删除失败');
        //     });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      console.log(row)
      console.log(row.id)
    },
    // 获取数据
    getorgCusAll: function() {
      empCusAll().then(res => {
        // console.log('res',res)
        this.tableData = res
        // console.log(this.tableData)
        // 成功进这个
        // eslint-disable-next-line handle-callback-err
      }).catch(err => { // 报错进这个
        console.log('未成功获取数据')
      })
      //   this.$http.get('http://sksigmar.com:81/hrm/unitCus/all').then((response) => {
      //     this.tableData = response.data
      //     console.log(this.tableData)
      // },function(){
      //      console.log('请求失败处理');
      // })
    },

    // 清空弹出层数据
    clearForm() {
      this.form = { // 组织字段信息
        fieldLength: null,
        fieldLengthx: null,
        fieldName: '',
        fieldType: '',
        fpower: '',
        fremark: '',
        ftypeDt: '',
        ftypeDt1: '1',
        isActive: '0',
        isEdit: null,
        isMust: null,
        isRange: null,
        isRead: null,
        lanVal: '',
        maxNumber: null,
        minNumber: null,
        sysID: null,
        radioGroup: '3'
      }
    },
    handleClose() {
      this.$refs['form'].resetFields()
      this.dialogFormVisible = false
      this.clearForm()
      if (this.isEditIndex !== -1) {
        this.clearForm()
      }
      this.isEditIndex = -1
    },
    add() {
      this.dialogFormVisible = true
      this.disabled = false
    },
    setSelectLabel() {
      console.log(this.fieldType)
      for (let i = 10; i < this.fieldType.length; i--) {
        this.fieldType[i].value = this.form.fieldType
        return this.fieldType[i].label
      }
    },
    // 编辑
    update(index, row) {
      console.log(index, row)
      // this.setSelectLabel()
      this.dialogFormVisible = true
      this.form = { ...row }// SE6语法
      this.isEditIndex = row.id
      this.disabled = true
      if (row.isRead === '0') {
        this.radioGroup = '1'
      } else if (row.isMust === '0') {
        this.radioGroup = '2'
      } else {
        this.radioGroup = '3'
      }
      console.log(typeof this.form.fieldType.toString())
      const value = this.form.fieldType.toString()
      this.form.fieldType = value
      // let obj = {};
      // obj = this.arr.find((row) => {
      //   return row.fieldType === value;
      // });
    },
    save(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.isEditIndex !== -1) {
            this.getorgCusUpdate()
            // this.getorgCusAll()
            // this.tableData[this.isEditIndex] = this.form
            this.clearForm()
            this.dialogFormVisible = false
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
            this.isEditIndex = -1
            return
          }
          this.getorgCusAdd()
          this.clearForm()
          this.dialogFormVisible = false
          this.$message({
            message: '添加成功！',
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          this.clearForm()
          return false
        }
      })
    },
    cancel() {
      this.dialogFormVisible = false
      this.clearForm()
      if (this.isEditIndex !== -1) {
        this.clearForm()
      }
      this.isEditIndex = -1
    }
  }
}
</script >

<style>

</style>
