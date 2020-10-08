<template>
  <div>
    <h3 class="title_cont">目录设置{{ checkId }}</h3>
    <div class="set_main">
      <div class="set_main_tree">
        <el-tree
          v-if="loadingTree"
          :props="props"
          :load="loadNode"
          lazy
          @node-click="handleNodeClick"
        />
      </div>
      <div class="set_main_con">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!--基本信息-->
          <el-tab-pane label="基本信息" name="first">
            <el-form
              :model="infoData"
              :rules="rules"
              ref="basicInfo"
              label-width="120px"
            >
              <el-row :span="24">
                <el-col>
                  <div class="form_btn">
                    <el-button type="primary" @click="newInfoForm"
                      >新建</el-button
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

              <!-- <el-row>
                <el-form-item label="上级目录">
                  <el-col :span="23">
                    <el-input v-model="infoData.superId" />
                  </el-col>
                </el-form-item>
              </el-row>-->

              <el-row>
                <el-form-item label="目录编码" style="margin-bottom: 10px">
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
                      @change="handleChange"
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
                <el-form-item label="文件格式要求" style="margin-bottom: 18px">
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
                      <span
                        >要求填写格式，多个格式以,隔开，如：doc,docx,xls等</span
                      >
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
                <el-form-item
                  label="日志是否能查看"
                  style="margin-bottom: 10px"
                >
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
          </el-tab-pane>

          <!--文档编码-->
          <el-tab-pane label="文档编码" name="second">
            <el-form label-width="120px">
              <el-row :span="24">
                <el-col>
                  <div class="form_btn">
                    <el-button type="primary" @click="fileCodeSave"
                      >保存</el-button
                    >
                  </div>
                </el-col>
              </el-row>

              <el-row>
                <el-form-item label="是否启用" style="margin-bottom: 10px">
                  <el-col :span="23">
                    <el-switch v-model="fileCodeData.isEnable" />
                    {{ fileCodeData.isEnable }}
                  </el-col>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="编码前缀" style="margin-bottom: 10px">
                  <el-col :span="23">
                    <el-input v-model="fileCodeData.prefix" />
                  </el-col>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="所有上级前缀" style="margin-bottom: 10px">
                  <el-col :span="23">
                    <el-switch v-model="fileCodeData.isAllActive" />
                  </el-col>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="本目录前缀" style="margin-bottom: 10px">
                  <el-col :span="23">
                    <el-switch v-model="fileCodeData.isSelfActive" />
                  </el-col>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="前缀之间分隔符"
                  style="margin-bottom: 10px"
                >
                  <el-col :span="23">
                    <el-input v-model="fileCodeData.pfSplit" />
                  </el-col>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="年" style="margin-bottom: 10px">
                  <el-col :span="23">
                    <el-switch v-model="fileCodeData.yearFlag" />
                  </el-col>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="月" style="margin-bottom: 10px">
                  <el-col :span="23">
                    <el-switch v-model="fileCodeData.monthFlag" />
                  </el-col>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="日" style="margin-bottom: 10px">
                  <el-col :span="23">
                    <el-switch v-model="fileCodeData.dayFlag" />
                  </el-col>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="流水位数">
                  <el-col :span="23">
                    <el-input
                      v-model.number="fileCodeData.streamNo"
                      oninput="value=value.replace(/[^\d.]/g,'')"
                    />
                  </el-col>
                </el-form-item>
              </el-row>
            </el-form>
          </el-tab-pane>

          <!--下级目录-->
          <el-tab-pane label="下级目录" name="third">
            <el-row :span="24">
              <el-col>
                <div class="form_btn">
                  <el-button type="primary" @click="newChildBtn"
                    >新建</el-button
                  >
                  <el-button>删除</el-button>
                </div>
              </el-col>
            </el-row>
            <el-table
              ref="multipleTable"
              :data="nextCodeData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              4
              <el-table-column prop="lanVal" label="目录名称" />

              <el-table-column prop="fcode" label="目录编码" />

              <el-table-column prop="seqNO" label="顺序" />
            </el-table>
            <el-pagination
              style="clear: both"
              background
              :total="dataTotal"
              layout="prev, pager, next"
              :page-size="10"
              :current-page.sync="currentPage"
              @current-change="handleCurrentChange"
            />

            <!--下级目录-新建弹窗-->
            <el-dialog title="新建下级目录" :visible.sync="dialogFormVisible">
              <el-form label-width="120px">
                <el-row :span="24">
                  <el-col>
                    <div class="form_btn">
                      <el-button type="primary" @click="childrenAdd"
                        >保存</el-button
                      >
                      <el-button @click="closeQxBtn">取消</el-button>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item label="目录名称">
                    <el-col :span="23">
                      <el-input v-model="childrenData.lanVal" />
                    </el-col>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-form-item label="上级目录11">
                    <el-col :span="23">
                      <!-- <el-cascader :props="propsCascader" v-model="childrenData.superId" style="width:100%;"></el-cascader> -->
                      <el-cascader
                        change-on-select
                        :show-all-levels="false"
                        v-model="cascaderValue"
                        :props="propsCascader"
                        style="width: 60%"
                        @change="handleChangeCascader"
                        clearable
                        placeholder="请选择"
                      ></el-cascader>
                      <!--<el-input
                        v-model="childrenData.superId"
                        style="width: 40%"
                      /> -->
                    </el-col>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-form-item label="目录编码" style="margin-bottom: 10px">
                    <el-col :span="23">
                      <el-input v-model="childrenData.fcode" />
                    </el-col>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-form-item
                    label="是否文档同名"
                    style="margin-bottom: 10px"
                  >
                    <el-col :span="23">
                      <el-switch v-model="childrenData.isDup" />
                    </el-col>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-form-item label="顺序" style="margin-bottom: 10px">
                    <el-col :span="23">
                      <el-input-number
                        v-model="childrenData.seqNO"
                        style="width: 50%"
                        controls-position="right"
                        :min="1"
                        :max="10"
                        @change="handleChange"
                      />
                    </el-col>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-form-item label="是否能下载" style="margin-bottom: 10px">
                    <el-col :span="23">
                      <el-switch v-model="childrenData.isDownload" />
                    </el-col>
                  </el-form-item>
                </el-row>

                <el-row :gutter="10">
                  <el-form-item
                    label="文件格式要求"
                    style="margin-bottom: 18px"
                  >
                    <el-col :span="23">
                      <div class="doc_format">
                        <el-radio-group v-model="childrenData.isFormat">
                          <el-radio :label="'0'">无要求</el-radio>
                          <el-radio :label="'1'">要求</el-radio>
                        </el-radio-group>
                      </div>
                      <div
                        v-show="childrenData.isFormat === '1'"
                        class="doc_format"
                      >
                        <el-input
                          v-model="childrenData.formatDesc"
                          class="doc_format_input"
                        />
                        <span
                          >要求填写格式，多个格式以,隔开，如：doc,docx,xls等</span
                        >
                      </div>
                    </el-col>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-form-item
                    label="文件大小要求"
                    style="margin-bottom: 10px"
                  >
                    <el-col :span="23">
                      <el-input
                        v-model.number="childrenData.folderSize"
                        style="width: 50%"
                      >
                        <template slot="append">M</template>
                      </el-input>
                    </el-col>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-form-item
                    label="日志是否能查看"
                    style="margin-bottom: 10px"
                  >
                    <el-col :span="23">
                      <el-switch v-model="childrenData.logJus" />
                    </el-col>
                  </el-form-item>
                </el-row>

                <el-row v-show="childrenData.logJus">
                  <el-form-item label="日志查看范围">
                    <el-col :span="23">
                      <el-col :span="3">
                        <span class="info_label">创建</span>
                        <el-switch v-model="childrenData.createLog" />
                      </el-col>
                      <el-col :span="3">
                        <span class="info_label">修改</span>
                        <el-switch v-model="childrenData.modifyLog" />
                      </el-col>
                      <el-col :span="3">
                        <span class="info_label">查看</span>
                        <el-switch v-model="childrenData.readLog" />
                      </el-col>
                      <el-col :span="3">
                        <span class="info_label">其他</span>
                        <el-switch v-model="childrenData.otherLog" />
                      </el-col>
                    </el-col>
                  </el-form-item>
                </el-row>
              </el-form>
            </el-dialog>
          </el-tab-pane>

          <!--版本管理-->
          <el-tab-pane label="版本管理" name="fourth">
            <el-form label-width="120px">
              <el-row :span="24">
                <el-col>
                  <div class="form_btn">
                    <el-button type="primary" @click="fileVersionSave"
                      >保存</el-button
                    >
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="是否启用版本" style="margin-bottom: 10px">
                  <el-col :span="23">
                    <el-switch v-model="fileVersionData.isEnable" />
                  </el-col>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="版本前缀" style="margin-bottom: 10px">
                  <el-col :span="23">
                    <el-input v-model="fileVersionData.prefix" />
                  </el-col>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="历史是否可见" style="margin-bottom: 10px">
                  <el-col :span="23">
                    <el-switch v-model="fileVersionData.isHistory" />
                  </el-col>
                </el-form-item>
              </el-row>
            </el-form>
          </el-tab-pane>

          <!--权限管理-->
          <el-tab-pane label="权限管理" name="fifth">
            <h4 class="set_tit_back">创建权限</h4>
            <el-row :span="24">
              <el-col>
                <div class="form_btn" style="margin-bottom: 0">
                  <!-- <el-button type="primary" @click="dialogFormVisible0 = true">新建</el-button> -->
                  <el-button type="primary" @click="newPermissionBtn"
                    >新建{{ isEditIndex }}</el-button
                  >
                  <el-button @click="batchDel">删除</el-button>
                </div>
              </el-col>
            </el-row>
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="type" label="类型">
                <template slot-scope="scope">{{
                  scope.row.type | typefilter
                }}</template>
              </el-table-column>
              <el-table-column prop="content" label="内容"></el-table-column>
              <el-table-column prop="safelevel" label="安全级别">
                <template slot-scope="scope"
                  >{{ scope.row.startNo }}-{{ scope.row.endNo }}</template
                >
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="edit(scope.row)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>

            <!--权限管理-新建创建权限弹窗-->
            <el-dialog
              :title="isEditIndex === -1 ? '添加创建权限' : '修改创建权限'"
              :visible.sync="dialogFormVisible0"
              :before-close="closeQx"
            >
              <el-row>
                <el-col :span="24" class="text-right">
                  <el-button type="primary" @click="permissionSave"
                    >保存</el-button
                  >
                  <el-button @click="closeQx">取消</el-button>
                </el-col>
              </el-row>
              <el-form :model="form" label-width="120px">
                <el-form-item label="类型" style="margin-top: 20px">
                  <el-select
                    v-model="filePermissionData.type"
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="内容">
                  <el-input
                    v-model="filePermissionData.content"
                    type="textarea"
                    autocomplete="off"
                  />
                </el-form-item>
                <el-form-item label="安全级别">
                  <el-col :span="4">
                    <el-input
                      v-model.number="filePermissionData.startNo"
                      type="number"
                      autocomplete="off"
                      oninput="value=value.replace(/[^\d.]/g,'')"
                    />
                  </el-col>
                  <el-col :span="2" style="text-align: center">-</el-col>
                  <el-col :span="4">
                    <el-input
                      v-model.number="filePermissionData.endNo"
                      type="number"
                      autocomplete="off"
                      oninput="value=value.replace(/[^\d.]/g,'')"
                    />
                  </el-col>
                </el-form-item>
              </el-form>
            </el-dialog>

            <div class="line" />
            <h4 class="set_tit_back">默认权限</h4>
            <el-row :span="24">
              <el-col>
                <div class="form_btn" style="margin-bottom: 0">
                  <el-button type="primary" @click="newPermissionBtn0"
                    >新建{{ isEditIndex0 }}</el-button
                  >
                  <el-button @click="batchDel0">删除</el-button>
                </div>
              </el-col>
            </el-row>
            <el-table
              ref="multipleTable"
              :data="permissontableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="type" label="类型">
                <template slot-scope="scope">{{
                  scope.row.type | typefilter
                }}</template>
              </el-table-column>
              <el-table-column prop="content" label="内容"></el-table-column>
              <el-table-column prop="safelevel" label="安全级别">
                <template slot-scope="scope"
                  >{{ scope.row.startNo }}-{{ scope.row.endNo }}</template
                >
              </el-table-column>
              <el-table-column prop="typePermission" label="权限类型">
                <template slot-scope="scope">{{
                  scope.row | typereadJus
                }}</template>
              </el-table-column>
              <el-table-column prop="directoryName" label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="edit0(scope.row)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <!--权限管理-新建默认权限弹窗-->
          <el-dialog
            :title="isEditIndex0 === -1 ? '添加默认权限' : '修改默认权限'"
            :visible.sync="dialogFormVisible1"
            :before-close="closeQx0"
          >
            <el-row>
              <el-col :span="24" class="text-right">
                <el-button type="primary" @click="permissionSave0"
                  >保存</el-button
                >
                <el-button @click="closeQx0">取消</el-button>
              </el-col>
            </el-row>
            <el-form :model="form" label-width="120px">
              <el-form-item label="类型" style="margin-top: 15px">
                <el-select
                  v-model="defaultPermissionData.type"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="内容">
                <el-input
                  v-model="defaultPermissionData.content"
                  type="textarea"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item label="安全级别">
                <el-col :span="4">
                  <el-input
                    v-model.number="defaultPermissionData.startNo"
                    autocomplete="off"
                    type="number"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  />
                </el-col>
                <el-col :span="2" style="text-align: center">-</el-col>
                <el-col :span="4">
                  <el-input
                    v-model.number="defaultPermissionData.endNo"
                    autocomplete="off"
                    type="number"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  />
                </el-col>
              </el-form-item>
              <el-form-item label="权限类型">
                <el-row>
                  <el-col :span="6">
                    <span class="info_label">查看</span>
                    <el-switch v-model="defaultPermissionData.readJus" />
                  </el-col>
                  <el-col :span="6">
                    <span class="info_label">修改</span>
                    <el-switch v-model="defaultPermissionData.modifyJus" />
                  </el-col>
                  <el-col :span="6">
                    <span class="info_label">删除</span>
                    <el-switch v-model="defaultPermissionData.allJus" />
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </el-dialog>

          <!--字段管理-->
          <el-tab-pane label="字段管理" name="six">
            <h4 class="set_tit_back">只管理自定义字段</h4>

            <el-table
              ref="multipleTable"
              :data="fileData"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" />
              <el-table-column label="字段名" prop="fileName" />
              <el-table-column label="是否显示" prop="fileFlag" />
              <el-table-column label="顺序" prop="fileOrder" />
              <el-table-column label="自定义名称" prop="fileCustom" />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fileDirectory,
  fileCode,
  fileCodeSettings,
  fileVersion,
  newPermission,
  defaultPermission,
  fileDirectoryUpdata,
  fileVersionSettings,
  newPermissionSettings,
  defaultPermissionSettings,
  fsetTypeUpdata,
  fsetTypeUpdata0,
  fsetTypeDelete,
  fsetTypeDelete0,
  folderName,
  nextCodePaging,
} from "@/api/file";

