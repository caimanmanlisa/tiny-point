<template>
<div class="app-container">
    <h3 class="title_cont">流转列表</h3>

    <div class="content_toplayout">
        <div class="search_content fl">
            <el-button type="primary" icon="el-icon-search" />
            <input type="text" class="search_content_input fl" placeholder="请输入关键字">
        </div>
        <div class="button fr">
            <el-button type="primary" icon="el-icon-minus" @click="addInfo">添加</el-button>
            <el-button type="primary" icon="el-icon-plus">禁用</el-button>
        </div>
    </div>

    <div class="table_box">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />

            <el-table-column prop="flowname" label="流转名称">
                <template slot-scope="scope">{{ scope.row.flowname }}</template>
            </el-table-column>
            <el-table-column prop="flowtype" label="所属类">
                <template slot-scope="scope">{{ scope.row.flowtype }}</template>
            </el-table-column>
            <el-table-column prop="flowperson" label="创建人">
                <template slot-scope="scope">{{ scope.row.flowperson }}</template>
            </el-table-column>
            <el-table-column prop="flowdate" label="创建时间">
                <template slot-scope="scope">{{ scope.row.flowdate }}</template>
            </el-table-column>
            <el-table-column label="是否禁用">
                <template slot-scope="scope">{{ scope.row.enable ? "启用" : "禁用" }}</template>
            </el-table-column>
            <el-table-column prop="operate" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row,scope.$index)" />
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog :title="isEditIndex === -1 ? '添加流转列表' : '修改流转列表'" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
                <el-form label-width="140px">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <div class="form_btn">
                                <el-button type="primary" @click="comfirm">保存</el-button>
                                <el-button @click="dialogVisible = false">取消</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="流程名称">
                                <el-input v-model="flowInfolist.flowname" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="创建人">
                                <el-input v-model="flowInfolist.flowperson" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="创建时间">
                                <el-date-picker v-model="flowInfolist.flowdate" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%;" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所属类型">
                                <el-select v-model="flowInfolist.flowtype" placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="表单来源">
                                <el-select v-model="flowInfolist.formSource" placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in option1s" :key="item.value" :label="item.label" :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="表结构8">
                                <el-button type="primary" plain style="width:15%;padding: 10px 0;" @click="selectTable">选择表结构</el-button>
                                <el-input v-model="flowInfolist.formStructure" style="width:85%;" />

                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="流转来源">
                                <el-select v-model="flowInfolist.source" placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in option1s" :key="item.value" :label="item.label" :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="备注人">
                                <el-input v-model="flowInfolist.remark" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="版本">
                                <el-input v-model="flowInfolist.edition" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否启用">
                                <el-switch v-model="flowInfolist.enable" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

            </el-tab-pane>
            <el-tab-pane label="节点设置" name="second">
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

                <el-table ref="multipleTable" :data="tableDataNodes" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="nodesName" label="名称">

                        <template>
                            <el-input v-model="flowInfo.sort" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="nodesType" label="类型">
                        <template>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                            </el-select>
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

            </el-tab-pane>
            <el-tab-pane label="流转条件设置" name="third">
                <el-row>
                    <el-col :span="24">
                        <div class="form_btn">
                            <el-button type="primary">保存</el-button>
                            <el-button type="primary">预览</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="form_btn">
                            <el-button type="primary">添加</el-button>
                            <el-button type="primary">删除</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-table ref="multipleTable" :data="tableDataNodes" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="nodesName" label="起始节点">
                        <template>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="nodesType" label="到达节点">
                        <template>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="nodesSet" label="条件设置">
                        <template>
                            <el-button type="primary">设置</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="nodesHandler" label="名称">
                        <template>
                            <el-input v-model="flowInfo.sort" />
                        </template>
                    </el-table-column>
                </el-table>
                <div class="line" />
                <h3 class="set_tit_back">退回设置</h3>
                <el-table ref="multipleTable" :data="tableDataNodes" tooltip-effect="dark" style="width: 100%">
                    <el-table-column prop="nodesName" label="序号">
                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                    </el-table-column>
                    <el-table-column prop="nodesType" label="需要退回节点">
                        <template>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="nodesType" label="退回到哪一节点">
                        <template>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="nodesSet" label="是否退回">
                        <template>
                            <el-checkbox v-model="checked" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="nodesHandler" label="名称">
                        <template>
                            <el-input v-model="flowInfo.sort" />
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="其他设置" name="fourth">
                <el-row>
                    <el-col :span="5" class="marign_left_10">
                        <el-col :span="7"><span class="set_tit">明细汇总</span></el-col>
                        <el-col :span="6">
                            <el-button type="primary" icon="el-icon-s-tools" size="mini" circle />
                        </el-col>
                    </el-col>
                    <el-col :span="5">
                        <el-col :span="8"><span class="set_tit">值计算设置</span></el-col>
                        <el-col :span="6">
                            <el-button type="primary" icon="el-icon-s-tools" size="mini" circle />
                        </el-col>
                    </el-col>
                    <el-col :span="5">
                        <el-col :span="6"><span class="set_tit">值联动</span></el-col>
                        <el-col :span="6">
                            <el-button type="primary" icon="el-icon-s-tools" size="mini" circle />
                        </el-col>
                    </el-col>
                    <el-col :span="5">
                        <el-col :span="8"><span class="set_tit">值联动扩展</span></el-col>
                        <el-col :span="6">
                            <el-button type="primary" icon="el-icon-s-tools" size="mini" circle />
                        </el-col>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
    <child-dialog ref="chiDia" @setType="setType" />
