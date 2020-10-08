<template>
  <div class="app-container">
    <h3 class="title_cont">文件查询</h3>
    <div class="content_toplayout">
      <div class="search_content fl">
        <el-button type="primary" icon="el-icon-search" @click="searchlanID" />
        <input
          type="text"
          v-model.trim="pagingSearchKey"
          class="search_content_input fl"
          placeholder="请输入关键字"
          clearable
          @keyup.enter="searchlanID"
         
           
        />
      </div>
        <div class="button fr">
        <el-button type="primary" icon="el-icon-plus">共享</el-button>
     
      </div>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" />
      <el-table-column prop="fileName" label="文件名称" />
      <el-table-column prop="fileCode" label="文件编码" />
      <el-table-column prop="fidName" label="文件目录" />
      <el-table-column prop="creatorName" label="创建人" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="modifyTime" label="最新修改时间" />
      <el-table-column prop="versionType" label="文件版本数" />
    </el-table>

    <el-pagination
      background
      :total="dataTotal"
      layout="prev, pager, next"
      :page-size="10"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { docuFolder } from "@/api/flow";
import { typePaging } from "@/api/file";

export default {
  data() {
    return {
      pagingSearchKey: null, // 查询的值的字符串
      dataTotal: 0,
      currentPage: 1,
      query: {
        desc: true,
        key: this.pagingSearchKey, //	查询
        page: 1,
        rows: 10,
        sortBy: "createDate",
      },
      params: {
        desc: true,
        key: this.pagingSearchKey, //	查询
        page: 1,
        rows: 10,
        sortBy: "createDate",
      },
      props: {
        label: "lanVal",
      },
      loadingTree: true,
      tableData: [],
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
    //查询
    searchlanID() {
      this.params.page = 1;
      this.getperAll();
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


    //查询接口
     getperAll: async function () {
      this.$axios({
        method: "get",
        url: `http://sksigmar.com:81//docu/doc/paging`,
        params: {
          page: this.page, // 当前页数
          rows: this.pageSize, //	下拉框每页条数
          sortBy: "createDate", //	排序字段
          key: this.pagingSearchKey, //	查询
          desc: false, //	正逆序
        },
      })
        .then((res) => {
          if (res.data.list.length > 0) {
            this.tableData = res.data.list; // 获取 每页对象
            this.dataTotal = res.data.total; // 获取 总条数
            this.pages = res.data.pages; // 获取 总页数
            this.pageSize = res.data.pageSize; // 获取 每页几条
          }
        })
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

    handleNodeClick(data) {
      console.log(data);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style>
</style>