import { docuFolder } from "@/api/flow";

let id = 0;
let _this = this;

export default {
  data() {
    let validateLanVal = async (rule, v, fn) => {
      console.log(rule, v, fn);
      const res = await this.checkFolderName(v);
      console.log(res.flag, typeof res.flag);
      if (!res.flag) {
        fn(new Error("名字不能重复"));
      } else {
        fn();
      }
    };
    return {
      nextCodefenye: {
        id: 0,
        key: "",
        page: 1,
        rows: 10,
        sortBy: "seqNO",
      },
      query: {
        desc: true,
        key: "",
        page: 1,
        rows: 10,

        sortBy: "seqNO",
      },
      dataTotal: 0,
      currentPage: 1,
      cascaderValue: [],
      isEditIndex: -1, //编辑或者修改
      isEditIndex0: -1,
      checkId: -1, // 选中的id -1没有选中    // checkId是书目录选中的id
      tableData: [], //创建权限数据
      permissontableData: [], //默认权限数据
      nextCodeData: [], //下级目录数据
      propsCascader: {
        lazy: true,
        lazyLoad(node, resolve) {
          console.log("node: ", node);
          const { level } = node;
          console.log("level: ", level);
          setTimeout(async () => {
            // const nodes = Array.from({ length: level + 1 })
            // .map(item => ({
            // value: ++id,
            // label: `选项${id}`,
            // leaf: level >= 2
            // }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            const res = await docuFolder(node.value || 0);
            res.forEach((item) => {
              item.label = item.lanVal;
              item.value = item.id;
            });

            return resolve(res);

            // resolve(nodes);
          }, 1000);
        },
      },
      loadingTree: true,
      props: {
        label: "lanVal",
      },
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
      rules: {
        lanVal: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur",
          },
          {
            validator: validateLanVal,
            trigger: "blur",
          },
        ],
      },
      childrenData: {
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
      fileCodeData: {
        // 文档编码数据
        id: null,
        fid: this.checkId, // 文件基本信息的id
        isEnable: "0", // 是否启用编码前缀 1 启用 0 不启用
        prefix: "", // 编码前缀
        isAllActive: "0", // 所有上级前缀 1:选中 0: 未选中
        isSelfActive: "0", // 本目录前缀 1:选中 0: 未选中
        pfSplit: "", // 前缀之间分隔符
        yearFlag: "0", //	年 1:选中 0: 未选中
        dayFlag: "0", // 日 1:选中 0: 未选中
        monthFlag: "0", // 月 1:选中 0: 未选中
        streamNo: 0, //	流水号位数
      },

      fileVersionData: {
        // 版本管理数据
        fid: this.checkId, //	文件基本信息的id
        isEnable: "0", //	是否启用编码前缀 1 启用 0 不启用
        isHistory: "0", // 历史是否可见 1:选中 0:取消
        prefix: "", // 版本前缀
      },

      filePermissionData: {
        // 权限管理数据
        fid: this.checkId, //	文件目录id
        type: 1, // 1:人员,2:组织单元,3:角色,4:权限
        content: "", // 内容
        startNo: "", // 起始安全级别,截止安全级别必须大于起始安全级别
        endNo: "", // 截止安全级别,截止安全级别必须大于起始安全级别
      },

      defaultPermissionData: {
        //默认权限数据
        fid: this.checkId,
        type: 1,
        content: "", //内容
        startNo: "", // 起始安全级别,截止安全级别必须大于起始安全级别
        endNo: "", // 截止安全级别,截止安全级别必须大于起始安全级别
        readJus: "", //查看权限 1:选中 0:未选中
        modifyJus: "", //修改权限 1:选中 0:未选中
        allJus: "", //	删除权限 1:选中 0:未选中
      },

      options: [
        {
          // 权限管理类型
          value: "1",
          label: "人员",
        },
        {
          value: "2",
          label: "组织",
        },
        {
          value: "3",
          label: "角色",
        },
        {
          value: "4",
          label: "权限",
        },
      ],
      value: "",
      form: {
        name: "",
        date1: "",
        date2: "",
      },
      dialogFormVisible: false, // 下级目录弹窗属性
      dialogFormVisible0: false, // 创建权限弹窗属性
      dialogFormVisible1: false, // 默认权限弹窗属性
      fileData: [
        {
          fileName: "ahah",
          fileFlag: "是",
          fileOrder: "22",
          fileCustom: "aabb",
        },
      ],
      // tableData: [{
      //     directoryName: "制度文件",
      //     directoryCode: "abc",
      //     directoryOrder: "1"
      // }],
      multipleSelection: [],
      checkList: [],
      checked: false,
      name: "",
      resource: "是",
      num: "1",
      activeName: "first",
    };
  },
  // created() {
  //   this.activeName = "fifth";
  // },
  filters: {
    typefilter(val) {
      let type = "";
      switch (val) {
        case 1:
          type = "人员";
          break;
        case 2:
          type = "组织";
          break;
        case 3:
          type = "角色";
          break;
        case 4:
          type = "权限";
          break;
      }
      return type;
    },
    typereadJus(row) {
      let type = "";
      if (row.readJus === "1") {
        type += "查看 ";
      }
      if (row.allJus === "1") {
        type += "删除 ";
      }
      if (row.modifyJus === "1") {
        type += "修改 ";
      }

      return type;
    },
  },

  methods: {
    //翻页
    handleCurrentChange(i) {
      console.log("i: ", i);
      this.nextCodefenye.page = i;
      this.getTypePaging(this.nextCodefenye, this.checkId);
    },
    handleChangeCascader(e) {
      console.log("e.length: ", e.length);
      this.childrenData.superId = e[e.length - 1];
    },
    // 校验名字是否存在
    async checkFolderName(lanVal) {
      console.log("checkFolderName - lanVal: ", lanVal);
      // return;
      const data = {
        lanVal,
        superId: this.checkSuperId,
        id: this.checkId === "-1" ? null : this.checkId,
      };
      console.log("data: ", data);
      return await folderName(data);
    },
    // 下级目录-保存
    childrenAdd() {
      if (!this.childrenData.lanVal) {
        this.$message({
          message: "目录名称不能为空",
          type: "warning",
        });
        return;
      }

      if (!this.childrenData.fcode) {
        this.$message({
          message: "目录编码不能为空",
          type: "warning",
        });
        return;
      }
      if (!this.childrenData.formatDesc && this.childrenData.isFormat === "1") {
        this.$message({
          message: "文件格式要求不能为空",
          type: "warning",
        });
        return;
      }

      this.$message({
        message: "保存成功！",
        type: "success",
      });

      this.getFileDirectory(this.childrenData);
      this.dialogFormVisible = false;
    },

    //下级目录 新建按钮
    newChildBtn() {
      if (this.checkId > 0) {
        this.dialogFormVisible = true;
      } else {
        this.$message({
          message: "要新建目录设置-基本信息！",
          type: "error",
        });
      }
    },
    //下级目录 取消按钮
    closeQxBtn() {
      this.dialogFormVisible = false;
      this.clearChildrenData();
    },

    // 新增 基本信息接口
    getFileDirectory(mlData) {
      this.loadingTree = false;
      const data = {
        creater: mlData.creater,
        fcode: mlData.fcode,
        folderSize: mlData.folderSize,
        formatDesc: mlData.formatDesc,
        isActive: mlData.isActive,
        isDownload: mlData.isDownload ? "1" : "0",
        isDup: mlData.isDup ? "1" : "0",
        isFormat: mlData.isFormat,
        lanVal: mlData.lanVal,
        logJus: mlData.logJus ? "1" : "0",
        createLog: !mlData.logJus ? null : mlData.createLog ? "1" : "0",
        modifyLog: !mlData.logJus ? null : mlData.modifyLog ? "1" : "0",
        otherLog: !mlData.logJus ? null : mlData.otherLog ? "1" : "0",
        readLog: !mlData.logJus ? null : mlData.readLog ? "1" : "0",
        seqNO: mlData.seqNO,
        superId: mlData.superId,
      };
      console.log("dddddddddd", data);
      fileDirectory(data).then((res) => {
        console.log("fileDirectory: ", res);
        this.dataTotal = res.total;

        this.loadingTree = true;
        this.loadNode();
      });
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

    // 清空flowinfo数据
    clearChildrenData() {
      this.childrenData = {
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

    ddd() {
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
        this.loadNode();
        console.log("fileDirectoryUpdata: ", res);
      });
    },

    // 基本信息-保存
    infoSave() {
      if (this.checkId > 0) {
        // 掉编辑的接口
        this.ddd();

        this.$message({
          message: "编辑成功！",
          type: "success",
        });
      } else {
        if (!this.infoData.lanVal) {
          this.$message({
            message: "目录名称不能为空",
            type: "warning",
          });
          return;
        }

        if (!this.infoData.fcode) {
          this.$message({
            message: "目录编码不能为空",
            type: "warning",
          });
          return;
        }

        if (!this.infoData.formatDesc && this.infoData.isFormat === "1") {
          this.$message({
            message: "文件格式要求不能为空",
            type: "warning",
          });
          return;
        }

        this.getFileDirectory(this.infoData); //

        this.$message({
          message: "保存成功！",
          type: "success",
        });
      }
    },

    // 新增 文档编码接口
    getdocuFolder0(fid) {
      const data = {
        ...this.fileCodeData,
        id: this.fileCodeData.id,
        fid: this.checkId, // 文件基本信息的id
        isEnable: this.fileCodeData.isEnable ? "1" : "0", // 是否启用编码前缀 1 启用 0 不启用
        prefix: this.fileCodeData.prefix, // 编码前缀
        isAllActive: this.fileCodeData.isAllActive ? "1" : "0", // 所有上级前缀 1:选中 0: 未选中
        isSelfActive: this.fileCodeData.isSelfActive ? "1" : "0", // 本目录前缀 1:选中 0: 未选中
        pfSplit: this.fileCodeData.pfSplit, // 前缀之间分隔符
        yearFlag: this.fileCodeData.yearFlag ? "1" : "0", //	年 1:选中 0: 未选中
        dayFlag: this.fileCodeData.dayFlag ? "1" : "0", // 日 1:选中 0: 未选中
        monthFlag: this.fileCodeData.monthFlag ? "1" : "0", // 月 1:选中 0: 未选中
        streamNo: this.fileCodeData.streamNo, //	流水号位数
      };
      console.log("data: ", data);
      fileCode(data).then((res) => {
        console.log("getdocuFolder0 - res: ", res);

        this.loadingTree = true;
        this.loadNode();
      });
    },

    // 根据文档目录id查询文档编码设置
    queryfileCodeSettings(id) {
      fileCodeSettings(this.checkId).then((res) => {
        console.log("fileCodeSettings-这里就是文档编码里的数据: ", res);
        // 在这里吧res里面相应的属性值付给每个表单的全局变量里
        this.fileCodeData.id = res.id;
        this.fileCodeData.isEnable = res.isEnable === "1" ? true : false;
        this.fileCodeData.prefix = res.prefix; // 编码前缀
        this.fileCodeData.isAllActive = res.isAllActive === "1" ? true : false;
        this.fileCodeData.isSelfActive =
          res.isSelfActive === "1" ? true : false;
        this.fileCodeData.pfSplit = res.pfSplit; // 前缀之间分隔符
        this.fileCodeData.yearFlag = res.yearFlag === "1" ? true : false;
        this.fileCodeData.dayFlag = res.dayFlag === "1" ? true : false;
        this.fileCodeData.monthFlag = res.monthFlag === "1" ? true : false;
        this.fileCodeData.streamNo = res.streamNo;
      });
    },

    fileCodeSave() {
      //文档编码保存按钮

      if (this.checkId > 0) {
        if (!this.fileCodeData.prefix) {
          this.$message({
            message: "编码前缀不能为空",
            type: "warning",
          });
          return;
        }

        if (!this.fileCodeData.pfSplit) {
          this.$message({
            message: "前缀之间分隔符不能为空",
            type: "warning",
          });
          return;
        }
        if (this.fileCodeData.streamNo < 0) {
          this.$message({
            message: "流水位不能为负数",
            type: "warning",
          });
          return;
        }

        this.$message({
          message: "文档编码保存成功！",
          type: "success",
        });
      } else {
        this.$message({
          message: "要新建目录设置-基本信息！",
          type: "error",
        });
      }
      this.getdocuFolder0();
    },

    // 新增 文件版本管理接口
    getFileVersion(fid) {
      const data = {
        id: this.fileVersionData.id,
        fid: this.checkId, //	文件基本信息的id
        isEnable: this.fileVersionData.isEnable ? "1" : "0", //	是否启用编码前缀 1 启用 0 不启用
        prefix: this.fileVersionData.prefix, // 版本前缀
        isHistory: this.fileVersionData.isHistory ? "1" : "0", // 历史是否可见 1:选中 0:取消
      };
      fileVersion(data).then((res) => {
        console.log("fileVersion", res);
        this.loadingTree = true;
        this.loadNode();
      });
    },

    //根据fid查询目录版本信息
    queryfileVersionSettings(id) {
      fileVersionSettings(this.checkId).then((res) => {
        console.log("fileVersionSettings-这里就是版本管理里的数据: ", res);
        this.fileVersionData.id = res.id;
        this.fileVersionData.isEnable = res.isEnable === "1" ? true : false;
        this.fileVersionData.isHistory = res.isHistory === "1" ? true : false;
        this.fileVersionData.prefix = res.prefix;
      });
    },

    //根据fid查询权限管理信息
    querynewPermissionSettings(id) {
      newPermissionSettings(this.checkId).then((res) => {
        console.log("newPermissionSettings-这里就是权限管理里的数据: ", res);
        this.filePermissionData.id = res.id;
        this.filePermissionData.type = res.type;
        this.filePermissionData.content = res.content;
        this.filePermissionData.startNo = res.startNo;
        this.filePermissionData.endNo = res.endNo;
        this.tableData = res;
      });
    },

    //根据目录fid查询默认权限
    querydefaultPermissionSettings(id) {
      defaultPermissionSettings(this.checkId).then((res) => {
        console.log("defaultPermissionSettings-这里就是默认权限的数据: ", res);
        this.defaultPermissionData.id = res.id;
        this.defaultPermissionData.type = res.type;
        this.defaultPermissionData.content = res.content;
        this.defaultPermissionData.startNo = res.startNo;
        this.defaultPermissionData.endNo = res.endNo;
        this.defaultPermissionData.readJus = res.readJus === "1" ? true : false;
        this.defaultPermissionData.modifyJus =
          res.modifyJus === "1" ? true : false;
        this.defaultPermissionData.allJus = res.allJus === "1" ? true : false;
        this.permissontableData = res;
        console.log("permissontableData: ", this.permissontableData);
      });
    },

    // 版本管理-保存
    fileVersionSave() {
      if (this.checkId > 0) {
        if (!this.fileVersionData.prefix) {
          this.$message({
            message: "版本前缀不能为空",
            type: "warning",
          });
          return;
        }
        this.$message({
          message: "版本管理保存成功！",
          type: "success",
        });
        this.getFileVersion();
      } else {
        this.$message({
          message: "要新建目录设置-基本信息！",
          type: "error",
        });
      }
    },

    /*权限管理*/
    // 新增 权限管理接口
    getFilePermission(fid) {
      alert("getDefaultPermission?");
      const data = {
        fid: this.checkId, //	文件目录id
        type: this.filePermissionData.type, // 1:人员,2:组织单元,3:角色,4:权限
        content: this.filePermissionData.content, // 内容
        startNo: this.filePermissionData.startNo, // 起始安全级别,截止安全级别必须大于起始安全级别
        endNo: this.filePermissionData.endNo, // 截止安全级别,截止安全级别必须大于起始安全级别
      };
      newPermission(data).then((res) => {
        console.log("newPermission", res);
        // 重新获取table信息
        this.querynewPermissionSettings();
        this.loadingTree = true;
        this.loadNode();
      });
    },
    // 清空FilePermission数据
    clearFilePermission() {
      this.filePermissionData = {
        // 流转类型信息
        type: "",
        content: "",
        startNo: "",
        endNo: "",
      };
    },

    // 清空FilePermission数据
    clearDefaultPermission() {
      this.defaultPermissionData = {
        // 流转类型信息
        type: "",
        content: "",
        startNo: "",
        endNo: "",
        readJus: false,
        modifyJus: false,
        allJus: false,
      };
    },

    //新建 --创建权限
    newPermissionBtn() {
      if (this.checkId > 0) {
        this.isEditIndex = -1;
        this.dialogFormVisible0 = true;
      } else {
        this.$message({
          message: "要新建目录设置-基本信息！",
          type: "error",
        });
      }
    },

    // 修改 --创建权限
    getFsetTypeUpdata() {
      const { type, content, endNo, startNo } = this.filePermissionData;
      if (parseFloat(type).toString() == "NaN") {
        console.log("type: ", type);
        const typeArr = ["", "人员", "组织", "角色", "权限"];
        typeArr.forEach((e, i) => {
          if (e === type) {
            this.$set(this.filePermissionData, "type", i);
            this.$set(this.filePermissionData, "content", content);
            this.$set(this.filePermissionData, "endNo", endNo);
            this.$set(this.filePermissionData, "startNo", startNo);
          }
        });
      }
      console.log("this.filePermissionData: ", this.filePermissionData);
      fsetTypeUpdata(this.filePermissionData, this.isEditIndex).then((res) => {
        console.log("res: ", res);
        // 重新获取table信息querynewPermissionSettings
        this.querynewPermissionSettings();
      });
    },
    // 批量删除 --创建权限
    batchDel() {
      const arr = [];
      this.multipleSelection.forEach((el) => {
        console.log("el: ", el);
        arr.push(el.id);
      });
      fsetTypeDelete(arr).then((res) => {
        console.log("res: ", res);
        // this.getTypePaging()
        this.querynewPermissionSettings();

        this.$message({
          message: "删除成功！",
          type: "success",
        });
      });
    },

    //添加  --创建权限
    permissionSave() {
      alert("getDefaultPermission-添加");
      if (this.isEditIndex !== -1) {
        this.getFsetTypeUpdata();
        this.clearFilePermission();
        this.dialogFormVisible0 = false;
        this.$message({
          message: "修改成功！",
          type: "success",
        });
        this.isEditIndex = -1;
        return;
      } else {
        if (!this.filePermissionData.startNo) {
          this.$message({
            message: "起始安全级别不能为空",
            type: "warning",
          });
          return;
        }
        if (this.filePermissionData.startNo < 0) {
          this.$message({
            message: "起始安全级别不能为负数",
            type: "warning",
          });
          return;
        }

        if (!this.filePermissionData.endNo) {
          this.$message({
            message: "截止安全级别不能为空",
            type: "warning",
          });
          return;
        }

        if (this.filePermissionData.startNo >= this.filePermissionData.endNo) {
          this.$message({
            message: "截止安全级别要大于起始安全级别",
            type: "warning",
          });
          return;
        }
        if (this.filePermissionData.endNo < 0) {
          this.$message({
            message: "截止安全级别不能为负数",
            type: "warning",
          });
          return;
        }
        //this.tableData.push(this.filePermissionData);
        this.dialogFormVisible0 = false;
        this.getFilePermission();
        this.clearFilePermission();

        this.$message({
          message: "添加成功！",
          type: "success",
        });
      }
    },

    // 编辑 --创建权限
    edit(row) {
      console.log("row: ", row);
      const row1 = JSON.parse(JSON.stringify(row));
      this.filePermissionData = row1;
      const type = ["", "人员", "组织", "角色", "权限"];
      this.$set(this.filePermissionData, "type", type[row1.type]);
      this.isEditIndex = row1.id;
      this.dialogFormVisible0 = true;
    },

    closeQx() {
      this.dialogFormVisible0 = false;
      this.clearFilePermission();
    },
    //新增 默认权限 接口

    getDefaultPermission(fid) {
      alert("getDefaultPermission-默认权限");
      const data = {
        // id: this.defaultPermissionData.id,
        fid: this.checkId, //	文件目录id
        type: this.defaultPermissionData.type, // 1:人员,2:组织单元,3:角色,4:权限
        content: this.defaultPermissionData.content, // 内容
        startNo: this.defaultPermissionData.startNo, // 起始安全级别,截止安全级别必须大于起始安全级别
        endNo: this.defaultPermissionData.endNo, // 截止安全级别,截止安全级别必须大于起始安全级别
        readJus: this.defaultPermissionData.readJus ? "1" : "0",
        modifyJus: this.defaultPermissionData.modifyJus ? "1" : "0",
        allJus: this.defaultPermissionData.allJus ? "1" : "0",
      };
      console.log("dddkwkwkwkwk", data);
      defaultPermission(data).then((res) => {
        console.log("defaultPermission", res);

        // 重新获取table信息
        this.querydefaultPermissionSettings();

        this.loadingTree = true;
        this.loadNode();
      });
    },

    //新建 默认权限
    newPermissionBtn0() {
      if (this.checkId > 0) {
        this.isEditIndex0 = -1;
        this.dialogFormVisible1 = true;
      } else {
        this.$message({
          message: "要新建目录设置-基本信息！",
          type: "error",
        });
      }
    },

    // 修改 默认权限
    getFsetTypeUpdata0() {
      const { type, content, endNo, startNo } = this.defaultPermissionData;
      let defaultPermissionDataType = 0;
      if (parseFloat(type).toString() == "NaN") {
        console.log("type: ", type);
        const typeArr = ["", "人员", "组织", "角色", "权限"];
        typeArr.forEach((e, i) => {
          if (e === type) {
            defaultPermissionDataType = i;
          }
        });
      } else {
        defaultPermissionDataType = type;
      }
      const data = {
        // id: this.defaultPermissionData.id,
        fid: this.checkId, //	文件目录id
        type: defaultPermissionDataType, // 1:人员,2:组织单元,3:角色,4:权限
        content: this.defaultPermissionData.content, // 内容
        startNo: this.defaultPermissionData.startNo, // 起始安全级别,截止安全级别必须大于起始安全级别
        endNo: this.defaultPermissionData.endNo, // 截止安全级别,截止安全级别必须大于起始安全级别
        readJus: this.defaultPermissionData.readJus ? "1" : "0",
        modifyJus: this.defaultPermissionData.modifyJus ? "1" : "0",
        allJus: this.defaultPermissionData.allJus ? "1" : "0",
      };

      fsetTypeUpdata0(data, this.isEditIndex0).then((res) => {
        console.log("res: ", res);
        this.querydefaultPermissionSettings();
      });
    },

    // 批量删除 --默认权限
    batchDel0() {
      const arr = [];
      this.multipleSelection.forEach((el) => {
        console.log("el: ", el);
        arr.push(el.id);
      });
      fsetTypeDelete0(arr).then((res) => {
        console.log("res: ", res);
        // this.getTypePaging()
        this.querydefaultPermissionSettings();

        this.$message({
          message: "删除成功！",
          type: "success",
        });
      });
    },

    //添加  --默认权限
    permissionSave0() {
      alert("getDefaultPermission-添加");

      if (this.isEditIndex0 !== -1) {
        this.getFsetTypeUpdata0();
        this.clearDefaultPermission();
        this.dialogFormVisible1 = false;
        this.$message({
          message: "修改成功！",
          type: "success",
        });
        this.isEditIndex0 = -1;
        return;
      } else {
        if (!this.defaultPermissionData.startNo) {
          this.$message({
            message: "起始安全级别不能为空",
            type: "warning",
          });
          return;
        }
        if (!this.defaultPermissionData.endNo) {
          this.$message({
            message: "截止安全级别不能为空",
            type: "warning",
          });
          return;
        }

        if (this.defaultPermissionData.startNo < 0) {
          this.$message({
            message: "起始安全级别不能为负数",
            type: "warning",
          });
          return;
        }
        if (this.defaultPermissionData.startNo < 0) {
          this.$message({
            message: "起始安全级别不能为负数",
            type: "warning",
          });
          return;
        }
        if (
          this.defaultPermissionData.startNo >= this.defaultPermissionData.endNo
        ) {
          this.$message({
            message: "截止安全级别要大于起始安全级别",
            type: "warning",
          });
          return;
        }
        //this.tableData.push(this.filePermissionData);
        this.dialogFormVisible1 = false;
        this.getDefaultPermission();
        this.clearDefaultPermission();

        this.$message({
          message: "添加成功！",
          type: "success",
        });
      }
    },

    // 编辑 --默认权限
    edit0(row) {
      console.log("row: ", row);
      const row1 = JSON.parse(JSON.stringify(row));
      this.defaultPermissionData = row1;
      const type = ["", "人员", "组织", "角色", "权限"];
      this.$set(this.defaultPermissionData, "type", type[row1.type]);

      // modifyJus
      // readJus
      // allJus
      if (row.allJus === "1") {
        this.$set(this.defaultPermissionData, "allJus", true);
      } else if (row.allJus === "0") {
        this.$set(this.defaultPermissionData, "allJus", false);
      }
      if (row.readJus === "1") {
        this.$set(this.defaultPermissionData, "readJus", true);
      } else if (row.readJus === "0") {
        this.$set(this.defaultPermissionData, "readJus", false);
      }
      if (row.modifyJus === "1") {
        this.$set(this.defaultPermissionData, "modifyJus", true);
      } else if (row.modifyJus === "0") {
        this.$set(this.defaultPermissionData, "modifyJus", false);
      }
      this.isEditIndex0 = row.id;
      this.dialogFormVisible1 = true;
    },

    closeQx0() {
      this.dialogFormVisible1 = false;
      this.clearDefaultPermission();
    },
    /* 树形接口方法*/

    getDocuFolder(id) {
      return docuFolder(id);
    },
    async loadNode(node, resolve) {
      if (node) {
        if (node.level === 0) {
          const res = await this.getDocuFolder(0);
          return resolve(res);
        } else if (node.level > 0) {
          const resChild = await this.getDocuFolder(node.data.id);
          resolve(resChild);
        }
      }
      // if (node.level > 1) {
      //   const resChild = await this.getDocuFolder(node.data.id)
      //   return resolve(resChild)
      // };
    },

    // 获取下级目录数据
    getTypePaging(data, id) {
      nextCodePaging(data, id).then((res) => {
        console.log("ddddddddddddddd0925", data.id);
        this.dataTotal = res.total;
        this.nextCodeData = res.list;
      });
    },

    // 点击树目录所触发的方法
    handleNodeClick(data) {
      console.log("handleNodeClick - data: ", data);
      this.checkId = data.id; //吧树节点选中的id付给checkId
      // checkId是书目录选中的id
      this.activeName = "first";

      console.log("2222activeName", this.activeName);

      if (this.activeName === "second") {
        this.queryfileCodeSettings();
      }

      if (this.activeName === "fourth") {
        this.queryfileVersionSettings();
      }

      if (this.activeName === "third") {
        console.log("这里是显示third内容");
      }

      if (this.activeName === "fifth") {
        this.querynewPermissionSettings();
        this.querydefaultPermissionSettings();
      }

      if (data.isDup === "1") {
        this.$set(this.infoData, "isDup", true);
      } else if (data.isDup === "0") {
        this.$set(this.infoData, "isDup", false);
      }

      if (data.isDownload === "1") {
        this.$set(this.infoData, "isDownload", true);
      } else if (data.isDownload === "0") {
        // alert('data.isDownload')
        this.$set(this.infoData, "isDownload", false);
        // alert(this.infoData.isDownload)
      }

      if (data.logJus === "1") {
        this.$set(this.infoData, "logJus", true);
      } else if (data.logJus === "0") {
        this.$set(this.infoData, "logJus", false);
      }

      if (data.createLog === "1") {
        this.$set(this.infoData, "createLog", true);
      } else if (data.createLog === "0") {
        this.$set(this.infoData, "createLog", false);
      }

      if (data.modifyLog === "1") {
        this.$set(this.infoData, "modifyLog", true);
      } else if (data.modifyLog === "0") {
        this.$set(this.infoData, "modifyLog", false);
      }

      if (data.readLog === "1") {
        this.$set(this.infoData, "readLog", true);
      } else if (data.readLog === "0") {
        this.$set(this.infoData, "readLog", false);
      }

      if (data.otherLog === "1") {
        this.$set(this.infoData, "otherLog", true);
      } else if (data.otherLog === "0") {
        this.$set(this.infoData, "otherLog", false);
      }

      console.log("lanVal", data.lanVal);

      this.$set(this.infoData, "lanVal", data.lanVal);
      this.$set(this.infoData, "fcode", data.fcode);
      this.$set(this.infoData, "seqNO", data.seqNO);
      this.$set(this.infoData, "isFormat", data.isFormat);
      this.$set(this.infoData, "formatDesc", data.formatDesc);
      this.$set(this.infoData, "folderSize", data.folderSize);

      console.log("this.infoData: ", this.infoData);
    },

    newInfoForm() {
      this.checkId = -1;
      this.clearFlowInfo();
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleClick(tab, event) {
      //标签切换事件
      console.log("activeName", this.activeName);
      if (this.activeName === "second" && this.checkId !== -1) {
        this.queryfileCodeSettings();
      }

      if (this.activeName === "third" && this.checkId !== -1) {
        //alert(this.checkId)

        this.getTypePaging(this.nextCodefenye, this.checkId);
      }

      if (this.activeName === "fourth" && this.checkId !== -1) {
        this.queryfileVersionSettings();
      }

      if (this.activeName === "fifth" && this.checkId !== -1) {
        this.querynewPermissionSettings();
        this.querydefaultPermissionSettings();
      }
    },

    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>
.el-tree__empty-text {
  position: static;
  border: 1px red solid;
}

.form_btn {
  text-align: right;
  margin-bottom: 20px;
  padding-right: 4%;
}

.doc_format {
  float: left;
}

.doc_format_input {
  width: 31%;
  margin-left: 20px;
}

.doc_format span {
  font-size: 10px;
  color: #999;
  padding-left: 20px;
}
</style>
