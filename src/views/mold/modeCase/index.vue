<template>
  <div class="app-container">
    <h3 class="title_cont">流转列表</h3>
    <div class="content_toplayout">
      <div class="search_content fl">
        <el-button type="primary" icon="el-icon-search" @click="searchlanID" />
        <input
          v-model.trim="pagingSearchKey"
          type="text"
          class="search_content_input fl"
          placeholder="请输入关键字"
          @keyup.enter="searchlanID"
        >
      </div>
      <div class="button fr">
        <el-button type="primary" icon="el-icon-minus" @click="addCaseOpen">添加</el-button>
        <el-button type="primary" icon="el-icon-plus">禁用</el-button>
      </div>
    </div>

    <div class="table_box">
      <el-table
        ref="multipleTable"
        :data="typeData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column prop="lanIDVal" label="名称" />
        <el-table-column prop="typeIDVal" label="类型" />
        <el-table-column prop="tableIDVal" label="表结构" />
        <el-table-column prop="seqNo" label="显示顺序" />
        <el-table-column prop="creater" label="创建人" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row.id)" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="block" style="text-align:center">
      <!-- <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>-->
      <el-pagination
        background
        :current-page="page"
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog title="添加实例" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
      <el-form ref="modeCaseInfoAdd" label-width="140px" :model="tableforData" status-icon>
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="名称">
              <el-input v-model="tableforData.lanIDVal" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="表结构">
              <el-input
                v-model="tableforData.createIDVal"
                placeholder="请输入内容"
                class="input-with-select"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="所属类型">
              <el-input
                v-model="tableforData.typeIDVal"
                placeholder="请输入内容"
                class="input-with-select"
              >
                <el-button slot="prepend" @click="aaa">选择表结构</el-button>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="显示界面">
              <el-input placeholder="请输入名称" suffix-icon="el-icon-search" />

              <!-- <el-input v-model="tableforData.readIDVal" autocomplete="off"></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="新建界面">
              <el-input placeholder="请输入名称" suffix-icon="el-icon-search" />
              <!-- <el-input v-model="tableforData.createIDVal" autocomplete="off"></el-input> -->
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="编辑界面">
              <el-input placeholder="请输入名称" suffix-icon="el-icon-search" />
              <!-- <el-input v-model="tableforData.editIDVal" autocomplete="off"></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="附件上传目录">
              <el-input autocomplete="off" readonly />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="创建人">
              <el-input v-model="tableforData.createrVal" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="允许修改权限">
              <el-checkbox>默认权限</el-checkbox>
              <el-checkbox>自定义权限</el-checkbox>
              <!-- <el-input v-model="tableforData.editCusVal" /> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="显示顺序">
              <el-input-number
                v-model="tableforData.seqNo"
                controls-position="right"
                style="width:100%"
                :min="0"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="描述" style="margin-bottom:5px">
              <el-input v-model="tableforData.remark" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog
      title="实例查询"
      :visible.sync="dialogVisibleforExample"
      width="80%"
      :before-close="dialogBeforeCloseforExample"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 基本 -->
        <el-tab-pane label="基本" name="first">
          <el-form ref="modeCaseInfoAdd" label-width="140px" status-icon>
            <el-row :gutter="20">
              <el-col :span="23">
                <div class="form_btn">
                  <el-button type="primary">保存</el-button>
                  <el-button>取消</el-button>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="名称">
                  <el-input v-model="input" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label="表结构">
                  <el-input
                    v-model="input"
                    placeholder="请输入内容"
                    class="input-with-select"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="所属类型">
                  <el-input
                    v-model="input"
                    placeholder="请输入内容"
                    class="input-with-select"
                  >
                    <el-button slot="prepend" @click="aaa">选择表结构</el-button>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="13">
                <el-form-item label="显示界面">
                  <el-input placeholder="请输入名称" suffix-icon="el-icon-search" />

                  <!-- <el-input v-model="tableforData.readIDVal" autocomplete="off"></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="新建界面">
                  <el-input placeholder="请输入名称" suffix-icon="el-icon-search" />
                  <!-- <el-input v-model="tableforData.createIDVal" autocomplete="off"></el-input> -->
                </el-form-item>
              </el-col>

              <el-col :span="13">
                <el-form-item label="编辑界面">
                  <el-input placeholder="请输入名称" suffix-icon="el-icon-search" />
                  <!-- <el-input v-model="tableforData.editIDVal" autocomplete="off"></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="附件上传目录">
                  <el-input autocomplete="off" readonly />
                </el-form-item>
              </el-col>

              <el-col :span="13">
                <el-form-item label="创建人">
                  <el-input v-model="tableforData.createrVal" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="允许修改权限">
                  <el-checkbox>默认权限</el-checkbox>
                  <el-checkbox>自定义权限</el-checkbox>
                  <!-- <el-input v-model="tableforData.editCusVal" /> -->
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="23">
                <el-form-item label="显示顺序">
                  <el-input-number
                    v-model="tableforData.seqNo"
                    controls-position="right"
                    style="width:100%"
                    :min="0"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="23">
                <el-form-item label="描述" style="margin-bottom:5px">
                  <el-input v-model="tableforData.remark" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>

        <!-- 界面 -->
        <el-tab-pane label="界面" name="second">
          <div class="content_toplayout">
            <div class="search_content fl">
              <el-button type="primary" icon="el-icon-search" @click="searchlanID" />
              <input
                v-model.trim="pagingSearchKey"
                type="text"
                class="search_content_input fl"
                placeholder="请输入关键字"
                @keyup.enter="searchlanID"
              >
            </div>
            <div class="button fr">
              <el-button type="primary" icon="el-icon-plus">删除</el-button>
            </div>
          </div>

          <div class="table_box">
            <el-table
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />

              <el-table-column prop="input" label="界面名称" />
              <el-table-column prop="input" label="界面类型" />
              <el-table-column prop="input" label="是否默认界面" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row.id)" />
                </template>
              </el-table-column>
            </el-table>
            <div class="block" style="text-align:center">
              <el-pagination
                background
                :current-page="page"
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </el-tab-pane>

        <!-- 权限 -->
        <el-tab-pane label="权限" name="third">
          <el-form label-width="140px" status-icon>
            <el-row :gutter="20">
              <el-col :span="23">
                <div class="form_btn">
                  <el-button type="primary">添加</el-button>
                  <el-button>删除</el-button>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="23">
                <div>
                  <span>创建权限</span>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24" style="padding:10px 0">
                <hr>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="23">
                <div class="form_btn">
                  <el-button type="primary">添加</el-button>
                  <el-button>删除</el-button>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="23">
                <div>
                  <span>默认权限</span>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>

        <!-- 默认值 -->
        <el-tab-pane label="默认值" name="fourth">
          <el-form label-width="100px" status-icon>
            <el-row :gutter="20">
              <el-col :span="23">
                <div class="form_btn">
                  <el-button type="primary">保存</el-button>
                  <el-button>取消</el-button>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="所属类型">
                  <el-input v-model="input" placeholder="请输入内容" class="input-with-select">
                    <el-button slot="prepend">选择表结构</el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3" style="text-align: center">=</el-col>
              <el-col :span="10">
                <el-form-item>
                  <el-input v-model="input" placeholder="请输入内容" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="23">
                <div style="padding:10px 0">
                  <hr>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="23">
                <div class="form_btn">
                  <el-button type="primary">删除</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>

        <!-- 页面自定义 -->
        <el-tab-pane label="页面自定义" name="fifth">
          <div class="content_toplayout">
            <div class="search_content fl">
              <el-button type="primary" icon="el-icon-search" @click="searchlanID" />
              <input
                v-model.trim="pagingSearchKey"
                type="text"
                class="search_content_input fl"
                placeholder="请输入关键字"
                @keyup.enter="searchlanID"
              >
            </div>
            <div class="button fr">
              <el-button type="primary" icon="el-icon-plus">添加</el-button>
              <el-button type="primary" icon="el-icon-plus">删除</el-button>
            </div>
          </div>

          <div class="table_box">
            <el-table
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />

              <el-table-column prop="input" label="自定义名称" />
              <el-table-column prop="input" label="自定义类型" />
              <el-table-column prop="input" label="自定义用途" />
              <el-table-column prop="input" label="显示样式" />
              <el-table-column prop="input" label="链接目标" />
              <el-table-column prop="input" label="链接目标地址" />
              <el-table-column prop="input" label="是否显示" />
              <el-table-column prop="input" label="显示顺序" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row.id)" />
                </template>
              </el-table-column>
            </el-table>
            <div class="block" style="text-align:center">
              <el-pagination
                background
                :current-page="page"
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </el-tab-pane>

        <!-- 编码 -->
        <el-tab-pane label="编码" name="sixth">
          <el-form label-width="140px">
            <el-row :gutter="20">
              <el-col :span="23">
                <div class="form_btn">
                  <el-button type="primary">保存</el-button>
                  <el-button>取消</el-button>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="是否启用">
                  <el-checkbox />
                </el-form-item>
              </el-col>

              <el-col :span="13">
                <el-form-item label="起始编号">
                  <el-input placeholder="请输入名称" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="编码字段">
                  <el-input
                    v-model="tableforData.typeIDVal"
                    placeholder="请输入内容"
                    class="input-with-select"
                  >
                    <el-button slot="prepend">选择表结构</el-button>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="13">
                <el-form-item label="编码前缀">
                  <el-input placeholder="请输入名称" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="流水位数">
                  <el-input placeholder="请输入名称" />
                </el-form-item>
              </el-col>

              <el-col :span="13">
                <el-form-item>
                  <el-checkbox>年</el-checkbox>
                  <el-checkbox>月</el-checkbox>
                  <el-checkbox>日</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>

        <!-- 值联动 -->
        <el-tab-pane label="值联动" name="seventh">
          <div class="button fr">
            <el-button type="primary" icon="el-icon-plus">新增</el-button>
            <el-button type="primary" icon="el-icon-plus">删除</el-button>
          </div>

          <div class="table_box">
            <el-table
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />

              <el-table-column prop="input" label="序号" />
              <el-table-column prop="input" label="触发条件" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row.id)" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <!-- 值联动扩展 -->
        <el-tab-pane label="值联动扩展" name="eighth">
          <div class="button fr">
            <el-button type="primary" icon="el-icon-plus">新增</el-button>
            <el-button type="primary" icon="el-icon-plus">删除</el-button>
          </div>

          <div class="table_box">
            <el-table
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />

              <el-table-column prop="input" label="序号" />
              <el-table-column prop="input" label="触发字段" />
              <el-table-column prop="input" label="触发条件" />
              <el-table-column prop="input" label="触发效果" />
              <el-table-column prop="input" label="备注条件" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row.id)" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <!-- 明细汇总 -->
        <el-tab-pane label="明细汇总" name="ninth">
          <div class="button fr">
            <el-button type="primary" icon="el-icon-plus">新增</el-button>
            <el-button type="primary" icon="el-icon-plus">删除</el-button>
          </div>

          <div class="table_box">
            <el-table
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />

              <el-table-column prop="input" label="序号" />
              <el-table-column prop="input" label="明细字段" />
              <el-table-column prop="input" label="主表字段" />
              <el-table-column prop="input" label="计算方式" />
              <el-table-column prop="input" label="条件" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row.id)" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <!-- 值计算 -->
        <el-tab-pane label="值计算" name="tenth">
          <div class="button fr">
            <el-button type="primary" icon="el-icon-plus">新增</el-button>
            <el-button type="primary" icon="el-icon-plus">删除</el-button>
          </div>

          <div class="table_box">
            <el-table
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />

              <el-table-column prop="input" label="序号" />
              <el-table-column prop="input" label="计算类型" />
              <el-table-column prop="input" label="计算字段" />
              <el-table-column prop="input" label="计算方式" />
              <el-table-column prop="input" label="计算方式" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row.id)" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <!-- 树形 -->
        <el-tab-pane label="树形" name="eleventh">
          <div class="content_toplayout">
            <div class="search_content fl">
              <el-button type="primary" icon="el-icon-search" @click="searchlanID" />
              <input
                v-model.trim="pagingSearchKey"
                type="text"
                class="search_content_input fl"
                placeholder="请输入关键字"
                @keyup.enter="searchlanID"
              >
            </div>
            <div class="button fr">
              <el-button type="primary" icon="el-icon-minus">添加</el-button>
              <el-button type="primary" icon="el-icon-plus">删除</el-button>
            </div>
          </div>

          <div class="table_box">
            <el-table
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />

              <el-table-column prop="input" label="树名称" />
              <el-table-column prop="input" label="跟节点名称" />
              <el-table-column prop="input" label="显示样式" />
              <el-table-column label="操作">
                <template slot-scope>
                  <el-button type="primary" icon="el-icon-edit" circle />
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="block" style="text-align:center">
            <el-pagination
              background
              :current-page="page"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-tab-pane>

        <!-- 系统按钮 -->
        <el-tab-pane label="系统按钮" name="twelfth">
          <div class="content_toplayout">
            <div class="search_content fl">
              <el-button type="primary" icon="el-icon-search" @click="searchlanID" />
              <input
                v-model.trim="pagingSearchKey"
                type="text"
                class="search_content_input fl"
                placeholder="请输入关键字"
                @keyup.enter="searchlanID"
              >
            </div>
            <div class="button fr">
              <el-button type="primary" icon="el-icon-minus">添加</el-button>
              <el-button type="primary" icon="el-icon-plus">删除</el-button>
            </div>
          </div>

          <div class="table_box">
            <el-table
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />

              <el-table-column prop="input" label="自定义标识" />
              <el-table-column prop="input" label="表结构名称" />
              <el-table-column prop="input" label="按钮名称" />
              <el-table-column label="操作">
                <template slot-scope>
                  <el-button type="primary" icon="el-icon-edit" circle />
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="block" style="text-align:center">
            <el-pagination
              background
              :current-page="page"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-tab-pane>

        <!-- 查询 -->
        <el-tab-pane label="查询" name="thirteenth">
          <div class="content_toplayout">
            <div class="search_content fl">
              <el-button type="primary" icon="el-icon-search" @click="searchlanID" />
              <input
                v-model.trim="pagingSearchKey"
                type="text"
                class="search_content_input fl"
                placeholder="请输入关键字"
                @keyup.enter="searchlanID"
              >
            </div>
            <div class="button fr">
              <el-button type="primary" icon="el-icon-minus">添加</el-button>
              <el-button type="primary" icon="el-icon-plus">删除</el-button>
            </div>
          </div>

          <div class="table_box">
            <el-table
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />

              <el-table-column prop="input" label="名称" />
              <el-table-column prop="input" label="所属表" />
              <el-table-column prop="input" label="排序" />
              <el-table-column label="操作">
                <template slot-scope>
                  <el-button type="primary" icon="el-icon-edit" circle />
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="block" style="text-align:center">
            <el-pagination
              background
              :current-page="page"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!-- 类型添加 -->
    <el-dialog
      title="类型添加"
      :visible.sync="dialogVisible1"
      width="80%"
      :before-close="dialogBeforeClose"
    >
      <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="input" label="序号" />
        <el-table-column prop="input" label="类型" />
        <el-table-column prop="input" label="排列" />
      </el-table>
    </el-dialog>

    <!-- 添加自定义界面 -->
    <el-dialog
      title="添加自定义界面"
      :visible.sync="dialogVisible2"
      width="80%"
      :before-close="dialogBeforeClose"
    >
      <el-form label-width="140px">
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="姓名">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="自定义类型">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="自定义用途">
              <el-select v-model="input" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in input"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="显示样式">
              <el-select v-model="input" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in input"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="链接目标">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="链接地址">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="是否显示">
              <el-select v-model="input" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in input"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="显示顺序">
              <el-select v-model="input" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in input"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 选择字段 -->
    <el-dialog
      title="选择字段"
      :visible.sync="dialogVisible3"
      width="80%"
      :before-close="dialogBeforeClose"
    >
      <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号" />
        <el-table-column label="表名" />
        <el-table-column label="字段名" />
      </el-table>
    </el-dialog>

    <!-- 值联动添加 -->
    <el-dialog
      title="值联动添加"
      :visible.sync="dialogVisible4"
      width="80%"
      :before-close="dialogBeforeClose"
    >
      <el-form label-width="140px">
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="触发字段">
              <el-input v-model="input">
                <el-button slot="prepend" @click="aaa">选择触发字段</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="SQL">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div>
              <hr>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="text-align:center">
              <span style="font-size:24px">关联配置</span>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-table
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column label="表单字段" />
              <el-table-column label="填写字段 " />
              <el-table-column label="转换SQL  " />
            </el-table>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="padding-top:5px">
              <hr>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="text-align:center">
              <span style="font-size:24px">带出值配置</span>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-table
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column label="表单字段" />
              <el-table-column label="填写字段 " />
              <el-table-column label="转换SQL  " />
            </el-table>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 值联动扩展 -->
    <el-dialog
      title="值联动扩展"
      :visible.sync="dialogVisible5"
      width="80%"
      :before-close="dialogBeforeClose"
    >
      <el-form label-width="140px">
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="触发字段">
              <el-input v-model="input">
                <el-button slot="prepend" @click="aaa">选择触发字段</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="触发条件">
              <el-input v-model="input" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="选择被触发字段">
              <el-input v-model="input">
                <el-button slot="prepend" @click="aaa">选择触发字段</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="触发效果">
              <el-select v-model="input" placeholder="请选择">
                <el-option
                  v-for="item in input"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="触发条件" style="margin-bottom:5px">
              <el-input v-model="input" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 添加明细汇总 -->
    <el-dialog
      title="添加明细汇总"
      :visible.sync="dialogVisible6"
      width="80%"
      :before-close="dialogBeforeClose"
    >
      <el-form label-width="140px">
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="明细字段">
              <el-input v-model="input">
                <el-button slot="prepend" @click="aaa">选择明细字段</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="主表字段">
              <el-input v-model="input">
                <el-button slot="prepend" @click="aaa">选择主表字段</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="计算方式">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="条件">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="备注说明">
              <el-input v-model="input" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 添加值计算 -->
    <el-dialog
      title="添加值计算"
      :visible.sync=" dialogVisible7"
      width="80%"
      :before-close="dialogBeforeClose"
    >
      <el-form label-width="140px">
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="计算类型">
              <el-select v-model="input" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in input"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="计算字段">
              <el-input v-model="input">
                <el-button slot="prepend" @click="aaa">选择计算字段</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="计算方式">
              <el-select v-model="input" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in input"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="计算公式">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="备注说明">
              <el-input v-model="input" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 树形添加 -->
    <el-dialog
      title="添加明细汇总"
      :visible.sync="dialogVisible8"
      width="80%"
      :before-close="dialogBeforeClose"
    >
      <el-form label-width="140px">
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="树形名称">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>

          <el-col :span="13 ">
            <el-form-item label="根节点名称">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="树形名称">
              <el-radio v-model="input" label="1">导航树</el-radio>
              <el-radio v-model="input" label="2">树形浏览看</el-radio>
            </el-form-item>
          </el-col>

          <el-col :span="13 ">
            <el-form-item label="根节点坐标">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="根节点链接">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="展开一级节点">
              <el-checkbox v-model="input" />
            </el-form-item>
          </el-col>

          <el-col :span="13 ">
            <el-form-item label="刷新左侧树">
              <el-checkbox v-model="input" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="快速搜索">
              <el-checkbox v-model="input" />
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="刷新左侧树">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="根节点链接">
              <el-input v-model="input" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary">添加</el-button>
              <el-button>删除</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-table
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column label="名称" />
              <el-table-column label="描述 " />
              <el-table-column label="数据来源  " />
              <el-table-column label="数据来源名称  " />
              <el-table-column label="表名" />
              <el-table-column label="链接目标来源 " />
              <el-table-column label="链接目标  " />
              <el-table-column label="链接目标地址" />
              <el-table-column label="显示顺序 " />
            </el-table>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog
      title="系统按钮维护"
      :visible.sync="dialogVisible9"
      width="80%"
      :before-close="dialogBeforeClose"
    >
      <el-form label-width="140px">
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="自定义标识">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="表结构名称">
              <el-input v-model="input" readonly />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="按钮名称">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="查询">
              <el-input v-model="input" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog
      title="系统按钮维护"
      :visible.sync="dialogVisible10"
      width="80%"
      :before-close="dialogBeforeClose"
    >
      <el-tabs @tab-click="handleClick">
        <el-tab-pane label="基础" name="first">
          <el-form label-width="140px">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="自定义标识">
                  <el-input v-model="input" />
                </el-form-item>
              </el-col>

              <el-col :span="13">
                <el-form-item label="表结构名称">
                  <el-input v-model="input" readonly />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="按钮名称">
                  <el-input v-model="input" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="23">
                <el-form-item label="查询">
                  <el-input v-model="input" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="字段定义" name="second">
          <el-row :gutter="20">
            <el-col :span="23">
              <div class="form_btn">
                <el-button type="primary">保存</el-button>
                <el-button>取消</el-button>
              </div>
            </el-col>
          </el-row>

          <el-table
            ref="multipleTable"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="数据库字段名" />
            <el-table-column label="名称" />
            <el-table-column label="显示" />
            <el-table-column label="查询" />
            <el-table-column label="唯一显示" />
            <el-table-column label="显示顺序" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog
      title="系统按钮维护"
      :visible.sync="dialogVisible11"
      width="80%"
      :before-close="dialogBeforeClose"
    >
      <el-form label-width="140px">
        <el-row :gutter="20">
          <el-col :span="23">
            <div class="form_btn">
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="名称">
              <el-input v-model="input" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="表结构名称">
              <el-input v-model="input" readonly />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="显示顺序">
              <el-input-number v-model="input" controls-position="right" style="width:100%" :min="0" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="查询">
              <el-input v-model="input" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog
      title="查询维护"
      :visible.sync="dialogVisible12"
      width="80%"
      :before-close="dialogBeforeClose"
    >
      <el-tabs @tab-click="handleClick">
        <el-tab-pane label="基础" name="first">
          <el-form label-width="140px">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="名称">
                  <el-input v-model="input" />
                </el-form-item>
              </el-col>

              <el-col :span="13">
                <el-form-item label="表结构名称">
                  <el-input v-model="input" readonly />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="23">
                <el-form-item label="显示顺序">
                  <el-input-number v-model="input" controls-position="right" style="width:100%" :min="0" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="23">
                <el-form-item label="查询条件">
                  <el-input v-model="input" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="字段定义" name="second">
          <el-row :gutter="20">
            <el-col :span="23">
              <div class="form_btn">
                <el-button type="primary">保存</el-button>
                <el-button>取消</el-button>
              </div>
            </el-col>
          </el-row>

          <el-table
            ref="multipleTable"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="数据库字段名" />
            <el-table-column label="字段名" />
            <el-table-column label="展示" />
            <el-table-column label="查询条件" />
            <el-table-column label="链接URL" />
            <el-table-column label="排序" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      dialogVisible1: false, // 所属类型弹框
      dialogVisible2: false, //  添加自定义界面
      dialogVisible3: false, //  选择字段
      dialogVisible4: false, // 值联动添加
      dialogVisible5: false, // 类型添加
      dialogVisible6: false, // 添加明细汇总
      dialogVisible7: false, // 添加值计算
      dialogVisible8: false, // 树形添加
      dialogVisible9: false, // 系统按钮维护添加
      dialogVisible10: false, // 系统按钮维护编辑
      dialogVisible11: false, // 查询维护添加
      dialogVisible12: false, // 查询维护编辑

      input: '', // 测试
      pagingSearchKey: '', // 查询
      dialogVisible: false, // 弹框的显示
      dialogVisibleforExample: false, // 编辑弹框

      selectTableid: '',
      pageSize: 10, // 一页几条数据
      pages: 0, // 每页总页数
      page: 1, //	当前页数
      total: 0, // 总条数
      typeData: [],
      tableforData: {
        createDate: '',
        createID: 0,
        createIDVal: '',
        createTime: '',
        creater: 0,
        createrVal: '',
        editCus: 0,
        editCusVal: '',
        editID: 0,
        editIDVal: '',
        editSys: 0,
        editSysVal: '',
        id: 0,
        isActive: '',
        lanID: 0,
        lanIDVal: '',
        readID: 0,
        readIDVal: '',
        remark: '',
        seqNo: 0,
        tableID: 0,
        tableIDVal: '',
        typeID: 0,
        typeIDVal: ''
      },
      multipleSelection: [],
      activeName: 'first'
    }
  },
  created() {
    this.tableData() // 显示展示主页面
  },
  methods: {
    tableData: async function() {
      this.$axios({
        method: 'get',
        url: 'http://sksigmar.com:81/mode/mode/selModeByPage',
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
    handleSelectionChange(val) {
      // 表头复选框按钮
      this.multipleSelection = val
    },
    // 查询
    searchlanID() {
      this.page = 1
      this.tableData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.tableData()
    },
    // 分页事件
    handleCurrentChange(val) {
      this.page = val
      this.tableData()
    },
    handleClose() {
      this.dialogVisible = false
    },
    addCaseOpen() {
      this.dialogVisible = true
    },
    edit() {
      this.dialogVisibleforExample = true
    },
    dialogBeforeCloseforExample() {
      this.dialogVisibleforExample = false
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    dialogBeforeClose() {},
    aaa() {
      this.dialogVisible1 = true
    }
  }
}
</script>
<style >
</style>
