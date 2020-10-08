<template>
  <div class="basic-info">
    <el-form
      :model="infoData"
      :rules="infoRules"
      ref="basicInfoRef"
      label-width="120px"
    >
      <el-row :span="24">
        <el-col>
          <div class="form_btn">
            <el-button type="primary" @click="newInfoForm"
              >{{ checkId }}新建</el-button
            >
            <el-button type="primary" @click="infoSave">保存</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="目录名称" prop="lanVal">
          <el-col :span="23">
            <el-input v-model="infoData.lanVal" />
          </el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="目录编码" style="margin-bottom: 10px" prop="fcode">
          <el-col :span="23">
            <el-input v-model="infoData.fcode" />
          </el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="是否文档同名" style="margin-bottom: 10px">
          <el-col :span="23">
            <el-switch v-model="infoData.isDup" />
          </el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="顺序" style="margin-bottom: 10px">
          <el-col :span="23">
            <el-input-number
              v-model="infoData.seqNO"
              style="width: 35%"
              controls-position="right"
              :min="1"
              :max="10"
            />
          </el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="是否能下载" style="margin-bottom: 10px">
          <el-col :span="23">
            <el-switch v-model="infoData.isDownload" />
          </el-col>
        </el-form-item>
      </el-row>

      <el-row :gutter="10">
        <el-form-item
          label="文件格式要求"
          style="margin-bottom: 18px"
          prop="isFormat"
        >
          <el-col :span="23">
            <div class="doc_format">
              <el-radio-group v-model="infoData.isFormat">
                <el-radio :label="'0'">无要求</el-radio>
                <el-radio :label="'1'">要求</el-radio>
              </el-radio-group>
            </div>
            <div v-show="infoData.isFormat === '1'" class="doc_format">
              <el-input
                v-model="infoData.formatDesc"
                class="doc_format_input"
              />
              <span>要求填写格式，多个格式以,隔开，如：doc,docx,xls等</span>
            </div>
          </el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="文件大小要求" style="margin-bottom: 10px">
          <el-col :span="23">
            <el-input
              v-model.number="infoData.folderSize"
              style="width: 35%"
              oninput="value=value.replace(/[^\d.]/g,'')"
            >
              <template slot="append">M</template>
            </el-input>
          </el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="日志是否能查看" style="margin-bottom: 10px">
          <el-col :span="23">
            <el-switch v-model="infoData.logJus" />
          </el-col>
        </el-form-item>
      </el-row>

      <el-row v-show="infoData.logJus">
        <el-form-item label="日志查看范围">
          <el-col :span="23">
            <el-col :span="3">
              <span class="info_label">创建</span>
              <el-switch v-model="infoData.createLog" />
            </el-col>
            <el-col :span="3">
              <span class="info_label">修改</span>
              <el-switch v-model="infoData.modifyLog" />
            </el-col>
            <el-col :span="3">
              <span class="info_label">查看</span>
              <el-switch v-model="infoData.readLog" />
            </el-col>
            <el-col :span="3">
              <span class="info_label">其他</span>
              <el-switch v-model="infoData.otherLog" />
            </el-col>
          </el-col>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  fileDirectoryUpdata
} from "@/api/file";
export default {
  props: {
    infoPropsData: {
      type: Object,
      default() {
        return {};
      },
    },
    propsCheckId: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      checkId: -1,
      infoData: {
        // 基本新息数据
        creater: 1,
        lanVal: "", // 目录名称(必填)
        superId: 0, // 上级目录id(必填)如果没有上级,传0
        fcode: "", // 目录编码(必填)
        isDup: false, // 是否文档同名
        seqNO: 1, // 顺序
        isDownload: false, // 是否能下载 1选中0未选中(必填)
        isFormat: "0", // s'd'x'c创建时文件是否有格式要求 1选中0未选中(必填)
        formatDesc: "", // formatDesc isFormat为 1 时必填,多个格式以,隔开，如：doc,docx,xls等
        folderSize: 0, // 目录下文件大小范围
        isActive: "0", // 激活状态 0 启用 1失效
        logJus: "0", // 日志是否能查看(必填),不能查看,日志查看范围(创建,修改,查看,其他)可以不传
        createLog: null, // 日志查看范围创建,logJus为1时，必填
        modifyLog: null, // 日志查看范围修改,logJus为1时，必填
        readLog: null, // 日志查看范围查看,logJus为1时，必填
        otherLog: null, // 日志查看范围其他,logJus为1时，必填
      },
      //基本信息验证规则
      infoRules: {
        //验证目录名称是否合法
        lanVal: [
          { required: true, message: "请输入目录名称", trigger: "blur" },
        ],
        //验证目录编码是否合法
        fcode: [{ required: true, message: "请输入目录编码", trigger: "blur" }],
      },
    };
  },
  created() {
    this.setInfoData(this.infoPropsData);
  },
  methods: {
    setInfoData(data) {
      this.infoData = data;
    },
    // 新建基本信息
    newInfoForm() {
      this.checkId = -1;
      this.clearFlowInfo();
    },
    // 基本信息-保存
    infoSave() {
      console.log("this.$parent: ", this.$parent);
      if (this.checkId > 0) {
        // 掉编辑的接口
        this.updataFileDirectory();
        this.$message({
          message: "编辑成功！",
          type: "success",
        });
      } else {
        alert("新增");
        this.$refs.basicInfoRef.validate((valid) => {
          //console.log(valid)
          if (!valid) return;
        });

        if (!this.infoData.formatDesc && this.infoData.isFormat === "1") {
          this.$message({
            message: "文件格式要求不能为空",
            type: "warning",
          });
          return;
        }
        this.$emit("getFileDirectory", this.infoData);

        this.$message({
          message: "保存成功！",
          type: "success",
        });
      }
    },
    // 清空flowinfo数据
    clearFlowInfo() {
      this.infoData = {
        // 流转类型信息
        // 基本新息数据
        creater: 1,
        lanVal: "", // 目录名称(必填)
        superId: 0, // 上级目录id(必填)如果没有上级,传0
        fcode: "", // 目录编码(必填)
        isDup: false, // 是否文档同名
        seqNO: 1, // 顺序
        isDownload: false, // 是否能下载 1选中0未选中(必填)
        isFormat: "0", // 创建时文件是否有格式要求 1选中0未选中(必填)
        formatDesc: "", // formatDesc isFormat为 1 时必填,多个格式以,隔开，如：doc,docx,xls等
        folderSize: 0, // 目录下文件大小范围
        isActive: "0", // 激活状态 0 启用 1失效
        logJus: false, // 日志是否能查看(必填),不能查看,日志查看范围(创建,修改,查看,其他)可以不传
        createLog: null, // 日志查看范围创建,logJus为1时，必填
        modifyLog: null, // 日志查看范围修改,logJus为1时，必填
        readLog: null, // 日志查看范围查看,logJus为1时，必填
        otherLog: null, // 日志查看范围其他,logJus为1时，必填
      };
    },
    // 更新文件目录-基本信息接口
    updataFileDirectory() {
      this.loadingTree = false;
      const data = {
        ...this.infoData,
        // modifyLog: this.infoData.modifyLog ? '1' : '0',
        // readLog: this.infoData.readLog ? '1' : '0',
        isDownload: this.infoData.isDownload ? "1" : "0",
        isDup: this.infoData.isDup ? "1" : "0",
        isFormat: this.infoData.isFormat,
        lanVal: this.infoData.lanVal,
        logJus: this.infoData.logJus ? "1" : "0",
        // otherLog: this.infoData.otherLog ? '1' : '0',
        createLog: !this.infoData.logJus
          ? null
          : this.infoData.createLog
          ? "1"
          : "0",
        modifyLog: !this.infoData.logJus
          ? null
          : this.infoData.modifyLog
          ? "1"
          : "0",
        otherLog: !this.infoData.logJus
          ? null
          : this.infoData.otherLog
          ? "1"
          : "0",
        readLog: !this.infoData.logJus
          ? null
          : this.infoData.readLog
          ? "1"
          : "0",
      };
      fileDirectoryUpdata(data, this.checkId).then((res) => {
        this.loadingTree = true;        
        this.$emit("freshenLoadNode");
        console.log("fileDirectoryUpdata: ", res);
      });
    },
  },
  watch: {
    propsCheckId(v, o) {
      console.log("checkid: ", v, o);
      this.checkId = v
    },
    infoPropsData(o, v) {
      console.log("o: ", o);
      console.log("v: ", v);
    },
  },
};
</script>

<style>
</style>