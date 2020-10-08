<template>
  <div>
    <h3 class="title_cont">文件目录{{ checkFileIdStr }}</h3>
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
        <el-row>
          <el-col :span="24" style="text-align: right">
            <el-button type="primary" @click="shareBtn">共享</el-button>
          </el-col>
          <el-col :span="24">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" />
              <el-table-column prop="fileName" label="文件名">
                <template slot-scope="scope">
                  <el-link type="primary" @click="showDetails(scope.row)">{{
                    scope.row.fileName
                  }}</el-link>
                </template>
              </el-table-column>
              <el-table-column prop="fileCode" label="文件编码" />
              <el-table-column prop="fidName" label="文件目录" />
              <el-table-column prop="creatorName" label="创建人" />
              <el-table-column prop="createTime" label="创建时间" />
              <el-table-column prop="modifyTime" label="最新修改时间" />
              <el-table-column prop="versionType" label="文件版本数" />
            </el-table>
          </el-col>
          <el-col>
            <el-pagination
              style="clear: both"
              background
              :total="dataTotal"
              layout="prev, pager, next"
              :page-size="10"
              :current-page.sync="currentPage"
              @current-change="handleCurrentChange"
            />
          </el-col>
        </el-row>
      </div>
    </div>
    <!--文件详情弹窗 开始-->
    <el-dialog title="文件详情" :visible.sync="dialogdocVisible">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        style="width: 100%"
      >
        <el-tab-pane label="文件信息" name="first">
          <ul class="docdetails">
            <li><span>文件标题：</span>{{ flowInfo.fileName }}</li>
            <li><span>文件编码：</span>{{ flowInfo.fileCode }}</li>
            <li><span>所属目录：</span>{{ flowInfo.fidName }}</li>
            <li><span>文件版本：</span>{{ flowInfo.versionNumber }}</li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="内容" name="second">
          <el-row>
            <el-col :span="24">
              <el-link>
                <i class="el-icon-download"></i>{{ flowInfo.fileName }}
              </el-link>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!--文件详情弹窗 结束-->

    <!--共享弹窗 开始-->
    <el-dialog
      title="共享"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-row style="margin-top: 10px; margin-right: 30px; text-align: right">
        <el-col :span="24">
          <el-button type="primary" @click="docPermissionSave"
            >保存{{ shareData.type }}</el-button
          >
          <el-button @click="docPermissionClose"
            >取消{{ shareData.type }}</el-button
          >
        </el-col>
      </el-row>
      <el-form :model="form" style="margin-right: 30px; margin-top: 20px">
        <el-form-item label="共享范围" label-width="120px">
          <el-select
            v-model="shareData.type"
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

        <el-form-item
          label="共享内容"
          label-width="120px"
          v-if="shareData.type !== '1'"
        >
          <div v-if="shareData.type === '2'">
            <el-button @click="selectOrg">选择部门</el-button>
            <div v-if="multipleSelectionOrg.length">
              <el-tag
                v-for="tag in multipleSelectionOrg"
                :key="tag.id"
                :type="tag.type"
              >
                {{ tag.name }}
              </el-tag>
            </div>
          </div>
          <div v-if="shareData.type === '3'">
            <el-button @click="selectMen">选择人员</el-button>
            <div v-if="multipleSelectionMen.length">
              <el-tag
                v-for="tag in multipleSelectionMen"
                :key="tag.id"
                :type="tag.type"
              >
                {{ tag.name }}
              </el-tag>
            </div>
          </div>
          <div v-if="shareData.type === '4'">
            <el-button @click="selectRole">选择角色</el-button>
            <div v-if="multipleSelectionRole.length">
              <el-tag
                v-for="tag in multipleSelectionRole"
                :key="tag.id"
                :type="tag.type"
              >
                {{ tag.lanVal }}
              </el-tag>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="安全级别" label-width="120px">
          <el-col :span="4">
            <el-input
              v-model.number="shareData.startNo"
              autocomplete="off"
              type="number"
              oninput="value=value.replace(/[^\d.]/g,'')"
              :min="0"
            />
          </el-col>
          <el-col :span="2" style="text-align: center">-</el-col>
          <el-col :span="4">
            <el-input
              v-model.number="shareData.endNo"
              autocomplete="off"
              type="number"
              oninput="value=value.replace(/[^\d.]/g,'')"
              :min="0"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="权限类型" label-width="120px">
          <el-row>
            <el-col :span="6">
              <span class="info_label">查看</span>
              <el-switch v-model="shareData.readJus" />
            </el-col>
            <el-col :span="6">
              <span class="info_label">修改</span>
              <el-switch v-model="shareData.modifyJus" />
            </el-col>
            <el-col :span="6">
              <span class="info_label">删除</span>
              <el-switch v-model="shareData.allJus" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--共享弹窗 结束-->

    <!--选择部门 开始-->
    <el-dialog
      title="选择部门"
      :visible.sync="dialogOrgVisible"
      :close-on-click-modal="false"
    >
      <el-row>
        <el-col :span="24" class="text-right">
          <!-- <el-button type="primary" @click="dialogOrgVisible = false">确认</el-button> -->
          <el-button type="primary" @click="Orgconfim">确认</el-button>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData1"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChangeOrg"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="code" label="编号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">{{
            scope.row.type === "0" ? "公司" : "正常"
          }}</template>
        </el-table-column>
        <el-table-column prop="supName" label="父级组织" />
        <el-table-column prop="seqNo" label="排序" />
      </el-table>

      <el-pagination
        background
        :total="dataTotal1"
        layout="prev, pager, next"
        :page-size="10"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChangeOrg"
      />
    </el-dialog>
    <!--选择部门 结束-->

    <!--选择人员 开始-->
    <el-dialog
      title="选择人员"
      :visible.sync="dialogMenVisible"
      :close-on-click-modal="false"
    >
      <el-row>
        <el-col :span="24" class="text-right">
          <el-button type="primary" @click="Menconfim">确认</el-button>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData2"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChangeMen"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="编号" prop="id" width="60px"> </el-table-column>
        <el-table-column label="姓名" prop="name"> </el-table-column>
        <el-table-column label="所属组织单元" prop="department">
        </el-table-column>
        <el-table-column label="性别" prop="gender">
          <template slot-scope="scope">
            {{ scope.row.gender === "1" ? "女" : "男" }}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="statusName"> </el-table-column>
        <el-table-column label="直接上级" prop="preEmp"> </el-table-column>
        <el-table-column label="岗位" prop="job"> </el-table-column>
        <el-table-column label="安全级别" prop="secuLevel"> </el-table-column>
        <el-table-column label="显示顺序" prop="seqno"> </el-table-column>
      </el-table>

      <el-pagination
        background
        :total="dataTotal2"
        layout="prev, pager, next"
        :page-size="10"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChangeMen"
      />
    </el-dialog>
    <!--选择人员 结束-->

    <!--选择角色 开始-->
    <el-dialog
      title="选择人员"
      :visible.sync="dialogRoleVisible"
      :close-on-click-modal="false"
    >
      <el-row>
        <el-col :span="24" class="text-right">
          <el-button type="primary" @click="Roleconfim">确认</el-button>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChangeRole"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="roleCode" label="角色组编码">
          <template slot-scope="scope">{{ scope.row.roleCode }}</template>
        </el-table-column>
        <el-table-column prop="lanVal" label="名称"></el-table-column>
        <el-table-column prop="remark	" label="备注">
          <template slot-scope="scope">{{ scope.row.remark }}</template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        :total="dataTotal3"
        layout="prev, pager, next"
        :page-size="10"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChangeRole"
      />
    </el-dialog>
    <!--选择角色 结束-->
  </div>