</div>
</template>

<script>
import childDialog from './compoents/childDialog'
export default {
    components: {
        childDialog
    },
    data() {
        return {
            checked: true, // 复选框初始值
            value: '', // 下拉框赋值
            option1s: [
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
            options: [{
                    value: '选项1',
                    label: '流转测试'
                },
                {
                    value: '选项2',
                    label: '行政类'
                },
                {
                    value: '选项3',
                    label: '财务类'
                },
                {
                    value: '选项4',
                    label: '人事类'
                },
                {
                    value: '选项5',
                    label: '销售类'
                }
            ],
            activeName: 'first', // tabs默认显示
            isEditIndex: -1,
            dialogVisible: false, // 弹框的显示
            value1: true,
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
                formStructure: 'eeee',
                source: '',
                remark: '',
                edition: '',
                enable: false
            },
            tableData: [{
                flowname: '流转测试',
                flowtype: 1,
                flowperson: 'asdfasdf',
                flowdate: '2010-12-09',
                value1: 'value1value1value1value1',
                enable: false
            }],
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

            multipleSelection: []
        }
    },
    methods: {
        // jjjj() {
        //   alert('cmm')
        //   // this.flowInfolist.formStructure = 'ccv'
        //   // console.log('this.flowInfolist: ', this.flowInfolist)
        //   this.$set(this.flowInfolist, 'formStructure', 'ccv')
        // },
        setType(c) {
            console.log('自定义事件-setType:', c)
            this.$set(this.flowInfolist, 'formStructure', c)
        },
        selectTable() {
            this.$refs.chiDia.childDialogVisible = true
        },
        // 批量删除
        batchDel() {
            // console.log('multipleSelection: ', this.multipleSelection)
            this.tableData = this.tableData.filter((item, i) => {
                return !this.multipleSelection.some((i) => {
                    return item.type === i.type
                })
            })
        },
        // 编辑
        edit(row, i) {
            // console.log(row, i)
            this.flowInfolist = row
            this.isEditIndex = i
            this.dialogVisible = true
        },
        handleSelectionChange(val) {
            // 表头复选框按钮
            this.multipleSelection = val
        },
        handleClose() {
            this.dialogVisible = false
            // console.log(this.isEditIndex)
            if (this.isEditIndex !== -1) {
                this.flowInfolist = {
                    flowname: '',
                    flowperson: '',
                    flowdate: '',
                    flowtype: '',
                    formSource: '',
                    formStructure: '',
                    source: '',
                    remark: '',
                    edition: ''
                }
            }
            this.isEditIndex = -1
        },
        comfirm() {
            if (this.isEditIndex !== -1) {
                this.isEditIndex = -1
                this.tableData[this.isEditIndex] = this.flowInfolist
                this.flowInfolist = {
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
                }
                this.dialogVisible = false
                this.$message({
                    message: '添加成功！',
                    type: 'success'
                })
                return
            } else {
                if (!this.flowInfolist.flowname) {
                    this.$message({
                        message: '流转名称不能为空',
                        type: 'warning'
                    })
                    return
                }
                if (!this.flowInfolist.flowtype) {
                    this.$message({
                        message: '所属类不能为空',
                        type: 'warning'
                    })
                    return
                }
                this.tableData.push(this.flowInfolist)
                this.flowInfolist = {
                    flowname: '',
                    flowperson: '',
                    flowdate: '',
                    flowtype: '',
                    formSource: '',
                    formStructure: '',
                    source: '',
                    remark: '',
                    edition: ''
                }
                this.dialogVisible = false
                this.$message({
                    message: '添加成功！',
                    type: 'success'
                })
            }
        },
        addInfo() {
            // 添加流转类型信息
            this.dialogVisible = true
        },
        handleClick(tab, event) {
            console.log(tab, event)
        }
    }
}
</script>

<style>
.set_tit {
    line-height: 28px;
}

.marign_left_10 {
    margin-left: 10%;
}

.line {
    border-bottom: 2px solid #ddd;
    height: 2px;
    font-size: 0;
    margin: 20px 0;
}

.set_tit_back {
    text-align: center;
    font-size: 14px;
    margin: 0;
    padding: 0;
}
</style>