</template>

<script>
import { docuFolder } from "@/api/flow";
import {
  typePaging,
  orgPage,
  menPage,
  rolePage,
  addDocPermission,
} from "@/api/file";

export default {
  data() {
    return {
      checkRoleIdStr: "",
      checkMenIdStr: "",
      checkOrgIdStr: "",
      checkFileIdStr: "",
      multipleSelectionOrg: [], // 复选部门
      multipleSelectionMen: [], // 复选人员
      multipleSelectionRole: [], // 复选角色
      //选择部门数据
      queryOrg: {
        key: "",
        page: 1,
        rows: 10,
        sortBy: "seqNo",
        desc: false,
      },
      //选择人员数据
      queryMen: {
        id: -1,
        key: "",
        page: 1,
        rows: 10,
        sortBy: "seqNo",
        desc: false,
      },
      //选择角色数据
      queryRole: {
        key: "",
        page: 1,
        rows: 10,
        sortBy: "seqNo",
        desc: false,
      },
      shareData: {
        allJus: "0", //	删除权限
        content: "", //内容
        endNo: 1, //结束级别 截止安全级别,截止安全级别必须大于起始安全级别
        fileId: 0, //文件id
        modifyJus: "0", //修改权限
        readJus: "1", //读权限
        startNo: 0, //开始级别 起始安全级别,截止安全级别必须大于起始安全级别
        type: "1", //类型 1.全部,2.部门,3.人员,4.角色
      },
      dialogFormVisible: false, //共享弹窗 fasle or true
      dialogOrgVisible: false, //选择部门弹窗
      dialogMenVisible: false, //选择人员弹窗
      dialogRoleVisible: false, //选择角色弹窗

      options: [
        {
          // 权限管理类型
          value: "1",
          label: "全部",
        },
        {
          value: "2",
          label: "部门",
        },
        {
          value: "3",
          label: "人员",
        },
        {
          value: "4",
          label: "角色",
        },
      ],

      form: {
        name: "",
      },
      /*文件详情全局定义*/
      dialogdocVisible: false,
      activeName: "first",
      flowInfo: {
        fileName: "",
        fileCode: "",
        fidName: "",
        versionNumber: "",
      },
      dataTotal: 0,
      dataTotal1: 0,
      dataTotal2: 0,
      dataTotal3: 0,
      currentPage: 1,
      query: {
        desc: true,
        key: "",
        page: 1,
        rows: 10,
        sortBy: "createDate",
      },
      props: {
        label: "lanVal",
      },
      loadingTree: true,
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      multipleSelection: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  created() {
    this.getTypePaging();
  },
  methods: {
    /*点击文件名称弹出弹窗*/
    showDetails(row) {
      this.flowInfo = row;
      this.dialogdocVisible = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },

    // 获取类型数据
    getTypePaging(data) {
      typePaging(data).then((res) => {
        this.dataTotal = res.total;
        this.tableData = res.list;
      });
    },
    // 翻页
    handleCurrentChange(i) {
      console.log("i: ", i);
      this.query.page = i;
      this.getTypePaging(this.query);
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
    },
    // 点击树目录所触发的方法
    handleNodeClick(data) {
      console.log("handleNodeClick - data: ", data);
      this.checkId = data.id; //吧树节点选中的id付给checkId
      // checkId是书目录选中的id
      this.query = {
        desc: true,
        fid: data.id,
        key: "",
        page: 1,
        rows: 10,
        sortBy: "createDate",
      };
      // 选择树的id
      this.getTypePaging(this.query);
    },
    handleSelectionChange(val) {
      const checkFileId = [];
      this.multipleSelection = val;
      val.forEach((e) => {
        checkFileId.push(e.id);
      });
      this.checkFileIdStr = checkFileId.join(",");
    },
    //部门多选事件
    handleSelectionChangeOrg(val) {
      const checkOrgId = [];
      this.multipleSelectionOrg = val;
      val.forEach((e) => {
        checkOrgId.push(e.id);
      });
      this.checkOrgIdStr = checkOrgId.join(",");
    },
    //人员多选事件
    handleSelectionChangeMen(val) {
      const checkMenId = [];
      this.multipleSelectionMen = val;
      val.forEach((e) => {
        checkMenId.push(e.id);
      });
      this.checkMenIdStr = checkMenId.join(",");
    },

    //权限多选事件
    handleSelectionChangeRole(val) {
      const checkRoleId = [];
      this.multipleSelectionRole = val;
      console.log("multipleSelectionRole: ", this.multipleSelectionRole);
      val.forEach((e) => {
        checkRoleId.push(e.id);
      });
      this.checkRoleIdStr = checkRoleId.join(",");
    },

    /*共享功能*/
    //新增文件权限接口
    getAddDocPermission(content) {
      const data = {
        fileId: this.checkFileIdStr, //	文件目录id
        type: this.shareData.type, //1.全部,2.部门,3.人员,4.角色
        content, // 内容
        startNo: this.shareData.startNo, // 起始安全级别,截止安全级别必须大于起始安全级别
        endNo: this.shareData.endNo, // 截止安全级别,截止安全级别必须大于起始安全级别
        readJus: this.shareData.readJus ? "1" : "0",
        modifyJus: this.shareData.modifyJus ? "1" : "0",
        allJus: this.shareData.allJus ? "1" : "0",
      };
      addDocPermission(data).then((res) => {
        console.log("文件权限接口数据", res);
      });
    },

    /*共享按钮弹窗*/
    shareBtn() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "你还没有选择数据",
          type: "warning",
        });
        return;
      }
      this.dialogFormVisible = true;
    },

    // 清空共享数据
    clearShareData(content) {
      this.shareData = {
        allJus: "0", //	删除权限
        content: "", //内容
        endNo: 1, //结束级别 截止安全级别,截止安全级别必须大于起始安全级别
        fileId: 0, //文件id
        modifyJus: "0", //修改权限
        readJus: "1", //读权限
        startNo: 0, //开始级别 起始安全级别,截止安全级别必须大于起始安全级别
        type: "1", //类型 1.全部,2.部门,3.人员,4.角色
      };
    },
    //共享保存按钮事件
    docPermissionSave() {
      //   checkRoleIdStr: "",
      //   checkMenIdStr: "",
      //   checkOrgIdStr: "",
      let content = "";

      if (this.shareData.type === "2") {
        content = this.checkOrgIdStr;
      } else if (this.shareData.type === "3") {
        content = this.checkMenIdStr;
      } else if (this.shareData.type === "4") {
        content = this.checkRoleIdStr;
      } else if (this.shareData.type === "1") {
        content = null;
      }
      if (this.shareData.startNo >= this.shareData.endNo) {
        this.$message({
          message: "结束级别要大于开始级别",
          type: "warning",
        });
        return;
      }

      if (content === "") {
        this.$message({
          message: "共享内容不能为空",
          type: "warning",
        });
        return;
      }

      console.log("content: ", content);

      this.getAddDocPermission(content);
      this.clearShareData(content);
      this.dialogFormVisible = false;
    },

    //
    docPermissionClose() {
      this.dialogFormVisible = false;
      this.clearShareData(content);
    },
    /*部门开始*/
    //部门查询接口
    selectOrg() {
      this.dialogOrgVisible = true;
      this.getOrgPage(this.queryOrg);
    },

    // 部门获取数据
    getOrgPage(data) {
      orgPage(data).then((res) => {
        this.dataTotal1 = res.total;
        this.tableData1 = res.list;
      });
    },
    // 部门翻页
    handleCurrentChangeOrg(i) {
      console.log("i: ", i);
      this.queryOrg.page = i;
      this.getOrgPage(this.queryOrg);
    },
    Orgconfim() {
      if (this.multipleSelectionOrg.length < 1) {
        this.$message({
          message: "你还没有选择数据",
          type: "warning",
        });

        return;
      }
      this.dialogOrgVisible = false;
    },

    /*部门结束*/

    /*人员开始*/
    //人员查询接口
    selectMen() {
      this.dialogMenVisible = true;
      this.getMenPage(this.queryMen);
    },

    // 人员获取数据
    getMenPage(data, id) {
      menPage(data, id).then((res) => {
        this.dataTotal2 = res.total;
        this.tableData2 = res.list;
      });
    },
    // 人员翻页
    handleCurrentChangeMen(i) {
      console.log("i: ", i);
      this.queryMen.page = i;
      this.getMenPage(this.queryMen);
    },
    Menconfim() {
      if (this.multipleSelectionMen.length < 1) {
        this.$message({
          message: "你还没有选择数据",
          type: "warning",
        });

        return;
      }
      this.dialogMenVisible = false;
    },
    /*人员结束*/

    //角色查询接口
    selectRole() {
      this.dialogRoleVisible = true;
      this.getRolePage(this.queryRole);
    },

    // 角色获取数据
    getRolePage(data) {
      rolePage(data).then((res) => {
        this.dataTotal3 = res.total;
        this.tableData3 = res.list;
      });
    },
    // 角色翻页
    handleCurrentChangeRole(i) {
      console.log("i: ", i);
      this.queryRole.page = i;
      this.getRolePage(this.queryRole);
    },
    Roleconfim() {
      if (this.multipleSelectionRole.length < 1) {
        this.$message({
          message: "你还没有选择数据",
          type: "warning",
        });

        return;
      }
      this.dialogRoleVisible = false;
    },
  },
};
</script>

<style>
</style>
